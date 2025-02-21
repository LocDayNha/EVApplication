import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location'

const TestYourLocation = () => {

  const [errorMsg, setErrorMsg] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [address, setAddress] = useState('');

  const getYourLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permission to location was not granted');
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude, longitude
      });
      console.log('latitude:', latitude);
      console.log('longitude:', longitude);
      setLat(latitude);
      setLng(longitude);
      setAddress(response[0].formattedAddress);
    }
  }

  useEffect(() => {
    getYourLocation();
  }, [])


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get My Location</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Address: {address}</Text>
      <Text style={styles.label}>Lat: {lat}</Text>
      <Text style={styles.label}>Lng: {lng}</Text>
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
