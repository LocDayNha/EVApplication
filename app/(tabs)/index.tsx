import React ,{useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from "../../src/components/ui/begin/Login";
import Home from "../../src/components/ui/main/Home";
import { CustomTextInput, CustomButton } from "../../src/components/item/Item";

export default function App() {

  const [text, setText] = useState("");

  return (
    <SafeAreaView>
      <CustomTextInput
        value={text}
        onChangeText={setText}
        placeholder="Nhập nội dung..."
      />
      <CustomButton label={'Bấm vào đây'} onPress={() => console.log("Button pressed")} />
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