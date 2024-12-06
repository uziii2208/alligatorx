import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';


export default function Documentsscreen() {
  const [isLockModeEnabled, setLockModeEnabled] = useState(false);
  const route = useRouter()


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Choose successfully !!!</Text>

      <View style={styles.profileContainer}>
        <View style={styles.profileImage} />
      </View>

      <TouchableOpacity style={styles.button} 
      onPress={() => {
        route.push('/photo')
      }}>
        <Text style={styles.buttonText}>Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.documentButton]}>
        <Text style={[styles.buttonText, styles.documentButtonText]}>Document</Text>
      </TouchableOpacity>

      <View style={styles.lockModeContainer}>
        <Text style={styles.lockModeText}>Enable Lock Mode</Text>
        <Switch
          value={isLockModeEnabled}
          onValueChange={() => setLockModeEnabled(!isLockModeEnabled)}
        />
      </View>

      <TouchableOpacity style={[styles.actionButton, styles.encryptButton]}>
        <Text style={styles.actionButtonText}>Encrypt</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionButton, styles.decryptButton]}>
        <Text style={styles.actionButtonText}>Decrypt</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Copyright © 2024 by AlligatorX. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    position: 'absolute',
    top: 50,
  },
  profileContainer: {
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#8c8c8c',
  },
  button: {
    backgroundColor: '#6a4cc6',
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
    width: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  documentButton: {
    backgroundColor: '#fff',
  },
  documentButtonText: {
    color: '#000',
  },
  lockModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  lockModeText: {
    color: '#fff',
    marginRight: 10,
    fontSize: 16,
  },
  actionButton: {
    width: 150,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  encryptButton: {
    backgroundColor: '#ff4d4d',
  },
  decryptButton: {
    backgroundColor: '#ff4d4d',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    position: 'absolute',
    bottom: 20,
  },
});
