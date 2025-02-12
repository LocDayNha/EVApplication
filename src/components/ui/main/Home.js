import { StyleSheet, Text, View, Image, Button, TouchableOpacity, FlatList, SectionList, ImageBase, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useNavigate } from "react-router-native";

const nameChargingStation = [
    { id: '0', name: 'Tram1', location: '123,456' },
    { id: '1', name: 'Tram1', location: '123,456' },
    { id: '2', name: 'Tram1', location: '123,456' },
    { id: '3', name: 'Tram1', location: '123,456' },
    { id: '4', name: 'Tram1', location: '123,456' },
]

const nameKw = [
    { id: '0', Kw: ['60Kw', '60Kw', '60Kw'] },
    { id: '1', Kw: ['60Kw', '60Kw', '60Kw'] },
    { id: '2', Kw: ['60Kw', '60Kw', '60Kw'] },
    { id: '3', Kw: ['60Kw', '60Kw', '60Kw'] },
    { id: '4', Kw: ['60Kw', '60Kw', '60Kw'] },
];



// const mergedData = nameChargingStation.map(station => {
//     const kwData = nameKw.find(kw => kw.id === station.id);
//     return { ...station, kw: kwData ? kwData.Kw.join(', ') : 'N/A' };
// });
const kwMap = Object.fromEntries(nameKw.map(({ id, Kw }) => [id, Kw.join(', ')]));
const mergedData = nameChargingStation.map(station => ({
    ...station,
    kw: kwMap[station.id] || 'N/A'
}));

const services = [
    { id: '0', name: 'Đồ ăn' },
    { id: '1', name: 'Khách Sạn' },
    { id: '2', name: 'Giữ xe' },
    { id: '3', name: 'Trạm sạc' },
    { id: '4', name: 'Nhà vệ sinh' },
];

// const imageBrand = [
//     require('../../../assets/image/anhso3.jpg'),
//     require('../../../assets/image/anhso3.jpg'),
//     require('../../../assets/image/anhso3.jpg'),
//     require('../../../assets/image/anhso3.jpg'),
//     require('../../../assets/image/anhso3.jpg'),
//     require('../../../assets/image/anhso3.jpg'),
//     require('../../../assets/image/anhso3.jpg'),
//     require('../../../assets/image/anhso3.jpg'),
// ];

const home = () => {
    const [showChargingStations, setShowChargingStations] = useState(true);

    const [changeColor, setChangeColor] = useState(true);
    const navigate = useNavigate();
    return (
        <View  >
            {/* Ten nguoi dung */}
            <View style={[styles.containerUser, { height: '9%' }]}>
                <View>
                    <Image style={styles.img} source={require('../../../assets/images/anhso3.jpg')} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '83%' }}>
                    <View>
                        <Text style={styles.titleContainer}>Nguyen Van A</Text>
                        <Text style={styles.titleContainer}>Welcom Back</Text>
                    </View>
                    <TouchableOpacity style={styles.boderIcon}>
                        <Image style={styles.iconFilter} source={require('../../../assets/icon/icons8-notification-50.png')} />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.inputSearch}>
                <View style={styles.boderSearch}><TextInput style={{ marginLeft: '5%' }} placeholder="Tìm kiếm địa chỉ " /></View>
                <TouchableOpacity style={styles.boderIcon}>
                    <Image style={styles.iconFilter} source={require('../../../assets/icon/icons8-filter-50 (1).png')} />
                </TouchableOpacity>
            </View>


            {/* Tram sac gan ban */}
            <View>
                <View style={styles.container}>
                    <Text style={styles.title}>Tram sac gan ban :</Text>
                </View>
                <View style={{ height: '80%' }}>
                    <FlatList
                        data={mergedData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.listRow} onPress={() => navigate("/view-detail")}>
                                <View style={styles.viewLocation}>
                                    <Image style={styles.imgLocation} source={require('../../../assets/icon/icons8-location-50.png')} />
                                    <View>
                                        <Text style={styles.textItemName}>{item.name}</Text>
                                        <Text style={styles.textItemLocation}>{item.location}</Text>
                                    </View>
                                </View>
                                <View style={styles.viewKw}>
                                    <Image style={styles.imgFlash} source={require('../../../assets/icon/icons8-flash-50 (1).png')} />
                                    <Text style={styles.textItemKw} >{item.kw}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: '3%', marginRight: '3%' }}>
                                    <Text style={styles.textItemStatus}>Đang hoạt động</Text>
                                    <TouchableOpacity>
                                        <View style={styles.viewButtonItem} >
                                            <Text style={{ color: 'white' }}>
                                                3.5Km
                                            </Text>
                                            <Image style={styles.imgNext} source={require('../../../assets/icon/icons8-arrow-64.png')} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </TouchableOpacity>
                        )}
                    />
                </View>

            </View>

        </View>

    )
}

export default home

const styles = StyleSheet.create({


    containerUser: {
        flexDirection: 'row',
        backgroundColor: '#40A19C',
        alignContent: 'center',
        padding: '5%'
    },
    container: {
        backgroundColor: 'FFFFF',
        margin: '5%',
        marginBottom: '5%',
        flexDirection: 'row',
    },

    text: {
        color: 'rgb(0, 0, 0)',
        fontSize: 16,
        fontWeight: 'bold',
    },

    textSearch: {
        color: 'rgb(255, 255, 255)',
        fontSize: 16,
    },
    textItemName: {
        color: 'rgb(0, 0, 0)',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textItemLocation: {
        color: '#544C4C',
        fontSize: 16,
    },
    textItemKw: {
        color: '#40A19C',
        fontSize: 16,
    },
    textItemStatus: {
        color: '#2F9465',
        fontSize: 16,

    },
    viewLocation: {
        flexDirection: 'row',

    },
    viewKw: {
        flexDirection: 'row',
        marginLeft: '10%'
    },
    viewButtonItem: {
        width: 90,
        height: 30,
        flexDirection: 'row',
        backgroundColor: '#40A19C',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 30,
        color: 'white',
    },

    title: {
        color: 'rgb(0, 0, 0)',
        fontSize: 16,
        fontWeight: 'bold',
    },
    titleContainer: {
        color: 'rgb(0, 0, 0)',
        fontSize: 20,
        fontWeight: 'bold',
    },
    img: {
        width: 50,
        height: 50,
        marginRight: '2%',
        borderRadius: 30,
    },
    imgLocation: {
        width: 40,
        height: 40,
        borderRadius: 30,
    },
    imgFlash: {
        width: 20,
        height: 20,
        borderRadius: 30,
    },
    imgNext: {
        width: 30,
        height: 30,
    },
    buttonService: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    listRow: {
        padding: 15,
        marginBottom: 5,
        margin: '5%',
        marginTop: '1.5%',
        marginBottom: '1.5%',
        borderWidth: 1,
        borderColor: '#40A19C',
        borderRadius: 25,
        backgroundColor: 'white',
        elevation: 5,
    },
    inputSearch: {
        height: 80,
        backgroundColor: '#40A19C',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },
    iconFilter: {
        height: 25,
        width: 25,

    },
    boderIcon: {

        height: 50,
        width: 50,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: '#40A19C',
    },
    boderSearch: {
        height: 50,
        width: '70%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: '#40A19C',
    },
})