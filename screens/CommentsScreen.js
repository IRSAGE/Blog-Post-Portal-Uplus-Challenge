import React, { useState, useEffect } from "react";
import axios from "../axios";
import { View, FlatList, Alert } from "react-native";

import Cell from "../components/Cell";
import LoadingScreen from "./LoadingScreen";
import CellData from "../components/CellData";

const CommentsScreen = ({ navigation }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/comments");
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        Alert.alert("Something went Wrong", error.message);
        console.log(error);
      }
    };
    getComments();
  }, []);

  const itemClickedHandler = (itemId) => {
    navigation.navigate("CommentDetail", {
      commentId: itemId,
    });
  };

  if (loading || comments.length == 0)
    return <LoadingScreen text={"Retriving Comments.... Please wait"} />;

  return (
    <View style={{ flex: 1 }}>
      <Cell first="Id" second="Email" third="Body" />
      <FlatList
        data={comments}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={(comment) => (
          <CellData
            first={comment.item.id}
            second={comment.item.email}
            third={comment.item.body}
            onItemPressed={itemClickedHandler}
          />
        )}
      />
    </View>
  );
};

export default CommentsScreen;
