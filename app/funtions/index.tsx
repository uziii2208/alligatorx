import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const FunctionScreen = () => {
    const route = useRouter();
    return (
        <View style={styles.container}>
            {/* Profile Avatar */}
            <View style={styles.profileContainer}>
                <FontAwesome5 name="user-circle" size={120} color="#B79FE4" />
            </View>

            {/* Buttons */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    route.push('/library')
                }}
            >
                <Text style={styles.buttonText}>Photo library</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
                onPress={() => {
                    route.push('/documentsLibrary')
                }}>
                <Text style={styles.buttonText}>Documents</Text>
            </TouchableOpacity>

            {/* Footer */}
            <Text style={styles.footerText}>
                Copyright ©2024 by AlligatorX. All rights reserved
            </Text>
        </View>
    );
};

export default FunctionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1E',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    profileContainer: {
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 150,
        height: 40,
        backgroundColor: '#6C5A9C',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 15,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    footerText: {
        marginTop: 30,
        fontSize: 10,
        color: '#8E8E93',
        textAlign: 'center',
    },
});
