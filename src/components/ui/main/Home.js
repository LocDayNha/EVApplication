import { StyleSheet, Text, View, Image, Button, TouchableOpacity, FlatList, SectionList, ImageBase, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigate } from "react-router-native";
import { ItemStation } from '../../item/Item';


const nameChargingStation = [
    { id: '0', name: 'Cửa hàng xăng dầu Thủ Đức ', brand: 'Honda', location: '172/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1 ', 'CCS2 '], image: 'https://www.pvoil.com.vn/media/1/he-thong-cua-hang-xang-dau.png' },
    { id: '1', name: 'Đại lý ủy quyền Hyundai ', brand: 'Hyundai', location: '72/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1 ', 'CCS2 '], image: 'https://image.bnews.vn/MediaUpload/Org/2021/03/24/img-bgt-2021-screenshot-563-1616508509-width1280height720.jpg' },
    { id: '2', name: 'Trạm xạc Vinfast Quận 1  ', brand: 'Vinfast', location: '172/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1 ', 'CCS2 '], image: 'https://petrotimesgroup.com/upload/cdn/images/image-20241116092757-1.jpeg' },
    { id: '3', name: 'Chung cư ABC ', brand: 'Vinfast,Honda', location: '72/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1 ', 'CCS2 '], image: 'https://www.viup.vn/media/ckfinder/images/News/1/3/20230314/news_5739/image003.jpg' },
    { id: '4', name: 'Bãi đỗ xe công ty trạm sạc EV ', brand: 'Vinfast', location: '172/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1 ', 'CCS2 '], image: 'https://thicongtrambienap.com/wp-content/uploads/2021/03/tram-sac-xe-dien-2-scaled.jpg' },
]

const nameKw = [
    { id: '0', Kw: ['60Kw', '20Kw', '60Kw'] },
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
        <ScrollView showsVerticalScrollIndicator ={false}>
            {/* Ten nguoi dung */}
            <View style={styles.containerUser}>
                <View style={styles.inputSearch}>
                    <View style={{ flexDirection: 'row', }}>
                        <Image style={styles.img} source={require('../../../assets/images/anhchandung.jpg')} />
                        <View >
                            <Text style={styles.titleContainer}>Nguyen Van A</Text>
                            <Text style={{color:'white'}}>Welcom Back</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.boderIcon}>
                        <Image style={styles.iconFilter} source={require('../../../assets/icon/icons8-notification-24.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={{color:'white',marginLeft:'10%', marginTop:'2%'}}>Vị trí của bạn </Text>
                <View style={styles.inputSearch}>
                    <View style={styles.boderSearch}><TextInput style={{ marginLeft: '5%' }} placeholder="172/7 phường Linh trung, Thủ đức, Hồ Chí Minh" /></View>
                    <TouchableOpacity style={styles.boderIcon}>
                        <Image style={styles.iconFilter} source={require('../../../assets/icon/icons8-filter-24.png')} />
                    </TouchableOpacity>
                </View>


            </View>

            {/* Tram sac gan ban */}
            <View style={styles.boxHome}>
                <View style={styles.container}>
                    <Text style={styles.title}>Tram sac gan ban :</Text>
                </View>
                <View >
                    <FlatList
                        data={nameChargingStation}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator ={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ItemStation data={item} />
                        )}
                    />
                </View>
            </View>
        </ScrollView>

    )
}

export default home

const styles = StyleSheet.create({

    boxHome: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: '-5%',
        backgroundColor: 'white'
    },
    containerUser: {
        backgroundColor: '#40A19C',
        alignContent: 'center',
        paddingTop: '2%',
        paddingBottom: '7%',
    },
    container: {
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

    textItemKw: {
        color: '#40A19C',
        fontSize: 16,
    },
    textItemStatus: {
        color: '#2F9465',
        fontSize: 16,

    },

    viewKw: {
        flexDirection: 'row',
        marginLeft: '10%'
    },


    title: {
        color: 'rgb(0, 0, 0)',
        fontSize: 16,
        fontWeight: 'bold',
    },
    titleContainer: {
        color: 'rgb(255, 255, 255)',
        fontSize: 20,
        fontWeight: 'bold',
    },
    img: {
        width: 40,
        height: 40,
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


    buttonService: {
        justifyContent: 'center',
        alignItems: 'center',

    },

    inputSearch: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: '5%',
        marginRight: '5%',
    },
    iconFilter: {
        height: 20,
        width: 20,

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
        width: '80%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: '#40A19C',
    },

    // item list 

    listRow: {
        margin: '5%',
        marginTop: '0%',
        marginBottom: '4%',
        borderRadius: 25,
        backgroundColor: 'white',
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
        width: 90,
        height: 30,
        flexDirection: 'row',
        backgroundColor: '#40A19C',
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

})