import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import { COLOR } from "../../assets/Theme/Theme";

export function CustomTextInput({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

export function CustomButton({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 50,
    backgroundColor: COLOR.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    color: "#fff"
  },
  inputContainer: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: COLOR.primary,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
});
