import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';
import { Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Login() {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <View style={styles.container}>
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
            <Link href="/(tabs)/(input)/input" asChild>
                <Pressable>
                    {({ pressed }) => (
                        <Text>Login </Text>
                    )}
                </Pressable>
            </Link>

            <Link href="/email_input" asChild>
                <Pressable>
                    {({ pressed }) => (
                        <Text>Create a new account</Text>
                    )}
                </Pressable>
            </Link>
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
