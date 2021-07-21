import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import axios from "../axios";
import LoadingScreen from "./LoadingScreen";

const PostDetailsScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true)
     axios
      .get(`/posts/${JSON.stringify(postId)}`)
      .then((response) => {
          setPost(response.data);
          setLoading(false);
        console.log(response.data);
      })
      .catch(function (error) {
        alert("Something went Wrong");
        console.log(error);
      });
  }, []);

    
    if (loading)
      return <LoadingScreen text={"Retriving Post Information ... Please wait"} />;
    
  return (
    <View>
      <Text>{postId} Informations</Text>
      <Text>{post.id}</Text>
      <Text>{post.title}</Text>
      <Text>{post.userId}</Text>
      <Text>{post.body}</Text>
    </View>
  );
};

export default PostDetailsScreen;
