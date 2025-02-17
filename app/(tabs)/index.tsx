import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Login from "../../src/components/ui/begin/Login";
import Home from "../../src/components/ui/main/Home";
//import HomeOld from "../../src/components/ui/main/HomeOld";
import ViewDetail from "../../src/components/ui/main/ViewDetail";
import Setting from "../../src/components/ui/main/Setting";
import Profile from "../../src/components/ui/main/Profile";
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#ddd",
  },
  navItem: {
    padding: 5,
  },
  navText: {
    fontSize: 16,
    color: "blue",
  },
});
