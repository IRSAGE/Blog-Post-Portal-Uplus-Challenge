import React from "react";
import { DataTable } from "react-native-paper";

const Cell = (props) => {
  return (
    <DataTable.Row>
      <DataTable.Cell style={{ flex: 1 }}>{props.first}</DataTable.Cell>
      <DataTable.Cell style={{ flex: 3 }}>{props.second}</DataTable.Cell>
      <DataTable.Cell style={{ flex: 2 }}>{props.third}</DataTable.Cell>
    </DataTable.Row>
  );
};

export default Cell;
