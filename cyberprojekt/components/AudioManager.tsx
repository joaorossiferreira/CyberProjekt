// components/AudioManager.tsx
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Audio } from 'expo-av';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface AudioContextType {
  playBackgroundMusic: (soundFile: any) => Promise<void>;
  stopBackgroundMusic: () => Promise<void>;
  setMusicVolume: (volume: number) => Promise<void>;
  playUISound: (soundFile?: any) => Promise<void>;
  setUISoundVolume: (volume: number) => Promise<void>;
  musicVolume: number;
  uiSoundVolume: number;
  isMusicPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const backgroundMusic = useRef<Audio.Sound | null>(null);
  const uiSound = useRef<Audio.Sound | null>(null);
  
  const [musicVolume, setMusicVolumeState] = useState(0.5);
  const [uiSoundVolume, setUISoundVolumeState] = useState(0.5);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Funções de storage
  const getSecureItem = async (key: string): Promise<string | null> => {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      }
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error(`Erro ao acessar ${key} no storage:`, error);
      return null;
    }
  };

  const setSecureItem = async (key: string, value: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.error(`Erro ao salvar ${key} no storage:`, error);
    }
  };

  // Inicializar áudio
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        // Carregar volumes salvos
        const savedMusicVolume = await getSecureItem('musicVolume');
        const savedUiSoundVolume = await getSecureItem('uiSoundVolume');
        
        if (savedMusicVolume) {
          const volume = parseFloat(savedMusicVolume);
          setMusicVolumeState(volume);
        }
        if (savedUiSoundVolume) {
          const volume = parseFloat(savedUiSoundVolume);
          setUISoundVolumeState(volume);
        }

        // Configurar áudio
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });

        console.log('✅ AudioManager inicializado');
      } catch (error) {
        console.error('❌ Erro ao inicializar AudioManager:', error);
      }
    };

    initializeAudio();

    return () => {
      // Cleanup
      if (backgroundMusic.current) {
        backgroundMusic.current.unloadAsync();
      }
      if (uiSound.current) {
        uiSound.current.unloadAsync();
      }
    };
  }, []);

  // Tocar música de fundo
  const playBackgroundMusic = async (soundFile: any) => {
    try {
      console.log('🎵 Tentando carregar música:', soundFile);
      
      // Parar música atual se estiver tocando
      if (backgroundMusic.current) {
        await backgroundMusic.current.stopAsync();
        await backgroundMusic.current.unloadAsync();
        backgroundMusic.current = null;
      }

      // Verificar se o arquivo existe
      if (!soundFile) {
        throw new Error('Arquivo de música não fornecido');
      }

      // Carregar e tocar nova música
      const { sound, status } = await Audio.Sound.createAsync(
        soundFile,
        { 
          shouldPlay: true, 
          isLooping: true, 
          volume: musicVolume 
        },
        onPlaybackStatusUpdate
      );
      
      backgroundMusic.current = sound;
      setIsMusicPlaying(true);
      console.log('🎵 Música de fundo iniciada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao tocar música de fundo:', error);
      throw error;
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded && !status.isPlaying) {
      setIsMusicPlaying(false);
    }
  };

  // Parar música de fundo
  const stopBackgroundMusic = async () => {
    try {
      if (backgroundMusic.current) {
        await backgroundMusic.current.stopAsync();
        await backgroundMusic.current.unloadAsync();
        backgroundMusic.current = null;
        setIsMusicPlaying(false);
        console.log('⏹️ Música de fundo parada');
      }
    } catch (error) {
      console.error('❌ Erro ao parar música de fundo:', error);
    }
  };

  // Ajustar volume da música
  const setMusicVolume = async (volume: number) => {
    try {
      setMusicVolumeState(volume);
      await setSecureItem('musicVolume', volume.toString());
      
      if (backgroundMusic.current) {
        await backgroundMusic.current.setVolumeAsync(volume);
      }
    } catch (error) {
      console.error('❌ Erro ao ajustar volume da música:', error);
    }
  };

  // Tocar som de UI
  const playUISound = async (customSoundFile?: any) => {
    try {
      if (customSoundFile) {
        // Usar som customizado
        const { sound } = await Audio.Sound.createAsync(
          customSoundFile,
          { shouldPlay: true, volume: uiSoundVolume }
        );
        sound.setOnPlaybackStatusUpdate(async (status: any) => {
          if (status.didJustFinish) {
            await sound.unloadAsync();
          }
        });
      } else {
        // Usar som padrão de UI
        if (!uiSound.current) {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/sounds/click.mp3'),
            { shouldPlay: false, volume: uiSoundVolume }
          );
          uiSound.current = sound;
        }
        
        await uiSound.current.setPositionAsync(0);
        await uiSound.current.playAsync();
      }
    } catch (error) {
      console.error('❌ Erro ao tocar som de UI:', error);
    }
  };

  // Ajustar volume dos sons de UI
  const setUISoundVolume = async (volume: number) => {
    try {
      setUISoundVolumeState(volume);
      await setSecureItem('uiSoundVolume', volume.toString());
      
      if (uiSound.current) {
        await uiSound.current.setVolumeAsync(volume);
      }
    } catch (error) {
      console.error('❌ Erro ao ajustar volume UI:', error);
    }
  };

  const value: AudioContextType = {
    playBackgroundMusic,
    stopBackgroundMusic,
    setMusicVolume,
    playUISound,
    setUISoundVolume,
    musicVolume,
    uiSoundVolume,
    isMusicPlaying,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

// Hook para usar o gerenciador de áudio
export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioManager');
  }
  return context;
};