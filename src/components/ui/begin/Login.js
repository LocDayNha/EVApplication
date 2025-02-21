import { StyleSheet, Text, View, Image, ToastAndroid, TextInput, TouchableOpacity, COLOR, Alert, Platform } from 'react-native'
import React, { Component, useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import AxiosInstance from '../../axios/AxiosInstance';
import { AppContext } from '../../axios/AppContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  let [fontLoaded] = useFonts({

    Roboto_500Medium,
    Poppins_600SemiBold
  })
  if (!fontLoaded) {
    return <AppLoading />
  }

  const navigateToMain = () => {
    navigation.navigate('Screen');
  }

  // login
  const { setIsLogin, setInfoUser, setIdUser, infoUser, idUser } = useContext(AppContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  // const [rePassword, setRePassword] = useState(null);
  const onLogin = async () => {
    try {
      const response = await AxiosInstance().post('/user/login',
        { email: email, password: password }
      );

      if (response && response.returnData.data && response.returnData.data.user.isVerified) {
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
        ToastAndroid.show('Cần xác nhận tài khoản', ToastAndroid.SHORT);
        navigation.navigate('Verification', { email: email, name: 'Login' })
      } else {
        ToastAndroid.show('Thông tin đăng nhập sai', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show(
        error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logoText}>LOGO</Text>
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
        <TouchableOpacity>
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
    marginTop: 87,
    marginBottom: 44,
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
    marginTop: 100,
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
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold"
  },
  forgotText: {
    color: "black",
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 20,
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