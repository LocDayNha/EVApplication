import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { TextInputProfile, CustomButton } from '../../item/Item';
import { AppContext } from '../../axios/AppContext';

const Profile = () => {

  const { infoUser, idUser } = useContext(AppContext);
  const { name, email, phoneNumber, image } = infoUser;

  const [nameUser, setNameUser] = useState(null);
  const [emailUser, setEmailUser] = useState(null);
  const [phoneNumberUser, setPhoneNumberUser] = useState(null);
  const [imageUser, setImageUser] = useState(null);

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.user}>
        <View style={styles.viewUser}>
          <Image style={styles.imguser} source={{ uri: image }} />
          <Text style={styles.textNameuser} >{name}</Text>
        </View>
      </View>
      <View style={styles.boxHome}>
        <View style={{ alignItems: 'center', justifyContent: 'center', height: 400 }} >
          <TextInputProfile label={'Tên của bạn'} onChangeText={setNameUser} value={name} />
          <TextInputProfile label={'Tài khoản Email'} onChangeText={setEmailUser} value={email} editable={false}/>
          <TextInputProfile label={'Số điện thoại'} onChangeText={setPhoneNumberUser} value={phoneNumber} />
          <CustomButton label={'Xác nhận lưu'} />
        </View>
      </View>

    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  boxHome: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: '-5%',
    backgroundColor: 'white'
  },
  container: {
    backgroundColor: '#EFEFEF',
  },
  user: {
    backgroundColor: 'white',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',

  },
  viewUser: {
    margin: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imguser: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  textNameuser: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '5%'
    // color:'white',
  },
  textNameSetting: {
    fontSize: 20,
  },
  boxSetting: {
    borderWidth: 1,
    borderColor: '#C7C6C5',
    margin: '10%',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxContent: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '5%',
    marginRight: '10%',
    marginLeft: '10%',

  },
})