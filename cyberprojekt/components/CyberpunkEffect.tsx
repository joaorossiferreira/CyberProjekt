// components/CyberpunkEffect.tsx
import { Ionicons } from '@expo/vector-icons';
import { useImmersiveMode } from '../hooks/useImmersiveMode';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useRef, useState } from 'react';
import { useOverlay } from './OverlayContext';
import * as Font from 'expo-font';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
}

const CyberpunkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanlines: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    borderColor: '#fcee0944',
    borderWidth: 1,
    opacity: 0.1,
  },
  particle: {
    position: 'absolute',
    borderRadius: 50,
  },
  modalParticle: {
    position: 'absolute',
    borderRadius: 50,
  },
  fullGlitch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fcee0944',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: '#fcee09',
    fontSize: 40,
    fontFamily: 'Cyberpunk',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  titleShadow: {
    color: '#00ffcc',
    fontSize: 40,
    fontFamily: 'Cyberpunk',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    position: 'absolute',
    opacity: 0.3,
    transform: [{ translateX: 3 }, { translateY: 3 }],
  },
  subtitle: {
    color: '#00ffcc',
    fontSize: 24,
    fontFamily: 'Cyberpunk',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 10,
    textShadowColor: '#00ffcc',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: '#fcee09',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#fcee09',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  buttonPressed: {
    backgroundColor: '#fcee0922',
    borderColor: '#00ffcc',
    shadowColor: '#00ffcc',
  },
  buttonHover: {
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  buttonText: {
    color: '#fcee09',
    fontSize: 18,
    fontFamily: 'ChakraPetch-Bold',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  buttonTextHover: {
    color: '#00ffcc',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000cc',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Abaixo do toast
  },
  modalContent: {
    backgroundColor: '#1a1a1acc',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: '#fcee09',
    shadowColor: '#fcee09',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  modalTitle: {
    color: '#fcee09',
    fontSize: 24,
    fontFamily: 'ChakraPetch-Bold',
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  input: {
    backgroundColor: '#00000066',
    color: '#fcee09',
    fontFamily: 'ChakraPetch-Regular',
    fontWeight: '400',
    borderWidth: 1,
    borderColor: '#fcee0944',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    fontSize: 16,
    textTransform: 'lowercase',
  },
  errorText: {
    color: '#ff3366',
    fontSize: 12,
    fontFamily: 'ChakraPetch-Regular',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  switchText: {
    color: '#00ffcc',
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#fcee0944',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#00000066',
  },
  settingsText: {
    color: '#fcee09',
    fontSize: 16,
    fontFamily: 'ChakraPetch-Regular',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  promptText: {
    color: '#fcee09',
    fontSize: 16,
    fontFamily: 'ChakraPetch-Regular',
    fontWeight: '400',
    marginBottom: 20,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    color: '#fcee09',
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    fontWeight: '400',
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  sliderContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#fcee0944',
    borderRadius: 8,
    backgroundColor: '#00000066',
  },
  sliderLabel: {
    color: '#fcee09',
    fontSize: 16,
    fontFamily: 'ChakraPetch-Regular',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  // TOAST ESTILOS (CENTRALIZADO NO TOPO)
  toastContainer: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    backgroundColor: '#1a1a1a',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fcee09',
    zIndex: 2000,
    shadowColor: '#fcee09',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    minWidth: 200,
    maxWidth: '80%',
  },
  toastText: {
    color: '#fcee09',
    fontSize: 14,
    fontFamily: 'ChakraPetch-Bold, monospace',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    textAlign: 'center',
  },
  toastParticle: {
    position: 'absolute',
    borderRadius: 50,
  },
});

export const CyberpunkEffect: React.FC = () => {
  const router = useRouter();
  const [localFontsLoaded, setLocalFontsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadLocalFont = async () => {
      try {
        await Font.loadAsync({
          Cyberpunk: require('../assets/fonte/Cyberpunk.ttf'),
        });
        if (mounted) setLocalFontsLoaded(true);
      } catch (err) {
        console.error('Erro ao carregar fonte Cyberpunk localmente:', err);
        if (mounted) setLocalFontsLoaded(true);
      }
    };

    loadLocalFont();
    return () => {
      mounted = false;
    };
  }, []);

  const { width, height } = Dimensions.get('window');

  // Refs para animações e áudio
  const glitchAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const fullGlitchAnim = useRef(new Animated.Value(0)).current;
  const scanlinesAnim = useRef(new Animated.Value(0)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;
  const toastAnim = useRef(new Animated.Value(0)).current;
  const backgroundMusic = useRef<Audio.Sound | null>(null);
  const clickSound = useRef<Audio.Sound | null>(null);

  // States
  const [particles, setParticles] = useState<Particle[]>([]);
  const [modalParticles, setModalParticles] = useState<Particle[]>([]);
  const [settingsParticles, setSettingsParticles] = useState<Particle[]>([]);
  const [toastParticles, setToastParticles] = useState<Particle[]>([]); // Partículas do toast
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [showFullGlitch, setShowFullGlitch] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // inline error states removed — errors are shown only via toast notifications
  const [isRegister, setIsRegister] = useState(true);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [biometricPromptVisible, setBiometricPromptVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMounted, setToastMounted] = useState(false);
  const { setSuppressOverlay } = useOverlay();
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [uiSoundVolume, setUiSoundVolume] = useState(0.5);
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Ativa modo imersivo também na tela de missão
  useImmersiveMode(true);

  const BASE_URL = 'https://backend-psi-fawn-77.vercel.app';

  // Funções auxiliares para AsyncStorage
  const getSecureItem = async (key: string): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log(`CyberpunkEffect: Lendo ${key} do AsyncStorage:`, value);
      return value;
    } catch (error) {
      console.error(`Erro ao acessar ${key} no AsyncStorage:`, error);
      return null;
    }
  };

  const setSecureItem = async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log(`CyberpunkEffect: Salvando ${key} no AsyncStorage:`, value);
    } catch (error) {
      console.error(`Erro ao salvar ${key} no AsyncStorage:`, error);
    }
  };

  const deleteSecureItem = async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`CyberpunkEffect: Deletando ${key} do AsyncStorage`);
    } catch (error) {
      console.error(`Erro ao deletar ${key} do AsyncStorage:`, error);
    }
  };

  // Solicitar permissões de áudio
  const requestAudioPermissions = async () => {
    if (Platform.OS !== 'web') {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          console.warn('Permissão de áudio não concedida');
          showToastNotification('PERMISSÃO DE ÁUDIO NECESSÁRIA');
          return false;
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão de áudio:', error);
        showToastNotification('ERRO AO CONFIGURAR ÁUDIO');
        return false;
      }
    }
    return true;
  };

  // Tocar som de clique
  const playClickSound = async () => {
    try {
      if (clickSound.current) {
        await clickSound.current.setPositionAsync(0);
        await clickSound.current.playAsync();
      } else {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/sounds/click.mp3'),
          { shouldPlay: false, volume: uiSoundVolume }
        );
        clickSound.current = sound;
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Erro ao tocar som de clique:', error);
    }
  };

  // Inicializar áudio, partículas e biometria
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        const hasPermission = await requestAudioPermissions();
        if (!hasPermission) return;

        // Load saved volumes first so initial creation respects persisted values
        const savedMusicVolume = await getSecureItem('musicVolume');
        const savedUiSoundVolume = await getSecureItem('uiSoundVolume');
        const initialMusicVolume = savedMusicVolume ? parseFloat(savedMusicVolume) : musicVolume;
        const initialUiVolume = savedUiSoundVolume ? parseFloat(savedUiSoundVolume) : uiSoundVolume;
        // apply to state so UI reflects it
        if (savedMusicVolume) setMusicVolume(initialMusicVolume);
        if (savedUiSoundVolume) setUiSoundVolume(initialUiVolume);

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });

        // create background music with the initial (possibly saved) volume
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/songs/cyberpunk-theme.mp3'),
          { shouldPlay: initialMusicVolume > 0, isLooping: true, volume: initialMusicVolume }
        );
        backgroundMusic.current = sound;
        console.log('Música de fundo carregada');

        // create click/UI sound
        const { sound: click } = await Audio.Sound.createAsync(
          require('../assets/sounds/click.mp3'),
          { shouldPlay: false, volume: initialUiVolume }
        );
        clickSound.current = click;
        console.log('Som de clique carregado');

        setAudioInitialized(true);
      } catch (error) {
        console.error('Erro ao inicializar áudio:', error);
        showToastNotification('ERRO AO CARREGAR ÁUDIO');
      }
    };

    initializeAudio();

    const initialParticles: Particle[] = [];
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.8 + 0.3,
        color: Math.random() > 0.5 ? '#fcee09' : '#00ffcc',
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
    setParticles(initialParticles);

    const modalParticleCount = 15;
    const modalParticlesInit: Particle[] = [];
    for (let i = 0; i < modalParticleCount; i++) {
      modalParticlesInit.push({
        id: i + 1000,
        x: Math.random() * (width * 0.9),
        y: Math.random() * 300,
        size: Math.random() * 1 + 0.3,
        speed: Math.random() * 0.5 + 0.2,
        color: '#fcee09',
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
    setModalParticles(modalParticlesInit);

    const settingsParticlesInit: Particle[] = [];
    for (let i = 0; i < modalParticleCount; i++) {
      settingsParticlesInit.push({
        id: i + 2000,
        x: Math.random() * (width * 0.9),
        y: Math.random() * 400,
        size: Math.random() * 1 + 0.3,
        speed: Math.random() * 0.5 + 0.2,
        color: '#00ffcc',
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
    setSettingsParticles(settingsParticlesInit);

    // Inicializar partículas do toast
    const toastParticleCount = 10;
    const toastParticlesInit: Particle[] = [];
    const toastWidth = width * 0.6;
    const toastHeight = 50;
    for (let i = 0; i < toastParticleCount; i++) {
      toastParticlesInit.push({
        id: i + 3000,
        x: Math.random() * toastWidth,
        y: Math.random() * toastHeight,
        size: Math.random() * 1 + 0.3,
        speed: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#fcee09' : '#00ffcc',
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
    setToastParticles(toastParticlesInit);

    Animated.loop(
      Animated.sequence([
        Animated.timing(scanlinesAnim, {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanlinesAnim, {
          toValue: 0,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.timing(modalAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        Animated.sequence([
          Animated.timing(glitchAnim, {
            toValue: 1,
            duration: 50,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(glitchAnim, {
            toValue: 0,
            duration: 50,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(glitchAnim, {
            toValue: -1,
            duration: 50,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(glitchAnim, {
            toValue: 0,
            duration: 50,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, 4000);

    const checkBiometric = async () => {
      try {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        setIsBiometricAvailable(compatible);
        if (!compatible) {
          setModalVisible(true);
          setIsRegister(true);
          return;
        }

        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (!enrolled) {
          setModalVisible(true);
          setIsRegister(true);
          return;
        }

        const enabled = await getSecureItem('biometricEnabled');
        setBiometricEnabled(enabled === 'true');

        const token = await getSecureItem('userToken');
        if (token) {
          const res = await fetch(`${BASE_URL}/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          });
          const data = await res.json();
          console.log('Verificação de token:', data);

          if (data.auth) {
            if (enabled === 'true') {
              const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'USE DIGITAL PARA ENTRAR',
                fallbackLabel: 'USAR SENHA',
                disableDeviceFallback: false,
              });
              if (result.success) {
                setModalVisible(false);
                return;
              }
            }
            setModalVisible(true);
            setIsRegister(false);
            return;
          } else {
            await deleteSecureItem('userToken');
            await deleteSecureItem('biometricEnabled');
            setModalVisible(true);
            setIsRegister(true);
            return;
          }
        } else {
          setModalVisible(true);
          setIsRegister(true);
        }
      } catch (err) {
        console.error('Erro ao verificar biometria:', err);
        showToastNotification('ERRO AO VERIFICAR BIOMETRIA');
        setModalVisible(true);
        setIsRegister(true);
      }
    };

    checkBiometric();

    return () => {
      clearInterval(glitchInterval);
      backgroundMusic.current?.stopAsync().catch(err => console.error('Erro ao parar música:', err));
      backgroundMusic.current?.unloadAsync().catch(err => console.error('Erro ao descarregar música:', err));
      clickSound.current?.unloadAsync().catch(err => console.error('Erro ao descarregar som de clique:', err));
    };
  }, [width, height]);

  // Animação das partículas (incluindo toast)
  useEffect(() => {
    const particleInterval = setInterval(() => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          y: (p.y + p.speed) % height,
          x: p.x + (Math.random() - 0.5) * 0.3,
        }))
      );
      setModalParticles(prev =>
        prev.map(p => ({
          ...p,
          y: (p.y + p.speed) % 300,
          x: p.x + (Math.random() - 0.5) * 0.2,
        }))
      );
      setSettingsParticles(prev =>
        prev.map(p => ({
          ...p,
          y: (p.y + p.speed) % 400,
          x: p.x + (Math.random() - 0.5) * 0.2,
        }))
      );
      setToastParticles(prev =>
        prev.map(p => ({
          ...p,
          y: (p.y + p.speed) % 50,
          x: p.x + (Math.random() - 0.5) * 0.2,
        }))
      );
    }, 70);

    return () => clearInterval(particleInterval);
  }, [height]);

  // Atualizar volume da música
  useEffect(() => {
    // persist volume preference
    setSecureItem('musicVolume', musicVolume.toString());
    if (!audioInitialized) return;
    (async () => {
      try {
        if (backgroundMusic.current) {
          await backgroundMusic.current.setVolumeAsync(musicVolume);
          if (musicVolume <= 0) {
            // pause if effectively muted
            await backgroundMusic.current.pauseAsync();
          } else {
            // resume or ensure playing
            const status: any = await backgroundMusic.current.getStatusAsync();
            if (status && status.isLoaded && !status.isPlaying) {
              await backgroundMusic.current.playAsync();
            }
          }
        }
      } catch (err) {
        console.error('Erro ao ajustar volume da música:', err);
      }
    })();
  }, [musicVolume, audioInitialized]);

  // Atualizar volume do som da UI
  useEffect(() => {
    setSecureItem('uiSoundVolume', uiSoundVolume.toString());
    if (!audioInitialized) return;
    (async () => {
      try {
        if (clickSound.current) {
          await clickSound.current.setVolumeAsync(uiSoundVolume);
        }
      } catch (err) {
        console.error('Erro ao ajustar volume do som da UI:', err);
      }
    })();
  }, [uiSoundVolume, audioInitialized]);

  const fullScreenGlitch = () => {
    setShowFullGlitch(true);
    Animated.sequence([
      Animated.timing(fullGlitchAnim, {
        toValue: 1,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(fullGlitchAnim, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(fullGlitchAnim, {
        toValue: 1,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(fullGlitchAnim, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => setShowFullGlitch(false));
  };

  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    Animated.sequence([
      Animated.timing(toastAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(toastAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(toastAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => setShowToast(false));
  };

  // Gerencia montagem do Modal do toast para garantir que ele seja criado depois de outros Modals
  useEffect(() => {
    let mountTimer: any = null;
    let unmountTimer: any = null;
    if (showToast) {
      // monta pouco depois para garantir ordenação nativa (faz o toast ficar acima)
      mountTimer = setTimeout(() => setToastMounted(true), 20);
      // suprimir overlay escuro em outros modals para evitar que cubram o toast
      setSuppressOverlay(true);
    } else {
      // espera a animação de saída terminar antes de desmontar
      unmountTimer = setTimeout(() => setToastMounted(false), 400);
      // restaurar overlay após toast sumir
      setTimeout(() => setSuppressOverlay(false), 400);
    }
    return () => {
      if (mountTimer) clearTimeout(mountTimer);
      if (unmountTimer) clearTimeout(unmountTimer);
    };
  }, [showToast, setSuppressOverlay]);

  const handleSubmit = async () => {
    await playClickSound();
    fullScreenGlitch();

    const trimmedName = name.toLowerCase().trim();
    const trimmedEmail = email.toLowerCase().trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isRegister) {
      if (!trimmedName) {
        showToastNotification('NÉO-ALERTA: NOME OBRIGATÓRIO');
        return;
      }
      if (!trimmedEmail) {
        showToastNotification('NÉO-ALERTA: EMAIL OBRIGATÓRIO');
        return;
      }
      if (!emailRegex.test(trimmedEmail)) {
        showToastNotification('NÉO-ERROR: EMAIL INVÁLIDO');
        return;
      }
      if (!password || password.length < 6) {
        showToastNotification('SENHA FRACA: MÍNIMO 6 CARACTERES');
        return;
      }
    } else {
      if (!trimmedEmail) {
        showToastNotification('NÉO-ALERTA: EMAIL OBRIGATÓRIO');
        return;
      }
      if (!password) {
        showToastNotification('NÉO-ALERTA: SENHA OBRIGATÓRIA');
        return;
      }
    }

    try {
      const url = isRegister ? '/register' : '/login';
      const body = isRegister
        ? { name: trimmedName, email: trimmedEmail, password }
        : { email: trimmedEmail, password };

      console.log('Enviando para:', `${BASE_URL}${url}`, 'Payload:', { ...body, password: '***' });

      const res = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log('Resposta do servidor:', data, 'Status:', res.status);

      // inline errors removed — rely on toast notifications only

      if (res.ok) {
        if (isRegister) {
          showToastNotification('REGISTRO OK — BEM-VINDO, NETRUNNER!');
          setIsRegister(false);
          setName('');
          setEmail('');
          setPassword('');
        } else {
          showToastNotification('ACESSO CONCEDIDO — BEM-VINDO DE VOLTA, NETRUNNER!');
          setEmail('');
          setPassword('');
          await setSecureItem('userToken', data.token);
          setModalVisible(false);
          if (await shouldShowBiometricPrompt()) {
            setBiometricPromptVisible(true);
          }
        }
      } else {
        const msg = (data?.msg || data?.message || '').toString();
        const code = msg.toUpperCase();
        if (res.status === 409 || code.includes('EMAIL_ALREADY') || code.includes('ALREADY_REGISTERED')) {
          showToastNotification('NÉO-ALERTA: EMAIL JÁ EM USO');
        } else if (code.includes('NAME_ALREADY')) {
          showToastNotification('NÉO-ALERTA: NOME JÁ EM USO');
        } else if (code.includes('PASSWORD_TOO_SHORT')) {
          showToastNotification('SENHA FRACA: MÍNIMO 6 CARACTERES');
        } else if (code.includes('EMAIL_INVALID')) {
          showToastNotification('NÉO-ERROR: EMAIL INVÁLIDO');
        } else if (res.status === 401 && (code.includes('USER_NOT_FOUND') || code.includes('NOT_FOUND'))) {
          showToastNotification('NÉO-ALERTA: USUÁRIO NÃO ENCONTRADO');
        } else if (res.status === 401 && code.includes('INVALID_PASSWORD')) {
          showToastNotification('SENHA INCORRETA — TENTE NOVAMENTE');
        } else if (res.status === 400 && code.includes('MISSING_FIELDS')) {
          showToastNotification('NÉO-ALERTA: CAMPOS OBRIGATÓRIOS');
        } else {
          showToastNotification(msg ? `SISTEMA: ${msg.toUpperCase()}` : 'ERRO AO PROCESSAR — REDE NÓSFERA');
        }
      }
    } catch (err: any) {
      console.error('Erro de fetch:', err);
      showToastNotification(err.message === 'Network request failed' ? 'FALHA NA CONEXÃO COM O SERVIDOR' : 'ERRO INESPERADO — NEXUS OFFLINE');
    }
  };

  const shouldShowBiometricPrompt = async (): Promise<boolean> => {
    if (!isBiometricAvailable || biometricEnabled) return false;
    const lastDecline = await getSecureItem('lastBiometricPromptDecline');
    if (lastDecline) {
      const timeDiff = Date.now() - parseInt(lastDecline);
      if (timeDiff < 24 * 60 * 60 * 1000) return false;
    }
    return true;
  };

  const handleEnableBiometric = async () => {
    await playClickSound();
    try {
      await setSecureItem('biometricEnabled', 'true');
      setBiometricEnabled(true);
      setBiometricPromptVisible(false);
      showToastNotification('BIOMETRIA ATIVADA!');
    } catch (error) {
      console.error('Erro ao ativar biometria:', error);
      showToastNotification('ERRO AO ATIVAR BIOMETRIA');
    }
  };

  const handleDeclineBiometric = async () => {
    await playClickSound();
    try {
      if (dontShowAgain) {
        await setSecureItem('lastBiometricPromptDecline', Date.now().toString());
      }
      setBiometricPromptVisible(false);
    } catch (error) {
      console.error('Erro ao recusar biometria:', error);
    }
  };

  const toggleBiometricInSettings = async (value: boolean) => {
    await playClickSound();
    try {
      await setSecureItem('biometricEnabled', value ? 'true' : 'false');
      setBiometricEnabled(value);
      showToastNotification(value ? 'BIOMETRIA ATIVADA!' : 'BIOMETRIA DESATIVADA!');
    } catch (error) {
      console.error('Erro ao alternar biometria:', error);
      showToastNotification('ERRO AO CONFIGURAR BIOMETRIA');
    }
  };

  const handleLogout = async () => {
    await playClickSound();
    try {
      await deleteSecureItem('userToken');
      await deleteSecureItem('biometricEnabled');
      setBiometricEnabled(false);
      setSettingsModalVisible(false);
      setModalVisible(true);
      setIsRegister(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      showToastNotification('ERRO AO DESCONECTAR');
    }
  };

  const scanlinesTranslateY = scanlinesAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height * 0.02],
  });

  const glitchTranslateX = glitchAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-3, 0, 3],
  });

  const glitchTranslateY = glitchAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [3, 0, -3],
  });

  const fullGlitchOpacity = fullGlitchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
  });

  const modalScale = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const toastOpacity = toastAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const toastTranslateY = toastAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  if (!localFontsLoaded) {
    return (
      <View style={CyberpunkStyles.container}>
        <Text style={{ color: '#fcee09', fontSize: 18, fontFamily: 'monospace' }}>
          CARREGANDO...
        </Text>
      </View>
    );
  }

  return (
    <View style={CyberpunkStyles.container}>
      <Animated.View style={[CyberpunkStyles.scanlines, { transform: [{ translateY: scanlinesTranslateY }] }]} />
      {particles.map(particle => (
        <View
          key={particle.id}
          style={[
            CyberpunkStyles.particle,
            {
              left: particle.x,
              top: particle.y,
              width: particle.size * 2,
              height: particle.size * 2,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              borderRadius: particle.size,
            },
          ]}
        />
      ))}
      {showFullGlitch && (
        <Animated.View style={[CyberpunkStyles.fullGlitch, { opacity: fullGlitchOpacity }]} />
      )}
      <View style={CyberpunkStyles.contentWrapper}>
        <View style={CyberpunkStyles.titleContainer}>
          <Animated.Text
            style={[
              CyberpunkStyles.title,
              {
                transform: [{ translateX: glitchTranslateX }, { translateY: glitchTranslateY }],
                fontFamily: 'Cyberpunk',
                fontWeight: '400',
                fontSize: 26,
              },
            ]}
          >
            CYBERPROJEKT:
          </Animated.Text>
          <Text
            style={[
              CyberpunkStyles.titleShadow,
              { fontFamily: 'Cyberpunk', fontWeight: '400', fontSize: 26 },
            ]}
          >
            CYBERPROJEKT:
          </Text>
          <Text style={[CyberpunkStyles.subtitle, { fontFamily: 'Cyberpunk', fontWeight: '400', fontSize: 20 }]}>NETRUNNER</Text>
        </View>
        {!modalVisible && (
          <TouchableOpacity
            style={{ position: 'absolute', top: 40, right: 5, zIndex: 20 }}
            onPress={async () => {
              await playClickSound();
              setSettingsModalVisible(true);
            }}
          >
            <Ionicons name="settings-outline" size={30} color="#fcee09" />
          </TouchableOpacity>
        )}
        {!modalVisible && (
          <View style={CyberpunkStyles.buttonContainer}>
            <Animated.View
              style={[
                CyberpunkStyles.button,
                isButtonPressed && CyberpunkStyles.buttonPressed,
                isButtonHovered && CyberpunkStyles.buttonHover,
                { transform: [{ scale: buttonScale }] },
              ]}
            >
              <Pressable
                onPress={async () => {
                  await playClickSound();
                  setIsButtonPressed(true);
                  Animated.sequence([
                    Animated.timing(buttonScale, {
                      toValue: 0.95,
                      duration: 100,
                      easing: Easing.linear,
                      useNativeDriver: true,
                    }),
                    Animated.timing(buttonScale, {
                      toValue: 1,
                      duration: 100,
                      easing: Easing.linear,
                      useNativeDriver: true,
                    }),
                  ]).start();
                  fullScreenGlitch();
                  try {
                    if (backgroundMusic.current) {
                      await backgroundMusic.current.stopAsync();
                      await backgroundMusic.current.unloadAsync();
                    }
                    setTimeout(() => {
                      setIsButtonPressed(false);
                      router.push('/(tabs)/explore');
                    }, 300);
                  } catch (error) {
                    console.error('Erro ao iniciar:', error);
                    showToastNotification('ERRO AO INICIAR');
                  }
                }}
                onHoverIn={() => setIsButtonHovered(true)}
                onHoverOut={() => setIsButtonHovered(false)}
                onPressIn={() => setIsButtonPressed(true)}
                onPressOut={() => setIsButtonPressed(false)}
              >
                <Text
                  style={[
                    CyberpunkStyles.buttonText,
                    isButtonHovered && CyberpunkStyles.buttonTextHover,
                    { fontFamily: 'Cyberpunk', fontWeight: '400' },
                  ]}
                >
                  INICIAR
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        )}
      </View>
      <Modal animationType="none" transparent={true} visible={modalVisible} onRequestClose={() => { }}>
        <View style={CyberpunkStyles.modalContainer}>
          <Animated.View style={[CyberpunkStyles.modalContent, { transform: [{ scale: modalScale }] }]}>
            {modalParticles.map(particle => (
              <View
                key={particle.id}
                style={[
                  CyberpunkStyles.modalParticle,
                  {
                    left: particle.x,
                    top: particle.y,
                    width: particle.size * 2,
                    height: particle.size * 2,
                    backgroundColor: particle.color,
                    opacity: particle.opacity,
                    borderRadius: particle.size,
                  },
                ]}
              />
            ))}
            <Animated.Text
              style={[CyberpunkStyles.modalTitle, { transform: [{ translateX: glitchTranslateX }, { translateY: glitchTranslateY }] }]}
            >
              {isRegister ? 'ACESSO: REGISTRO' : 'ACESSO: LOGIN'}
            </Animated.Text>
            {isRegister && (
              <>
                <TextInput
                  style={CyberpunkStyles.input}
                  placeholder="NOME"
                  value={name}
                  onChangeText={text => {
                    setName(text.toLowerCase().trim());
                  }}
                  placeholderTextColor="#fcee0944"
                  autoFocus={true}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  spellCheck={false}
                  selectTextOnFocus={false}
                />

              </>
            )}
            <>
              <TextInput
                style={CyberpunkStyles.input}
                placeholder="EMAIL"
                value={email}
                onChangeText={text => {
                  setEmail(text.toLowerCase().trim());
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#fcee0944"
                returnKeyType="next"
                autoCorrect={false}
                spellCheck={false}
                selectTextOnFocus={false}
              />

            </>
            <>
              <TextInput
                style={CyberpunkStyles.input}
                placeholder="SENHA"
                value={password}
                onChangeText={text => {
                  setPassword(text);
                }}
                secureTextEntry
                placeholderTextColor="#fcee0944"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                selectTextOnFocus={false}
              />

            </>
            <Animated.View
              style={[
                CyberpunkStyles.button,
                isButtonPressed && CyberpunkStyles.buttonPressed,
                isButtonHovered && CyberpunkStyles.buttonHover,
                { transform: [{ scale: buttonScale }] },
              ]}
            >
              <Pressable
                onPress={handleSubmit}
                onHoverIn={() => setIsButtonHovered(true)}
                onHoverOut={() => setIsButtonHovered(false)}
                onPressIn={() => setIsButtonPressed(true)}
                onPressOut={() => setIsButtonPressed(false)}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <Text
                  style={[
                    CyberpunkStyles.buttonText,
                    isButtonHovered && CyberpunkStyles.buttonTextHover,
                  ]}
                >
                  {isRegister ? 'REGISTRAR' : 'ENTRAR'}
                </Text>
              </Pressable>
            </Animated.View>
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              onPress={async () => {
                await playClickSound();
                setIsRegister(!isRegister);
              }}
            >
              <Text style={CyberpunkStyles.switchText}>
                {isRegister ? 'JÁ TEM CONTA? LOGIN' : 'CRIAR NOVA CONTA'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
      <Modal
        animationType="none"
        transparent={true}
        visible={biometricPromptVisible}
        onRequestClose={() => setBiometricPromptVisible(false)}
      >
        <View style={CyberpunkStyles.modalContainer}>
          <Animated.View style={[CyberpunkStyles.modalContent, { transform: [{ scale: modalScale }], padding: 20 }]}>
            {modalParticles.map(particle => (
              <View
                key={particle.id}
                style={[
                  CyberpunkStyles.modalParticle,
                  {
                    left: particle.x,
                    top: particle.y,
                    width: particle.size * 2,
                    height: particle.size * 2,
                    backgroundColor: particle.color,
                    opacity: particle.opacity,
                    borderRadius: particle.size,
                  },
                ]}
              />
            ))}
            <Animated.Text
              style={[CyberpunkStyles.modalTitle, { transform: [{ translateX: glitchTranslateX }, { translateY: glitchTranslateY }], marginBottom: 20 }]}
            >
              ATIVAR BIOMETRIA?
            </Animated.Text>
            <Text style={CyberpunkStyles.promptText}>DESEJA USAR BIOMETRIA PARA LOGIN AUTOMÁTICO?</Text>
            <TouchableOpacity
              style={CyberpunkStyles.checkboxContainer}
              onPress={async () => {
                await playClickSound();
                setDontShowAgain(!dontShowAgain);
              }}
            >
              <Ionicons name={dontShowAgain ? 'checkbox-outline' : 'square-outline'} size={24} color="#fcee09" />
              <Text style={CyberpunkStyles.checkboxText}>NÃO MOSTRAR POR 24 HORAS</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Animated.View style={[CyberpunkStyles.button, { transform: [{ scale: buttonScale }], width: '45%' }]}>
                <Pressable onPress={handleEnableBiometric}>
                  <Text style={CyberpunkStyles.buttonText}>SIM</Text>
                </Pressable>
              </Animated.View>
              <Animated.View style={[CyberpunkStyles.button, { transform: [{ scale: buttonScale }], width: '45%' }]}>
                <Pressable onPress={handleDeclineBiometric}>
                  <Text style={CyberpunkStyles.buttonText}>NÃO</Text>
                </Pressable>
              </Animated.View>
            </View>
          </Animated.View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={settingsModalVisible}
        onRequestClose={() => setSettingsModalVisible(false)}
      >
        <TouchableOpacity
          style={CyberpunkStyles.modalContainer}
          activeOpacity={1}
          onPress={async () => {
            await playClickSound();
            setSettingsModalVisible(false);
          }}
        >
          <Animated.View
            style={[CyberpunkStyles.modalContent, { transform: [{ scale: modalScale }], padding: 20, width: width * 0.8, maxWidth: 400 }]}
          >
            {settingsParticles.map(particle => (
              <View
                key={particle.id}
                style={[
                  CyberpunkStyles.modalParticle,
                  {
                    left: particle.x,
                    top: particle.y,
                    width: particle.size * 2,
                    height: particle.size * 2,
                    backgroundColor: particle.color,
                    opacity: particle.opacity,
                    borderRadius: particle.size,
                  },
                ]}
              />
            ))}
            <TouchableOpacity
              style={CyberpunkStyles.closeButton}
              onPress={async () => {
                await playClickSound();
                setSettingsModalVisible(false);
              }}
            >
              <Ionicons name="close-outline" size={24} color="#fcee09" />
            </TouchableOpacity>
            <Animated.Text
              style={[CyberpunkStyles.modalTitle, { transform: [{ translateX: glitchTranslateX }, { translateY: glitchTranslateY }], marginBottom: 20 }]}
            >
              SETTINGS
            </Animated.Text>
            {isBiometricAvailable && (
              <View style={CyberpunkStyles.settingsOption}>
                <Text style={CyberpunkStyles.settingsText}>BIOMETRIA</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#fcee0944' }}
                  thumbColor={biometricEnabled ? '#fcee09' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleBiometricInSettings}
                  value={biometricEnabled}
                />
              </View>
            )}
            <View style={CyberpunkStyles.sliderContainer}>
              <Text style={CyberpunkStyles.sliderLabel}>VOLUME MÚSICA</Text>
              <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={1}
                value={musicVolume}
                onValueChange={setMusicVolume}
                minimumTrackTintColor="#fcee09"
                maximumTrackTintColor="#767577"
                thumbTintColor="#fcee09"
              />
            </View>
            <View style={CyberpunkStyles.sliderContainer}>
              <Text style={CyberpunkStyles.sliderLabel}>VOLUME UI</Text>
              <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={1}
                value={uiSoundVolume}
                onValueChange={setUiSoundVolume}
                minimumTrackTintColor="#fcee09"
                maximumTrackTintColor="#767577"
                thumbTintColor="#fcee09"
              />
            </View>
            <Animated.View
              style={[
                CyberpunkStyles.button,
                isButtonPressed && CyberpunkStyles.buttonPressed,
                isButtonHovered && CyberpunkStyles.buttonHover,
                { transform: [{ scale: buttonScale }], marginTop: 20 },
              ]}
            >
              <Pressable
                onPress={handleLogout}
                onHoverIn={() => setIsButtonHovered(true)}
                onHoverOut={() => setIsButtonHovered(false)}
                onPressIn={() => setIsButtonPressed(true)}
                onPressOut={() => setIsButtonPressed(false)}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <Text
                  style={[
                    CyberpunkStyles.buttonText,
                    isButtonHovered && CyberpunkStyles.buttonTextHover,
                  ]}
                >
                  DESCONECTAR
                </Text>
              </Pressable>
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
      {/* TOAST: usar Modal transparente para ficar acima dos overlays de outros Modals */}
      {/** Toast Modal: usar overFullScreen e tornar visível somente quando showToast === true. */}
      <Modal
        transparent
        animationType="none"
        presentationStyle="overFullScreen"
        visible={toastMounted}
        statusBarTranslucent={true}
        onRequestClose={() => { }}
      >
        <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center' }} pointerEvents="box-none">
          <Animated.View
            pointerEvents="auto"
            style={[
              CyberpunkStyles.toastContainer,
              {
                opacity: toastOpacity,
                transform: [{ translateY: toastTranslateY }],
              },
            ]}
          >
            {toastParticles.map(particle => (
              <View
                key={particle.id}
                style={[
                  CyberpunkStyles.toastParticle,
                  {
                    left: particle.x,
                    top: particle.y,
                    width: particle.size * 2,
                    height: particle.size * 2,
                    backgroundColor: particle.color,
                    opacity: particle.opacity,
                    borderRadius: particle.size,
                  },
                ]}
              />
            ))}
            <Animated.Text
              style={[
                CyberpunkStyles.toastText,
                { transform: [{ translateX: glitchTranslateX }, { translateY: glitchTranslateY }] },
              ]}
            >
              {toastMessage}
            </Animated.Text>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};