import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';

const GOOGLE_MAP_API_KEY = 'AIzaSyADJCV_7LiFmdeMd9TLZe_pLKn8qTDlank';

const TestYourLocation = () => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get My Location</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.label}>Lat:</Text>
      <Text style={styles.label}>Lng:</Text>
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
