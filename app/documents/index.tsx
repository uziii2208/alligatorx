import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { decryptData, encryptData } from '@/utils/encryption';


export default function DocumentsScreen() {
    const [fileName, setFileName] = useState<string | null>(null);
    const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
    const [key, setKey] = useState<string>('123456');
    const route = useRouter()

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync();
        if (!result.canceled) {
            const asset = result.assets[0];
            setSelectedDocument(asset.uri);
            setFileName(asset.name);
        }
    }

    const encryptCopyFileToFolder = async () => {
        if (!selectedDocument) {
            alert('No document selected to copy!');
            return;
        }

        try {
            const newPath = `${FileSystem.documentDirectory}${fileName}`;

            const fileContent = await FileSystem.readAsStringAsync(selectedDocument, {
                encoding: FileSystem.EncodingType.Base64
            });
    
            const encryptedContent = await encryptData(fileContent, key);

            await FileSystem.writeAsStringAsync(newPath, encryptedContent, {
                encoding: FileSystem.EncodingType.Base64
            });

            alert('Document copied successfully to the folder.');
        } catch (error) {
            console.error('Error copying document:', error);
            alert('Failed to copy the document');
        }
    };


    const copyFileToFolder = async () => {
        if (!selectedDocument) {
            alert('No document selected to copy!');
            return;
        }

        try {
            const newPath = `${FileSystem.documentDirectory}${fileName}`;

            const fileContent = await FileSystem.readAsStringAsync(selectedDocument, {
                encoding: FileSystem.EncodingType.Base64
            });

            await FileSystem.writeAsStringAsync(newPath, fileContent, {
                encoding: FileSystem.EncodingType.Base64
            });

            alert('Document copied successfully to the folder.');
        } catch (error) {
            console.error('Error copying document:', error);
            alert('Failed to copy the document');
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.documentName}>{fileName}</Text>

            <TouchableOpacity style={styles.selectButton} onPress={pickDocument}>
                <Text style={styles.selectButtonText}>Select document</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.documentButton}
                onPress={copyFileToFolder}
            >
                <Text style={styles.documentButtonText}>Move to App library</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.documentButton}
                onPress={encryptCopyFileToFolder}
            >
                <Text style={styles.documentButtonText}>Encrypt and Move to App library</Text>
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
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectButton: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 20,
        marginVertical: 10,
    },
    selectButtonText: {
        color: '#000',
        fontSize: 16,
    },
    documentName: {
        marginTop: 20,
        color: '#fff',
        fontSize: 16,
    },
    footerText: {
        color: '#FFF',
        fontSize: 12,
        position: 'absolute',
        bottom: 20,
        textAlign: 'center',
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
});
