import { StyleSheet, Text, View, Platform, ToastAndroid, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../axios/AxiosInstance';
import { AppContext } from '../../axios/AppContext';
import Toast from 'react-native-toast-message';
import { ItemListMyCar } from '../../item/ItemList';

const Car = () => {

    const navigation = useNavigation();
    const { myCar } = useContext(AppContext);
    const [dataSelectedCar, setDataSelectedCar] = useState(null)

    const showToast = (message, type = 'info') => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
            Toast.show({
                type,
                text1: message,
            });
        }
    };
    // // id đầu sạc 
    // console.log(dataSelectedCar.chargingCar._id);
    // // id hãng xe 
    // console.log(dataSelectedCar.modelCar._id);
    // console.log(dataSelectedCar);


    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <View style={styles.container}>
                {myCar.chargingCar === 'Không có' && myCar.modelCar === 'Không có' && myCar.vehicleCar === 'Không có' ?
                    <View style={[styles.viewList, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={{ fontSize: 16, fontWeight: 500 }}>Không có dữ liệu</Text>
                    </View>
                    :
                    <View style={styles.viewList}>
                        <ItemListMyCar data={myCar} setDataSelectedCar={setDataSelectedCar} dataSelectedCar={dataSelectedCar} />
                    </View>
                }

                <View style={styles.viewButton}>
                    {myCar.chargingCar === 'Không có' || myCar.modelCar === 'Không có' || myCar.vehicleCar === 'Không có' ?
                        <TouchableOpacity onPress={() => navigation
                            .navigate('MyCar')} style={{ width: '45%', height: 50, marginTop: '2.5%', marginBottom: '2.5%', backgroundColor: '#009558', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>Thêm phương tiện</Text>
                        </TouchableOpacity> : null}
                    {dataSelectedCar ?
                        <TouchableOpacity onPress={() => navigation
                            .navigate('MyCar')} style={{ width: '45%', height: 50, marginTop: '2.5%', marginBottom: '2.5%', backgroundColor: '#009558', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>Cập nhật thông tin</Text>
                        </TouchableOpacity> : null}
                </View>

            </View>
        </View>
    )
}

export default Car

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '94%',
        height: '96%',
        margin: '3%',
    },
    viewList: {
        width: '100%',
        height: '80%',
        backgroundColor: ''
    },
    viewItemList: {
        width: '100%',
    },
    viewButton: {
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})