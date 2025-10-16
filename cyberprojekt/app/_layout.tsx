import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from '../hooks/useFonts';
import { LogBox } from 'react-native';
import { OverlayProvider } from '../components/OverlayContext';
import { AudioManager } from '../components/AudioManager';
import ErrorBoundary from '../components/ErrorBoundary'; // Adicione esta linha

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const fontsLoaded = useFonts();

  useEffect(() => {
    LogBox.ignoreLogs([
      'useInsertionEffect must not schedule updates',
      'The Audio API is not available',
      'Interruption was requested',
      'Text strings must be rendered within a <Text> component', // Suprime erro de Text
      'No route named "mission"', // Suprime erro de rota
      'Expo AV has been deprecated', // Suprime warning de Expo AV
      'setBehaviorAsync is not supported', // Suprime warnings de modo imersivo
      'setPositionAsync is not supported',
      'setBackgroundColorAsync is not supported',
      'Unable to resolve asset "./assets/icon.png"', // Suprime erro de asset
    ]);
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AudioManager>
      <OverlayProvider>
        <ErrorBoundary> {/* Envolve o Stack com ErrorBoundary */}
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="mission" options={{ presentation: 'fullScreenModal' }} />
          </Stack>
        </ErrorBoundary>
      </OverlayProvider>
    </AudioManager>
  );
}