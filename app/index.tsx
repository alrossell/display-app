import React from 'react';
import { StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';
import { Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Login() {
  return (
    <View style={styles.container}>
        <Text> Login </Text>

        <Link href="/(tabs)/(input)/input" asChild>
          <Pressable>
            {({ pressed }) => (
                <Text>Go to Tab One</Text>
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
});
