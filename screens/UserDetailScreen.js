import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { Button, Avatar } from "react-native-paper";

import axios from "../axios";
import DetailText from "../components/DetailText";
import LoadingScreen from "./LoadingScreen";

const UserDetailScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/users/${JSON.stringify(userId)}`);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      Alert.alert("Something went Wrong", error.message);
      console.log(error);
    }
  };
    getUser();
  }, []);

  const itemDeleteHandler = () => {
    if (userId) {
      Alert.alert(
        "User Deleting",
        ` Are You Sure You Want To Delete User with Id ${userId}`,
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => console.log("Cancel button clicked"),
          },
          {
            text: "Delete",
            onPress: itemDeleteting,
            style: "destructive",
          },
        ],
        {
          cancelable: false,
        }
      );
    } else {
    }
  };

  const itemDeleteting = async () => {
    setLoading(true);
    try {
     await axios.delete(`/users/${JSON.stringify(userId)}`);
      setLoading(false);
      Alert.alert(
        "User Deleting",
        ` User With Id ${userId} Deleted SuccessFully`
      );
      navigation.navigate("Users");
    } catch (error) {
       Alert.alert("Something went Wrong", error.message);
       console.log(error);
    }
  };

  if (loading)
    return (
      <LoadingScreen text={"Retriving User's Information ... Please wait"} />
    );

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar.Image size={74} source={require("../assets/Avatar.png")} />
          <Text style={styles.headerText}>
            User With UserId:{userId} Details
          </Text>
        </View>
        <View style={styles.TextContainer}>
          <DetailText>Full Name: {user.name}</DetailText>
          <DetailText> UserName: {user.username}</DetailText>
          <DetailText> Email: {user.email}</DetailText>
          <DetailText> Phone Number: {user.phone}</DetailText>
          <DetailText>Website: {user.website}</DetailText>
          {/* <DetailText>{user.company}</DetailText>
          <DetailText>{user.address}</DetailText> */}
          {/* <DetailText>City: {user.address.city}</DetailText>
          <DetailText>ZipCode:{user.address.zipcode}</DetailText> */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              color={"#1e4643"}
              labelStyle={{ color: "white", fontSize: 15 }}
              style={styles.btn}
              onPress={itemDeleteHandler}
            >
              Delete User
            </Button>
            <Button
              mode="contained"
              color={"#1e4643"}
              labelStyle={{ color: "white", fontSize: 15 }}
              style={styles.btn}
              onPress={() => {
                navigation.navigate("UserUpdating", {
                  id: userId,
                });
              }}
            >
              Update User
            </Button>
          </View>
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
    margin: 10,
  },
  TextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e4643",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default UserDetailScreen;
