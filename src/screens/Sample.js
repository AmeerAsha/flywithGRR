import React from 'react';
import { Image, View } from 'react-native';

const getFileUri = (imageName) => {
  // Assuming images are stored in a specific directory, e.g., `file:///storage/emulated/0/YourApp/images/`
  const basePath = 'file:///storage/emulated/0/AirlineCodes/';
  return `${basePath}${imageName}.png`;
};

const MyComponent = ({ imageName }) => {
  const imageUri = getFileUri(imageName);

  return (
    <View>
      <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
    </View>
  );
};

export default MyComponent;
