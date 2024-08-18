import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/bgudipa.png")}
          style={styles.headerImage}
        />
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/undipa.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.appTitle}>APLIKASI KKL</Text>
        <Text style={styles.universityName}>UNIVERSITAS DIPA MAKASSAR</Text>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center", 
  },
  header: {
    height: 250,
    backgroundColor: "red",
    width: "100%",
    marginBottom: 10,
  },
  headerImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover", // Membuat gambar header responsif
  },
  logoContainer: {
    alignItems: "center", // Mengatur logo ke tengah secara horizontal
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain", // Membuat gambar logo responsif
  },
  textContainer: {
    alignItems: "center", // Mengatur teks ke tengah secara horizontal
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold", // Membuat teks "APLIKASI KKL" bold
    textAlign: "center", // Mengatur teks ke tengah
    marginBottom: 5,
  },
  universityName: {
    fontSize: 18,
    fontWeight: "bold", // Membuat teks "UNIVERSITAS DIPA MAKASSAR" bold
    textAlign: "center", // Mengatur teks ke tengah
  },
});
