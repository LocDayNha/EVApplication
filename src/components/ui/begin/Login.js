import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, COLOR, Alert } from 'react-native'
import React, { Component, useState } from 'react'


const Login = ({ uri, onChangeText, placeholder, onPress, navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

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
            onChangeText={onChangeText}
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
            onChangeText={onChangeText}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={require('../../../assets/icon/eye.png')} style={styles.img} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotText} onPress={onPress}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={onPress}>
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        Bạn chưa có tài khoản? <Text style={styles.registerLink} onPress={onPress}>Đăng ký</Text>
      </Text>
    </View>
  )

}

export default Login

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    marginLeft: "5%",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    marginTop: 87,
    marginBottom: 44,
    fontWeight: "bold",
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
    fontWeight: "semibold",
  },
  forgotText: {
    color: "black",
    fontWeight: 'bold',
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