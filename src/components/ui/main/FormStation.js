import { StyleSheet, Text, View, ScrollView, Image, Modal, Alert, FlatList, TextInput, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { COLOR } from "../../../assets/Theme/Theme";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { ItemBoxLocation, ItemCheckBox, ItemInputCharging, ItemRadioButton } from '../../item/Item';

const API_BASE = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
const TOKEN = '46f53dba-ecf6-11ef-a268-9e63d516feb9';

const FormStation = () => {

    // Danh sách dịch vụ
    const typeService = [
        { id: 0, name: 'Đồ ăn' },
        { id: 1, name: 'Đồ uống' },
        { id: 2, name: 'WC' },
        { id: 3, name: 'Đỗ Xe' },
    ];

    // Danh sách hãng xe
    const typeBrands = [
        { id: 1, name: 'Toyota' },
        { id: 2, name: 'Honda' },
        { id: 3, name: 'Ford' },
        { id: 4, name: 'Vinfast' },
        { id: 5, name: 'Hyundai' },
        { id: 6, name: 'Tesla' },
    ];

    // Danh sách phương tiện
    const typeVehicle = [
        { id: 0, name: 'Tất cả' },
        { id: 1, name: 'Xe máy' },
        { id: 2, name: 'Ô tô' },
    ];

    // Danh sách loại sạc
    const typeSocket = [
        { id: 0, name: 'CCS1' },
        { id: 1, name: 'CCS2' },
        { id: 2, name: 'J1772' },
        { id: 3, name: 'Ổ điện' },
        { id: 4, name: 'Chademo' },
    ];
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
    const [locationDetail, setLoactionDetail] = useState('');
    const [nameStation, setNameStation] = useState('');
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
    const [selectedBrand, setSelectedBrand] = useState(null);
    const handleBrandSelect = (brandId) => {
        setSelectedBrand(brandId);
    };

    // phương tiện
    const [selectedVehical, setSelectedVehical] = useState(null);
    const handleVehicalSelect = (VehicalId) => {
        setSelectedVehical(VehicalId);
    };
    const [selectedSocket, setSelectedSocket] = useState(null);
    //dau sac 
    const handleSocketSelect = (ScoketId) => {
        setSelectedSocket(ScoketId);
    };



    const [invisible, setInvisible] = useState(false);
    //luu tram sac
    const addOrUpdateDetail = () => {
        const newDetail = { power: valuePower, ports: valuePorts, price: valuePrice, vehicle: selectedVehical, type: selectedSocket };

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
        setSelectedVehical(null);
        setSelectedSocket(null);
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
    const [image, setImage] = useState(null);
    const [checkImage, setCheckImage] = useState(true);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setCheckImage(false);
        }
    };

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
            addOrUpdateDetail();
        }

        return isValid;
    };

    // Gọi để kiểm tra tất cả
    const handleValidation = () => {
        if (validateStation()) {
            console.log("Lưu tất cả thông tin!");
        }
    };

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
                            width: '90%',
                            height: 170,
                            borderStyle: 'dashed',
                            borderWidth: 3,
                            margin: '5%',
                            marginBottom: '0%',
                            borderColor: '#40A19C',
                            borderRadius: 30
                        }} >
                        {
                            checkImage ? <Text style={{ fontSize: 18, fontWeight: '500', color: '#40A19C' }}> Thêm hình ảnh </Text> : null
                        }
                        {image && <Image source={{ uri: image }} style={{ width: '110%', height: 170, borderRadius: 30, }} />}
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
                    <Text style={styles.textTitleInput}>Thời gian bắt đầu </Text>
                    <Text style={styles.textTitleInput}>Thời gian kết thúc</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '0%' }}>
                    <TouchableOpacity
                        onPress={() => showTimeStartPicker()}
                        style={[styles.buttonType1, { width: '40%', flexDirection: 'row', justifyContent: 'space-evenly' }]}>
                        <Text style={{ fontSize: 20 }}> {timeStart}</Text>
                        <Image style={{ width: 30, height: 30 }} source={require('../../../assets/icon/icons8-time-24.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => showTimeEndPicker()}
                        style={[styles.buttonType1, { width: '40%', flexDirection: 'row', justifyContent: 'space-evenly' }]}>
                        <Text style={{ fontSize: 20 }}> {timeEnd}</Text>
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
                        <Text style={{ textAlign: 'center', color: '#40A19C' }}>Chọn vị trí</Text>
                    </TouchableOpacity>
                </View>
                {checkLocation && <Text style={styles.errorText}>Vui lòng nhập đầy đủ thông tin</Text>}
            </View>
            {/* hãng trạm sạc  */}
            <View style={styles.viewInput}>
                <View style={styles.listStatus}>
                    <Text style={styles.textTitleInput}>Hãng trạm sạc</Text>
                    <ItemRadioButton data={typeBrands} onSelect={handleBrandSelect} />
                </View>
                {checkBrand && <Text style={styles.errorText}>Vui lòng chọn hãng trạm sạc</Text>}
            </View>
            {/* dịch vụ */}
            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}>Dịch vụ</Text>
                <ItemCheckBox data={typeService} onSelect={handleServiceSelect} />
            </View>
            {/* chi tiết trụ sạc  */}
            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}>Chi tiết trụ sạc</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
                    <ItemInputCharging onChangeText={onChangeTextKw} placeholder={'Kw'} value={valuePower} note={'Kw'} />
                    <ItemInputCharging onChangeText={onChangeTextChager} placeholder={'Đầu'} value={valuePorts} note={'Cổng'} />
                    <ItemInputCharging onChangeText={onChangeTextPrice} placeholder={'Giá'} value={valuePrice} note={'Vnd'} />

                </View>
                {(checkKw || checkCharger || checkPrice) && <Text style={styles.errorText}>Vui lòng nhập đầy đủ thông tin</Text>}
                <View style={{}}>
                    <View>
                        <ItemRadioButton data={typeVehicle} onSelect={handleVehicalSelect} selectedValue={selectedVehical} />
                        {checkVehicle && <Text style={styles.errorText} >Vui lòng chọn phương tiện</Text>}
                    </View>
                    <View>
                        <ItemRadioButton data={typeSocket} onSelect={handleSocketSelect} selectedValue={selectedSocket}/>
                        {checkSocket && <Text style={styles.errorText}>Vui lòng chọn loại sạc</Text>}
                    </View>
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
                            borderColor: '#40A19C',
                        }}>
                        <Text
                            style={{ color: '#40A19C', textAlign: 'center' }}>
                            {editIndex !== null ? "Cập nhật" : "Lưu trụ sạc"}
                        </Text>
                    </TouchableOpacity>
                   
                </View>
                {checkCharging && <Text style={styles.errorText}>Cần tối thiểu một trụ sạc</Text>}
                <FlatList
                    data={chargingDetails}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => (

                        <View style={styles.containerList}>

                            <View style={styles.centerColumn}>

                                <View style={styles.infoRow}>
                                    <Text style={styles.textList}>Trụ số: {index + 1}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Image style={styles.icon} source={require('../../../assets/icon/icons8-flash-50 (1).png')} />
                                    <Text style={styles.textList}>{item.power} Kw</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Image style={styles.icon} source={require('../../../assets/icon/icons8-car-charger-48.png')} />
                                    <Text style={styles.textList}>{item.ports} Cổng sạc</Text>
                                </View>

                            </View>
                            <View style={styles.rightColumn}>
                                <View style={styles.infoRow}>
                                    <Text style={styles.textList}>{item.type}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Image style={styles.icon} source={require('../../../assets/icon/icons8-money-50 (1).png')} />
                                    <Text style={styles.textList}>{item.price} đ / Kwh</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Image style={styles.icon} source={require('../../../assets/icon/icons8-car-50 (1).png')} />
                                    <Text style={styles.textList}>{item.vehicle}</Text>
                                </View>
                            </View>

                            {invisible && (
                                <View style={styles.buttonList}>
                                    <TouchableOpacity onPress={() => editDetail(index)} style={styles.editButton}>
                                        <Text style={styles.editText}>Sửa</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteDetail(index)} style={styles.editButton}>
                                        <Text style={styles.deleteText}>Xóa</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
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
                    onPress={validateStation}
                    style={{
                        margin: '10%',
                        padding: '5%',
                        backgroundColor: '#40A19C',
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
                                    borderColor: '#40A19C',
                                    borderWidth: 2,
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
        backgroundColor: '#40A19C',
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
        borderWidth: 2,
        borderColor: '#40A19C',
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
        fontSize: 24,
        color: '#40A19C',
        fontWeight: 700,
        fontFamily: 'Poppins'
    },
    textInput: {
        width: '100%',
        height: 50,
        fontSize: 20,
        paddingHorizontal: 10,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: '#40A19C',
        borderRadius: 0,
        marginLeft: '5%',
        marginRight: '5%',
        marginVertical: '2%'
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
        marginVertical: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#40A19C',
        width: '30%',
        height: 50,
        borderBottomWidth: 2,
    },
    buttonType2: {
        margin: '5%',
        padding: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#40A19C',
        width: '30%',
        height: 50,
        borderWidth: 2,
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
    },
    centerColumn: {
        flex: 1,
        alignItems: 'flex-start',
        marginHorizontal: '2%'
    },
    rightColumn: {
        flex: 1,
        alignItems: 'flex-start',
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
        borderColor: '#40A19C',
        padding: 7,
        paddingHorizontal: 15,
        borderRadius: 8,
        margin: 5
    },
    editText: {
        color: '#40A19C',
    },
    deleteText: {
        color: 'red',
    },


});

