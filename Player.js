import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, Animated, Easing } from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { SoundContext } from "./SoundContext";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Player({ route, navigation }) {
  const { song } = route.params;
  const { sound, setSound } = useContext(SoundContext);
  const [status, setStatus] = useState({});
  const [heartAnimations] = useState([]);
  const [heartPositions] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: "Nuestras favoritas" });
  }, []);

  useEffect(() => {
    loadSound();
    return sound ? () => sound.unloadAsync() : undefined;
  }, []);

  useEffect(() => {
    if (status.isPlaying) {
      const timer = setInterval(createHeartAnimation, 1000);
      return () => clearInterval(timer);
    }
  }, [status.isPlaying]);

  async function loadSound() {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: song.url },
      { shouldPlay: true },
      updateStatus
    );
    setSound(newSound);
  }

  function updateStatus(status) {
    setStatus(status);
  }

  async function togglePlayback() {
    if (status.isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  }

  function createHeartAnimation() {
    const animation = new Animated.Value(0);
    const duration = 15000; // Duración de la animación en milisegundos

    Animated.timing(animation, {
      toValue: 1,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        animation.setValue(0);
      }
    });

    heartAnimations.push(animation);

    // Genera una posición aleatoria en la parte inferior de la pantalla
    const randomX = Math.random() * 300 - 150; // Rango de -150 a 150 para el ancho de la pantalla

    heartPositions.push({
      translateY: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [500, -1000],
      }),
      translateX: randomX, // Añade la posición aleatoria en el eje X
    });

    Animated.timing(heartAnimations[heartAnimations.length - 1], {
      toValue: 1,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        animation.setValue(0);
      }
    });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/imagenes/4.jpg")} />
      <Text style={styles.title}>{song.title}</Text>
      <Icon.Button
        name={status.isPlaying ? "pause" : "play"}
        backgroundColor="#FF7F7F"
        borderRadius={200}
        height={50} // Ajusta el tamaño del botón
        width={60} // Ajusta el tamaño del botón
        marginRight={-18}
        iconStyle={styles.icon} // Estilo para el icono
        onPress={togglePlayback}
      />
      <Slider
        style={styles.slider}
        value={status.positionMillis || 0}
        maximumValue={status.durationMillis || 0}
        onSlidingComplete={(value) => sound && sound.setPositionAsync(value)}
      />
      {heartAnimations.map((animation, index) => (
        <Animated.Image
          key={index}
          source={require("./assets/imagenes/heart.png")}
          style={[
            styles.heart,
            {
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                { translateY: heartPositions[index].translateY },
                { translateX: heartPositions[index].translateX },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEEAE6",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    margin: 10,
  },
  slider: {
    width: "90%",
    height: 40,
  },
  heart: {
    position: "absolute",
    width: 30,
    height: 25,
  },
  icon: {
    fontSize: 30, // Ajusta el tamaño del icono
    color: "white", // Color del icono
    marginRight: 0, // Ajusta el margen derecho para centrarlo
  },
});
