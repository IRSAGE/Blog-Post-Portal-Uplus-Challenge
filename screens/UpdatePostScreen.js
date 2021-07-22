import React, { useState, useRef } from "react";

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

const UpdatePostScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [post, setPost] = useState({});

  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  if (id) {
    setLoading(true);
    axios
      .get(`/posts/${JSON.stringify(id)}`)
      .then((response) => {
        setPost(response.data);
        settingInputs();
        setLoading(false);
      })
      .catch(function (error) {
        Alert.alert("Something went Wrong", "Please Check Your Internet");
        console.log(error);
      });
  }

  const settingInputs = () => {
    setUserId(post.userId);
    setTitle(post.title);
    setBody(post.body);
  };

//   const handleInputsHandler = async () => {
//     if (userId != "" && title != "" && body != "") {
//       setLoading(true);
//       await axios
//         .put("/posts", {
//           userId: userId,
//           title: title,
//           body: body,
//         })
//         .then(function (response) {
//           setLoading(false);
//            Alert.alert(
//              "Post Update",
//              ` Post With Id ${postId} Updated SuccessFully`
//             );
//             cleanInputs();
//            navigation.navigate("Posts");
          
//         })
//         .catch(function (error) {
//           Alert.alert("Something went Wrong", "Please Check Your Internet");
//           console.log(error);
//         });
//     } else {
//        Alert.alert("Check Your Inputs","There Are Some Missing Value");
//     }
//   };

//   const cleanInputs = () => {
//     setUserId("");
//     setTitle("");
//     setBody("");
//   };

  if (loading)
    return <LoadingScreen text={"Loading... Please wait"} />;

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar.Image size={84} source={require("../assets/postIcon.png")} />
          <Text style={styles.headerText}>Update Post</Text>
        </View>
        <View style={styles.TextContainer}>
          <TextInputComp
            label="UserId"
            maxLength={3}
            value={userId}
            keyboardType="number-pad"
            onChangeText={(text) => setUserId(text.replace(/[^0-9]/g, ""))}
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
            onPress={()=>{}}
          >
            Update Post
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
export default UpdatePostScreen;
