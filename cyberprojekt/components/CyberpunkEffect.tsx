import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  Easing, 
  Dimensions, 
  Pressable,
  TextInput,
  Alert,
  Modal
} from 'react-native';
import { CyberpunkStyles } from './CyberpunkStyles';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons } from '@expo/vector-icons';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
}

export const CyberpunkEffect: React.FC = () => {
  const router = useRouter();
  const { width, height } = Dimensions.get('window');
  
  // Refs para animações
  const glitchAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const fullGlitchAnim = useRef(new Animated.Value(0)).current;
  const scanlinesAnim = useRef(new Animated.Value(0)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;
  
  // States
  const [particles, setParticles] = useState<Particle[]>([]);
  const [modalParticles, setModalParticles] = useState<Particle[]>([]);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [showFullGlitch, setShowFullGlitch] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(true);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [modalVisible, setModalVisible] = useState(true); // Inicia true para modal se biometria falhar
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  // BASE_URL para dev - Mude para URL de produção no APK
  const BASE_URL = 'http://192.168.12.94:3000';

  // Inicializar partículas e checar biometria/token
  useEffect(() => {
    const initialParticles: Particle[] = [];
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.8 + 0.3,
        color: Math.random() > 0.5 ? '#fcee09' : '#000',
        opacity: Math.random() * 0.4 + 0.1
      });
    }
    setParticles(initialParticles);

    // Partículas do modal
    const modalParticleCount = 10;
    const modalParticlesInit: Particle[] = [];
    for (let i = 0; i < modalParticleCount; i++) {
      modalParticlesInit.push({
        id: i + 1000,
        x: Math.random() * (width * 0.9),
        y: Math.random() * 300,
        size: Math.random() * 1 + 0.3,
        speed: Math.random() * 0.5 + 0.2,
        color: '#fcee09',
        opacity: Math.random() * 0.2 + 0.1
      });
    }
    setModalParticles(modalParticlesInit);

    // Animação de scanlines
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

    // Animação do modal
    Animated.timing(modalAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    // Efeito de glitch aleatório
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        applyTextGlitch();
      }
    }, 4000);

    // Checar biometria e login automático
    (async () => {
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

        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          const res = await fetch(`${BASE_URL}/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          });
          const data = await res.json();

          if (data.auth) {
            // Tenta biometria sempre que há token válido e biometria disponível
            const result = await LocalAuthentication.authenticateAsync({
              promptMessage: 'Use sua digital para entrar',
              fallbackLabel: 'Use senha',
              disableDeviceFallback: false,
            });
            if (result.success) {
              setModalVisible(false);
              return;
            } else {
              setModalVisible(true);
              setIsRegister(false); // Modo login
              return;
            }
          } else {
            await SecureStore.deleteItemAsync('userToken');
            await SecureStore.deleteItemAsync('biometricEnabled');
            setModalVisible(true);
            setIsRegister(true);
            return;
          }
        } else {
          setModalVisible(true);
          setIsRegister(true);
        }
      } catch (err) {
        setModalVisible(true);
        setIsRegister(true);
      }
    })();

    return () => {
      clearInterval(glitchInterval);
    };
  }, []);

  // Animação das partículas
  useEffect(() => {
    const particleInterval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(p => ({
          ...p,
          y: (p.y + p.speed) % height,
          x: p.x + (Math.random() - 0.5) * 0.3
        }))
      );
      setModalParticles(prevParticles => 
        prevParticles.map(p => ({
          ...p,
          y: (p.y + p.speed) % 300,
          x: p.x + (Math.random() - 0.5) * 0.2
        }))
      );
    }, 70);

    return () => clearInterval(particleInterval);
  }, [height]);

  const applyTextGlitch = () => {
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
  };

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
    ]).start(() => {
      setShowFullGlitch(false);
    });
  };

  const handleSubmit = async () => {
    fullScreenGlitch();
    const url = isRegister ? '/register' : '/login';
    const body = isRegister ? { 
      name: name.toLowerCase().trim(), 
      email: email.toLowerCase().trim(), 
      password 
    } : { 
      email: email.toLowerCase().trim(), 
      password 
    };
    try {
      const res = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        Alert.alert(data.msg || 'Erro ao processar');
        return;
      }
      await SecureStore.setItemAsync('userToken', data.token);
      if (isBiometricAvailable && isRegister) {
        Alert.alert(
          'Ativar Biometria',
          'Quer usar digital para logins futuros?',
          [
            { text: 'Não', onPress: () => setModalVisible(false) },
            {
              text: 'Sim',
              onPress: async () => {
                const enrolled = await LocalAuthentication.isEnrolledAsync();
                if (!enrolled) {
                  Alert.alert('Biometria', 'Nenhuma biometria cadastrada no dispositivo.');
                  setModalVisible(false);
                  return;
                }
                const result = await LocalAuthentication.authenticateAsync({
                  promptMessage: 'Confirme sua digital para ativar biometria',
                  fallbackLabel: 'Use senha',
                  disableDeviceFallback: false,
                });
                if (result.success) {
                  await SecureStore.setItemAsync('biometricEnabled', 'true');
                  Alert.alert('Biometria', 'Biometria ativada com sucesso!');
                  setModalVisible(false);
                } else {
                  Alert.alert('Biometria', 'Falha ao ativar biometria. Use email e senha.');
                  setModalVisible(false);
                }
              },
            },
          ]
        );
      } else {
        setModalVisible(false);
      }
    } catch (err) {
      Alert.alert('Erro de conexão com o servidor');
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('biometricEnabled');
    setSettingsModalVisible(false);
    setModalVisible(true);
    setIsRegister(false); // Volta para modo login
  };

  const scanlinesTranslateY = scanlinesAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height * 0.02]
  });

  const glitchTranslateX = glitchAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-3, 0, 3]
  });

  const glitchTranslateY = glitchAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [3, 0, -3]
  });

  const fullGlitchOpacity = fullGlitchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6]
  });

  const modalScale = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1]
  });

  return (
    <View style={CyberpunkStyles.container}>
      {/* Efeito de scanlines */}
      <Animated.View style={[
        CyberpunkStyles.scanlines,
        { 
          transform: [{ translateY: scanlinesTranslateY }],
        }
      ]} />
      
      {/* Partículas simples usando Views */}
      {particles.map(particle => (
        <View
          key={particle.id}
          style={[ // Corrigido: array de estilos completo
            CyberpunkStyles.particle,
            {
              left: particle.x,
              top: particle.y,
              width: particle.size * 2,
              height: particle.size * 2,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              borderRadius: particle.size,
            }
          ]}
        />
      ))}

      {/* Efeito de glitch em tela cheia */}
      {showFullGlitch && (
        <Animated.View style={[
          CyberpunkStyles.fullGlitch,
          { opacity: fullGlitchOpacity }
        ]} />
      )}

      <View style={CyberpunkStyles.contentWrapper}>
        {/* Container do título */}
        <View style={CyberpunkStyles.titleContainer}>
          <Animated.Text style={[
            CyberpunkStyles.title,
            { 
              transform: [
                { translateX: glitchTranslateX },
                { translateY: glitchTranslateY }
              ] 
            }
          ]}>
            CYBERPROJEKT:
          </Animated.Text>
          <Text style={CyberpunkStyles.titleShadow}>CYBERPROJEKT:</Text>
          <Text style={CyberpunkStyles.subtitle}>NETRUNNER</Text>
        </View>

        {/* Botão de engrenagem (settings) no topo - mais à direita */}
        {!modalVisible && (
          <TouchableOpacity
            style={{ position: 'absolute', top: 40, right: 5, zIndex: 20 }}
            onPress={() => setSettingsModalVisible(true)}
          >
            <Ionicons name="settings-outline" size={30} color="#fcee09" />
          </TouchableOpacity>
        )}

        {/* Botão INICIAR - Visível após fechar modal */}
        {!modalVisible && (
          <View style={CyberpunkStyles.buttonContainer}>
            <Animated.View style={[
              CyberpunkStyles.button,
              isButtonPressed && CyberpunkStyles.buttonPressed,
              isButtonHovered && CyberpunkStyles.buttonHover,
              { transform: [{ scale: buttonScale }] }
            ]}>
              <Pressable
                onPress={() => {
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
                  setTimeout(() => {
                    setIsButtonPressed(false);
                    router.push('/(tabs)/explore');
                  }, 300);
                }}
                onHoverIn={() => setIsButtonHovered(true)}
                onHoverOut={() => setIsButtonHovered(false)}
                onPressIn={() => setIsButtonPressed(true)}
                onPressOut={() => setIsButtonPressed(false)}
              >
                <Text style={[
                  CyberpunkStyles.buttonText,
                  isButtonHovered && CyberpunkStyles.buttonTextHover
                ]}>
                  INICIAR
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        )}
      </View>

      {/* Modal de login/registro */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}
      >
        <View style={CyberpunkStyles.modalContainer}>
          <Animated.View style={[
            CyberpunkStyles.modalContent,
            { transform: [{ scale: modalScale }], pointerEvents: 'box-none' }
          ]}>
            {/* Partículas do modal */}
            {modalParticles.map(particle => (
              <View
                key={particle.id}
                style={[ // Corrigido: array de estilos completo
                  CyberpunkStyles.modalParticle,
                  {
                    left: particle.x,
                    top: particle.y,
                    width: particle.size * 2,
                    height: particle.size * 2,
                    backgroundColor: particle.color,
                    opacity: particle.opacity,
                    borderRadius: particle.size,
                  }
                ]}
              />
            ))}
            <Animated.Text style={[
              CyberpunkStyles.modalTitle,
              {
                transform: [
                  { translateX: glitchTranslateX },
                  { translateY: glitchTranslateY }
                ]
              }
            ]}>
              {isRegister ? 'ACESSO: REGISTRO' : 'ACESSO: LOGIN'}
            </Animated.Text>
            {isRegister && (
              <TextInput
                style={{ ...CyberpunkStyles.input, fontFamily: undefined }}
                placeholder="NOME"
                value={name}
                onChangeText={(text) => setName(text.toLowerCase().trim())}
                placeholderTextColor="#fcee0944"
                autoFocus={true}
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                selectTextOnFocus={false}
              />
            )}
            <TextInput
              style={{ ...CyberpunkStyles.input, fontFamily: undefined }}
              placeholder="EMAIL"
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase().trim())}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#fcee0944"
              returnKeyType="next"
              autoCorrect={false}
              spellCheck={false}
              selectTextOnFocus={false}
            />
            <TextInput
              style={{ ...CyberpunkStyles.input, fontFamily: undefined }}
              placeholder="SENHA"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              placeholderTextColor="#fcee0944"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              selectTextOnFocus={false}
            />
            <Animated.View style={[
              CyberpunkStyles.button,
              isButtonPressed && CyberpunkStyles.buttonPressed,
              isButtonHovered && CyberpunkStyles.buttonHover,
              { transform: [{ scale: buttonScale }] }
            ]}>
              <Pressable
                onPress={() => {
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
                  ]).start(() => setIsButtonPressed(false));
                  handleSubmit();
                }}
                onHoverIn={() => setIsButtonHovered(true)}
                onHoverOut={() => setIsButtonHovered(false)}
                onPressIn={() => setIsButtonPressed(true)}
                onPressOut={() => setIsButtonPressed(false)}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <Text style={[
                  CyberpunkStyles.buttonText,
                  isButtonHovered && CyberpunkStyles.buttonTextHover
                ]}>
                  {isRegister ? 'REGISTRAR' : 'ENTRAR'}
                </Text>
              </Pressable>
            </Animated.View>
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              onPress={() => setIsRegister(!isRegister)}
            >
              <Text style={CyberpunkStyles.switchText}>
                {isRegister ? 'JÁ TEM CONTA? LOGIN' : 'CRIAR NOVA CONTA'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* Modal de configurações (deslogar) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={settingsModalVisible}
        onRequestClose={() => setSettingsModalVisible(false)}
      >
        <TouchableOpacity
          style={CyberpunkStyles.modalContainer}
          activeOpacity={1}
          onPress={() => setSettingsModalVisible(false)}
        >
          <Animated.View style={[
            CyberpunkStyles.modalContent,
            { transform: [{ scale: modalScale }], pointerEvents: 'auto' }
          ]}>
            <TouchableOpacity
              style={CyberpunkStyles.closeButton}
              onPress={() => setSettingsModalVisible(false)}
            >
              <Ionicons name="close-outline" size={24} color="#fcee09" />
            </TouchableOpacity>
            <Text style={CyberpunkStyles.modalTitle}>CONFIGURAÇÕES</Text>
            <Animated.View style={[
              CyberpunkStyles.button,
              isButtonPressed && CyberpunkStyles.buttonPressed,
              isButtonHovered && CyberpunkStyles.buttonHover,
              { transform: [{ scale: buttonScale }], marginTop: 20 }
            ]}>
              <Pressable
                onPress={() => {
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
                  ]).start(() => setIsButtonPressed(false));
                  handleLogout();
                }}
                onHoverIn={() => setIsButtonHovered(true)}
                onHoverOut={() => setIsButtonHovered(false)}
                onPressIn={() => setIsButtonPressed(true)}
                onPressOut={() => setIsButtonPressed(false)}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <Text style={[
                  CyberpunkStyles.buttonText,
                  isButtonHovered && CyberpunkStyles.buttonTextHover
                ]}>
                  DESLOGAR
                </Text>
              </Pressable>
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};