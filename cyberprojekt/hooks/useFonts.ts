// hooks/useFonts.ts
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
        await Font.loadAsync({
          Cyberpunk: require('../assets/fonte/Cyberpunk.ttf'),
          'ChakraPetch-Regular': ChakraPetch_400Regular,
          'ChakraPetch-Bold': ChakraPetch_700Bold,
        });
        console.log('✅ Fontes carregadas:', await Font.getLoadedFonts());
        setFontsLoaded(true);
      } catch (error) {
        console.error('❌ Erro ao carregar fontes:', error);
        // Do NOT set fontsLoaded to true on error to catch issues
      }
    };

    loadFonts();
  }, []);

  return fontsLoaded;
};