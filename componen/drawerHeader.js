import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";

const CustomDrawerHeader = () => {
  return (
    <LinearGradient
      colors={["#D6D760", "#FBFCAC"]}
      start={{ x: 0, y: 0 }} // Horizontal gradient
      end={{ x: 1, y: 0 }} // Horizontal gradient
      style={styles.headerContainer}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/undipa.png")}
          style={{ width: 80, height: 80 }}
        />
        <Text style={{ fontSize: 15, color: "black" }}>KKL UNDIPA MAKASSAR</Text>
      </View>
    </LinearGradient>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <View style={styles.container}>
      <CustomDrawerHeader />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.3,
    // alignContent: "center",
    // alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CustomDrawerContent;
