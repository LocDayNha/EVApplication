import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AxiosInstance from "../../axios/AxiosInstance";
import { AntDesign } from "@expo/vector-icons"; 

const QR = () => {
    const [dataPlace, setDataPlace] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Lấy danh sách địa điểm từ API
    const getDataPlace = async () => {
        try {
            const dataPort = await AxiosInstance().get("/location/get");
            if (dataPort.data && dataPort.data.length > 0) {
                setDataPlace(dataPort.data);
            } else {
                console.log("Không tìm thấy dữ liệu từ /location/get");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu location:", error);
        }
    };

    useEffect(() => {
        getDataPlace();
    }, []);

    useEffect(() => {
        let formattedItems = dataPlace.map((item) => ({
            label: item.name,
            value: item._id,
            image: item.image,
        }));

        setItems([{ label: "Chọn tất cả", value: "select_all" }, ...formattedItems]);
    }, [dataPlace]);

    const handleSelect = (item) => {
        if (item.value === "select_all") {
            if (selectedValues.length === items.length - 1) {
                setSelectedValues([]);
            } else {
                setSelectedValues(items.slice(1));
            }
        } else {
            let newSelection;
            if (selectedValues.some((val) => val.value === item.value)) {
                newSelection = selectedValues.filter((val) => val.value !== item.value);
            } else {
                newSelection = [...selectedValues, item];
            }

            if (newSelection.length === items.length - 1) {
                newSelection = [items[0], ...newSelection];
            } else {
                newSelection = newSelection.filter((val) => val.value !== "select_all");
            }

            setSelectedValues(newSelection);
        }
    };

    return (
        <View style={styles.container}>
            <Dropdown
                data={items}
                labelField="label"
                valueField="value"
                value={selectedValues.map((item) => item.value)}
                onChange={handleSelect}
                placeholder="Chọn một hoặc nhiều mục"
                style={styles.dropdown}
                selectedTextStyle={styles.selectedText}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={styles.itemText}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                renderItem={(item) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => handleSelect(item)}
                    >
                        {/* Nếu không phải "Chọn tất cả", hiển thị hình ảnh */}
                        {item.value !== "select_all" && (
                            <Image source={{ uri: item.image }} style={styles.image} />
                        )}

                        {/* Tên mục */}
                        <Text style={styles.itemText}>{item.label}</Text>

                        {/* Ô checkbox (ẩn với "Chọn tất cả") */}
                        {item.value !== "select_all" && (
                            <View
                                style={[
                                    styles.checkbox,
                                    selectedValues.some((val) => val.value === item.value) &&
                                    styles.checkboxSelected,
                                ]}
                            >
                                {selectedValues.some((val) => val.value === item.value) && (
                                    <Text style={styles.checkmark}>✓</Text>
                                )}
                            </View>
                        )}
                    </TouchableOpacity>
                )}
                renderRightIcon={() => (
                    <AntDesign
                        name={dropdownOpen ? "up" : "down"}
                        size={20}
                        color="gray"
                        style={styles.icon}
                    />
                )}
            />
        </View>
    );
};

export default QR;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    dropdown: {
        width: '100%',
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
    },
    dropdownContainer: {
        width: '100%',
        maxHeight: '50%',
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingVertical:'2%'
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: '5%',
    },
    image: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 10,
    },
    selectedText: {
        fontSize: 16,
    },
    itemText: {
        fontSize: 14,
        flex: 1,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "gray",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightgray",
    },
    checkboxSelected: {
        borderColor: "#009558",
        backgroundColor: "#009558",
    },
    checkmark: {
        color: "white",
        fontSize: 14,
    },
    icon: {
        marginLeft: 10,
    }
});
