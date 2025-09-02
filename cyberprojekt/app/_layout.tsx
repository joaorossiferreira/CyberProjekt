import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Cyberpunk': require('../assets/fonts/Cyberpunk.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Esconde a splash screen mesmo se a fonte falhar
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Não segura a renderização - deixa carregar mesmo sem fonte
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}