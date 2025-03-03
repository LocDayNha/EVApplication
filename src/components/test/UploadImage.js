import React, { Children, useState } from "react";
import { View, Button, Image, ToastAndroid, Text, Alert, Touchable, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { firebase } from '../../../config';

const UploadImage = () => {
    const [imageUser, setImageUser] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled && result.assets.length > 0) {
            setImageUser(result.assets[0].uri);
        }
    }

    const uploadImageToFirebase = async () => {
        try {
            const { uri } = await FileSystem.getInfoAsync(imageUser);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError('Request failed !'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });

            console.log('Chose Image:', uri);

            const fileName = imageUser.substring(imageUser.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(fileName);

            await ref.put(blob);

            const url = await ref.getDownloadURL();
            setImageUrl(url);
            setImageUser(null);
            console.log("Image URL:", url);
            return url; 
        } catch (error) {
            console.log(error);
        }
    }

    const result = async () => {
        const uploadedImageUrl = await uploadImageToFirebase();
        console.log('Result:',uploadedImageUrl);
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            <Text>{imageUrl}</Text>
            <TouchableOpacity onPress={pickImage} style={{ width: 100, height: 50, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <Text style={{ color: 'white' }}>Get Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={uploadImageToFirebase} style={{ width: 100, height: 50, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <Text style={{ color: 'white' }}>Upload Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={result} style={{ width: 100, height: 50, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <Text style={{ color: 'white' }}>Result</Text>
            </TouchableOpacity>
            {imageUser && <Image source={{ uri: imageUser }} style={{ width: '95%', height: 300, }} />}

        </View>
    );
};

export default UploadImage;