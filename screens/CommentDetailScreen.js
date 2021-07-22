import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { Button, Avatar } from "react-native-paper";

import axios from "../axios";
import LoadingScreen from "./LoadingScreen";
import DetailText from "../components/DetailText";


const CommentDetailScreen = ({ route, navigation }) => {
    const { commentId } = route.params;
    const [comment, setComment] = useState({});
    const [loading, setLoading] = useState(false);


 useEffect(() => {
   setLoading(true);
   axios
     .get(`/comments/${JSON.stringify(commentId)}`)
     .then((response) => {
       setComment(response.data);
       setLoading(false);
       console.log(response.data);
     })
     .catch(function (error) {
       Alert.alert("Something went Wrong", "Please Check Your Internet");
       console.log(error);
     });
 }, []);

  const itemDeleteHandler = () => {
    if (commentId) {
      Alert.alert(
        "Comment Deleting",
        ` Are You Sure You Want To Delete Comment with Id ${commentId}`,
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
      .delete(`/comments/${JSON.stringify(commentId)}`)
      .then((response) => {
        setLoading(false);
        Alert.alert(
          "Comment Deleting",
          ` Comment With Id ${commentId} Deleted SuccessFully`
        );
        navigation.navigate("Users");
      })
      .catch(function (error) {
        Alert.alert("Something went Wrong", "Please Check Your Internet");
        console.log(error);
      });
  };
    
if (loading)
  return <LoadingScreen text={"Loading... ... Please wait"} />;

    return (
      <View style={styles.screen}>
        <ScrollView>
          <View style={styles.header}>
            <Avatar.Image
              size={74}
              source={require("../assets/postIcon.png")}
            />
            <Text style={styles.headerText}>
              Comment With Id:{commentId} Details
            </Text>
          </View>
          <View style={styles.TextContainer}>
            <DetailText>For Post With Id : {comment.postId}</DetailText>
            <DetailText>Name: {comment.name}</DetailText>
            <DetailText> Creator: {comment.email}</DetailText>
            <DetailText> {comment.body}</DetailText>
            <Button
              mode="contained"
              color={"#f08e25"}
              labelStyle={{ color: "white", fontSize: 15 }}
              style={styles.btn}
              onPress={itemDeleteHandler}
            >
              Delete Comment
            </Button>
            <Button
              mode="contained"
              color={"#f08e25"}
              labelStyle={{ color: "white", fontSize: 15 }}
              style={styles.btn}
              onPress={() => { navigation.navigate("UpdateComment", {
                id: commentId,

              });}}
            >
              Update Comment
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
});


export default CommentDetailScreen
