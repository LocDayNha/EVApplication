import { StyleSheet, Text, View,ScrollView,Image } from 'react-native'
import React, { useState } from 'react'
import { TextInputProfile,CustomButton } from '../../item/Item'

const Profile = () => {
  return (
    <ScrollView >
      <View style={styles.user}>
        <View style={styles.viewUser}>
          <Image style={styles.imguser} source={require('../../../assets/images/anhso1.jpg')} />
          <Text style={styles.textNameuser} >Nguyen van a</Text>
        </View>
      </View>
      <View  style={{alignItems:'center',justifyContent:'center',height:400}} >
          <TextInputProfile label={'Tên của bạn'} placeholder={'Nguyen van a'} />
          <TextInputProfile label={'Tài khoản Email'} placeholder={'nguyenvaa211@gmail.com'} />
          <TextInputProfile label={'Số điện thoại'} placeholder={'00123456789'} />

         <CustomButton label={'Xác nhận lưu'}/>
      </View>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
  },
  user: {
    backgroundColor: '#40A19C',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewUser: {
    margin: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imguser: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  textNameuser: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  textNameSetting: {
    fontSize: 20,
  },
  boxSetting: {
    borderWidth: 1,
    borderColor: '#C7C6C5',
    margin: '10%',

    borderRadius: 10,
  },
  boxContent: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '5%',
    marginRight: '10%',
    marginLeft: '10%',
  },
})