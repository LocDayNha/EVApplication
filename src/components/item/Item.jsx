import { StyleSheet, View, Text, TouchableOpacity, FlatList, Linking, ToastAndroid, TextInput, Image, Modal, ScrollView } from "react-native";
import { COLOR } from "../../assets/Theme/Theme";
import { useNavigate } from "react-router-native";
import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../axios/AppContext';
import AxiosInstance from "../axios/AxiosInstance";
import { MaterialIcons } from "@expo/vector-icons";
import RNPickerSelect from 'react-native-picker-select';


const API_BASE = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
const TOKEN = '46f53dba-ecf6-11ef-a268-9e63d516feb9';

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
                <Text style={{ color: COLOR.green3 }}>Quay lại </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>

  );
}

export function ItemStationMap(props) {
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
    <TouchableOpacity style={styles.listLocation} key={data._id} onPress={clickViewDetail}>
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

// them moi

// nút chọn hình vuông
export function ItemCheckBox({ data = [], onSelect }) {
  const [selectedService, setSelectedService] = useState([]);

  const toggleSelection = (id) => {
    let updatedSelection;
    if (selectedService.includes(id)) {
      updatedSelection = selectedService.filter((item) => item !== id);
    } else {
      updatedSelection = [...selectedService, id];
    }
    setSelectedService(updatedSelection);
    onSelect(updatedSelection); // Truyền dữ liệu ra ngoài
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => {
          const isSelected = selectedService.includes(item.name);
          return (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 12,
                paddingHorizontal: 24,
                marginRight: 12,
                borderWidth: 2,
                borderColor: COLOR.green3,
                borderRadius: 8,
                backgroundColor: isSelected ? COLOR.green3 : "#fff",
              }}
              onPress={() => toggleSelection(item.name)}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: isSelected ? "#fff" : 'black',
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
//nút chọn hình tròn
export function ItemRadioButton({ data = [], onSelect, selectedValue }) {
  const [selectedMethod, setSelectedMethod] = useState(selectedValue);

  useEffect(() => {
    setSelectedMethod(selectedValue);
  }, [selectedValue]);

  const handlePress = (id) => {
    const newSelection = selectedMethod === id ? null : id;
    setSelectedMethod(newSelection);
    onSelect(newSelection);
  };

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const isSelected = selectedMethod === item.name;
          return (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderWidth: 2,
                borderColor: COLOR.green3,
                borderRadius: 8,
                backgroundColor: isSelected ? COLOR.green3 : "#fff",
                marginVertical: 10,
                marginHorizontal: 20,
                height: 50,
              }}
              onPress={() => handlePress(item.name)}
            >
              <MaterialIcons
                name={isSelected ? "radio-button-checked" : "radio-button-unchecked"}
                size={20}
                color={isSelected ? "#fff" : COLOR.green3}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: isSelected ? "#fff" : 'black',
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
// nut hình tròn lấy tyle
export function ItemRadioButtonType({ data = [], onSelect, selectedValue }) {
  const [selectedMethod, setSelectedMethod] = useState(selectedValue);



  useEffect(() => {
    setSelectedMethod(selectedValue);
  }, [selectedValue]);

  const handlePress = (id) => {
    const newSelection = selectedMethod === id ? null : id;
    setSelectedMethod(newSelection);
    onSelect(newSelection);
  };

  const uniqueTypes = [...new Set(data.map(item => item.type))];

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={uniqueTypes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const isSelected = selectedMethod === item;
          return (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderWidth: 2,
                borderColor: COLOR.green3,
                borderRadius: 8,
                backgroundColor: isSelected ? COLOR.green3 : "#fff",
                marginVertical: 10,
                marginHorizontal: 20,
                height: 50,
              }}
              onPress={() => handlePress(item)}
            >
              <MaterialIcons
                name={isSelected ? "radio-button-checked" : "radio-button-unchecked"}
                size={20}
                color={isSelected ? "#fff" : COLOR.green3}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: isSelected ? "#fff" : 'black',
                }}
              >
                {item}
              </Text>

              {/* {uniqueTypes.map((type, index) => (
                <Text key={index}>{type}</Text>
              ))} */}

            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

// nút chọn hình vuông có hình ảnh 
export function ItemCheckBoxImage({ data = [], onSelect }) {
  const [selectedService, setSelectedService] = useState([]);

  const toggleSelection = (id) => {
    let updatedSelection;
    if (selectedService.includes(id)) {
      updatedSelection = selectedService.filter((item) => item !== id);
    } else {
      updatedSelection = [...selectedService, id];
    }
    setSelectedService(updatedSelection);
    onSelect(updatedSelection); // Truyền dữ liệu ra ngoài
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => {
          const isSelected = selectedService.includes(item.name);
          return (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 12,
                paddingHorizontal: 24,
                marginRight: 12,
                borderWidth: 2,
                borderColor: COLOR.green3,
                borderRadius: 8,
                backgroundColor: isSelected ? COLOR.green3 : "#fff",
              }}
              onPress={() => toggleSelection(item.name)}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: isSelected ? "#fff" : 'black',
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
//nút chọn hình tròn có honh anh 
export function ItemRadioButtonImage({ data = [], onSelect, selectedValue }) {
  const [selectedMethod, setSelectedMethod] = useState(selectedValue);

  useEffect(() => {
    setSelectedMethod(selectedValue);
  }, [selectedValue]);

  const handlePress = (id) => {
    const newSelection = selectedMethod === id ? null : id;
    setSelectedMethod(newSelection);
    onSelect(newSelection);
  };

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const isSelected = selectedMethod === item.name;
          return (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderWidth: 2,
                borderColor: COLOR.green3,
                borderRadius: 8,
                backgroundColor: isSelected ? COLOR.green3 : "#fff",
                marginVertical: 10,
                marginHorizontal: 20,
                height: 50,
              }}
              onPress={() => handlePress(item.name)}
            >
              <MaterialIcons
                name={isSelected ? "radio-button-checked" : "radio-button-unchecked"}
                size={20}
                color={isSelected ? "#fff" : COLOR.green3}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: isSelected ? "#fff" : 'black',
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
// chọn địa chỉ 
export function ItemBoxLocation({ onSelect }) {
  const [valueProvinceName, setValueProvinceName] = useState('');
  const [valueDistrictName, setValueDistrictName] = useState('');
  const [valueWardName, setValueWardName] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await fetch(`${API_BASE}/province`, {
        headers: { Token: TOKEN }
      });
      const data = await response.json();
      setProvinces((data.data || [])
        .map(item => ({
          label: item.ProvinceName,
          value: String(item.ProvinceID),
          name: item.ProvinceName,
        }))
        .sort((a, b) => a.label.localeCompare(b.label))
      );
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const fetchDistricts = async (provinceId, provinceName) => {
    try {
      const response = await fetch(`${API_BASE}/district?province_id=${provinceId}`, {
        headers: { Token: TOKEN }
      });
      const data = await response.json();
      setDistricts((data.data || [])
        .map(item => ({
          label: item.DistrictName,
          value: String(item.DistrictID),
          name: item.DistrictName,
        }))
        .sort((a, b) => a.label.localeCompare(b.label))
      );
      setSelectedProvince(provinceId);
      setValueProvinceName(provinceName);
      setSelectedDistrict('');
      setSelectedWard('');
      setValueDistrictName('');
      setValueWardName('');

      // Gửi dữ liệu ra ngoài
      onSelect({ provinceName, districtName: '', wardName: '' });
    } catch (error) {
      console.error('Error fetching districts:', error);
      setDistricts([]);
    }
  };

  const fetchWards = async (districtId, districtName) => {
    try {
      const response = await fetch(`${API_BASE}/ward?district_id=${districtId}`, {
        headers: { Token: TOKEN }
      });
      const data = await response.json();
      setWards((data.data || [])
        .map(item => ({
          label: item.WardName,
          value: String(item.WardCode),
          name: item.WardName,
        }))
        .sort((a, b) => a.label.localeCompare(b.label))
      );
      setSelectedDistrict(districtId);
      setValueDistrictName(districtName);
      setSelectedWard('');
      setValueWardName('');

      // Gửi dữ liệu ra ngoài
      onSelect({ provinceName: valueProvinceName, districtName, wardName: '' });
    } catch (error) {
      console.error('Error fetching wards:', error);
      setWards([]);
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            placeholder={{ label: 'Tỉnh/TP...', value: '' }}
            onValueChange={(value) => {
              const province = provinces.find(p => p.value === value) || { name: '' };
              fetchDistricts(value, province.name);
            }}
            items={provinces}
            value={selectedProvince}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            placeholder={{ label: 'Quận/Huyện...', value: '' }}
            onValueChange={(value) => {
              const district = districts.find(d => d.value === value) || { name: '' };
              fetchWards(value, district.name);
            }}
            items={districts}
            value={selectedDistrict}
            style={pickerSelectStyles}
            disabled={!selectedProvince}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            placeholder={{ label: 'Xã/Phường...', value: '' }}
            onValueChange={(value) => {
              const ward = wards.find(w => w.value === value) || { name: '' };
              setSelectedWard(value);
              setValueWardName(ward.name);

              // Gửi dữ liệu ra ngoài
              onSelect({ provinceName: valueProvinceName, districtName: valueDistrictName, wardName: ward.name });
            }}
            items={wards}
            value={selectedWard}
            style={pickerSelectStyles}
            disabled={!selectedDistrict}
            useNativeAndroidPickerStyle={false}
          />
        </View>
      </View>
    </View>
  );
}

export function ItemInputCharging({ value, onChangeText, placeholder, note }) {
  return (
    <View style={{
      width: '30%',
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderColor: COLOR.green3,
      justifyContent: 'space-between',
      height: 40,
      alignItems: 'center'
    }}>
      <TextInput
        style={{
          flex: 1,
          height: 40,
          fontSize: 20,
          textAlign: 'center'
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
      <View style={{
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text
          style={{
            fontSize: 20,
            color: COLOR.green3,
            textAlign: 'center'

          }}>
          {note}
        </Text>
      </View>
    </View>

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
    backgroundColor: COLOR.green3,
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
    borderColor: COLOR.green3
  },
  applyButton: {
    backgroundColor: COLOR.green3,
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
  // item box location
  listLocation: {
    width: '100%',
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
  row: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  pickerContainer: {
    width: '30%',
    height: 50,
    borderBottomWidth: 2,
    borderColor: COLOR.green3,
    justifyContent: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    height: 0,
    color: 'black',
    marginVertical: 30,
    marginHorizontal: 10,
  },
  inputAndroid: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
