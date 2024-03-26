import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import { Song } from '../../api/apiClient';
import client from "../../api/apiClient";
import EditScreenInfo from '@/components/EditScreenInfo';

export default function DisplayScreen() {
    const [songs, setSongs] = useState<Array<Song>>([]);

    const handleGetUsers = () => {
        const fectchData = async () => {
            try {
                console.log("Fetching books");
                const fetchedSongs = await client.getSongs();
                if(fetchedSongs != null)
                    setSongs(fetchedSongs as unknown as Song[]);
            } catch(error) {
                console.log(error);
            }
        }
        fectchData();
    }

    const handleDeleteSongs = () => {
        const deleteData = async () => {
            try {
                await client.deleteAllSongs();
                setSongs([]);
            } catch(error) {
                console.log(error);
            }
        }
        deleteData();
    }

    const createReviewCard = (index: number, newSong: Song) => {
        return (
            <View key={newSong.id} style={styles.listItem}>
                <Text>Author: {newSong.artist}</Text>
                <Text>Title: {newSong.title}</Text>
                <Text>Year: {newSong.releaseYear}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text>Hello from DisplayTab</Text>
            <ScrollView>
                {songs.map((item, index) => (
                    createReviewCard(index, item)
                ))}
            </ScrollView>

            <Button title="Get Songs" onPress={handleGetUsers} />
            <Button title="Clear Users" onPress={handleDeleteSongs} />
        </View>
    );
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
        },   
        separator: {
            marginVertical: 30,
            height: 1,
            width: '80%',
        },
        input: {
            width: '100%',
            height: 40,
            marginBottom: 20,
            borderWidth: 1,
            padding: 10,
        },
        listItem: {
            marginBottom: 10,
        },
});
