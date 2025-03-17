import { StyleSheet, Text, View, Image, ToastAndroid, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import AxiosInstance from '../../axios/AxiosInstance';
import Toast from 'react-native-toast-message';

const NewPassword = () => {
    const route = useRoute();
    const { email } = route.params;
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);

    const showToast = (type, content) => {
        Toast.show({
            type: type, // 'success', 'error', 'warning', 'info'
            text2: content,
            position: 'center',
            autoHide: false,
        });
    };

    const [password, setPassword] = useState(null);
    const [password2, setPassword2] = useState(null);
    const SetNewPassword = async () => {
        try {
            const response = await AxiosInstance().post('/user/forgotpass',
                {
                    email: email, password: password, password2: password2
                }
            );
            if (response) {
                showToast('success', 'Cập nhật mật khẩu thành công');
                navigation.navigate('CompleteCreate');
            } else {
                showToast('error', 'Cập nhật mật khẩu thất bại');
            }
        } catch (error) {
            showToast('error', error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại');
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : null}
        >
            <View style={styles.container}>
                <View style={{ width: '100%', height: 250, justifyContent: 'center', alignItems: 'center' }} onTouchStart={() => Keyboard.dismiss()}>
                    <Image source={require('../../../assets/images/image1.png')} style={styles.image} />
                </View>
                <View>
                    <Text style={styles.textEmail}>Tạo mật khẩu mới</Text>
                    <View style={styles.inputContainer}>
                        <Image source={require('../../../assets/icon/key.png')} style={styles.img} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor={"#D9D9D9"}
                            secureTextEntry={!showPassword}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Image source={require('../../../assets/icon/eye.png')} style={styles.img} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <Image source={require('../../../assets/icon/key.png')} style={styles.img} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor={"#D9D9D9"}
                            secureTextEntry={!showPassword}
                            onChangeText={setPassword2}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Image source={require('../../../assets/icon/eye.png')} style={styles.img} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.sendButton} onPress={SetNewPassword}>
                    <Text style={styles.textSend}>Hoàn thành</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default NewPassword

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        width: '100%',
        height: '100%',
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: 'center',
    },
    image: {
        marginBottom: 5,
        width: 250,
        height: 250
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
        marginBottom: 12,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
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
        marginTop: 10
    },
    textSend: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Poppins_600SemiBold",
    },
    textEmail: {
        color: "black",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        marginBottom: 25,
        paddingLeft: 1
    },
})