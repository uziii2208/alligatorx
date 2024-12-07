import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { useRouter } from 'expo-router';
import { StorageAccessFramework } from 'expo-file-system';
import { decryptData } from '@/utils/encryption';

const DocumentsLibraryScreen: React.FC = () => {
    const [documents, setDocuments] = useState<string[]>([]);
    const [key, setKey] = useState<string>('123456');
    const router = useRouter();

    useEffect(() => {
        const listDocuments = async () => {
            try {
                if (FileSystem.documentDirectory) {
                    const allFiles = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
                    const documentFiles = allFiles.filter(file => !file.endsWith('.jpeg') && !file.endsWith('.jpg') && !file.endsWith('.png'));
                    setDocuments(documentFiles);
                }
            } catch (error) {
                console.error('Error listing documents:', error);
            }
        };

        listDocuments();
    }, []);

    const saveDocumentToDevice = async (document: string) => {
        try {
            const uri = `${FileSystem.documentDirectory}${document}`;
            const fileExists = await FileSystem.getInfoAsync(uri);

            if (!fileExists.exists) {
                Alert.alert('File Not Found', 'The file does not exist locally.');
                return;
            }

            const fileContents = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64
            });

            if (!fileContents) {
                throw new Error('File contents are empty');
            }

            try {
                const decryptedContent = await decryptData(fileContents, key);

                if (Platform.OS === 'android') {
                    // Android implementation
                    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
                    if (!permissions.granted) {
                        Alert.alert('Permission Denied', 'Permission to access storage is required');
                        return;
                    }

                    const destinationUri = await StorageAccessFramework.createFileAsync(
                        permissions.directoryUri,
                        document,
                        'application/octet-stream'
                    );

                    await StorageAccessFramework.writeAsStringAsync(
                        destinationUri,
                        decryptedContent,
                        { encoding: FileSystem.EncodingType.Base64 }
                    );
                } else {
                    // iOS implementation
                    const { status } = await MediaLibrary.requestPermissionsAsync();
                    if (status !== 'granted') {
                        Alert.alert('Permission Denied', 'Permission to access media library is required');
                        return;
                    }

                    // Create a temporary file with decrypted content
                    const tempUri = `${FileSystem.cacheDirectory}${document}`;
                    await FileSystem.writeAsStringAsync(tempUri, decryptedContent, {
                        encoding: FileSystem.EncodingType.Base64
                    });

                    const asset = await MediaLibrary.createAssetAsync(tempUri);
                    await MediaLibrary.createAlbumAsync('Documents', asset, false);

                    // Clean up temp file
                    await FileSystem.deleteAsync(tempUri);
                }

                Alert.alert('Success', 'Document saved successfully!');
            } catch (error) {
                console.error('Decryption error:', error);
                Alert.alert('Error', 'Failed to decrypt the document');
            }
        } catch (error) {
            console.error('Error saving document:', error);
            Alert.alert('Error', 'Failed to save the document');
        }
    };

    const saveEncryptDocumentToDevice = async (document: string) => {
        try {
            const uri = `${FileSystem.documentDirectory}${document}`;
            const fileExists = await FileSystem.getInfoAsync(uri);

            if (!fileExists.exists) {
                Alert.alert('File Not Found', 'The file does not exist locally.');
                return;
            }

            const fileContents = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64
            });

            if (!fileContents) {
                throw new Error('File contents are empty');
            }

            try {
                if (Platform.OS === 'android') {
                    // Android implementation
                    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
                    if (!permissions.granted) {
                        Alert.alert('Permission Denied', 'Permission to access storage is required');
                        return;
                    }

                    const destinationUri = await StorageAccessFramework.createFileAsync(
                        permissions.directoryUri,
                        document,
                        'application/octet-stream'
                    );

                    await StorageAccessFramework.writeAsStringAsync(
                        destinationUri,
                        fileContents,
                        { encoding: FileSystem.EncodingType.Base64 }
                    );
                } else {
                    // iOS implementation
                    const { status } = await MediaLibrary.requestPermissionsAsync();
                    if (status !== 'granted') {
                        Alert.alert('Permission Denied', 'Permission to access media library is required');
                        return;
                    }

                    // Create a temporary file with decrypted content
                    const tempUri = `${FileSystem.cacheDirectory}${document}`;
                    await FileSystem.writeAsStringAsync(tempUri, fileContents, {
                        encoding: FileSystem.EncodingType.Base64
                    });

                    const asset = await MediaLibrary.createAssetAsync(tempUri);
                    await MediaLibrary.createAlbumAsync('Documents', asset, false);

                    // Clean up temp file
                    await FileSystem.deleteAsync(tempUri);
                }

                Alert.alert('Success', 'Document saved successfully!');
            } catch (error) {
                console.error('Decryption error:', error);
                Alert.alert('Error', 'Failed to decrypt the document');
            }
        } catch (error) {
            console.error('Error saving document:', error);
            Alert.alert('Error', 'Failed to save the document');
        }
    };

    const deleteDocument = async (document: string) => {
        try {
            await FileSystem.deleteAsync(`${FileSystem.documentDirectory}${document}`);
            setDocuments(documents.filter(doc => doc !== document));
            Alert.alert('Success', 'Document deleted successfully');
        } catch (error) {
            console.error('Error deleting document:', error);
            Alert.alert('Error', 'Failed to delete the document');
        }
    };

    const renderDocument = ({ item }: { item: string }) => (
        <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstTableCell]}>{item}</Text>
            <TouchableOpacity
                style={styles.tableCell}
                onPress={() => saveDocumentToDevice(item)}
            >
                <Text style={styles.linkText}>Save Decrypt</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.tableCell}
                onPress={() => saveEncryptDocumentToDevice(item)}
            >
                <Text style={styles.linkText}>Save Encrypt</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.tableCell}
                onPress={() => deleteDocument(item)}
            >
                <Text style={styles.linkText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Document Library</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    router.push('/documents');
                }}
            >
                <Text style={styles.buttonText}>Add to library</Text>
            </TouchableOpacity>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>Document Name</Text>
                </View>
                <FlatList
                    data={documents}
                    renderItem={renderDocument}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1E',
        padding: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    table: {
        width: '100%',
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
        paddingBottom: 10,
        marginBottom: 10,
    },
    tableHeaderCell: {
        flex: 1,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
    },
    tableCell: {
        flex: 1,
        color: '#FFFFFF',
        alignItems: 'center',
    },
    firstTableCell: {
        flex: 4,
    },
    linkText: {
        color: '#007AFF',
    },
});

export default DocumentsLibraryScreen;