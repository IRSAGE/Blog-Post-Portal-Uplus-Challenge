import React, { useState, useEffect } from "react";
import axios from "../axios";

import { View, FlatList } from "react-native";
import Cell from "../components/Cell";
import CellData from "../components/CellData";

const PostsScreen = ({navigation}) => {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    const posts = axios.get("/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  const itemClickedHandler = (itemId) => {
    navigation.navigate("PostDetails", {
      postId: itemId,
    });
  };

  return (
    <View style={{ flex: 1}}>
      <Cell first="Id" second="Title" third="Body" />
      <FlatList
        data={Posts}
        style={{ }}
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
