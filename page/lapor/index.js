import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

function LaporanScrean({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Laporan</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

export default LaporanScrean;

const styles = StyleSheet.create({})