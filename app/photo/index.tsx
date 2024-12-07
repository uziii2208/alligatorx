import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { encryptData, decryptData } from '@/utils/encryption';


export default function PhotoScreen() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const key = "123456";
    const router = useRouter();

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedAsset = result.assets[0];
            setSelectedImage(selectedAsset.uri);
        }
    };

    useEffect(() => {
        copyImageToFolder
    }, [selectedImage]);

    const copyImageToFolder = async () => {
        if (!selectedImage) {
            alert('No photo selected to copy!');
            return;
        }

        try {
            const fileName = selectedImage.split('/').pop();
            const newPath = `${FileSystem.documentDirectory}${fileName}`;

            await FileSystem.copyAsync({
                from: selectedImage,
                to: newPath,
            });

            alert('Photo copied successfully to the folder.');
        } catch (error) {
            console.error('Error copying image:', error);
            alert('Failed to copy the photo.');
        }
    };

    return (
        <View style={styles.container}>
            {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.profileImage} />
            ) : (
                <View style={[styles.profileImage]} />
            )}

            <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                <Text style={styles.photoButtonText}>Select a photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.documentButton}
                onPress={copyImageToFolder}
            >
                <Text style={styles.documentButtonText}>Move to App library</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
                Copyright ©2024 by AlligatorX. All rights reserved
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        alignItems: 'center',
        padding: 20,
    },
    notification: {
        backgroundColor: '#6F6F6F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginVertical: 10,
    },
    notificationText: {
        color: '#FFF',
        fontSize: 14,
    },
    profileContainer: {
        marginVertical: 20,
    },
    profileImage: {
        width: '100%',
        height: '80%',
        borderRadius: 10,
        backgroundColor: '#ccc',
    },
    hiddenImage: {
        backgroundColor: '#333',
    },
    photoButton: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 20,
        marginVertical: 10,
    },
    photoButtonText: {
        color: '#000',
        fontSize: 16,
    },
    documentButton: {
        backgroundColor: '#4630EB',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginVertical: 10,
    },
    documentButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    lockModeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 20,
    },
    lockModeText: {
        color: '#FFF',
        fontSize: 16,
    },
    encryptButton: {
        backgroundColor: '#FF3B30',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginVertical: 10,
    },
    decryptButton: {
        backgroundColor: '#FF3B30',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginVertical: 10,
    },
    copyButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginVertical: 10,
    },
    actionButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    footerText: {
        color: '#FFF',
        fontSize: 12,
        position: 'absolute',
        bottom: 20,
        textAlign: 'center',
    },
});
