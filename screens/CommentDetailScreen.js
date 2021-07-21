import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button, Avatar } from "react-native-paper";
import axios from "../axios";
import LoadingScreen from "./LoadingScreen";
import DetailText from "../components/DetailText";
const CommentDetailScreen = ({ route, navigation }) => {
    const { commentId } = route.params;
    const [comment, setComment] = useState({});
    const [loading, setLoading] = useState(false);








if (loading)
  return <LoadingScreen text={"Retriving Post Information ... Please wait"} />;

  return (
    <ScrollView>
      <View style={styles.header}>
        <Avatar.Image size={74} source={require("../assets/postIcon.png")} />
        <Text style={styles.headerText}>
          Comment With Id:{commentId} Details
        </Text>
      </View>
    </ScrollView>
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


export default CommentDetailScreen
