import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Importa las imágenes estáticamente
import image1 from "./assets/puzzle/1.jpg";
import image2 from "./assets/puzzle/2.jpg";
import image3 from "./assets/puzzle/3.jpg";
import image4 from "./assets/puzzle/4.jpg";
import image5 from "./assets/puzzle/5.jpg";
import image6 from "./assets/puzzle/6.jpg";
import image7 from "./assets/puzzle/7.jpg";
import image8 from "./assets/puzzle/8.jpg";
import image9 from "./assets/puzzle/9.jpg";
import image10 from "./assets/puzzle/10.jpg";
import image11 from "./assets/puzzle/11.jpg";
import image12 from "./assets/puzzle/12.jpg";
import image13 from "./assets/puzzle/13.jpg";
import image14 from "./assets/puzzle/14.jpg";
import image15 from "./assets/puzzle/15.jpg";
import image16 from "./assets/puzzle/16.jpg";
import image17 from "./assets/puzzle/17.jpg";
import image18 from "./assets/puzzle/18.jpg";
import image19 from "./assets/puzzle/19.jpg";
import image20 from "./assets/puzzle/20.jpg";
import image21 from "./assets/puzzle/21.jpg";
import image22 from "./assets/puzzle/22.jpg";
import image23 from "./assets/puzzle/23.jpg";
import image24 from "./assets/puzzle/24.jpg";
import image25 from "./assets/puzzle/25.jpg";

const Puzzle = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: "Nuestro Rompecabezas" });
  }, []);
  const [selectedTile, setSelectedTile] = useState(null);
  const originalImages = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
    image14,
    image15,
    image16,
    image17,
    image18,
    image19,
    image20,
    image21,
    image22,
    image23,
    image24,
    image25,
  ];
  const [gridImages, setGridImages] = useState(
    [...originalImages]
      .sort(() => Math.random() - 0.5) // Desordena las imágenes
      .reduce(
        (rows, key, index) =>
          (index % 5 == 0
            ? rows.push([key])
            : rows[rows.length - 1].push(key)) && rows,
        []
      ) // Organiza las imágenes en un formato de 5x5
  );
  const [isVictory, setIsVictory] = useState(false);

  // Función para verificar si el rompecabezas está ordenado
  const isPuzzleOrdered = () => {
    let order = 1;
    for (let i = 0; i < gridImages.length; i++) {
      for (let j = 0; j < gridImages[i].length; j++) {
        if (gridImages[i][j] !== originalImages[order - 1]) {
          return false;
        }
        order++;
      }
    }
    return true;
  };

  const handleTilePress = (row, col) => {
    const index = row * 5 + col;
    // Si la ficha ya está seleccionada y es la misma, la deselecciona
    if (selectedTile === index) {
      setSelectedTile(null);
    } else if (selectedTile !== null) {
      // Si ya hay una ficha seleccionada, intenta intercambiar las fichas
      const selectedRow = Math.floor(selectedTile / 5);
      const selectedCol = selectedTile % 5;
      const newGrid = [...gridImages];
      const temp = newGrid[selectedRow][selectedCol];
      newGrid[selectedRow][selectedCol] = newGrid[row][col];
      newGrid[row][col] = temp;
      setGridImages(newGrid);
      setSelectedTile(null); // Desactivar la selección
      if (isPuzzleOrdered()) {
        // Verificar si se ha completado el rompecabezas
        setIsVictory(true);
        Alert.alert("¡2 vidas demoraste!", "Al fin xd", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
    } else {
      // Si no hay ficha seleccionada, selecciona la ficha actual
      setSelectedTile(index);
    }
  };

  const tileStyle = (row, col) => {
    const index = row * 5 + col;
    return [
      styles.tile,
      {
        backgroundColor: selectedTile === index ? "green" : "white", // Si la ficha está seleccionada, la pinta de verde
      },
    ];
  };

  return (
    <View style={styles.container}>
      {/* Mostrar las imágenes del rompecabezas en un orden desordenado */}
      {gridImages.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((image, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              style={tileStyle(rowIndex, colIndex)}
              onPress={() => handleTilePress(rowIndex, colIndex)}
            >
              <Image source={image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
  },
  tile: {
    margin: 1,
    borderWidth: 1,
    borderColor: "black",
  },
  image: {
    width: Dimensions.get("window").width / 5.5,
    height: Dimensions.get("window").height / 10,
  },
});

export default Puzzle;
