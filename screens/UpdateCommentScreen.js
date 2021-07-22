import React, { useState, useEffect } from "react";

import axios from "../axios";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Keyboard,
  Alert,
} from "react-native";
import { Button, Avatar } from "react-native-paper";
import TextInputComp from "../components/TextInputComp";
import LoadingScreen from "./LoadingScreen";

const UpdateCommentScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [comment, setComment] = useState({});

  const [postId, setPostId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

     useEffect(() => {
       setLoading(true);
       axios
         .get(`/comments/${JSON.stringify(id)}`)
         .then((response) => {
           setComment(response.data);
           settingInputs();
           setLoading(false);
         })
         .catch(function (error) {
           Alert.alert("Something went Wrong", "Please Check Your Internet");
           console.log(error);
         });
     }, [id]);
    
    
  const settingInputs = () => {
    console.log(comment);
    setPostId(comment.postId.toString());
    setName(comment.name);
    setEmail(comment.email);
    setBody(comment.body);
  };

  const handleInputsHandler = async () => {
    if (postId != "" && name != "" && email != "" && body != "") {
      setLoading(true);
      await axios
        .put(`/comments/${JSON.stringify(id)}`, {
          postId: postId,
          name: name,
          email: email,
          body: body,
        })
        .then(function (response) {
          setLoading(false);
          Alert.alert(
            "Comment Update",
            ` Comment With Id ${id} Updated SuccessFully`
          );
          cleanInputs();
          navigation.navigate("Comments");
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
    setPostId("");
    setBody("");
    setEmail("");
    setName("");
  };

  if (loading)
    return <LoadingScreen text={"Loading... Please wait"} />;
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar.Image size={74} source={require("../assets/postIcon.png")} />
          <Text style={styles.headerText}>Update Comment</Text>
        </View>
        <View style={styles.TextContainer}>
          <TextInputComp
            label="PostId"
            maxLength={2}
            value={postId}
            keyboardType="number-pad"
            onChangeText={(text) => setPostId(text.replace(/[^0-9]/g, ""))}
            placeholder="Enter PostId"
          />
          <TextInputComp
            label="Name"
            placeholder="Enter Post's Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInputComp
            label="Email"
            placeholder="Enter Post's Name"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInputComp
            label="Body"
            placeholder="Write The Body ..."
            multiline={true}
            numberOfLines={10}
            style={styles.textArea}
            value={body}
            onChangeText={(text) => setBody(text)}
          />
          <Button
            mode="contained"
            color={"#f08e25"}
            labelStyle={{ color: "white", fontSize: 15 }}
            style={styles.btn}
            onPress={handleInputsHandler}
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
    marginTop: 10,
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
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    textAlignVertical: "top",
  },
});
export default UpdateCommentScreen;
