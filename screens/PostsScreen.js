import React, { useState, useEffect } from "react";
import axios from "../axios";

import { View, FlatList, Alert } from "react-native";
import Cell from "../components/Cell";
import CellData from "../components/CellData";
import LoadingScreen from "./LoadingScreen";

const PostsScreen = ({ navigation }) => {
  const [Posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/posts");
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        Alert.alert("Something went Wrong", error.message);
        console.log(error);
      }
    };
    getPosts();
  }, []);

  const itemClickedHandler = (itemId) => {
    navigation.navigate("PostDetails", {
      postId: itemId,
    });
  };

  if (loading || Posts.length == 0)
    return <LoadingScreen text={"Retriving Posts.... Please wait"} />;

  return (
    <View style={{ flex: 1 }}>
      <Cell first="Id" second="Title" third="Body" />
      <FlatList
        data={Posts}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={(post) => (
          <CellData
            first={post.item.id}
            second={post.item.title}
            third={post.item.body}
            onItemPressed={itemClickedHandler}
          />
        )}
      />
    </View>
  );
};

export default PostsScreen;
