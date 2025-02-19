import { StyleSheet, Modal, Text, View, Image, Button, TouchableOpacity, FlatList, SectionList, ImageBase, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ItemStationMain } from '../../item/Item';


const nameChargingStation = [
    { id: '0', name: 'Cửa hàng xăng dầu Thủ Đức ', brand: 'Honda', location: '172/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1', 'CCS2'], image: 'https://www.pvoil.com.vn/media/1/he-thong-cua-hang-xang-dau.png' },
    { id: '1', name: 'Đại lý ủy quyền Hyundai ', brand: 'Hyundai', location: '72/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1', 'CCS2'], image: 'https://image.bnews.vn/MediaUpload/Org/2021/03/24/img-bgt-2021-screenshot-563-1616508509-width1280height720.jpg' },
    { id: '2', name: 'Trạm xạc Vinfast Quận 1  ', brand: 'Vinfast', location: '172/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1 ', 'CCS2'], image: 'https://petrotimesgroup.com/upload/cdn/images/image-20241116092757-1.jpeg' },
    { id: '3', name: 'Chung cư ABC ', brand: 'Vinfast,Honda', location: '72/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1 ', 'CCS2'], image: 'https://www.viup.vn/media/ckfinder/images/News/1/3/20230314/news_5739/image003.jpg' },
    { id: '4', name: 'Bãi đỗ xe công ty trạm sạc EV ', brand: 'Vinfast', location: '172/7 phường Linh trung, Thủ đức, Hồ Chí Minh', time: '07:00 - 16:00', type: ['CCS1', 'CCS2'], image: 'https://thicongtrambienap.com/wp-content/uploads/2021/03/tram-sac-xe-dien-2-scaled.jpg' },
]

const nameKw = [
    { id: '0', Kw: ['60Kw', '20Kw', '60Kw'] },
    { id: '1', Kw: ['60Kw', '60Kw', '60Kw'] },
    { id: '2', Kw: ['60Kw', '60Kw', '60Kw'] },
    { id: '3', Kw: ['60Kw', '60Kw', '60Kw'] },
    { id: '4', Kw: ['60Kw', '60Kw', '60Kw'] },
];

const carBrands = [
    { id: 0, name: 'Tất cả' },
    { id: 1, name: 'Toyota' },
    { id: 2, name: 'Honda' },
    { id: 3, name: 'Ford' },
    { id: 4, name: 'Vinfast' },
];

const typeCharger = [
    { id: 0, name: 'CCS1' },
    { id: 1, name: 'CCS2' },
    { id: 2, name: 'GB/T' },
    { id: 3, name: 'J1772' },
];

const Von = [
    { id: 0, name: 'Tất cả' },
    { id: 1, name: 'DC' },
    { id: 2, name:  'AC'},
];

const Kw = [
    { id: 0, name: 'Tất cả' },
    { id: 1, name: 'Sạc Thường' },
    { id: 2, name: 'Sạc Nhanh' },
    { id: 3, name: 'Sạc siêu nhanh' },
];



const Home = () => {

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false); // an hien bo loc 

    // luu id cua loai sac 
    const [selectedChargerType, setSelectedChargerType] = useState([]);
    const toggleSelection = (id) => {
        if (selectedChargerType.includes(id)) {
            setSelectedChargerType(selectedChargerType.filter((item) => item !== id));
        } else {
            setSelectedChargerType([...selectedChargerType, id]);
        }
    };

    // luu id hang xe 
    const [selectedBrand, setSelectedBrand] = useState(0);

    // luu dong dien 
    const [selectedVon, setSelectedVon] = useState(0);

    // luu cong suat 
    const [selectedKw, setSelectedKw] = useState(0);

    // du liệu của id
    const [tempSelected, setTempSelected] = useState(null);
    // console.log(tempSelected)
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Ten nguoi dung */}
            <View style={styles.containerUser}>
                <View style={styles.inputSearch}>
                    <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() => navigation.navigate("Profile")} >
                        <Image style={styles.img} source={require('../../../assets/images/anhchandung.jpg')} />
                        <View >
                            <Text style={styles.titleContainer}>Tùng</Text>
                            <Text style={{ color: 'white' }}>Welcom back</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boderIcon2}>
                        <Image style={styles.iconFilter} source={require('../../../assets/icon/icons8-notification-50 (2).png')} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'white', marginLeft: '10%', marginTop: '2%' }}>Vị trí của bạn </Text>
                <View style={styles.inputSearch}>
                    <View style={styles.boderSearch}><TextInput style={{ marginLeft: '5%' }} placeholder="172/7 phường Linh trung, Thủ đức, Hồ Chí Minh" /></View>
                    <TouchableOpacity style={styles.boderIcon} onPress={() => setModalVisible(true)}>
                        <Image style={styles.iconFilter} source={require('../../../assets/icon/icons8-filter-50 (1).png')} />
                    </TouchableOpacity>
                </View>


            {/* Bộ lọc  */}
                <Modal transparent={true} visible={modalVisible} animationType="slide">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>

                            <Text style={styles.modalTitle}>Bộ lọc </Text>
                            <ScrollView showsVerticalScrollIndicator={false} >
                                {/* danh sách bộ lọc  */}
                                <Text style={styles.modalTitleSup}> Dòng điện </Text>
                                <FlatList
                                    data={Von}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.filterItem}
                                            onPress={() => setSelectedVon(item.id)}>
                                            <View style={styles.radioButton}>
                                                {selectedVon === item.id && <View style={styles.radioInner} />}
                                            </View>
                                            <Text style={styles.filterText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                                <Text style={styles.modalTitleSup}> Loại đầu sạc </Text>
                                <FlatList
                                    data={typeCharger}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity
                                                style={styles.filterItem}
                                                onPress={() => toggleSelection(item.id)}>
                                                <View style={[styles.checkbox, selectedChargerType.includes(item.id) && styles.checkedBox]}>
                                                    {selectedChargerType.includes(item.id) && <Text style={styles.checkmark}>✓</Text>}
                                                </View>
                                                <Text style={styles.filterText}>{item.name}</Text>
                                            </TouchableOpacity>

                                        );
                                    }}
                                />
                                <Text style={styles.modalTitleSup}> Công suất  </Text>
                                <FlatList
                                    data={Kw}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.filterItem}
                                            onPress={() => setSelectedKw(item.id)}>
                                            <View style={styles.radioButton}>
                                                {selectedKw === item.id && <View style={styles.radioInner} />}
                                            </View>
                                            <Text style={styles.filterText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                                <Text style={styles.modalTitleSup}> Hãng xe  </Text>
                                <FlatList
                                    data={carBrands}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.filterItem}
                                            onPress={() => setSelectedBrand(item.id)}>
                                            <View style={styles.radioButton}>
                                                {selectedBrand === item.id && <View style={styles.radioInner} />}
                                            </View>
                                            <Text style={styles.filterText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </ScrollView >
                            {/* nút */}
                            <View style={styles.buttonRow}>
                                <TouchableOpacity onPress={() => {
                                    setTempSelected(null);
                                    setModalVisible(false);
                                    setSelectedBrand(0);
                                    setSelectedKw(0);
                                    setSelectedVon(0);
                                }}
                                    style={styles.cancelButton}>
                                    <Text style={styles.cancelText}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setTempSelected({
                                            selectedBrand,
                                            selectedVon,
                                            selectedKw,
                                            selectedChargerType,
                                        });
                                        setModalVisible(false);
                                    }}
                                    style={styles.applyButton}>
                                    <Text style={styles.applyText}>Áp dụng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


            </View>

            {/* Tram sac gan ban */}
            <View style={styles.boxHome}>
                <View style={styles.container}>
                    <Text style={styles.title}>Trạm sạc gần bạn :</Text>
                </View>
                <View >
                    <FlatList
                        data={nameChargingStation}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ItemStationMain data={item} />
                        )}
                    />
                </View>
            </View>


        </ScrollView>

    )
}

export default Home

const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        maxHeight: '90%',
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
    filterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '100%',
    },
    filterText: {
        fontSize: 16,
        marginLeft: 10,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#40A19C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#40A19C',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#40A19C',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkedBox: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    checkmark: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#FF5252',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    applyButton: {
        backgroundColor: '#40A19C',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    cancelText: {
        color: 'white',
        fontWeight: 'bold',
    },
    applyText: {
        color: 'white',
        fontWeight: 'bold',
    },
    selectedBrand: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },



    boxHome: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: '-5%',
        backgroundColor: 'white'
    },
    containerUser: {
        backgroundColor: '#40A19C',
        alignContent: 'center',
        paddingTop: '2%',
        paddingBottom: '7%',
    },
    container: {
        margin: '5%',
        marginBottom: '5%',
        flexDirection: 'row',
    },

    text: {
        color: 'rgb(0, 0, 0)',
        fontSize: 16,
        fontWeight: 'bold',
    },

    textSearch: {
        color: 'rgb(255, 255, 255)',
        fontSize: 16,
    },

    textItemKw: {
        color: '#40A19C',
        fontSize: 16,
    },
    textItemStatus: {
        color: '#2F9465',
        fontSize: 16,

    },

    viewKw: {
        flexDirection: 'row',
        marginLeft: '10%'
    },


    title: {
        color: 'rgb(0, 0, 0)',
        fontSize: 16,
        fontWeight: 'bold',
    },
    titleContainer: {
        color: 'rgb(255, 255, 255)',
        fontSize: 20,
        fontWeight: 'bold',
    },
    img: {
        width: 40,
        height: 40,
        marginRight: '2%',
        borderRadius: 30,
    },
    imgLocation: {
        width: 40,
        height: 40,
        borderRadius: 30,
    },
    imgFlash: {
        width: 20,
        height: 20,
        borderRadius: 30,
    },


    buttonService: {
        justifyContent: 'center',
        alignItems: 'center',

    },

    inputSearch: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: '5%',
        marginRight: '5%',
    },
    iconFilter: {
        height: 20,
        width: 20,

    },
    boderIcon: {
        height: 50,
        width: 50,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: '#40A19C',
    },
    boderIcon2: {
        height: 50,
        width: 50,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: '#40A19C',
    },
    boderSearch: {
        height: 50,
        width: '80%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: '#40A19C',
    },

    // item list 

})