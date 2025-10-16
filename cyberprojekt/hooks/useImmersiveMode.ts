import { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export const useImmersiveMode = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    console.log('🔄 Ativando modo imersivo...');

    // Status Bar - sempre esconder
    StatusBar.setHidden(true, 'none');
    
    if (Platform.OS === 'android') {
      const forceImmersive = async () => {
        try {
          await NavigationBar.setVisibilityAsync('hidden');
          await NavigationBar.setBehaviorAsync('overlay-swipe');
          await NavigationBar.setPositionAsync('absolute');
          await NavigationBar.setBackgroundColorAsync('#00000000');
          
          // Força novamente após um tempo para garantir
          setTimeout(async () => {
            await NavigationBar.setVisibilityAsync('hidden');
          }, 500);
        } catch (error) {
          console.warn('Não foi possível esconder navigation bar:', error);
        }
      };
      
      forceImmersive();

      // Monitora e re-aplica periodicamente
      const interval = setInterval(() => {
        NavigationBar.setVisibilityAsync('hidden').catch(() => {});
      }, 2000);

      return () => {
        clearInterval(interval);
      };
    }

    // NÃO vamos restaurar as barras no cleanup
    // Isso mantém o modo imersivo sempre ativo
  }, [enabled]);
};