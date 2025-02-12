import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ForgotPass = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/images/image1.png')} style={styles.img} />
        </View>
    )
}

export default ForgotPass

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        justifyContent: 'center',
        alignItems: 'center',
        
    }
})