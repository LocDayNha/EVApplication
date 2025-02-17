import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, COLOR, Alert } from 'react-native'
import React, { Component, useState, alert } from 'react'
import Icon from "react-native-vector-icons/FontAwesome";


const Register = ({ uri, onChangeText, placeholder, onPress }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logoText}>LOGO</Text>
      </View>
      <Text style={styles.title}>Đăng ký tài khoản</Text>
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
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={onPress}>
        <Text style={styles.loginText} onPress={onPress}>Đăng ký</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        Bạn đã có tài khoản? <Text style={styles.registerLink} onPress={onPress}>Đăng nhập</Text>
      </Text>
    </View>
  )

}

export default Register

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    marginLeft: "5%",

  },
  title: {
    fontSize: 18,
    marginTop: 87,
    marginBottom: 44,
    fontWeight: "bold",
    fontFamily: "Roboto-Regular"
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
    marginTop: 35
  },
  loginText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "semibold",
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