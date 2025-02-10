import { StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import React from 'react'

const Login = () => {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Đăng nhập tài khoản</Text>

    //   <View style={styles.inputContainer}>
    //   {/* <MaterialIcons name="key" size={24} color="gray"/> */}
    //   <Icon
    //           name={"arrow-down-drop-circle-outline"}
    //           color="black"
    //           size={24}
    //         />
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Email"
    //       value={email}
    //       onChangeText={setEmail}
    //     />
    //   </View>

    //   <View style={styles.inputContainer}>
    //     {/* <MaterialIcons name="" size={24} color="gray"/> */}
    //     <Icon
    //           name={"arrow-down-drop-circle-outline"}
    //           color="black"
    //           size={24}
    //         />
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Password"
    //       value={email}
    //       onChangeText={setPassword}
    //     />
    //   </View>
    // </View>
    <View style={styles.container}>
      <View>
        <Text style={styles.logoText}>LOGO</Text>
      </View>

      <Text style={styles.title}>Đăng nhập tài khoản</Text>

      <View style={{width: '100%', height: 48}}>
        <TextInput 
          
          style={styles.inputEmail}
          placeholder='Email' 
        />
      </View>

      <View style={{width: '100%', paddingTop: 14}}>
        <TextInput
          style={[styles.inputEmail]}
          placeholder='Password'  
         
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPass}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Bạn chưa có tài khoản? <Text style={styles.registerLink}>Đăng ký</Text>
      </Text>
      
      {/* <Icon
        name={"arrow-down-drop-circle-outline"}
        color="sblack"
        size={24}
      /> */}
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    marginTop: 87,
  },
  logoText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  inputEmail: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 44
  },
  forgotPass: {
    alignSelf: "flex-start",
    marginBottom: 25,
    marginTop: "5%",
    marginRight: 249,
    fontWeight: 'bold'
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
    fontWeight: "bold",
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