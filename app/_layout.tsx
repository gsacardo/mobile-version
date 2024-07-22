import '../global.css';

import { Stack } from 'expo-router';
import { DefaultTheme, DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from "nativewind";
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    </ThemeProvider>
  );
}
