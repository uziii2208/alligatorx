import { StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const LoginPage = () => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    placeholder="Username"
                    placeholderTextColor="#888"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    style={styles.input}
                />

                <Link href="/otp" asChild>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#083D27', // Updated background color
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 40,
    },
    input: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#2E2E2E',
        borderRadius: 10,
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 20,
    },
    loginButton: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#FFFFFF', // Change button color to white
        borderRadius: 10,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#1A1A1A', // Change text color to dark for contrast
        fontSize: 16,
        fontWeight: '600',
    },
});

