import React, { useState, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function SongList({ navigation }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: "Nuestras Canciones" });
  }, []);

  useEffect(() => {
    axios
      .get("https://innovaaic.com/apilove/songs.php")
      .then((response) => {
        setSongs(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAddSong = async () => {
    // Abre el selector de documentos para que el usuario pueda seleccionar un archivo
    const result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });

    if (result.type === "success") {
      // El usuario seleccionó un archivo, puedes hacer algo con el archivo aquí
      const fileUri = result.uri;
      const fileName = result.name;
      const fileType = result.type;

      // Lee el archivo como base64
      const fileData = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Crea un objeto FormData y añade el archivo
      const formData = new FormData();
      formData.append("file", {
        name: fileName,
        type: fileType,
        uri: fileData,
      });

      // Envía el archivo a tu servidor
      axios
        .post("https://innovaaic.com/apilove/upload.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          Alert.alert("Archivo subido", "El archivo se subió correctamente");
        })
        .catch((error) => {
          Alert.alert("Error al subir el archivo", error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.songItem}
            onPress={() => navigation.navigate("Player", { song: item })}
          >
            <Text style={styles.songTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEEAE6",
    padding: 10,
    position: "relative",
  },
  songItem: {
    backgroundColor: "#FF7F7F",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  songTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
