import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  BackHandler,
  ImageBackground,
  Modal,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importar todas las imágenes de regalo
import Regalo1 from "./assets/imagenes/regalo1.png";
import Regalo2 from "./assets/imagenes/regalo2.png";
import Regalo3 from "./assets/imagenes/regalo3.png";

export default function Menu({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width * 0.8
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Verificar si hay un regalo seleccionado guardado en AsyncStorage al cargar el componente
    checkSelectedGift();
  }, []);

  const exitApp = () => {
    BackHandler.exitApp();
  };

  const checkSelectedGift = async () => {
    try {
      const value = await AsyncStorage.getItem("@selectedGift");
      if (value !== null) {
        // Si hay un regalo seleccionado, actualiza el estado
        setSelectedGift(value);
      }
    } catch (error) {
      console.error("Error al recuperar el regalo:", error);
    }
  };

  const clearSelectedGift = async () => {
    try {
      await AsyncStorage.removeItem("@selectedGift");
      setSelectedGift(null); // Limpiar el estado local
    } catch (error) {
      console.error("Error al borrar el regalo:", error);
    }
  };

  const handleGiftSelect = async (gift) => {
    // Guardar el regalo seleccionado en AsyncStorage
    try {
      await AsyncStorage.setItem("@selectedGift", gift);
      setSelectedGift(gift);
    } catch (error) {
      console.error("Error al guardar el regalo:", error);
    }
    setModalVisible(false);
  };

  const renderModalContent = () => {
    if (selectedGift) {
      // Si hay un regalo seleccionado, muestra solo esa imagen
      let selectedGiftImage;
      switch (selectedGift) {
        case "regalo1.png":
          selectedGiftImage = Regalo1;
          break;
        case "regalo2.png":
          selectedGiftImage = Regalo2;
          break;
        case "regalo3.png":
          selectedGiftImage = Regalo3;
          break;
        default:
          break;
      }

      return (
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButton}>Cerrar</Text>
          </TouchableOpacity>
          <View style={styles.giftContainer}>
            <Image source={selectedGiftImage} style={styles.giftImage} />
          </View>
        </View>
      );
    } else {
      // Si no hay un regalo seleccionado, muestra las opciones de regalos
      return (
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButton}>Cerrar</Text>
          </TouchableOpacity>
          <View style={styles.giftContainer}>
            <TouchableOpacity
              style={styles.giftItem}
              onPress={() => handleGiftSelect("regalo1.png")}
            >
              <Image
                source={require("./assets/imagenes/regalo.png")}
                style={styles.giftImage2}
              />
              <Text style={styles.giftText}>Regalo 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.giftItem}
              onPress={() => handleGiftSelect("regalo2.png")}
            >
              <Image
                source={require("./assets/imagenes/regalo.png")}
                style={styles.giftImage2}
              />
              <Text style={styles.giftText}>Regalo 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.giftItem}
              onPress={() => handleGiftSelect("regalo3.png")}
            >
              <Image
                source={require("./assets/imagenes/regalo.png")}
                style={styles.giftImage2}
              />
              <Text style={styles.giftText}>Regalo 3</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <ImageBackground
      source={require("./assets/imagenes/amor.png")}
      style={styles.backgroundImage}
    >
      <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
        <TouchableOpacity
          style={{ ...styles.giftIconContainer }}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require("./assets/imagenes/regalo.png")}
            style={styles.giftIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, width: buttonWidth }}
          onPress={() => navigation.navigate("Quiz")}
        >
          <Text style={styles.buttonText}>Preguntas</Text>
        </TouchableOpacity>

        {/*<TouchableOpacity
          style={{ ...styles.button, width: buttonWidth }}
          onPress={() => clearSelectedGift()} // Aquí llamamos a la función clearSelectedGift
        >
          <Text style={styles.buttonText}>Borrar regalo seleccionado</Text>
  </TouchableOpacity>*/}

        <TouchableOpacity
          style={{ ...styles.button, width: buttonWidth }}
          onPress={() => navigation.navigate("Gallery")}
        >
          <Text style={styles.buttonText}>Nuestra Galería</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, width: buttonWidth }}
          onPress={() => navigation.navigate("SongList")}
        >
          <Text style={styles.buttonText}>Nuestro PlayList</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, width: buttonWidth }}
          onPress={() => navigation.navigate("Puzzle")}
        >
          <Text style={styles.buttonText}>Rompecabezas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.button,
            width: buttonWidth,
            backgroundColor: "#FF3B3B",
          }}
          onPress={exitApp}
        >
          <Text style={styles.buttonText}>Salir</Text>
        </TouchableOpacity>
      </Animated.View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {renderModalContent()}
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "#FF7F7F",
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  giftIconContainer: {
    position: "absolute",
    top: -120,
    right: 20,
    zIndex: 1,
  },
  giftIcon: {
    width: 40,
    height: 40,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  giftContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  giftItem: {
    alignItems: "center",
  },
  giftImage: {
    width: 300,
    height: 300,
  },
  giftText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
  },
  giftImage2: {
    width: 100,
    height: 100,
  },
});
