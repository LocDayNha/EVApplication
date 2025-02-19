import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import React from 'react'

const TestOpenGoogleMap = () => {

    const openGoogleMaps = () => {
        const urlOpenGoogleMap = "https://www.google.com/maps/search/?api=1";
        const urlTestTrack = "https://www.google.com/maps/dir/''/Shi+Coffee+24h/@10.8430407,106.6405993,16.5z/data=!4m13!4m12!1m5!1m1!1s0x317529003803df45:0xbb4411f0a68ce4f0!2m2!1d106.6443!2d10.8413144!1m5!1m1!1s0x31752b979b95778d:0x6365fc1d87b055ee!2m2!1d106.617633!2d10.860742?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D";
        Linking.openURL(urlTestTrack).catch(err => Alert.alert("Error", "Failed to open Google Maps"));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Click to Open Google Map Application in Your Phone</Text>
            <TouchableOpacity style={styles.button} onPress={openGoogleMaps}>
                <Text style={styles.buttonText}>Open Google Maps</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TestOpenGoogleMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4285F4',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});