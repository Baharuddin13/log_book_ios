import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

function LokasiScrean({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Lokasi</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

export default LokasiScrean;

const styles = StyleSheet.create({})