import React, { useState, useEffect } from 'react';
import {  Pressable, StyleSheet, TextInput} from 'react-native';
import { Text, View } from '@/components/Themed';
import {  router } from 'expo-router';

export default function UserEmailInputScreen() {
    const [email, setEmail] = useState<string>('');
    

    useEffect(() => {
        // Checks if the email is valid
    }, [email]);

    const handleSetEmail = () => {
       router.navigate({
            pathname: '/password_input',
            params: { email: email }
        }); 
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Email Input Screen</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                inputMode="numeric"
            />
            <Pressable onPress={handleSetEmail}>
                <Text>Submit Email</Text>
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

