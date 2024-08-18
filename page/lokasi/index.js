import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

export default function LokasiScreen({ route }) {

  // nama instansi
  const lastNamainstansi = route.params?.lastNamainstansi;
  // latitute dari login
  const lastLat = route.params?.lastLat;
  // longitute dari login
  const lastLon = route.params?.lastLon;
  // id instansi
  const id_instansi = route.params?.lastId_instansi;
  // lokasi 
  
  const [LocationLat, SetLocationLat] = useState(parseFloat(lastLat));
  const [LocationLon, SetLocationLon] = useState(parseFloat(lastLon));

  // console.log(typeof LocationLat);

    useEffect(() => {
      
    }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: LocationLat,
          longitude: LocationLon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: LocationLat,
            longitude: LocationLon,
          }}
          title={"Lokasi KKL"}
          description={lastNamainstansi}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
