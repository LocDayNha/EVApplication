import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ToastAndroid } from 'react-native'
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
      position: 'center',
      autoHide: 5000,
    });
  };


  const [energy, setEnergy] = useState(50);
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
        <View style={styles.viewEnergy}>
          <Text style={styles.textEnergy}>Công suất phương tiện</Text>
          <Text style={[styles.textEnergy, { color: '#009558', fontWeight: 500, fontSize: 20 }]}>{energy} km</Text>
        </View>

        <View style={styles.viewLine}>

          <View style={{ width: '100%', alignItems: 'center' }}>
            <MultiSlider
              style={{ width: '100%' }}
              min={50}
              max={500}
              step={1}
              value={energy}
              onValuesChange={setEnergy}
              minimumTrackTintColor="green3"
              maximumTrackTintColor="#979592"
              thumbTintColor="green3"
              markerStyle={{ height: 20, width: 20, }}
              trackStyle={{ height: 4, }}
            />
          </View>

          <View style={styles.viewTextLine}>
            <Text style={styles.textLine}>50</Text>
            <Text style={styles.textLine}>500</Text>
          </View>
        </View>

        <View style={{ width: '100%', marginBottom: '3%' }}>
          <Text style={[styles.textLine, { marginLeft: '0%', fontWeight: 500, fontSize: 18 }]}>Chọn lịch trình</Text>
        </View>

        <View style={styles.viewLocation}>
          <View style={styles.viewInputLocation}>
            <View style={styles.viewA}>
              <View style={styles.viewStart}>
                <Text style={styles.textStart}>A</Text>
              </View>
              <View style={styles.viewTextInputStart}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.textInputStart}>
                  {addressStart}
                </Text>
                <TouchableOpacity onPress={() => setModalMapStart(true)} style={styles.viewImgLoaction}>
                  <Image source={require('../../../assets/icon/target.png')} style={styles.imgLocation} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.viewTo}>
          </View>

          <View style={styles.viewInputLocation}>
            <View style={styles.viewA}>
              <View style={styles.viewStart}>
                <Text style={styles.textStart}>B</Text>
              </View>
              <View style={styles.viewTextInputStart}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.textInputStart}>
                  {addressEnd}
                </Text>
                <TouchableOpacity onPress={() => setModalMapEnd(true)} style={styles.viewImgLoaction}>
                  <Image source={require('../../../assets/icon/target.png')} style={styles.imgLocation} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.viewButton}>
          <LinearGradient colors={['#009558', '#5bdb5b',]} style={{ borderRadius: 20, width: '60%', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={getDataStation} style={styles.buttonSearch}>
              <Text style={styles.textSearch}>Tìm kiếm tuyến đường</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.viewListStation}>

          <View>
            {!dataStation ?
              <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center', height: 250 }}>
                <Text style={{ fontSize: 15, fontWeight: 500 }}>Chọn lịch trình của bạn</Text>
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
                  <Text style={{ fontSize: 15, fontWeight: 500 }}>Không có thông tin trạm sạc theo yêu cầu</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '3%'
  },
  textEnergy: {
    fontSize: 18,
    fontWeight: 500,
    color: 'black'
  },
  viewLine: {
    width: '90%',
    marginLeft: '5%',
    marginTop: '5%',
    marginRight: '5%',
    marginBottom: '2%',
  },
  viewTextLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textLine: {
    fontSize: 18,
    fontWeight: 500,
    color: 'black',
  },
  viewLocation: {
    width: '100%',
  },
  viewInputLocation: {
    width: '100%',
    flexDirection: 'row',
  },
  viewA: {
    width: '100%',
    flexDirection: 'row'
  },
  viewStart: {
    width: '15%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#009558'
  },
  textStart: {
    fontSize: 20,
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
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#009558',
    borderWidth: 1,
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
    width: 30,
    height: 30,
    tintColor: '#333'
  },
  viewTo: {
    width: 7,
    height: 20,
    marginLeft: '6.5%',
    backgroundColor: '#009558',
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
    borderRadius: 20,
  },
  textSearch: {
    fontSize: 15,
    fontWeight: 500,
    color: 'white'
  },
  viewListStation: {
    width: '100%',
  }
})