import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function TwoScreen() {
    const [reviews, setReviews] = useState<string>('');

    return (
        <View style={styles.container}>
            <Text> OneScreen </Text>
            <TextInput
                style={styles.input}
                onChangeText={setReviews}
                value={reviews}
                placeholder="useless placeholder"
                keyboardType="numeric"
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
