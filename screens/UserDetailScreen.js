import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button, Avatar } from "react-native-paper";

import axios from "../axios";
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
      console.log(response.data);
      })
      .catch(function (error) {
        alert("Something went Wrong");
        console.log(error);
      });
  }, []);

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
          <Text style={styles.text}>Full Name: {user.name}</Text>
          <Text style={styles.text}> UserName: {user.username}</Text>
          <Text style={styles.text}> Email: {user.email}</Text>
          <Text style={styles.text}> Phone Number: {user.phone}</Text>
          <Text style={styles.text}>Website: {user.website}</Text>
          {/* <Text>{user.company}</Text>
          <Text>{user.address}</Text> */}
          {/* <Text>{user.address.city}</Text>
          <Text>{user.address.zipcode}</Text> */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              color={"#f08e25"}
              labelStyle={{ color: "white", fontSize: 15 }}
              style={styles.btn}
              onPress={() => {}}
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
  text: {
    padding: 5,
    width: "95%",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 4,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.3,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  headerText: {
      fontSize: 20,
      fontWeight:"bold",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
        
  }
});

export default UserDetailScreen;
