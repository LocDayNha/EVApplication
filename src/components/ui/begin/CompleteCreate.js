import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CompleteCreate = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/images/imageCP.png')} style={styles.image} />
            <View>
                <Text style={styles.textTitle}>Đã thay đổi mật khẩu{"\n"}thành công</Text>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('NewPassword')}>
                <Text style={styles.textBack}>Quay lại</Text>
            </TouchableOpacity>
        </View>

    )
}

export default CompleteCreate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        marginTop: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    textTitle: {
        fontSize: 24,
        marginTop: 28,
        marginBottom: 35,
        textAlign: "center",
        fontFamily: "Poppins_600SemiBold",
        maxWidth: "242%"
    },
    textBack: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "Poppins_600SemiBold",
    },
    backButton: {
        backgroundColor: "#3FA79B",
        width: "100%",
        padding: 15,
        borderRadius: 100,
        alignItems: "center",
        marginTop: 2
    },
})