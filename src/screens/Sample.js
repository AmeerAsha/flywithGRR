import React, { useState, useRef } from 'react';
import { View, Text, Button, Modal, Animated, TouchableOpacity, StyleSheet } from 'react-native';

const Sample = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current; // Initial position of the modal (off-screen)

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Final position (on-screen)
      duration: 300, // Duration of the animation
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300, // Back to initial position (off-screen)
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false)); // Close the modal after the animation
  };

  return (
    <View style={styles.container}>
      <Button title="Open Modal" onPress={openModal} />

      <Modal transparent visible={modalVisible} animationType="none">
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
              <Text>This is the modal content!</Text>
              <Button title="Close Modal" onPress={closeModal} />
            </Animated.View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 200,
  },
});

export default Sample;
