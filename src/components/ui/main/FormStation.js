import { StyleSheet, Text, View, ScrollView, Image, Modal, Alert, FlatList, TextInput, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLOR } from "../../../assets/Theme/Theme";
import ModalDropdown from 'react-native-modal-dropdown';
import { TextInputProfile } from '../../item/Item';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const API_BASE = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
const TOKEN = '46f53dba-ecf6-11ef-a268-9e63d516feb9';

const FormStation = () => {
    // ẩn hiện lisst modal
    const [modalVisibleBrand, setModalVisibleBrand] = useState(false);
    const [modalVisibleVehicle, setModalVisibleVehicle] = useState(false);
    const [modalVisibleSocket, setModalVisibleSocket] = useState(false);

    // giá trị 
    const [editIndex, setEditIndex] = useState(null);

    const [selectedProvinceName, setSelectedProvinceName] = useState('');
    const [selectedDistrictName, setSelectedDistrictName] = useState('');
    const [selectedWardName, setSelectedWardName] = useState('');
    const [locationDetail, setLoactionDetail] = useState('');
    const [nameStation, setNameStation] = useState('');
    const [valuePower, setValuePower] = useState('');
    const [valuePorts, setValuePorts] = useState('');
    const [valuePrice, setValuePrice] = useState('');
    const [selectedBrandId, setSelectedBrandId] = useState(-1);
    const [valueVehicleId, setValueVehicleId] = useState(-1);
    const [valueTypeId, setValueTypeId] = useState(-1);
    const [selectedService, setSelectedService] = useState([]);
    const [saveForm, setSaveForm] = useState([]);
    // chọn dịch vụ 
    const service = [
        { id: 0, name: 'Đồ ăn' },
        { id: 1, name: 'Đồ uống' },
        { id: 2, name: 'Wc' },
        { id: 3, name: 'Đỗ Xe' },
    ];
    const toggleSelection = (id) => {
        if (selectedService.includes(id)) {
            setSelectedService(selectedService.filter((item) => item !== id));
        } else {
            setSelectedService([...selectedService, id]);
        }
    };
    console.log(selectedService)
    
    const [selectedBrand, setSelectedBrand] = useState('Chọn hãng xe');
    const carBrands = [
        { id: 0, name: 'Tất cả' },
        { id: 1, name: 'Toyota' },
        { id: 2, name: 'Honda' },
        { id: 3, name: 'Ford' },
        { id: 4, name: 'Vinfast' },
    ];
    // an hien bo loc 
    // chọn phương tiện 
    const [valueVehicle, setValueVehicle] = useState('Chọn phương tiện');

    const typeVehicle = [
        { id: 0, name: 'Tất cả' },
        { id: 1, name: 'Xe máy' },
        { id: 2, name: 'Ô tô' },
    ];
    // chon loaij sacj
    const [valueType, setValueType] = useState('Chọn loại sạc');

    const typeSocket = [
        { id: 0, name: 'CCS1' },
        { id: 1, name: 'CCS2' },
        { id: 2, name: 'J1772' },
        { id: 3, name: 'Ổ điện' },
        { id: 4, name: 'Chademo' },
    ];
    // luuw tru sac



    const addOrUpdateDetail = () => {

        // validationCharing();
        const newDetail = { power: valuePower, ports: valuePorts, price: valuePrice, vehicle: valueVehicle, type: valueType };
        if (editIndex !== null) {
            const updatedList = [...saveForm];
            updatedList[editIndex] = newDetail;
            setSaveForm(updatedList);
            setEditIndex(null);
        } else {
            setSaveForm([...saveForm, newDetail]);
        }
        clearForm();
        setInvisible(true);
    };
    const editDetail = (index) => {
        const item = saveForm[index];
        setValuePower(item.power);
        setValuePorts(item.ports);
        setValuePrice(item.price);
        setValueVehicle(item.vehicle);
        setValueType(item.type);
        setEditIndex(index);
        setInvisible(false);
    };
    // xoa tru sac
    const deleteDetail = (index) => {
        setSaveForm(saveForm.filter((_, i) => i !== index));
    };
    const clearForm = () => {
        setValuePower('');
        setValuePorts('');
        setValuePrice('');
        setValueVehicle('Chọn phương tiện');
        setValueType("Chọn loại sạc");
    };
    // console.log(saveForm)
    // aanr button khi chinh sua
    const [invisible, setInvisible] = useState(false);
    // chọn thời gian 
    const [timeStart, setTimeStart,] = useState('Thời gian bắt đầu');
    const [timeEnd, setTimeEnd,] = useState('Thời gian kết thúc');
    const [isTimeStartVisible, setTimeStartVisibility] = useState(false);
    const [isTimeEndVisible, setTimeEndVisibility] = useState(false);
    const showTimeStartPicker = () => {
        setTimeStartVisibility(true);
    };
    const hideTimeStartPicker = () => {
        setTimeStartVisibility(false);
    };
    const showTimeEndPicker = () => {
        setTimeEndVisibility(true);
    };
    const hideTimeEndPicker = () => {
        setTimeEndVisibility(false);
    };
    const handleConfirmTimeStart = (date) => {
        const dt = new Date(date);
        const timeStart = dt.toLocaleTimeString();
        setTimeStart(timeStart);
        hideTimeStartPicker();
    };
    const handleConfirmTimeEnd = (date) => {
        const dt = new Date(date);
        const timeEnd = dt.toLocaleTimeString();
        setTimeEnd(timeEnd);
        hideTimeEndPicker();
    };
    // phần thêm ảnh 
    const [image, setImage] = useState(null);
    const [checkImage, setCheckImage] = useState(true); // ẩn hiện chũ thêm ảnh 
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        // console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setCheckImage(false);
        }
    };
    // phần lấy địa chỉ 
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');



    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProvinces();
    }, []);
    const fetchProvinces = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/province`, {
                headers: { Token: TOKEN }
            });
            const data = await response.json();
            setProvinces((data.data || [])
                .map(item => ({
                    label: item.ProvinceName,
                    value: String(item.ProvinceID),
                    name: item.ProvinceName,
                }))
                .sort((a, b) => a.label.localeCompare(b.label))
            );
        } catch (error) {
            console.error('Error fetching provinces:', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchDistricts = async (provinceId, provinceName) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/district?province_id=${provinceId}`, {
                headers: { Token: TOKEN }
            });
            const data = await response.json();
            setDistricts((data.data || [])
                .map(item => ({
                    label: item.DistrictName,
                    value: String(item.DistrictID),
                    name: item.DistrictName,
                }))
                .sort((a, b) => a.label.localeCompare(b.label))
            );
            setSelectedProvince(provinceId);
            setSelectedProvinceName(provinceName);
        } catch (error) {
            console.error('Error fetching districts:', error);
            setDistricts([]);
        } finally {
            setLoading(false);
        }
    };
    const fetchWards = async (districtId, districtName) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/ward?district_id=${districtId}`, {
                headers: { Token: TOKEN }
            });
            const data = await response.json();
            setWards((data.data || [])
                .map(item => ({
                    label: item.WardName,
                    value: String(item.WardCode),
                    name: item.WardName,
                }))
                .sort((a, b) => a.label.localeCompare(b.label))
            );
            setSelectedDistrict(districtId);
            setSelectedDistrictName(districtName);
        } catch (error) {
            console.error('Error fetching wards:', error);
            setWards([]);
        } finally {
            setLoading(false);
        }
    };

    // set gia tri 
    const onChangeTextKw = (valuePower) => {
        if (+valuePower || valuePower == '') {
            setValuePower(valuePower.trim());
        }
    };
    const onChangeTextChager = (valuePorts) => {
        if (+valuePorts || valuePorts == '') {
            setValuePorts(valuePorts.trim());
        }
    };
    const onChangeTextPrice = (valuePrice) => {
        if (+valuePrice || valuePrice == '') {
            setValuePrice(valuePrice.trim());
        }
    };

    const [checkImg, setCheckImg] = useState(false)
    const [checkNameStation, setCheckNameStation] = useState(false)
    const [checkBrand, setCheckBrand] = useState(false)
    const [checkTime, setCheckTime] = useState(false)
    const [checkLocation, setCheckLoacation] = useState(false)
    const [checkKw, setCheckKw] = useState(false)
    const [checkPort, setCheckPort] = useState(false)
    const [checkPrice, setCheckPrice] = useState(false)
    const [checkVehicle, setCheckVehicle] = useState(false)
    const [checkChager, setCheckChager] = useState(false)
    const [checkCharing, setCheckCharing] = useState(false)


    const Validation = () => {

        if (image == null) {
            setCheckImg(true);
        } else {
            setCheckImg(false);
            if (nameStation.length >= 50 || nameStation.length <= 10) {
                setCheckNameStation(true)
            } else {
                setCheckNameStation(false);
                if (selectedBrandId == -1) {
                    setCheckBrand(true)
                } else {
                    setCheckBrand(false)
                    if (timeStart == 'Thời gian bắt đầu' || timeEnd == 'Thời gian kết thúc') {
                        setCheckTime(true)
                    } else {
                        setCheckTime(false)
                        if(selectedProvinceName == '' || selectedDistrictName == '' || selectedWardName == '' || locationDetail.trim() == '' ){
                            setCheckLoacation(true)
                        }else{
                            setCheckLoacation(false)
                            if (saveForm.length == 0) {
                                setCheckCharing(true)
                            } else {
                                setCheckCharing(false)
                                console.log('luu tat ca')
                            }
                        }
                    }
                }
            }
        }


        // (image == null ? setCheckImg(true) : setCheckImg(false));
        // (nameStation.length >= 50 || nameStation.length <= 10 ? setCheckNameStation(true) : setCheckNameStation(false));
        // (selectedBrandId == -1 ? setCheckBrand(true) : setCheckBrand(false));
        // (timeStart == 'Thời gian bắt đầu' || timeEnd == 'Thời gian kết thúc' ? setCheckTime(true) : setCheckTime(false));
        // (selectedProvinceName == '' || selectedDistrictName == '' || selectedWardName == '' || locationDetail.trim() == '' ? setCheckLoacation(true) : setCheckLoacation(false));
        // if (saveForm.length == 0) {
        //     setCheckCharing(true)
        // } else {
        //     setCheckCharing(true)
        // }

    }
    const validationCharing = () => {

        if (valuePower.trim() === '') {
            setCheckKw(true);
        } else {
            setCheckKw(false);
            if (valuePorts.trim() == '') {
                setCheckPort(true)
            } else {
                setCheckPort(false)
                if (valuePrice.trim() == '') {
                    setCheckPrice(true)
                }
                else {
                    setCheckPrice(false)
                    if (valueVehicleId == -1) {
                        setCheckVehicle(true)
                    } else {
                        setCheckVehicle(false)
                        if (valueTypeId == -1) {
                            setCheckChager(true)
                        } else {
                            setCheckChager(false);
                            addOrUpdateDetail();
                        }
                    }
                }
            }
        }

        // if (valuePower.trim() === '') {
        //     setCheckKw(true);
        // } else if (valuePorts.trim() == '') {
        //     setCheckPort(true)
        // } else if (valuePrice.trim() == '') {
        //     setCheckPrice(true)
        // } else if (valueVehicleId == -1) {
        //     setCheckVehicle(true)
        // } else if (valueTypeId == -1) {
        //     setCheckChager(true)
        // }
        // else {
        //     setCheckKw(false);
        //     setCheckPort(false);
        //     setCheckPrice(false);
        //     setCheckVehicle(false);
        //     setCheckChager(false);
        //     addOrUpdateDetail();
        // }


        // (valuePower.trim() == '' ? setCheckKw(true) : setCheckKw(false));
        // (valuePorts.trim() == '' ? setCheckPort(true) : setCheckPort(false));
        // (valuePrice.trim() == '' ? setCheckPrice(true) : setCheckPrice(false));
        // (valueVehicleId == -1 ? setCheckVehicle(true) : setCheckVehicle(false));
        // (valueTypeId == -1 ? setCheckChager(true) : setCheckChager(false));

        // if (checkKw) {
        //     AlertError()
        // } else {
        //     addOrUpdateDetail()
        // }

    }

    const AlertError = () =>
        Alert.alert('Cảnh báo', 'Chưa nhập đầy đủ thông tin', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);

    return (
        <ScrollView style={styles.container}>
            {/* thêm ảnhảnh */}
            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}>Thêm ảnh</Text>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={pickImage}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 200,
                            height: 200,
                            borderStyle: 'dashed',
                            borderWidth: 3,
                            margin: '5%',
                            marginBottom: '0%',
                            borderColor: '#40A19C',
                        }} >
                        {
                            checkImage ? <Text style={{ fontSize: 18, fontWeight: '500', color: '#40A19C' }}> Thêm hình ảnh </Text> : null
                        }
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, }} />}
                    </TouchableOpacity>
                    {checkImg ?
                        <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}> Vui lòng chọn ảnh</Text>
                        : null
                    }
                </View>

            </View>
            {/* thêm tên trạm sạc  */}
            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}>Tên trạm sạc</Text>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '5%',
                        flexDirection: 'row',
                    }}>
                    <TextInput onChangeText={setNameStation} style={styles.textInput} placeholder={'Nhập tên'} />
                    <TouchableOpacity
                        onPress={() => { setModalVisibleBrand(true) }}
                        style={styles.buttonType1}>
                        <Text style={{ textAlign: 'center' }}>{selectedBrand}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{}}>
                    {checkNameStation ?
                        <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>Tên trạm sạc phải nhiều hơn 10 và ít hơn 50 kí tự !</Text>
                        : null
                    }
                    {checkBrand ?
                        <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>Chưa chọn hãng xe !</Text>
                        : null
                    }
                </View>


            </View>
            {/* thời gian hoạt động  */}
            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}>Thời gian hoạt động </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: '5%', marginBottom: '0%' }}>
                    <TouchableOpacity
                        onPress={() => showTimeStartPicker()}
                        style={[styles.buttonType1, { width: '40%' }]}>
                        <Text> {timeStart}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => showTimeEndPicker()}
                        style={[styles.buttonType1, { width: '40%' }]}>
                        <Text> {timeEnd}</Text>
                    </TouchableOpacity>
                </View>

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
                {checkTime ?
                    <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>Vui lòng chọn thời gian hoạt động</Text>
                    : null
                }
            </View>
            {/* vị trí trạm sạc  */}
            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}> Chọn vị trí</Text>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.row}>
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                placeholder={{ label: 'Tỉnh/TP...', value: '' }}
                                onValueChange={(value) => {
                                    const province = provinces.find(p => p.value === value) || { name: '' };
                                    fetchDistricts(value, province.name);
                                    setSelectedDistrict('');
                                    setSelectedWard('');
                                    setSelectedDistrictName('');
                                    setSelectedWardName('');
                                }}
                                items={provinces}
                                value={selectedProvince}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                placeholder={{ label: 'Quận/Huyện...', value: '' }}
                                onValueChange={(value) => {
                                    const district = districts.find(d => d.value === value) || { name: '' };
                                    fetchWards(value, district.name);
                                    setSelectedWard('');
                                    setSelectedWardName('');
                                }}
                                items={districts}
                                value={selectedDistrict}
                                style={pickerSelectStyles}
                                disabled={!selectedProvince}
                                useNativeAndroidPickerStyle={false}
                                textInputProps={{
                                    numberOfLines: 1,    // Hiển thị 1 dòng
                                    ellipsizeMode: 'tail', // Cắt bớt nếu quá dài (thêm '...')
                                }}
                            />
                        </View>
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                placeholder={{ label: 'Xã/Phường...', value: '' }}
                                onValueChange={(value) => {
                                    const ward = wards.find(w => w.value === value) || { name: '' };
                                    setSelectedWard(value);
                                    setSelectedWardName(ward.name);
                                }}
                                items={wards} S
                                value={selectedWard}
                                style={pickerSelectStyles}
                                disabled={!selectedDistrict}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                    </View>

                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }} >
                    <TextInput style={styles.textInput} onChangeText={setLoactionDetail} placeholder={'Nhập vị trí chi tiết'} />
                    <TouchableOpacity
                        // onPress={addService}
                        style={styles.buttonType1}>
                        <Text style={{ textAlign: 'center' }}>Chọn vị trí</Text>
                    </TouchableOpacity>
                </View>
                {checkLocation ?
                    <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>Vui lòng nhập đầy đủ thông tin </Text>
                    : null
                }
            </View>
            {/* chi tiết trụ sạc  */}
            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}>Chi tiết trụ sạc</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
                    <View style={{ width: '30%', alignItems: 'center' }}>
                        <TextInput
                            style={styles.textInputCharger}
                            placeholder={'Công suất'}
                            value={valuePower}
                            onChangeText={onChangeTextKw}
                            keyboardType="numeric"
                        />
                        {checkKw ?
                            <Text style={{ fontSize: 16, color: 'red' }}>Nhập công xuất</Text>
                            : null
                        }
                    </View>
                    <View style={{ width: '30%', alignItems: 'center' }}>
                        <TextInput
                            style={styles.textInputCharger}
                            placeholder={'Số cổng'}
                            value={valuePorts}
                            onChangeText={onChangeTextChager}
                            keyboardType="numeric"
                        />
                        {checkPort ?
                            <Text style={{ fontSize: 16, color: 'red' }}>Nhập số cổng !</Text>
                            : null
                        }
                    </View>

                    <View style={{ width: '30%', alignItems: 'center' }}>

                        <TextInput
                            style={styles.textInputCharger}
                            placeholder={'Giá tiền (Vnd)'}
                            value={valuePrice}
                            onChangeText={onChangeTextPrice}
                            keyboardType="numeric"
                        />
                        {checkPrice ?
                            <Text style={{ fontSize: 16, color: 'red' }}>Nhập giá tiền !</Text>
                            : null
                        }
                    </View>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={{ width: '40%', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => { setModalVisibleVehicle(true) }}
                            style={[styles.buttonType1, { width: '100%' }]}>
                            <Text style={{ extAlign: 'center' }}>{valueVehicle}</Text>
                        </TouchableOpacity>
                        {checkVehicle ?
                            <Text style={{ fontSize: 16, color: 'red' }}>Chọn phương tiện !</Text>
                            : null
                        }
                    </View>
                    <View style={{ width: '40%', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => { setModalVisibleSocket(true) }}
                            style={[styles.buttonType1, { width: '100%' }]}>
                            <Text style={{ extAlign: 'center' }}>{valueType}</Text>
                        </TouchableOpacity>
                        {checkChager ?
                            <Text style={{ fontSize: 16, color: 'red' }}>Chọn loại sạc !</Text>
                            : null
                        }
                    </View>


                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={validationCharing}
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
                <FlatList
                    data={saveForm}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => (
                        <View style={styles.listItem}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    borderRadius: 10,
                                    backgroundColor: COLOR.gray2,
                                    padding: '2%',
                                    margin: '1%',
                                }}>
                                <View>
                                    <Text>{item.power}Kw</Text>
                                    <Text>{item.ports} cổng</Text>
                                    <Text>{item.price}đ/Kwh</Text>
                                </View>
                                <View>
                                    <Text>Loại phương tiện: {item.vehicle}</Text>
                                    <Text>Loại sạc :{item.type}</Text>
                                </View>

                                {invisible === true ?
                                    <View style={{ flexDirection: '', justifyContent: 'flex-end', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => editDetail(index)} style={[styles.buttonList, { backgroundColor: 'green', }]}>
                                            <Text style={{ color: 'white' }}>Sửa</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deleteDetail(index)} style={[styles.buttonList, { backgroundColor: 'red', }]}>
                                            <Text style={{ color: 'white' }}>Xóa</Text>
                                        </TouchableOpacity>
                                    </View>
                                    : null}
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                {checkCharing ?
                    <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>Cần ít nhất 1 trụ sạc </Text>
                    : null
                }
            </View>
            {/* dịch vụ */}
            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}>Dịch vụ</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                    <FlatList
                        data={service}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 10,
                                    }}
                                    onPress={() => toggleSelection(item.id)}>
                                    <Text style={[styles.filterText, { marginLeft: 0 }]}>{item.name}</Text>
                                    <View style={[styles.checkbox, selectedService.includes(item.id) && styles.checkedBox]}>
                                        {selectedService.includes(item.id) && <Text style={styles.checkmark}>✓</Text>}
                                    </View>
                                </TouchableOpacity>

                            );
                        }}
                    />
                </View>
            </View>
            {/* ghi chú  */}
            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}>Ghi chú</Text>
                <TextInput
                    style={[styles.textInput, { textAlignVertical: 'top', width: '100%', margin: '5%', marginLeft: '0%', height: 100, }]}
                    placeholder={'Ghi chú'}
                    multiline
                />
            </View>
            {/* nút thêm trạm sạc  */}
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={Validation}
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
            {/* danh sách hãng xe  */}
            <Modal transparent={true} visible={modalVisibleBrand} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ScrollView showsVerticalScrollIndicator={false} >
                            {/* danh sách bộ lọc  */}
                            <Text style={styles.modalTitleSup}> Hãng xe  </Text>
                            <FlatList
                                data={carBrands}
                                scrollEnabled={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.filterItem}
                                        onPress={() => [setSelectedBrand(item.name), setSelectedBrandId(item.id)]}>
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
                                setModalVisibleBrand(false);
                            }}
                                style={styles.cancelButton}>
                                <Text style={styles.cancelText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisibleBrand(false);
                                }}
                                style={styles.applyButton}>
                                <Text style={styles.applyText}>Áp dụng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* phương tiện */}
            <Modal transparent={true} visible={modalVisibleVehicle} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ScrollView showsVerticalScrollIndicator={false} >
                            {/* danh sách bộ lọc  */}
                            <Text style={styles.modalTitleSup}>Hãng xe</Text>
                            <FlatList
                                data={typeVehicle}
                                scrollEnabled={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.filterItem}
                                        onPress={() => [setValueVehicle(item.name), setValueVehicleId(item.id)]}>
                                        <View style={styles.radioButton}>
                                            {valueVehicle === item.name && <View style={styles.radioInner} />}
                                        </View>
                                        <Text style={styles.filterText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </ScrollView >
                        {/* nút */}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity onPress={() => {
                                setModalVisibleVehicle(false);
                            }}
                                style={styles.cancelButton}>
                                <Text style={styles.cancelText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {

                                    setModalVisibleVehicle(false);
                                }}
                                style={styles.applyButton}>
                                <Text style={styles.applyText}>Áp dụng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* loại sạc  */}
            <Modal transparent={true} visible={modalVisibleSocket} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ScrollView showsVerticalScrollIndicator={false} >
                            {/* danh sách bộ lọc  */}
                            <Text style={styles.modalTitleSup}> Hãng xe  </Text>
                            <FlatList
                                data={typeSocket}
                                scrollEnabled={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.filterItem}
                                        onPress={() => [setValueType(item.name), setValueTypeId(item.id)]}>
                                        <View style={styles.radioButton}>
                                            {valueType === item.name && <View style={styles.radioInner} />}
                                        </View>
                                        <Text style={styles.filterText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </ScrollView >
                        {/* nút */}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity onPress={() => {
                                setModalVisibleSocket(false);
                            }}
                                style={styles.cancelButton}>
                                <Text style={styles.cancelText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {

                                    setModalVisibleSocket(false);
                                }}
                                style={styles.applyButton}>
                                <Text style={styles.applyText}>Áp dụng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </ScrollView>
    )
}

export default FormStation

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
    row: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5%',
        marginLeft: '5%',
        marginRight: '5%',
    },
    pickerContainer: {
        width: '30%',
        height: 50,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLOR.gray,
        justifyContent: 'center',
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
        marginTop: '5%'
    },
    textTitleInput: {
        fontSize: 20,
        color: COLOR.black,
        fontWeight: 700,
        fontFamily: 'Poppins'
    },
    textInput: {
        width: "60%",
        height: 50,
        fontSize: 16,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: COLOR.gray,
        borderRadius: 15,
        marginLeft: '5%',
    },
    textInputCharger: {
        width: '100%',
        height: 50,
        fontSize: 16,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: COLOR.gray,
        borderRadius: 15,
        textAlign: 'center'
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
        margin: '5%',
        padding: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: COLOR.gray,
        width: '30%',
        height: 50,
        borderWidth: 1,
    }


});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        height: 0,
        color: 'black',
        marginVertical: 30,
        marginHorizontal: 10,
    },
    inputAndroid: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});