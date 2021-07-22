import React, { useState } from "react";

import axios from "../axios";

import { View, Text, ScrollView, StyleSheet, Keyboard } from "react-native";
import { Button, Avatar } from "react-native-paper";
import TextInputComp from "../components/TextInputComp";
import LoadingScreen from "./LoadingScreen";

const CreateCommentScreen = ({navigation}) => {
  const [postId, setPostId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputsHandler = async () => {
    if (postId != "" && name != "" && email != "" && body != "") {
      setLoading(true);
      await axios
        .post("/comments", {
          postId: postId,
          name: name,
          email: email,
          body: body,
        })
        .then(function (response) {
          setLoading(false);
          alert("Comment Created Successfull");
          cleanInputs()
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
    setPostId("");
    setBody("");
    setEmail("");
    setName("");
  };

  if (loading)
    return <LoadingScreen text={"Creating New Comment ... Please wait"} />;
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar.Image size={74} source={require("../assets/Avatar.png")} />
          <Text style={styles.headerText}>Create A New Comment</Text>
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
            color={"#1e4643"}
            labelStyle={{ color: "white", fontSize: 15 }}
            style={styles.btn}
            onPress={handleInputsHandler}
          >
            Create Comment
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
    color: "#1e4643",
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    textAlignVertical: "top",
  },
});

export default CreateCommentScreen;
