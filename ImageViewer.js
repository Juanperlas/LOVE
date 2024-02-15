import React, { useEffect } from "react";
import ImageView from "react-native-image-zoom-viewer";

export default function ImageViewer({ route, navigation }) {
  const { images, selectedImage } = route.params;
  const imageUrls = images.map((uri) => ({ url: uri }));
  const initialIndex = images.indexOf(selectedImage);

  useEffect(() => {
    navigation.setOptions({ title: "Somos eternos <3" });
  }, []);

  return <ImageView imageUrls={imageUrls} index={initialIndex} />;
}
