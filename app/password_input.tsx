import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
 
import { router, useLocalSearchParams } from 'expo-router';

export default function PasswordInputScreen() {
    const params = useLocalSearchParams();
    const { email } = params;

    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        // Checks if the password is valid
    }, [password]);

    const handleCreateNewAccount = () => {
        router.navigate({
            pathname: '/name_input',
            params: { email: email, password: password }
        }); 
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Email Screen</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
                placeholder="password"
                inputMode="numeric"
            />
            <Pressable onPress={handleCreateNewAccount}>
                <Text>Submit Password</Text>
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

