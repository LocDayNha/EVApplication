import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading'

const ForgotPass = () => {
    const navigation = useNavigation();
    const showAlert = (title, content) => {
        Alert.alert(title, content, [
            { text: "OK" },
        ]);
    };
    const [email, setEmail] = useState(null);

    const SenCode = () => {
        if (email) {
            navigation.navigate('Verification', { email: email, name: 'ForgotPass' })
        }
        else {
            showAlert('Thông báo','Vui lòng nhập email')
        }

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : null}
        >
            <View style={styles.container}>
                <View onTouchStart={() => Keyboard.dismiss()} style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../../assets/images/image1.png')} style={styles.image} />
                </View>
                <View>
                    <Text style={styles.textEmail}>Nhập email của bạn</Text>
                    <View style={styles.inputContainer}>
                        <Image source={require('../../../assets/icon/email.png')} style={styles.img} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={"#D9D9D9"}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.sendButton} onPress={SenCode}>
                    <Text style={styles.textSend}>Gửi</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ForgotPass

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100%',
    },
    image: {
        // marginTop: 44,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },

    img: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    inputContainer: {
        width: "100%",
        height: 50,
        paddingLeft: 16,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 10,
        marginBottom: 14,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    input: {
        flex: 1,
        width: "100%",
        height: "100%",
        fontSize: 16,
        textAlignVertical: "center",
        paddingLeft: 8,

    },
    sendButton: {
        backgroundColor: "#3FA79B",
        width: "100%",
        padding: 15,
        borderRadius: 100,
        alignItems: "center",
        marginTop: 30
    },
    textSend: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Poppins_600SemiBold"
    },
    textEmail: {
        color: "black",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        marginBottom: 25,
        paddingLeft: 1
    },
})