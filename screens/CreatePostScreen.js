import React, { useState } from "react";

import axios from "../axios";

import { View, Text, ScrollView, StyleSheet, Keyboard } from "react-native";
import { Button, Avatar } from "react-native-paper";
import TextInputComp from "../components/TextInputComp";

const CreatePostScreen = () => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleInputsHandler = () => {
    if (userId != "" && title != "" && body != "") {
      axios
        .post("/posts", {
          title: title,
          body: body,
        })
        .then(function (response) {
          alert("Post Created Successfull");
          console.log(response.data);
        })
        .catch(function (error) {
          alert("Sommething is Wrong");
          console.log(error);
        });
      console.log(userId, title, body);
    } else {
      alert("There Are Some Missing Value");
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar.Image size={74} source={require("../assets/Avatar.png")} />
          <Text style={styles.headerText}>Create A New Post</Text>
        </View>
        <View style={styles.TextContainer}>
          <TextInputComp
            label="UserId"
            maxLength={2}
            value={userId}
            keyboardType="number-pad"
            onChangeText={(text) => setUserId(text)}
            placeholder="Enter UserId"
          />
          <TextInputComp
            label="Title"
            placeholder="Enter Post's Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
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
            Create Post
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

export default CreatePostScreen;
