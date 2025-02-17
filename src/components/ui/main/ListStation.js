import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Modal } from 'react-native';
import React, { useState } from 'react';
import { ItemStation } from '../../item/Item';
import { useNavigation } from '@react-navigation/native';

const Status = [
    { id: '0', name: 'Đang hoạt động', status: 1 },
    { id: '1', name: 'Dừng hoạt động', status: 2 },
    { id: '2', name: 'Chờ phê duyệt', status: 3 },
    { id: '3', name: 'Hủy phê duyệt', status: 4 },
];

const nameChargingStation = [
    { id: '0', name: 'Cửa hàng xăng dầu thành phố Thủ Đức ', status: 1, brand: 'Honda', location: 'dường 32/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1 ', 'CCS2 '], image: 'https://www.pvoil.com.vn/media/1/he-thong-cua-hang-xang-dau.png' },
    { id: '1', name: 'Đại lý ủy quyền Hyundai ', status: 2, brand: 'Hyundai', location: '72/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1 ', 'CCS2 '], image: 'https://image.bnews.vn/MediaUpload/Org/2021/03/24/img-bgt-2021-screenshot-563-1616508509-width1280height720.jpg' },
    { id: '2', name: 'Trạm xạc Vinfast Quận 1  ', status: 3, brand: 'Vinfast', location: '172/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1 ', 'CCS2 '], image: 'https://petrotimesgroup.com/upload/cdn/images/image-20241116092757-1.jpeg' },
    { id: '3', name: 'Chung cư ABC ', status: 1, brand: 'Vinfast,Honda', location: '72/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1 ', 'CCS2 '], image: 'https://www.viup.vn/media/ckfinder/images/News/1/3/20230314/news_5739/image003.jpg' },
    { id: '4', name: 'Bãi đỗ xe công ty trạm sạc EV ', status: 4, brand: 'Vinfast', location: '172/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1 ', 'CCS2 '], image: 'https://thicongtrambienap.com/wp-content/uploads/2021/03/tram-sac-xe-dien-2-scaled.jpg' },
    { id: '5', name: 'Bãi đỗ xe công ty trạm sạc EV ', status: 1, brand: 'Vinfast', location: '172/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1 ', 'CCS2 '], image: 'https://thicongtrambienap.com/wp-content/uploads/2021/03/tram-sac-xe-dien-2-scaled.jpg' },

]
const ListStation = () => {
    const [selectedStatus, setSelectedStatus] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);

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
                            style={[styles.buttonStatus, selectedStatus === item.status && styles.selectedButton]}
                            onPress={() => setSelectedStatus(item.status)}
                        >
                            <Text style={[styles.textStatus, selectedStatus === item.status && styles.selectedText]}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Trạm sạc của bạn :</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View>
                    <View >
                        <FlatList
                            data={nameChargingStation}
                            scrollEnabled={false}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) =>
                                <View>
                                    {
                                        selectedStatus === item.status ?
                                            (<ItemStation data={item} />)
                                            :
                                            (null)
                                    }
                                </View>
                            }
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonSearchContainer}>
                <TouchableOpacity style={styles.buttonSearch} onPress={() => setModalVisible(true)}>
                    <Text style={styles.textSearch}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ListStation;

const styles = StyleSheet.create({

    buttonSearchContainer: {
        position: 'absolute',
        bottom: '10%',
        left: '70%'
    },
    buttonSearch: {
        backgroundColor: '#40A19C',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        elevation: 5,
    },

    container: {
        margin: '5%',
        marginBottom: '5%',
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
        backgroundColor: '#40A19C',
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
