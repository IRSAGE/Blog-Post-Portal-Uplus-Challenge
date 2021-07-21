import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import axios from "../axios";
import Cell from "../components/Cell";
import CellData from "../components/CellData";
import LoadingScreen from "./LoadingScreen";

const UsersScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const Users = axios
      .get("/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        alert("Something went Wrong");
        console.log(error);
      });
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
