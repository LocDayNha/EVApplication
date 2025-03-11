import { StyleSheet, Text, View, Platform, ToastAndroid, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../axios/AxiosInstance';
import { AppContext } from '../../axios/AppContext';
import Toast from 'react-native-toast-message';

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

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <View style={styles.container}>
                {myCar.chargingCar === 'Không có' && myCar.modelCar === 'Không có' && myCar.vehicleCar === 'Không có' ?
                    <View style={[styles.viewList, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={{ fontSize: 16, fontWeight: 500 }}>Không có dữ liệu</Text>
                    </View>
                    :
                    <View style={styles.viewList}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={false}
                            data={myCar}
                            // keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <View style={styles.viewItemList}>
                                    <TouchableOpacity onPress={() => setDataSelectedCar(item)}>
                                        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                                            <View style={{ width: '90%', flexDirection: 'row' }}>
                                                {item.vehicleCar === 'Xe máy điện' ?
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image source={require('../../../assets/images/mycar/electric-bike.png')} style={{ width: 50, height: 50, marginLeft: '5%' }} />
                                                    </View>
                                                    :
                                                    null
                                                    // <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                    //     <Image source={require('../../../assets/images/mycar/electric-car.png')} style={{ width: 50, height: 50, marginLeft: '5%' }} />
                                                    // </View>
                                                }

                                                {item.vehicleCar !== 'Xe máy điện' ?
                                                    <View>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:'2%' }}>
                                                            <Image style={{ width: 35, height: 35, marginLeft: '5%' }} source={{ uri: item.modelCar.brand_id.image }} />
                                                            <Text style={{ marginLeft: '5%', fontSize: 16, fontWeight: 500 }}>{item.modelCar.brand_id.name} - {item.modelCar.name}</Text>
                                                        </View>
                                                        <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: '2%' }}>
                                                            <Image source={{ uri: item.chargingCar.image }} style={{ width: 50, height: 50 }} />
                                                            <Text style={{ marginLeft: '3%', fontSize: 16, fontWeight: 500 }}>{item.chargingCar.type} - {item.chargingCar.name}</Text>
                                                        </View>
                                                    </View>
                                                    :
                                                    null
                                                }

                                            </View>
                                            <View style={{ width: '10%', alignItems: 'center' }}>
                                                <View style={{ borderRadius: 20, width: 20, height: 20, borderWidth: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                    {dataSelectedCar === item ? <View style={{ borderRadius: 20, width: 13, height: 13, backgroundColor: 'gray' }}></View> : null}
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
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