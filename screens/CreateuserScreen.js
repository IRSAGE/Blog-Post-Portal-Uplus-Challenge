import React, { useState } from "react";

import axios from "../axios";

import { View, Text, ScrollView, StyleSheet, Keyboard } from "react-native";
import { Button, Avatar } from "react-native-paper";
import TextInputComp from "../components/TextInputComp";
import LoadingScreen from "./LoadingScreen";

const CreateuserScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [street, setStreet] = useState("");
  const [suite, setSuit] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputsHandler = async () => {
    if (
      name != "" &&
      userName != "" &&
      street != "" &&
      suite != "" &&
      city != "" &&
      zipcode != "" &&
      lat != "" &&
      lng != ""
    ) {
      setLoading(true);
      await axios
        .post("/users", {
          name: name,
          username: userName,
          address: {
            street: street,
            suite: suite,
            city: city,
            zipcode: zipcode,
            geo: {
              lat: lat,
              lng: lng,
            },
          },
        })
        .then(function (response) {
          setLoading(false);
          alert("User Created Successfull");
          cleanInputs();
          navigation.goBack();
        })
        .catch(function (error) {
          alert("Sommething is Wrong");
          console.log(error);
        });
    } else {
      alert("There Are Some Missing Value");
    }
  };

  const cleanInputs = () => {
    setName("");
    setUserName("");
    setStreet("");
    setSuit("");
    setCity("");
    setZipCode("");
    setLat("");
    setLng("");
  };

  if (loading)
    return <LoadingScreen text={"Creating New User ... Please wait"} />;

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar.Image size={64} source={require("../assets/Avatar.png")} />
          <Text style={styles.headerText}>Create A New User</Text>
        </View>
        <View style={styles.TextContainer}>
          <TextInputComp
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Enter Name"
          />
          <TextInputComp
            label="UserName"
            placeholder="Enter User Name"
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />
          <TextInputComp
            label="Street"
            placeholder="Enter User's Street"
            value={street}
            onChangeText={(text) => setStreet(text)}
          />
          <TextInputComp
            label="Suite"
            placeholder="Enter User's Suite"
            value={suite}
            onChangeText={(text) => setSuit(text)}
          />
          <TextInputComp
            label="City"
            placeholder="Enter User's City"
            value={city}
            onChangeText={(text) => setCity(text)}
          />
          <TextInputComp
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            label="ZipCode"
            placeholder="Enter User's ZipCode"
            value={zipcode}
            onChangeText={(text) => setZipCode(text.replace(/[^0-9]/g, ""))}
          />
          <TextInputComp
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            label="Latitude"
            placeholder="Enter User's Latitude"
            value={lat}
            onChangeText={(text) => setLat(text.replace(/[^0-9]/g, ""))}
          />
          <TextInputComp
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            label="Longititude"
            placeholder="Enter User's Longititude"
            value={lng}
            onChangeText={(text) => setLng(text.replace(/[^0-9]/g, ""))}
          />
          <Button
            mode="contained"
            color={"#f08e25"}
            labelStyle={{ color: "white", fontSize: 15 }}
            style={styles.btn}
            onPress={handleInputsHandler}
          >
            Create User
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  btn: {
    marginTop: 7,
  },
  TextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 7,
  },
  headerText: {
    fontSize: 20,
  },
});

export default CreateuserScreen;
