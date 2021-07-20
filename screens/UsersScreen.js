import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import axios from "../axios";
import Cell from "../components/Cell";

const UsersScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const Users = axios.get("/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Cell first="Id" second="Name" third="Phone Number" />
      <FlatList
        data={users}
        renderItem={(users) => (
          <Cell
            first={users.item.id}
            second={users.item.name}
            third={users.item.phone}
          />
        )}
      />
    </View>
  );
};

export default UsersScreen;
