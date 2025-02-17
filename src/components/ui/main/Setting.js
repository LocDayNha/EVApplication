import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const Setting = () => {
    const navigation = useNavigation();
    return (
        <ScrollView >
            <View style={styles.user}>
                <View style={styles.viewUser}>
                    <Image style={styles.imguser} source={require('../../../assets/images/anhchandung.jpg')} />
                    <Text style={styles.textNameuser} >Nguyen van a</Text>
                </View>
            </View>

            <View style={styles.boxHome}>
                <View style={styles.boxSetting}>
                    <TouchableOpacity style={styles.boxContent} onPress={() => navigation.navigate("Profile")}>
                        <Image style={styles.imgIcon} source={require('../../../assets/icon/icons8-user-96.png')} />
                        <Text style={styles.textNameSetting}>Thông tin người dùng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxContent}>
                        <Image style={styles.imgIcon} source={require('../../../assets/icon/icons8-mail-96.png')} />
                        <Text style={styles.textNameSetting}>Liên hệ chúng tôi </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxContent}>
                        <Image style={styles.imgIcon} source={require('../../../assets/icon/icons8-moon-symbol-96.png')} />
                        <Text style={styles.textNameSetting}>Chế độ tối </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxContent}>
                        <Image style={styles.imgIcon} source={require('../../../assets/icon/icons8-star-96.png')} />
                        <Text style={styles.textNameSetting}>Đánh giá ứng dụng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxContent}>
                        <Image style={styles.imgIcon} source={require('../../../assets/icon/icons8-emergency-exit-96.png')} />
                        <Text style={styles.textNameSetting}>Đăng xuất tài khoản</Text>
                    </TouchableOpacity>

                </View>
            </View >

        </ScrollView>
    )
}

export default Setting

const styles = StyleSheet.create({
    boxHome: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: '-5%',
        backgroundColor: 'white'
    },
    container: {

    },
    user: {
        backgroundColor: '#40A19C',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewUser: {
        margin: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imguser: {
        width: '200',
        height: '200',
        borderRadius: 100,
    },
    imgIcon: {
        width: '50',
        height: '50',
        borderRadius: 100,
        marginRight: '5%'
    },
    textNameuser: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    textNameSetting: {
        fontSize: 20,

    },
    boxSetting: {
        borderWidth: 1,
        borderColor: '#C7C6C5',
        margin: '10%',
        alignItems: 'flex-start',
        borderRadius: 10,

    },
    boxContent: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: '5%',
        marginRight: '10%',
        marginLeft: '10%',

    },
})