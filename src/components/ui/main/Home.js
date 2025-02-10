import { StyleSheet, Text, View, Image, Button, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'

const nameChargingStation = [
    { id: '0', name: 'Tram1',location: '123,456',kw:nameKw},
    { id: '1', name: 'Tram1',location: '123,456'},
    { id: '2', name: 'Tram1',location: '123,456'},
    { id: '3', name: 'Tram1',location: '123,456'},
    { id: '4', name: 'Tram1',location: '123,456'},
]

const nameKw = [
    { id: '0', Kw: '60Kw' },
    { id: '1', Kw: '60Kw' },
    { id: '2', Kw: '60Kw' },
    { id: '3', Kw: '60Kw' },
    { id: '4', Kw: '60Kw' },
]


const home = () => {
    return (
        <View >
            {/* Ten nguoi dung */}
            <View style={styles.container}>
                <View>
                    <Image style={styles.img} source={require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg')} />
                </View>
                <View>
                    <Text style={styles.title}>Nguyen Van A</Text>
                    <Text style={styles.title}>Welcom Back</Text>
                </View>
            </View>

            {/* Phuong Tien */}
            <View style={styles.container}>
                <Text style={styles.title}>Phuong Tien :</Text>
            </View>

            <View style={styles.containerVehicle}>
                <TouchableOpacity style={styles.boxVehicle} >
                    <View style={styles.button} >
                        <Image style={styles.imgbutton} source={require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg')} />
                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={styles.boxVehicle} >
                    <View style={styles.button} >
                        <Image style={styles.imgbutton} source={require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg')} />
                    </View>

                </TouchableOpacity><TouchableOpacity style={styles.boxVehicle} >
                    <View style={styles.button} >
                        <Image style={styles.imgbutton} source={require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg')} />
                    </View>

                </TouchableOpacity>
            </View>

            {/* Tram sac gan ban */}

            <View style={styles.container}>
                <Text style={styles.title}>Tram sac gan ban :</Text>
            </View>
            <FlatList
                data={nameChargingStation} renderItem={({ item }) =>
                    <View style={styles.listRow} >
                        <Text  >{item.name}</Text>
                        <Text  >{item.location}</Text>
                        <Text  >{item.kw}</Text>
                        <Text>Dang hoat dong</Text>
                    </View>

                } keyExtractor={(item) => item.id}

            />
        </View>

    )
}

export default home

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'FFFFF',
        margin: '5%',
        marginBottom: '5%',
        flexDirection: 'row'
    },
    containerVehicle: {
        backgroundColor: 'FFFFF',
        margin: '5%',
        marginBottom: '5%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    text: {
        color: 'rgb(0, 0, 0)',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        color: 'rgb(0, 0, 0)',
        fontSize: 16,
        fontWeight: 'bold',
    },
    img: {
        width: 50,
        height: 50,
        marginRight: '2%',
        borderRadius: 30,
    },
    imgbutton: {
        width: 50,
        height: 50,
        marginRight: '2%',
        borderRadius: 30,
    },
    boxVehicle: {
        width: 70,
        height: 70,
        borderRadius: '50%',
        backgroundColor: '#40A19C',
        justifyContent: 'center',

    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listRow: {
        padding: 15,
        marginBottom: 5,
        margin: '5%',
        marginTop: '1.5%',
        marginBottom: '1.5%',
        borderWidth: 1,
        borderColor: '#40A19C',
        borderRadius: 25,
        backgroundColor: 'white'
    },
})