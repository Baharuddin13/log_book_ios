import { StyleSheet, Text, View, Button, Dimensions, Image, ScrollView } from 'react-native'
import React from 'react'

function HomeScreen({ navigation }) {
  const { height, width } = Dimensions.get("window");
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 250,
          width: 360,
          backgroundColor: "red",
          marginBottom: 10,
        }}
      >
        <Image
          source={require("../../assets/bgudipa.png")}
          style={{ height: 250, width: 360, backgroundColor: "red" }}
        />
      </View>
      <ScrollView horizontal>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.card}>
            <Text style={{ color: "green", fontSize: 16 }}>Hadir</Text>
          </View>
          <View style={styles.card}>
            <Text style={{ color: "red", fontSize: 16 }}> Tidak Hadir</Text>
          </View>
          <View style={styles.card}>
            <Text>Laporan</Text>
          </View>
        </View>
      </ScrollView>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
}

export default HomeScreen;
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 150,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
});