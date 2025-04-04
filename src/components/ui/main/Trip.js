import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ToastAndroid, TextInput } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import AxiosInstance from '../../axios/AxiosInstance';
import { useNavigation } from '@react-navigation/native';
import { ItemStationList, ItemStationMain, ItemStationTrip, ItemStationTrips } from '../../item/Item';
import Slider from '@react-native-community/slider';
import { ItemLoading, ItemShowAlert, MapLocationPicker } from '../../item/ItemList';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Toast from 'react-native-toast-message';

const Trip = () => {
  const navigation = useNavigation();
  const [checkLoading, setCheckLoading] = useState(false);

  const showToast = (type, content) => {
    Toast.show({
      type: type, // 'success', 'error', 'warning', 'info'
      text2: content,
      position: 'top',
      autoHide: 5000,
      
    });
  };


  const [energy, setEnergy] = useState(10);
  const [addressStart, setAddressStart] = useState('Chọn điểm đi');
  const [addressEnd, setAddressEnd] = useState('Chọn điểm đến');
  const [selectedLocationStart, setSelectedLocationStart] = useState(null);
  const [selectedLocationEnd, setSelectedLocationEnd] = useState(null);
  const [modalMapStart, setModalMapStart] = useState(false);
  const [modalMapEnd, setModalMapEnd] = useState(false);

  const [dataStation, setDataStation] = useState(null);

  const getDataStation = async () => {
    try {

      if (!selectedLocationStart) {
        showToast('error', 'Chưa có điểm đi');
        return;
      } else if (!selectedLocationEnd) {
        showToast('error', 'Chưa có điểm đến');
        return;
      }

      setCheckLoading(true);
      const dataStation = await AxiosInstance().post('/station/getByTravel',
        {
          outputEV: energy,
          myLat: selectedLocationStart.latitude,
          myLng: selectedLocationStart.longitude,
          toLat: selectedLocationEnd.latitude,
          toLng: selectedLocationEnd.longitude
        }
      );
      if (dataStation.data && dataStation.data.length > 0) {
        setDataStation(dataStation.data);
        setCheckLoading(false);
      } else {
        setDataStation([]);
        setCheckLoading(false);
        showToast('info', 'Không có trạm sạc theo yêu cầu');
      }
    } catch (error) {
      setCheckLoading(false);
      console.error('Lỗi khi lấy dữ liệu station:', error);
      showToast('error', 'Có lỗi xảy ra vui lòng thử lại sau');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.view}>
        <View style={[styles.viewEnergy, { marginTop: dataStation !== null && dataStation.length > 0 ? '3%' : '40%', }]}>
          <Text style={styles.textEnergy}>Công suất phương tiện: </Text>
          <View style={{ backgroundColor: '#33CC33', flexDirection: 'row', alignItems: 'center', marginLeft: '5%', paddingHorizontal: '2%', borderRadius: 15 }}>
            <TextInput keyboardType="numeric" style={[styles.textEnergy, { color: 'black', fontWeight: 500, fontSize: 16, color: 'white' }]} onChangeText={setEnergy}>{energy}</TextInput>
            <Text style={[styles.textEnergy, { color: 'black', fontWeight: 500, fontSize: 16, color: 'white' }]}>km</Text>
          </View>
        </View>

        <View style={styles.viewLine}>

          <View style={{ width: '100%', alignItems: 'center' }}>
            <MultiSlider
              style={{ width: '100%' }}
              min={10}
              max={500}
              step={1}
              value={energy}
              onValuesChange={setEnergy}
              selectedStyle={{ backgroundColor: '#33CC33' }}
              minimumTrackTintColor="#33CC33"  // Màu của thanh đã kéo
              maximumTrackTintColor="#EEEEEE"  // Màu của thanh chưa kéo
              thumbTintColor="#33CC33"  // Màu của núm kéo
              markerStyle={{ height: 20, width: 20, backgroundColor: '#33CC33' }}
              trackStyle={{ height: 4, backgroundColor: '#EEEEEE' }}
            />
          </View>

          <View style={styles.viewTextLine}>
            <Text style={styles.textLine}>10</Text>
            <Text style={styles.textLine}>500</Text>
          </View>
        </View>

        {/* <View style={{ width: '100%', marginBottom: '3%' }}>
          <Text style={[styles.textLine, { marginLeft: '0%', fontWeight: 500, fontSize: 16 }]}>Chọn lịch trình</Text>
        </View> */}

        <View style={styles.viewLocation}>
          <View style={styles.viewInputLocation}>
            <View style={styles.viewA}>
              <View style={styles.viewStart}>
                <Text style={styles.textStart}>A</Text>
              </View>
              <TouchableOpacity onPress={() => setModalMapStart(true)} style={styles.viewTextInputStart}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.textInputStart}>
                  {addressStart}
                </Text>
                <View style={styles.viewImgLoaction}>
                  <Image source={require('../../../assets/icon/target.png')} style={styles.imgLocation} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.viewTo}>
          </View>

          <View style={styles.viewInputLocation}>
            <View style={styles.viewA}>
              <View style={styles.viewStart}>
                <Text style={styles.textStart}>B</Text>
              </View>
              <TouchableOpacity onPress={() => setModalMapEnd(true)} style={styles.viewTextInputStart}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.textInputStart}>
                  {addressEnd}
                </Text>
                <View style={styles.viewImgLoaction}>
                  <Image source={require('../../../assets/icon/target.png')} style={styles.imgLocation} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.viewButton}>
          <LinearGradient colors={['#009558', '#5bdb5b',]} style={{ borderRadius: 50, width: '60%', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={getDataStation} style={styles.buttonSearch}>
              <Text style={styles.textSearch}>Tìm kiếm tuyến đường</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.viewListStation}>

          <View>
            {!dataStation ?
              <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center', height: 250 }}>
              </View>
              : dataStation.length > 0 ?
                <FlatList
                  data={dataStation}
                  scrollEnabled={false}
                  keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) =>
                    <View>
                      <ItemStationTrips data={item} />
                    </View>
                  }
                />
                :
                <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center', height: 250 }}>
                  {/* <Text style={{ fontSize: 15, fontWeight: 500 }}>Không có thông tin trạm sạc theo yêu cầu</Text> */}
                </View>
            }
          </View>

        </View>

      </View>
      <MapLocationPicker
        modalVisible={modalMapStart}
        setModalVisible={setModalMapStart}
        address={addressStart}
        setAddress={setAddressStart}
        selectedLocation={selectedLocationStart}
        setSelectedLocation={setSelectedLocationStart} />

      <MapLocationPicker
        modalVisible={modalMapEnd}
        setModalVisible={setModalMapEnd}
        address={addressEnd}
        setAddress={setAddressEnd}
        selectedLocation={selectedLocationEnd}
        setSelectedLocation={setSelectedLocationEnd} />
      <ItemLoading checkValue={checkLoading} />
    </ScrollView >
  )
}

export default Trip

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
  },
  view: {
    width: '94%',
    marginTop: '3%',
    marginLeft: '3%',
    marginRight: '3%'
  },
  viewEnergy: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textEnergy: {
    fontSize: 16,
    fontWeight: 500,
    color: 'black'
  },
  viewLine: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '2%',
  },
  viewTextLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '-3%'
  },
  textLine: {
    fontSize: 18,
    fontWeight: 500,
    color: 'black',
  },
  viewLocation: {
    width: '100%',
    marginTop: '2%'
  },
  viewInputLocation: {
    width: '100%',
    flexDirection: 'row',
  },
  viewA: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewStart: {
    width: '10%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#33CC33'
  },
  textStart: {
    fontSize: 16,
    fontWeight: 600,
    color: 'white'
  },
  viewTextInputStart: {
    width: '85%',
    paddingLeft: '3%',
    paddingRight: '3%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
    flexDirection: 'row'
  },
  textInputStart: {
    fontSize: 14,
    fontWeight: 500,
    color: 'black',
    width: '87%',
  },
  viewImgLoaction: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLocation: {
    width: 24,
    height: 24,
    tintColor: '#333'
  },
  viewTo: {
    width: 5,
    height: 35,
    marginTop: '-2%',
    marginBottom: '-2%',
    marginLeft: '4.3%',
    backgroundColor: '#33CC33',
  },
  viewButton: {
    width: '100%',
    marginTop: '5%',
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSearch: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  textSearch: {
    fontSize: 14,
    fontWeight: 500,
    color: 'white'
  },
  viewListStation: {
    width: '100%',
  }
})