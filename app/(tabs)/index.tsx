import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from "../../src/components/ui/begin/Login";
import Register from "../../src/components/ui/begin/Register";
import ForgotPass from "../../src/components/ui/begin/ForgotPass"
import Home from "../../src/components/ui/main/Home";
import ViewDetail from "../../src/components/ui/main/ViewDetail";
import Setting from "../../src/components/ui/main/Setting";
import Profile from "../../src/components/ui/main/Profile";
import Verification from "../../src/components/ui/begin/Verification"
import NewPassword from "../../src/components/ui/begin/NewPassword";
import TestAPILocationVN from "../../src/components/test/TestAPILocationVN"
import ButtomTab from "../../src/components/navigation/ButtomTab";
import { AppContextProvider } from "../../src/components/axios/AppContext"
import { TextInputBegin, TextInputMain, CustomButton, TextInputProfile, ItemRating } from "../../src/components/item/Item";
//import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_500Medium_Italic, Roboto_500Medium} from '@expo-google-fonts/roboto';
//import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading'
export default function App() {
  return (
    <AppContextProvider>
      <ButtomTab />
    </AppContextProvider>
  );
}
