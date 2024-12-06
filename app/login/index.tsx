import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';

// Define a type for the image items
type ImageItem = {
  id: string;
  uri: string;
};

const { width, height } = Dimensions.get('window');
const images: ImageItem[] = [
  { id: '1', uri: 'https://via.placeholder.com/300x200.png?text=Image+1' },
  { id: '2', uri: 'https://via.placeholder.com/300x200.png?text=Image+2' },
  { id: '3', uri: 'https://via.placeholder.com/300x200.png?text=Image+3' },
];

export default function LoginScreen() {
  const router = useRouter();
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const inAppPasscode = '1234'; // App passcode

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Face ID or Passcode',
      fallbackLabel: 'Use App Passcode',
    });

    if (result.success) {
      router.push('/funtions');
    } else {
      setShowPasscodeModal(true);
    }
  };

  const validatePasscode = () => {
    if (enteredPasscode === inAppPasscode) {
      setShowPasscodeModal(false);
      router.push('/funtions');
    } else {
      Alert.alert('Incorrect Passcode', 'The passcode you entered is incorrect.');
    }
  };

  // Update renderCarouselItem to use the correct type for 'item'
  const renderCarouselItem = ({ item }: { item: ImageItem }) => (
    <View style={styles.carouselCard}>
      <Image source={{ uri: item.uri }} style={styles.carouselImage} />
      <Text style={styles.carouselLabel}>Label</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Move Carousel Higher */}
      <FlatList
        data={images}
        renderItem={renderCarouselItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      />

      {/* Descriptions */}
      <Text style={styles.description}>
        Many Features Waiting for You in AlligatorX...
      </Text>
      <Text style={styles.secondaryDescription}>
        Unlock a world of possibilities with AlligatorX! Our platform is packed with advanced features designed to enhance your experience. Don’t miss out—discover what’s waiting for you today! 🚀
      </Text>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleBiometricAuth}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>
        Don’t have a passcode? Create here!
        {'\n'}Copyright ©2024 by AlligatorX. All rights reserved.
      </Text>

      {/* Passcode Modal */}
      <Modal visible={showPasscodeModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter App Passcode</Text>
            <TextInput
              style={styles.passcodeInput}
              secureTextEntry
              keyboardType="numeric"
              placeholder="Enter App Passcode"
              value={enteredPasscode}
              onChangeText={setEnteredPasscode}
            />
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={validatePasscode}
            >
              <Text style={styles.modalButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.1, // Increased padding to bring elements higher
  },
  carousel: {
    alignItems: 'center',
    marginTop: height * 0.01, // Adjusted to make the carousel more prominent
  },
  carouselCard: {
    width: width * 0.9, // Adjust to fit the screen width
    height: 216,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    overflow: 'hidden', // Ensures image does not overflow the card
  },
  carouselImage: {
    width: '100%', // Occupies the full width of the card
    height: '100%', // Occupies the full height of the card
    resizeMode: 'cover', // Maintains image ratio
  },
  carouselLabel: {
    position: 'absolute', // Overlay the label on the image
    bottom: 10,
    color: '#FFFFFF',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for better readability
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 25,
    paddingHorizontal: 25,
  },
  secondaryDescription: {
    fontSize: 14,
    color: '#BBBBBB',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 150,
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#A991FF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 100, // Increased margin to prevent overlap with footer
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30, // Adjusted to provide space above the button
    fontSize: 12,
    color: '#777777',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  passcodeInput: {
    width: '100%',
    backgroundColor: '#2C2C2E',
    color: '#FFFFFF',
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#34C759',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
