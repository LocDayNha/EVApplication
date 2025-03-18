import { StyleSheet, Text, View, Image, TextInput, ToastAndroid, TouchableOpacity, COLOR, Alert, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
import React, { Component, useState, alert } from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AxiosInstance from '../../axios/AxiosInstance';
import Toast from 'react-native-toast-message';


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const showToast = (type, content) => {
    Toast.show({
      type: type, // 'success', 'error', 'warning', 'info'
      text2: content,
      position: 'center',
      autoHide: false,
    });
  };

  // register
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);

  const Register = async () => {
    try {
      const response = await AxiosInstance().post('/user/register',
        {
          email: email, password: password, password2: password2
        }
      );
      if (response && response.status) {
        navigation.navigate('Verification', { email: email, name: 'Register' });
      } else {
        showToast('error', 'Đăng ký thất bại');
      }
    } catch (error) {
      showToast('error', error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? "padding" : null}
    >
      <View style={styles.container}>
        <View style={{ width: '100%', height: '30%', justifyContent: 'center', alignItems: 'center' }} onTouchStart={() => Keyboard.dismiss()}>
          <Image source={require('../../../assets/images/Splash (2).png')} style={{ width: 200, height: 200, }} />
        </View>
        <Text style={styles.title}>Đăng ký tài khoản</Text>
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
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Image source={require('../../../assets/icon/key.png')} style={styles.img} />
            <TextInput
              style={styles.input}
              placeholder="Re-Password"
              placeholderTextColor={"#D9D9D9"}
              onChangeText={setPassword2}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image source={require('../../../assets/icon/eye.png')} style={styles.img} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={Register}>
          <Text style={styles.loginText}>Đăng ký</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Bạn đã có tài khoản? <Text style={styles.registerLink} onPress={() => navigation.navigate('Login')}>Đăng nhập</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  )

}

export default Register

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: '100%', height: '100%'
  },
  img: {
    marginLeft: "5%",

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
    paddingLeft: 15,
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
    paddingLeft: 1,
  },
  img: {
    marginLeft: 1,
    resizeMode: "contain",
    marginRight: 16,
    tintColor: "#D9D9D9",
  },
  logoText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: "#3FA79B",
    width: "100%",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    marginTop: 35
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold"
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