import React ,{useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeRouter, Routes, Route, Link } from "react-router-native";
import Login from "../../src/components/ui/begin/Login";
import Register from "../../src/components/ui/begin/Register";
import ForgotPass from "../../src/components/ui/begin/ForgotPass"
import Home from "../../src/components/ui/main/Home";
//import HomeOld from "../../src/components/ui/main/HomeOld";
import ViewDetail from "../../src/components/ui/main/ViewDetail";
import Setting from "../../src/components/ui/main/Setting";
import Profile from "../../src/components/ui/main/Profile";
import Verification from "../../src/components/ui/begin/Verification"
import NewPassword from "../../src/components/ui/begin/NewPassword";
import { TextInputBegin, TextInputMain, CustomButton, TextInputProfile, ItemRating } from "../../src/components/item/Item";

export default function App() {
  return (
    <NativeRouter>
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <Link to="/" style={styles.navItem}>
          <Text style={styles.navText}>Home</Text>
        </Link>
        <Link to="/home-old" style={styles.navItem}>
          <Text style={styles.navText}>Home Old</Text>
        </Link>
        <Link to="/view-detail" style={styles.navItem}>
          <Text style={styles.navText}>View Detail</Text>
        </Link>
        <Link to="/login" style={styles.navItem}>
          <Text style={styles.navText}>Login</Text>
        </Link>
        <Link to="/register" style={styles.navItem}>
          <Text style={styles.navText}>Register</Text>
        </Link>
        <Link to="/setting" style={styles.navItem}>
          <Text style={styles.navText}>Setting</Text>
        </Link>
      </View>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/home-old" element={<HomeOld />} /> */}
        <Route path="/view-detail" element={<ViewDetail />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </SafeAreaView>
  </NativeRouter>
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
