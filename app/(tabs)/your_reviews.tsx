import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import client, { Review } from "../../api/apiClient";

export default function YourReviewsScreen() {
    const [reviews, setReviews] = useState<Array<Review>>([]); 

    const getReviews = async () => {
        try {
            client.getReviews().then((response) => {
                setReviews(response);
            })
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getReviews(); 
    }, []);

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
            <Text style={styles.title}>Your reviews</Text>
            {createReviewCardList()}
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
    listItem: {
        marginBottom: 10,
    },
});
