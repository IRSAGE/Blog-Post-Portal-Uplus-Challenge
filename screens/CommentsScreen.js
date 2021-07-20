import React, { useState, useEffect } from "react";
import axios from "../axios";

import { View, FlatList } from "react-native";
import Cell from "../components/Cell";

const CommentsScreen = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
      const comments = axios.get("/comments").then((response) => {
        setComments(response.data);
      });
    }, []);

  return (
    <View style={{ flex: 1 }}>
      <Cell first="Id" second="Email" third="Body" />
      <FlatList
        data={comments}
        renderItem={(comment) => (
          <Cell
            first={comment.item.id}
            second={comment.item.email}
            third={comment.item.body}
          />
        )}
      />
    </View>
  );
};

export default CommentsScreen;
