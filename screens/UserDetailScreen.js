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
    setLoading(true);
    axios
      .get(`/users/${JSON.stringify(userId)}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        Alert.alert("Something went Wrong", "Please Check Your Internet");
        console.log(error);
      });
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

  const itemDeleteting = () => {
     setLoading(true);
     axios
       .delete(`/users/${JSON.stringify(userId)}`)
       .then((response) => {
         setLoading(false);
         Alert.alert(
           "User Deleting",
           ` User With Id ${userId} Deleted SuccessFully`
         );
         navigation.navigate("Users");
       })
       .catch(function (error) {
         Alert.alert("Something went Wrong", "Please Check Your Internet");
         console.log(error);

       });
  }

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
          {/* <DetailText>{user.address.city}</DetailText>
          <DetailText>{user.address.zipcode}</DetailText> */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              color={"#f08e25"}
              labelStyle={{ color: "white", fontSize: 15 }}
              style={styles.btn}
              onPress={itemDeleteHandler}
            >
              Delete User
            </Button>
            <Button
              mode="contained"
              color={"#f08e25"}
              labelStyle={{ color: "white", fontSize: 15 }}
              style={styles.btn}
              onPress={() => {}}
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default UserDetailScreen;
