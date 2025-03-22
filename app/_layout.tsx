import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Appearance } from 'react-native';
import { Colors } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (

    <Stack
    screenOptions={{
      headerShown: false,  // Hide header globally
      headerTitleStyle: { color: theme.headerBackground },
      headerTintColor: theme.text,
    }}

    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="/Authentication/OtpValidationPage" options={{ headerShown: false }} />
      <Stack.Screen name="OtpValidationPage" options={{ headerShown: false }} />
      <Stack.Screen name='ProfilePage' options={{ headerShown: false }} />
      <Stack.Screen name='LoginPage' options={{ headerShown: false }} />
      <Stack.Screen name='/Authentication/LoginPage' options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="GroupChatScreen" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>


  );
}
