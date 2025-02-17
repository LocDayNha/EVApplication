import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const ForgotPass = () => {
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../../../assets/images/image1.png')} style={styles.image} />
            </View>
            <View>
                <Text style={styles.textEmail}>Nhập email của bạn</Text>
                <View style={styles.inputContainer}>
                    <Image source={require('../../../assets/icon/email.png')} style={styles.img} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={"#D9D9D9"}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.sendButton}>
                <Text style={styles.textSend}>Gửi</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ForgotPass

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        
    },
    image: {
        marginTop: 44,
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
        marginBottom: 14,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
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
        marginTop: 30
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