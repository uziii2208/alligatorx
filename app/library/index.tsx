import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';

const LibraryScreen: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const key="123456";
    const router = useRouter();

    useEffect(() => {
        const listImages = async () => {
            try {
                if (FileSystem.documentDirectory) {
                    const allFiles = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
                    const imageFiles = allFiles.filter(file => file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png'));
                    setImages(imageFiles);
                }
            } catch (error) {
                console.error('Error listing images:', error);
            }
        };

        listImages();
    }, []);

    const renderImage = ({ item }: { item: string }) => {
        return (
            <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => {
                    router.push(`/library/FullScreenImage?image=${item}`);
                }}
            >
                <Image source={{ uri: `${FileSystem.documentDirectory}${item}` }} style={styles.image} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Image Library</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    router.push('/photo');
                }}
                >
                <Text style={styles.buttonText}>Add to library</Text>
            </TouchableOpacity>
            <FlatList
                data={images}
                renderItem={renderImage}
                keyExtractor={(item) => item}
                numColumns={3}
                contentContainerStyle={styles.imageList}
                columnWrapperStyle={styles.columnWrapper}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        backgroundColor: '#1C1C1E',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    imageList: {
        justifyContent: 'space-between',
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    imageContainer: {
        marginHorizontal: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
});


export default LibraryScreen;