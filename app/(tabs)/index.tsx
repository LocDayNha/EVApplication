import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from "../../src/components/ui/begin/Login";
import Home from "../../src/components/ui/main/Home";
import { TextInputBegin, TextInputMain, CustomButton, TextInputProfile, ItemRating } from "../../src/components/item/Item";

export default function App() {

  const data = [
    {
      "_id": "1",
      "user_id": {
        "image": "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/dada4ea29dc1fd4732baa59e0fae0b97.jpg?alt=media&token=cdd90126-8993-48e5-aaca-fbfa9013143a",
        "name": "Nguyễn Trần Trung Quốc"
      },
      "star": 4.5,
      "createAt": "12/02/2025 : 13:13",
      "content": "This is an example of content for user John Doe.This is an example of content for user John Doe.This is an example of content for user John Doe.This is an example of content for user John Doe."
    },
    {
      "_id": "2",
      "user_id": {
        "image": "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/dada4ea29dc1fd4732baa59e0fae0b97.jpg?alt=media&token=cdd90126-8993-48e5-aaca-fbfa9013143a",
        "name": "Jane Smith"
      },
      "star": 5,
      "createAt": "11/02/2025 : 10:45",
      "content": "Jane's review content goes here."
    },
    {
      "_id": "3",
      "user_id": {
        "image": "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/dada4ea29dc1fd4732baa59e0fae0b97.jpg?alt=media&token=cdd90126-8993-48e5-aaca-fbfa9013143a",
        "name": "Michael Johnson"
      },
      "star": 3.5,
      "createAt": "10/02/2025 : 08:30",
      "content": "Michael shared his thoughts on this topic."
    }
  ];
  

  const [text, setText] = useState("");

  return (
    <FlatList
    data={data}
    renderItem={({item}) => <ItemRating data={item} />}
    keyExtractor={item => item._id}
    numColumns={1}
    showsVerticalScrollIndicator={false}
    />
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