import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { TextInput as PaperTextInput } from "react-native-paper";
import axios from "axios";
import * as Location from "expo-location";
import * as Device from "expo-device";
import * as SecureStore from "expo-secure-store";

export default function LaporanScreen({ route }) {
  const lastLat = route.params?.lastLat;
  const lastLon = route.params?.lastLon;
  const lastStb = route.params?.lastStb;

  const [reports, setReports] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [location, setLocation] = useState(null);
  const [imei, setImei] = useState(null);
  const [deviceModel, setDeviceModel] = useState(null);

  useEffect(() => {
    fetchReports();
    getLocation();
    getDeviceInfo();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "https://campa-bima.online/APIDP/lapor-om"
      );
      const fetchedReports = response.data.data.map((item) => ({
        id: item.id,
        kegiatan: item.kegiatan,
      }));
      setReports(fetchedReports);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const getDeviceInfo = async () => {
    const model = Device.modelName;
    setDeviceModel(model);

    const storedImei = await SecureStore.getItemAsync("device_imei");
    setImei(storedImei || "IMEI_UNKNOWN");
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  };

  const addReport = async () => {
    if (location) {
      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        lastLat,
        lastLon
      );

      console.log(`Jarak ke lokasi KKL: ${distance.toFixed(2)} meter`);

      if (distance <= 3000) {
        console.log("Anda berada di dalam jangkauan");
      } else {
        Alert.alert(
          "Lokasi terlalu jauh",
          "Posisi Anda terlalu jauh dari lokasi KKL"
        );
        console.log("Terlalu jauh posisinya");
        return;
      }
    }

    const currentDate = new Date();

    const dataForApi = {
      id: Math.random().toString(),
      nim: lastStb,
      tgl: currentDate.toISOString().split("T")[0],
      jam: `${startTime}-${endTime}`,
      kegiatan: reportContent,
      smt: "GENAP2324",
      status: "0",
      lat: location.coords.latitude.toString(),
      lon: location.coords.longitude.toString(),
      buat: currentDate.toISOString(),
      edit: null,
      imei: imei || "IMEI_UNKNOWN",
      model: deviceModel || "MODEL_UNKNOWN",
    };

    try {
      const res = await axios.post(
        "https://campa-bima.online/APIDP/create",
        dataForApi
      );
      console.log("Laporan berhasil ditambahkan:", res.data);
      setReports([...reports, dataForApi]);
      setStartTime("");
      setEndTime("");
      setReportContent("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.row}>
          <PaperTextInput
            label="Jam Mulai"
            value={startTime}
            onChangeText={setStartTime}
            mode="outlined"
            style={[styles.input, styles.halfInput]}
          />
          <PaperTextInput
            label="Jam Selesai"
            value={endTime}
            onChangeText={setEndTime}
            mode="outlined"
            style={[styles.input, styles.halfInput]}
          />
        </View>
        <PaperTextInput
          label="Isi Laporan"
          value={reportContent}
          onChangeText={setReportContent}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addReport}>
          <Text style={styles.buttonText}>Tambah Laporan</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reportItem}>
            <Text style={styles.reportText}>Kegiatan: {item.kegiatan}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#6200ee",
  },
  inputContainer: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    marginBottom: 8,
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 2,
  },
  reportItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
  },
  reportText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#ae0001",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
