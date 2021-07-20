import React, { useState, useEffect } from "react";
import axios from "../axios";

import { View, FlatList } from "react-native";
import Cell from "../components/Cell";

const PostsScreen = () => {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    const posts = axios.get("/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Cell first="Id" second="Title" third="Body" />
      <FlatList
        data={Posts}
        renderItem={(post) => (
          <Cell
            first={post.item.id}
            second={post.item.title}
            third={post.item.body}
          />
        )}
      />
    </View>
  );
};

export default PostsScreen;
