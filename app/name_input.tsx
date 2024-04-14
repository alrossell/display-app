import React, {useState} from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';

import { router, useLocalSearchParams } from 'expo-router';

import client, { User } from '../api/apiClient';


export default function NameInputScreen() {
    const params = useLocalSearchParams();
    const { email: email, password: password } = params;

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    const handleCreateNewAccount = () => {
        const user: User = { 
            id: 0,
            first_name: firstName,
            last_name: lastName,
            email: email,
            date: new Date().toISOString(),
            password: password
        };

        client.postUser(user);
        router.navigate('/(tabs)/(input)/input'); 
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create New User</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFirstName}
                value={firstName}
                placeholder="first name"
                inputMode="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={setLastName}
                value={lastName}
                placeholder="last name"
                inputMode="numeric"
            />
            <Pressable onPress={handleCreateNewAccount}>
                <Text>Create New Account</Text>
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
        width: '70%', 
        height: '10%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

