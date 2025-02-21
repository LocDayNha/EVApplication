import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";

const GOOGLE_MAP_API_KEY = "AIzaSyADJCV_7LiFmdeMd9TLZe_pLKn8qTDlank";

const Location = () => {
    const [location, setLocation] = useState({ lat: null, lng: null });

    const getLocation = async () => {
        try {
            const response = await axios.post(
                `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_MAP_API_KEY}`,
                {}
            );

            const { lat, lng } = response.data.location;
            setLocation({ lat, lng });
        } catch (error) {
            Alert.alert("Error", "Could not fetch location");
            console.error("Location error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={getLocation}>
                <Text style={styles.buttonText}>Get My Location</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Lat: {location.lat ?? "Loading..."}</Text>
            <Text style={styles.label}>Lng: {location.lng ?? "Loading..."}</Text>
        </View>
    );
}

export default Location;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    label: {
        fontSize: 18,
        marginTop: 10,
    },
});
