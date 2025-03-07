import { StyleSheet, View, Text, TouchableOpacity, FlatList, Linking, ToastAndroid, TextInput, Image, Modal, ScrollView, Touchable } from "react-native";
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

export function ItemForList({ title, content, setModal,checkActive }) {
    const [check,setCheck] = useState(checkActive)
    return (
        <TouchableOpacity onPress={() => setModal(true)} style={{ marginHorizontal: '5%', marginVertical: '2%' }} >
            <View style={{ backgroundColor: 'white', justifyContent: 'space-between', padding: 15, paddingHorizontal: 20, borderRadius: 5, flexDirection: 'row' }}>
                <View style={{width:'85%'}} >
                    <Text style={{ fontSize: SIZE.size14 }}>
                        {title}
                    </Text>
                    <Text style={{ fontSize: SIZE.size12, }} numberOfLines={1}>
                        {content}
                    </Text>
                </View>

                <View style={{alignItems:'center',justifyContent:'center'}}>
                    {
                        checkActive? 
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

export function ItemText1({ title }) {
    return (
        <View style={{ backgroundColor: COLOR.gray2, padding: 15, width: '45%', borderRadius: 5, alignItems: 'center' }}>
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

export function ItemTextInput1({ value, onChangeValue,checkValue }) {
    return (
        <View style={{ width: '45%', padding: 15 }}>
            <TextInput
                style={{
                    borderBottomWidth: 1,
                    borderColor: checkValue? 'red' : COLOR.green3,
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

const styles = StyleSheet.create({


})