import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  Easing, 
  Dimensions, 
  Pressable,
  Platform 
} from 'react-native';
import { CyberpunkStyles } from './CyberpunkStyles';
import { useRouter } from 'expo-router';

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
  
  // States
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [showFullGlitch, setShowFullGlitch] = useState(false);

  // Inicializar partículas
  useEffect(() => {
    const initialParticles: Particle[] = [];
    const particleCount = 50; // Número reduzido para melhor performance
    
    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.8 + 0.3,
        color: Math.random() > 0.5 ? '#fcee09' : '#00ffff',
        opacity: Math.random() * 0.4 + 0.1
      });
    }
    
    setParticles(initialParticles);
    
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

    // Efeito de glitch aleatório
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        applyTextGlitch();
      }
    }, 4000);

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

  const handleButtonPress = () => {
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

        {/* Botão */}
        <View style={CyberpunkStyles.buttonContainer}>
          <Animated.View style={[
            CyberpunkStyles.button,
            isButtonPressed && CyberpunkStyles.buttonPressed,
            isButtonHovered && CyberpunkStyles.buttonHover,
            { transform: [{ scale: buttonScale }] }
          ]}>
            <Pressable
              onPress={handleButtonPress}
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
      </View>
    </View>
  );
};