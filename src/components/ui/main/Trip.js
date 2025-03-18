import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import AxiosInstance from '../../axios/AxiosInstance';
import { useNavigation } from '@react-navigation/native';
import { ItemStationList, ItemStationMain, ItemStationTrip, ItemStationTrips } from '../../item/Item';
import Slider from '@react-native-community/slider';
import { ItemLoading, ItemShowAlert, MapLocationPicker } from '../../item/ItemList';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const Trip = () => {
  const navigation = useNavigation();
  const [checkLoading, setCheckLoading] = useState(false);


  const [energy, setEnergy] = useState(10);
  const [latStart, setLatStart] = useState(10.849081398948059);
  const [lngStart, setLngStart] = useState(106.62424273185461);
  const [latEnd, setLatEnd] = useState(10.323464572434858);
  const [lngEnd, setLngEnd] = useState(107.08486774959243);

  const [addressStart, setAddressStart] = useState('Chọn điểm đi');
  const [addressEnd, setAddressEnd] = useState('Chọn điểm đến');

  const [selectedLocationStart, setSelectedLocationStart] = useState('');
  const [selectedLocationEnd, setSelectedLocationEnd] = useState('');


  const [modalMapStart, setModalMapStart] = useState(false);
  const [modalMapEnd, setModalMapEnd] = useState(false);


  const [dataStation, setDataStation] = useState([]);


  const getDataStation = async () => {
    try {
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
        setCheckLoading(false);
        console.log('Không tìm thấy dữ liệu từ /station/get');
        ItemShowAlert('Thông báo', 'Trạm sạc không được tìm thấy');
        setDataStation(null)
        // ToastAndroid.show('Không có thông tin trạm sạc', ToastAndroid.SHORT);
      }
    } catch (error) {
      setCheckLoading(false);
      console.error('Lỗi khi lấy dữ liệu station:', error);
      ItemShowAlert('Thông báo', 'Không thể tải trạm sạc xuống')
      // ToastAndroid.show('Không thể tải danh sách thông tin trạm sạc', ToastAndroid.SHORT);
    }
  };

  const log = () => {
    console.log('energy:', energy);
    console.log('latStart:', latStart);
    console.log('lngStart:', lngStart);
    console.log('latEnd:', latEnd);
    console.log('lngEnd:', lngEnd);
  }

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
              min={10}
              max={200}
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
            <Text style={styles.textLine}>10</Text>
            <Text style={styles.textLine}>200</Text>
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
                <TouchableOpacity onPress={() => { console.log('Start'); setModalMapStart(true) }} style={styles.viewImgLoaction}>
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
                <TouchableOpacity onPress={() => { console.log('End'); setModalMapEnd(true) }} style={styles.viewImgLoaction}>
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

          <View >
            <FlatList
              data={dataStation}
              scrollEnabled={false}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) =>
                <View>
                  {
                    dataStation.length > 0 ?
                      <ItemStationTrips data={item} />
                      :
                      null
                  }
                </View>
              }
            />
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