import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import RNFS from 'react-native-fs';

const encryptPhoto = async () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isHidden, setIsHidden] = useState(false);

    if (selectedImage) {
        try {
            // Define a new hidden path
            const hiddenPath = `${RNFS.DocumentDirectoryPath}/hiddenPhoto.jpg`;

            // Move the file to the hidden directory
            await RNFS.moveFile(selectedImage, hiddenPath);

            // Update the state to reflect the new location
            setSelectedImage(hiddenPath);
            setIsHidden(true);

            alert('Photo hidden successfully.');
        } catch (error) {
            console.error('Error hiding photo:', error);
            alert('Failed to hide photo.');
        }
    } else {
        alert('No photo selected to hide!');
    }
};


export default function Photoscreen() {
    const [isLockEnabled, setIsLockEnabled] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isHidden, setIsHidden] = useState(false); // Track hidden state

    const route = useRouter();

    const toggleLockMode = () => setIsLockEnabled((prevState) => !prevState);

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
        const [selectedImage, setSelectedImage] = useState<string | null>(null);

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setIsHidden(false); // Reset hidden state when a new photo is picked
        }
    };

    const encryptPhoto = () => {
        if (selectedImage) {
            setIsHidden(true); // Hide the image
            alert('Photo hidden successfully.');
        } else {
            alert('No photo selected to hide!');
        }
    };

    const decryptPhoto = () => {
        if (selectedImage && isHidden) {
            setIsHidden(false); // Show the image
            alert('Photo revealed successfully.');
        } else if (!isHidden) {
            alert('Photo is already visible!');
        } else {
            alert('No photo selected to reveal!');
        }
    };

    return (
        <View style={styles.container}>
            {/* Top Notification */}
            <View style={styles.notification}>
                <Text style={styles.notificationText}>✅ Choose successfully !!!</Text>
            </View>

            {/* Profile Picture */}
            <View style={styles.profileContainer}>
                {selectedImage && !isHidden ? (
                    <Image source={{ uri: selectedImage }} style={styles.profileImage} />
                ) : (
                    <View style={[styles.profileImage, styles.hiddenImage]} />
                )}
            </View>

            {/* Buttons */}
            <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                <Text style={styles.photoButtonText}>Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.documentButton}
                onPress={() => {
                    route.push('/documents');
                }}
            >
                <Text style={styles.documentButtonText}>Documents</Text>
            </TouchableOpacity>

            {/* Lock Mode */}
            <View style={styles.lockModeContainer}>
                <Text style={styles.lockModeText}>Enable Lock Mode</Text>
                <Switch
                    value={isLockEnabled}
                    onValueChange={toggleLockMode}
                    thumbColor={isLockEnabled ? '#fff' : '#ccc'}
                    trackColor={{ false: '#767577', true: '#4630EB' }}
                />
            </View>

            {/* Encrypt & Decrypt Buttons */}
            <TouchableOpacity style={styles.encryptButton} onPress={encryptPhoto}>
                <Text style={styles.actionButtonText}>Encrypt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.decryptButton} onPress={decryptPhoto}>
                <Text style={styles.actionButtonText}>Decrypt</Text>
            </TouchableOpacity>

            {/* Footer */}
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
        width: 100,
        height: 100,
        borderRadius: 50,
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
        width: 150,
        alignItems: 'center',
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
