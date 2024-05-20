import * as React from 'react';
import { Button, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Tampilan
import HomeScreen from "./page/home";
import LokasiScrean from "./page/lokasi";
import LaporanScrean from "./page/lapor";

function ProfileScrean({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({}) => (
              <Image
                source={require("./assets/icons/home.png")}
                style={{ width: 20, height: 20 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Laporan"
          component={LaporanScrean}
          options={{
            // headerShown: false,
            tabBarIcon: ({}) => (
              <Image
                source={require("./assets/icons/laporan.png")}
                style={{ width: 20, height: 20 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Lokasi"
          component={LokasiScrean}
          options={{
            // headerShown: false,
            tabBarIcon: ({}) => (
              <Image
                source={require("./assets/icons/lokasi.png")}
                style={{ width: 20, height: 20 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScrean}
          options={{
            // headerShown: false,
            tabBarIcon: ({}) => (
              <Image
                source={require("./assets/icons/user.png")}
                style={{ width: 20, height: 20 }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}