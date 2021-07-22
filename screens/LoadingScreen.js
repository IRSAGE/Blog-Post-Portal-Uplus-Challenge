import React from "react";
import { View, Text,Image, StyleSheet } from "react-native";
import { Title, Avatar } from "react-native-paper";

const LoadingScreen = (props) => {
  return (
    <View style={styles.screen}>
     
        <Image
          source={require("../assets/spinner.gif")}
          style={styles.image}
          resizeMode="contain"
        />
     
      <Title style={styles.text}>{props.text}</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1e4643",
  },
  image: {
    width: "40%",
    height: "40%",
  },
});

export default LoadingScreen;
