import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native'
import React from 'react'
import { TextInputProfile, CustomButton, ItemRating } from '../../item/Item'


const ChargingPost = [
    { id: '0', kw: 60, charger: 2, money: 10000, namesocket: 'CCS1', imgSocket: require('../../../assets/imageSocket/ccs1.png') },
    { id: '1', kw: 60, charger: 2, money: 7000, namesocket: 'CCS2', imgSocket: require('../../../assets/imageSocket/ccs2.png') },
    { id: '2', kw: 60, charger: 1, money: 6000, namesocket: 'J1772', imgSocket: require('../../../assets/imageSocket/j1772.png') },
    { id: '3', kw: 60, charger: 2, money: 5000, namesocket: 'GB/T (DC)', imgSocket: require('../../../assets/imageSocket/GBT(DC).png') },

];

const services = [
    { id: '0', name: 'Đồ ăn', img: require('../../../assets/imageServices/icons8-hamburger-64.png') },
    { id: '1', name: 'Nhà nghỉ', img: require('../../../assets/imageServices/icons8-bed-48.png') },
    { id: '2', name: 'Giữ xe', img: require('../../../assets/imageServices/icons8-parking-64.png') },
    { id: '3', name: 'Nhà vệ sinh', img: require('../../../assets/imageServices/icons8-wc-48.png') },
];


const type = [
    require('../../../assets/icon/icons8-charging-station-64.png'),

];

// const kwMap = Object.fromEntries(nameKw.map(({ id, Kw }) => [id, Kw.join(', ')]));
// const mergedData = nameChargingStation.map(station => ({
//     ...station,
//     kw: kwMap[station.id] || 'N/A'
// }));


const fakeData = [
    {
        _id: "1",
        user_id: {
            image: "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g",
            name: "Nguyễn Văn A",
        },
        createAt: "2025-02-12 14:30",
        content: "Sản phẩm rất tốt, mình rất hài lòng! ",
    },
    {
        _id: "2",
        user_id: {
            image: "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g",
            name: "Nguyễn Văn A",
        },
        createAt: "2025-02-12 14:30",
        content: "Sản phẩm rất tốt, mình rất hài lòng! ",
    },
    {
        _id: "3",
        user_id: {
            image: "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g",
            name: "Nguyễn Văn A",
        },
        createAt: "2025-02-12 14:30",
        content: "Sản phẩm rất tốt, mình rất hài lòng! ",
    },

];




const viewdetail = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.imgMain} >
                <Image source={require('../../../assets/images//anhso2.jpg')} />
            </View>
            <View style={styles.boxMain}>
                <Text style={styles.textName}>Cuu Hang Xang Dau </Text>
                <View style={styles.detailStation}>
                    <Image style={styles.imgIconMain} source={require('../../../assets/icon/icons8-location-30.png')} />
                    <Text style={styles.textMain}> Đường số 1,Phường 123,Quận 5</Text>
                </View>
                <View style={styles.detailStation}>
                    <Image style={styles.imgIconMain} source={require('../../../assets/icon/icons8-distance-24.png')} />
                    <Text style={styles.textMain}> 3.5Km</Text>
                </View>
                <View style={styles.detailStation}>
                    <Image style={styles.imgIconMain} source={require('../../../assets/icon/icons8-charging-station-64.png')} />
                    <Text style={styles.textMain22}> Đang hoạt Động</Text>
                </View>
                <View style={styles.detailStation}>
                    <Image style={styles.imgIconMain} source={require('../../../assets/icon/icons8-time-50.png')} />
                    <Text style={styles.textMain}> 00:00 - 12:00</Text>
                </View>
            </View>
            <View>
                <View>
                    <Text style={styles.textInfo}> Thông Tin tổng quan </Text>
                </View>
            </View>

            {/* Dich Vu  */}

            <View style={styles.containerCharging}>
                <View style={styles.textNameCharging} >
                    <Text style={{ color: '#40A19C', fontSize: 20, }} >
                        Dịch vụ
                    </Text>
                </View>
                <View >
                    <FlatList
                        data={services}
                        scrollEnabled={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', }} >
                                <Image style={styles.imgServies} source={item.img} />
                                <Text style={styles.textService}>
                                    {item.name}
                                </Text>
                            </View>

                        )}
                    />
                </View>
            </View>


            <View style={styles.containerCharging}>
                <View style={styles.textNameCharging} >
                    <Text style={{ color: '#40A19C', fontSize: 20, }} >
                        Trụ sạc
                    </Text>
                </View>
                <FlatList
                    data={ChargingPost}
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (

                        <View style={styles.viewChargingPost}>

                            <View style={styles.viewImage} >
                                <Image style={styles.imgSocket} source={item.imgSocket} />
                                <Text style={styles.textTypeCharing}>{item.namesocket}</Text>
                            </View>
                            <View style={styles.infoCharing}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Image style={styles.imginfoCharing} source={require('../../../assets/icon/icons8-flash-50 (1).png')} />
                                    <Text style={styles.textInfoCharing}> {item.kw}Kw/h </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Image style={styles.imginfoCharing} source={require('../../../assets/icon/icons8-socket-60.png')} />
                                    <Text style={styles.textInfoCharing}> {item.charger} Cổng sạc  </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Image style={styles.imginfoCharing} source={require('../../../assets/icon/icons8-money-50 (1).png')} />
                                    <Text style={styles.textInfoCharing}> {item.money}/Kwh </Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.textInfo}> Đánh giá </Text>
                        <Text style={{ color: '#40A19C', fontSize: 20 }}>(12)</Text>
                    </View>
                    <Text style={styles.textInfo} >Xem thêm </Text>
                </View>
                <View>
                    <View style={styles.containerRate}>
                        <View  >
                            <FlatList
                                data={fakeData}
                                scrollEnabled={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.listRate}>
                                        <ItemRating data={item} />
                                    </View>
                                )}
                            />
                        </View>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

export default viewdetail

const styles = StyleSheet.create({
    container: {

    },
    containerCharging: {
        margin: '5%',
        marginTop: '10%',
        padding: '5%',
        backgroundColor: 'E9F6F5',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#C7C6C5',
        elevation: 5,
    },
    containerRate: {
        borderRadius: 10,
        borderColor: '#C7C6C5',
    },
    textNameCharging: {
        alignItems: 'center',
        width: '40%',
        padding: '5%',
        marginLeft: '10%',
        marginTop: '-15%',
        margin: '5%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#C7C6C5',
    },
    textName: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    textNameService: {
        alignItems: 'center',
        width: '40%',
        padding: '5%',
        marginLeft: '10%',
        marginTop: '-8%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#40A19C',
    },
    textNameService: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    textMain: {
        fontSize: 18,
    },
    textMain22: {
        fontSize: 18,
        color: '#40A19C'
    },
    textInfo: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: '5%'
    },
    imgMain: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgIconMain: {
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    imgSocket: {
        width: 80,
        height: 80,
    },
    imgServies: {
        width: 50,
        height: 50,
    },
    boxMain: {
        marginTop: '15%',
        margin: '5%',
        padding: '5%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#C7C6C5',
        borderRadius: 20,
        elevation: 5,
    },
    detailStation: {
        flexDirection: 'row',
        margin: '2%',
    },
    brand: {
        width: '50%',
        marginLeft: '5%',
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    imgbrand: {
        margin: '5%',
        marginBottom: '10%',
        width: 40,
        height: 40,
        borderRadius: 30,
    },
    infoCharing: {
        justifyContent: 'space-around',
        marginLeft: '10%',
    },
    imginfoCharing: {

        width: 30,
        height: 30,
        borderRadius: 30,
    },
    textInfoCharing: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textService: {
        marginLeft: '5%',
        marginTop: '0',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textTypeCharing: {
        fontSize: 18,

        fontWeight: '500'
    },
    viewImage: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewChargingPost: {
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        marginRight: 0,
        marginLeft: 0,
        marginBottom: '5%',
        borderColor: '#C7C6C5',
        backgroundColor: '#E9F6F5',
        padding: '5%',
        elevation: 5,
    },
    listRate: {
        margin: '0%',
        alignItems:'center'
    },

})