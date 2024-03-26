import EditScreenInfo from '@/components/EditScreenInfo';

import { Pressable } from 'react-native';
import { Link, router } from 'expo-router';

import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import client from "../../../api/apiClient";
import { Song } from '../../../api/apiClient';

export default function OneScreen() {
    const [searchList, setSearchList] = useState<Array<Song>>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedId, setSelectedId] = useState<number>();

    useEffect(() => {
        if(selectedId === undefined) {
            return;
        }
    }, [selectedId]);

    const updateSearchTerm = (searchTerm: string) => {
        setSearchTerm(searchTerm);

        client.getSearchResults(searchTerm)
            .then((data) => 
        {
            if (data === undefined) {
                console.log("data is undefined");
                throw new Error("data is undefined");
            }

            setSearchList(data);
        })
            .catch(error => { console.log(error); })
    };

    const renderSearchItem = ({item}: {item: Song}) => {
        return (
            <SearchItem
                item={item} 
                onPress={
                    () => {
                        setSelectedId(item.id);
                        router.replace('/(tabs)/(input)/creator');
                        console.log("Selected item: " + item.id);
                    }
                }
            />
        );
    };

    type SearchItemProps = {
        item: Song;
        onPress: () => void;
    };

    const SearchItem = ({item, onPress}: SearchItemProps) => (
        <TouchableOpacity onPress={onPress}>
                <Text style={[styles.title]}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hello from InputTab</Text>
 
            <TextInput
                style={styles.input}
                placeholder="Search for songs"
                value={searchTerm}
                onChangeText={updateSearchTerm}
             />

            <FlatList
                data={searchList}
                keyExtractor={item => item.id.toString()}
                renderItem={renderSearchItem}
                extraData={selectedId}
            />
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
});
