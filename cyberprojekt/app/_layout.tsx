import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from '../hooks/useFonts';
import { LogBox } from 'react-native';
import { OverlayProvider } from '../components/OverlayContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const fontsLoaded = useFonts();
  // Suppress specific dev warnings that are noisy during development
  useEffect(() => {
    LogBox.ignoreLogs([
      'useInsertionEffect must not schedule updates',
      'The Audio API is not available',
      'Interruption was requested',
    ]);
    // If you want to silence all warnings in dev (not recommended), use:
    // LogBox.ignoreAllLogs(true);
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Pode customizar o loading se quiser
    return null;
  }

  return (
    <OverlayProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </OverlayProvider>
  );
}