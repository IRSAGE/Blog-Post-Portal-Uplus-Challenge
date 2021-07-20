import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button, Avatar, Title } from "react-native-paper";
import TextInputComp from "../components/TextInputComp";

const CreateuserScreen = () => {
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar.Image size={64} source={require("../assets/Avatar.png")} />
          <Text style={styles.headerText}>Create New User</Text>
        </View>
        <View style={styles.TextContainer}>
          <TextInputComp label="Name" placeholder="Enter Name" />
          <TextInputComp label="UserName" placeholder="Enter User Name" />
          <TextInputComp label="Street" placeholder="Enter User's Street" />
          <TextInputComp label="Suite" placeholder="Enter User's Suite" />
          <TextInputComp label="City" placeholder="Enter User's City" />
          <TextInputComp label="ZipCode" placeholder="Enter User's ZipCode" />
          <TextInputComp label="Latitude" placeholder="Enter User's Latitude" />
          <TextInputComp
            label="Longititude"
            placeholder="Enter User's Longititude"
          />
          <Button
            mode="contained"
            color={"#f08e25"}
            labelStyle={{ color: "white", fontSize: 15 }}
            style={styles.btn}
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
      fontSize:20
  }
});

export default CreateuserScreen;
