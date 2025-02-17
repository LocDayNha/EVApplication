import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "../../src/components/ui/main/Home";
import ViewDetail from "../../src/components/ui/main/ViewDetail";
import Login from "../../src/components/ui/begin/Login";
import Setting from "../../src/components/ui/main/Setting";
import Profile from "../../src/components/ui/main/Profile";
import List from "../../src/components/ui/main/ListStation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home"  component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="ViewDetail" component={ViewDetail} options={{ title: "Chi tiết trạm sạc" ,headerStyle: { backgroundColor: "#40A19C" },headerTintColor: "#fff",}}/>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }}/>
      <Stack.Screen name="Profile" component={Profile} options={{ title: "Thông tin cá nhân" ,headerStyle: { backgroundColor: "#40A19C" },headerTintColor: "#fff",}}/>
      <Stack.Screen name="List" component={List} options={{ headerShown: false }}/>
    </Stack.Navigator>
   
    

  );
}
