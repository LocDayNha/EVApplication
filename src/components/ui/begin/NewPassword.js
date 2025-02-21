import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading'

const NewPassword = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);

    let [fontLoaded] = useFonts({
        Roboto_500Medium,
        Poppins_600SemiBold
      })
      if (!fontLoaded) {
        return <AppLoading/>
      }

    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../../../assets/images/image1.png')} style={styles.image} />
            </View>
            <View>
                <Text style={styles.textEmail}>Tạo mật khẩu mới</Text>
                <View style={styles.inputContainer}>
                    <Image source={require('../../../assets/icon/key.png')} style={styles.img} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={"#D9D9D9"}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image source={require('../../../assets/icon/eye.png')} style={styles.img} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../../assets/icon/key.png')} style={styles.img} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={"#D9D9D9"}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image source={require('../../../assets/icon/eye.png')} style={styles.img} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.sendButton} onPress={() => navigation.navigate('CompleteCreate')}>
                <Text style={styles.textSend}>Hoàn thành</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NewPassword

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        
    },
    image: {
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },

    img: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    inputContainer: {
        width: "100%",
        height: 50,
        paddingLeft: 16,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 10,
        marginBottom: 12,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    input: {
        flex: 1,
        width: "100%",
        height: "100%",
        fontSize: 16,
        textAlignVertical: "center",
        paddingLeft: 8,

    },
    sendButton: {
        backgroundColor: "#3FA79B",
        width: "100%",
        padding: 15,
        borderRadius: 100,
        alignItems: "center",
        marginTop: 10
    },
    textSend: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "Poppins_600SemiBold",
    },
    textEmail: {
        color: "black",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 20,
        marginBottom: 25,
        paddingLeft: 1
    },
})