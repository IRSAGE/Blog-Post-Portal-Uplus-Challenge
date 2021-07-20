import React from 'react'
import { StyleSheet } from 'react-native';
import { TextInput } from "react-native-paper";


const TextInputComp = (props) => {
    return (
      <TextInput
        {...props}
        style={styles.Text}
        mode="outlined"
        label={props.label}
        placeholder={props.placeholder}
        // right={<TextInput.Affix text="/100" />}
      />
    );
}

const styles = StyleSheet.create({
  Text: {
    width: "80%",
    height:35,
    marginVertical:5
  },
});

export default TextInputComp;
