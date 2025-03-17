import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';

const CustomToast = ({ text1, text2, color, icon }) => (
    <View style={[styles.toastContainer, { borderLeftColor: color }]}>
        {/* <View style={[styles.viewIcon, { backgroundColor: color }]}>
            <Text style={[styles.textIcon]}>{icon}</Text>
        </View> */}
        <View style={styles.textContainer}>
            <Text style={[styles.text1, { color }]}>{text1}</Text>
            <Text style={styles.text2}>{text2}</Text>
        </View>
        <TouchableOpacity onPress={() => Toast.hide()} style={styles.closeButton}>
            <Text style={styles.closeText}>✖</Text>
        </TouchableOpacity>
    </View>
);

const toastConfig = {
    success: (props) => <CustomToast {...props} text1='Thành công' color="#28a745" icon="✔" />,
    error: (props) => <CustomToast {...props} text1='Lỗi' color="#dc3545" icon="!" />,
    warning: (props) => <CustomToast {...props} text1='Cảnh báo' color="#ffc107" icon="⚠" />,
    info: (props) => <CustomToast {...props} text1='Thông tin' color="#17a2b8" icon="i" />,
};

const styles = StyleSheet.create({
    toastContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 6,
        marginHorizontal: 16,
        marginVertical: 5,
        elevation: 5,
    },
    viewIcon: {
        width: 26,
        height: 26,
        marginRight: 10,
        padding: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textIcon: {
        fontSize: 14,
        color: 'white',
    },
    textContainer: {
        flex: 1,
    },
    text1: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 14,
        color: '#000000',
    },
    closeButton: {
        padding: 5,
    },
    closeText: {
        fontSize: 16,
        color: '#000000',
    },
});

export default toastConfig;
