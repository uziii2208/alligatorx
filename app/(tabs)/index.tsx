import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Profile Icon */}
      <Image
        source={require('@/assets/images/App-logo.png')} // Update this to the correct path for your profile icon
        style={styles.profileIcon}
      />
      {/* Welcome text */}
      <ThemedText type="title" style={styles.title}>
        Welcome to AlligatorX
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Wanna some privacy? We've got it here
      </ThemedText>
      {/* Enter button */}
      <TouchableOpacity style={styles.enterButton}>
        <Link href="/login" asChild>
          <Text style={styles.enterButtonText}>Enter</Text>
        </Link>
      </TouchableOpacity>
      {/* Terms and Conditions */}
      <Text style={styles.termsText}>Terms and Conditions here</Text>
      {/* Copyright */}
      <Text style={styles.copyright}>
        Copyright © 2024 by AlligatorX. All rights reserved
      </Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1E', // Background color
    paddingHorizontal: 20,
  },
  profileIcon: {
    width: 100, // Adjust size to match the design
    height: 100,
    borderRadius: 50, // Circular icon
    backgroundColor: '#D8CCF5', // Light purple background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#A5A5A5', // Light gray text for subtitle
    marginBottom: 30,
    textAlign: 'center',
  },
  enterButton: {
    backgroundColor: '#7E5CFF', // Purple button
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  enterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 14,
    color: '#A5A5A5', // Light gray text for terms
    textAlign: 'center',
    marginTop: 20,
  },
  copyright: {
    fontSize: 10,
    color: '#A5A5A5', // Light gray text
    textAlign: 'center',
    position: 'absolute',
    bottom: 10, // Distance from the bottom edge
  },
  
});
