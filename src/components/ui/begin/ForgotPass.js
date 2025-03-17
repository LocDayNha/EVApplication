import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import Toast, { BaseToast } from 'react-native-toast-message';
import AxiosInstance from '../../axios/AxiosInstance';

const ForgotPass = () => {
    const navigation = useNavigation();

    const showToast = (type, content) => {
        Toast.show({
            type: type, // 'success', 'error', 'warning', 'info'
            text2: content,
            position: 'center',
            autoHide: false,
        });
    };
    // showToast('success', 'Thành công', 'Thành công');
    // showToast('error', 'Lỗi', 'Lỗi');
    // showToast('warning', 'Cảnh báo', 'Cảnh báo');
    // showToast('info', 'Thông báo', 'Thông báo');

    const showAlert = (title, content) => {
        Alert.alert(title, content, [
            { text: "OK" },
        ]);
    };

    const [email, setEmail] = useState(null);

    const Verify = async () => {
        if (!email) {
            showToast('warning', 'Vui lòng nhập thông tin');
            // showAlert('Thông báo', 'Vui lòng nhập thông tin');
            return;
        }

        const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            showToast('warning', 'Email sai định dạng');
            // showAlert('Thông báo', 'Email sai định dạng');
            return;
        }

        try {
            const response = await AxiosInstance().post('/user/getInforUserByEmail',
                {
                    email: email
                }
            );

            if (response.status !== true) {
                showToast('info', 'Email chưa đăng ký tài khoản');
                // showAlert('Thông báo', 'Email chưa đăng ký tài khoản');
            } else {
                navigation.navigate('Verification', { email, name: 'ForgotPass' });
            }
        } catch (error) {
            console.log('Lỗi hệ thống !');
            showToast('error', 'Vui lòng thử lại sau');
            // showAlert('Thông báo', 'Vui lòng thử lại sau');
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
                <TouchableOpacity style={styles.sendButton} onPress={Verify}>
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