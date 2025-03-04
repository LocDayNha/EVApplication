import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import Slider from '@react-native-community/slider';
import RNPickerSelect from 'react-native-picker-select';
import { CustomButton, ItemStationTrip } from '../../item/Item';
import { COLOR, SIZE } from "../../../assets/Theme/Theme";
import * as Location from 'expo-location';
import MapView, { Marker, Callout } from 'react-native-maps';
import { ItemCheckBox, ItemCheckBoxImage, ItemRadioButton, ItemRadioButtonType, ItemRadioButtonVertical, ItemStationMain } from '../../item/Item';
import AxiosInstance from '../../axios/AxiosInstance';

const initialLocation = { latitude: 14.0583, longitude: 108.2772 };

const Trip = () => {
  const [modalMap, setModalMap] = useState(false);

  const [value, setValue] = useState(5);
  const [valueTest, setValueTest] = useState();
  const [valueKm, setValueKm] = useState();

  const maxValue = valueKm.length > 0 ? Math.max(...valueKm) : 0;
  console.log("Giá trị cao nhất:", maxValue);
  

  const [address, setAddress] = useState('');
  const [myLat, setMyLat] = useState('');
  const [myLng, setMyLng] = useState('');


  const getYourLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permission to location was not granted');
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude, longitude
      });
      setMyLat(latitude);
      setMyLng(longitude);
      setAddress(response[0].formattedAddress);
    }
  }

  const [dataStation, setDataStation] = useState(null);
  const getDataStation = async () => {
    try {
      const dataStation = await AxiosInstance().get('/station/get');
      if (dataStation.data && dataStation.data.length > 0) {
        setDataStation(dataStation.data);
      } else {
        console.log('Không tìm thấy dữ liệu từ /station/get');
        ToastAndroid.show('Không có thông tin trạm sạc', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu station:', error);
      ToastAndroid.show('Không thể tải danh sách thông tin trạm sạc', ToastAndroid.SHORT);
    }
  };
  const [selectedLocation, setSelectedLocation] = useState()
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log("Vị trí đã chọn:", latitude, longitude);
    setSelectedLocation({ latitude, longitude });
  };

  useEffect(() => {
    getYourLocation();
    getDataStation();
  }, [])
  const mapRef = useRef(null);

  return (

    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: '5%' }}>
        <Text style={{ fontSize: SIZE.size14, }}>Phạm vi hoạt động của phương tiện </Text>
        <View style={{
          backgroundColor: COLOR.green3,
          padding: 10,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: SIZE.size16, color: 'white' }}>{value}</Text>
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Slider
          style={{ width: '80%', height: 50 }}
          minimumValue={0}
          maximumValue={200}
          step={1}
          minimumTrackTintColor={COLOR.green3}
          maximumTrackTintColor="grey"
          thumbTintColor={COLOR.green3}
          onValueChange={setValue}
          value={value}
        />
      </View>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: '10%' }}>
        <Text style={{ fontSize: SIZE.size18, }}>0</Text>
        <Text style={{ fontSize: SIZE.size18, }}>200</Text>
      </View>
      <View style={styles.containerLocation}>
        <Image style={{ width: 40, height: 40 }} source={require('../../../assets/icon/icons8-a-67.png')} />
        <TouchableOpacity style={styles.buttonLocation}>
          <Text>
            Lấy vị vị trí của bạn
          </Text>
          <Image style={{ width: 25, height: 25 }} source={require('../../../assets/icon/icons8-my-location-96.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerLocation}>
        <Image style={{ width: 40, height: 40 }} source={require('../../../assets/icon/icons8-b-67.png')} />
        <TouchableOpacity style={styles.buttonLocation} onPress={() => setModalMap(true)}>
          <Text>
            Chọn vị trí trên bản đồ
          </Text>
          <Image style={{ width: 25, height: 25 }} source={require('../../../assets/icon/icons8-location-50.png')} />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', margin: '5%' }}>
        <CustomButton label={'Tìm kiếm theo lộ trình'} />
      </View>

      <View >
        <FlatList
          data={dataStation}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View>
              <ItemStationTrip data={item} Kilomet={value} valueKm={valueKm} setValueKm={setValueKm} maxValues={maxValue} />
            </View>
          )}
        />
      </View>



      <Modal transparent={true} visible={modalMap} animationType="slide">
        <View style={styles.modalOverlay}>

          <View style={{ width: '90%', height: '80%', borderRadius: 20 }}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: initialLocation.latitude,
                longitude: initialLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              ref={mapRef}
              onPress={handleMapPress}>
              {/* Hiển thị marker khi người dùng chọn trên bản đồ */}
              {selectedLocation && (
                <Marker
                  coordinate={selectedLocation}
                  title="Vị trí đặt trạm sạc"
                  description="Bạn đã chọn vị trí này"
                />
              )}
            </MapView>

            <View style={styles.buttonContainer}>
              {/* <TouchableOpacity
                style={{
                  padding: 10,
                  borderColor: COLOR.green3,
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: 'white'
                }}
                onPress={{}}>
                <Text style={{ fontSize: 20 }}>Lấy vị trí hiện tại</Text>
              </TouchableOpacity> */}
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={() => {
                setModalMap(false)
              }}
              style={styles.applyButton}>
              <Text style={styles.applyText}>Ok</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>
    </ScrollView>


  )
}

export default Trip

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    backgroundColor: ''
  },
  containerLocation: {
    flexDirection: 'row',
    alignItems: 'center',

    marginHorizontal: '10%',
    marginVertical: '4%'
  },
  buttonLocation: {
    width: '80%',
    flexDirection: 'row',
    backgroundColor: COLOR.gray2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: '5%',
    justifyContent: 'space-between',

  },
  title: {
    color: 'rgb(0, 0, 0)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 15,
    width: '100%',
  },
  applyButton: {
    backgroundColor: COLOR.green3,
    padding: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: '5%'
  },
  applyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },


});
