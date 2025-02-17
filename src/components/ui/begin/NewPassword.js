import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

const NewPassword = () => {
const [showPassword, setShowPassword] = useState(false);
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
            <TouchableOpacity style={styles.sendButton}>
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
        flex: 1,
        marginBottom: 250

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
        marginBottom: 33,
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
        fontWeight: "semibold",
    },
    textEmail: {
        color: "black",
        fontWeight: 'semibold',
        fontSize: 20,
        marginBottom: 25,
        paddingLeft: 1
    },
})