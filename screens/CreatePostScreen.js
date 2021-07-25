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
import { Picker } from "@react-native-picker/picker";
import { Button, Avatar } from "react-native-paper";
import TextInputComp from "../components/TextInputComp";
import LoadingScreen from "./LoadingScreen";

const CreatePostScreen = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        Alert.alert("Something went Wrong", error.message);
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleInputsHandler = async () => {
    if (userId != "" && title != "" && body != "") {
      try {
        setLoading(true);
        await axios.post("/posts", {
          userId: userId,
          title: title,
          body: body,
        });
        setLoading(false);
        Alert.alert("Post Creation", "Post Created Successfull");
        cleanInputs();
        navigation.goBack();
      } catch (error) {
        Alert.alert("Something went Wrong", error.message);
        console.log(error);
      }
    } else {
      Alert.alert("Check Your Inputs", "There Are Some Missing Value");
    }
  };

  const cleanInputs = () => {
    setUserId("");
    setTitle("");
    setBody("");
  };

  if (loading) return <LoadingScreen text={"Loading... Please wait"} />;

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar.Image size={84} source={require("../assets/postIcon.png")} />
          <Text style={styles.headerText}>Create A New Post</Text>
        </View>
        <View style={styles.TextContainer}>
          <Picker
            selectedValue={userId}
            style={{ height: 50, width: 300, flex: 1 }}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue != "0") setUserId(itemValue);
            }}
          >
            <Picker.Item label="Select A User..." value="0" />
            {users.map(({ name, id }) => {
              return <Picker.Item value={id} label={name} key={id} />;
            })}
          </Picker>
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
            color={"#1e4643"}
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
    color: "#1e4643",
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    textAlignVertical: "top",
  },
  Text: {
    width: "80%",
    height: 35,
    marginVertical: 5,
  },
});

export default CreatePostScreen;
