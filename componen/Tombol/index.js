import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from 'react'

const tekan = () => {
  alert("Haiiiiiiiii tolollll");
};

export default function index() {
  return (
    <TouchableOpacity style={styles.button} onPress={tekan}>
      <Text>Text</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    height: 50,
    width: 250,
    borderRadius: 10,
    // padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  
});