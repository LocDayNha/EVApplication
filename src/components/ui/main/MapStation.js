import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { ItemStation, ItemStationMain, ItemStationMap } from '../../item/Item';
import { AppContext } from '../../axios/AppContext';
import AxiosInstance from '../../axios/AxiosInstance';
import Toast from 'react-native-toast-message';
import { ItemLoading } from '../../item/ItemList';

const MapStation = (props) => {
    const [checkLoading, setCheckLoading] = useState(false);
    const showToast = (type, content) => {
        Toast.show({
            type: type, // 'success', 'error', 'warning', 'info'
            text2: content,
            position: 'top',
            autoHide: 5000,
        });
    };

    const initialLocation = { latitude: 10.8231, longitude: 106.6297 };

    const [myLocation, setMyLocation] = useState(initialLocation);
    const [searchText, setSearchText] = useState("");
    const [selectedStation, setSelectedStation] = useState(null);
    const mapRef = useRef(null);
    useEffect(() => { _getLocation(); }, []);

    const _getLocation = useCallback(async () => {
        try {
            setCheckLoading(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.warn('Permission bị từ chối');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setMyLocation(location.coords);
        } catch (err) {
            console.warn(err);
            setCheckLoading(false);
        }
    }, []);

    const focusOnLocation = () => {
        if (mapRef.current) {
            setCheckLoading(true);
            mapRef.current.animateToRegion({
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }, 1000);
            setCheckLoading(false);
        }
        else {
            setCheckLoading(false);
        }
    };
    // Hàm lấy thông tin trạm sạc từ API
    const [dataStation, setDataStation] = useState([]);
    const getDataStation = async () => {
        try {
            setCheckLoading(true);
            const dataStation = await AxiosInstance().get('/station/get');
            if (dataStation.data && dataStation.data.length > 0) {
                setDataStation(dataStation.data);
                setCheckLoading(false);
            } else {
                console.log('Không tìm thấy dữ liệu từ /station/get');
                showToast('info', 'Không có thông tin trạm sạc');
                setCheckLoading(false);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
            showToast('error', 'Không thể tải danh sách thông tin trạm sạc');
            setCheckLoading(false);
        }
    };



    useEffect(() => {
        getDataStation();
        focusOnLocation;
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={focusOnLocation} style={styles.buttonContainer}>
                    <Image style={{ width: 30, height: 30, tintColor:'black' }} source={require('../../../assets/icon/icons8-my-location-48.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={getDataStation} style={styles.buttonContainer2}>
                    <Image style={{ width: 30, height: 30, }} source={require('../../../assets/icon/map/reload.png')} />
                </TouchableOpacity>
            </View>


            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                ref={mapRef}
                onTouchStart={() => setSelectedStation(null)}
            >
                {dataStation.map((location) => (
                    <Marker
                        key={location._id}
                        coordinate={{
                            latitude: location.lat,
                            longitude: location.lng,
                        }}
                        title={location.name}
                        onPress={() => setSelectedStation(location)}
                    >
                        {Platform.OS === 'ios' ?
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: location.brand_id.image }}
                                    style={{ width: 30, height: 30, }} />
                                <Image source={require('../../../assets/icon/IconLoaction.png')}
                                    style={{ width: 50, height: 50, }} />
                            </View>
                            :
                            <Image source={require('../../../assets/icon/IconLoaction.png')}
                                style={{ width: 40, height: 40, }} />
                        }
                    </Marker>
                ))}

                <Marker
                    coordinate={{
                        latitude: myLocation.latitude,
                        longitude: myLocation.longitude,
                    }}
                    title={'Vị trí của tôi'}
                >
                </Marker>
            </MapView>

            {selectedStation && (
                <View style={styles.stationInfo}>
                    <ItemStationMap data={selectedStation} />

                </View>
            )}

            <ItemLoading checkValue={checkLoading} />
        </View>
    );
}


export default MapStation;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    searchContainer: {
        position: 'relative',
        top: 40,
        width: '100%',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 10,

    },
    buttonContainer: {
        position: 'absolute',
        left: '80%',
        height: 50,
        width: 50,
        backgroundColor: 'white',
        marginHorizontal: '5%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonContainer2: {
        position: 'absolute',
        left: '80%',
        top: 60,
        height: 50,
        width: 50,
        backgroundColor: 'white',
        marginHorizontal: '5%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    map: {
        width: '100%',
        height: '100%'
    },
    stationInfo: {
        position: 'absolute',
        bottom: '2%',
        left: '5%',
        right: '5%',
        padding: 10,
        alignItems: 'center',
    },
    imgStation: {
        width: 200,
        height: 100,
        borderRadius: 8,
        marginRight: 10
    },
    textItemName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    textItemLocation: {
        fontSize: 14,
        color: '#555'
    },
    closeButton: {
        color: 'white',
        textAlign: 'center'
    },
});
