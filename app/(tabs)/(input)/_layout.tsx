import React from 'react';

import { Stack } from 'expo-router';

export default function ScreenLayout() {

  return (
      <Stack>
        <Stack.Screen name="input" options={{ headerShown: false }} />
        <Stack.Screen name="creator" />
      </Stack>
  );
}
