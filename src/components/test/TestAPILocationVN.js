import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const API_BASE = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
const TOKEN = '46f53dba-ecf6-11ef-a268-9e63d516feb9';

const Test = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

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
        .map(item => ({ label: item.ProvinceName, value: item.ProvinceID, name: item.ProvinceName }))
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
        .map(item => ({ label: item.DistrictName, value: item.DistrictID, name: item.DistrictName }))
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
        .map(item => ({ label: item.WardName, value: item.WardCode, name: item.WardName }))
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
      <Text style={styles.title}>Test</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <RNPickerSelect
        placeholder={{ label: 'Chọn Tỉnh/Thành phố...', value: null }}
        onValueChange={(value) => {
          const province = provinces.find(p => p.value === value);
          fetchDistricts(value, province?.name || '');
          setSelectedDistrict(null);
          setSelectedWard(null);
          setSelectedWardName('');
        }}
        items={provinces}
        value={selectedProvince}
        style={pickerSelectStyles}
      />

      <RNPickerSelect
        placeholder={{ label: 'Chọn Quận/Huyện...', value: null }}
        onValueChange={(value) => {
          const district = districts.find(d => d.value === value);
          fetchWards(value, district?.name || '');
          setSelectedWard(null);
          setSelectedWardName('');
        }}
        items={districts}
        value={selectedDistrict}
        style={pickerSelectStyles}
        disabled={!selectedProvince}
      />

      <RNPickerSelect
        placeholder={{ label: 'Chọn Xã/Phường...', value: null }}
        onValueChange={(value) => {
          const ward = wards.find(w => w.value === value);
          setSelectedWard(value);
          setSelectedWardName(ward?.name || '');
        }}
        items={wards}
        value={selectedWard}
        style={pickerSelectStyles}
        disabled={!selectedDistrict}
      />

      <Text style={styles.result}>
        {selectedProvinceName && selectedDistrictName && selectedWardName
          ? `${selectedProvinceName} - ${selectedDistrictName} - ${selectedWardName}`
          : 'Vui lòng chọn đầy đủ địa chỉ'}
      </Text>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: '#333',
    marginVertical: 8,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: '#333',
    marginVertical: 8,
  },
});