import { StyleSheet, Text, View, Image, TextInput, ToastAndroid, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import AxiosInstance from '../../axios/AxiosInstance';


const Verification = () => {
    const route = useRoute();
    const { email, name } = route.params;
    const navigation = useNavigation();

    const [otp, setOtp] = useState(new Array(4).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (!/^[0-9]*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
            inputRefs.current[index - 1]?.focus();

        }
    };

    // sent code verify
    const [codeResult, setCodeResult] = useState(null);
    const SentCode = async () => {
        try {
            const code = await AxiosInstance().post('/user/sent-code',
                {
                    email: email
                }
            );
            if (code && code.verifyCode) {
                setCodeResult(parseInt(code.verifyCode, 10));
                ToastAndroid.show('Kiểm tra mã xác nhận ở Email', ToastAndroid.SHORT);
                console.log('Gửi mã xác nhận thành công:', code.verifyCode)
            } else {
                ToastAndroid.show('Đăng ký thất bại!', ToastAndroid.SHORT);
            }
        } catch (error) {
            ToastAndroid.show('Có lỗi xảy ra, vui lòng thử lại', ToastAndroid.SHORT);
        }
    }

    // checking code
    const handleConfirm = async () => {
        const otpCode = otp.join("");
        const otpNumber = parseInt(otpCode, 10);
        try {
            const response = await AxiosInstance().post('/user/verify',
                {
                    codeInput: otpNumber,
                    codeResult: codeResult,
                    email: email
                }
            );
            if (response && name === 'Register') {
                console.log('Xác nhận thành công');
                navigation.navigate('CompleteCreate');
            } else if (response && name === 'Login') {
                console.log('Xác nhận thành công');
                navigation.navigate('CompleteCreate');
            } else {
                console.log('Xác nhận thành công');
                navigation.navigate('NewPassword', { email: email });
            }
        } catch (error) {
            ToastAndroid.show('Có lỗi xảy ra, vui lòng thử lại', ToastAndroid.SHORT);
        }
    };

    useEffect(() => {
        SentCode();
    }, [])


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : null}
        >
            <View style={styles.container}>
                <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center' }} onTouchStart={() => Keyboard.dismiss()}>
                    <Image source={require('../../../assets/images/image1.png')} style={styles.image} />
                </View>
                <Text style={styles.textTitle}>Nhập mã xác thực</Text>
                <View style={styles.otpContainer}>

                    {[...Array(4)].map((_, index) => (
                        <TextInput
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            style={styles.otpBox}
                            keyboardType="numeric"
                            maxLength={1}
                            value={otp[index] || ""}
                            onChangeText={(text) => handleChange(index, text)}
                            onKeyPress={(e) => handleKeyDown(index, e)}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.sendButton} onPress={handleConfirm}>
                    <Text style={styles.textSend}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Verification;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: 'center',
    },
    image: {
        marginBottom: '5%',
    },
    textTitle: {
        fontSize: 16,
        fontFamily: "Poppins_600SemiBold",
        color: "black",
        marginBottom: 30,
        textAlign: "center",
        paddingRight: 170
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    otpBox: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 10,
        fontSize: 18,
        textAlign: "center",
        marginHorizontal: 5,
    },
    inputContainer: {
        width: "100%",
        height: 50,
        paddingLeft: 16,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 10,
        marginBottom: 33,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },

    sendButton: {
        backgroundColor: "#3FA79B",
        width: "90%",
        padding: 15,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 20,

    },
    textSend: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Poppins_600SemiBold",
    },
});
