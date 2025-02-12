// import { StyleSheet, Text, View, Image, Button, TouchableOpacity, FlatList, SectionList, ImageBase } from 'react-native';
// import React, { useState } from 'react';




// const nameChargingStation = [
//     { id: '0', name: 'Tram1', location: '123,456' },
//     { id: '1', name: 'Tram1', location: '123,456' },
//     { id: '2', name: 'Tram1', location: '123,456' },
//     { id: '3', name: 'Tram1', location: '123,456' },
//     { id: '4', name: 'Tram1', location: '123,456' },
// ]

// const nameKw = [
//     { id: '0', Kw: ['60Kw', '60Kw', '60Kw'] },
//     { id: '1', Kw: ['60Kw', '60Kw', '60Kw'] },
//     { id: '2', Kw: ['60Kw', '60Kw', '60Kw'] },
//     { id: '3', Kw: ['60Kw', '60Kw', '60Kw'] },
//     { id: '4', Kw: ['60Kw', '60Kw', '60Kw'] },
// ];

// const services = [
//     { id: '0', name: 'Đồ ăn' },
//     { id: '1', name: 'Khách Sạn' },
//     { id: '2', name: 'Giữ xe' },
//     { id: '3', name: 'Trạm sạc' },
//     { id: '4', name: 'Nhà vệ sinh' },
// ];

// const imageBrand = [
//     require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg'),
//     require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg'),
//     require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg'),
//     require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg'),
//     require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg'),
//     require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg'),
//     require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg'),
//     require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg'),
//     require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg'),
// ];



// const mergedData = nameChargingStation.map(station => {
//     const kwData = nameKw.find(kw => kw.id === station.id);
//     return { ...station, kw: kwData ? kwData.Kw.join(', ') : 'N/A' };
// });





// const home = () => {
//     const [showChargingStations, setShowChargingStations] = useState(true);

//     const [changeColor, setChangeColor] = useState(true);



//     return (
//         <View  >
//             {/* Ten nguoi dung */}
//             <View style={styles.container}>
//                 <View>
//                     <Image style={styles.img} source={require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg')} />
//                 </View>
//                 <View>
//                     <Text style={styles.titleContainer}>Nguyen Van A</Text>
//                     <Text style={styles.titleContainer}>Welcom Back</Text>
//                 </View>
//             </View>

//             {/* Phuong Tien */}
//             <View style={styles.container}>
//                 <Text style={styles.title}>Phuong Tien :</Text>
//             </View>

//             <View style={styles.containerVehicle}>

//                 <TouchableOpacity style={styles.boxVehicle} >
//                     <View style={styles.buttonVehicle} >
//                         <Image style={styles.imgVehicle} source={require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg')} />
//                     </View>
//                 </TouchableOpacity>


                
//                 {!changeColor == showChargingStations ? (
//                     <TouchableOpacity onPress={() => setShowChargingStations(!showChargingStations) && setChangeColor(!changeColor)} style={styles.boxVehicle}  >
//                         <View style={styles.buttonVehicle} >
//                             <Image style={styles.imgVehicle} source={require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg')} />
//                         </View>
//                     </TouchableOpacity>
//                 ) : (
//                     <TouchableOpacity onPress={() => setShowChargingStations(!showChargingStations)} style={[styles.boxVehicle2]}  >
//                         <View style={[styles.buttonVehicle]} >
//                             <Image style={styles.imgVehicle} source={require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg')} />
//                         </View>
//                     </TouchableOpacity>
//                 )}


//                 <TouchableOpacity style={styles.boxVehicle} >
//                     <View style={styles.buttonVehicle} >
//                         <Image style={styles.imgVehicle} source={require('./image/054_the_sinful_spoils_hunter_fiend_by_virgo4th_dg4snis-pre.jpg')} />
//                     </View>
//                 </TouchableOpacity>
//             </View>


//             {/* Tram sac gan ban */}
//             {showChargingStations ? (

//                 <View>
//                     <View style={styles.container}>
//                         <Text style={styles.title}>Tram sac gan ban :</Text>
//                     </View>
//                     <View style={{ height: '55%' }}>
//                         <FlatList
//                             data={mergedData}
//                             keyExtractor={(item) => item.id}
//                             renderItem={({ item }) => (
//                                 <View style={styles.listRow}>
//                                     <View style={styles.viewLocation}>
//                                         <Image style={styles.imgLocation} source={require('./image/icons8-location-50.png')} />
//                                         <View>
//                                             <Text style={styles.textItemName}>{item.name}</Text>
//                                             <Text style={styles.textItemLocation}>{item.location}</Text>
//                                         </View>
//                                     </View>
//                                     <View style={styles.viewKw}>
//                                         <Image style={styles.imgFlash} source={require('./image/icons8-flash-50 (1).png')} />
//                                         <Text style={styles.textItemKw} >{item.kw}</Text>
//                                     </View>
//                                     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: '3%', marginRight: '3%' }}>
//                                         <Text style={styles.textItemStatus}>Đang hoạt động</Text>
//                                         <TouchableOpacity>
//                                             <View style={styles.viewButtonItem} >
//                                                 <Text style={{ color: 'white' }}>
//                                                     3.5Km
//                                                 </Text>
//                                                 <Image style={styles.imgNext} source={require('./image/icons8-arrow-64.png')} />
//                                             </View>
//                                         </TouchableOpacity>
//                                     </View>

//                                 </View>
//                             )}
//                         />
//                     </View>

//                 </View>
//             ) : null}


//             {/* Thuong Hieu*/}
//             <View style={styles.container2}>
//                 <Text style={styles.title}>Thuong Hieu :</Text>
//             </View>

//             <View style={styles.containerBrand}>
//                 <FlatList
//                     data={imageBrand}
//                     keyExtractor={(item, index) => index.toString()}
//                     numColumns={5}
//                     columnWrapperStyle={{ justifyContent: 'flex-start' }}
//                     renderItem={({ item }) => (
//                         <TouchableOpacity
//                             onPress={() => setShowChargingStations(!showChargingStations)}
//                             style={styles.listBrand}>
//                             <View style={styles.buttonBrand}>
//                                 <Image style={styles.imgBrand} source={item} />
//                             </View>
//                         </TouchableOpacity>
//                     )}
//                 />

//             </View>

//             {/* Dịch Vụ*/}
//             <View style={styles.container3}>
//                 <Text style={styles.title}>Dịch Vụ:</Text>
//             </View>
//             <View style={styles.containerService}>
//                 <View >
//                     <FlatList
//                         horizontal={true}
//                         data={services}
//                         keyExtractor={(item) => item.id}
//                         renderItem={({ item }) => (
//                             <TouchableOpacity onPress={() => setShowChargingStations(!showChargingStations)} style={styles.listService} >
//                                 <View style={styles.buttonService} >
//                                     <Text style={styles.textService}>{item.name}</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         )}
//                     />
//                 </View>
//             </View>

//             {/* Button */}
//             <TouchableOpacity style={styles.buttonSearch} >
//                 <Text style={styles.textSearch}>Tìm Kiếm </Text>
//             </TouchableOpacity>

//         </View>

//     )
// }

// export default home

// const styles = StyleSheet.create({


//     container: {
//         backgroundColor: 'FFFFF',
//         margin: '5%',
//         marginBottom: '5%',
//         flexDirection: 'row'
//     },
//     container2: {
//         backgroundColor: 'FFFFF',
//         margin: '5%',
//         marginBottom: '0%',
//         flexDirection: 'row'
//     },
//     container3: {
//         backgroundColor: 'FFFFF',
//         margin: '5%',
//         marginBottom: '0%',
//         marginTop: '0%',
//         flexDirection: 'row'
//     },
//     containerVehicle: {
//         backgroundColor: 'FFFFF',
//         margin: '5%',
//         marginBottom: '5%',
//         flexDirection: 'row',
//         justifyContent: 'space-evenly'
//     },
//     containerBrand: {
//         backgroundColor: 'FFFFF',
//         margin: '5%',
//         marginBottom: '5%',
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },
//     containerService: {
//         backgroundColor: 'FFFFF',
//         margin: '5%',
//         marginBottom: '5%',
//         flexDirection: 'row',
//     },
//     text: {
//         color: 'rgb(0, 0, 0)',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     textService: {
//         color: '#544C4C',
//         fontSize: 16,
//     },
//     text: {
//         color: 'rgb(0, 0, 0)',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     textSearch: {
//         color: 'rgb(255, 255, 255)',
//         fontSize: 16,
//     },
//     textItemName: {
//         color: 'rgb(0, 0, 0)',
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     textItemLocation: {
//         color: '#544C4C',
//         fontSize: 16,
//     },
//     textItemKw: {
//         color: '#40A19C',
//         fontSize: 16,
//     },
//     textItemStatus: {
//         color: '#2F9465',
//         fontSize: 16,

//     },
//     viewLocation: {
//         flexDirection: 'row',

//     },
//     viewKw: {
//         flexDirection: 'row',
//         marginLeft: '10%'
//     },
//     viewButtonItem: {
//         width: 90,
//         height: 30,
//         flexDirection: 'row',
//         backgroundColor: '#40A19C',
//         justifyContent: 'space-evenly',
//         alignItems: 'center',
//         borderRadius: 30,
//         color: 'white',
//     },

//     title: {
//         color: 'rgb(0, 0, 0)',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     titleContainer: {
//         color: 'rgb(0, 0, 0)',
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     img: {
//         width: 50,
//         height: 50,
//         marginRight: '2%',
//         borderRadius: 30,
//     },
//     imgVehicle: {
//         width: 45,
//         height: 45,
//         marginRight: '2%',
//         borderRadius: 30,
//     },
//     imgBrand: {
//         width: 50,
//         height: 50,
//         marginRight: '2%',
//         borderRadius: 30,
//         backgroundColor: '#EDEDED',
//         elevation: 5,
//     },
//     imgLocation: {
//         width: 40,
//         height: 40,
//         borderRadius: 30,
//     },
//     imgFlash: {
//         width: 20,
//         height: 20,
//         borderRadius: 30,
//     },
//     imgNext: {
//         width: 30,
//         height: 30,
//     },
//     boxVehicle: {
//         width: 70,
//         height: 70,
//         borderRadius: 35,
//         backgroundColor: '#EDEDED',
//         justifyContent: 'center',
//         elevation: 5,

//     },boxVehicle2: {
//         width: 70,
//         height: 70,
//         borderRadius: 35,
//         backgroundColor: 'red',
//         justifyContent: 'center',
//         elevation: 5,

//     },
//     boxChange: {
//         width: 70,
//         height: 70,
//         borderRadius: 35,
//         backgroundColor: 'rgb(227, 52, 52)',
//         justifyContent: 'center',
//         elevation: 5,

//     },
//     boxbrand: {
//         width: 50,
//         height: 50,
//         borderRadius: 35,
//         backgroundColor: '#40A19C',
//         justifyContent: 'center',
//         elevation: 5,
//         marginLeft: '3%',
//         marginRight: '3%',
//         marginBottom: '3%'
//     },
//     boxService: {
//         height: 50,
//         borderRadius: 35,
//         backgroundColor: '#40A19C',
//         justifyContent: 'center',
//         elevation: 5,
//         marginLeft: '3%',
//         marginRight: '3%',
//         paddingLeft: '3%',
//         paddingRight: '3%',
//     },
//     buttonVehicle: {
//         justifyContent: 'center',
//         alignItems: 'center',

//     },
//     buttonBrand: {
//         justifyContent: 'center',
//         alignItems: 'center',

//     },
//     buttonService: {
//         justifyContent: 'center',
//         alignItems: 'center',

//     },
//     buttonSearch: {
//         position: 'absolute',
//         bottom: '-20%',
//         left: '50%',
//         transform: [{ translateX: -75 }],
//         backgroundColor: '#40A19C',
//         paddingVertical: 15,
//         paddingHorizontal: 30,
//         borderRadius: 30,
//         elevation: 5,
//         color: 'white',
//     },
//     listRow: {
//         padding: 15,
//         marginBottom: 5,
//         margin: '5%',
//         marginTop: '1.5%',
//         marginBottom: '1.5%',
//         borderWidth: 1,
//         borderColor: '#40A19C',
//         borderRadius: 25,
//         backgroundColor: 'white',
//         elevation: 5,
//     },
//     listService: {
//         padding: 15,
//         marginBottom: 5,
//         margin: '5%',
//         marginTop: '1.5%',
//         marginBottom: '1.5%',
//         borderWidth: 0.5,
//         borderColor: '#40A19C',
//         borderRadius: 25,
//         backgroundColor: 'white',
//         elevation: 5,
//     },
//     listBrand: {
//         width: 50,
//         height: 50,
//         borderRadius: 35,
//         backgroundColor: '#40A19C',
//         justifyContent: 'center',
//         elevation: 5,
//         marginLeft: '3%',
//         marginRight: '3%',
//         marginBottom: '3%',

//     },
// })