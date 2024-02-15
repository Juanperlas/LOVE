import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Video } from "expo-av";
import React, { useState, useRef, useEffect } from "react";

export default function VideoPlayer({ navigation }) {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    if (status.didJustFinish) {
      navigation.navigate("Menu");
    }
  }, [status]);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={require("./assets/videos/video.mp4")}
        resizeMode="contain"
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={setStatus}
      />
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    alignSelf: "stretch",
    width: "100%",
    height: "100%",
  },
});
