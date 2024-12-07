import { Stack } from 'expo-router';

export default function LibraryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="FullScreenImage" options={{ headerShown: false }} />
    </Stack>
  );
}