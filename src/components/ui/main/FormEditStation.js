import { StyleSheet, Text, View, ScrollView, Image, Modal, ToastAndroid, Switch, Alert, FlatList, TextInput, ActivityIndicator, TouchableOpacity, Button, Platform, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useRef, useState, useContext } from 'react';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MapView, { Marker } from 'react-native-maps';
import AxiosInstance from '../../axios/AxiosInstance';
import { COLOR, SIZE } from "../../../assets/Theme/Theme";
import { AppContext } from '../../axios/AppContext';
import { firebase } from '../../../../config';
import { ItemModalRadioButton, ItemModalRadioButtonImage, ItemModalCheckBoxImage } from '../../item/Modal';
import { ItemButton1, ItemForList, ItemText1, ItemTitle1, ItemTextInput1, ItemButton2, ItemLoading, ItemTextInput2, ItemText2, ItemTimePicker, ItemButtonSwitch, ItemDropDownCheckBox, ItemDropDownRadioButton, ItemTextInput3, ItemCheckBoxDP, ItemRadioDP } from '../../item/ItemList';

const API_BASE = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
const TOKEN = '46f53dba-ecf6-11ef-a268-9e63d516feb9';

const FormEditStation = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const { idUser } = useContext(AppContext);

    const showAlert = (title, content) => {
        Alert.alert(title, content, [
            { text: "OK" },
        ]);
    };

    const clearForm = () => {
        setValuePower('');
        setValuePorts('');
        setValuePrice('');
        setSelectedVehical([]);
        setSelectedSocket([]);
        setEditIndex(null);
    };

    const clearFormStation = () => {
        setSelectedBrand([]);
        setSelectedServices([]);
        setListDataSpecification([]);
        setImageStation(null);
        setNameStation(null);
        setTimeStart('00:00');
        setTimeEnd('00:00');
        setLoactionDetail(null);
    }

    // vale form
    const [editIndex, setEditIndex] = useState(null);
    const [locationDetail, setLoactionDetail] = useState(null);
    const [nameStation, setNameStation] = useState(null);
    const [valuePower, setValuePower] = useState('');
    const [valuePorts, setValuePorts] = useState('');
    const [valuePrice, setValuePrice] = useState('');
    const [valueNote, setValueNote] = useState(null);
    const [timeStart, setTimeStart] = useState('00:00');
    const [timeEnd, setTimeEnd] = useState('00:00');
    const [timeStation, setTimeStation] = useState(null);
    const [imageStation, setImageStation] = useState(null);
    const [choseImageStation, setChoseImageStation] = useState(null);
    const [urlImageStation, setUrlImageStation] = useState(null);

    // validation
    const [checkKw, setCheckKw] = useState(false);
    const [checkCharger, setCheckCharger] = useState(false);
    const [checkPrice, setCheckPrice] = useState(false);
    const [checkVehical, setCheckVehical] = useState(false);
    const [checkSocket, setCheckSocket] = useState(false);
    const [checkButtonEdit, setCheckButtonEdit] = useState(false);


    const [checkLoading, setCheckLoading] = useState(false);

    // open/close item
    const [modalVisibleMap, setModalVisibleMap] = useState(false);
    const [openDropdownPlace, setOpenDropdownPlace] = useState(false);
    const [openDropdownBrandCar, setOpenDropdownBrandCar] = useState(false);
    const [openDropdownBrandStation, setOpenDropdownBrandStation] = useState(false);
    const [openDropdownServices, setOpenDropdownServices] = useState(false);
    const [openDropdownVehical, setOpenDropdownVehical] = useState(false);
    const [openDropdownSocket, setOpenDropdownSocket] = useState(false);

    // selected data
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedVehical, setSelectedVehical] = useState([]);
    const [selectedSocket, setSelectedSocket] = useState([]);
    const [selectedBrandCar, setSelectedBrandCar] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState([]);

    // get data
    const [dataService, setDataService] = useState(null);
    const [dataBrand, setDataBrand] = useState(null);
    const [dataVehicle, setDataVehicle] = useState(null);
    const [dataPort, setDataPort] = useState(null);
    const [dataBrandCar, setDataBrandCar] = useState(null);
    const [dataPlace, setDataPlace] = useState(null);

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
    const getDataBrandCar = async () => {
        try {
            const dataPort = await AxiosInstance().get('/brandcar/get');
            if (dataPort.data && dataPort.data.length > 0) {
                setDataBrandCar(dataPort.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /port/get');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu port:', error);
        }
    };
    const getDataPlace = async () => {
        try {
            const dataPort = await AxiosInstance().get('/location/get');
            if (dataPort.data && dataPort.data.length > 0) {
                setDataPlace(dataPort.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /port/get');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu port:', error);
        }
    };
    // Specification
    const [listDataSpecification, setListDataSpecification] = useState([]); // gộp dataSpecification thành 1 mảng

    const addNewSpecification = async () => {
        try {
            setCheckLoading(true);
            if (valuePower && valuePorts && valuePrice && selectedVehical && selectedSocket) {

                const formattedVehical = selectedVehical.map(item => ({ vehicle_id: item.value }));

                const dataSpecification = await AxiosInstance().post('/specification/addNew',
                    {
                        user_id: idUser, vehicle: formattedVehical, port_id: selectedSocket.value, kw: valuePower, slot: valuePorts, price: valuePrice
                    });

                if (dataSpecification.data) {
                    const vehicleInfo = dataSpecification.data.vehicle.map(v => ({
                        vehicle_id: v.vehicle_id._id,
                        vehicle_name: v.vehicle_id.name,
                        _id: v._id,
                    }));

                    const newData = {
                        ...dataSpecification.data,
                        vehicle: vehicleInfo,
                    };
                    setListDataSpecification(prevList => [...prevList, newData]);
                    clearForm();
                    setCheckLoading(false);

                } else {
                    console.log('Không tìm thấy dữ liệu từ /specification/addNew');
                    setCheckLoading(false);
                }
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu Specification:', error);
            setCheckLoading(false);
        }
    };

    const copySpecification = async (id) => {
        try {
            setCheckLoading(true);

            const item = listDataSpecification.find(spec => spec._id === id);

            if (!item) {
                console.error("Không tìm thấy dữ liệu với ID:", id);
                return;
            }

            if (item.kw.toString() && item.slot.toString() && item.price.toString() && item.vehicle && item.port_id?._id) {
                const dataSpecification = await AxiosInstance().post('/specification/addNew',
                    {
                        user_id: idUser, vehicle: item.vehicle, port_id: item.port_id?._id, kw: item.kw, slot: item.slot, price: item.price
                    });

                if (dataSpecification.data) {
                    const vehicleInfo = dataSpecification.data.vehicle.map(v => ({
                        vehicle_id: v.vehicle_id._id,
                        vehicle_name: v.vehicle_id.name,
                        _id: v._id,
                    }));

                    const newData = {
                        ...dataSpecification.data,
                        vehicle: vehicleInfo,
                    };
                    setListDataSpecification(prevList => [...prevList, newData]);
                    clearForm();
                    setCheckLoading(false);

                } else {
                    console.log('Không tìm thấy dữ liệu từ /specification/addNew');
                    setCheckLoading(false);
                }
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu Specification:', error);
            setCheckLoading(false);
        }
    };
    const editDetail = (id) => {
        setCheckButtonEdit(true)
        const item = listDataSpecification.find(spec => spec._id === id);
        if (!item) {
            setCheckButtonEdit(false)
            console.error("Không tìm thấy dữ liệu với ID:", id);
            return;
        }
        setValuePower(item.kw?.toString() || "");
        setValuePorts(item.slot?.toString() || "");
        setValuePrice(item.price?.toString() || "");

        const formattedVehicles = item?.vehicle
            ? item.vehicle.map((v, index) => ({
                _index: index + 1,
                image: undefined,
                label: v?.vehicle_name || "Không có dữ liệu",
                value: v?.vehicle_id || "",
            }))
            : [];

        setSelectedVehical(formattedVehicles);

        const formattedPort = {
            image: item.port_id.image,
            label: item.port_id.name,
            value: item.port_id._id
        };
        setSelectedSocket(formattedPort || "",);

        setEditIndex(id);
    };
    const updateSpecificationById = async (id) => {
        try {
            setCheckLoading(true);
            const formattedVehical = selectedVehical.map(item => ({ vehicle_id: item.value }));
            console.log(formattedVehical);
            
            const updatedData = {
                kw: valuePower,
                slot: valuePorts,
                price: valuePrice,
                vehicle: formattedVehical,
                port_id: selectedSocket.value
            };

            const response = await AxiosInstance().post('/specification/update', { id, ...updatedData });
            if (response) {
                const vehicleInfo = response.data.vehicle.map(v => ({
                    vehicle_id: v.vehicle_id._id,
                    vehicle_name: v.vehicle_id.name,
                    _id: v._id,
                }));

                const newData = {
                    ...response.data,
                    vehicle: vehicleInfo,
                };
                setListDataSpecification(prevList =>
                    prevList.map(item => item._id === id ? newData : item)
                );
                clearForm();
                setCheckLoading(false);
                setCheckButtonEdit(false)
            } else {
                console.error('Thất bại');
                clearForm();
                setCheckLoading(false);
                setCheckButtonEdit(false)
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật Specification:", error.response?.data || error.message);
            clearForm();
            setCheckLoading(false);
            setCheckButtonEdit(false)
        }
    };
    const deleteSpecificationById = async (id) => {
        try {
            setCheckLoading(true);
            const dataSpecificationById = await AxiosInstance().delete('/specification/deleteById',
                {
                    data: { id }
                });

            if (dataSpecificationById) {
                console.log('Xóa SpecificationById thành công')
                setCheckLoading(false);
                setListDataSpecification(prevList =>
                    prevList.filter(item => item._id !== id)
                );
            } else {
                setCheckLoading(false);
                console.log('Không tìm thấy dữ liệu từ /specification/addNew');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu Specification:', error);
            setCheckLoading(false);
        }
    }
    // Station
    const getDataStation = async () => {
        try {
            setCheckLoading(true);
            const dataStation = await AxiosInstance().post('/station/getById', { id: id });
            if (dataStation && dataStation.data) {

                setImageStation(dataStation.data.image); // ảnh
                setNameStation(dataStation.data.name); // tên
                setAddress(dataStation.data.location); // địa chỉ
                setValueNote(dataStation.data.note); // ghi chu

                const latitude = dataStation.data.lat; // lat
                const longitude = dataStation.data.lng; // lng
                setSelectedLocation({ latitude, longitude });

                if (dataStation.data.time) {
                    setTimeStation(dataStation.data.time);
                    if (dataStation.data.time === '24/7') {
                        setIsEnabled(true)
                    } else {
                        const [timeStart, timeEnd] = dataStation.data.time.split(' - ');
                        setTimeStart(timeStart);
                        setTimeEnd(timeEnd);
                    }

                }

                const formattedPlace = {
                    image: dataStation.data.address.image,
                    label: dataStation.data.address.name,
                    value: dataStation.data.address._id
                };
                setSelectedPlace(formattedPlace); // điểm đặt

                const formattedBrand = {
                    image: dataStation.data.brand_id.image,
                    label: dataStation.data.brand_id.name,
                    value: dataStation.data.brand_id._id
                };
                setSelectedBrand(formattedBrand); // hãng trạm sạc

                if (!dataStation.data.service) {
                    setSelectedServices([]);
                } else {
                    const formattedServices = dataStation.data.service.map((item, index) => ({
                        _index: index,
                        image: item.service_id.image,
                        label: item.service_id.name,
                        value: item.service_id._id
                    }));

                    setSelectedServices(formattedServices);
                }

                if (!dataStation.data.brandcar) {
                    setSelectedBrandCar([]);
                } else {
                    const formattedBrandCar = dataStation.data.brandcar.map((item, index) => ({
                        _index: index,
                        image: item.brandcar_id.image,
                        label: item.brandcar_id.name,
                        value: item.brandcar_id._id
                    }));
                    setSelectedBrandCar(formattedBrandCar);
                }

                const formattedSpecification = dataStation.data.specification.map(item => ({
                    _id: item.specification_id._id,
                    user_id: item.specification_id.user_id,
                    vehicle: Array.isArray(item.specification_id.vehicle)
                        ? item.specification_id.vehicle.map(v => ({
                            vehicle_id: v.vehicle_id._id,
                            vehicle_name: v.vehicle_id && v.vehicle_id.name ? v.vehicle_id.name : "Không có dữ liệu",
                        }))
                        : [],
                    port_id: {
                        _id: item.specification_id.port_id._id,
                        name: item.specification_id.port_id.name,
                        type: item.specification_id.port_id.type,
                        image: item.specification_id.port_id.image,
                    },
                    kw: item.specification_id.kw,
                    slot: item.specification_id.slot,
                    price: item.specification_id.price,
                    type: item.specification_id.type,
                    isActive: item.specification_id.isActive,
                    createAt: item.specification_id.createAt,
                }));

                setListDataSpecification(formattedSpecification);
                setCheckLoading(false);
            } else {
                setCheckLoading(false);
                showAlert('Thông báo', 'Không có dữ liệu trạm sạc');
            }
        } catch (error) {
            setCheckLoading(false);
            console.log('Lỗi hệ thống !!!', error);
            showAlert('Lỗi', 'Đã xảy ra lỗi vui lòng thử lại');
        }
    }

    const updateStation = async () => {

        try {
            setCheckLoading(true);

            const formattedServices = selectedServices.map(item => ({ service_id: item.value }));
            const formattedBrandCar = selectedBrandCar.map(item => ({ brandcar_id: item.value }));
            const formattedSpecifications = listDataSpecification.map(item => ({
                specification_id: item._id
            }));

            if (!nameStation || nameStation.length === 0) {
                setCheckLoading(false)
                showAlert('Thông tin', 'Chưa nhập tên');
                return;
            }
            else if (!selectedLocation) {
                setCheckLoading(false)
                showAlert('Thông tin', 'Chưa chọn địa chỉ trạm sạc');
                return;
            }
            else if (address.length === 0 || !address) {
                setCheckLoading(false)
                showAlert('Thông tin', 'Chưa nhập địa chỉ đặt trạm sạc');
                return;
            }
            else if (!selectedPlace || selectedPlace.length === 0) {
                setCheckLoading(false)
                showAlert('Thông tin', 'Chưa chọn nơi đặt trạm sạc');
                return;
            }
            else if (!selectedBrand || selectedBrand.length === 0) {
                setCheckLoading(false)
                showAlert('Thông tin', 'Chưa chọn hãng trụ sạc');
                return;
            }
            else if (!timeStation || timeStation.length === 0) {
                setCheckLoading(false)
                showAlert('Thông tin', 'Vui chọn thời gian');
                return;
            }
            else if (!formattedSpecifications || formattedSpecifications.length === 0) {
                setCheckLoading(false)
                showAlert('Thông tin', 'Cần thêm ít nhất 1 trụ sạc');
                return;
            }
            else if (!imageStation || !imageStation.length === 0) {
                setCheckLoading(false)
                showAlert('Thông tin', 'Vui chọn hoặc chụp ảnh');
                return;
            }

            let newImageUrl = imageStation;

            if (choseImageStation) {
                const uploadedImageUrl = await uploadImageToFirebase();
                if (uploadedImageUrl) {
                    newImageUrl = uploadedImageUrl;
                    if (imageStation) {
                        try {
                            const storageRef = firebase.storage().refFromURL(imageStation);
                            await storageRef.delete();
                            console.log("Xóa ảnh cũ thành công!");
                        } catch (error) {
                            console.log("Lỗi khi xóa ảnh cũ:", error);
                        }
                    } else {
                        console.log("không có ảnh cũ");
                    }
                } else {
                    setCheckLoading(false)
                    console.log("Lỗi khi upload ảnh mới!");
                    showAlert('Lỗi', 'Lỗi khi lưu ảnh')
                    return;
                }
            }

            const payload = {
                id: id,
                brand_id: selectedBrand.value,
                specification: formattedSpecifications,
                image: newImageUrl,
                name: nameStation,
                location: address,
                lat: selectedLocation.latitude,
                lng: selectedLocation.longitude,
                time: timeStation,
                note: valueNote,
                address: selectedPlace.value,
            };

            if (formattedServices !== null) payload.service = formattedServices;
            if (formattedBrandCar !== null) payload.brandcar = formattedBrandCar;

            const dataStation = await AxiosInstance().post('/station/update', payload);

            if (dataStation) {
                setCheckLoading(false)
                showAlert('Trạm sạc', 'Cập nhật trạm sạc thành công');
                clearFormStation();
                navigation.goBack();
            } else {
                setCheckLoading(false)
                showAlert('Trạm sạc', 'Cập nhật trạm sạc thất bại');
            }

        } catch (error) {
            setCheckLoading(false)
            console.error('Lỗi khi cập nhật dữ liệu Station:', error);
        }
    }

    const updateStation2 = async () => {
        try {
            const formattedSpecifications = listDataSpecification.map(item => ({
                specification_id: item._id
            }));

            if (!formattedSpecifications || formattedSpecifications.length === 0) {
                setCheckLoading(false)
                showAlert('Thông tin', 'Cần thêm ít nhất 1 trụ sạc');
                return;
            }

            const payload = {
                id: id,
                specification: formattedSpecifications,
            };

            const dataStation = await AxiosInstance().post('/station/update2', payload);

            if (dataStation) {
                console.log('Click xóa Specification thành công')
            } else {
                console.log('Click xóa Specification thất bại')
            }

        } catch (error) {
            setCheckLoading(false);
            showAlert('Lỗi', 'Có lỗi xảy ra, vui lòng kiểm tra lại')
            console.log('error:', error);
        }
    }

    useEffect(() => {
        if (listDataSpecification.length > 0) {
            const delayUpdate = setTimeout(() => {
                updateStation2();
            }, 1000); // Chờ 1 giây trước khi cập nhật

            return () => clearTimeout(delayUpdate); // Xóa timeout nếu danh sách thay đổi liên tục
        }
    }, [listDataSpecification])


    const logDataUpdate = () => {
        const formattedServices = selectedServices.map(item => ({ service_id: item.value }));
        const formattedBrandCar = selectedBrandCar.map(item => ({ brandcar_id: item.value }));

        const formattedVehical = selectedVehical.length > 2
            ? selectedVehical.slice(1).map(item => ({ vehicle_id: item.value }))
            : selectedVehical.map(item => ({ vehicle_id: item.value }));

        const formattedSpecifications = listDataSpecification.map(item => ({
            specification_id: item._id
        }));

        console.log('Ảnh:', imageStation);
        console.log('Tên trạm:', nameStation);
        console.log('Địa chỉ:', address);
        console.log('Lat:', selectedLocation.latitude);
        console.log('Lng:', selectedLocation.longitude);
        console.log('Thời gian:', timeStation);
        console.log('Điểm đặt:', selectedPlace.value);
        console.log('Hãng trụ sạc:', selectedBrand.value);
        console.log('Dịch Vụ', formattedServices);
        console.log('Hãng xe', formattedBrandCar);
        console.log('Loại xe', formattedVehical);
        console.log('Loại đầu sạc', selectedSocket);
        console.log('Trụ sạc:', formattedSpecifications);
        // console.log('',);
        // console.log('',);
    }

    // Location
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

    // time
    const [isTimeStartVisible, setTimeStartVisibility] = useState(false);
    const [isTimeEndVisible, setTimeEndVisibility] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const CheckTime = () => {
        if (isEnabled) {
            setTimeStation('24/7')
        }
        else {
            setTimeStation(timeStart + ' - ' + timeEnd)
        }

    }

    // image
    const takePhoto = async () => {
        // Yêu cầu quyền truy cập camera
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Quyền truy cập camera bị từ chối');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true, // Cho phép chỉnh sửa ảnh trước khi lưu
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setChoseImageStation(result.assets[0].uri);
            setImageStation(result.assets[0].uri);
        }
    };
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
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

    // validation
    const onChangeTextKw = (value) => { if (+value || value == '') setValuePower(value.trim()); };
    const onChangeTextChager = (value) => { if (+value || value == '') setValuePorts(value.trim()); };
    const onChangeTextPrice = (value) => { if (+value || value == '') setValuePrice(value.trim()); };

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
        if (!selectedVehical || selectedVehical.length === 0) {
            showAlert('Thông tin', 'Vui lòng chọn loại phương tiện');
            isValid = false;
        }
        if (!selectedSocket || selectedSocket.length === 0) {
            showAlert('Thông tin', 'Vui lòng chọn đầu sạc');
            isValid = false;
        }

        if (isValid) {
            if (editIndex !== null) {

                updateSpecificationById(editIndex);
            } else {

                addNewSpecification();
            }
            setEditIndex(null);
        }
    };

    useEffect(() => {
        getDataService();
        getDataBrand();
        getDataVehicle();
        getDataPort();
        getDataBrandCar();
        getDataPlace();
        getDataStation();
    }, [])
    useEffect(() => {
        CheckTime();
    }, [isEnabled, timeStart, timeEnd])


    return (
        <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <ScrollView style={{ backgroundColor: 'white', height: '90%' }}  >
                {/* hình ảnh */}
                <View>
                    <View style={{ paddingHorizontal: 15, paddingVertical: 5, flexDirection:'row' }}>
                        <Text style={{ fontSize: SIZE.size16 }}>Hình ảnh</Text>
                        <Text style={{ fontSize: SIZE.size16, color: '#ff2f68' }}>*</Text>
                    </View>
                    <View style={{ paddingHorizontal: 15, paddingVertical: 5, }}>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '75%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }} >
                                {
                                    imageStation ?
                                        <Image source={{ uri: imageStation }} style={{ width: '100%', height: 170, borderRadius: 30, marginBottom: 15, }} />
                                        :
                                        null
                                }
                            </TouchableOpacity>


                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <ItemButton2 title={'Thư viện'} onPress={pickImage} />
                            <ItemButton2 title={'Chụp Ảnh'} onPress={takePhoto} />
                        </View>
                    </View>
                </View>
                {/* Tên trạm sạc */}
                <ItemTextInput2 title={'Tên trạm sạc'} placeholder={'Nhập tên trạm sạc'} onChangeText={setNameStation} value={nameStation} checkValue={false} widthBody={'100%'} />
                {/* Vị trí  */}
                <ItemText2 title={'Địa chỉ trạm sạc'} value={address} checkValue={false} setCheckModal={setModalVisibleMap} widthBody={'100%'} />
                {/* Nơi đặt trụ sạc */}
                <View>
                    <View style={{ paddingHorizontal: 15, paddingVertical: 5, flexDirection:'row' }}>
                        <Text style={{ fontSize: SIZE.size16 }}>Nơi đặt trạm sạc</Text>
                        <Text style={{ fontSize: SIZE.size16, color: '#ff2f68' }}>*</Text>
                    </View>
                    {dataPlace ? <ItemRadioDP data={dataPlace} dropdownOpen={openDropdownPlace} setDropdownOpen={setOpenDropdownBrandCar} selectedValue={selectedPlace} setSelectedValue={setSelectedPlace} /> : null}
                </View>
                {/* Hãng trụ sạc */}
                <View>
                    <View style={{ paddingHorizontal: 15, paddingVertical: 5, flexDirection:'row' }}>
                        <Text style={{ fontSize: SIZE.size16 }}>Hãng trụ sạc</Text>
                        <Text style={{ fontSize: SIZE.size16, color: '#ff2f68' }}>*</Text>
                    </View>
                    {dataBrand ? <ItemRadioDP data={dataBrand} selectedValue={selectedBrand} setSelectedValue={setSelectedBrand} dropdownOpen={openDropdownBrandStation} setDropdownOpen={setOpenDropdownBrandStation} /> : null}
                </View>
                {/* Thời gian  */}
                <View>
                    <View style={{ paddingHorizontal: 15, paddingVertical: 5, flexDirection:'row' }}>
                        <Text style={{ fontSize: SIZE.size16 }}>Thời gian</Text>
                        <Text style={{ fontSize: SIZE.size16, color: '#ff2f68' }}>*</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5, }}>
                            <Text style={{}}> 24/7</Text>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: '1%', height: 50, }}>
                                <ItemButtonSwitch value={isEnabled} onChangeValue={toggleSwitch} />
                            </View>
                        </View>
                        <ItemTimePicker title={'Thời gian bắt đầu'} timeVisible={isTimeStartVisible} setTimeVisible={setTimeStartVisibility} time={timeStart} setTime={setTimeStart} />
                        <ItemTimePicker title={'Thời gian kết thúc'} timeVisible={isTimeEndVisible} setTimeVisible={setTimeEndVisibility} time={timeEnd} setTime={setTimeEnd} />

                    </View>
                </View>
                {/* tru sac  */}
                <View>
                    <View style={{ paddingHorizontal: 15, paddingVertical: 5, flexDirection:'row' }}>
                        <Text style={{ fontSize: SIZE.size16 }}>Trụ sạc</Text>
                        <Text style={{ fontSize: SIZE.size16, color: '#ff2f68' }}>*</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <ItemTextInput2 content={'Công suất'} placeholder={'Kw'} onChangeText={onChangeTextKw} value={valuePower} checkValue={checkKw} widthBody={'30%'} center={true} number={true} />
                        <ItemTextInput2 content={'Cổng sạc'} placeholder={'Số cổng'} onChangeText={onChangeTextChager} value={valuePorts} checkValue={checkCharger} widthBody={'30%'} center={true} number={true} />
                        <ItemTextInput2 content={'Vnd/Kwh'} placeholder={'Giá tiền'} onChangeText={onChangeTextPrice} value={valuePrice} checkValue={checkPrice} widthBody={'30%'} center={true} number={true} />
                    </View>
                    {/* Phuong tien  */}
                    <View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 5, flexDirection:'row' }}>
                            <Text style={{ fontSize: SIZE.size14 }}>Phương tiện</Text>
                            <Text style={{ fontSize: SIZE.size16, color: '#ff2f68' }}>*</Text>
                        </View>
                        {dataVehicle ? <ItemCheckBoxDP data={dataVehicle} dropdownOpen={openDropdownVehical} setDropdownOpen={setOpenDropdownVehical} selectedValues={selectedVehical} setSelectedValues={setSelectedVehical} /> : null}
                    </View>
                    {/* Loai sacj */}
                    <View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 5, flexDirection:'row' }}>
                            <Text style={{ fontSize: SIZE.size14 }}>Loại sạc</Text>
                            <Text style={{ fontSize: SIZE.size16, color: '#ff2f68' }}>*</Text>
                        </View>
                        {dataPort ? <ItemRadioDP data={dataPort} dropdownOpen={openDropdownSocket} setDropdownOpen={setOpenDropdownSocket} selectedValue={selectedSocket} setSelectedValue={setSelectedSocket} /> : null}
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
                    <ScrollView style={{}}>
                        <FlatList
                            style={{ width: '100%' }}
                            data={listDataSpecification}
                            scrollEnabled={false}
                            renderItem={({ item, index }) => (
                                item ? (
                                    <View style={styles.containerList}>
                                        <View style={{ width: '70%', }}>
                                            <View style={styles.infoRow}>
                                                <Image style={styles.icon} source={require('../../../assets/icon/icons8-flash-50 (1).png')} />
                                                <Text style={styles.textList}>{item.kw} Kw</Text>
                                            </View>
                                            <View style={styles.infoRow}>
                                                <Image style={styles.icon} source={require('../../../assets/icon/icons8-car-charger-48.png')} />
                                                <Text style={styles.textList}>{item.slot} Cổng sạc</Text>
                                            </View>
                                            <View style={styles.infoRow}>
                                                <Image style={styles.icon} source={require('../../../assets/imageSocket/power-plug.png')} />
                                                <Text style={styles.textList}>{item.port_id?.name || "Không xác định"}</Text>
                                            </View>
                                            <View style={styles.infoRow}>
                                                <Image style={styles.icon} source={require('../../../assets/icon/icons8-money-50 (1).png')} />
                                                <Text style={styles.textList}>
                                                    {parseInt(item.price, 10).toLocaleString('vi-VN')} đ/KWh
                                                </Text>
                                            </View>
                                            <View style={styles.infoRow}>
                                                {/* {item.vehicle.vehicle_id[0].name === 'Xe máy điện' ?
                                                    <>
                                                        <Image style={styles.icon} source={require('../../../assets/icon/electric-scooter.png')} />
                                                    </>
                                                    :
                                                    <>
                                                        <Image style={styles.icon} source={require('../../../assets/icon/icons8-car-50 (1).png')} />
                                                    </>
                                                } */}
                                                {Array.isArray(item.vehicle) && item.vehicle.length > 1 ? (
                                                    <Text style={styles.textList}>Tất cả</Text>
                                                ) : (
                                                    <Text style={styles.textList}>
                                                        {item.vehicle[0].vehicle_name || "Không có dữ liệu"}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                        <View style={{ width: '20%', justifyContent: 'center' }}>
                                            <TouchableOpacity onPress={() => copySpecification(item._id)} style={styles.buttonList}>
                                                <Text>Sao chép</Text>
                                            </TouchableOpacity>
                                            {checkButtonEdit ?
                                                null :
                                                <TouchableOpacity onPress={() => editDetail(item._id)} style={styles.buttonList}>
                                                    <Text>Sửa</Text>
                                                </TouchableOpacity>
                                            }
                                            {listDataSpecification.length <= 1 ?
                                                null :
                                                <TouchableOpacity onPress={() => deleteSpecificationById(item._id)} style={[styles.buttonList, { borderColor: 'red' }]}>
                                                    <Text>Xóa</Text>
                                                </TouchableOpacity>
                                            }

                                        </View>

                                    </View>
                                ) : null
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ScrollView>
                </View>


                <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                    <Text style={{ fontSize: SIZE.size18 }}>Lựa chọn thêm</Text>
                </View>
                {/* Dich Vu */}
                <View>
                    <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                        <Text style={{ fontSize: SIZE.size16 }}>Dịch vụ</Text>
                    </View>
                    {dataService ? <ItemCheckBoxDP data={dataService} selectedValues={selectedServices} setSelectedValues={setSelectedServices} dropdownOpen={openDropdownServices} setDropdownOpen={setOpenDropdownServices} /> : null}
                </View>
                {/* Hangx Xe */}
                <View>
                    <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                        <Text style={{ fontSize: SIZE.size16 }}>Hãng Xe</Text>
                    </View>
                    {dataBrandCar ? <ItemCheckBoxDP data={dataBrandCar} selectedValues={selectedBrandCar} setSelectedValues={setSelectedBrandCar} dropdownOpen={openDropdownBrandCar} setDropdownOpen={setOpenDropdownBrandCar} /> : null}
                </View>


                <View style={{ paddingHorizontal: 15, paddingVertical: 5, }}>
                    <Text style={{ fontSize: SIZE.size16 }}>Ghi chú</Text>
                    <TextInput
                        style={{
                            marginVertical: '2%',
                            textAlignVertical: 'top',
                            height: 100,
                            borderColor: COLOR.gray2,
                            borderWidth: 1,
                            borderRadius: 10,
                        }}
                        placeholder={'Ghi chú'}
                        value={valueNote}
                        multiline
                        onChangeText={setValueNote}
                    />
                </View>


                {/*  banr đồ  */}
                <Modal transparent={true} visible={modalVisibleMap} animationType="slide">
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContent, { height: '95%', }]}>
                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setModalVisibleMap(false);
                                        setAddress(null);
                                        setSelectedLocation(null);
                                    }}
                                    style={styles.applyButton}>
                                    <Text style={styles.applyText}>Hủy chọn</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setModalVisibleMap(false);
                                    }}
                                    style={styles.applyButton}>
                                    <Text style={styles.applyText}>Chọn</Text>
                                </TouchableOpacity>
                            </View>
                            {address ? <Text style={{ fontSize: SIZE.size16, paddingHorizontal: '2%', paddingVertical: '2%' }} numberOfLines={1}  > Địa chỉ : {address}</Text> : null}
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

                            <View style={{
                                position: 'absolute',
                                top: '88%',
                                right: 0,
                                left: '80%',
                                bottom: 0,
                            }}>
                                <TouchableOpacity
                                    style={{
                                        height: 50,
                                        width: 50,
                                        borderColor: COLOR.green3,
                                        borderWidth: 1,
                                        borderRadius: 30,
                                        backgroundColor: 'white',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={getCurrentLocation}>
                                    <Image style={{ width: 30, height: 30, }} source={require('../../../assets/icon/icons8-my-location-48.png')} />
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </Modal>
                <ItemLoading checkValue={checkLoading} />


            </ScrollView>
            <View style={{
                alignItems: 'center',
                backgroundColor: 'white',
                height: '10%',
            }}>
                <TouchableOpacity
                    onPress={updateStation}
                    style={{
                        padding: 15,
                        backgroundColor: COLOR.green3,
                        borderRadius: 10,
                        width: '60%',

                    }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Cập nhật trạm sạc </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    )
}

export default FormEditStation

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
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
    map: {
        width: '100%',
        height: '95%',
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
        borderRadius: 10,
        backgroundColor: 'white',
        padding: '3%',
        paddingHorizontal: '5%',
        margin: '2%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonList: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: COLOR.green3,
        margin: 3,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    textList: {
        fontSize: 18,
    },

});