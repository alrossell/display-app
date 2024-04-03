import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import {  useLocalSearchParams } from "expo-router";
import {  router } from 'expo-router';
import client, { Song, Review } from "../../../api/apiClient";

export default function TwoScreen() {
    const [reviews, setReviews] = useState<string>('');
    const [currentSong, setCurrentSong] = useState<Song>();

    const params = useLocalSearchParams();    
    const songId = params.songId;

    useEffect(() => {
        if (songId === undefined || typeof(songId) !== 'string') {
            return;
        }

        client.getSong(songId).then((response) => {
            setCurrentSong(response);
        },
        (error) => {
            console.log(error);
        });

    }, []);

    const handleSubmit = () => {
        const sendingReview: Review = {
            id: 0,
            userId: 1,
            songId: currentSong?.id ?? 0,
            date: new Date().toISOString(),
            review: reviews
        }

        client.postReview(sendingReview)
        router.back();
    }

    const songTitle = currentSong?.title ?? "No song title";

    return (
        <View style={styles.container}>
            <Text> OneScreen: {songTitle} </Text>
            <TextInput
                style={styles.input}
                onChangeText={setReviews}
                value={reviews}
                placeholder="useless placeholder"
                keyboardType="numeric"
            />
            <Pressable onPress={handleSubmit}>
                <Text>Submit</Text>
            </Pressable>
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
    width: '80%', 
    height: '40%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
