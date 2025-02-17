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
import ButtomTab from "../../src/components/navigation/ButtomTab";
import { AppContextProvider } from "../../src/components/axios/AppContext"
import { TextInputBegin, TextInputMain, CustomButton, TextInputProfile, ItemRating } from "../../src/components/item/Item";

export default function App() {
  return (
    <AppContextProvider>
      <ButtomTab />
    </AppContextProvider>
  );
}
