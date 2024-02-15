// Gallery.js
import React, { useState, useEffect } from "react";
import { FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function Gallery({ navigation }) {
  useEffect(() => {
    navigation.setOptions({ title: "Nuestra Galería" });
  }, []);

  const [images, setImages] = useState([
    "https://innovaaic.com/love/imagenes/1.jpg",
    "https://innovaaic.com/love/imagenes/2.jpg",
    "https://innovaaic.com/love/imagenes/3.jpg",
    "https://innovaaic.com/love/imagenes/4.jpg",
    "https://innovaaic.com/love/imagenes/5.jpg",
    "https://innovaaic.com/love/imagenes/6.jpg",
    "https://innovaaic.com/love/imagenes/7.jpg",
    "https://innovaaic.com/love/imagenes/8.jpg",
    "https://innovaaic.com/love/imagenes/9.jpg",
    "https://innovaaic.com/love/imagenes/10.jpg",
    "https://innovaaic.com/love/imagenes/11.jpg",
    "https://innovaaic.com/love/imagenes/12.jpg",
    "https://innovaaic.com/love/imagenes/13.jpg",
    "https://innovaaic.com/love/imagenes/14.jpg",
    "https://innovaaic.com/love/imagenes/15.jpg",
    "https://innovaaic.com/love/imagenes/16.jpg",
    "https://innovaaic.com/love/imagenes/17.jpg",
    "https://innovaaic.com/love/imagenes/18.jpg",
    "https://innovaaic.com/love/imagenes/19.jpg",
    // Añade más URLs de imágenes aquí
  ]);

  return (
    <FlatList
      data={images}
      numColumns={3}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            navigation.navigate("ImageViewer", { images, selectedImage: item })
          }
        >
          <Image source={{ uri: item }} style={styles.image} />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "33%",
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
