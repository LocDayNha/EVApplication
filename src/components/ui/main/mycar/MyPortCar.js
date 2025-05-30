import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity, FlatList, ToastAndroid, Platform } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../../axios/AxiosInstance';
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';
import { AppContext } from '../../../axios/AppContext';

const MyPortCar = () => {
    const route = useRoute();
    const { idMyVehicleCar, myVehicleCar } = route.params;
    const navigation = useNavigation();
    const { myCar, setMyCar } = useContext(AppContext);

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

    const [dataPortCar, setDataPortCar] = useState(null);
    const [dataSelectedPortCar, setDataSelectedPortCar] = useState(null);

    const getDataPortCar = async () => {
        try {
            const dataPortCar = await AxiosInstance().get('/port/get');

            if (dataPortCar.data && dataPortCar.data.length > 0) {
                setDataPortCar(dataPortCar.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /port/get');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu port:', error);
        }
    };

    const netPage = async () => {
        if (dataSelectedPortCar && typeof dataSelectedPortCar === 'object' && dataSelectedPortCar._id) {
            await setMyCar([{
                vehicleCar: myVehicleCar,
                modelCar: idMyVehicleCar,
                chargingCar: dataSelectedPortCar
            }]);
            navigation.navigate('Screen');
        } else {
            showToast('Vui lòng chọn loại đầu sạc xe của bạn', 'error');
        }
    }

    useEffect(() => {
        getDataPortCar();
    }, [])


    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View style={{ width: '100%', height: '5%' }}>
                    <TouchableOpacity style={styles.viewSkip}>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewHeader}>
                    <Text style={styles.textHeader}>Loại đầu sạc xe của bạn</Text>
                </View>
                <View style={styles.viewVehicle}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={false}
                        data={dataPortCar}
                        numColumns={3}
                        style={{ marginTop: '10%' }}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.viewList}>
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row', width: '100%', padding: '5%', borderRadius: 15,
                                        backgroundColor: dataSelectedPortCar === item ? '#D9D9D9' : 'white',
                                    }}
                                    onPress={() => setDataSelectedPortCar(item)}>
                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={{ uri: item.image }} style={{ width: 60, height: 60 }} />
                                        {item.name === 'GB/T' ? <Text style={{ fontSize: 14, fontWeight: 500 }}>{item.type} - {item.name}</Text>
                                            :
                                            <Text style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</Text>
                                        }
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
                    <Image source={require('../../../../assets/images/mycar/Frame4.png')} style={styles.imagePage} />
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

export default MyPortCar

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
        width: '30%',
        margin: '1%',
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