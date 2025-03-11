import { StyleSheet, Text, View, ScrollView, Image, Modal, ToastAndroid, Switch, Alert, FlatList, TextInput, ActivityIndicator, TouchableOpacity, Button, Platform } from 'react-native';
import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import { COLOR, SIZE } from "../../../assets/Theme/Theme";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { AppContext } from '../../axios/AppContext';
import AxiosInstance from '../../axios/AxiosInstance';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { firebase } from '../../../../config';
import { ItemListModal, ItemModalRadioButton, ItemModalCheckBox, ItemModalRadioButtonImage, ItemModalCheckBoxImage } from '../../item/Modal';
import { ItemButton1, ItemForList, ItemText1, ItemTitle1, ItemTextInput1 } from '../../item/ItemList';
import { useNavigation } from '@react-navigation/native';

const API_BASE = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
const TOKEN = '46f53dba-ecf6-11ef-a268-9e63d516feb9';

const FormStation = () => {
    const navigation = useNavigation();
    const [modalVisibleImage, setModalVisibleImage] = useState(false); // an hien bo loc 
    const [modalNameStation, setModalNameStation] = useState(false); // an hien bo loc 
    const [modalTimeStation, setModalTimeStation] = useState(false); // an hien bo loc 
    const [modalLocation, setModalLocation] = useState(false); // an hien bo loc 
    const [modalDetailStation, setModalDetailStation] = useState(false);
    const [modalListStation, setModalListStation] = useState(false); // an hien bo loc 
    const [modalNoteStation, setModalNoteStation] = useState(false); // an hien bo loc 

    // an hien bo loc 

    const [modalVisibleBrand, setModalVisibleBrand] = useState(false); // an hien bo loc 
    const [modalVisibleService, setModalVisibleSevice] = useState(false); // an hien bo loc 
    const [modalVisibleVehicle, setModalVisibleVehicle] = useState(false); // an hien bo loc 
    const [modalVisiblePort, setModalVisiblePort] = useState(false); // an hien bo loc 
    const { idUser } = useContext(AppContext);

    // get Service
    const [dataService, setDataService] = useState(null);
    const getDataService = async () => {
        try {
            const dataService = await AxiosInstance().get('/services/get');
            if (dataService.data && dataService.data.length > 0) {
                setDataService(dataService.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /services/get');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu services:', error);
        }
    };

    // get Brand
    const [dataBrand, setDataBrand] = useState(null);
    const getDataBrand = async () => {
        try {
            const dataBrand = await AxiosInstance().get('/brand/get');
            if (dataBrand.data && dataBrand.data.length > 0) {
                setDataBrand(dataBrand.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /brand/get');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu brand:', error);
        }
    };

    // get Vehicle
    const [dataVehicle, setDataVehicle] = useState(null);
    const getDataVehicle = async () => {
        try {
            const dataVehicle = await AxiosInstance().get('/vehicle/get');
            if (dataVehicle.data && dataVehicle.data.length > 0) {
                setDataVehicle(dataVehicle.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /vehicle/get');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu vehicle:', error);
        }
    };

    // get Port
    const [dataPort, setDataPort] = useState(null);
    const getDataPort = async () => {
        try {
            const dataPort = await AxiosInstance().get('/port/get');
            if (dataPort.data && dataPort.data.length > 0) {
                setDataPort(dataPort.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /port/get');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu port:', error);
        }
    };

    // add Specification
    const [listDataSpecification, setListDataSpecification] = useState([]); // gộp dataSpecification thành 1 mảng
    // console.log(listDataSpecification)
    const [dataSpecification, setDataSpecification] = useState(null);
    const addNewSpecification = async () => {
        try {
            if (valuePower && valuePorts && valuePrice && selectedVehical[0] && selectedSocket[0]) {
                const dataSpecification = await AxiosInstance().post('/specification/addNew',
                    {
                        user_id: idUser, vehicle_id: selectedVehical[0], port_id: selectedSocket[0], kw: valuePower, slot: valuePorts, price: valuePrice
                    });
                if (dataSpecification.data) {
                    setDataSpecification(dataSpecification.data);
                    setListDataSpecification(prevList => [...prevList, dataSpecification.data]);
                    clearForm();
                } else {
                    console.log('Không tìm thấy dữ liệu từ /specification/addNew');
                }
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu Specification:', error);
        }
    };

    // get by id Specification
    const [dataSpecificationById, setDataSpecificationById] = useState(null);
    const getSpecificationById = async (id) => {
        try {
            const dataSpecificationById = await AxiosInstance().post('/specification/getById',
                {
                    id: id
                });

            if (dataSpecificationById.data && dataSpecificationById.data.length > 0) {
                setDataSpecificationById(dataSpecificationById.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /specification/addNew');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu Specification:', error);
        }
    }

    // update Specification
    const updateSpecificationById = async (id) => {
        try {
            const updatedData = {
                kw: valuePower,
                slot: valuePorts,
                price: valuePrice,
                vehicle_id: selectedVehical[0],
                port_id: selectedSocket[0]
            };
            console.log(id)
            const response = await AxiosInstance().post('/specification/update', { id, ...updatedData });
            console.log(response.data)
            if (response) {
                setListDataSpecification(prevList =>
                    prevList.map(item => item._id === id ? response.data : item)
                );
            } else {
                console.error('Thất bại');
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật Specification:", error.response?.data || error.message);
        }
    };



    // delete Specification
    const deleteSpecificationById = async (id) => {
        try {
            const dataSpecificationById = await AxiosInstance().delete('/specification/deleteById',
                {
                    data: { id }
                });

            if (dataSpecificationById) {
                console.log('Xóa SpecificationById thành công')
                setListDataSpecification(prevList =>
                    prevList.filter(item => item._id !== id)
                );
            } else {
                console.log('Không tìm thấy dữ liệu từ /specification/addNew');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu Specification:', error);
        }
    }

    // add new station
    const addNewStaion = async () => {
        try {
            const formattedServices = selectedServices.map(id => ({ service_id: id }));
            const formattedSpecifications = listDataSpecification.map(item => ({
                specification_id: item._id
            }));

            if (!imageStation ||
                !nameStation ||
                !timeStation ||
                !selectedBrand ||
                selectedBrand.length === 0 ||
                !formattedServices ||
                formattedServices.length === 0 ||
                address.length === 0 ||
                !selectedLocation.latitude ||
                !selectedLocation.longitude ||
                !formattedSpecifications ||
                formattedSpecifications.length === 0
            ) {
                showAlert('Thông tin', 'Vui lòng nhập đầy đủ thông tin');
                return;
            }

            try {
                let newImageUrl = imageStation;

                if (choseImageStation) {
                    const uploadedImageUrl = await uploadImageToFirebase();
                    if (uploadedImageUrl) {
                        newImageUrl = uploadedImageUrl;

                        const dataStation = await AxiosInstance().post('/station/addNew', {
                            user_id: idUser,
                            brand_id: selectedBrand[0],
                            specification: formattedSpecifications,
                            service: formattedServices,
                            image: newImageUrl,
                            name: nameStation,
                            location: address,
                            lat: selectedLocation.latitude,
                            lng: selectedLocation.longitude,
                            time: timeStation,
                            note: valueNote
                        });

                        if (dataStation) {
                            showAlert('Trạm sạc', 'Thêm trạm sạc thành công');
                            setSelectedBrand([]);
                            setSelectedServices([]);
                            setListDataSpecification([]);
                            setImageStation(null);
                            setNameStation(null);
                            setTimeStart('00:00');
                            setTimeEnd('00:00');
                            setLoactionDetail(null);
                            navigation.goBack();
                        } else {
                            showAlert('Trạm sạc', 'Thêm trạm sạc thất bại');
                        }
                    } else {
                        console.log("Lỗi khi upload ảnh mới!");
                        ToastAndroid.show("Lỗi khi lưu ảnh!", ToastAndroid.SHORT);
                        return;
                    }
                }

            } catch (error) {
                ToastAndroid.show('Có lỗi xảy ra, vui lòng kiểm tra lại', ToastAndroid.SHORT);
                console.log('error:', error);
            }

        } catch (error) {
            console.error('Lỗi khi thêm mới dữ liệu Station:', error);
        }
    }

    const showAlert = (title, content) => {
        Alert.alert(title, content, [
            { text: "OK" },
        ]);
    };

    const logData = () => {
        console.log('nameStation:', nameStation);
        console.log('time:', `${timeStart} - ${timeEnd}`);
        console.log('Location:', `${locationDetail}, ${location.wardName}, ${location.districtName}, ${location.provinceName}`);
        console.log('Brand:', selectedBrand[0]);
        console.log('Services:', formattedServices);
        console.log('Lat:', selectedLocation.latitude);
        console.log('Lng:', selectedLocation.longitude);
        console.log('Specification:', formattedSpecifications);

        console.log('kw:', valuePower);
        console.log('slot:', valuePorts);
        console.log('price:', valuePrice);
        console.log('vehicle_id:', selectedVehical[0]);
        console.log('port_id:', selectedSocket[0]);
    }

    const [modalVisibleMap, setModalVisibleMap] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const mapRef = useRef(null);

    const getAddressFromCoords = async (latitude, longitude) => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.warn('Quyền vị trí bị từ chối');
                setAddress('Không có quyền truy cập vị trí');
                return;
            }
            let response = await Location.reverseGeocodeAsync({ latitude, longitude });

            if (response.length > 0) {
                if (Platform.OS === 'ios') {
                    setAddress(response[0].district + ', ' + response[0].subregion + ', ' + response[0].city);
                } else {
                    setAddress(response[0].formattedAddress);
                }
            } else {
                setAddress('Không tìm thấy địa chỉ');
            }
        } catch (error) {
            console.warn("Lỗi lấy địa chỉ:", error);
            setAddress('Không thể lấy địa chỉ');
        }
    };


    const handleMapPress = async (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
        getAddressFromCoords(latitude, longitude);
    };

    const getCurrentLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Bạn cần cấp quyền truy cập vị trí!');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            setSelectedLocation({ latitude, longitude });
            getAddressFromCoords(latitude, longitude);

            if (mapRef.current) {
                mapRef.current.animateToRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }, 1000);
            }
        } catch (error) {
            console.warn("Lỗi lấy vị trí:", error);
            alert('Không thể lấy vị trí!');
        }
    };


    // gia tri form
    const [editIndex, setEditIndex] = useState(null);
    const [locationDetail, setLoactionDetail] = useState(null);
    const [nameStation, setNameStation] = useState(null);
    const [valuePower, setValuePower] = useState('');
    const [valuePorts, setValuePorts] = useState('');
    const [valuePrice, setValuePrice] = useState('');
    const [valueNote, setValueNote] = useState(null);
    const [chargingDetails, setChargingDetails] = useState([]);

    // địa điểm 
    const [location, setLocation] = useState({
        provinceName: '',
        districtName: '',
        wardName: ''
    });
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedVehical, setSelectedVehical] = useState([]);
    const [selectedSocket, setSelectedSocket] = useState([]);


    const editDetail = (id) => {
        const item = listDataSpecification.find(spec => spec._id === id);

        if (!item) {
            console.error("Không tìm thấy dữ liệu với ID:", id);
            return;
        }
        setValuePower(item.kw?.toString() || "");
        setValuePorts(item.slot?.toString() || "");
        setValuePrice(item.price?.toString() || "");

        setSelectedVehical([
            item.vehicle_id?._id || "",
            item.vehicle_id?.name || "Không xác định"
        ]);

        setSelectedSocket([
            item.port_id?._id || "",
            item.port_id?.name || "Loại đầu sạc"
        ]);

        setEditIndex(id);
        setModalDetailStation(true);
    };



    const clearForm = () => {
        setValuePower('');
        setValuePorts('');
        setValuePrice('');
        setSelectedVehical([]);
        setSelectedSocket([]);
        setEditIndex(null);
    };

    const cancelForm = () => {
        setValuePower('');
        setValuePorts('');
        setValuePrice('');
        setSelectedVehical([]);
        setSelectedSocket([]);
        setEditIndex(null);
        setModalDetailStation(false)
    };



    //thoi gian
    const [timeStart, setTimeStart] = useState('00:00');
    const [timeEnd, setTimeEnd] = useState('00:00');
    const [isTimeStartVisible, setTimeStartVisibility] = useState(false);
    const [isTimeEndVisible, setTimeEndVisibility] = useState(false);
    const [timeStation, setTimeStation] = useState(null)

    const showTimeStartPicker = () => setTimeStartVisibility(true);
    const hideTimeStartPicker = () => setTimeStartVisibility(false);
    const showTimeEndPicker = () => setTimeEndVisibility(true);
    const hideTimeEndPicker = () => setTimeEndVisibility(false);

    const handleConfirmTimeStart = (date) => {
        const dt = new Date(date);
        setTimeStart(dt.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }));
        hideTimeStartPicker();
    };

    const handleConfirmTimeEnd = (date) => {
        const dt = new Date(date);
        setTimeEnd(dt.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }));
        hideTimeEndPicker();
    };

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const CheckTime = () => {
        if (isEnabled) {
            setTimeStation('24/7')
            setModalTimeStation(false);
        }
        else {
            setTimeStation(timeStart + ' - ' + timeEnd)
            setModalTimeStation(false);
        }

    }


    //anh
    const [imageStation, setImageStation] = useState(null);
    const [choseImageStation, setChoseImageStation] = useState(null);
    const [urlImageStation, setUrlImageStation] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled && result.assets.length > 0) {
            setChoseImageStation(result.assets[0].uri);
            setImageStation(result.assets[0].uri);
        }
    }

    const uploadImageToFirebase = async () => {
        try {
            const { uri } = await FileSystem.getInfoAsync(choseImageStation);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = () => {
                    reject(new TypeError('Request failed !'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });

            const fileName = choseImageStation.substring(choseImageStation.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(fileName);

            await ref.put(blob);
            blob.close && blob.close();

            const url = await ref.getDownloadURL();
            setUrlImageStation(url);
            setChoseImageStation(null);
            setImageStation(url);
            return url;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // kiêm tra number
    const onChangeTextKw = (value) => { if (+value || value == '') setValuePower(value.trim()); };
    const onChangeTextChager = (value) => { if (+value || value == '') setValuePorts(value.trim()); };
    const onChangeTextPrice = (value) => { if (+value || value == '') setValuePrice(value.trim()); };

    const [checkImg, setCheckImg] = useState(false);
    const [checkNameStation, setCheckNameStation] = useState(false);
    const [checkBrand, setCheckBrand] = useState(false);
    const [checkTime, setCheckTime] = useState(false);
    const [checkLocation, setCheckLocation] = useState(false);
    const [checkCharging, setCheckCharging] = useState(false);


    const [checkKw, setCheckKw] = useState(false);
    const [checkCharger, setCheckCharger] = useState(false);
    const [checkPrice, setCheckPrice] = useState(false);
    const [checkVehicle, setCheckVehicle] = useState(false);
    const [checkSocket, setCheckSocket] = useState(false);


    // Kiểm tra thông tin trạm sạc
    const validateStation = () => {
        let isValid = true;
        if (nameStation.length < 10 || nameStation.length > 50) {
            setCheckNameStation(true);
            isValid = false;
        } else setCheckNameStation(false);

        if (!selectedBrand) {
            setCheckBrand(true);
            isValid = false;
        } else setCheckBrand(false);

        if (timeStart === '00:00' || timeEnd === '00:00') {
            setCheckTime(true);
            isValid = false;
        } else setCheckTime(false);

        if (!location.provinceName || !location.districtName || !location.wardName || locationDetail.trim() === '' || myLocation === null) {
            setCheckLocation(true);
            isValid = false;
        } else setCheckLocation(false);

        if (listDataSpecification.length === 0 || !listDataSpecification) {
            setCheckCharging(true);
            isValid = false;
        } else {
            setCheckCharging(false);
            isValid = false;
        }

        return isValid;
    };

    const validateCharger = () => {
        let isValid = true;

        if (!valuePower.trim()) {
            setCheckKw(true);
            isValid = false;
        } else setCheckKw(false);

        if (!valuePorts.trim()) {
            setCheckCharger(true);
            isValid = false;
        } else setCheckCharger(false);

        if (!valuePrice.trim()) {
            setCheckPrice(true);
            isValid = false;
        } else setCheckPrice(false);

        if (!selectedSocket || selectedSocket.length === 0) {
            setCheckSocket(true);
            isValid = false;
        } else setCheckSocket(false);

        if (isValid) {
            if (editIndex) {
                updateSpecificationById(editIndex);
            } else {
                addNewSpecification();
            }
            setModalDetailStation(false);
            setEditIndex(null);
        }
    };
    // Gọi để kiểm tra tất cả
    const handleValidation = () => {
        if (validateStation()) {
            console.log("Lưu tất cả thông tin!");
        }
    };

    useEffect(() => {
        getDataService();
        getDataBrand();
        getDataVehicle();
        getDataPort();
    }, [])

    return (
        <ScrollView style={styles.container}>
            <ItemForList title={'Hình ảnh'} content={imageStation ? 'Đã có ảnh' : 'Chưa thêm ảnh '} checkActive={imageStation ? true : false} setModal={setModalVisibleImage} />
            <ItemForList title={'Tên trạm sạc'} content={nameStation ? nameStation : 'Chưa đặt tên '} checkActive={nameStation ? true : false} setModal={setModalNameStation} />
            <ItemForList title={'Thời gian'} content={timeStation ? timeStation : 'Chưa đặt '} checkActive={timeStation ? true : false} setModal={setModalTimeStation} />
            <ItemForList title={'Vị trí'} content={address ? address : 'Chưa đặt địa chỉ'} checkActive={address ? true : false} setModal={setModalVisibleMap} />
            <ItemForList title={'Hãng sạc'} content={!selectedBrand || selectedBrand.length === 0 ? 'Chưa có hãng sạc' : selectedBrand[1]} checkActive={!selectedBrand || selectedBrand.length === 0 ? false : true} setModal={setModalVisibleBrand} />
            <ItemForList title={'Dịch vụ'} content={selectedServices.length === 0 || !selectedBrand ? 'Chưa thêm thêm dịch vụ' : 'Đã thêm dịch vụ'} checkActive={selectedServices.length === 0 || !selectedBrand ? false : true} setModal={setModalVisibleSevice} />
            <ItemForList title={'Trụ sạc'} content={!listDataSpecification || listDataSpecification.length === 0 ? 'Cần tối thiểu 1 trụ sạc' : 'Đã thêm trụ sạc'} checkActive={!listDataSpecification || listDataSpecification.length === 0 ? false : true} setModal={setModalListStation} />
            <ItemForList title={'Ghi chú'} content={valueNote ? valueNote : 'Chưa ghi chú'} checkActive={valueNote ? true : false} setModal={setModalNoteStation} />

            {/* nút thêm trạm sạc  */}
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={addNewStaion}
                    style={{
                        margin: '10%',
                        padding: 15,
                        backgroundColor: COLOR.green3,
                        borderRadius: 10,
                        width: '60%'
                    }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Thêm mới trạm sạc </Text>
                </TouchableOpacity>
            </View>

            {/*  banr đồ  */}
            <Modal transparent={true} visible={modalVisibleMap} animationType="slide">
                <View style={styles.modalOverlay}>

                    <View style={[styles.modalContent, { height: '80%', }]}>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisibleMap(false);
                                    setAddress(null);
                                }}
                                style={styles.applyButton}>
                                <Text style={styles.applyText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity

                                onPress={() => {
                                    setModalVisibleMap(false);

                                }}
                                style={styles.applyButton}>
                                <Text style={styles.applyText}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                        <MapView
                            ref={mapRef}
                            style={styles.map}
                            initialRegion={{
                                latitude: 14.0583,
                                longitude: 108.2772,
                                latitudeDelta: 5,
                                longitudeDelta: 5,
                            }}
                            onPress={handleMapPress}
                        >
                            {selectedLocation && (
                                <Marker coordinate={selectedLocation} title="Vị trí đã chọn" />
                            )}
                        </MapView>

                        <View style={styles.buttonContainer}>
                            <Text style={{ fontSize: SIZE.size16, marginHorizontal: '5%', width: '70%' }} numberOfLines={1}  >{address}</Text>
                            <TouchableOpacity
                                style={{
                                    padding: 10,
                                    borderColor: COLOR.green3,
                                    borderWidth: 1,
                                    borderRadius: 30,
                                    backgroundColor: 'white',
                                    marginRight: '5%',
                                }}
                                onPress={getCurrentLocation}>
                                <Image style={{ width: 30, height: 30, }} source={require('../../../assets/icon/icons8-my-location-48.png')} />
                            </TouchableOpacity>

                        </View>
                    </View>



                </View>
            </Modal>

            {/* thêm ảnh  */}
            <Modal transparent={true} visible={modalVisibleImage} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* thêm ảnhảnh */}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisibleImage(false);
                                    setImageStation(null)
                                }}
                                style={styles.applyButton}>
                                <Text style={styles.applyText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisibleImage(false);
                                }}
                                style={styles.applyButton}>
                                <Text style={styles.applyText}>Thêm</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.textTitleInput}>Thêm hình ảnh</Text>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={pickImage}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '75%',
                                    height: 170,
                                    borderStyle: 'dashed',
                                    borderWidth: imageStation ? 0 : 2,
                                    margin: '5%',
                                    borderColor: COLOR.green3,
                                    borderRadius: 30,
                                    backgroundColor: 'white'
                                }} >
                                {
                                    imageStation ?
                                        <Image source={{ uri: imageStation }} style={{ width: '100%', height: 170, borderRadius: 30, }} />
                                        :
                                        <Image source={require('../../../assets/icon/plus.png')} style={{ width: 70, height: 70, borderRadius: 30 }} />
                                }
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

            {/* Tên trạm sạc */}
            <Modal transparent={true} visible={modalNameStation} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalNameStation(false);
                                    setNameStation(null);
                                }}
                                style={styles.applyButton}>
                                <Text style={styles.applyText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalNameStation(false);
                                }}
                                style={styles.applyButton}>
                                <Text style={styles.applyText}>Thêm</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.textTitleInput}>Tên trạm sạc</Text>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: '5%'
                            }}>
                            <TextInput onChangeText={setNameStation} value={nameStation} style={styles.textInput} placeholder={'Nhập tên'} />
                        </View>
                        {checkNameStation && <Text style={styles.errorText}>Tên trạm phải từ 10-50 ký tự</Text>}
                    </View>
                </View>
            </Modal>
            {/* thời gian  */}

            <Modal transparent={true} visible={modalTimeStation} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalTimeStation(false);
                                    setTimeStation(null)
                                }}
                                style={styles.applyButton}>
                                <Text style={styles.applyText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={CheckTime}
                                style={styles.applyButton}>
                                <Text style={styles.applyText}>Thêm</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.textTitleInput}>Thiết lập thời gian trạm sạc</Text>
                        <View style={{ marginHorizontal: '5%', marginTop: '3%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text> 24/7</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: '#42E529FF' }}
                                thumbColor={isEnabled ? '#FFFFFFFF' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <View style={styles.viewInput}>
                            <ItemTitle1 title={'Thời gian bắt đầu'} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '2%' }}>
                                <ItemButton1 title={'Chọn giờ '} onPress={showTimeStartPicker} />
                                <ItemText1 title={timeStart ? timeStart : "Chọn giờ"} />

                            </View>
                            <ItemTitle1 title={'Thời gian kết thúc'} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '2%' }}>
                                <ItemButton1 title={'Chọn giờ '} onPress={showTimeEndPicker} />
                                <ItemText1 title={timeEnd ? timeEnd : "Chọn giờ"} />
                            </View>
                            {checkTime && <Text style={styles.errorText}>Vui lòng chọn thời gian hợp lệ</Text>}

                            <DateTimePickerModal
                                isVisible={isTimeStartVisible}
                                mode="time"
                                onConfirm={handleConfirmTimeStart}
                                onCancel={hideTimeStartPicker}
                            />
                            <DateTimePickerModal
                                isVisible={isTimeEndVisible}
                                mode="time"
                                onConfirm={handleConfirmTimeEnd}
                                onCancel={hideTimeEndPicker}
                            />
                        </View>


                    </View>
                </View>
            </Modal>

            {/* thêm trụ sạc */}
            <Modal transparent={true} visible={modalDetailStation} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                onPress={cancelForm}
                                style={styles.applyButton}>
                                <Text style={styles.applyText}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: '5%' }}>
                            <ItemText1 title={'Công suất'} />
                            <ItemTextInput1 value={valuePower} onChangeValue={onChangeTextKw} checkValue={checkKw} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: '5%' }}>
                            <ItemText1 title={'Cổng sạc'} />
                            <ItemTextInput1 value={valuePorts} onChangeValue={onChangeTextChager} checkValue={checkCharger} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: '5%' }}>
                            <ItemText1 title={'Giá tiền'} />
                            <ItemTextInput1 value={valuePrice} onChangeValue={onChangeTextPrice} checkValue={checkPrice} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: '5%' }}>

                            <TouchableOpacity
                                onPress={() => setModalVisibleVehicle(true)}
                                style={{ backgroundColor: COLOR.green3, padding: 15, paddingHorizontal: 5, width: '45%', borderRadius: 5, alignItems: 'center' }}>
                                <Text style={{ fontSize: SIZE.size14, color: 'white' }}>
                                    Chọn phương tiện
                                </Text>
                            </TouchableOpacity>
                            <ItemTextInput1 value={selectedVehical?.[1] || "Tất cả"} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: '5%' }}>

                            <TouchableOpacity
                                onPress={() => setModalVisiblePort(true)}
                                style={{ backgroundColor: COLOR.green3, padding: 15, paddingHorizontal: 5, width: '45%', borderRadius: 5, alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'white' }} >Loại đầu sạc</Text>

                            </TouchableOpacity>
                            <ItemTextInput1 value={selectedSocket && selectedSocket.length > 0 ? selectedSocket[1] : 'Loại đầu sạc'} checkValue={checkSocket} />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={validateCharger}
                                style={{
                                    margin: '5%',
                                    padding: '3%',
                                    marginBottom: '2%',
                                    width: '40%',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    height: 50,
                                    borderWidth: 1,
                                    borderColor: COLOR.green3,
                                }}>
                                <Text
                                    style={{ color: COLOR.green3, textAlign: 'center', fontWeight: '700' }}>
                                    {editIndex ? "Cập nhật" : "Lưu trụ sạc"}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>

            {/* list trụ sạc */}
            <Modal transparent={true} visible={modalListStation} animationType="slide">
                <View style={styles.modalOverlay}>

                    <View style={styles.modalContent}>

                        <View style={[styles.buttonRow, { justifyContent: 'flex-end' }]}>

                            <TouchableOpacity
                                onPress={() => {
                                    setModalListStation(false);
                                }}
                                style={styles.applyButton}>
                                <Text style={styles.applyText}>Thêm</Text>
                            </TouchableOpacity>
                        </View>
                        {checkCharging && <Text style={styles.errorText}>Cần tối thiểu một trụ sạc</Text>}
                        <FlatList
                            style={{ width: '100%' }}
                            data={listDataSpecification}

                            renderItem={({ item, index }) => (
                                item ? (
                                    <View style={styles.containerList}>

                                        <View style={styles.centerColumn}>
                                            <View style={styles.infoRow}>
                                                <Image style={styles.icon} source={require('../../../assets/icon/icons8-flash-50 (1).png')} />
                                                <Text style={styles.textList}>{item.kw} Kw</Text>
                                            </View>
                                            <View style={styles.infoRow}>
                                                <Image style={styles.icon} source={require('../../../assets/icon/icons8-car-charger-48.png')} />
                                                <Text style={styles.textList}>{item.slot} Cổng sạc</Text>
                                            </View>
                                            <View style={styles.infoRow}>
                                                <Image style={{ width: 32, height: 32, marginLeft: '-4%', marginRight: 5 }} source={require('../../../assets/imageSocket/power-plug.png')} />
                                                <Text style={styles.textList}>{item.port_id?.name || "Không xác định"}</Text>
                                            </View>
                                            <View style={styles.infoRow}>
                                                <Image style={styles.icon} source={require('../../../assets/icon/icons8-money-50 (1).png')} />
                                                <Text style={styles.textList}>
                                                    {parseInt(item.price, 10).toLocaleString('vi-VN')} đ/KWh
                                                </Text>
                                            </View>
                                            <View style={styles.infoRow}>
                                                {item.vehicle_id.name === 'Xe máy điện' ?
                                                    <>
                                                        <Image style={styles.icon} source={require('../../../assets/icon/electric-scooter.png')} />
                                                    </>
                                                    :
                                                    <>
                                                        <Image style={styles.icon} source={require('../../../assets/icon/icons8-car-50 (1).png')} />
                                                    </>

                                                }
                                                <Text style={styles.textList}>{item.vehicle_id.name}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.rightColumn}>
                                        </View>
                                        <TouchableOpacity onPress={() => deleteSpecificationById(item._id)} style={{ position: 'absolute', top: 10, right: 10, width: 24, height: 24 }}>
                                            <Image source={require('../../../assets/icon/close.png')} style={{ width: 24, height: 24 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => editDetail(item._id)} style={{ position: 'absolute', top: 50, right: 10, width: 24, height: 24 }}>
                                            <Image source={require('../../../assets/icon/pencil.png')} style={{ width: 24, height: 24 }} />
                                        </TouchableOpacity>
                                    </View>
                                ) : null
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <TouchableOpacity
                            onPress={() => setModalDetailStation(true)}
                            style={{
                                width: '100%',
                                padding: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLOR.gray2
                            }}>
                            <Text>
                                Thêm trụ sạc mới
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal transparent={true} visible={modalNoteStation} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalNoteStation(false);
                                    setValueNote(null)
                                }}
                                style={styles.applyButton}>
                                <Text style={styles.applyText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalNoteStation(false);

                                }}
                                style={styles.applyButton}>
                                <Text style={styles.applyText}>Thêm</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.textTitleInput}>Ghi chú</Text>
                        <TextInput
                            style={{ textAlignVertical: 'top', margin: '5%', height: 100, }}
                            placeholder={'Ghi chú'}
                            multiline
                            onChangeText={setValueNote}
                        />
                    </View>
                </View>
            </Modal>

            <ItemModalRadioButtonImage
                checkModal={modalVisibleBrand}
                setModalVisible={setModalVisibleBrand}
                data={dataBrand}
                selectedItem={selectedBrand}
                setSelectedItem={setSelectedBrand}
                title={'Hãng Sạc'}
            />
            <ItemModalCheckBoxImage
                checkModal={modalVisibleService}
                setModalVisible={setModalVisibleSevice}
                data={dataService}
                selectedItems={selectedServices}
                setSelectedItems={setSelectedServices}
                title={'Dịch vụ'}
            />
            <ItemModalRadioButton
                checkModal={modalVisibleVehicle}
                setModalVisible={setModalVisibleVehicle}
                data={dataVehicle}
                selectedItem={selectedVehical}
                setSelectedItem={setSelectedVehical}
                title={'Loại phương tiện'}
            />

            <ItemModalRadioButtonImage
                checkModal={modalVisiblePort}
                setModalVisible={setModalVisiblePort}
                data={dataPort}
                selectedItem={selectedSocket}
                setSelectedItem={setSelectedSocket}
                title={'Loại đầu sạc'}
            />

        </ScrollView>
    )
}

export default FormStation

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        height: '70%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLOR.green3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    cancelButton: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        marginHorizontal: '5%',
        marginVertical: '5%',
        flex: 1,
        backgroundColor: COLOR.gray2,
    },
    cancelText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: SIZE.size16,
    },
    applyButton: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',

    },
    applyText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: SIZE.size16,
    },
    title: {
        fontSize: 20,
        marginBottom: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    result: {
        marginTop: 16,
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
    },
    viewInput: {
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: COLOR.gray2,
        borderRadius: 10,
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '2%',
    },
    textTitleInput: {
        margin: 10,
        fontSize: SIZE.size18,
        textAlign: 'center'
    },
    textInput: {
        width: '100%',
        height: 50,
        fontSize: 16,
        paddingHorizontal: 10,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: COLOR.green3,
        borderRadius: 0,
        marginLeft: '5%',
        marginRight: '5%',
        marginVertical: '2%',
        fontWeight: 'bold'
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    buttonType1: {
        // marginVertical: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLOR.green3,
        width: '30%',
        height: 40,
        borderBottomWidth: 1,
    },
    map: {
        width: '100%',
        height: '80%',
        borderRadius: 20,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '10%',
        flexDirection: 'row',

    },
    // list trụ sạc
    containerList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        margin: '2%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '96%'
    },
    centerColumn: {
        marginHorizontal: '2%'
    },
    rightColumn: {
        marginHorizontal: '2%'
    },
    boldText: {
        fontWeight: 'bold',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 5,
    },
    textList: {
        fontSize: 18,
    },

});