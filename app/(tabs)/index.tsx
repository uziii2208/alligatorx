import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Centered logo */}
      <Image
        source={require('@/assets/images/logo.jpg')} // Update this to your logo path
        style={styles.logo}
      />
      {/* Welcome text */}
      <ThemedText type="title" style={styles.title}>
        Welcome to Hidden Pictures
      </ThemedText>
      {/* Login button */}
      <TouchableOpacity style={styles.enterButton}>
        <Link href="/login" asChild>
          <Text style={styles.enterButtonText}>Login</Text>
        </Link>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#083D27', // Background color
  },
  logo: {
    width: 150, // Adjust logo size as needed
    height: 150,
    borderRadius: 30,
    marginBottom: 20,
  },
  title: {
    marginBottom: 30,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  enterButton: {
    backgroundColor: '#0A84FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  enterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
