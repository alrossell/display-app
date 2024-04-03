import React, {useState} from 'react';
import { Pressable, StyleSheet, TextInput, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import client, { User } from "../api/apiClient";
import { Link } from 'expo-router';
import {  router } from 'expo-router';

export default function NewUserScreen() {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    const handleCreateNewAccount = () => {
        const newAccount: User = { 
            id: 0,
            firstName: firstName,
            lastName: lastName,
            username: username,
            date: new Date().toISOString(),
            password: password

        }

        client.postUser(newAccount).then(() => {
            console.log("New account created");
        },
        (error) => {
            console.log(error);
        });

       router.navigate('/(tabs)/(input)/input'); 
        
   }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>New User Screen</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFirstName}
                value={firstName}
                placeholder="username"
                inputMode="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={setLastName}
                value={lastName}
                placeholder="password"
                inputMode="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={setUserName}
                value={username}
                placeholder="username"
                inputMode="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="password"
                inputMode="numeric"
            />

            <Button title="Create a new account" onPress={handleCreateNewAccount}/>

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

