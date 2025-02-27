import { StyleSheet, Modal, Text, TouchableWithoutFeedback, View, Image, Linking, ToastAndroid, Button, TouchableOpacity, FlatList, SectionList, ImageBase, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ItemRadioButton, ItemRadioButtonType, ItemStationMain } from '../../item/Item';
import AxiosInstance from '../../axios/AxiosInstance';
import * as Location from 'expo-location';
import { COLOR } from "../../../assets/Theme/Theme";
import { AppContext } from '../../axios/AppContext';
import { ItemListModal, ItemModalCheckBox, ItemModalRadioButton, ItemSliderModal, ItemSlider, ItemModalCheckBoxImage } from '../../item/Modal';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { LinearGradient } from 'expo-linear-gradient';

const carBrands = [
    { id: 1, name: 'Byd', image: require('../../../assets/icon/byd.png') },
    { id: 0, name: 'Vinfast', image: require('../../../assets/icon/vinfast.png') },
    { id: 2, name: 'EvOne', image: require('../../../assets/icon/evone.png') },
    { id: 3, name: 'Wuling', image: require('../../../assets/icon/wuling.png') },
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
const filter = [
    { id: 0, name: 'Công Xuất' },
    { id: 1, name: 'Dòng điện' },
    { id: 2, name: 'Dịch vụ' },
    { id: 3, name: 'Trạng thái hoạt động' },
];

const brand = [
    { _id: 0, name: 'Honda' },
    { _id: 1, name: 'Vin' },
    { _id: 2, name: 'Wuth' },
    { _id: 3, name: 'Yamaha' },
];


const Home = (props) => {

    const { navigation } = props;

    const [modalVisible, setModalVisible] = useState(false); // an hien bo loc 
    const [modalVehical, setModalVehical] = useState(false);
    const [modalBrands, setModalBrands] = useState(false);
    const [modalSocKet, setModalSocket] = useState(false);
    const [modalService, setModalService] = useState(false);
    const [modalSearch, setModalSearch] = useState(false);


    const [modalKm, setModalKm] = useState(false);

    // luu id cua loai sac 
    const [selectedVon, setSelectedVon] = useState('Tất cả');
    const [selectedSocket, setSelectedSocket] = useState([]);
    const [selectedKw, setSelectedKw] = useState('Tất cả');
    const [selectedVehicle, setSelectedVehicle] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedKm, setSelectedKm] = useState('Tất cả');
    const [selectedService, setSelectedService] = useState([]);


    const [defaultValueKm, setDefaultValueKm] = useState(5);
    const [valueKm, setValueKm] = useState(defaultValueKm);
    const [minValueKm, setMinValueKm] = useState(1);
    const [maxValueKm, setMaxValueKm] = useState(230);
    const [valuesKw, setValuesKw] = useState([1, 200]);
    const [minValueKw, setMinValueKw] = useState(1);
    const [maxValueKw, setMaxValueKw] = useState(200);



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
    // hãng trạm sạc 
    const [dataBrandStation, setDataBrandStation] = useState(null);
    const getBrandDataStation = async () => {
        try {
            const dataStation = await AxiosInstance().get('/brand/get');
            if (dataStation.data && dataStation.data.length > 0) {
                setDataBrandStation(dataStation.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /station/get');
                ToastAndroid.show('Không có thông tin trạm sạc', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
            ToastAndroid.show('Không thể tải danh sách thông tin trạm sạc', ToastAndroid.SHORT);
        }
    };

    //loại phương tiện
    const [dataVehical, setDataVehical] = useState(null);
    const getVehicalData = async () => {
        try {
            const dataStation = await AxiosInstance().get('/vehicle/get');
            if (dataStation.data && dataStation.data.length > 0) {
                setDataVehical(dataStation.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /station/get');
                ToastAndroid.show('Không có thông tin trạm sạc', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
            ToastAndroid.show('Không thể tải danh sách thông tin trạm sạc', ToastAndroid.SHORT);
        }
    };

    //loại đầu sạc
    const [dataSocket, setDataSocket] = useState(null);
    const getSocketData = async () => {
        try {
            const dataStation = await AxiosInstance().get('/port/get');
            if (dataStation.data && dataStation.data.length > 0) {
                setDataSocket(dataStation.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /station/get');
                ToastAndroid.show('Không có thông tin trạm sạc', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
            ToastAndroid.show('Không thể tải danh sách thông tin trạm sạc', ToastAndroid.SHORT);
        }
    };
    //dịch vụ 
    const [dataService, setDataService] = useState(null);
    const getServiceData = async () => {
        try {
            const dataStation = await AxiosInstance().get('/services/get');
            if (dataStation.data && dataStation.data.length > 0) {
                setDataService(dataStation.data);
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
                    port: selectedSocket, output: selectedKw
                }
            );

            if (dataStation.data && dataStation.data.length > 0) {
                setDataStation(dataStation.data);
                //setModalVisible(false);
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
        getServiceData();
        getSocketData();
        getVehicalData();
        getDataStation();
        getYourLocation();
        getBrandDataStation();
    }, []);

    const handleVehicalSelect = (VehicalId) => {
        setSelectedVehicle(VehicalId);
    };

    const [selectedEc, setSelectedEc] = useState([]);
    const handleEcSelect = (ecId) => {
        setSelectedEc(ecId);
    };

    return (
        <View style={{ height: '100%', backgroundColor: 'white' }}>
            {/* Ten nguoi dung */}
            <LinearGradient dither={false} colors={['#009558', '#5bdb5b',]} start={{ x: 0.7, y: 0.5 }} end={{ x: 0.3, y: 0.5 }} style={styles.containerUser} >
                {
                    !modalSearch ?
                        (<View style={styles.inputSearch}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} onPress={() => navigation.navigate("Profile")} >
                                <Image style={styles.img} source={require('../../../assets/images/anhchandung.jpg')} />
                                <Text style={styles.titleContainer}>Tùng</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <TouchableOpacity style={styles.boderIcon2} onPress={() => setModalSearch(true)}>
                                    <Image style={styles.iconFilter} source={require('../../../assets/icon/icons8-search-50.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => [getDataStationByAddress, setModalVisible(true)]} style={styles.boderIcon2} >
                                    {/* <Image style={styles.iconFilter} source={require('../../../assets/icon/icons8-notification-24.png')} /> */}
                                    <Image style={styles.iconFilter} source={require('../../../assets/icon/icons8-filter-24.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>)
                        :
                        (<View style={styles.inputSearch}>
                            <View style={styles.boderSearch}>
                                <TextInput numberOfLines={1} ellipsizeMode='tail' onChangeText={setAddressInput} style={{ fontSize: 16, width: '80%' }} placeholder='Tìm kiếm ' />
                                <TouchableOpacity style={{ justifyContent: 'center', padding: 15, borderRadius: 30, }} onPress={() => setModalSearch(false)}>
                                    <Image style={styles.iconFilter} source={require('../../../assets/icon/icons8-search-50.png')} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{ marginLeft: '2%', backgroundColor: 'white', justifyContent: 'center', padding: 15, borderRadius: 30, }} onPress={() => setModalVisible(true)}>
                                <Image style={styles.iconFilter} source={require('../../../assets/icon/icons8-filter-24.png')} />
                            </TouchableOpacity>
                        </View>)
                }
                <View style={styles.listBrandUser}>
                    <FlatList
                        data={dataBrandStation}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => {
                            const isSelected = selectedBrand === item._id;
                            return (
                                <TouchableOpacity
                                    style={[styles.itemBrand, isSelected && styles.selectedItemBrand]}
                                    onPress={() => setSelectedBrand(selectedBrand === item._id ? null : item._id)}
                                >
                                    <Image style={styles.iconListBrand} source={{ uri: item.image }} />
                                    {/* <Text style={[styles.textBrand, isSelected && styles.selectedTextBrand]}>{item.name}</Text> */}
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>

            </LinearGradient>
            <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}>


                {/* Tram sac gan ban */}
                <View style={styles.boxHome}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Trạm sạc gần bạn</Text>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setModalKm(true)}>
                            <Text style={styles.title}>{valueKm}Km</Text>
                            <Image style={styles.iconButton} source={require('../../../assets/icon/icons8-arrow-down-24.png')} />
                        </TouchableOpacity>

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


                <ItemModalCheckBoxImage
                    checkModal={modalBrands}
                    setModalVisible={setModalBrands}
                    data={dataBrandStation}
                    selectedItems={selectedBrand}
                    setSelectedItems={setSelectedBrand}
                    title={'Hãng Xe'}
                />
                <ItemModalCheckBoxImage
                    checkModal={modalSocKet}
                    setModalVisible={setModalSocket}
                    data={dataSocket}
                    selectedItems={selectedSocket}
                    setSelectedItems={setSelectedSocket}
                    title={'Loại đầu sạc'}
                />
                <ItemModalCheckBoxImage
                    checkModal={modalService}
                    setModalVisible={setModalService}
                    data={dataService}
                    selectedItems={selectedService}
                    setSelectedItems={setSelectedService}
                    title={'Dịch vụ'}
                />
                <ItemSliderModal
                    checkModal={modalKm}
                    setModalVisible={setModalKm}
                    value={valueKm}
                    setValue={setValueKm}
                    defaultValue={defaultValueKm}
                    minValue={minValueKm}
                    maxValue={maxValueKm}
                    title={'Phạm vi tìm kiếm'}
                />
                <Modal transparent={true} visible={modalVisible} animationType="slide">
                    <View style={styles.modalOverlay}>
                        {/* <TouchableWithoutFeedback onPress={() => setModalVisible(false)} >
                </TouchableWithoutFeedback> */}
                        <View style={styles.modalContent}>
                            <View style={styles.buttonRow}>
                                <Text style={[styles.modalTitle, { textAlign: 'center' }]}> Bộ lọc chi tiết</Text>
                                <TouchableOpacity style={styles.applyButton} onPress={() => setModalVisible(false)}>
                                    <Image style={styles.iconExit} source={require('../../../assets/icon/icons8-x-80.png')} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}>
                                {/* hãng trụ sạc  */}
                                <View>
                                    <Text style={styles.textTitleModal}>Hãng trụ sạc </Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.buttonItem} onPress={() => setModalBrands(true)} >
                                        <Text > Chọn hãng trụ sạc </Text>
                                        <Image style={styles.iconButton} source={require('../../../assets/icon/icons8-arrow-down-24.png')} />
                                    </TouchableOpacity>
                                </View>

                                {/* loại phương tiện */}
                                <View>
                                    <Text style={styles.textTitleModal}>Loại phương tiện</Text>
                                </View>
                                <View>
                                    <ItemRadioButton data={dataVehical} onSelect={handleVehicalSelect} selectedValue={selectedVehicle} />
                                </View>
                                {/* dòng điện */}
                                <View>
                                    <Text style={styles.textTitleModal}>Dòng điện</Text>
                                </View>
                                <View>
                                    <ItemRadioButtonType data={dataSocket} onSelect={handleEcSelect} selectedValue={selectedEc} />
                                </View>
                                {/* Công Xuất  */}
                                <View>
                                    <Text style={styles.textTitleModal}>Khoảng Kw</Text>
                                </View>
                                <View>
                                    <ItemSlider values={valuesKw} setValues={setValuesKw} minValue={minValueKw} maxValue={maxValueKw} />
                                </View>
                                {/* Loại cổng sạc */}
                                <View>
                                    <Text style={styles.textTitleModal}>Loại cổng sạc </Text>
                                </View>
                                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setModalSocket(true)}>
                                    <View style={styles.buttonItem}>
                                        <Text > Chọn loại cổng sạc </Text>
                                        <Image style={styles.iconButton} source={require('../../../assets/icon/icons8-arrow-down-24.png')} />
                                    </View>
                                </TouchableOpacity>
                                {/* Chọn dịch vụ  */}
                                <View>
                                    <Text style={styles.textTitleModal}>Loại dịch vụ </Text>
                                </View>
                                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setModalService(true)}>
                                    <View style={styles.buttonItem}>
                                        <Text > Chọn loại dịch vụ </Text>
                                        <Image style={styles.iconButton} source={require('../../../assets/icon/icons8-arrow-down-24.png')} />
                                    </View>
                                </TouchableOpacity>

                            </ScrollView>

                        </View>
                    </View>

                </Modal>
            </ScrollView>

        </View>


    )
}

export default Home

const styles = StyleSheet.create({

    boxHome: {

    },
    containerUser: {
        backgroundColor: '#009558',
        alignContent: 'center',
        paddingVertical: '1%'
    },
    container: {
        margin: '5%',
        marginBottom: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: 'rgb(0, 0, 0)',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        color: 'rgb(0, 0, 0)',
        fontSize: 18,
        fontWeight: '500',
    },
    titleContainer: {
        color: 'rgb(255, 255, 255)',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: '5%',
    },
    img: {
        width: 50,
        height: 50,
        marginRight: '2%',
        borderRadius: 30,
    },
    inputSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '2%'
    },

    iconFilter: {
        height: 20,
        width: 20,

    },
    iconListBrand: {
        height: 40,
        width: 40,

    },
    iconButton: {
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
        borderColor: '#009558',
    },
    boderIcon2: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 10,
        marginLeft: '10%'
    },
    boderSearch: {
        height: 50,
        width: '82%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: '#009558',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '2%'
    },
    buttonItem: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: '90%',
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: '3%',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    // item list modal 
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modalContent: {
        width: "100%",
        maxHeight: '70%',
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    filterItemList: {
        alignItems: "center",
        paddingVertical: 20,
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        marginVertical: '2%'
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    applyButton: {
    },
    IconBrand: {
        width: 30,
        height: 30,
    },
    iconExit: {
        height: 20,
        width: 20,
    },
    textTitleModal: {
        fontSize: 18,
        fontWeight: "500",
    },





    // list hãng 

    listBrandUser: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '2%'
    },

    iconBrand: {
        width: 30,
        height: 30,
    },
    itemBrand: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderColor: 'white',
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        width: 100,
        height: 55,
    },
    selectedItemBrand: {
        backgroundColor: 'rgba(0, 149, 88, 0.3)',
        width: 100,
        height: 55,
    },
    textBrand: {
        fontSize: 16,
    },
    selectedTextBrand: {
        fontSize: 18,
    }


})