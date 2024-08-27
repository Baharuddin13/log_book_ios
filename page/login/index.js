import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true); // Mulai loading
    try {
      const res = await axios.get(
        `https://service.undipa.ac.id/mhs.php?user=${username}&pass=${password}&api=071994`
      );
      const datas = res.data.data[0].nmmhs;
      const stb = res.data.data[0].stb;

      const instansi = await axios.get(
        `https://kkl.undipa.ac.id/api/lokasimhs.php?nim=${stb}`
      );
      const id_instansi = instansi.data.data[0].id_instansi;

      const kelompok = await axios.get(
        `https://kkl.undipa.ac.id/api/lokasimhslist.php?id=${id_instansi}`
      );
      const nmKelompok = kelompok.data.data[0].nama;
      const nama_instansi = kelompok.data.data[0].nama_instansi;
      const lat = kelompok.data.data[0].lat;
      const lon = kelompok.data.data[0].lon;

      if (datas != undefined) {
        Alert.alert("Login Success", "Welcome!");
        navigation.replace("MainDrawer", {
          lastData: datas,
          lastStb: stb,
          lastId_instansi: id_instansi,
          lastNamainstansi: nama_instansi,
          lastLat: lat,
          lastLon: lon,
        });
      } else {
        Alert.alert("Error", "Aihhh masih salah koo");
      }
    } catch (error) {
      Alert.alert("Login Gagal", "Periksa kembali password atau stambuk anda");
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContainer}
      enableOnAndroid={true}
      extraHeight={height * 0.1}
      extraScrollHeight={height * 0.1}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/undipa.png")}
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          placeholder="Stambuk"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading} // Nonaktifkan tombol saat loading
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" /> // Tampilkan loading spinner
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f8e39f",
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    alignSelf: "center",
    marginBottom: width * 0.05,
    marginTop: height * -0.05,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: height * 0.02,
    marginBottom: height * 0.02,
    borderRadius: 10,
    fontSize: height * 0.02,
  },
  button: {
    backgroundColor: "#ae0001",
    paddingVertical: height * 0.02,
    borderRadius: 30, // Mengubah kelengkungan sudut
    alignItems: "center",
    marginTop: height * 0.02,
    marginBottom: height * -0.05,
  },
  buttonText: {
    color: "#fff",
    fontSize: height * 0.02,
    fontWeight: "bold",
  },
});

export default LoginScreen;
