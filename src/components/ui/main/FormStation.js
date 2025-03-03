import { StyleSheet, Text, View, ScrollView, Image, Modal, ToastAndroid, Alert, FlatList, TextInput, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import { COLOR } from "../../../assets/Theme/Theme";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { ItemBoxLocation, ItemCheckBox, ItemInputCharging, ItemRadioButton } from '../../item/Item';
import { AppContext } from '../../axios/AppContext';
import AxiosInstance from '../../axios/AxiosInstance';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { firebase } from '../../../../config';
import { ItemListModal, ItemModalRadioButton, ItemModalCheckBox, ItemModalRadioButtonImage, ItemModalCheckBoxImage } from '../../item/Modal';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const API_BASE = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
const TOKEN = '46f53dba-ecf6-11ef-a268-9e63d516feb9';

const FormStation = () => {
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

            const locationString = `${locationDetail}, ${location.wardName}, ${location.districtName}, ${location.provinceName}`;

            if (!imageStation) {
                ToastAndroid.show('Vui lòng chọn ảnh trạm!', ToastAndroid.SHORT);
                return;
            }
            if (!nameStation) {
                ToastAndroid.show('Vui lòng nhập tên trạm!', ToastAndroid.SHORT);
                return;
            }
            if (!timeStart || !timeEnd) {
                ToastAndroid.show('Vui lòng chọn thời gian hoạt động!', ToastAndroid.SHORT);
                return;
            }
            if (!selectedBrand || selectedBrand.length === 0) {
                ToastAndroid.show('Vui lòng chọn thương hiệu!', ToastAndroid.SHORT);
                return;
            }
            if (!formattedServices || formattedServices.length === 0) {
                ToastAndroid.show('Vui lòng chọn dịch vụ!', ToastAndroid.SHORT);
                return;
            }
            if (!selectedLocation.latitude || !selectedLocation.longitude) {
                ToastAndroid.show('Vui lòng chọn vị trí trạm!', ToastAndroid.SHORT);
                return;
            }
            if (!formattedSpecifications || formattedSpecifications.length === 0) {
                ToastAndroid.show('Vui lòng nhập thông số kỹ thuật!', ToastAndroid.SHORT);
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
                            location: locationString,
                            lat: selectedLocation.latitude,
                            lng: selectedLocation.longitude,
                            time: `${timeStart} - ${timeEnd}`,
                            note: valueNote
                        });

                        if (dataStation) {
                            ToastAndroid.show('Đã ghi nhận thông tin', ToastAndroid.SHORT);
                            setSelectedBrand([]);
                            setSelectedServices([]);
                            setListDataSpecification([]);
                            setImageStation(null);
                            setNameStation(null);
                            setTimeStart('00:00');
                            setTimeEnd('00:00');
                            setLoactionDetail(null);
                        } else {
                            ToastAndroid.show('Có lỗi xảy ra, vui lòng kiểm tra lại', ToastAndroid.SHORT);
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

    //modal
    const [modalVisibleMap, setModalVisibleMap] = useState(false);

    // ban do 
    const initialLocation = { latitude: 14.0583, longitude: 108.2772 };
    const [myLocation, setMyLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const mapRef = useRef(null);


    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        console.log("Vị trí đã chọn:", latitude, longitude);
        setSelectedLocation({ latitude, longitude });
    };

    const _getLocation = useCallback(async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.warn('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            console.log("Vị trí hiện tại:", location.coords);
            setMyLocation(location.coords);
            focusOnLocation(location.coords);
        } catch (err) {
            console.warn("Lỗi lấy vị trí:", err);
        }
    }, []);

    const focusOnLocation = (coords) => {
        if (mapRef.current && coords) {
            const newRegion = {
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
            mapRef.current.animateToRegion(newRegion, 1000);
        }
    };


    // gia tri form
    const [editIndex, setEditIndex] = useState(null);
    const [locationDetail, setLoactionDetail] = useState(null);
    const [nameStation, setNameStation] = useState(null);
    const [valuePower, setValuePower] = useState('');
    const [valuePorts, setValuePorts] = useState('');
    const [valuePrice, setValuePrice] = useState('');
    const [valueNote, setValueNote] = useState('');
    const [chargingDetails, setChargingDetails] = useState([]);


    // địa điểm 
    const [location, setLocation] = useState({
        provinceName: '',
        districtName: '',
        wardName: ''
    });
    const handleLocationSelect = (selectedLocation) => {
        setLocation(selectedLocation);
    };

    // dịch vụ 
    const [selectedServices, setSelectedServices] = useState([]);
    const handleServiceSelect = (selected) => {
        setSelectedServices(selected);
    };

    // thương hiệu
    const [selectedBrand, setSelectedBrand] = useState([]);
    const handleBrandSelect = (brandId) => {
        setSelectedBrand(brandId);
    };

    // phương tiện
    const [selectedVehical, setSelectedVehical] = useState([]);
    const handleVehicalSelect = (VehicalId) => {
        setSelectedVehical(VehicalId);
    };
    const [selectedSocket, setSelectedSocket] = useState([]);
    //dau sac 
    const handleSocketSelect = (ScoketId) => {
        setSelectedSocket(ScoketId);
    };



    const [invisible, setInvisible] = useState(false);
    //luu tram sac
    const addOrUpdateDetail = () => {
        const newDetail = { id: dataSpecification._id, power: dataSpecification.kw, ports: dataSpecification.slot, price: dataSpecification.price, vehicle: dataSpecification.vehicle_id.name, type: dataSpecification.port_id.name };
        if (editIndex !== null) {
            const updatedList = [...chargingDetails];
            updatedList[editIndex] = newDetail;
            setChargingDetails(updatedList);
            setEditIndex(null);
        } else {
            setChargingDetails([...chargingDetails, newDetail]);
        }
        clearForm();
        setInvisible(true);
    };

    const editDetail = (index) => {
        const item = chargingDetails[index];
        setValuePower(item.power);
        setValuePorts(item.ports);
        setValuePrice(item.price);
        setSelectedVehical(item.vehicle);
        setSelectedSocket(item.type);
        setEditIndex(index);
        setInvisible(false);
    };

    const deleteDetail = (index) => {
        setChargingDetails(chargingDetails.filter((_, i) => i !== index));
    };

    const clearForm = () => {
        setValuePower('');
        setValuePorts('');
        setValuePrice('');
        setSelectedVehical([]);
        setSelectedSocket([]);
    };

    //thoi gian
    const [timeStart, setTimeStart] = useState('00:00');
    const [timeEnd, setTimeEnd] = useState('00:00');
    const [isTimeStartVisible, setTimeStartVisibility] = useState(false);
    const [isTimeEndVisible, setTimeEndVisibility] = useState(false);

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
    const [checkKw, setCheckKw] = useState(false);
    const [checkCharger, setCheckCharger] = useState(false);
    const [checkPrice, setCheckPrice] = useState(false);
    const [checkVehicle, setCheckVehicle] = useState(false);
    const [checkSocket, setCheckSocket] = useState(false);
    const [checkCharging, setCheckCharging] = useState(false);

    // Kiểm tra thông tin trạm sạc
    const validateStation = () => {
        let isValid = true;

        if (!image) {
            setCheckImg(true);
            isValid = false;
        } else setCheckImg(false);

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

        if (chargingDetails.length === 0) {
            setCheckCharging(true);
            isValid = false;
        } else {
            setCheckCharging(false);
            isValid = false;
        }

        return isValid;
    };

    // Kiểm tra thông tin bộ sạc
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

        if (!selectedVehical) {
            setCheckVehicle(true);
            isValid = false;
        } else setCheckVehicle(false);

        if (!selectedSocket) {
            setCheckSocket(true);
            isValid = false;
        } else setCheckSocket(false);

        if (isValid) {
            addNewSpecification();
        }

        return isValid;
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
            {/* thêm ảnhảnh */}
            <View style={styles.viewInput}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={pickImage}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: 170,
                            borderStyle: 'dashed',
                            borderWidth: 2,
                            margin: '5%',
                            marginBottom: '0%',
                            borderColor: COLOR.green3,
                            borderRadius: 30
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
            {/* thêm tên trạm sạc  */}
            <View style={styles.viewInput}>
                <Text style={[styles.textTitleInput,]}>Tên trạm sạc</Text>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: '2%'
                    }}>
                    <TextInput onChangeText={setNameStation} style={styles.textInput} placeholder={'Nhập tên'} />

                </View>
                {checkNameStation && <Text style={styles.errorText}>Tên trạm phải từ 10-50 ký tự</Text>}
            </View>
            {/* thời gian hoạt động  */}
            <View style={styles.viewInput}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.textTitleInput}>Thời gian hoạt động</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '0%' }}>
                    <TouchableOpacity
                        onPress={() => showTimeStartPicker()}
                        style={[styles.buttonType1, { width: '40%', flexDirection: 'row', justifyContent: 'space-evenly' }]}>
                        <Text style={{ fontSize: 20 }}>{timeStart ? timeStart : "Chọn giờ"}</Text>
                        <Image style={{ width: 30, height: 30 }} source={require('../../../assets/icon/icons8-time-24.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => showTimeEndPicker()}
                        style={[styles.buttonType1, { width: '40%', flexDirection: 'row', justifyContent: 'space-evenly' }]}>
                        <Text style={{ fontSize: 20 }}>{timeEnd ? timeEnd : "Chọn giờ"}</Text>
                        <Image style={{ width: 30, height: 30 }} source={require('../../../assets/icon/icons8-time-24.png')} />
                    </TouchableOpacity>
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
            {/* vị trí trạm sạc  */}
            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}> Chọn vị trí</Text>
                <ItemBoxLocation onSelect={handleLocationSelect} />

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }} >
                    <TextInput style={[styles.textInput, { width: '55%' }]} onChangeText={setLoactionDetail} placeholder={'Nhập vị trí chi tiết'} />
                    <TouchableOpacity
                        onPress={() => setModalVisibleMap(true)}
                        style={styles.buttonType2}>
                        <Text style={{ textAlign: 'center', color: COLOR.green3, fontWeight: 'bold' }}>Chọn vị trí</Text>
                    </TouchableOpacity>
                </View>
                {checkLocation && <Text style={styles.errorText}>Vui lòng nhập đầy đủ thông tin</Text>}
            </View>
            {/* hãng trạm sạc  */}
            {/* dịch vụ */}
            <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '45%' }}>
                        <Text style={{ fontSize: 20, color: COLOR.green3, fontWeight: 'bold' }}>Hãng sạc</Text>
                        <TouchableOpacity onPress={() => setModalVisibleBrand(true)}
                            style={[styles.buttonType1, { width: '70%', flexDirection: 'row', justifyContent: 'space-around' }]}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {selectedBrand?.[1] || "Chọn hãng sạc"}
                            </Text>
                            <Image style={{ width: 30, height: 30 }} source={require('../../../assets/icon/down.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '45%' }}>
                        <Text style={{ fontSize: 20, color: COLOR.green3, fontWeight: 'bold' }}>Dịch vụ</Text>
                        <TouchableOpacity onPress={() => setModalVisibleSevice(true)}
                            style={[styles.buttonType1, { width: '70%', flexDirection: 'row', justifyContent: 'space-around' }]}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {selectedServices && selectedServices.length > 0 ? "Đã chọn" : "Chọn dịch vụ"}
                            </Text>
                            <Image style={{ width: 30, height: 30 }} source={require('../../../assets/icon/down.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

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

            {/* chi tiết trụ sạc  */}
            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}>Chi tiết trụ sạc</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
                    <TextInput style={{ borderBottomWidth: 1, borderColor: COLOR.green3, width: '30%', textAlign: "center", color: 'black', fontWeight: '700', fontSize: 16, }} onChangeText={onChangeTextKw} placeholder='Kw' value={valuePower} keyboardType="numeric" />
                    <TextInput style={{ borderBottomWidth: 1, borderColor: COLOR.green3, width: '30%', textAlign: "center", color: 'black', fontWeight: '700', fontSize: 16, }} onChangeText={onChangeTextChager} placeholder='Số cổng' value={valuePorts} keyboardType="numeric" />
                    <TextInput style={{ borderBottomWidth: 1, borderColor: COLOR.green3, width: '30%', textAlign: "center", color: 'black', fontWeight: '700', fontSize: 16, }} onChangeText={onChangeTextPrice} placeholder='Giá' value={valuePrice} keyboardType="numeric" />
                </View>
                {(checkKw || checkCharger || checkPrice) && <Text style={styles.errorText}>Vui lòng nhập đầy đủ thông tin</Text>}
                <View style={{ width: '100%', flexDirection: 'row', marginTop: '5%', justifyContent: 'space-around' }}>
                    <View style={{ width: '45%' }}>
                        <TouchableOpacity onPress={() => setModalVisibleVehicle(true)} style={{ width: '100%', padding: '7%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#D7D7D7', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {selectedVehical?.[1] || "Chọn phương tiện"}
                            </Text>
                            <Image style={{ width: 24, height: 24, marginLeft: '5%' }} source={require('../../../assets/icon/down.png')}></Image>
                        </TouchableOpacity>
                        {/* <ItemRadioButton data={dataVehicle} onSelect={handleVehicalSelect} selectedValue={selectedVehical} />
                        {checkVehicle && <Text style={styles.errorText} >Vui lòng chọn phương tiện</Text>} */}
                    </View>
                    <View style={{ width: '45%' }}>
                        <TouchableOpacity onPress={() => setModalVisiblePort(true)} style={{ width: '100%', padding: '7%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#D7D7D7', flexDirection: 'row' }}>
                            {selectedSocket && selectedSocket.length > 0 ?
                                <>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }} >{selectedSocket[1]}</Text>
                                </>
                                :
                                <>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }} >Loại đầu sạc</Text>
                                </>
                            }
                            <Image style={{ width: 24, height: 24, marginLeft: '5%' }} source={require('../../../assets/icon/down.png')}></Image>
                        </TouchableOpacity>
                        {/* <ItemRadioButton data={dataPort} onSelect={handleSocketSelect} selectedValue={selectedSocket} />
                        {checkSocket && <Text style={styles.errorText}>Vui lòng chọn loại sạc</Text>} */}
                    </View>

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
                            {editIndex !== null ? "Cập nhật" : "Lưu trụ sạc"}
                        </Text>
                    </TouchableOpacity>

                </View>
                {checkCharging && <Text style={styles.errorText}>Cần tối thiểu một trụ sạc</Text>}
                <FlatList
                    style={{ width: '100%' }}
                    data={listDataSpecification}
                    scrollEnabled={false}
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
                            </View>
                        ) : null
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />


            </View>
            {/* ghi chú  */}
            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}>Ghi chú</Text>
                <TextInput
                    style={[styles.textInput, { textAlignVertical: 'top', width: '100%', margin: '5%', marginLeft: '0%', height: 100, }]}
                    placeholder={'Ghi chú'}
                    multiline
                    onChangeText={setValueNote}
                />
            </View>
            {/* nút thêm trạm sạc  */}
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={addNewStaion}
                    style={{
                        margin: '10%',
                        padding: '5%',
                        backgroundColor: COLOR.green3,
                        borderRadius: 10,
                        width: '60%'
                    }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>Thêm mới trạm sạc </Text>
                </TouchableOpacity>
            </View>
            {/* phần list danh dách  */}

            <Modal transparent={true} visible={modalVisibleMap} animationType="slide">
                <View style={styles.modalOverlay}>

                    <View style={{ width: '90%', height: '80%', borderRadius: 20 }}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: initialLocation.latitude,
                                longitude: initialLocation.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            ref={mapRef}
                            provider="google"
                            onPress={handleMapPress}>
                            {/* Hiển thị marker khi người dùng chọn trên bản đồ */}
                            {selectedLocation && (
                                <Marker
                                    coordinate={selectedLocation}
                                    title="Vị trí đặt trạm sạc"
                                    description="Bạn đã chọn vị trí này"
                                />
                            )}
                        </MapView>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={{
                                    padding: 10,
                                    borderColor: COLOR.green3,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    backgroundColor: 'white'
                                }}
                                onPress={_getLocation}>
                                <Text style={{ fontSize: 20 }}>Lấy vị trí hiện tại</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisibleMap(false);
                                if (selectedLocation) {
                                    setMyLocation(selectedLocation); // Chỉ cập nhật nếu chọn vị trí
                                }
                            }}
                            style={styles.applyButton}>
                            <Text style={styles.applyText}>Ok</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>


        </ScrollView>
    )
}

export default FormStation

const styles = StyleSheet.create({

    listStatus: {
        justifyContent: 'center',
    },
    buttonStatus: {
        borderRadius: 15,
        backgroundColor: '#EDEDED',
        marginRight: 20,
        padding: 15,
        margin: 10,
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
        justifyContent: 'flex-start',
        padding: 10,
    },
    filterText: {
        fontSize: 16,
        marginLeft: 10,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.green3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLOR.green3,
    },
    buttonRow: {
        flexDirection: 'row',
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
        backgroundColor: COLOR.green3,
        padding: 20,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: '5%'
    },
    applyText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: COLOR.green3,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedBox: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    checkmark: {
        color: 'white',
        fontWeight: 'bold',
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

    buttonList: {
        margin: '2%',
        padding: '2%',
        paddingLeft: '5%',
        paddingRight: '5%',
        borderRadius: 20,
        alignItems: 'center'
    },
    container: {

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
        fontSize: 20,
        color: COLOR.green3,
        fontWeight: 700,
        fontFamily: 'Poppins'
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
    modalDropdowChager: {
        width: 150,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
    },
    dropdownStyleChager: {
        width: 150,
        alignItems: 'center',
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
    buttonType2: {
        margin: '5%',
        padding: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLOR.green3,
        width: '30%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
    },

    map: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },

    // list trụ sạc
    listItem: {
        marginVertical: 5,
    },
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
    buttonList: {

        alignItems: 'center',
        justifyContent: 'center'
    },
    editButton: {
        borderWidth: 1,
        borderColor: COLOR.green3,
        padding: 7,
        paddingHorizontal: 15,
        borderRadius: 8,
        margin: 5
    },
    editText: {
        color: COLOR.green3,
    },
    deleteText: {
        color: 'red',
    },


});

