import { StyleSheet, Text, View, ScrollView, Image, ToastAndroid, TouchableOpacity, Platform } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { TextInputProfile, CustomButton } from '../../item/Item';
import { AppContext } from '../../axios/AppContext';
import AxiosInstance from '../../axios/AxiosInstance';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { firebase } from '../../../../config';
import Toast from 'react-native-toast-message';
import { ItemLoading } from '../../item/ItemList';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();

  const { infoUser, idUser, setInfoUser } = useContext(AppContext);
  const { name, email, phoneNumber } = infoUser;
  const image = infoUser?.image || 'https://vivureviews.com/wp-content/uploads/2022/08/avatar-vo-danh-6.png';

  const [nameUser, setNameUser] = useState(null);
  const [emailUser, setEmailUser] = useState(null);
  const [phoneNumberUser, setPhoneNumberUser] = useState(null);
  const [imageUser, setImageUser] = useState(null);
  const [choseImage, setChoseImage] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const [checkLoading, setCheckLoading] = useState(false);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled && result.assets.length > 0) {
      setChoseImage(result.assets[0].uri);
      setImageUser(result.assets[0].uri);
    }
  }

  const uploadImageToFirebase = async () => {
    try {
      const { uri } = await FileSystem.getInfoAsync(choseImage);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = () => {
          reject(new TypeError('Request failed !'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const fileName = choseImage.substring(choseImage.lastIndexOf('/') + 1);
      const ref = firebase.storage().ref().child(fileName);

      await ref.put(blob);
      blob.close && blob.close();

      const url = await ref.getDownloadURL();
      setUrlImage(url);
      setChoseImage(null);
      setImageUser(url);
      return url;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const updateInforUser = async () => {
    try {
      setCheckLoading(true);
      let newImageUrl = imageUser;

      if (choseImage) {
        const uploadedImageUrl = await uploadImageToFirebase();
        if (uploadedImageUrl) {
          newImageUrl = uploadedImageUrl;

          if (infoUser.image) {
            try {
              const storageRef = firebase.storage().refFromURL(infoUser.image);
              await storageRef.delete();
              console.log("Xóa ảnh cũ thành công!");
            } catch (error) {
              console.log("Lỗi khi xóa ảnh cũ:", error);
            }
          } else {
            console.log("không có ảnh cũ");
          }
        } else {
          console.log("Lỗi khi upload ảnh mới!");
          return;
        }
      }

      const data = await AxiosInstance().post('/user/updateInforUser', {
        id: idUser, name: nameUser, phoneNumber: phoneNumberUser, image: newImageUrl
      });
      if (data) {
        console.log('Cập nhật thành công:');
        setInfoUser(data.user);
        setCheckLoading(false);
        showToast('Cập nhật thành công', 'success');
        navigation.goBack();
      } else {
        console.log('Cập nhật thất bại');
        setCheckLoading(false);
        showToast('Cập nhật thất bại', 'error');
      }

    } catch (error) {
      console.log('Lỗi hệ thống:', error);
      showToast('Lỗi hệ thống', 'error')
    }
  }

  useEffect(() => {
    setNameUser(name);
    setEmailUser(email);
    setPhoneNumberUser(phoneNumber);
    setImageUser(image);
  }, [])


  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.user}>
        <View style={styles.viewUser}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={styles.imguser}
              source={{ uri: imageUser }}
            />
          </TouchableOpacity>
          <Text style={styles.textNameuser} >{nameUser}</Text>
        </View>
      </View>
      <View style={styles.boxHome}>
        <View style={{ alignItems: 'center', justifyContent: 'center', height: 400 }} >
          <TextInputProfile label={'Tên của bạn'} onChangeText={setNameUser} defaultValue={nameUser} />
          <TextInputProfile label={'Tài khoản Email'} onChangeText={setEmailUser} defaultValue={emailUser} editable={false} />
          <TextInputProfile label={'Số điện thoại'} onChangeText={setPhoneNumberUser} defaultValue={phoneNumberUser} />
          <CustomButton onPress={updateInforUser} label={'Xác nhận lưu'} />
        </View>
      </View>
      <ItemLoading checkValue={checkLoading} />
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
    fontSize: 20,
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