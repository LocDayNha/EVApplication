import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Screen');
        }, 2000); // chuyển trang sau 2 giây
    }, []);
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/images/Splash (2).png')} />
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100%'
    },
})