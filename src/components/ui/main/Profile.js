import { StyleSheet, Text, View,ScrollView,Image } from 'react-native'
import React from 'react'



const Profile = () => {
  return (
    <ScrollView >
      <View style={styles.user}>
        <View style={styles.viewUser}>
          <Image style={styles.imguser} source={require('../../../assets/images/anhso1.jpg')} />
          <Text style={styles.textNameuser} >Nguyen van a</Text>
        </View>
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
    width: '200',
    height: '200',
    borderRadius: 100,
  },
  imgIcon: {
    width: '50',
    height: '50',
    borderRadius: 100,
    marginRight: '5%'
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