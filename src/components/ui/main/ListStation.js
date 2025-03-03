import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Modal, Image } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { ItemStation, ItemStationList } from '../../item/Item';
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../axios/AxiosInstance';
import { AppContext } from '../../axios/AppContext';
import { ItemStationMain } from '../../item/Item';
import { COLOR } from '@/src/assets/Theme/Theme';



const Status = [
    { id: '0', name: 'Đang hoạt động', isActive: 2 },
    { id: '1', name: 'Dừng hoạt động', isActive: 3 },
    { id: '2', name: 'Chờ phê duyệt', isActive: 1 },
    { id: '3', name: 'Hủy phê duyệt', isActive: 4 },
];

const ListStation = (props) => {
    const [selectedStatus, setSelectedStatus] = useState(2);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const { idUser } = useContext(AppContext);

    // get Data
    const [dataStation, setDataStation] = useState([]);
    const getDataStation = async () => {
        try {
            const dataStation = await AxiosInstance().post('/station/getByIdUser', {
                user_id: idUser, isActive: selectedStatus
            });
            if (dataStation.data && dataStation.data.length > 0) {
                setDataStation(dataStation.data);
            } else {
                setDataStation(dataStation.data);
                console.log('Không tìm thấy dữ liệu từ /station/getByIdUser');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
        }
    };

    useEffect(() => {
        getDataStation();
    }, [selectedStatus])


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.listStatus}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={Status}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.buttonStatus, selectedStatus === item.isActive && styles.selectedButton]}
                            onPress={() => setSelectedStatus(item.isActive)}
                        >
                            <Text style={[styles.textStatus, selectedStatus === item.isActive && styles.selectedText]}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Trạm sạc của bạn :</Text>

            </View>
            <ScrollView showsVerticalScrollIndicator={false}  >
                <View style={styles.buttonSearchContainer}>
                    <TouchableOpacity style={styles.buttonSearch} onPress={() => [setModalVisible(true), navigation.navigate('FormStation')]}>
                        {/* <Image source={require('../../../assets/icon/icons8-add-64.png')} /> */}
                        <Text style={{ color: COLOR.green3 }}>Thêm trạm sạc </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {
                        dataStation.length > 0 ?
                            <>
                                <View >
                                    <FlatList
                                        data={dataStation}
                                        scrollEnabled={false}
                                        keyExtractor={(item) => item._id}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item }) =>
                                            <View>
                                                {
                                                    selectedStatus === item.isActive ?
                                                        (<ItemStationList data={item} />)
                                                        :
                                                        (null)
                                                }
                                            </View>
                                        }
                                    />
                                </View>
                            </>
                            :
                            <>
                                <View style={{justifyContent:'center', alignItems:'center', width:'100%', height:'100%'}}>
                                    <Text style={{fontWeight:'500', color:'black', fontSize:16}}>Không có dữ liệu</Text>
                                </View>
                            </>
                    }
                </View>
            </ScrollView>

        </View>
    );
};

export default ListStation;

const styles = StyleSheet.create({

    buttonSearchContainer: {
        // position: 'absolute',
        // bottom: '-90%',
        // left: '70%'
        margin: '5%',

    },
    buttonSearch: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    container: {
        margin: '5%',
        marginBottom: '2%',
        marginTop: '0%',
        flexDirection: 'row',
    },
    listStatus: {
        justifyContent: 'center',
        margin: '5%',
        marginBottom: '2%',

    },
    buttonStatus: {
        borderRadius: 25,
        backgroundColor: '#EDEDED',
        marginRight: 20,
        padding: 10,
        margin: 2,
        marginBottom: '10%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    selectedButton: {
        backgroundColor: COLOR.green3,
    },
    textStatus: {
        color: '#544C4C',
        fontSize: 16,
    },
    selectedText: {
        color: 'white',
    },
    title: {
        color: 'rgb(0, 0, 0)',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
