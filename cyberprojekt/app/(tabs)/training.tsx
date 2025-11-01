// app/(tabs)/training.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import MissionScreen from '../../components/MissionScreen';
import { MissionSystem } from '../../components/MissionSystem';
import { Mission } from '../../components/MissionSystem/types';
import { useAudio } from '../../components/AudioManager';

export default function Training() {
  const router = useRouter();
  const { playUISound } = useAudio();
  
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [selectedType, setSelectedType] = useState<'code' | 'logic' | 'math' | null>(null);
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [showMission, setShowMission] = useState(false);

  const handleDifficultySelect = async (difficulty: 'easy' | 'medium' | 'hard') => {
    await playUISound();
    setSelectedDifficulty(difficulty);
    setSelectedType(null);
  };

  const handleTypeSelect = async (type: 'code' | 'logic' | 'math') => {
    await playUISound();
    setSelectedType(type);
  };

  const handleStartTraining = async () => {
    if (!selectedDifficulty || !selectedType) return;
    
    await playUISound();
    const mission = MissionSystem.getRandomMission(selectedDifficulty, selectedType);
    setCurrentMission(mission);
    setShowMission(true);
  };

  const handleMissionComplete = async () => {
    await playUISound(require('../../assets/sounds/success.mp3'));
    setShowMission(false);
    setCurrentMission(null);
    // Reset para permitir novo treino
  };

  const handleMissionClose = async () => {
    await playUISound();
    setShowMission(false);
    setCurrentMission(null);
  };

  const handleBack = async () => {
    await playUISound();
    router.push(`/explore?openMenu=${Date.now()}`);
  };

  const difficultyLabels = {
    easy: 'FÁCIL',
    medium: 'MÉDIO',
    hard: 'DIFÍCIL'
  };

  const typeLabels = {
    code: 'CÓDIGO',
    logic: 'LÓGICA',
    math: 'MATEMÁTICA'
  };

  const difficultyColors = {
    easy: '#00ffcc',
    medium: '#fcee09',
    hard: '#ff3366'
  };

  if (showMission && currentMission) {
    return (
      <MissionScreen
        mission={currentMission}
        onComplete={handleMissionComplete}
        onClose={handleMissionClose}
        trainingMode={true}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>⚡ MODO TREINO ⚡</Text>
        <Text style={styles.subtitle}>SEM RECOMPENSAS • SEM LIMITES</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Seleção de Dificuldade */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. SELECIONE A DIFICULDADE</Text>
          <View style={styles.buttonGrid}>
            {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={[
                  styles.difficultyButton,
                  selectedDifficulty === difficulty && styles.selectedButton,
                  { borderColor: difficultyColors[difficulty] }
                ]}
                onPress={() => handleDifficultySelect(difficulty)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.buttonText,
                  selectedDifficulty === difficulty && styles.selectedButtonText,
                  { color: difficultyColors[difficulty] }
                ]}>
                  {difficultyLabels[difficulty]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Seleção de Tipo */}
        {selectedDifficulty && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. SELECIONE O TIPO</Text>
            <View style={styles.buttonGrid}>
              {(['code', 'logic', 'math'] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    selectedType === type && styles.selectedButton
                  ]}
                  onPress={() => handleTypeSelect(type)}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.buttonText,
                    selectedType === type && styles.selectedButtonText
                  ]}>
                    {typeLabels[type]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Botão Iniciar */}
        {selectedDifficulty && selectedType && (
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartTraining}
              activeOpacity={0.8}
            >
              <Text style={styles.startButtonText}>▶ INICIAR TREINO</Text>
            </TouchableOpacity>
            <Text style={styles.infoText}>
              Modo: {difficultyLabels[selectedDifficulty]} • {typeLabels[selectedType]}
            </Text>
            <Text style={styles.warningText}>
              ⚠ Nenhuma recompensa será concedida no modo treino
            </Text>
          </View>
        )}

        {/* Informações */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>SOBRE O MODO TREINO</Text>
          <Text style={styles.infoDescription}>
            • Pratique missões sem gastar recursos{'\n'}
            • Nenhum XP ou GOLD será concedido{'\n'}
            • Treine quantas vezes quiser{'\n'}
            • Melhore suas habilidades offline
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.bottomButton}
        onPress={handleBack}
        activeOpacity={0.8}
      >
        <View style={styles.bottomButtonGradient}>
          <Text style={styles.bottomButtonText}>VOLTAR</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#fcee09',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Cyberpunk',
    color: '#fcee09',
    textAlign: 'center',
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    letterSpacing: 4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#00ffcc',
    textAlign: 'center',
    letterSpacing: 2,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    marginBottom: 15,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  buttonGrid: {
    gap: 12,
  },
  difficultyButton: {
    borderWidth: 2,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  typeButton: {
    borderWidth: 2,
    borderColor: '#fcee09',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(252,238,9,0.1)',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'rgba(252,238,9,0.3)',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  selectedButtonText: {
    textShadowColor: 'currentColor',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  startButton: {
    backgroundColor: '#fcee09',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#fcee09',
    shadowColor: '#fcee09',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  startButtonText: {
    fontSize: 20,
    fontFamily: 'Cyberpunk',
    color: '#000',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#00ffcc',
    textAlign: 'center',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 12,
    fontFamily: 'ChakraPetch-Regular',
    color: '#ff3366',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  infoSection: {
    marginTop: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#00ffcc',
    backgroundColor: 'rgba(0,255,204,0.05)',
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Bold',
    color: '#00ffcc',
    marginBottom: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  infoDescription: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#00ffcc',
    lineHeight: 22,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#fcee09',
  },
  bottomButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#fcee09',
  },
  bottomButtonText: {
    fontSize: 18,
    fontFamily: 'Cyberpunk',
    color: '#000',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
