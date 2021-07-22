import React from 'react'
import { Text, StyleSheet } from "react-native";

const DetailText = (props) => {
    return <Text style={styles.text}>{props.children}</Text>;
}


const styles = StyleSheet.create({
  text: {
    padding: 5,
    width: "95%",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 4,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderColor: "grey",
     color:"#1e4643",
    borderWidth: 0.3,
  },
});

export default DetailText
