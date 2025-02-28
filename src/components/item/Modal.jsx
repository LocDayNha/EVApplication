import React, { useState, useContext, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Image } from "react-native";
// import Slider from '@react-native-community/slider';
import { COLOR } from '@/src/assets/Theme/Theme';
// import Slider from "react-native-sliders";
import MultiSlider from '@ptomasroos/react-native-multi-slider'

// list nút vuông 
export function ItemModalCheckBox({ checkModal, setModalVisible, data, selectedItems, setSelectedItems, title }) {

    const toggleSelection = (itemName) => {
        if (selectedItems.includes(itemName)) {
            setSelectedItems(selectedItems.filter((item) => item !== itemName));
        } else {
            setSelectedItems([...selectedItems, itemName]);
        }
    };

    return (
        <Modal transparent={true} visible={checkModal} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>

                    <FlatList
                        data={data}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.filterItem}
                                onPress={() => toggleSelection(item._id)}
                            >
                                <View style={[styles.checkbox, selectedItems.includes(item._id) && styles.checkedBox]}>
                                    {selectedItems.includes(item._id) && <Text style={styles.checkmark}>✓</Text>}
                                </View>
                                <Text style={styles.filterText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedItems([]);
                                setModalVisible(false);
                            }}
                            style={styles.cancelButton}
                        >
                            <Text style={styles.cancelText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)} // Added missing onPress
                            style={styles.applyButton}
                        >
                            <Text style={styles.applyText}>Áp dụng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

// list nút tròn 
export function ItemModalRadioButton({ checkModal, setModalVisible, data, selectedItem, setSelectedItem, title }) {
    return (
        <Modal transparent={true} visible={checkModal} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <ScrollView>
                        <FlatList
                            data={data}
                            scrollEnabled={false}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.filterItem}
                                    onPress={() => setSelectedItem([item._id, item.name])}
                                >
                                    <View style={styles.radioButton}>
                                        {selectedItem[0] === item._id && <View style={styles.radioInner} />}
                                    </View>

                                    {item.name && item.type ?
                                        <>
                                            <Text style={styles.filterText}>{item.name} - {item.type}</Text>
                                        </>
                                        :
                                        <>
                                            <Text style={styles.filterText}>{item.name}</Text>
                                        </>
                                    }
                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            onPress={() => [
                                setModalVisible(false),
                            ]
                            }
                            style={styles.cancelButton}
                        >
                            <Text style={styles.cancelText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.applyButton}
                        >
                            <Text
                                onPress={() =>
                                    setModalVisible(false)

                                }
                                style={styles.applyText}>Áp dụng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export function ItemListModal({ checkModal, setModalVisible, data, selectedItem, setSelectedItem, title }) {
    return (
        <Modal transparent={true} visible={checkModal} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={[styles.modalTitle, { textAlign: 'center' }]}>{title}</Text>
                    <ScrollView>
                        <FlatList
                            data={data}
                            scrollEnabled={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.filterItemList}
                                    onPress={() => setSelectedItem(item.name)}
                                >
                                    <Text style={styles.filterText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>


                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.applyText}> Đóng</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

export function ItemSliderModal({ checkModal, setModalVisible, value, setValue, title, minValue, maxValue, defaultValue }) {
    //console.log(value);
    return (
        <Modal transparent={true} visible={checkModal} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={[styles.modalTitle, { textAlign: 'center' }]}>{title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5%', justifyContent: 'center' }}>
                        <View style={{
                            backgroundColor: COLOR.green3,
                            width: 100,
                            height: 40,
                            padding: 10,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>{value}</Text>
                            <Text style={{ fontSize: 18, color: 'white' }}>Km </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <MultiSlider
                            style={{ width: '100%', height: 50 }}
                            min={minValue}
                            max={maxValue}
                            step={1}
                            minimumTrackTintColor={COLOR.green4}
                            maximumTrackTintColor="grey"
                            thumbTintColor={COLOR.green4}
                            onValuesChange={setValue}
                            value={value}
                            snapped
                            //values={[10, 80]}
                            allowOverlap={false}
                        />
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: '5%' }}>
                        <Text style={{ fontSize: 18, }}>{minValue}Km</Text>
                        <Text style={{ fontSize: 18, }}>{maxValue}Km</Text>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.applyButton, { backgroundColor: COLOR.gray1 }]}
                            onPress={() => [setModalVisible(false), setValue(defaultValue)]}
                        >
                            <Text style={[styles.applyText, { color: 'black' }]}> Làm mới</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.applyText}> Đóng</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>
    );
}
export function ItemSlider({ values, setValues, minValue, maxValue, defaultValue }) {

    return (

        <View style={{ alignItems: 'center' }}>
            <View> <Text style={{ fontSize: 18 }} >{values[0]}Kw - {values[1]}Kw</Text></View>
            <MultiSlider
                style={{ width: '100%', height: 50 }}
                min={minValue}
                max={maxValue}
                step={1}
                minimumTrackTintColor={COLOR.green4}
                maximumTrackTintColor="grey"
                // thumbTintColor={COLOR.green4}
                onValuesChange={(val) => setValues(val)}
                snapped
                values={values}
                allowOverlap={false}
                markerStyle={{ height: 20, width: 20, }}
                trackStyle={{ height: 4, }}
            />
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text style={{ fontSize: 18, marginHorizontal: '20%' }} >{minValue}Kw</Text>
                <Text style={{ fontSize: 18, marginHorizontal: '20%' }} >{maxValue}Kw</Text>
            </View>
        </View>
    );
}
// nút hình  vuông image 
export function ItemModalCheckBoxImage({ checkModal, setModalVisible, data, selectedItems, setSelectedItems, title }) {

    const toggleSelection = (itemName) => {
        if (selectedItems.includes(itemName)) {
            setSelectedItems(selectedItems.filter((item) => item !== itemName));
        } else {
            setSelectedItems([...selectedItems, itemName]);
        }
    };
    return (
        <Modal transparent={true} visible={checkModal} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.filterItemImage}
                                onPress={() => toggleSelection(item._id)}
                            >

                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View>
                                        <Image style={{ width: 30, height: 30 }} source={{ uri: item.image }} />
                                    </View>
                                    <View style={{ marginHorizontal: '20%' }}>
                                        <Text style={[styles.filterText,]}>{item.name}</Text>
                                    </View>

                                </View>
                                <View style={[styles.checkbox, selectedItems.includes(item._id) && styles.checkedBox]}>
                                    {selectedItems.includes(item._id) && <Text style={styles.checkmark}>✓</Text>}
                                </View>

                            </TouchableOpacity>
                        )}
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedItems([]);
                                setModalVisible(false);
                            }}
                            style={styles.cancelButton}
                        >
                            <Text style={styles.cancelText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)} // Added missing onPress
                            style={styles.applyButton}
                        >
                            <Text style={styles.applyText}>Áp dụng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

// list nút tròn image
export function ItemModalRadioButtonImage({ checkModal, setModalVisible, data, selectedItem, setSelectedItem, title }) {
    return (
        <Modal transparent={true} visible={checkModal} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <ScrollView>
                        <FlatList
                            data={data}
                            scrollEnabled={false}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.filterItemImage}
                                    onPress={() => setSelectedItem([item._id, item.name])}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <View>
                                            <Image style={{ width: 30, height: 30 }} source={{ uri: item.image }} />
                                        </View>
                                        <View style={{ marginHorizontal: '20%' }}>
                                            {item.type == null ?
                                                <Text style={styles.filterText}>{item.name}</Text> : <Text style={styles.filterText}>{item.name} ({item.type})</Text>}
                                        </View>
                                    </View>

                                    <View style={styles.radioButton}>
                                        {selectedItem[0] === item._id && <View style={styles.radioInner} />}
                                    </View>

                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            onPress={() => [
                                setModalVisible(false),
                            ]
                            }
                            style={styles.cancelButton}
                        >
                            <Text style={styles.cancelText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.applyButton}
                        >
                            <Text
                                onPress={() => [
                                    setModalVisible(false)
                                ]
                                }
                                style={styles.applyText}>Áp dụng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    filterItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    filterItemImage: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        justifyContent: 'space-between'
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLOR.green3,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLOR.green3,
    },
    filterText: {
        fontSize: 16,
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
        alignItems: "center",
    },
    cancelText: {
        color: "black",
        fontWeight: "bold",
    },
    applyButton: {
        backgroundColor: COLOR.green3,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
        marginHorizontal: '5%'
    },
    applyText: {
        color: "white",
        fontWeight: "bold",
    },

    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: COLOR.green3,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        borderRadius: 5
    },
    checkedBox: {
        backgroundColor: COLOR.green3,
    },
    checkmark: {
        color: "white",
        fontWeight: "bold",
    },
    filterItemList: {
        alignItems: "center",
        paddingVertical: 20,

        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        marginVertical: '2%'
    },
});
