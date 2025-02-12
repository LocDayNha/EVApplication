import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { COLOR } from "../../assets/Theme/Theme";

export function TextInputBegin({ uri, onChangeText, placeholder }) {
  return (
    <View style={styles.inputContainer}>
      <Image source={uri} style={styles.img} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </View>
  );
}

export function TextInputMain({ value, onChangeText, placeholder }) {
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

export function TextInputProfile({ label, value, onChangeText, placeholder }) {
  return (
    <View style={styles.viewInputProfile}>
      <Text style={styles.textProfile}>{label}</Text>
      <TextInput
        style={styles.inputProfile}
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

export function ItemRating({data}) {
  return (
    <View></View>
  );
}

export function ItemStation({data}) {
  return (
    <View></View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    height: 50,
    backgroundColor: COLOR.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 20,
    color: COLOR.secondary,
    fontWeight: 700,
    fontFamily: 'Poppins'
  },
  inputContainer: {
    width: "85%",
    height: 50,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: COLOR.gray2,
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: "100%",
    height: "100%",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  img: {
    marginLeft: "5%"
  },
  viewInputProfile: {
    width: "85%",
    height: "25%",
    paddingLeft: 10,
    borderColor: COLOR.gray2,
    borderRadius: 10,
  },
  textProfile: {
    fontSize: 20,
    color: COLOR.black,
    fontWeight: 700,
    fontFamily: 'Poppins'
  },
  inputProfile: {
    width: "100%",
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLOR.gray,
    borderRadius: 15
  }

});
