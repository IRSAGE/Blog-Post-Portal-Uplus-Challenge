import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import axios from "../axios";
import Cell from "../components/Cell";
import CellData from "../components/CellData";

const UsersScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const Users = axios.get("/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

const itemClickedHandler = (itemId) => {
  navigation.navigate("UserDetails", {
    userId: itemId,
  });
};

  return (
    <View style={{ flex: 1 }}>
      <Cell first="Id" second="Name" third="Phone Number" />
      <FlatList
        data={users}
        renderItem={(users) => (
          <CellData
            first={users.item.id}
            second={users.item.name}
            third={users.item.phone}
            onItemPressed={itemClickedHandler}
          />
        )}
      />
    </View>
  );
};

export default UsersScreen;
