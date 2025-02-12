import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native'
import React from 'react'

const ChargingPost = [
    { id: '0', kw: 60, charger: 5, money: 5000 },
    { id: '1', kw: 60, charger: 5, money: 5000 },
    { id: '2', kw: 60, charger: 5, money: 5000 },
    { id: '3', kw: 60, charger: 5, money: 5000 },

];

const services = [
    { id: '0', name: 'Đồ ăn' },
    { id: '1', name: 'Khách Sạn' },
    { id: '2', name: 'Giữ xe' },
    { id: '3', name: 'Trạm sạc' },
    { id: '4', name: 'Nhà vệ sinh' },
];

const imageBrand = [
    require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg'),
    require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg'),
    require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg'),
    require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg'),
    require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg'),

];

// const kwMap = Object.fromEntries(nameKw.map(({ id, Kw }) => [id, Kw.join(', ')]));
// const mergedData = nameChargingStation.map(station => ({
//     ...station,
//     kw: kwMap[station.id] || 'N/A'
// }));


const viewdetail = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.imgMain} >
                <Image source={require('./image/anhso2.jpg')} />
            </View>
            <View style={styles.boxMain}>
                <Text style={styles.textName}>Cuu Hang Xang Dau </Text>
                <View style={styles.detailStation}>
                    <Image style={styles.imgIconMain} source={require('./image/icons8-location-30.png')} />
                    <Text style={styles.textMain}> Đường số 1,Phường 123,Quận 5</Text>
                </View>
                <View style={styles.detailStation}>
                    <Image style={styles.imgIconMain} source={require('./image/icons8-distance-24.png')} />
                    <Text style={styles.textMain}> 3.5Km</Text>
                </View>
                <View style={styles.detailStation}>
                    <Image style={styles.imgIconMain} source={require('./image/icons8-charging-station-64.png')} />
                    <Text style={styles.textMain22}> Đang hoạt Động</Text>
                </View>
                <View style={styles.detailStation}>
                    <Image style={styles.imgIconMain} source={require('./image/icons8-time-50.png')} />
                    <Text style={styles.textMain}> 00:00 - 12:00</Text>
                </View>
            </View>
            <View>
                <View>
                    <Text style={styles.textInfo}> Thông Tin tổng quan </Text>
                </View>
            </View>




            <FlatList
                data={ChargingPost}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <View style={styles.containerCharging}>
                            <View style={styles.textNameCharging} >
                                <Text style={{ color: '#40A19C' }} >
                                    Trụ sạc
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={styles.brand}>
                                    <Image style={styles.imgbrand} source={require('./image/anhso2.jpg')} />
                                    <Image style={styles.imgbrand} source={require('./image/anhso2.jpg')} />
                                    <Image style={styles.imgbrand} source={require('./image/anhso2.jpg')} />
                                    <Image style={styles.imgbrand} source={require('./image/anhso2.jpg')} />
                                </View>


                                <View style={styles.infoCharing}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <Image style={styles.imginfoCharing} source={require('./image/anhso2.jpg')} />
                                        <Text style={styles.textInfoCharing}> {item.kw}Kw/h </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <Image style={styles.imginfoCharing} source={require('./image/anhso2.jpg')} />
                                        <Text style={styles.textInfoCharing}>{item.charger} Cong </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <Image style={styles.imginfoCharing} source={require('./image/anhso2.jpg')} />
                                        <Text style={styles.textInfoCharing}> {item.money}/Kwh </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>

                )}
            />


            {/* Dich Vu  */}

            <View style={styles.containerCharging}>
                <View style={styles.textNameCharging} >
                    <Text style={{ color: '#40A19C' }} >
                        Dichj vuj
                    </Text>
                </View>
                <View >
                    <FlatList
                        data={services}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View>
                                <Text style={styles.textService}>
                                    {item.name}
                                </Text>
                            </View>

                        )}
                    />
                </View>
            </View>


            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.textInfo}> Đánh giá </Text>
                        <Text style={{ color: '#40A19C', fontSize: 20 }}>(12)</Text>
                    </View>
                    <Text style={styles.textInfo} >Xem thêm </Text>
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
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#40A19C',
        elevation: 5,
    },
    textNameCharging: {
        alignItems: 'center',
        width: '40%',
        padding: '5%',
        marginLeft: '10%',
        marginTop: '-8%',
        margin: '5%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#40A19C',
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
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgIconMain: {
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    boxMain: {
        marginTop: '-10%',
        margin: '5%',
        padding: '5%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#40A19C',
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
        width: '40%',
        marginTop: '-12%',
        marginBottom: '-0.5%',
        marginLeft: '5%',
        justifyContent: 'space-around',
        backgroundColor: '#40A19C',
        paddingLeft: '10%',
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,

        borderColor: '#40A19C'
    },
    imginfoCharing: {
        margin: '5%',
        marginLeft: '-20%',
        marginBottom: '10%',
        width: 30,
        height: 30,
        borderRadius: 30,
    },
    textInfoCharing: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    textService:{
        margin:'5%',
        marginTop:'0',
        fontSize: 20,
        fontWeight: 'bold',
    }

})