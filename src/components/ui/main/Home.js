import { StyleSheet, Modal, Text, TouchableWithoutFeedback, View, Image, Linking, ToastAndroid, Button, TouchableOpacity, FlatList, SectionList, ImageBase, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ItemCheckBox, ItemCheckBoxImage, ItemRadioButton, ItemRadioButtonType, ItemRadioButtonVertical, ItemStationMain } from '../../item/Item';
import AxiosInstance from '../../axios/AxiosInstance';
import * as Location from 'expo-location';
import { COLOR, SIZE } from "../../../assets/Theme/Theme";
import { AppContext } from '../../axios/AppContext';
import { ItemListModal, ItemModalCheckBox, ItemModalRadioButton, ItemSliderModal, ItemSlider, ItemModalCheckBoxImage } from '../../item/Modal';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { LinearGradient } from 'expo-linear-gradient';
import haversine from 'haversine-distance';
import { ItemListMyCar, ItemLoading } from '../../item/ItemList';
import Toast from 'react-native-toast-message';
import { RefreshControl } from 'react-native';

const list = [
    { _id: 7, name: 'Xe của tôi' },
    { _id: 0, name: 'Hãng trụ sạc' },
    { _id: 5, name: 'Hãng Xe' },
    { _id: 6, name: 'Địa điểm' },
    { _id: 1, name: 'Phương tiện' },
    { _id: 2, name: 'Dòng điện' },
    { _id: 3, name: 'Cổng sạc' },
    { _id: 4, name: 'Dịch vụ' },
];
const Von = [
    { _id: 'AC', name: 'AC' },
    { _id: 'DC', name: 'DC' },

];

const Home = (props) => {

    const { navigation } = props;
    const { myCar } = useContext(AppContext);
    const [dataSelectedCar, setDataSelectedCar] = useState(myCar[0]);

    const showToast = (type, content) => {
        Toast.show({
            type: type, // 'success', 'error', 'warning', 'info'
            text2: content,
            position: 'center',
            autoHide: 5000,
        });
    };

    const [checkLoading, setCheckLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false); // an hien bo loc 
    const [modalVehical, setModalVehical] = useState(false);
    const [modalBrands, setModalBrands] = useState(false);
    const [modalSocKet, setModalSocket] = useState(false);
    const [modalService, setModalService] = useState(false);
    const [modalSearch, setModalSearch] = useState(false);
    const { myLat, setMyLat, myLng, setMyLng, infoUser } = useContext(AppContext);


    const [modalKm, setModalKm] = useState(false);

    // luu id cua loai sac 
    const [selectedVon, setSelectedVon] = useState([]);
    const [selectedSocket, setSelectedSocket] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedService, setSelectedService] = useState([]);
    const [valueNameLocation, setValueNameLocation] = useState();
    const [selectedBrandCar, setSelectedBrandCar] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);

    const clearForm = () => {
        setSelectedLocation([]);
        setSelectedBrandCar([]);
        setSelectedVon([]);
        setSelectedBrand([]);
        setSelectedBrandCar([]);
        setSelectedService([]);
        setSelectedVehicle([]);
        setSelectedSocket([]);
    };
    const clearFormVehicle = () => {
        setSelectedBrandCar([]);
        setSelectedVehicle([]);
        setSelectedSocket([]);
    };
    //console.log('Dòng điện' + selectedVon);
    //console.log('Loại đầu sạc ' + selectedSocket);
    //console.log(' Loại xe' + selectedVehicle);
    //console.log(' Hãng xe '+selectedBrand);
    //console.log('dịch vụ ' + selectedService);
    // phan bo sung 
    const [selectedKw, setSelectedKw] = useState('Tất cả');
    const [selectedKm, setSelectedKm] = useState();

    const [defaultValueKm, setDefaultValueKm] = useState([10]);
    const [valueKm, setValueKm] = useState(defaultValueKm);
    const [minValueKm, setMinValueKm] = useState(1);
    const [maxValueKm, setMaxValueKm] = useState(100);
    const [valuesKw, setValuesKw] = useState([1, 200]);
    const [minValueKw, setMinValueKw] = useState(1);
    const [maxValueKw, setMaxValueKw] = useState(200);

    const [refreshing, setRefreshing] = useState(false);
    const RefreshData = async () => {
        setRefreshing(true);
        await getDataStation();
        setRefreshing(false);
    }

    // danh muc lisst bo loc
    const [selectedFilter, setSelectedFliter] = useState(7);
    // danh muc phương tiện
    const handleVehicalSelect = (VehicalId) => {
        setSelectedVehicle(VehicalId);
    };
    // danh muc dòng điện
    const handleVonSelect = (selected) => {
        setSelectedVon(selected);
    };

    //Lấy địa chỉ và định vị
    const [errorMsg, setErrorMsg] = useState('');
    const [address, setAddress] = useState('');
    const name = infoUser?.name || "Chưa có tên";
    const image = infoUser?.image || "https://vivureviews.com/wp-content/uploads/2022/08/avatar-vo-danh-6.png";
    const getYourLocation = async () => {
        // setCheckLoading(true);
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
            // setCheckLoading(false);
        }
    }


    // Hàm lấy thông tin trạm sạc từ API
    const [dataStation, setDataStation] = useState([]);
    const getDataStation = async () => {
        try {
            const dataStation = await AxiosInstance().get('/station/get');
            if (dataStation.data && dataStation.data.length > 0) {
                setDataStation(dataStation.data);
            } else {
                setDataStation([]);
                console.log('Không tìm thấy dữ liệu từ /station/get');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
            showToast('error', 'Không thể tải danh sách thông tin trạm sạc');
        }
    };
    // hãng trạm sạc 
    const [dataBrandStation, setDataBrandStation] = useState([]);
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
    // hãng xe 
    const [dataBrandCar, setDataBrandCar] = useState([]);
    const getBrandCar = async () => {
        try {
            const dataStation = await AxiosInstance().get('/brandcar/get');
            if (dataStation.data && dataStation.data.length > 0) {
                setDataBrandCar(dataStation.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /station/get');
                ToastAndroid.show('Không có thông tin trạm sạc', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
            ToastAndroid.show('Không thể tải danh sách thông tin trạm sạc', ToastAndroid.SHORT);
        }
    };

    // vị trí trụ sạc 
    const [dataLocationStation, setDataLocationStation] = useState([]);
    const getLocation = async () => {
        try {
            const dataStation = await AxiosInstance().get('/location/get');
            if (dataStation.data && dataStation.data.length > 0) {
                setDataLocationStation(dataStation.data);
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

    const getData = async () => {
        setCheckLoading(true);
        await getLocation();
        await getBrandCar();
        await getServiceData();
        await getSocketData();
        await getVehicalData();
        await getDataStation();
        await getYourLocation();
        await getBrandDataStation();
        setCheckLoading(false);
    }

    // Hook effect khởi tạo dữ liệu
    useEffect(() => {
        getData();
    }, []);
    const [selectedEc, setSelectedEc] = useState([]);
    const handleEcSelect = (ecId) => {
        setSelectedEc(ecId);
    };

    // kiểm tra dữ liệu bộ lọc 

    const filteredItems = dataStation?.filter(item => {
        const matchesName = !valueNameLocation || !valueNameLocation === 0 || item.name.toLowerCase().includes(valueNameLocation.toLowerCase());

        const matchesBrandName = !valueNameLocation || !valueNameLocation === 0 || item.brand_id.name.toLowerCase().includes(valueNameLocation.toLowerCase());

        const matchesLoactionName = !valueNameLocation || !valueNameLocation === 0 || item.location?.toLowerCase().includes(valueNameLocation.toLowerCase());

        const isValueNameLocation = matchesName || matchesLoactionName || matchesBrandName;

        const matchesBrand = !selectedBrand || selectedBrand.length === 0 || selectedBrand.includes(item.brand_id?._id);

        const matchesBrandCar = !selectedBrandCar || selectedBrandCar.length === 0 ||
            item.brandcar.some(brandcar => selectedBrandCar.includes(brandcar.brandcar_id?._id));

        const matchesPlace = !selectedLocation || selectedLocation.length === 0 || selectedLocation.includes(item.address?._id);

        const matchesVehicle = !selectedVehicle || selectedVehicle.length === 0 ||
            item.specification.some(spec =>
                spec.specification_id.vehicle.some(v =>
                    selectedVehicle.includes(v.vehicle_id?._id)
                )
            );

        const matchesPort = !selectedSocket || selectedSocket.length === 0 ||
            item.specification.some(spec => selectedSocket.includes(spec.specification_id.port_id?._id));

        const matchesService = !selectedService || selectedService.length === 0 ||
            item.service.some(service => selectedService.includes(service.service_id?._id));

        const matchesVon = !selectedVon || selectedVon.length === 0 ||
            item.specification.some(spec => selectedVon.includes(spec.specification_id.port_id?.type));

        return (matchesBrand && matchesPlace && matchesBrandCar && matchesVehicle && matchesPort && matchesService && matchesVon && isValueNameLocation);
    });


    const [checkFilter, setCheckFilter] = useState(false);
    useEffect(() => {
        if (myCar) {
            clearFormVehicle();
            if (dataSelectedCar) {
                setCheckFilter(true);
                if (dataSelectedCar.chargingCar && !selectedSocket.includes(dataSelectedCar.chargingCar._id)) {
                    setSelectedSocket(prev => [...prev, dataSelectedCar.chargingCar._id]);
                }
                if (dataSelectedCar.modelCar && !selectedBrandCar.includes(dataSelectedCar.modelCar.brand_id._id)) {
                    setSelectedBrandCar(prev => [...prev, dataSelectedCar.modelCar.brand_id._id]);
                }
                if (dataSelectedCar.modelCar && dataSelectedCar.modelCar === 'Xe máy điện') {
                    setSelectedVehicle('67ad951438a923d416a25409');
                }
                else {
                    setSelectedVehicle('67d7e207a9b4d60d7f235249');
                }

            } else {
                setCheckFilter(false);
            }
        } else {
            setCheckFilter(false);
        }
    }, [dataSelectedCar]);

    // useEffect(() => {
    //     if (selectedBrandCar.length > 0 || selectedSocket.length > 0) {
    //         setCheckFilter(false);
    //         setDataBrandCar([]);
    //     }
    // }, [selectedBrandCar, selectedVehicle, selectedSocket]);


    const sortedItems = (filteredItems || [])
        .map(item => ({
            ...item,
            distance: haversine(
                { latitude: myLat, longitude: myLng },
                { latitude: item.lat, longitude: item.lng }
            ) / 1000
        }))
        .sort((a, b) => a.distance - b.distance);

    const goProfile = () => {
        if (infoUser) {
            navigation.navigate('Profile');
        } else {
            navigation.navigate('Login');
        }
    }

    // const point1 = { latitude: myLat, longitude: myLng };
    // const point2 = { latitude: 11.3495, longitude: 106.0640 };
    // const distance = haversine(point1, point2); // Khoảng cách tính bằng mét
    // console.log(distance / 1000 + " km")

    // console.log(dataSelectedCar.vehicleCar);
    // console.log(dataSelectedCar.chargingCar._id);
    // console.log(dataSelectedCar.modelCar._id);
    // console.log(dataSelectedCar)




    return (
        <View style={{ height: '100%', backgroundColor: 'white' }}>
            {/* Ten nguoi dung */}
            <LinearGradient dither={false} colors={['#009558', '#5bdb5b',]} start={{ x: 0.7, y: 0.5 }} end={{ x: 0.3, y: 0.5 }} style={styles.containerUser} >
                {
                    !modalSearch ?
                        (<View style={styles.inputSearch}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '50%' }} onPress={goProfile} >
                                <Image style={styles.img} source={{ uri: image }} />
                                <Text style={styles.titleContainer} numberOfLines={1} ellipsizeMode='head'>{name}</Text>
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
                                <TextInput
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                    onChangeText={setValueNameLocation}
                                    style={{ fontSize: SIZE.size12, width: '80%' }}
                                    placeholder='Tìm kiếm ' />
                                <TouchableOpacity style={{ justifyContent: 'center', padding: 10, borderRadius: 30, }} onPress={() => [setModalSearch(false), setValueNameLocation('')]}>
                                    <Image style={styles.iconFilter} source={require('../../../assets/icon/icons8-multiply-50.png')} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{ marginLeft: '2%', backgroundColor: 'white', justifyContent: 'center', padding: 10, borderRadius: 30, }} onPress={() => setModalVisible(true)}>
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
                                <View>
                                    {item.image ?
                                        <TouchableOpacity
                                            style={[styles.itemBrand, selectedBrand.includes(item._id) && styles.selectedItemBrand]}
                                            // onPress={() => setSelectedBrand([item._id])}
                                            onPress={() => setSelectedBrand(selectedBrand.includes(item._id) ? [] : [item._id])}
                                        >
                                            <Image style={styles.iconListBrand} source={{ uri: item.image }} />
                                        </TouchableOpacity>
                                        :
                                        null
                                    }
                                </View>
                            );
                        }}
                    />
                </View>

            </LinearGradient>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ height: '100%' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={RefreshData}
                    />
                }
            >
                {/* Tram sac gan ban */}
                <View style={styles.boxHome}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Trạm sạc gần bạn</Text>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setModalKm(true)}>
                            <Text style={styles.title}>{valueKm}Km</Text>
                            <Image style={styles.iconButton} source={require('../../../assets/icon/icons8-arrow-down-24.png')} />
                        </TouchableOpacity>

                    </View>
                    <View>

                        <View >
                            {filteredItems.length > 0 ?
                                <FlatList
                                    data={sortedItems}
                                    scrollEnabled={false}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => (
                                        <View>
                                            <ItemStationMain data={item} Kilomet={valueKm} />
                                        </View>
                                    )}
                                />
                                :
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 300, }}>
                                    <Text style={{ fontWeight: '500', color: 'black', fontSize: 16 }}>Không có thông tin trạm sạc</Text>
                                </View>
                            }
                        </View>

                    </View>

                </View>
            </ScrollView>
            <Modal transparent={true} visible={modalVisible} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.buttonC}>
                            <Text style={[styles.modalTitle, { textAlign: 'center' }]}> Bộ lọc chi tiết</Text>
                            <TouchableOpacity style={styles.applyButtonC} onPress={() => setModalVisible(false)}>
                                <Image style={styles.iconExit} source={require('../../../assets/icon/icons8-x-80.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', height: '87%' }}>
                            {/* danh muc */}
                            <ItemRadioButton data={list} setSelectedValue={setSelectedFliter} selectedValue={selectedFilter} />
                            {/* nooij dung */}
                            {selectedFilter == 0 ? <ItemCheckBoxImage data={dataBrandStation} selectedItems={selectedBrand} setSelectedItems={setSelectedBrand} /> : null}
                            {selectedFilter == 5 ? <ItemCheckBoxImage data={dataBrandCar} selectedItems={selectedBrandCar} setSelectedItems={setSelectedBrandCar} /> : null}
                            {selectedFilter == 6 ? <ItemCheckBoxImage data={dataLocationStation} selectedItems={selectedLocation} setSelectedItems={setSelectedLocation} /> : null}
                            {selectedFilter == 1 ? <ItemRadioButtonVertical data={dataVehical} onSelect={handleVehicalSelect} selectedValue={selectedVehicle} setSelectedValue={setSelectedVehicle} /> : null}
                            {selectedFilter == 2 ? <ItemRadioButtonVertical data={Von} onSelect={handleVonSelect} selectedValue={selectedVon} setSelectedValue={setSelectedVon} /> : null}
                            {selectedFilter == 3 ? <ItemCheckBoxImage data={dataSocket} selectedItems={selectedSocket} setSelectedItems={setSelectedSocket} /> : null}
                            {selectedFilter == 4 ? <ItemCheckBoxImage data={dataService} selectedItems={selectedService} setSelectedItems={setSelectedService} /> : null}
                            <View style={{ width: '60%' }}>
                                {selectedFilter == 7 ? <ItemListMyCar data={myCar} setDataSelectedCar={setDataSelectedCar} dataSelectedCar={dataSelectedCar} /> : null}
                            </View>

                        </View>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(false);
                                    clearForm()
                                }}
                                style={styles.cancelButton}
                            >
                                <Text style={styles.cancelText}>Làm mới</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)} // Added missing onPress
                                style={styles.applyButton}
                            >
                                <Text style={styles.applyText}>Áp dụng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


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

            <ItemLoading checkValue={checkLoading} />

        </View>
    )
}

export default Home

const styles = StyleSheet.create({

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cancelButton: {
        backgroundColor: "#ccc",
        padding: 15,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
        alignItems: "center",
    },
    cancelText: {
        color: "black",
        fontWeight: "bold",
    },
    applyButton: {
        backgroundColor: COLOR.green3,
        padding: 15,
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
        marginHorizontal: '5%'
    },
    applyText: {
        color: "white",
        fontWeight: "bold",
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
        fontSize: SIZE.size12,
        fontWeight: 'bold',
    },
    title: {
        color: 'rgb(0, 0, 0)',
        fontSize: SIZE.size14,
        fontWeight: '500',
    },
    titleContainer: {
        color: 'rgb(255, 255, 255)',
        fontSize: SIZE.size14,
        fontWeight: 'bold',
        marginLeft: '5%',
    },
    img: {
        width: 35,
        height: 35,
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
        height: 35,
        width: 35,
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

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 10,
        marginLeft: '10%'
    },
    boderSearch: {
        height: 40,
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
        height: '80%',
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: SIZE.size16,
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
    buttonC: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    applyButtonC: {
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
        fontSize: SIZE.size14,
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
        width: 80,
        height: 40,
    },
    selectedItemBrand: {
        backgroundColor: 'rgba(0, 149, 88, 0.3)',
        width: 80,
        height: 40,
    },
    textBrand: {
        fontSize: SIZE.size12,
    },
    selectedTextBrand: {
        fontSize: SIZE.size14,
    }


})