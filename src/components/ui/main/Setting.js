import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigate } from "react-router-native";


const Setting = () => {
    const navigate = useNavigate();
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
                    <TouchableOpacity style={styles.boxContent} onPress={() => navigate("/profile")}>
                        <Image style={styles.imgIcon} source={require('../../../assets/icon//iconUser.png')} />
                        <Text style={styles.textNameSetting}>Thông tin người dùng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxContent}>
                        <Image style={styles.imgIcon} source={require('../../../assets/icon/iconMail.png')} />
                        <Text style={styles.textNameSetting}>Liên hệ chúng tôi </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxContent}>
                        <Image style={styles.imgIcon} source={require('../../../assets/icon/iconDarkMode.png')} />
                        <Text style={styles.textNameSetting}>Chế độ tối </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxContent}>
                        <Image style={styles.imgIcon} source={require('../../../assets/icon/iconRate.png')} />
                        <Text style={styles.textNameSetting}>Đánh giá ứng dụng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxContent}>
                        <Image style={styles.imgIcon} source={require('../../../assets/icon/IconExit.png')} />
                        <Text style={styles.textNameSetting}>Thoát</Text>
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