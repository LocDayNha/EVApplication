import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';
import RNPickerSelect from 'react-native-picker-select';
import { CustomButton } from '../../item/Item';
import { COLOR, SIZE } from "../../../assets/Theme/Theme";

const Schedule = () => {
    const [value,setValue] = useState();
    return (

        <ScrollView style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',margin:'5%' }}>
                <Text style={{ fontSize: SIZE.size14, }}>Phạm vi hoạt động của phương tiện </Text>
                <View style={{
                    backgroundColor: COLOR.green3,
                    padding: 10,
                    borderRadius: 30,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Text style={{ fontSize: SIZE.size16, color: 'white' }}>{value}</Text>
                </View>
            </View>

            <View style={{ alignItems: 'center' }}>
                <Slider
                    style={{ width: '80%', height: 50 }}
                    minimumValue={0}
                    maximumValue={200}
                    step={1}
                    minimumTrackTintColor= {COLOR.green3}
                    maximumTrackTintColor="grey"
                    thumbTintColor={COLOR.green3}
                    onValueChange={setValue}
                />
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: '10%' }}>
                <Text style={{ fontSize: SIZE.size18, }}>0</Text>
                <Text style={{ fontSize: SIZE.size18, }}>200</Text>
            </View>

            <View style={{ alignItems: 'center', margin: '5%' }}>
                <CustomButton label={'Tìm kiếm theo lộ trình'} />
            </View>
        </ScrollView>
    )
}

export default Schedule

const styles = StyleSheet.create({
    container: {
        marginTop: '5%',
        backgroundColor: ''
    },

    
});
