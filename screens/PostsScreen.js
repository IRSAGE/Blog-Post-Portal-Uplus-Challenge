import React, { useState, useEffect } from "react";
import axios from "../axios";

import { View, FlatList } from "react-native";
import Cell from "../components/Cell";
import CellData from "../components/CellData";
import LoadingScreen from "./LoadingScreen";

const PostsScreen = ({ navigation }) => {
  
  const [Posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const posts = axios
      .get("/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        alert("Something went Wrong");
        console.log(error);
      });
  }, []);

  const itemClickedHandler = (itemId) => {
    navigation.navigate("PostDetails", {
      postId: itemId,
    });
  };

 if (loading || Posts.length == 0)
   return <LoadingScreen text={"Retriving Posts.... Please wait"} />;

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
