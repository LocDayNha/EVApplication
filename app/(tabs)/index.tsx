import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from "../../src/components/ui/begin/Login";
import Home from "../../src/components/ui/main/Home";
import HomeOld from "../../src/components/ui/main/HomeOld";

import ViewDetail from "../../src/components/ui/main/ViewDetail";



export default function App() {
  return (
    <SafeAreaView>
      <ViewDetail/>
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