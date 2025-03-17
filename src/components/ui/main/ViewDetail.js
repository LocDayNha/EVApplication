import { StyleSheet, Text, View, Platform, TouchableWithoutFeedback, Keyboard, ToastAndroid, ScrollView, Linking, Image, FlatList, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import { TextInputProfile, CustomButton, ItemRating } from '../../item/Item'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AxiosInstance from '../../axios/AxiosInstance';
import { AppContext } from '../../axios/AppContext';
import { COLOR, SIZE } from "../../../assets/Theme/Theme";


const ViewDetail = () => {
    const route = useRoute();
    const { id } = route.params;
    const navigation = useNavigation();

    // gioi han hien thi danh gia
    const [limit, setLimit] = useState(1);
    // gioi han moi lan xem them
    const countRate = (Rate) => {
        return Rate.length;
    };

    const [modalVisible, setModalVisible] = useState(false);

    // lat lng
    const { myLat, myLng, idUser, infoUser } = useContext(AppContext);
    const openGoogleMaps = async () => {
        try {
            const linkTrack = await AxiosInstance().post('/station/testGoogleMapTrack', {
                lat1: myLat, lng1: myLng, lat2: dataStation.lat, lng2: dataStation.lng
            });
            if (linkTrack.url) {
                Linking.openURL(linkTrack.url).catch(err => Alert.alert("Error", "Failed to open Google Maps"));
            } else {
                console.log('Không tìm thấy dữ liệu từ /station/testGoogleMapTrack');
                ToastAndroid.show('Không thể chỉ đường', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
            ToastAndroid.show('Không thể thực hiện chỉ đường do hẹ thống', ToastAndroid.SHORT);
        }
    };

    // Hàm lấy thông tin trạm sạc từ API
    const [dataStation, setDataStation] = useState(null);
    const getDataStationById = async () => {
        try {
            const dataStation = await AxiosInstance().post('/station/getById', { id: id });
            if (dataStation.data) {
                setDataStation(dataStation.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /station/getById');
                ToastAndroid.show('Không có thông tin trạm sạc', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
            ToastAndroid.show('Không thể tải danh sách thông tin trạm sạc', ToastAndroid.SHORT);
        }
    };

    // Hàm lấy thông tin đánh giá trạm sạc từ API
    const [dataRating, setDataRating] = useState(null);
    const getDataRating = async () => {
        try {
            const dataRating = await AxiosInstance().post('/rating/getByIdStation', { id: id });
            if (dataRating.data) {
                setDataRating(dataRating.data);
            } else {
                console.log('Không tìm thấy dữ liệu từ /rating/getByIdStation');
                ToastAndroid.show('Không có thông tin đánh giá trạm sạc', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
            ToastAndroid.show('Không thể tải danh sách thông tin đánh giá trạm sạc', ToastAndroid.SHORT);
        }
    };

    const clickRating = () => {
        if (!infoUser || !idUser) {
            ToastAndroid.show('Cần đăng nhập để đánh giá', ToastAndroid.SHORT);
            navigation.navigate('Login');
        } else {
            setModalVisible(true);
        }
    }

    // rating
    const [textContent, setTextContent] = useState(null);
    const [starRating, setStarRating] = useState(0);
    const submitRating = async () => {
        if (!textContent || starRating <= 0 || textContent.trim() === '') {
            ToastAndroid.show('Vui lòng không để trống', ToastAndroid.SHORT);
        } else {
            try {
                const dataRating = await AxiosInstance().post('/rating/addNew',
                    {
                        user_id: idUser, station_id: id, content: textContent, star: starRating
                    }
                );
                if (dataRating && dataRating.addNew) {
                    getDataRating();
                    setModalVisible(false);
                    ToastAndroid.show('Đánh giá thành công', ToastAndroid.SHORT);
                } else {
                    console.log('Đánh giá thất bại /rating/addNew');
                    ToastAndroid.show('Đánh giá không thành cong', ToastAndroid.SHORT);
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu rating:', error);
                ToastAndroid.show('Lỗi hệ thống', ToastAndroid.SHORT);
            }
        }
    }

    // Hook effect khởi tạo dữ liệu
    useEffect(() => {
        getDataStationById();
        getDataRating();
    }, []);

    return (
        <View>

            <ScrollView style={[styles.container,]} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: '20%' }} >

                {dataStation && (
                    <>
                        <View style={styles.imgMain} >
                            <Image style={{ width: '100%', height: 300 }} source={{ uri: dataStation.image }} />
                        </View>
                        <View style={styles.boxMain}>
                            {dataStation.brand_id.name !== 'Không' ?
                                <Text style={styles.textName}>{dataStation.brand_id.name} - {dataStation.name}</Text>
                                :
                                <Text style={styles.textName}>{dataStation.name}</Text>
                            }
                            <View style={styles.detailStation}>
                                <Image style={styles.imgIconMain} source={require('../../../assets/icon/icons8-location-94.png')} />
                                <Text style={styles.textMain}>{dataStation.location}</Text>
                            </View>

                            <View style={{ width: '100%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', margin: '2%', marginRight: '3%', marginLeft: '3%', }}>
                                    <Text style={{ fontSize: SIZE.size14, color: 'black' }}>Nơi đặt trạm sạc: </Text>
                                    <Text style={{ fontSize: SIZE.size14, color: 'black', fontWeight: '500' }}>{dataStation.address.name}</Text>
                                </View>
                                <View style={styles.detailStation}>
                                    <Text style={{ fontSize: SIZE.size14, color: 'black' }}>Địa điểm: </Text>
                                    <Text style={{ fontSize: SIZE.size14, color: 'black', fontWeight: '500' }}>{dataStation.access}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', margin: '2%', marginRight: '3%', marginLeft: '3%' }}>
                                    <Text style={{ fontSize: SIZE.size14, color: 'black' }}>Thời gian hoạt động: </Text>
                                    <Text style={{ fontSize: SIZE.size14, color: 'black', fontWeight: '500' }}>{dataStation.time}</Text>
                                </View>
                                <View style={styles.detailStation}>
                                    <Text style={{ fontSize: SIZE.size14, color: 'black' }}>Trạng thái: </Text>
                                    <Text style={[
                                        styles.textMain22,
                                        {
                                            fontWeight: '500',
                                            color: dataStation?.isActive === 1 ? COLOR.yellow :
                                                dataStation?.isActive === 2 ? COLOR.green3 :
                                                    dataStation?.isActive === 4 ? COLOR.darkGray :
                                                        COLOR.darkRed
                                        }
                                    ]}>
                                        {dataStation?.isActive === 1 ? 'Chờ phê duyệt' :
                                            dataStation?.isActive === 2 ? 'Đang hoạt động' :
                                                dataStation?.isActive === 4 ? 'Dừng hoạt động' :
                                                    dataStation?.isActive === 3 ? 'Bị từ chối' :
                                                        'Không xác định'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {/* Dich Vu  */}
                        <View style={{
                            margin: '5%', marginTop: 0, backgroundColor: 'white', borderRadius: 10, paddingTop: 10, shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }} >
                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={styles.textInfoService}> Dịch vụ </Text>
                            </View>
                            <FlatList
                                data={dataStation.service.map(item => item.service_id)}
                                showsHorizontalScrollIndicator={false}
                                scrollEnabled={false}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <View style={styles.viewService} >
                                        <Image style={styles.imgServies} source={{ uri: item.image }} />
                                        <Text style={styles.textService}>
                                            {item.name}
                                        </Text>
                                    </View>

                                )}
                            />

                            {/* ghi chú dịch vụ  */}
                            <View>
                                <Text style={[styles.textInfoService, { marginLeft: '5%', marginBottom: '2%' }]}>Ghi chú</Text>
                                <Text style={styles.textNote}>{dataStation.note}</Text>
                            </View>

                        </View>

                        {/* trụ sạc  */}
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.containerCharging}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', margin: '5%' }}>
                                    <Text style={styles.textInfoService}> Danh sách trụ sạc </Text>
                                </View>
                                <FlatList
                                    data={dataStation.specification.map(item => item.specification_id)}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => (
                                        <View style={styles.viewChargingPost}>
                                            <Image style={styles.imgSocket} source={{ uri: item.port_id.image }} />

                                            <View style={styles.infoCharing2}>
                                                <Text style={styles.textTypeCharing}>{item.port_id.name} - {item.port_id.type}</Text>
                                                <Text style={styles.textInfoCharing}>{item.kw} Kw</Text>
                                                <Text style={styles.textInfoCharing}>{item.price.toLocaleString("vi-VN")} đ/Kwh</Text>
                                            </View>

                                            <View style={styles.infoCharing}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                    <Image style={styles.imginfoCharing} source={require('../../../assets/icon/icons8-flash-50 (1).png')} />
                                                    <Text style={[styles.textInfoCharing, { color: COLOR.green3 }]}>  {item.kw < 20
                                                        ? 'Sạc thường'
                                                        : item.kw < 50
                                                            ? 'Sạc nhanh'
                                                            : 'Sạc siêu nhanh'}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                    <Image style={styles.imginfoCharing} source={require('../../../assets/icon/icons8-socket-60.png')} />
                                                    <Text style={[styles.textInfoCharing, { color: COLOR.green3 }]}> {item.slot} Cổng sạc</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>

                    </>
                )}

                {/* đánh giá  */}

                {dataRating && (
                    <>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.textInfo}> Đánh giá </Text>
                                    <Text style={{ color: COLOR.green3, fontSize: SIZE.size18 }}>({countRate(dataRating)})</Text>
                                </View>

                            </View>
                            <View>
                                <View style={styles.containerRate}>
                                    <View  >
                                        <FlatList
                                            data={dataRating.slice(0, limit)}
                                            scrollEnabled={false}
                                            keyExtractor={(item) => item._id}
                                            renderItem={({ item }) => (
                                                <View style={styles.listRate} >
                                                    <ItemRating data={item} />
                                                </View>
                                            )}
                                        />
                                    </View>
                                    {limit < dataRating.length && (
                                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setLimit(limit + 2)}>
                                            <Text style={styles.textInfo}>Xem thêm</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    </>
                )}

                <Modal transparent={true} visible={modalVisible} animationType="slide">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.modalOverlay}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.modalContent}>

                                <Text style={styles.modalTitle}>Đánh giá của bạn</Text>

                                <ScrollView keyboardShouldPersistTaps="handled">
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <TouchableOpacity key={star} onPress={() => setStarRating(star)}>
                                                    <Icon
                                                        name={star <= starRating ? 'star' : 'star-o'}
                                                        size={40}
                                                        color={star <= starRating ? 'gold' : 'gray'}
                                                        style={{ marginHorizontal: 5 }}
                                                    />
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                        <TextInput
                                            style={styles.inputRate}
                                            placeholder="Nhập nội dung..."
                                            value={textContent}
                                            onChangeText={(value) => {
                                                if (value.length <= 100) {
                                                    setTextContent(value);
                                                }
                                            }}
                                            multiline
                                        />
                                    </View>
                                </ScrollView>

                                {/* nút */}
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity onPress={() => {
                                        setTextContent('');
                                        setStarRating(0);
                                        setModalVisible(false);
                                    }} style={styles.cancelButton}>
                                        <Text style={{ color: COLOR.green3 }}>Quay lại </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={submitRating}
                                        style={styles.applyButton}>
                                        <Text style={{ color: 'white' }}>Đánh giá</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </Modal>

            </ScrollView>
            {/* Bottom tab */}
            <View style={styles.containerBottom}>
                <TouchableOpacity style={styles.buttonBottom} onPress={clickRating}>
                    <Text style={[styles.textBottom, { color: COLOR.green3 }]} >Đánh giá</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openGoogleMaps} style={[styles.buttonBottom, { backgroundColor: COLOR.green3 }]}>
                    <Text style={[styles.textBottom, { color: 'white' }]}>Đến ngay</Text>
                </TouchableOpacity>
            </View>
            {/* 
            <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()} >
                <Image style={styles.imgBack} source={require('../../../assets/icon/icons8-back-64 (2).png')} />
            </TouchableOpacity> */}

        </View>
    )
}

export default ViewDetail

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    containerCharging: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '95%',
        paddingBottom: '5%'
    },
    containerRate: {
        borderRadius: 10,
        borderColor: '#C7C6C5',
    },
    textNameCharging: {
        alignItems: 'center',
        width: '40%',
        padding: '5%',
        marginLeft: '10%',
        marginTop: '-15%',
        margin: '5%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#C7C6C5',
    },
    textName: {
        fontSize: SIZE.size18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textMain: {
        fontSize: SIZE.size14,
        textAlign: 'center',
    },
    textMain22: {
        fontSize: SIZE.size14,
    },
    textInfo: {
        fontSize: SIZE.size14,
        fontWeight: 'bold',
        margin: '5%'
    },
    textInfoService: {
        fontSize: SIZE.size16,
        fontWeight: 'bold',
    },
    imgMain: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgIconMain: {
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '1%'
    },
    imgSocket: {
        width: 70,
        height: 80,
    },
    imgServies: {
        width: 28,
        height: 28,
    },
    boxMain: {
        alignItems: 'center',
        marginTop: '15%',
        margin: '5%',
        padding: '5%',
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    detailStation: {
        flexDirection: 'row',
        margin: '2%',
        marginRight: '3%',
        marginLeft: '3%',
    },
    brand: {
        width: '50%',
        marginLeft: '5%',
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    imgbrand: {
        margin: '5%',
        marginBottom: '10%',
        width: 40,
        height: 40,
        borderRadius: 30,
    },
    infoCharing: {
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        flex: 1,
        marginRight: '2%'
    },
    infoCharing2: {
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        flex: 1,
        marginLeft: '2%'
    },
    imginfoCharing: {

        width: 20,
        height: 20,
        borderRadius: 20,
    },
    textInfoCharing: {
        fontSize: SIZE.size14,
        fontWeight: '500'
    },
    textService: {
        fontSize: SIZE.size14,
        marginLeft: '5%',
        fontWeight: '500'
    },
    textTypeCharing: {
        fontSize: SIZE.size14,
        fontWeight: '500'
    },
    textNote: {
        marginLeft: '5%',
        fontSize: SIZE.size14,
        fontWeight: '500',
        marginBottom: '5%'
    },
    viewImage: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewChargingPost: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: '2%',
        flexDirection: 'row',

        marginRight: '2%',
        marginLeft: '2%',
        marginTop: '2%',
        marginBottom: '3%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    listRate: {
        margin: '0%',
        alignItems: 'center'
    },
    viewService: {
        backgroundColor: 'white',
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: '5%',
        marginLeft: '5%'
    },

    containerBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        backgroundColor: 'white',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        borderColor: '#C7C6C5'
    },
    buttonBottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: COLOR.green3,
        borderWidth: 1,
        margin: '5%',
        padding: '3%',
        marginTop: '0%',
        marginBottom: '0%'
    },
    textBottom: {
        fontSize: SIZE.size14,
    },
    buttonBack: {
        position: 'absolute',
        top: 20,
        borderRadius: 30,
    },
    imgBack: {
        width: 50,
        height: 50,
        margin: '10%',
        marginTop: '0%'
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: SIZE.size14,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    modalTitleSup: {
        fontSize: SIZE.size14,
        marginTop: 10,
        fontWeight: '600'
    },
    cancelButton: {
        backgroundColor: 'White',
        padding: 10,
        borderRadius: 20,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: COLOR.green3
    },
    applyButton: {
        backgroundColor: COLOR.green3,
        padding: 10,
        borderRadius: 20,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        width: '100%',
    },

    inputRate: {
        width: '90%',
        height: 150,
        borderColor: 'blue',
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
        textAlignVertical: 'top',
        fontSize: SIZE.size14,
    }


})