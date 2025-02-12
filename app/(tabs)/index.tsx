import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from "../../src/components/ui/begin/Login";
import Register from "../../src/components/ui/begin/Register";
import ForgotPass from "../../src/components/ui/begin/ForgotPass"
import Home from "../../src/components/ui/main/Home";
import { TextInputBegin, TextInputMain, CustomButton, TextInputProfile } from "../../src/components/item/Item";

export default function App() {

  const [text, setText] = useState("");

  return (
    <SafeAreaView>
      <ForgotPass/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});