import { StyleSheet, Modal, Text, View, Image, Linking, ToastAndroid, Button, TouchableOpacity, FlatList, SectionList, ImageBase, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ItemStationMain } from '../../item/Item';
import AxiosInstance from '../../axios/AxiosInstance';
import * as Location from 'expo-location';
import { AppContext } from '../../axios/AppContext';

const carBrands = [
    { id: 0, name: 'Tất cả' },
    { id: 1, name: 'Vinfast' },
    { id: 2, name: 'Honda' },
    { id: 3, name: 'Ford' },
];
const typeCharger = [
    { id: 0, name: 'J1772' },
    { id: 1, name: 'Mennekes' },
    { id: 2, name: 'GB/T' },
    { id: 3, name: 'CHAdeMO' },
    { id: 4, name: 'CCS1' },
    { id: 5, name: 'CCS2' },
];
const Von = [
    { id: 0, name: 'Tất cả' },
    { id: 1, name: 'AC' },
    { id: 2, name: 'DC' },
];
const Vehicle = [
    { id: 0, name: 'Tất cả' },
    { id: 1, name: 'Xe máy điện' },
    { id: 2, name: 'Ô tô điện' },
];

const Kw = [
    { id: 0, name: 'Tất cả' },
    { id: 1, name: 'Sạc Thường' },
    { id: 2, name: 'Sạc Nhanh' },
    { id: 3, name: 'Sạc siêu nhanh' },
];



const Home = (props) => {

    const { navigation } = props;

    const [modalVisible, setModalVisible] = useState(false); // an hien bo loc 

    // luu id cua loai sac 
    const [selectedVon, setSelectedVon] = useState('Tất cả');
    const [selectedChargerType, setSelectedChargerType] = useState([]);
    const [selectedKw, setSelectedKw] = useState('Tất cả');
    const [selectedVehicle, setSelectedVehicle] = useState('Tất cả');
    const [selectedBrand, setSelectedBrand] = useState('Tất cả');
    const toggleSelection = (id) => {
        if (selectedChargerType.includes(id)) {
            setSelectedChargerType(selectedChargerType.filter((item) => item !== id));
        } else {
            setSelectedChargerType([...selectedChargerType, id]);
        }
    };

    //Lấy địa chỉ và định vị
    const [errorMsg, setErrorMsg] = useState('');
    const [address, setAddress] = useState('');
    const { myLat, setMyLat, myLng, setMyLng } = useContext(AppContext);
    const getYourLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to location was not granted');
        }

        let { coords } = await Location.getCurrentPositionAsync();

        if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({
                latitude, longitude
            });
            setMyLat(latitude);
            setMyLng(longitude);
            setAddress(response[0].formattedAddress);
        }
    }

    // Hàm lấy thông tin trạm sạc từ API
    const [dataStation, setDataStation] = useState(null);
    const getDataStation = async () => {
        try {
            const dataStation = await AxiosInstance().get('/station/get');
            if (dataStation.data && dataStation.data.length > 0) {
                setDataStation(dataStation.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /station/get');
                ToastAndroid.show('Không có thông tin trạm sạc', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
            ToastAndroid.show('Không thể tải danh sách thông tin trạm sạc', ToastAndroid.SHORT);
        }
    };

    const getDataStationByOption = async () => {
        try {
            const dataStation = await AxiosInstance().post('/station/getByOption',
                {
                    vehicle: selectedVehicle, brand: selectedBrand, electric: selectedVon,
                    port: selectedChargerType, output: selectedKw
                }
            );

            if (dataStation.data) {
                setDataStation(dataStation.data);
                setModalVisible(false);
            } else {
                console.log('Không tìm thấy dữ liệu từ /station/getByOption');
                ToastAndroid.show('Không có thông tin trạm sạc', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
            ToastAndroid.show('Không thể tải danh sách thông tin trạm sạc', ToastAndroid.SHORT);
        }
    }

    const [addressInput, setAddressInput] = useState(null);
    const getDataStationByAddress = async () => {
        try {
            if (!addressInput || addressInput.trim() === '') {
                console.log('Vui lòng nhập địa chỉ cần tìm');
                ToastAndroid.show('Vui lòng nhập địa chỉ cần tìm', ToastAndroid.SHORT);
            } else {
                const dataStation = await AxiosInstance().post('/station/getByAddress',
                    {
                        address: addressInput,
                    }
                );
                if (dataStation.filteredStations && dataStation.filteredStations.length > 0) {
                    setDataStation(dataStation.filteredStations);
                } else {
                    console.log('Không tìm thấy dữ liệu từ /station/getByAddress');
                    ToastAndroid.show('Không có thông tin trạm sạc', ToastAndroid.SHORT);
                }
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
            ToastAndroid.show('Không thể tải danh sách thông tin trạm sạc', ToastAndroid.SHORT);
        }
    }

    // Hook effect khởi tạo dữ liệu
    useEffect(() => {
        getDataStation();
        getYourLocation();
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Ten nguoi dung */}
            <View style={styles.containerUser}>
                <View style={styles.inputSearch}>
                    <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() => navigation.navigate("Profile")} >
                        <Image style={styles.img} source={require('../../../assets/images/anhchandung.jpg')} />
                        <View >
                            <Text style={styles.titleContainer}>Tùng</Text>
                            <Text style={{ color: 'white' }}>Welcom back</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={getDataStationByAddress} style={styles.boderIcon2}>
                        <Image style={styles.iconFilter} source={require('../../../assets/icon/icons8-notification-50 (2).png')} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'white', marginLeft: '10%', marginTop: '2%' }}>Vị trí của bạn </Text>
                <View style={styles.inputSearch}>
                    <View style={styles.boderSearch}>
                        <TextInput onChangeText={setAddressInput} style={{ marginLeft: '5%' }} placeholder="172/7 phường Linh trung, Thủ đức, Hồ Chí Minh" />
                    </View>
                    <TouchableOpacity style={styles.boderIcon} onPress={() => setModalVisible(true)}>
                        <Image style={styles.iconFilter} source={require('../../../assets/icon/icons8-filter-50 (1).png')} />
                    </TouchableOpacity>
                </View>


                {/* Bộ lọc  */}
                <Modal transparent={true} visible={modalVisible} animationType="slide">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>

                            <Text style={styles.modalTitle}>Bộ lọc </Text>

                            <ScrollView showsVerticalScrollIndicator={false} >
                                {/* danh sách bộ lọc  */}
                                <Text style={styles.modalTitleSup}> Dòng điện </Text>
                                <FlatList
                                    data={Von}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.filterItem}
                                            onPress={() => setSelectedVon(item.name)}>
                                            <View style={styles.radioButton}>
                                                {selectedVon === item.name && <View style={styles.radioInner} />}
                                            </View>
                                            <Text style={styles.filterText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />

                                <Text style={styles.modalTitleSup}> Loại đầu sạc </Text>
                                <FlatList
                                    data={typeCharger}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity
                                                style={styles.filterItem}
                                                onPress={() => toggleSelection(item.name)}>
                                                <View style={[styles.checkbox, selectedChargerType.includes(item.name) && styles.checkedBox]}>
                                                    {selectedChargerType.includes(item.name) && <Text style={styles.checkmark}>✓</Text>}
                                                </View>
                                                <Text style={styles.filterText}>{item.name}</Text>
                                            </TouchableOpacity>

                                        );
                                    }}
                                />

                                <Text style={styles.modalTitleSup}> Công suất  </Text>
                                <FlatList
                                    data={Kw}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.filterItem}
                                            onPress={() => setSelectedKw(item.name)}>
                                            <View style={styles.radioButton}>
                                                {selectedKw === item.name && <View style={styles.radioInner} />}
                                            </View>
                                            <Text style={styles.filterText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />

                                <Text style={styles.modalTitleSup}> Loại Xe </Text>
                                <FlatList
                                    data={Vehicle}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.filterItem}
                                            onPress={() => setSelectedVehicle(item.name)}>
                                            <View style={styles.radioButton}>
                                                {selectedVehicle === item.name && <View style={styles.radioInner} />}
                                            </View>
                                            <Text style={styles.filterText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />

                                <Text style={styles.modalTitleSup}> Hãng xe  </Text>
                                <FlatList
                                    data={carBrands}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.filterItem}
                                            onPress={() => setSelectedBrand(item.name)}>
                                            <View style={styles.radioButton}>
                                                {selectedBrand === item.name && <View style={styles.radioInner} />}
                                            </View>
                                            <Text style={styles.filterText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />

                            </ScrollView >
                            {/* nút */}
                            <View style={styles.buttonRow}>
                                <TouchableOpacity onPress={() => {
                                    setModalVisible(false);
                                    setSelectedBrand(0);
                                    setSelectedKw(0);
                                    setSelectedVon(0);
                                }}
                                    style={styles.cancelButton}>
                                    <Text style={styles.cancelText}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={getDataStationByOption}
                                    style={styles.applyButton}>
                                    <Text style={styles.applyText}>Áp dụng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


            </View>

            {/* Tram sac gan ban */}
            <View style={styles.boxHome}>
                <View style={styles.container}>
                    <Text style={styles.title}>Trạm sạc gần bạn :</Text>
                </View>
                <View >
                    <FlatList
                        data={dataStation}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <ItemStationMain data={item} />
                        )}
                    />
                </View>
            </View>


        </ScrollView>

    )
}

export default Home

const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        maxHeight: '90%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    modalTitleSup: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: '600'
    },
    filterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '100%',
    },
    filterText: {
        fontSize: 16,
        marginLeft: 10,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#40A19C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#40A19C',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#40A19C',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkedBox: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    checkmark: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#FF5252',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    applyButton: {
        backgroundColor: '#40A19C',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    cancelText: {
        color: 'white',
        fontWeight: 'bold',
    },
    applyText: {
        color: 'white',
        fontWeight: 'bold',
    },
    selectedBrand: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },



    boxHome: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: '-5%',
        backgroundColor: 'white'
    },
    containerUser: {
        backgroundColor: '#40A19C',
        alignContent: 'center',
        paddingTop: '2%',
        paddingBottom: '7%',
    },
    container: {
        margin: '5%',
        marginBottom: '5%',
        flexDirection: 'row',
    },

    text: {
        color: 'rgb(0, 0, 0)',
        fontSize: 16,
        fontWeight: 'bold',
    },

    textSearch: {
        color: 'rgb(255, 255, 255)',
        fontSize: 16,
    },

    textItemKw: {
        color: '#40A19C',
        fontSize: 16,
    },
    textItemStatus: {
        color: '#2F9465',
        fontSize: 16,

    },

    viewKw: {
        flexDirection: 'row',
        marginLeft: '10%'
    },


    title: {
        color: 'rgb(0, 0, 0)',
        fontSize: 16,
        fontWeight: 'bold',
    },
    titleContainer: {
        color: 'rgb(255, 255, 255)',
        fontSize: 20,
        fontWeight: 'bold',
    },
    img: {
        width: 40,
        height: 40,
        marginRight: '2%',
        borderRadius: 30,
    },
    imgLocation: {
        width: 40,
        height: 40,
        borderRadius: 30,
    },
    imgFlash: {
        width: 20,
        height: 20,
        borderRadius: 30,
    },


    buttonService: {
        justifyContent: 'center',
        alignItems: 'center',

    },

    inputSearch: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: '5%',
        marginRight: '5%',
    },
    iconFilter: {
        height: 20,
        width: 20,

    },
    boderIcon: {
        height: 50,
        width: 50,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: '#40A19C',
    },
    boderIcon2: {
        height: 50,
        width: 50,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: '#40A19C',
    },
    boderSearch: {
        height: 50,
        width: '80%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: '#40A19C',
    },

    // item list 

})