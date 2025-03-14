import { StyleSheet, Text, View, Image, ToastAndroid, TextInput, TouchableOpacity, COLOR, Alert, Platform, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native'
import React, { Component, useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import AxiosInstance from '../../axios/AxiosInstance';
import { AppContext } from '../../axios/AppContext';
import Toast from 'react-native-toast-message';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const navigateToMain = () => {
    navigation.navigate('Screen');
  }

  const showToast = (message, type = 'info') => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Toast.show({
        type,
        text1: message,
      });
    }
  };
  const showAlert = (title, content) => {
    Alert.alert(title, content, [
        { text: "OK" },
    ]);
};

  // login
  const { setIsLogin, setInfoUser, setIdUser, infoUser, idUser } = useContext(AppContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const onLogin = async () => {
    try {
      const response = await AxiosInstance().post('/user/login',
        { email: email, password: password }
      );

      if (response && response.returnData.data && response.returnData.data.user.isVerified) {

        Keyboard.dismiss();

        const { token, user } = response.returnData.data;

        if (!token || !user) {
          throw new Error("Dữ liệu phản hồi không hợp lệ");
        }

        await AsyncStorage.setItem('token', token);
        setIsLogin(true);
        setInfoUser(user);
        setIdUser(user._id);
        navigateToMain();

      } else if (response && response.returnData.data && response.returnData.data.user.isVerified === false) {
        showToast('Cần xác nhận tài khoản', 'info');
        navigation.navigate('Verification', { email: email, name: 'Login' })
      } else {
        showAlert('Thông báo','Sai tài khoản')
        setMessageError()
      }
    } catch (error) {
      showAlert('Thông báo',error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại', 'error');
      setMessageError(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại', 'error');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? "padding" : null}
    >
      <View style={styles.container} >
        <View style={{ width: '100%', height: '30%', justifyContent: 'center', alignItems: 'center' }} onTouchStart={() => Keyboard.dismiss()}>
        <Image source={require('../../../assets/images/Splash (2).png')} style={{width:200, height:200, }} />
        </View>
        <Text style={styles.title}>Đăng nhập tài khoản</Text>
        <View>
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
        <View>
          <View style={styles.inputContainer}>
            <Image source={require('../../../assets/icon/key.png')} style={styles.img} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={"#D9D9D9"}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image source={require('../../../assets/icon/eye.png')} style={styles.img} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ width: '100%' }}>
            <Text style={styles.forgotText} onPress={() => navigation.navigate('ForgotPass')}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginText}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Bạn chưa có tài khoản? <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>Đăng ký</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  )

}

export default Login

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: '100%',
  },
  img: {
    marginLeft: "5%",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    marginTop: '5%',
    marginBottom: '5%',
    fontFamily: "Roboto_500Medium"
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
    alignItems: 'center'
  },
  input: {
    flex: 1,
    width: "100%",
    height: "100%",
    fontSize: 16,
    textAlignVertical: "center",
    paddingLeft: 1,
  },
  img: {
    marginLeft: 1,
    marginRight: 16,
    resizeMode: "contain",
    tintColor: "#D9D9D9",
  },
  logoText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: "#3FA79B",
    width: "100%",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    marginTop: 25
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold"
  },
  forgotText: {
    color: "black",
    fontFamily: 'Poppins_600SemiBold',
  },
  registerText: {
    marginTop: 25,
    color: "gray",
  },
  registerLink: {
    color: "#3FA79B",
    fontWeight: "bold",
  },

})