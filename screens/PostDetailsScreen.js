import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { Button, Avatar } from "react-native-paper";
import axios from "../axios";
import LoadingScreen from "./LoadingScreen";
import DetailText from "../components/DetailText";

const PostDetailsScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/posts/${JSON.stringify(postId)}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        alert("Something went Wrong");
        console.log(error);
      });
  }, []);

  const itemDeleteHandler = () => {
    if (postId) {
      Alert.alert(
        "Post Deleting",
        ` Are You Sure You Want To Delete Post with Id ${postId}`,
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
      .delete(`/posts/${JSON.stringify(postId)}`)
      .then((response) => {
        setLoading(false);
        Alert.alert(
          "Post Deleting",
          ` Post With Id ${postId} Deleted SuccessFully`
        );
        navigation.navigate("Posts");
      })
      .catch(function (error) {
        alert("Something went Wrong", "Please Check Your Internet");
        console.log(error);
      });
  };

  if (loading)
    return (
      <LoadingScreen text={"Retriving Post Information ... Please wait"} />
    );

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar.Image size={74} source={require("../assets/postIcon.png")} />
          <Text style={styles.headerText}>Post With Id:{postId} Details</Text>
        </View>
        <View style={styles.TextContainer}>
          <DetailText>Title: {post.title}</DetailText>
          <DetailText> Creator: {post.userId}</DetailText>
          <DetailText> {post.body}</DetailText>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              color={"#1e4643"}
              labelStyle={{ color: "white", fontSize: 15 }}
              style={styles.btn}
              onPress={itemDeleteHandler}
            >
              Delete Post
            </Button>
            <Button
              mode="contained"
              color={"#1e4643"}
              labelStyle={{ color: "white", fontSize: 15 }}
              style={styles.btn}
              onPress={() => {
                navigation.navigate("PostUpdating", {
                  id: postId,
                });
              }}
            >
              Update Post
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

export default PostDetailsScreen;
