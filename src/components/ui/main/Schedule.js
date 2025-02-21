import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';
import RNPickerSelect from 'react-native-picker-select';
import { CustomButton } from '../../item/Item';

const API_BASE = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
const TOKEN = '46f53dba-ecf6-11ef-a268-9e63d516feb9';


const Schedule = () => {
    const [value, setValue] = useState(0);




    // điểm đếnđến
    const [provincesEnd, setProvincesEnd] = useState([]);
    const [districtsEnd, setDistrictsEnd] = useState([]);
    const [wardsEnd, setWardsEnd] = useState([]);
    const [selectedProvinceEnd, setSelectedProvinceEnd] = useState('');
    const [selectedDistrictEnd, setSelectedDistrictEnd] = useState('');
    const [selectedWardEnd, setSelectedWardEnd] = useState('');

    const [selectedProvinceNameEnd, setSelectedProvinceNameEnd] = useState('');
    const [selectedDistrictNameEnd, setSelectedDistrictNameEnd] = useState('');
    const [selectedWardNameEnd, setSelectedWardNameEnd] = useState('');



    // điểm đi

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
    const [loadingEnd, setLoadingEnd] = useState(false);

    useEffect(() => {
        fetchProvinces();
    }, []);
    useEffect(() => {
        fetchProvincesEnd();
    }, []);

    // điểm đến 
    const fetchProvincesEnd = async () => {
        setLoadingEnd(true);
        try {
            const response = await fetch(`${API_BASE}/province`, {
                headers: { Token: TOKEN }
            });
            const data = await response.json();
            setProvincesEnd((data.data || [])
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
            setLoadingEnd(false);
        }
    };

    const fetchDistrictsEnd = async (provinceId, provinceName) => {
        setLoadingEnd(true);
        try {
            const response = await fetch(`${API_BASE}/district?province_id=${provinceId}`, {
                headers: { Token: TOKEN }
            });
            const data = await response.json();
            setDistrictsEnd((data.data || [])
                .map(item => ({
                    label: item.DistrictName,
                    value: String(item.DistrictID),
                    name: item.DistrictName,
                }))
                .sort((a, b) => a.label.localeCompare(b.label))
            );
            setSelectedProvinceEnd(provinceId);
            setSelectedProvinceNameEnd(provinceName);
        } catch (error) {
            console.error('Error fetching districts:', error);
            setDistricts([]);
        } finally {
            setLoadingEnd(false);
        }
    };

    const fetchWardsEnd = async (districtId, districtName) => {
        setLoadingEnd(true);
        try {
            const response = await fetch(`${API_BASE}/ward?district_id=${districtId}`, {
                headers: { Token: TOKEN }
            });
            const data = await response.json();
            setWardsEnd((data.data || [])
                .map(item => ({
                    label: item.WardName,
                    value: String(item.WardCode),
                    name: item.WardName,
                }))
                .sort((a, b) => a.label.localeCompare(b.label))
            );
            setSelectedDistrictEnd(districtId);
            setSelectedDistrictNameEnd(districtName);
        } catch (error) {
            console.error('Error fetching wards:', error);
            setWards([]);
        } finally {
            setLoadingEnd(false);
        }
    };

    // điểm đi 
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
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5%', justifyContent: 'space-evenly' }}>
                <Text style={{ fontSize: 18, }}>Phạm vi hoạt động của phương tiện </Text>
                <View style={{
                    backgroundColor: '#40A19C',
                    width: 70,
                    height: 40,
                    padding: 10,
                    borderRadius: 30,

                }}>
                    <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>{value}</Text>
                </View>
            </View>

            <View style={{ alignItems: 'center' }}>
                <Slider
                    style={{ width: '80%', height: 50 }}
                    minimumValue={0}
                    maximumValue={200}
                    step={1}
                    minimumTrackTintColor="#40A19C"
                    maximumTrackTintColor="grey"
                    thumbTintColor="#40A19C"
                    onValueChange={setValue}
                />

            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: '10%' }}>
                <Text style={{ fontSize: 18, }}>0</Text>
                <Text style={{ fontSize: 18, }}>200</Text>
            </View>


            {/* điểm đi  */}

            <Text style={{ fontSize: 18, marginLeft:'10%',marginTop:'5%'}}>Điểm đi </Text>
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



            {/* {loading && <ActivityIndicator size="large" color="#0000ff" />} */}


            {/* điểm đên  */}
            <Text style={{ fontSize: 18, marginLeft:'10%' }}>Điểm đến </Text>
            <View style={styles.row}>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        placeholder={{ label: 'Tỉnh/TP...', value: '' }}
                        onValueChange={(value) => {
                            const province = provincesEnd.find(p => p.value === value) || { name: '' };
                            fetchDistrictsEnd(value, province.name);
                            setSelectedDistrictEnd('');
                            setSelectedWardEnd('');
                            setSelectedDistrictNameEnd('');
                            setSelectedWardNameEnd('');
                        }}
                        items={provincesEnd}
                        value={selectedProvinceEnd}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                    />
                </View>

                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        placeholder={{ label: 'Quận/Huyện...', value: '' }}
                        onValueChange={(value) => {
                            const district = districtsEnd.find(d => d.value === value) || { name: '' };
                            fetchWardsEnd(value, district.name);
                            setSelectedWardEnd('');
                            setSelectedWardNameEnd('');
                        }}
                        items={districtsEnd}
                        value={selectedDistrictEnd}
                        style={pickerSelectStyles}
                        disabled={!selectedProvinceEnd}
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
                            const ward = wardsEnd.find(w => w.value === value) || { name: '' };
                            setSelectedWardEnd(value);
                            setSelectedWardNameEnd(ward.name);
                        }}
                        items={wardsEnd}
                        value={selectedWardEnd}
                        style={pickerSelectStyles}
                        disabled={!selectedDistrictEnd}
                        useNativeAndroidPickerStyle={false}
                    />
                </View>
            </View>
            
            <Text style={styles.result}>
                {selectedProvinceName && selectedDistrictName && selectedWardName
                    ?`Từ : ${selectedProvinceName} - ${selectedDistrictName} - ${selectedWardName}`
                    : 'Vui lòng chọn đầy đủ địa chỉ điểm bắt đầu'}
            </Text>

            <Text style={styles.result}>
                {selectedProvinceNameEnd && selectedDistrictNameEnd && selectedWardNameEnd
                    ? `Đến : ${selectedProvinceNameEnd} - ${selectedDistrictNameEnd} - ${selectedWardNameEnd}`
                    : 'Vui lòng chọn đầy đủ địa chỉ điểm đến'}
            </Text>

            {/* {loadingEnd && <ActivityIndicator size="large" color="#0000ff" />} */}

            <View style={{alignItems:'center',margin:'5%'}}>
                <CustomButton label={'Tìm kiếm theo lộ trình'}/>
            </View>
        </View>
    )
}

export default Schedule

const styles = StyleSheet.create({
    container: {
        marginTop: '5%',
        justifyContent: 'center',
        backgroundColor: ''
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '5%'
    },
    pickerContainer: {
        width: '28%',
        height: 50,
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
        marginLeft:'10%',
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