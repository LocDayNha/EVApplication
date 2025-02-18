import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

const GOOGLE_MAP_API_KEY = 'AIzaSyADJCV_7LiFmdeMd9TLZe_pLKn8qTDlank';

const TestYourLocation = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState('');

  const getMyLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_API_KEY}`
          );
          const data = await response.json();
          if (data.results.length > 0) {
            setAddress(data.results[0].formatted_address);
          } else {
            setAddress('Không tìm thấy địa chỉ');
          }
        } catch (error) {
          Alert.alert('Lỗi', 'Không thể lấy địa chỉ');
        }
      },
      (error) => {
        Alert.alert('Lỗi', 'Không thể lấy vị trí: ' + error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={getMyLocation}>
        <Text style={styles.buttonText}>Get My Location</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Address: {address || 'N/A'}</Text>
      <Text style={styles.label}>Lat: {location.lat || 'N/A'}</Text>
      <Text style={styles.label}>Lng: {location.lng || 'N/A'}</Text>
    </View>
  );
};

export default TestYourLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
});
