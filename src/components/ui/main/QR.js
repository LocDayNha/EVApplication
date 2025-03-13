import { StyleSheet, Text, Image, TouchableOpacity, View, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import AxiosInstance from '../../axios/AxiosInstance';

const QR = () => {
    const [dataService, setDataService] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const getServiceData = async () => {
        try {
            const dataStation = await AxiosInstance().get('/services/get');
            if (dataStation.data && dataStation.data.length > 0) {
                setDataService(dataStation.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /station/get');
                ToastAndroid.show('Không có thông tin trạm sạc', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
            ToastAndroid.show('Không thể tải danh sách thông tin trạm sạc', ToastAndroid.SHORT);
        }
    };

    useEffect(() => {
        getServiceData();
    }, [])


    return (
        <ScrollView>
            <View style={{ width: '100%', minHeight: '100%', backgroundColor: 'white', borderWidth: 1 }}>
                <View style={{ width: '100%', height: '50%', margin: '5%' }}>
                    <View style={{ width: '50%', marginBottom: '3%' }}>
                        <Text style={{ fontSize: 16, fontWeight: '400', color: 'back' }}>Dịch vụ</Text>
                    </View>
                    {openDropdown ?
                        <View>
                            <View style={{ width: '50%', borderWidth: 1, borderBottomWidth: 0, borderColor: '#CCCCCC', padding: '2%', flexDirection: 'row', justifyContent: 'space-between', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: 'back', }}>{selectedService ? 'Đã chọn dịch vụ' : 'Chọn dịch vụ'}</Text>
                                <TouchableOpacity activeOpacity={1} style={{}} onPress={() => setOpenDropdown(false)}>
                                    <Image source={require('../../../assets/icon/up.png')} style={{ width: 24, height: 24 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                position: 'absolute',
                                top: 40,
                                width: '50%',
                                maxHeight: 200,
                                borderWidth: 1,
                                borderColor: '#CCCCCC',
                                padding: '2%',
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                backgroundColor: 'white',
                                zIndex: 999,
                            }}>
                                <ScrollView style={{ maxHeight: 200, flex: 1 }}
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                                    contentContainerStyle={{ flexGrow: 1 }}>
                                    {dataService.map((item) => (
                                        <TouchableOpacity
                                            key={item._id}
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                height: 40,
                                            }}
                                            onPress={() => setSelectedService(item._id)}
                                        >
                                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                                <Image style={{ width: 25, height: 25 }} source={{ uri: item.image }} />
                                                <View style={{ marginLeft: '7%' }}>
                                                    <Text style={{ fontSize: 14, fontWeight: '500', color: 'black' }}>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                borderWidth: 1,
                                                width: 25,
                                                height: 25,
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                borderColor: selectedService === item._id ? '#009558' : 'gray'
                                            }}>
                                                {selectedService === item._id && <Text style={{ color: '#009558' }}>✓</Text>}
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                        :
                        <View style={{ width: '50%', borderWidth: 1, borderColor: '#CCCCCC', padding: '2%', flexDirection: 'row', justifyContent: 'space-between', borderRadius: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: 'back', }}>{selectedService ? 'Đã chọn dịch vụ' : 'Chọn dịch vụ'}</Text>
                            <TouchableOpacity activeOpacity={1} style={{}} onPress={() => setOpenDropdown(true)}>
                                <Image source={require('../../../assets/icon/up.png')} style={{ width: 24, height: 24, transform: [{ rotate: '180deg' }] }} />
                            </TouchableOpacity>
                        </View>
                    }
                    <Text>aaaaaaaa</Text>
                </View>
                <View style={{height:900}}>

                </View>
            </View >
        </ScrollView>
    )
}

export default QR

const styles = StyleSheet.create({

})