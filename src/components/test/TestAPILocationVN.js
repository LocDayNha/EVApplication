import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const API_BASE = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
const TOKEN = '46f53dba-ecf6-11ef-a268-9e63d516feb9';

const Test = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const [selectedProvinceName, setSelectedProvinceName] = useState('');
  const [selectedDistrictName, setSelectedDistrictName] = useState('');
  const [selectedWardName, setSelectedWardName] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchDistricts = async (provinceId, provinceName) => {
    setLoading(true);
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
      setSelectedProvinceName(provinceName);
    } catch (error) {
      console.error('Error fetching districts:', error);
      setDistricts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchWards = async (districtId, districtName) => {
    setLoading(true);
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
      setSelectedDistrictName(districtName);
    } catch (error) {
      console.error('Error fetching wards:', error);
      setWards([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            placeholder={{ label: 'Tỉnh/TP...', value: '' }}
            onValueChange={(value) => {
              const province = provinces.find(p => p.value === value) || { name: '' };
              fetchDistricts(value, province.name);
              setSelectedDistrict('');
              setSelectedWard('');
              setSelectedDistrictName('');
              setSelectedWardName('');
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
              setSelectedWard('');
              setSelectedWardName('');
            }}
            items={districts}
            value={selectedDistrict}
            style={pickerSelectStyles}
            disabled={!selectedProvince}
            useNativeAndroidPickerStyle={false}
            textInputProps={{
              numberOfLines: 1,    // Hiển thị 1 dòng
              ellipsizeMode: 'tail', // Cắt bớt nếu quá dài (thêm '...')
            }}
          />
        </View>

        <View style={styles.pickerContainer}>
          <RNPickerSelect
            placeholder={{ label: 'Xã/Phường...', value: '' }}
            onValueChange={(value) => {
              const ward = wards.find(w => w.value === value) || { name: '' };
              setSelectedWard(value);
              setSelectedWardName(ward.name);
            }}
            items={wards}
            value={selectedWard}
            style={pickerSelectStyles}
            disabled={!selectedDistrict}
            useNativeAndroidPickerStyle={false}
          />
        </View>
      </View>

      <Text style={styles.result}>
        {selectedProvinceName && selectedDistrictName && selectedWardName
          ? `${selectedProvinceName} - ${selectedDistrictName} - ${selectedWardName}`
          : 'Vui lòng chọn đầy đủ địa chỉ'}
      </Text>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    justifyContent: 'center',
    backgroundColor: ''
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerContainer: {
    width: '32%',
    height:60,
    margin: '0.5%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  result: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    height: 0,
    color: 'black',
    marginVertical: 30,
    marginHorizontal: 10,
  },
  inputAndroid: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});