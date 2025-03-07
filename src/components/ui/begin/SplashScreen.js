import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../axios/AppContext';

const SplashScreen = ({ navigation }) => {
    const { myCar } = useContext(AppContext);

    const netPage = async () => {
        setTimeout(() => {
            if (myCar || myCar === 'Bỏ qua') {
                navigation.replace('Screen');
            } else {
                navigation.replace('MyCar');
            }
        }, 2000);
    }

    useEffect(() => {
        netPage();
    }, [myCar]);
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