import React, { useState, useEffect } from "react";
import { View, FlatList, Alert } from "react-native";
import axios from "../axios";
import Cell from "../components/Cell";
import CellData from "../components/CellData";
import LoadingScreen from "./LoadingScreen";

import { useStateValue } from "../context/BlogProvider";

const UsersScreen = ({ navigation }) => {
  const [, dispatch] = useStateValue();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        Alert.alert("Something went Wrong", error.message);
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const itemClickedHandler = (itemId) => {
    navigation.navigate("UserDetails", {
      userId: itemId,
    });
  };

  if (loading || users.length == 0)
    return <LoadingScreen text={"Retriving Users.... Please wait"} />;

  return (
    <View style={{ flex: 1 }}>
      <Cell first="Id" second="Name" third="Phone Number" />
      <FlatList
        data={users}
        keyExtractor={(item, index) => item + index.toString()}
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
