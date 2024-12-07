import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useRouter, useLocalSearchParams } from 'expo-router';

const FullScreenImage: React.FC = () => {
    const { image } = useLocalSearchParams();
    const router = useRouter();

    const deleteImage = async () => {
        try {
            await FileSystem.deleteAsync(`${FileSystem.documentDirectory}${image}`);
            Alert.alert('Success', 'Image deleted successfully');
            router.back();
        } catch (error) {
            console.error('Error deleting image:', error);
            Alert.alert('Error', 'Failed to delete the image');
        }
    };

    const saveImageToDevice = async () => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Permission to access media library is required');
                return;
            }

            const asset = await MediaLibrary.createAssetAsync(`${FileSystem.documentDirectory}${image}`);
            await MediaLibrary.createAlbumAsync('Download', asset, false);
            Alert.alert('Success', 'Image saved to device');
        } catch (error) {
            console.error('Error saving image:', error);
            Alert.alert('Error', 'Failed to save the image');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: `${FileSystem.documentDirectory}${image}` }} style={styles.fullImage} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={deleteImage}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={saveImageToDevice}>
                    <Text style={styles.buttonText}>Save to Device</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '100%',
        height: '80%',
        resizeMode: 'contain',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 20,
    },
    button: {
        backgroundColor: '#6C5A9C',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default FullScreenImage;