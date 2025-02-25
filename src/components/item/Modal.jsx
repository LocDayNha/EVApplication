import React, { useState, useContext, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from "react-native";


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
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.filterItem}
                                onPress={() => toggleSelection(item.name)}
                            >

                                <View style={[styles.checkbox, selectedItems.includes(item.name) && styles.checkedBox]}>
                                    {selectedItems.includes(item.name) && <Text style={styles.checkmark}>✓</Text>}
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
                                    onPress={() => setSelectedItem(item.name)}
                                >
                                    <View style={styles.radioButton}>
                                        {selectedItem === item.name && <View style={styles.radioInner} />}
                                    </View>

                                    <Text style={styles.filterText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            onPress={() => [
                                setModalVisible(false),
                                setSelectedItem("")]
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

export function ItemListModal({ checkModal, setModalVisible, data, selectedItem, setSelectedItem, title }) {
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
                                    onPress={() => setSelectedItem(item.name)}
                                >
                                    <View style={styles.radioButton}>
                                       <Text>{item.name}</Text>
                                    </View>
                                    <Text style={styles.filterText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            onPress={() => [
                                setModalVisible(false),
                                setSelectedItem("")]
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
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#40A19C",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#40A19C",
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
        backgroundColor: "#40A19C",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
    },
    applyText: {
        color: "white",
        fontWeight: "bold",
    },

    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: "#40A19C",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    checkedBox: {
        backgroundColor: "#40A19C",
    },
    checkmark: {
        color: "white",
        fontWeight: "bold",
    },
});
