import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


const TestGoogleMap = () => {
    return (
        <View >
          <MapView style={styles.mapView}/>
        </View>
    )
}

export default TestGoogleMap

const styles = StyleSheet.create({
    mapView:{
        width:'100%',
        height:'100%'
    }
})