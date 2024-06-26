import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import client, { Review } from "../../api/apiClient";

export default function DisplayScreen() {

    const [reviews, setReviews] = useState<Array<Review>>([]);

    useEffect(() => {
        getReviews();
    }, []);

    const getReviews = async () => {
        try {
            console.log("Getting reviews");
            client.getReviews().then((response) => {
                setReviews(response);
            })
            .catch((error) => { 
                console.log(error);
            });
        } catch(error) {
            console.log(error);
        }
    }

    const handleGetReviews = () => {
        getReviews();
    }

    const createReviewCard = (index: number, newSong: Review) => {
        return (
            <View key={newSong.id} style={styles.listItem}>
                <Text>Date: {newSong.date}</Text>
                <Text>Review: {newSong.review}</Text>
            </View>
        );
    }

    const createReviewCardList = () => {
        if(reviews.length === 0) {
            return (
                <Text>No reviews</Text>
            );
        } else {
            return (
                <ScrollView>
                    {reviews.map((item, index) => (
                        createReviewCard(index, item)
                    ))}
                </ScrollView>
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text>Hello from DisplayTab</Text>
            {createReviewCardList()}
            <Pressable onPress={handleGetReviews}>
                <Text>Get Reviews</Text>
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
