import React from "react";
import { Text } from "react-native";
import { DataTable ,Title } from "react-native-paper";

const Cell = (props) => {
  return (
    <DataTable.Row>
      <DataTable.Cell style={{ flex: 1 }}>
        <Text style={{ color: "#1e4643" ,fontSize:20 ,fontWeight:"bold" }}> {props.first}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={{ flex: 3 }}>
        <Text style={{ color: "#1e4643" ,fontSize:20 ,fontWeight:"bold" }}> {props.second}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={{ flex: 3 }}>
        <Text style={{ color: "#1e4643" ,fontSize:20 ,fontWeight:"bold" }}> {props.third}</Text>
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default Cell;
