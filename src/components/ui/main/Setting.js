import { StyleSheet, Text, View, Image, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../axios/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR, SIZE } from "../../../assets/Theme/Theme";

const Setting = () => {
    const navigation = useNavigation();

    const { infoUser, idUser, setIsLogin, setIdUser, setInfoUser } = useContext(AppContext);

    const name = infoUser?.name || "Nguyễn Vô Danh";
    const image = infoUser?.image || "https://vivureviews.com/wp-content/uploads/2022/08/avatar-vo-danh-6.png";

    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    const Logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            setIsLogin(false);
            setInfoUser(null);
            setIdUser(null);

            // navigateToLogin();
        } catch (error) {
            ToastAndroid.show('Có lỗi xảy ra, vui lòng thử lại', ToastAndroid.SHORT);
        }
    };

    return (
        <ScrollView >
            <Text style={{ margin: '5%', fontSize: SIZE.size20, fontWeight: 'bold' }} > Cài đặt </Text>

            {infoUser && idUser ?
                <>
                    <TouchableOpacity style={styles.viewUser} onPress={() => navigation.navigate("Profile")}>
                        <Image style={styles.imguser} source={{ uri: image }} />
                        <Text style={styles.textNameuser} >{name}</Text>
                    </TouchableOpacity>
                </>
                :
                null
            }
            {/* <View style={styles.user}>

            </View> */}

            <View style={styles.boxSetting}>

                {infoUser && idUser ?
                    <>

                        <TouchableOpacity style={styles.boxContent} onPress={() => navigation.navigate("List")}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Image style={styles.imgIcon} source={require('../../../assets/icon/icons8-car-charger-48.png')} />
                                <Text style={styles.textNameSetting}>Trạm sạc của bạn </Text>
                            </View>

                            <Image style={{ width: 20, height: 20, }} source={require('../../../assets/icon/icons8-next-96.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.boxContent} onPress={() => navigation.navigate("Profile")}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }} >
                                <Image style={styles.imgIcon} source={require('../../../assets/icon/icons8-user-96.png')} />
                                <Text style={styles.textNameSetting}>Quản lý thông tin cá nhân  </Text>
                            </View>

                            <Image style={{ width: 20, height: 20, }} source={require('../../../assets/icon/icons8-next-96.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')} style={styles.boxContent}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Image style={styles.imgIcon} source={require('../../../assets/icon/icons8-password-96.png')} />
                                <Text style={styles.textNameSetting}>Đổi mật khẩu</Text>
                            </View>

                            <Image style={{ width: 20, height: 20, }} source={require('../../../assets/icon/icons8-next-96.png')} />
                        </TouchableOpacity>

                    </>
                    :
                    null
                }

                <TouchableOpacity style={styles.boxContent}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Image style={styles.imgIcon} source={require('../../../assets/icon/icons8-mail-96.png')} />
                        <Text style={styles.textNameSetting}>Liên hệ chúng tôi </Text>
                    </View>

                    <Image style={{ width: 20, height: 20, }} source={require('../../../assets/icon/icons8-next-96.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.boxContent}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Image style={styles.imgIcon} source={require('../../../assets/icon/icons8-moon-symbol-96.png')} />
                        <Text style={styles.textNameSetting}>Chế độ tối </Text>
                    </View>

                    <Image style={{ width: 20, height: 20, }} source={require('../../../assets/icon/icons8-next-96.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.boxContent}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.imgIcon} source={require('../../../assets/icon/icons8-star-96.png')} />
                        <Text style={styles.textNameSetting}>Đánh giá ứng dụng</Text>
                    </View>

                    <Image style={{ width: 20, height: 20, }} source={require('../../../assets/icon/icons8-next-96.png')} />
                </TouchableOpacity>

            </View>

            {infoUser && idUser ?
                <>
                    <View style={styles.boxSetting}>
                        <TouchableOpacity style={styles.boxContent2} onPress={Logout}>
                            <Image style={styles.imgIcon} source={require('../../../assets/icon/logout.png')} />
                            <Text style={styles.textNameSetting}>Đăng xuất tài khoản</Text>
                        </TouchableOpacity>
                    </View>
                </>
                :
                <>
                    <View style={styles.boxSetting}>
                        <TouchableOpacity style={styles.boxContent2} onPress={() => navigation.navigate("Login")}>
                            <Image style={styles.imgIcon} source={require('../../../assets/icon/login.png')} />
                            <Text style={styles.textNameSetting}>Đăng nhập tài khoản</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }

        </ScrollView>
    )
}

export default Setting

const styles = StyleSheet.create({
    boxHome: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
        borderRadius: 10,
        flexDirection: 'row',
        margin: '5%',
        marginTop: '0%',
        padding: '5%',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imguser: {
        width: '50',
        height: '50',
        borderRadius: 100,
        marginRight: '5%'
    },
    imgIcon: {
        width: '30',
        height: '30',
        //    borderRadius:30,
        marginRight: '5%'
    },
    textNameuser: {
        fontSize: SIZE.size18,
        fontWeight: 'bold',

    },
    textNameSetting: {
        fontSize: SIZE.size16,

    },
    boxSetting: {
        borderColor: '#C7C6C5',
        margin: '5%',
        marginTop: '0%',
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingTop: '2.5%',
        paddingBottom: '2.5%'
    },
    boxContent2: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: '5%',
        marginRight: '5%',
        marginLeft: '5%',
        marginTop: '2.5%',
        marginBottom: '2.5%',

    },
    boxContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '5%',
        marginRight: '5%',
        marginLeft: '5%',
        marginTop: '2.5%',
        marginBottom: '2.5%',

    },
})