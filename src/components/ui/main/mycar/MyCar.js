import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import React, { useState, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { AppContext } from '../../../axios/AppContext';

const MyCar = () => {
    const navigation = useNavigation();
    const { setMyCar } = useContext(AppContext);

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

    const [vehicle, setVehicle] = useState(null);

    const netPage = async () => {
        if (vehicle && vehicle.length > 0 && vehicle === 'Xe máy điện') {
            await setMyCar(vehicle);
            navigation.navigate('Screen');
        } else if (vehicle && vehicle.length > 0 && vehicle === 'Ô tô điện') {
            navigation.navigate('MyBrandCar', { myCar: vehicle });
        } else {
            showToast('Vui lòng chọn loại phương tiện của bạn', 'error');
        }
    }

    const skip = async () => {
        await setMyCar('Bỏ qua');
        navigation.navigate('Screen');
    }

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View style={{ width: '100%', height: '5%' }}>
                    <TouchableOpacity style={styles.viewSkip} onPress={skip}>
                        <Text style={styles.text}>Bỏ qua</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewHeader}>
                    <Text style={styles.textHeader}>Loại phương tiện của bạn</Text>
                </View>
                <View style={styles.viewVehicle}>
                    <TouchableOpacity style={{ borderRadius: 10, backgroundColor: vehicle === 'Xe máy điện' ? '#D9D9D9' : 'white', }} onPress={() => setVehicle('Xe máy điện')}>
                        <Image style={styles.imageVehicle} source={require('../../../../assets/images/mycar/electric-bike.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setVehicle('Ô tô điện')} style={{ borderRadius: 10, backgroundColor: vehicle === 'Ô tô điện' ? '#D9D9D9' : 'white', }} >
                        <Image style={styles.imageVehicle} source={require('../../../../assets/images/mycar/electric-car.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewText}>
                    <Text style={styles.text}>Chọn thông tin phương tiện mà bạn sử dụng</Text>
                    <Text style={styles.text}>Điều này giúp bạn tìm kiếm trạm sạc</Text>
                    <Text style={styles.text}>nhanh và dễ dàng hơn</Text>
                </View>
                <View style={styles.viewPage}>
                    <Image source={require('../../../../assets/images/mycar/Frame1.png')} style={styles.imagePage} />
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

export default MyCar

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
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '61%',
    },
    imageVehicle: {
        width: 150,
        height: 150,
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