import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

const TestGoogleMap = () => {
    const initialLocation = {
        latitude: 14.0583,
        longitude: 108.2772,
    };

    const [myLocation, setMyLocation] = useState(initialLocation);
    const [selectedLocation, setSelectedLocation] = useState(null); // Lưu vị trí người dùng chọn
    const mapRef = useRef(null);

    useEffect(() => {
        _getLocation();
    }, []);

    const _getLocation = useCallback(async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.warn('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setMyLocation(location.coords);
        } catch (err) {
            console.warn(err);
        }
    }, []);

    const focusOnLocation = () => {
        if (mapRef.current && myLocation.latitude && myLocation.longitude) {
            const newRegion = {
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
            mapRef.current.animateToRegion(newRegion, 1000);
        }
    };

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
        console.log(latitude);
        console.log(longitude);
    };

    return (
        <View style={styles.container}>
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
                onPress={handleMapPress} // Sự kiện chọn vị trí trên bản đồ
            >
                {/* Marker hiển thị vị trí hiện tại
                <Marker
                    coordinate={{
                        latitude: myLocation.latitude,
                        longitude: myLocation.longitude,
                    }}
                    title="Vị trí của tôi"
                    description="I am here"
                /> */}

                {/* Marker hiển thị vị trí được chọn */}
                {selectedLocation && (
                    <Marker
                        coordinate={selectedLocation}
                        title="Vị trí đã chọn"
                        description="Bạn đã chọn vị trí này"
                    />
                )}
            </MapView>

            <View style={styles.buttonContainer}>
                <Button title="Lấy vị trí hiện tại" onPress={focusOnLocation} />
            </View>
        </View>
    );
};

export default TestGoogleMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
});
