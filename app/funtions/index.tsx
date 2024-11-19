import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const FunctionScreen = () => {
  const [isConnected, setIsConnected] = useState(false);

  const toggleConnection = () => setIsConnected(!isConnected);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>1.1.1.1</Text>
      {/* Main Connection Button */}
      <TouchableOpacity
        style={[styles.connectButton, isConnected && styles.connected]}
        onPress={toggleConnection}
      >
        <Text style={styles.connectButtonText}>{isConnected ? 'Connected' : 'Connect'}</Text>
      </TouchableOpacity>

      {/* Menu Container */}
      <View style={styles.menuContainer}>
        {/* Report Issue Button */}
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome5 name="bug" size={20} color="#fff" style={styles.menuButtonIcon} />
          <Text style={styles.menuButtonText}>Report Issue</Text>
        </TouchableOpacity>

        {/* Settings Toggle */}
        <View style={styles.menuItem}>
          <Text style={styles.menuButtonText}>Settings</Text>
          <Switch
            value={isConnected}
            onValueChange={toggleConnection}
            thumbColor={isConnected ? '#fff' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        {/* Contact Support Button */}
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome5 name="question-circle" size={20} color="#fff" style={styles.menuButtonIcon} />
          <Text style={styles.menuButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FunctionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#083D27',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  connectButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#0A84FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  connected: {
    backgroundColor: '#00C851',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#2E2E2E',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  menuButtonIcon: {
    marginRight: 10,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2E2E2E',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
