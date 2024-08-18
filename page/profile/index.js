import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useWindowDimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function ProfileScreen() {
  const { width, height } = useWindowDimensions();
  const route = useRoute();
  const navigation = useNavigation();
  const lastData = route.params?.lastData;
  const lastStb = route.params?.lastStb;
  const lastId_instansi = route.params?.lastId_instansi;

  const [nmKelompok, setNmKelompok] = useState([]);

  useEffect(() => {
    const fetchKelompok = async () => {
      try {
        const response = await axios.get(
          `https://kkl.undipa.ac.id/api/lokasimhslist.php?id=${lastId_instansi}`
        );
        setNmKelompok(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching kelompok data:", error);
      }
    };

    fetchKelompok();
  }, [lastId_instansi]);

  const handleLogout = async () => {
    try {
      // Hapus token atau data sesi yang tersimpan di SecureStore atau AsyncStorage
      await SecureStore.deleteItemAsync("userToken");

      // Arahkan pengguna ke layar login setelah logout
      navigation.replace("Login"); // Menggunakan replace untuk menghapus history sehingga pengguna tidak bisa kembali ke profil
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://example.com/profile-pic.jpg" }} // Ganti dengan URL gambar profil Anda
          style={styles.profilePic}
        />
        <Text style={styles.name}>{lastData}</Text>
        <Text style={styles.bio}>Stambuk {lastStb}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Kelompok</Text>
          {nmKelompok.length > 0 ? (
            nmKelompok.map((kelompok, index) => (
              <Text key={index} style={styles.infoText}>
                {kelompok.nama}
              </Text>
            ))
          ) : (
            <Text style={styles.infoText}>Tidak ada data kelompok</Text>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: hp("5%"),
  },
  header: {
    alignItems: "center",
    marginBottom: hp("3%"),
  },
  profilePic: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: wp("15%"),
    marginBottom: hp("2%"),
  },
  name: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  bio: {
    fontSize: wp("4%"),
    color: "gray",
    textAlign: "center",
    paddingHorizontal: wp("10%"),
  },
  infoContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: wp("5%"),
    elevation: 3,
  },
  infoBox: {
    marginBottom: hp("2%"),
  },
  infoTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    marginBottom: hp("0.5%"),
  },
  infoText: {
    fontSize: wp("4%"),
    color: "gray",
  },
  logoutButton: {
    marginTop: hp("5%"),
    backgroundColor: "#ae0001",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("30%"),
    borderRadius: 8,
    elevation: 2,
  },
  logoutButtonText: {
    fontSize: wp("4.5%"),
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
