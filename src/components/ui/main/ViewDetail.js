import { StyleSheet, Text, View, ToastAndroid, ScrollView,Linking, Image, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useState, useEffect , useContext} from 'react';
import { TextInputProfile, CustomButton, ItemRating } from '../../item/Item'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AxiosInstance from '../../axios/AxiosInstance';
import { AppContext } from '../../axios/AppContext';

const ViewDetail = () => {
    const route = useRoute();
    const { id } = route.params;

    // gioi han hien thi danh gia
    const [limit, setLimit] = useState(1);
    // gioi han moi lan xem them
    const countRate = (Rate) => {
        return Rate.length;
    };

    // an hien viet danh gia
    const [modalVisible, setModalVisible] = useState(false);
    // du lieu viet danh gia
    const [textContent, setTextContent] = useState('');
    // do dai nhap ky tu
    const maxLength = 100;
    // so sao danh gia
    const [rating, setRating] = useState(0);
    // ten nguoi dung 
    const [userNameRating, setUserNameRating] = useState('Nguyen Van B')
    // lay thoi gian thuc te 
    const [savedTime, setSavedTime] = useState(null);
    const handlePress = () => {
        const now = new Date();
        const formattedTime = now.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        setSavedTime(formattedTime);
    };


    const [userRating, setUserRating] = useState([]);
    const handleSubmit = () => {
        handlePress(); // Cập nhật thời gian trước khi lưu đánh giá

        if (textContent.trim() === '' || rating === 0) {
            alert('Vui lòng nhập đánh giá và chọn số sao!');
            return;
        }

        const newRating = {
            userNameRating,
            textContent,
            rating,
            savedTime: new Date().toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }),
        };

        setUserRating([...userRating, newRating]); // Cập nhật danh sách đánh giá
        setTextContent('');
        setRating(0);
    };
    // console.log(userRating);

    // lat lng
    const { myLat, myLng } = useContext(AppContext);
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
                            <Text style={styles.textName}>{dataStation.name}</Text>
                            <View style={styles.detailStation}>
                                <Image style={styles.imgIconMain} source={require('../../../assets/icon/icons8-location-94.png')} />
                                <Text style={styles.textMain}>{dataStation.location}</Text>
                            </View>

                            <View style={styles.detailStation}>
                                <Image style={styles.imgIconMain} source={require('../../../assets/icon/icons8-charging-station-64.png')} />
                                <Text style={styles.textMain22}> Đang hoạt Động</Text>
                            </View>
                            <View style={styles.detailStation}>
                                <Image style={styles.imgIconMain} source={require('../../../assets/icon/icons8-time-50.png')} />
                                <Text style={styles.textMain}>{dataStation.time}</Text>
                            </View>
                        </View>
                        {/* Dich Vu  */}
                        <View>
                            <Text style={styles.textInfoService}> Dịch vụ </Text>
                        </View>
                        <View style={{ margin: '5%' }} >
                            <FlatList
                                data={dataStation.service.map(item => item.service_id)}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
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
                        </View>
                        {/* ghi chú dịch vụ  */}
                        <View>
                            <Text style={styles.textNote}>Ghi chú</Text>
                            <Text style={styles.textNote}>{dataStation.note}</Text>
                        </View>
                        {/* trụ sạc  */}
                        <View>
                            <Text style={styles.textInfoService}> Danh sách trụ sạc </Text>
                        </View>
                        <View style={styles.containerCharging}>
                            <FlatList
                                data={dataStation.specification.map(item => item.specification_id)}
                                scrollEnabled={false}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <View style={styles.viewChargingPost}>
                                        <Image style={styles.imgSocket} source={{ uri: item.port_id.image }} />

                                        <View style={styles.infoCharing2}>
                                            <Text style={styles.textTypeCharing}>{item.port_id.name}</Text>
                                            <Text style={styles.textInfoCharing}>{item.kw} Kw/h</Text>
                                            <Text style={styles.textInfoCharing}>{item.price.toLocaleString("vi-VN")} đ/Kwh</Text>
                                        </View>

                                        <View style={styles.infoCharing}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <Image style={styles.imginfoCharing} source={require('../../../assets/icon/icons8-flash-50 (1).png')} />
                                                <Text style={[styles.textInfoCharing, { color: '#40A19C' }]}>  {item.kw < 20
                                                    ? 'Sạc thường'
                                                    : item.kw < 50
                                                        ? 'Sạc nhanh'
                                                        : 'Sạc siêu nhanh'}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <Image style={styles.imginfoCharing} source={require('../../../assets/icon/icons8-socket-60.png')} />
                                                <Text style={[styles.textInfoCharing, { color: '#40A19C' }]}> {item.slot} Cổng sạc</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            />
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
                                    <Text style={{ color: '#40A19C', fontSize: 20 }}>({countRate(dataRating)})</Text>
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
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>

                            <Text style={styles.modalTitle}>Đánh giá của bạn</Text>
                            <ScrollView showsVerticalScrollIndicator={false} >
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                            <Icon
                                                name={star <= rating ? 'star' : 'star-o'}
                                                size={40}
                                                color={star <= rating ? 'gold' : 'gray'}
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
                                        if (value.length <= maxLength) {
                                            setTextContent(value);
                                        }
                                    }}
                                    multiline
                                />
                            </ScrollView >
                            {/* nút */}
                            <View style={styles.buttonRow}>
                                <TouchableOpacity onPress={() => {
                                    setTextContent('')
                                    setRating(0)
                                    setModalVisible(false)
                                }}
                                    style={styles.cancelButton}>
                                    <Text style={{ color: '#40A19C' }}>Quay lại </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleSubmit();
                                        setModalVisible(false);
                                    }}
                                    style={styles.applyButton}>
                                    <Text style={{ color: 'white' }}>Đánh giá</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </ScrollView>
            {/* Bottom tab */}
            <View style={styles.containerBottom}>
                <TouchableOpacity style={styles.buttonBottom} onPress={() => setModalVisible(true)}>
                    <Text style={[styles.textBottom, { color: '#40A19C' }]} >Đánh giá</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openGoogleMaps} style={[styles.buttonBottom, { backgroundColor: '#40A19C' }]}>
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
    },
    containerCharging: {
        padding: '5%',
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
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },


    textMain: {
        fontSize: 18,
        textAlign: 'center',
    },
    textMain22: {
        fontSize: 18,
        color: '#40A19C'
    },
    textInfo: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: '5%'
    },
    textInfoService: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: '5%',
        marginBottom: '0%',
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

    },
    imgSocket: {
        width: 70,
        height: 80,
    },
    imgServies: {
        width: 50,
        height: 50,
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
        fontSize: 16,

    },
    textService: {
        fontSize: 14,
        textAlign: 'center'
    },
    textTypeCharing: {
        fontSize: 18,
        fontWeight: '500'
    },
    textNote: {
        marginRight: '8%',
        marginLeft: '8%',
        fontSize: 16,
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        marginRight: '5%',
        marginLeft: '5%',
        marginTop: '10%',
        marginBottom: '10%',
        padding: '10%',
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
        borderColor: '#40A19C',
        borderWidth: 1,
        margin: '5%',
        padding: '3%',
        marginTop: '0%',
        marginBottom: '0%'
    },
    textBottom: {
        fontSize: 16,
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    modalTitleSup: {
        fontSize: 18,
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
        borderColor: '#40A19C'
    },
    applyButton: {
        backgroundColor: '#40A19C',
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
        fontSize: 16,
    }


})