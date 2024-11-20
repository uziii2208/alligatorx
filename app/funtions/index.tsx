import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
  FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const FunctionScreen = () => {
  const [photos, setPhotos] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [documents, setDocuments] = useState<{ name: string; uri: string }[]>([]);
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [password, setPassword] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showPhotos, setShowPhotos] = useState(false);
  

  const askPhotoPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Photo library access is needed to hide photos.'
      );
    } else {
      pickPhotos();
    }
  };

  const pickPhotos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled && result.assets) {
      setPhotos((prevPhotos) => [...prevPhotos, ...result.assets]);
      Alert.alert('Success', 'Photos have been hidden.');
    }
  };

  const pickAndEncryptDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync();
  
    if (result.type === 'success') {
      setDocuments((prevDocuments) => [
        ...prevDocuments,
        { name: result.name, uri: result.uri },
      ]);
      Alert.alert('Success', 'Document has been encrypted and hidden.');
    } else {
      Alert.alert('Cancelled', 'No document was selected.');
    }
  };
  
  

  const handleSetPassword = () => {
    if (password.trim() === '') {
      Alert.alert('Error', 'Password cannot be empty.');
      return;
    }
    setIsPasswordSet(true);
    Alert.alert('Password Set', 'Your password has been successfully set.');
  };

  const handleUnlock = () => {
    if (enteredPassword === password) {
      setShowPhotos(true);
      Alert.alert('Access Granted', 'You can now view your hidden content.');
    } else {
      Alert.alert('Access Denied', 'Incorrect password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hidden Content Manager</Text>

      {!isPasswordSet ? (
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Set Password"
            placeholderTextColor="#888"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity style={styles.actionButton} onPress={handleSetPassword}>
            <Text style={styles.actionButtonText}>Set Password</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor="#888"
            secureTextEntry
            onChangeText={setEnteredPassword}
            value={enteredPassword}
          />
          <TouchableOpacity style={styles.actionButton} onPress={handleUnlock}>
            <Text style={styles.actionButtonText}>Unlock</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={[styles.actionButton, { marginVertical: 15 }]}
        onPress={askPhotoPermission}
      >
        <Text style={styles.actionButtonText}>Hide Photos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={pickAndEncryptDocument}>
        <Text style={styles.actionButtonText}>Encrypt and Hide Documents</Text>
      </TouchableOpacity>

      {showPhotos && (
        <View style={styles.hiddenContentContainer}>
          <Text style={styles.subtitle}>Hidden Photos:</Text>
          <FlatList
            data={photos}
            keyExtractor={(item, index) => `${item.uri}-${index}`}
            renderItem={({ item }) => (
              <Text style={styles.hiddenItem}>{item.uri}</Text>
            )}
          />

          <Text style={styles.subtitle}>Hidden Documents:</Text>
          <FlatList
            data={documents}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item }) => (
              <Text style={styles.hiddenItem}>{item.name}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default FunctionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#083D27',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  passwordContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#2E2E2E',
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
    padding: 15,
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#0A84FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hiddenContentContainer: {
    marginTop: 20,
    width: '100%',
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hiddenItem: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
});
