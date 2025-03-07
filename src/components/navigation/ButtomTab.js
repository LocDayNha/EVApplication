import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLOR } from "../../assets/Theme/Theme";

import Login from '../ui/begin/Login';
import Register from '../ui/begin/Register';
import Home from '../ui/main/Home';
import ForgotPass from '../ui/begin/ForgotPass';
import ViewDetail from '../ui/main/ViewDetail';
import SplashScreen from '../ui/begin/SplashScreen';
import Verification from '../ui/begin/Verification';
import CompleteCreate from '../ui/begin/CompleteCreate';
import NewPassword from '../ui/begin/NewPassword';
import List from '../ui/main/ListStation'
import Track from '../ui/main/Track';
import Trip from '../ui/main/Trip';
import MapStation from '../ui/main/MapStation';
import Setting from '../ui/main/Setting';
import Schedule from '../ui/main/Schedule';
import Profile from '../ui/main/Profile';
import FormStation from '../ui/main/FormStation';
import TestAPILocationVN from '../test/TestAPILocationVN';
import Location from '../test/Location';
import TestOpenGoogleMap from '../test/TestOpenGoogleMap';
import TestGoogleMap from '../test/TestGoogleMap';
import UploadImage from '../test/UploadImage';
import MyCar from '../ui/main/mycar/MyCar';
import MyBrandCar from '../ui/main/mycar/MyBrandCar';
import MyVehicleCar from '../ui/main/mycar/MyVehicleCar';
import MyPortCar from '../ui/main/mycar/MyPortCar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabIcon = ({ focused, icon, label }) => (
    <View style={{ alignItems: 'center', width: 70, marginTop: '70%' }}>
        <ImageBackground
            style={{
                width: label === "" ? 70 : null,
                height: label === "" ? 70 : null,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: label === "" ? '60%' : '0%',
            }}
            {...(label === "" && { source: require('../../assets/icon/Ellipse.png') })}
        >
            <Image
                style={{
                    width: label === "" ? 36 : 26,
                    height: label === "" ? 36 : 26,
                    tintColor: focused ? COLOR.green3 : COLOR.gray4,
                }}
                source={icon}
            />
        </ImageBackground>
        <Text style={{ color: focused ? COLOR.green3 : COLOR.gray4, fontSize: 13, fontWeight: '500' }}>
            {label}
        </Text>
    </View>
);

const SettingScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Setting">
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
};

const Tabbar = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    height: 77,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={require('../../assets/images/imagebuttontab/station.png')} label="Trạm sạc" />
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapStation}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={require('../../assets/images/imagebuttontab/map.png')} label="Bản đồ" />
                    ),
                }}
            />
            <Tab.Screen
                name="QR"
                component={MyCar}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={require('../../assets/images/imagebuttontab/qr.png')} label="" />
                    ),
                }}
            />
            <Tab.Screen
                name="Trip"
                component={Trip}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={require('../../assets/images/imagebuttontab/trip.png')} label="Lộ trình" />
                    ),
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={require('../../assets/images/imagebuttontab/setting.png')} label="Cài đặt" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
const Screen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabbar" component={Tabbar} />
        </Stack.Navigator>
    );
};

const ButtomTab = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashSceen" component={SplashScreen} />
            
            <Stack.Screen name="MyCar" component={MyCar} />
            <Stack.Screen name="MyBrandCar" component={MyBrandCar} />
            <Stack.Screen name="MyVehicleCar" component={MyVehicleCar} />
            <Stack.Screen name="MyPortCar" component={MyPortCar} />

            <Stack.Screen name="Screen" component={Screen} />

            <Stack.Screen name="List" component={List} options={{ title: "Trạm sạc của bạn", headerStyle: { backgroundColor: COLOR.green3 }, headerTintColor: "#fff", headerShown: true }} />
            <Stack.Screen name="Profile" component={Profile} options={{ title: "Thông tin cá nhân", headerStyle: { backgroundColor: COLOR.green3 }, headerTintColor: "#fff", headerShown: true }} />
            <Stack.Screen name="ViewDetail" component={ViewDetail} options={{ title: "Chi tiết trạm sạc", headerStyle: { backgroundColor: COLOR.green3 }, headerTintColor: "#fff", headerShown: true, }} />
            <Stack.Screen name="FormStation" component={FormStation} options={{ title: "Thêm trạm sạc", headerStyle: { backgroundColor: COLOR.green3 }, headerTintColor: "#fff", headerShown: true }} />

            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
            <Stack.Screen name="CompleteCreate" component={CompleteCreate} />
        </Stack.Navigator>
    );
};


export default ButtomTab;

const styles = StyleSheet.create({});
