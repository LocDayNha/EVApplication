import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity, FlatList, ToastAndroid, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../../axios/AxiosInstance';
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';

const MyBrandCar = () => {
    const route = useRoute();
    const { myCar } = route.params;
    const navigation = useNavigation();

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

    const [dataBrandCar, setDataBrandCar] = useState(null);
    const [dataSelectedBrandCar, setDataSelectedDataBrandCar] = useState(null);

    const getDataBrandCar = async () => {
        try {
            const dataBrandCar = await AxiosInstance().get('/brandcar/get');
            if (dataBrandCar.data && dataBrandCar.data.length > 0) {
                setDataBrandCar(dataBrandCar.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /brandcar/get');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu brandcar:', error);
        }
    };

    const netPage = async () => {
        if (dataSelectedBrandCar && dataSelectedBrandCar.length > 0) {
            navigation.navigate('MyVehicleCar', { id: dataSelectedBrandCar, myCar: myCar });
        } else {
            showToast('Vui lòng chọn hãng xe của bạn', 'error');
        }
    }

    useEffect(() => {
        getDataBrandCar();
    }, [])


    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View style={{ width: '100%', height: '5%' }}>
                    <TouchableOpacity style={styles.viewSkip}>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewHeader}>
                    <Text style={styles.textHeader}>Hãng xe của bạn</Text>
                </View>
                <View style={styles.viewVehicle}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={false}
                        data={dataBrandCar}
                        style={{ marginTop: '10%' }}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.viewList}>
                                <TouchableOpacity onPress={() => setDataSelectedDataBrandCar(item._id)}>
                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: '3%' }}>
                                        <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}>
                                            <Image style={{ width: 35, height: 35, marginLeft: '5%' }} source={{ uri: item.image }} />
                                            <Text style={{ marginLeft: '5%', fontSize: 16, fontWeight: 500 }}>{item.name}</Text>
                                        </View>
                                        <View style={{ width: '20%', alignItems: 'center' }}>
                                            <View style={{ borderRadius: 20, width: 20, height: 20, borderWidth: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                {dataSelectedBrandCar === item._id ? <View style={{ borderRadius: 20, width: 13, height: 13, backgroundColor: 'gray' }}></View> : null}
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
                <View style={styles.viewText}>
                    <Text style={styles.text}>Chọn thông tin phương tiện mà bạn sử dụng</Text>
                    <Text style={styles.text}>Điều này giúp bạn tìm kiếm trạm sạc</Text>
                    <Text style={styles.text}>nhanh và dễ dàng hơn</Text>
                </View>
                <View style={styles.viewPage}>
                    <Image source={require('../../../../assets/images/mycar/Frame2.png')} style={styles.imagePage} />
                </View>
                <View style={styles.viewButton}>
                    <TouchableOpacity onPress={netPage} style={styles.button}>
                        <LinearGradient colors={['#009558', '#5bdb5b',]} style={[styles.button, { width: '100%' }]}>
                            <Text style={styles.textButton} >Tiếp tục</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default MyBrandCar

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        alignItems: 'center',
        width: '94%',
        height: '96%',
        margin: '3%',
    },
    viewSkip: {
        height: 30,
        width: 70,
        position: 'absolute',
        right: 5,
        top: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewHeader: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '7%',
    },
    textHeader: {
        fontSize: 24,
        color: 'black',
        fontWeight: 400,
    },
    viewVehicle: {
        width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-around',
        // alignItems: 'center',
        height: '61%',
        // backgroundColor: 'gray'
    },
    viewList: {
        width: '100%',
    },
    viewText: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    viewPage: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '9%',
    },
    viewButton: {
        width: '100%',
        height: '6%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '90%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    textButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    }
})