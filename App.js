import * as React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Tampilan
import HomeScreen from "./page/home";
import LokasiScreen from "./page/lokasi";
import LaporanScreen from "./page/lapor";
import ProfileScreen from "./page/profile";
import LoginScreen from "./page/login";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainDrawer() {
  const route = useRoute();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Lokasi") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Laporan") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ae0001",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ lastLat: route.params?.lastLat }}
      />
      <Tab.Screen
        name="Laporan"
        component={LaporanScreen}
        initialParams={{
          lastLat: route.params?.lastLat,
          lastLon: route.params?.lastLon,
          lastStb: route.params?.lastStb,
        }}
        options={{
          headerStyle: { backgroundColor: "#ae0001" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Tab.Screen
        name="Lokasi"
        component={LokasiScreen}
        initialParams={{
          lastId_instansi: route.params?.lastId_instansi,
          lastNamainstansi: route.params?.lastNamainstansi,
          lastLat: route.params?.lastLat,
          lastLon: route.params?.lastLon,
        }}
        options={{
          headerStyle: { backgroundColor: "#ae0001" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{
          lastData: route.params?.lastData,
          lastStb: route.params?.lastStb,
          lastId_instansi: route.params?.lastId_instansi,
        }}
        options={{
          headerStyle: { backgroundColor: "#ae0001" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerStyle: { backgroundColor: "#ae0001" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            title: 'APLIKASI PELAPORAN KKL'
          }}
        />
        <Stack.Screen
          name="MainDrawer"
          component={MainDrawer}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Laporan" component={LaporanScreen} />
        <Stack.Screen name="Lokasi" component={LokasiScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
