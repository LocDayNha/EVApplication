import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR, SIZE, FONT } from '@/src/assets/Theme/Theme'
import { LinearGradient } from 'expo-linear-gradient';


const MyCar = () => {
    return (
        <View style={styles.container} >
            {/* <ImageBackground style={styles.body} source={require('../../../assets/images/evbackground.jpg')}>
                <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end', height: '20%' }}>
                    <Text style={{ fontSize: SIZE.size24, fontWeight: 'bold', color: 'white' }} >Bỏ qua</Text>
                </TouchableOpacity>

                <View style={{ height: '20%' }}>
                    <Text style={{ fontSize: SIZE.size24, fontWeight: 'bold', color: 'white' }}>
                        Chào mừng đến với
                    </Text>
                    <Text style={{ fontSize: SIZE.size24, fontWeight: 'bold', marginLeft: "40%", color: 'white' }}>
                        Trạm sạc Ev
                    </Text>
                </View>
                <View style={{ alignItems: 'center', height: '40%' }}>

                </View>

                <View style={{ height: '15%' }}>
                    <Text style={{ fontSize: SIZE.size20, fontWeight: 'bold' }}>

                    </Text>
                    <View style={{ alignItems: 'center' }}>
                        <LinearGradient style={{ borderRadius: 40, width: '85%' }} dither={false} colors={['rgba(0, 149, 88, 0.8)', 'rgba(91,219,91,0.8)',]} start={{ x: 0.7, y: 0.5 }} end={{ x: 0.3, y: 0.5 }} >
                            <TouchableOpacity style={{ flexDirection: 'row', borderRadius: 40, alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: SIZE.size18, fontWeight: 'bold', margin: 15, color: 'white' }} >Thiết lập xe của bạn ?</Text>
                                <Image source={require('../../../assets/icon/icons8-arrow-64.png')} />
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                </View>
            </ImageBackground> */}
            <View style={styles.body}>
                <View>
                    <Text style={{fontSize:SIZE.size18}}>
                        Loai phuong tien cua ban 
                    </Text>
                </View>
            </View>

        </View>
    )
}

export default MyCar

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%'
    },
    body: {
        padding: '5%',
        height: '100%'
    }
})