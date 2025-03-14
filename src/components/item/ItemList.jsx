import { StyleSheet, View, Text, TouchableOpacity, Switch, FlatList, Linking, ToastAndroid, TextInput, Image, Modal, ScrollView, Touchable, ActivityIndicator } from "react-native";
import { COLOR, SIZE } from "../../assets/Theme/Theme";
import { useNavigate } from "react-router-native";
import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../axios/AppContext';
import AxiosInstance from "../axios/AxiosInstance";
import { MaterialIcons } from "@expo/vector-icons";
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import haversine from 'haversine-distance';
import DateTimePickerModal from "react-native-modal-datetime-picker";


export function ItemForList({ title, content, setModal, checkActive }) {
    const [check, setCheck] = useState(checkActive)
    return (
        <TouchableOpacity onPress={() => setModal(true)} style={{ marginHorizontal: '5%', marginVertical: '2%' }} >
            <View style={{ backgroundColor: 'white', justifyContent: 'space-between', padding: 15, paddingHorizontal: 20, borderRadius: 5, flexDirection: 'row' }}>
                <View style={{ width: '85%' }} >
                    <Text style={{ fontSize: SIZE.size14 }}>
                        {title}
                    </Text>
                    <Text style={{ fontSize: SIZE.size12, }} numberOfLines={1}>
                        {content}
                    </Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {
                        checkActive ?
                            <Image style={{ width: 20, height: 20 }} source={require('../../assets/icon/icons8-approved-48.png')} />
                            :
                            <Image style={{ width: 20, height: 20 }} source={require('../../assets/icon/icons8-remove-26.png')} />
                    }

                </View>
            </View>

        </TouchableOpacity>

    )

}

export function ItemButton1({ title, onPress }) {

    return (
        <TouchableOpacity onPress={() => onPress()} style={{ width: '45%', }} >
            <View style={{ backgroundColor: COLOR.gray2, padding: 15, width: '100%', alignItems: 'center', borderRadius: 5 }}>
                <View >
                    <Text style={{ fontSize: SIZE.size14 }}>
                        {title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
export function ItemButton2({ title, onPress }) {

    return (
        <TouchableOpacity onPress={() => onPress()} style={{ width: '40%', }} >
            <View style={{ backgroundColor: COLOR.gray2, padding: 15, width: '100%', alignItems: 'center', borderRadius: 5 }}>
                <View >
                    <Text style={{ fontSize: SIZE.size14 }}>
                        {title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export function ItemText1({ title }) {
    return (
        <View style={{ padding: 15, width: '45%', borderRadius: 5, alignItems: 'center' }}>
            <View >
                <Text style={{ fontSize: SIZE.size14 }}>
                    {title}
                </Text>
            </View>
        </View>
    )

}

export function ItemTitle1({ title }) {
    return (
        <View style={{}}>
            <View >
                <Text style={{ fontSize: SIZE.size16 }}>
                    {title}
                </Text>
            </View>
        </View>
    )
}

export function ItemTextInput1({ value, onChangeValue, checkValue }) {
    return (
        <View style={{ width: '45%', padding: 15 }}>
            <TextInput
                style={{
                    borderBottomWidth: 1,
                    borderColor: checkValue ? 'red' : COLOR.green3,
                    textAlign: "center",
                    color: 'black',
                    fontWeight: '700',
                    fontSize: 16,
                }} onChangeText={onChangeValue}
                placeholder='Kw'
                value={value}
                keyboardType="numeric" />
        </View>
    )
}

export function ItemLoading({ text = 'Đang tải...', size = 'large', color = '#007bff', checkValue }) {
    return (
        <Modal transparent={true} visible={checkValue} animationType="slide">
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.3)',
            }}>
                <ActivityIndicator size={size} color={color} />
                <Text style={{
                    marginTop: 10,
                    fontSize: 16,
                    color: '#333',
                }}>{text}</Text>
            </View>
        </Modal>

    );
};

export function ItemTextInput2({ title, content, value, onChangeText, checkValue, placeholder, widthBody, center, number }) {
    return (
        <View style={{ width: widthBody, paddingHorizontal: 15, paddingVertical: 5 }}>
            <View style={{ alignItems: center ? 'center' : null, }}>
                {title ? <Text style={{ fontSize: SIZE.size16 }}>{title}</Text> : <Text style={{ fontSize: SIZE.size14 }}>{content}</Text>}
            </View>

            <TextInput
                style={{
                    borderColor: checkValue ? 'red' : COLOR.gray2,
                    color: 'black',
                    fontSize: 14,
                    borderWidth: 1,
                    borderRadius: 10,
                    marginVertical: '1%',
                    height: 50,
                    paddingHorizontal: 10,
                    textAlignVertical: 'center',
                    textAlign: center ? 'center' : null
                }}
                onChangeText={onChangeText}
                placeholder={placeholder}
                value={value}
                numberOfLines={1}
                keyboardType={number ? "numeric" : null}
            />
        </View>
    )
}

export function ItemText2({ title, value, setCheckModal, checkValue, placeholder, widthBody }) {
    return (
        <View style={{ width: widthBody, paddingHorizontal: 15, paddingVertical: 5, }}>
            <Text style={{ fontSize: SIZE.size16 }}>{title}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View
                    style={{

                        borderColor: checkValue ? 'red' : COLOR.gray2,
                        borderWidth: 1,
                        marginVertical: '1%',
                        borderRadius: 10,
                        height: 50,
                        paddingHorizontal: 10,
                        width: '80%',
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 14,
                        }}
                        numberOfLines={1}
                    >
                        {value}
                    </Text>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        padding: 10,
                        borderColor: COLOR.gray2,
                        borderWidth: 1,
                        borderRadius: 30,
                        backgroundColor: 'white',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => setCheckModal(true)}
                >
                    <Image style={{ width: 30, height: 30, }} source={require('../../assets/icon/icons8-my-location-48.png')} />
                </TouchableOpacity>
            </View>


        </View>
    )
}

export function ItemTimePicker({ time, setTime, title, timeVisible, setTimeVisible }) {
    const showTimePicker = () => setTimeVisible(true);
    const hideTimePicker = () => setTimeVisible(false);

    const handleConfirmTimeStart = (date) => {
        const dt = new Date(date);
        setTime(dt.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }));
        hideTimePicker();
    };
    return (
        <View style={{ paddingHorizontal: 15, paddingVertical: 5, }}>
            <Text style={{}} >
                {title}
            </Text>
            <TouchableOpacity
                onPress={showTimePicker}
                style={{
                    marginVertical: '1%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    borderBottomWidth: 1,
                    borderColor: COLOR.green3,
                }}
            >
                <Text
                    style={{ fontSize: SIZE.size16 }}
                >
                    {time}
                </Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={timeVisible}
                mode="time"
                onConfirm={handleConfirmTimeStart}
                onCancel={hideTimePicker}
            />
        </View>
    )
}
export function ItemButtonSwitch({ value, onChangeValue }) {
    return (
        <Switch
            trackColor={{ false: '#767577', true: '#42E529FF' }}
            thumbColor={value ? '#FFFFFFFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onChangeValue}
            value={value}
        />
    )
}

export function ItemDropDownRadioButton({ title, content, data, selectedValue, setSelectedValue, openDropdown, setOpenDropdown }) {
    const lowercaseTitle = title ? title.toLowerCase() : content.toLowerCase();
    return (
        <View style={{ width: '45%', marginVertical: '1%' }}>
            <View style={{ marginBottom: '3%' }}>
                {title ? <Text style={{ fontSize: SIZE.size16 }}>{title}</Text> : <Text style={{ fontSize: SIZE.size14 }}>{content}</Text>}
            </View>
            {openDropdown ?
                <View>
                    <TouchableOpacity
                        onPress={() => setOpenDropdown(false)}
                        style={{
                            width: '100%',
                            height: 50,
                            borderWidth: 1,
                            borderColor: '#CCCCCC',
                            padding: '2%',
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            paddingHorizontal: '5%',
                        }}>
                        <Text numberOfLines={1} style={{ width: '80%' }}>{!selectedValue || selectedValue.length > 0 ? 'Đã chọn ' + lowercaseTitle : 'Chọn ' + lowercaseTitle}</Text>
                        <View activeOpacity={1} style={{}} >
                            <Image source={require('../../assets/icon/up.png')} style={{ width: 24, height: 24 }} />
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        position: 'absolute',
                        top: 50,
                        width: '100%',
                        maxHeight: 200,
                        borderWidth: 1,
                        borderColor: '#CCCCCC',
                        paddingHorizontal: '5%',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor: 'white',
                        zIndex: 999,
                    }}>
                        <ScrollView style={{ maxHeight: 200, flex: 1 }}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            contentContainerStyle={{ flexGrow: 1 }}>
                            {data.map((item) => (
                                <TouchableOpacity
                                    key={item._id}
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        height: 40,
                                    }}
                                    onPress={() => setSelectedValue(item._id)}
                                >
                                    <View style={{ flexDirection: "row", alignItems: 'center', width: '70%' }}>
                                        {item.image ? <Image style={{ width: 25, height: 25 }} source={{ uri: item.image }} /> : null}
                                        <View style={{ marginLeft: '5%' }}>
                                            <Text style={{}}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 12.5,
                                        borderWidth: 2,
                                        borderColor: selectedValue === item._id ? '#009558' : 'gray',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {selectedValue === item._id && (
                                            <View style={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: 6,
                                                backgroundColor: '#009558',
                                            }} />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                :
                <TouchableOpacity
                    onPress={() => setOpenDropdown(true)}
                    style={{
                        width: '100%',
                        height: 50,
                        borderWidth: 1,
                        borderColor: '#CCCCCC',
                        backgroundColor: 'white',
                        padding: '2%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderRadius: 10,
                        alignItems: 'center',
                        paddingHorizontal: '5%',
                    }}>
                    <Text style={{ width: '80%' }} numberOfLines={1}>{!selectedValue || selectedValue.length > 0 ? 'Đã chọn ' + lowercaseTitle : 'Chọn ' + lowercaseTitle}</Text>
                    <View activeOpacity={1} style={{}} >
                        <Image source={require('../../assets/icon/up.png')} style={{ width: 24, height: 24, transform: [{ rotate: '180deg' }] }} />
                    </View>
                </TouchableOpacity>
            }
        </View>
    );
}
export function ItemDropDownCheckBox({ title, content, data, selectedValues, setSelectedValues, openDropdown, setOpenDropdown }) {
    const lowercaseTitle = title.toLowerCase();
    const toggleSelection = (id) => {
        if (selectedValues.includes(id)) {
            setSelectedValues(selectedValues.filter((item) => item !== id)); // Bỏ chọn
        } else {
            setSelectedValues([...selectedValues, id]); // Thêm vào danh sách chọn
        }
    };
    return (
        <View style={{ width: '45%', marginVertical: '1%' }}>
            <View style={{ marginBottom: '3%' }}>
                {title ? <Text style={{ fontSize: SIZE.size16 }}>{title}</Text> : <Text style={{ fontSize: SIZE.size14 }}>{content}</Text>}
            </View>
            {openDropdown ? (
                <View>
                    <TouchableOpacity
                        onPress={() => setOpenDropdown(false)}
                        style={{
                            width: '100%',
                            height: 50,
                            borderWidth: 1,
                            borderColor: '#CCCCCC',
                            padding: '2%',
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            paddingHorizontal: '5%',
                        }}>
                        <Text style={{ width: '80%' }} numberOfLines={1} >{Array.isArray(selectedValues) && selectedValues.length > 0 ? `Đã chọn ${lowercaseTitle}` : `Chọn ${lowercaseTitle}`}</Text>
                        <View activeOpacity={1} >
                            <Image source={require('../../assets/icon/up.png')} style={{ width: 24, height: 24 }} />
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        position: 'absolute',
                        top: 50,
                        width: '100%',
                        maxHeight: 200,
                        borderWidth: 1,
                        borderColor: '#CCCCCC',
                        paddingHorizontal: '5%',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor: 'white',
                        zIndex: 999,
                    }}>
                        <ScrollView style={{ maxHeight: 200, flex: 1 }}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            contentContainerStyle={{ flexGrow: 1 }}>
                            {data.map((item) => (
                                <TouchableOpacity
                                    key={item._id}
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        height: 40,
                                    }}
                                    onPress={() => toggleSelection(item._id)}
                                >
                                    <View style={{ flexDirection: "row", alignItems: 'center', width: '70%' }}>
                                        <Image style={{ width: 25, height: 25 }} source={{ uri: item.image }} />
                                        <View style={{ marginLeft: '5%' }}>
                                            <Text>{item.name}</Text>
                                        </View>
                                    </View>
                                    {/* Hiển thị checkbox */}
                                    <View style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderWidth: 2,
                                        borderColor: selectedValues.includes(item._id) ? '#009558' : 'gray',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {selectedValues.includes(item._id) && (
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: '#009558', }}>✓</Text>
                                            </View>

                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            ) : (
                <TouchableOpacity
                    onPress={() => setOpenDropdown(true)}
                    style={{
                        width: '100%',
                        height: 50,
                        borderWidth: 1,
                        borderColor: '#CCCCCC',
                        backgroundColor: 'white',
                        padding: '2%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderRadius: 10,
                        alignItems: 'center',
                        paddingHorizontal: '5%',
                    }}>
                    <Text style={{ width: '80%' }} numberOfLines={1}>{Array.isArray(selectedValues) && selectedValues.length > 0 ? `Đã chọn ${lowercaseTitle}` : `Chọn ${lowercaseTitle}`}</Text>
                    <View activeOpacity={1} >
                        <Image source={require('../../assets/icon/up.png')} style={{ width: 24, height: 24, transform: [{ rotate: '180deg' }] }} />
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}


const styles = StyleSheet.create({


})