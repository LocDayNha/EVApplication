import { StyleSheet, Text, View, ScrollView, Image, Modal, FlatList, TextInput, TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from "../../../assets/Theme/Theme";
import ModalDropdown from 'react-native-modal-dropdown';
import { TextInputProfile } from '../../item/Item';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';


const FormStation = () => {


    const [editIndex, setEditIndex] = useState(null);

    const [valuePower, setValuePower] = useState('');
    const [valuePorts, setValuePorts] = useState('');
    const [valuePrice, setValuePrice] = useState('');
    const [valueType, setValueType] = useState(null);
    const [valueVehicle, setValueVehicle] = useState(null);


    const [openType, setOpenType] = useState(false);
    const [itemsType, setItemsType] = useState([
        { label: 'ccs1', value: 'ccs1' },
        { label: 'ccs2', value: 'ccs2' },
        { label: 'ccs3', value: 'ccs3' },
    ]);

    const [openVehicle, setOpenVehicle] = useState(false);
    const [itemsVehicle, setItemsVehicle] = useState([
        { label: 'Ô tô', value: 'ô Tô' },
        { label: 'Xe máy', value: 'Xe máy' },
        { label: 'Cả 2', value: 'Cả 2' },
    ]);

    const [valueService, setValueService] = useState(null);
    const [openService, setOpenService] = useState(false);
    const [itemsService, setItemsService] = useState([
        { label: 'Wc', value: 'Wc' },
        { label: 'Đồ ăn', value: 'Đồ ăn' },
        { label: 'Đồ uống', value: 'Đồ uống' },
    ]);
    const [valueBrand, setValueBrand] = useState(null);
    const [openBrand, setOpenBrand] = useState(false);
    const [itemsBrand, setItemsBrand] = useState([
        { label: 'Vinfast', value: 'Vinfast' },
        { label: 'Honda', value: 'Honda' },
        { label: 'Yamaha', value: 'Yamaha' },
    ]);


    const [saveForm, setSaveForm] = useState([]);

    const addOrUpdateDetail = () => {
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

    const deleteDetail = (index) => {
        setSaveForm(saveForm.filter((_, i) => i !== index));
    };
    const deleteService = (index) => {
        setListService(listService.filter((_, i) => i !== index));
    };


    const clearForm = () => {
        setValuePower('');
        setValuePorts('');
        setValuePrice('');
        setValueVehicle(null);
        setValueType(null);
    };

    const addService = () => {
        const newDetail = { service: valueService };


        setListService([...listService, newDetail]);
        setValueService(null);
    };
    const [listService, setListService] = useState([]);



    const [invisible, setInvisible] = useState(false);

    // console.log(saveForm)




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
        // console.log(image)
    };





    // console.log(timeStart)
    return (
        <ScrollView style={styles.container}>


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
                            marginBottom: '0%'
                        }} >
                        {
                            checkImage ? <Text> Thêm hình ảnh </Text> : null
                        }

                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, }} />}
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}>Tên trạm sạc</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Nhập tên'}
                />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}>Hãng trạm sạc </Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                    <DropDownPicker
                        style={{ width: 200, borderColor: COLOR.gray2, }}
                        containerStyle={{ width: 200, borderColor: COLOR.gray2 }}
                        dropDownContainerStyle={{ borderColor: COLOR.gray2 }}
                        open={openBrand}
                        value={valueBrand}
                        items={itemsBrand}
                        setOpen={setOpenBrand}
                        setValue={setValueBrand}
                        setItems={setItemsBrand}
                        placeholder='Chọn hãng xe'
                    />
                </View>

            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}> Chọn vị trí</Text>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        // onPress={addService}
                        style={{
                            margin: '5%',
                            padding: '3%',
                            marginBottom: '2%',
                            backgroundColor: '#40A19C',
                            width: '40%',
                            justifyContent: 'center',
                            borderRadius: 10,
                        }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Chọn vị trí</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}>Thời gian hoạt động </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: '5%', marginBottom: '0%' }}>
                    <TouchableOpacity
                        onPress={() => showTimeStartPicker()}
                        style={[{
                            backgroundColor: COLOR.gray2,
                            width: '40%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '3%'
                        }]}>
                        <Text> {timeStart}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => showTimeEndPicker()}
                        style={[{
                            backgroundColor: COLOR.gray2,
                            width: '40%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '3%'
                        }]}>
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

            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textTitleInput}>Chi tiết trụ sạc</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
                    <TextInput
                        style={styles.textInputCharger}
                        placeholder={'Công suất'}
                        value={valuePower}
                        onChangeText={setValuePower}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.textInputCharger}
                        placeholder={'Số cổng'}
                        value={valuePorts}
                        onChangeText={setValuePorts}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.textInputCharger}
                        placeholder={'Giá tiền'}
                        value={valuePrice}
                        onChangeText={setValuePrice}
                        keyboardType="numeric"
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
                    <DropDownPicker
                        style={{ width: 150, borderColor: COLOR.gray2, }}
                        containerStyle={{ width: 150, borderColor: COLOR.gray2 }}
                        dropDownContainerStyle={{ borderColor: COLOR.gray2 }}
                        open={openVehicle}
                        value={valueVehicle}
                        items={itemsVehicle}
                        setOpen={setOpenVehicle}
                        setValue={setValueVehicle}
                        setItems={setItemsVehicle}
                        placeholder='Phương tiện'
                    />
                    <DropDownPicker
                        style={{ width: 150, borderColor: COLOR.gray2, }}
                        containerStyle={{ width: 150, borderColor: COLOR.gray2 }}
                        dropDownContainerStyle={{ borderColor: COLOR.gray2 }}
                        open={openType}
                        value={valueType}
                        items={itemsType}
                        setOpen={setOpenType}
                        setValue={setValueType}
                        setItems={setItemsType}
                        placeholder='Loại sạc'
                    />

                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={addOrUpdateDetail}
                        style={{
                            margin: '5%',
                            padding: '3%',
                            marginBottom: '2%',
                            backgroundColor: '#40A19C',
                            width: '40%',
                            justifyContent: 'center',
                            borderRadius: 10,
                        }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>{editIndex !== null ? "Cập nhật" : "Lưu trụ sạc"}</Text>
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
                                    <Text>Loại sạc :{item.type}Kw</Text>
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
                <View style={styles.viewInput}>
                    <Text style={styles.textTitleInput}>Dịch vụ</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                        <DropDownPicker
                            style={{ width: 200, borderColor: COLOR.gray2, }}
                            containerStyle={{ width: 200, borderColor: COLOR.gray2 }}
                            dropDownContainerStyle={{ borderColor: COLOR.gray2 }}
                            open={openService}
                            value={valueService}
                            items={itemsService}
                            setOpen={setOpenService}
                            setValue={setValueService}
                            setItems={setItemsService}
                            placeholder='Chọn dịch vụ'
                        />
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={addService}
                            style={{
                                margin: '5%',
                                padding: '3%',
                                marginBottom: '2%',
                                backgroundColor: '#40A19C',
                                width: '40%',
                                justifyContent: 'center',
                                borderRadius: 10,
                            }}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Lưu dịch vụ</Text>
                        </TouchableOpacity>
                    </View>


                </View>
                <FlatList
                    data={listService}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => (
                        <View style={styles.listItem}>
                            <View
                                style={{
                                    margin: '1%',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderRadius: 10,
                                    backgroundColor: COLOR.gray2,
                                    padding: '2%'
                                }}>
                                <Text>Dịch vụ :{item.service}</Text>
                                <TouchableOpacity onPress={() => deleteService(index)} style={[styles.buttonList, { backgroundColor: 'green', }]}>
                                    <Text style={{ color: 'white' }}>Xóa</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.viewInput}>
                    <Text style={styles.textTitleInput}>Ghi chú</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Ghi chú'}
                    />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={addService}
                        style={{
                            margin: '10%',
                            padding: '5%',
                            backgroundColor: '#40A19C',
                            borderRadius: 10,
                            width: '100%'
                        }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Thêm mới trạm sạc </Text>
                    </TouchableOpacity>
                </View>





            </View>
            {/* <ModalDropdown options={['option 1', 'option 2']} defaultValue={('chọn cái này ')} /> */}
        </ScrollView>
    )
}

export default FormStation

const styles = StyleSheet.create({

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
        width: "85%",
        paddingLeft: 10,
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
        width: "100%",
        height: 50,
        fontSize: 16,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: COLOR.gray,
        borderRadius: 15,
        marginTop: '5%',
    },
    textInputCharger: {
        width: "30%",
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
    }


})