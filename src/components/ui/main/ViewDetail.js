import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'

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
            <View style={styles.containerCharging}>
                <View style={styles.textNameCharging} >
                    <Text style={{ color: '#40A19C' }} >
                        Trụ sạc
                    </Text>
                </View>

            </View>
            <View>
                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }} >
                    <View style={{ flexDirection:'row', alignItems:'center' }}>
                        <Text style={styles.textInfo}> Đánh giá </Text>
                        <Text style={{ color: '#40A19C',fontSize:20 }}>(12)</Text>
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
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#40A19C',
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
    }

})