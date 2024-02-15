import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./Menu";
import Quiz from "./Quiz";
import Gallery from "./Gallery";
import VideoPlayer from "./VideoPlayer";
import ImageViewer from "./ImageViewer";
import Player from "./Player";
import SongList from "./SongList";
import Puzzle from "./Puzzle";
import { SafeAreaProvider } from "react-native-safe-area-context"; // Importa SafeAreaProvider
import { SoundContext } from "./SoundContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function App() {
  const [sound, setSound] = useState(null);

  return (
    <SoundContext.Provider value={{ sound, setSound }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="VideoPlayer">
            <Stack.Screen
              name="VideoPlayer"
              component={VideoPlayer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{ headerLeft: () => null, headerShown: false }}
            />
            <Stack.Screen
              name="Quiz"
              component={Quiz}
              options={headerOptions("Preguntas")}
            />
            <Stack.Screen
              name="Gallery"
              component={Gallery}
              options={headerOptions("Nuestra Galería")}
            />
            <Stack.Screen
              name="ImageViewer"
              component={ImageViewer}
              options={headerOptions("Visor de Imágenes", "white", "black")}
            />
            <Stack.Screen
              name="Player"
              component={Player}
              options={headerOptions("Reproductor")}
            />
            <Stack.Screen
              name="SongList"
              component={SongList}
              options={headerOptions("Lista de Canciones")}
            />
            <Stack.Screen
              name="Puzzle"
              component={Puzzle}
              options={headerOptions("Rompecabezas")}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </SoundContext.Provider>
  );
}

// Función para configurar las opciones del encabezado
const headerOptions = (
  title,
  textColor = "red",
  backgroundColor = "#FEEAE6"
) => ({
  headerTitle: title,
  headerTitleAlign: "center",
  headerTitleStyle: {
    color: textColor,
  },
  headerStyle: {
    backgroundColor: backgroundColor,
  },
});
