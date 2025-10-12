import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import {
  ChakraPetch_400Regular,
  ChakraPetch_700Bold,
} from '@expo-google-fonts/chakra-petch';

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        // Check if font sources are defined
        if (!ChakraPetch_400Regular) {
          console.error('❌ ChakraPetch_400Regular is undefined. Reinstall @expo-google-fonts/chakra-petch.');
          return;
        }
        if (!ChakraPetch_700Bold) {
          console.error('❌ ChakraPetch_700Bold is undefined. Reinstall @expo-google-fonts/chakra-petch.');
          return;
        }

        await Font.loadAsync({
          Cyberpunk: require('../assets/fonte/Cyberpunk.ttf'),
          'ChakraPetch-Regular': ChakraPetch_400Regular,
          'ChakraPetch-Bold': ChakraPetch_700Bold,
        });

        const loadedFonts = await Font.getLoadedFonts();
        console.log('✅ Fontes carregadas:', loadedFonts);
        setFontsLoaded(true);
      } catch (error) {
        console.error('❌ Erro ao carregar fontes:', error);
        setFontsLoaded(true); // Fallback to render UI
      }
    };

    loadFonts();
  }, []);

  return fontsLoaded;
};