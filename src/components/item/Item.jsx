import { StyleSheet, View, Text, TouchableOpacity, Linking, ToastAndroid, TextInput, Image, Modal, ScrollView } from "react-native";
import { COLOR } from "../../assets/Theme/Theme";
import { useNavigate } from "react-router-native";
import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import { AppContext } from '../axios/AppContext';
import AxiosInstance from "../axios/AxiosInstance";

export function TextInputBegin({ uri, onChangeText, placeholder }) {
  return (
    <View style={styles.inputContainer}>
      <Image source={uri} style={styles.img} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </View>
  );
}

export function TextInputMain({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

export function TextInputProfile({ label, value, onChangeText, placeholder, editable }) {
  return (
    <View style={styles.viewInputProfile}>
      <Text style={styles.textProfile}>{label}</Text>
      <TextInput
        style={styles.inputProfile}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />
    </View>
  );
}

export function CustomButton({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

export function ItemRating({ data }) {
  return (
    <View style={styles.viewRatingContainer} key={data._id}>
      <View style={styles.viewRatingUser}>
        <View style={{ marginRight: "5%" }}>
          <Image source={{ uri: data.user_id.image }} style={styles.imgUser}></Image>
        </View>
        <View>
          <Text style={styles.textNameUser}>{data.user_id.name}</Text>
          <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', width: '80%' }}>
            <Text >{'⭐'.repeat(data.star)}</Text>
            <Text style={styles.textTimeRating}>{data.createAt}</Text>
          </View>
        </View>
      </View>

      <View style={styles.viewRatingContent}>
        <Text style={styles.textRatingContent}>{data.content}</Text>
      </View>
    </View>
  );
}

export function ItemStation({ data }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity style={styles.listRow} onPress={() => navigation.navigate("ViewDetail")}>
        <Image style={styles.imgStation} source={{ uri: data.image }} />

        <View style={styles.viewInfoStation}>
          <Text style={styles.textItemName} numberOfLines={1} ellipsizeMode='tail'>{data.brand} - {data.name}</Text>
          <Text style={styles.textItemLocation} numberOfLines={1} ellipsizeMode='tail'>{data.location}</Text>
        </View>
        <View style={styles.viewInfoStation}>
          <Text style={styles.textItemLocation} numberOfLines={1} ellipsizeMode='tail'>{data.time}</Text>
        </View>
        <View style={styles.viewInfoStation2}>
          <Text style={styles.textItemLocation} numberOfLines={1} ellipsizeMode='tail' >{data.type.join("/")}</Text>
          <TouchableOpacity onPress={() => { setModalVisible(true) }}>
            <View style={styles.viewButtonItem} >
              <Text style={{ color: 'white' }}>
                Cập nhật
              </Text>
              <Image style={styles.imgNext} source={require('../../assets/icon/icons8-edit-64.png')} />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lựa chọn</Text>

            <TouchableOpacity style={styles.modalTitleSup}>
              <Text >Cập nhật trạm sạc </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalTitleSup}>
              <Text >Cập nhật trạng thái </Text>
            </TouchableOpacity>
            {/* nút */}
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => {
                setModalVisible(false)
              }}
                style={styles.cancelButton}>
                <Text style={{ color: '#40A19C' }}>Quay lại </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>

  );
}
export function ItemStationMain(props) {
  const { data } = props;
  const navigation = useNavigation();
  const { myLat, myLng } = useContext(AppContext);

  const clickViewDetail = () => {
    navigation.navigate('ViewDetail', { id: data._id });
  };

  const openGoogleMaps = async () => {
    try {
      const linkTrack = await AxiosInstance().post('/station/testGoogleMapTrack', {
        lat1: myLat, lng1: myLng, lat2: data.lat, lng2: data.lng
      });
      if (linkTrack.url) {
        Linking.openURL(linkTrack.url).catch(err => Alert.alert("Error", "Failed to open Google Maps"));
      } else {
        console.log('Không tìm thấy dữ liệu từ /station/testGoogleMapTrack');
        ToastAndroid.show('Không thể chỉ đường', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu station:', error);
      ToastAndroid.show('Không thể thực hiện chỉ đường do hẹ thống', ToastAndroid.SHORT);
    }
  };

  return (
    <TouchableOpacity style={styles.listRow} key={data._id} onPress={clickViewDetail}>
      <Image style={styles.imgStation} source={{ uri: data.image }} />
      <View style={styles.viewInfoStation}>
        <Text style={styles.textItemName} numberOfLines={1} ellipsizeMode='tail'>{data.brand_id.name} - {data.name}</Text>
        <Text style={styles.textItemLocation} numberOfLines={1} ellipsizeMode='tail'>{data.location}</Text>
      </View>
      <View style={styles.viewInfoStation}>
        <Text style={styles.textItemLocation} numberOfLines={1} ellipsizeMode='tail'>{data.time}</Text>
      </View>
      <View style={styles.viewInfoStation2}>

        {(() => {
          const portTypes = data?.specification
            ?.map((item) => item?.specification_id?.port_id?.type)
            .filter((type) => type === "AC" || type === "DC"); // Lọc chỉ lấy AC hoặc DC

          const uniquePortTypes = [...new Set(portTypes)]; // Loại bỏ giá trị trùng lặp

          const displayText = uniquePortTypes.length === 2 ? "AC/DC" : uniquePortTypes[0] || "N/A";

          return (
            <Text style={styles.textItemLocation} numberOfLines={1} ellipsizeMode="tail">
              {displayText}
            </Text>
          );
        })()}

        <TouchableOpacity onPress={openGoogleMaps}>
          <View style={styles.viewButtonItem} >
            <Text style={{ color: 'white' }}>
              3.5Km
            </Text>
            <Image style={styles.imgNext} source={require('../../assets/icon/icons8-arrow-64.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    height: 50,
    backgroundColor: COLOR.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 20,
    color: COLOR.secondary,
    fontWeight: 700,
    fontFamily: 'Poppins'
  },
  inputContainer: {
    width: "85%",
    height: 50,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: COLOR.gray2,
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: "100%",
    height: "100%",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  img: {
    marginLeft: "5%"
  },
  viewInputProfile: {
    width: "85%",
    height: "25%",
    paddingLeft: 10,
    borderColor: COLOR.gray2,
    borderRadius: 10,
  },
  textProfile: {
    fontSize: 20,
    color: COLOR.black,
    fontWeight: 700,
    fontFamily: 'Poppins'
  },
  inputProfile: {
    width: "100%",
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLOR.gray,
    borderRadius: 15
  },
  imgUser: {
    width: 53,
    height: 53,
    borderRadius: 30
  },
  viewRatingContainer: {
    width: "85%",
    marginBottom: "2%",
    marginTop: "2%",
    justifyContent: "center",
    padding: '2%',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  viewRatingUser: {
    margin: "2%",
    flexDirection: 'row'
  },
  viewRatingContent: {
    margin: "2%",
    marginBottom: "4%",
    width: "95%"
  },
  textNameUser: {
    fontSize: 16,
    color: COLOR.black,
    fontWeight: 700,
    fontFamily: 'Poppins',
    marginBottom: "2%"
  },
  textTimeRating: {
    fontSize: 14,
    color: COLOR.gray3,
    fontFamily: 'Poppins',
    marginLeft: "2%",
    marginTop: '2%',
  },
  textRatingContent: {
    fontSize: 20,
    color: COLOR.black,
    fontFamily: 'Poppins',
  },

  // item list 

  listRow: {
    margin: '5%',
    marginTop: '0%',
    marginBottom: '4%',
    borderRadius: 25,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgStation: {
    width: 'auto',
    height: 180,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textItemName: {
    marginTop: '1%',
    color: 'rgb(0, 0, 0)',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textItemLocation: {
    color: '#544C4C',
    fontSize: 18,
    marginBottom: '0.1%',
    marginTop: '0.1%',
  },
  viewButtonItem: {
    width: 100,
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#40A19C',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 30,
    color: 'white',
  },
  imgNext: {
    width: 30,
    height: 30,
  },
  viewInfoStation: {
    margin: '5%',
    marginBottom: 0,
    marginTop: 0,
  },
  viewInfoStation2: {
    margin: '5%',
    marginBottom: '3%',
    marginTop: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  modalTitleSup: {
    fontSize: 16,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
    borderBottomWidth: 0.5,
    width: '50%'
  },
  cancelButton: {
    backgroundColor: 'White',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#40A19C'
  },
  applyButton: {
    backgroundColor: '#40A19C',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
  },
});
