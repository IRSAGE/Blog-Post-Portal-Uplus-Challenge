import React from "react";
import { View, Text,Image, StyleSheet } from "react-native";
import { Title, Avatar } from "react-native-paper";

const LoadingScreen = (props) => {
  return (
    <View style={styles.screen}>
     
        <Image
          source={require("../assets/loading4.gif")}
          style={styles.image}
          resizeMode="cover"
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
  },
  imageContainer: {
    width: "60%",
    height: "60%",
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "60%",
    height: "60%",
  },
});

export default LoadingScreen;
