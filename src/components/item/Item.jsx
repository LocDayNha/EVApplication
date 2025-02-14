import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { COLOR } from "../../assets/Theme/Theme";
import { useNavigate } from "react-router-native";



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

export function ItemRating({ data }) {
  return (
    <View style={styles.viewRatingContainer} key={data._id}>
      <View style={styles.viewRatingUser}>
        <View style={{ marginRight: "5%" }}>
          <Image source={{ uri: data.user_id.image }} style={styles.imgUser}></Image>
        </View>
        <View>
          <Text style={styles.textNameUser}>{data.user_id.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.textTimeRating}>{data.createAt}</Text>
          </View>
        </View>
      </View>

      <View style={styles.viewRatingContent}>
        <Text style={styles.textRatingContent}>{data.content}</Text>
      </View>
    </View>
  );
}

export function ItemStation({ data }) {
  const navigate = useNavigate();
  return (
    <TouchableOpacity style={styles.listRow} onPress={() => navigate("/view-detail")}>
      <Image style={styles.imgStation} source={{ uri: data.image }} />
      <View style={styles.viewInfoStation}>
        <Text style={styles.textItemName}>{data.brand} - {data.name}</Text>
        <Text style={styles.textItemLocation}>{data.location}</Text>
      </View>
      <View style={styles.viewInfoStation}>
        <Text style={styles.textItemLocation}>{data.time}</Text>
      </View>
      <View style={styles.viewInfoStation2}>
        <Text style={styles.textItemLocation} >{data.type}</Text>
        <TouchableOpacity>
          <View style={styles.viewButtonItem} >
            <Text style={{ color: 'white' }}>
              3.5Km
            </Text>
            <Image style={styles.imgNext} source={require('../../assets/icon/icons8-arrow-64.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
  },
  imgUser: {
    width: 53,
    height: 53,
    borderRadius: 30
  },
  viewRatingContainer: {
    borderWidth: 1,
    width: "85%",
    borderRadius: 10,
    borderColor: COLOR.gray3,
    marginBottom: "2%",
    marginTop: "2%",
    justifyContent: "center",
    padding: '2%'

  },
  viewRatingUser: {
    margin: "2%",
    flexDirection: 'row'
  },
  viewRatingContent: {
    margin: "2%",
    marginBottom: "4%",
    width: "95%"
  },
  textNameUser: {
    fontSize: 16,
    color: COLOR.black,
    fontWeight: 700,
    fontFamily: 'Poppins',
    marginBottom: "2%"
  },
  textTimeRating: {
    fontSize: 14,
    color: COLOR.gray3,
    fontFamily: 'Poppins',
    marginLeft: "2%"
  },
  textRatingContent: {
    fontSize: 20,
    color: COLOR.black,
    fontFamily: 'Poppins',
  },

  // item list 

  listRow: {
    margin: '5%',
    marginTop: '0%',
    marginBottom: '4%',
    borderRadius: 25,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgStation: {
    width: 'auto',
    height: 180,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textItemName: {
    marginTop: '1%',
    color: 'rgb(0, 0, 0)',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textItemLocation: {
    color: '#544C4C',
    fontSize: 18,
    marginBottom: '0.1%',
    marginTop: '0.1%',
  },
  viewButtonItem: {
    width: 90,
    height: 30,
    flexDirection: 'row',
    backgroundColor: '#40A19C',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 30,
    color: 'white',
  },
  imgNext: {
    width: 30,
    height: 30,
  },
  viewInfoStation: {
    margin: '5%',
    marginBottom: 0,
    marginTop: 0,
  },
  viewInfoStation2: {
    margin: '5%',
    marginBottom: '3%',
    marginTop: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
});
