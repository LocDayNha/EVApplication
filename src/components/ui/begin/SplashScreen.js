import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useEffect} from 'react'

const SplashScreen = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
          navigation.replace('Login'); 
        }, 2000); // chuyển trang sau 2 giây
      }, []);
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/images/Splash (2).png')} style={styles.image} />
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        marginTop: 44,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
})