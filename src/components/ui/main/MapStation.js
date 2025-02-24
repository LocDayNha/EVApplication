import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { ItemStation, ItemStationMain, ItemStationMap } from '../../item/Item';
import { AppContext } from '../../axios/AppContext';
import AxiosInstance from '../../axios/AxiosInstance';

const MapStation = (props) => {
    const initialLocation = { latitude: 14.0583, longitude: 108.2772 };

    const [myLocation, setMyLocation] = useState(initialLocation);
    const [searchText, setSearchText] = useState("");
    const [selectedStation, setSelectedStation] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => { _getLocation(); }, []);

    const _getLocation = useCallback(async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.warn('Permission bị từ chối');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setMyLocation(location.coords);
        } catch (err) {
            console.warn(err);
        }
    }, []);

    const focusOnLocation = () => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }, 1000);
        }
    };
    // Hàm lấy thông tin trạm sạc từ API
    const [dataStation, setDataStation] = useState([]);
    const getDataStation = async () => {
        try {
            const dataStation = await AxiosInstance().get('/station/get');
            if (dataStation.data && dataStation.data.length > 0) {
                setDataStation(dataStation.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /station/get');
                ToastAndroid.show('Không có thông tin trạm sạc', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
            ToastAndroid.show('Không thể tải danh sách thông tin trạm sạc', ToastAndroid.SHORT);
        }
    };

    // Hook effect khởi tạo dữ liệu
    useEffect(() => {
        getDataStation();
    }, []);

    const locations = [
        {
            id: 1, latitude: 14.0583, longitude: 108.2772, title: "Trạm 1",
            image: "https://www.pvoil.com.vn/media/1/he-thong-cua-hang-xang-dau.png", brand: "Honda", name: "Trạm Sạc Điện 1",
            location: "Quận 1, TP.HCM", time: "24/7", type: ["Type1", "Type2"]
        },
        {
            id: 2, latitude: 14.0600, longitude: 108.2800, title: "Trạm 2",
            image: "https://via.placeholder.com/100", brand: "Yamaha", name: "Trạm Sạc Điện 2",
            location: "Quận 3, TP.HCM", time: "7:00 - 22:00", type: ["Type3", "Type4"]
        },
        {
            id: 3, latitude: 14.0620, longitude: 108.2850, title: "Trạm 3",
            image: "https://via.placeholder.com/100", brand: "VinFast", name: "Trạm Sạc Điện 3",
            location: "Quận 5, TP.HCM", time: "6:00 - 23:00", type: ["Type1", "Type3"]
        }
    ];

    console.log(selectedStation)
    return (
        <View style={styles.container}>
            {/* <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Nhập vị trí..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View> */}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                ref={mapRef}
                provider="google"
            >
                {dataStation.map((location) => (
                    <Marker
                        key={location._id}
                        coordinate={{
                            latitude: location.lat,
                            longitude: location.lng,
                        }}
                        //title={location.title}
                        onPress={() => setSelectedStation(location)}
                    >
                        <Image source={require('../../../assets/icon/icons8-location-94.png')}
                            style={{ width: 40, height: 40 }} />
                    </Marker>
                ))}
            </MapView>

            {selectedStation && (
                <View style={styles.stationInfo}>
                    <TouchableOpacity style={{
                        backgroundColor: '#40A19C',
                        margin: 10,
                        padding: 10,
                        paddingHorizontal: 30,
                        borderRadius: 10,

                    }} onPress={() => setSelectedStation(null)}>
                        <Text style={styles.closeButton}>Đóng</Text>
                    </TouchableOpacity>
                    <ItemStationMap data={selectedStation} />

                </View>
            )}


            {/* {selectedStation && (
                <View style={styles.stationInfo}>
                    <Image style={styles.imgStation} source={{ uri: selectedStation.image }} />
                    <View>
                        <Text style={styles.textItemName}>
                            {selectedStation.brand} - {selectedStation.name}
                        </Text>
                        <Text style={styles.textItemLocation}>{selectedStation.location}</Text>
                        <Text style={styles.textItemLocation}>{selectedStation.time}</Text>
                        <Text style={styles.textItemLocation}>{selectedStation.type.join("/")}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setSelectedStation(null)}>
                        <Text style={styles.closeButton}>Đóng</Text>
                    </TouchableOpacity>
                </View>
            )} */}

            {/* <View style={styles.buttonContainer}>
                <Button title="Lấy vị trí hiện tại" onPress={focusOnLocation} />
            </View> */}
        </View>
    );
}


export default MapStation;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    searchContainer: {
        position: 'absolute',
        top: 50, width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10
    },
    map: {
        width: '100%',
        height: '100%'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center'
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
