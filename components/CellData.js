import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CellData = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onItemPressed.bind(this, props.first)}
    >
      <View style={styles.listItem}>
        <Text style={{ flex: 1, color: "#1e4643" }}>{props.first}</Text>
        <Text style={{ flex: 2, color: "#1e4643" }}>{props.second}</Text>
        <Text style={{ flex: 3, color: "#1e4643"}}>{props.third}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 5,
    flexDirection: "row",
    height: 50,
    width: "95%",
    marginVertical: 4,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.3,
  },
});

export default CellData;
