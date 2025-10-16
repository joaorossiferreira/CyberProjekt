// components/MissionScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';
import { MissionSystem } from './MissionSystem';
import { Mission } from '../types';
import CodeMission from './CodeMission';
import { useImmersiveMode } from '../hooks/useImmersiveMode';
import { useAudio } from './AudioManager'; // NOVO IMPORT

const { width, height } = Dimensions.get('window');

interface MissionScreenProps {
  missionId: string;
  itemId: string;
  onClose: () => void;
  onMissionComplete: (itemId: string) => void;
}

export default function MissionScreen({ missionId, itemId, onClose, onMissionComplete }: MissionScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [codeAnswer, setCodeAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [mission, setMission] = useState<Mission | null>(null);
  const { playUISound } = useAudio(); // USAR AUDIO MANAGER

  useImmersiveMode(true);

  useEffect(() => {
    const allMissions = MissionSystem.getAllMissions();
    const foundMission = allMissions.find(m => m.id === missionId);
    setMission(foundMission || null);
  }, [missionId]);

  const handleSubmit = async () => {
    await playUISound(); // SOM NO SUBMIT
    if (!mission) return;

    let correct = false;

    switch (mission.type) {
      case 'math':
        correct = mission.data.answer === Number(selectedAnswer);
        break;
      case 'code':
        correct = codeAnswer.trim() === mission.data.correctCode.trim();
        break;
      case 'logic':
        correct = mission.data.answer === selectedAnswer;
        break;
    }

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setTimeout(() => {
        onMissionComplete(itemId);
        onClose();
      }, 1500);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#00ffcc';
      case 'medium': return '#fcee09';
      case 'hard': return '#ff3366';
      default: return '#fcee09';
    }
  };

  const renderMathMission = () => (
    <View style={styles.missionContent}>
      <Text style={styles.question}>{mission?.data.question}</Text>
      <View style={styles.answersGrid}>
        {mission?.data.options?.map((answer: number, index: number) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswer === answer.toString() && styles.answerSelected
            ]}
            onPress={async () => {
              await playUISound(); // SOM AO SELECIONAR RESPOSTA
              setSelectedAnswer(answer.toString());
            }}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCodeMission = () => (
    <View style={styles.missionContent}>
      <CodeMission
        missionData={mission?.data}
        onAnswer={(answer) => {
          setCodeAnswer(answer);
        }}
      />
    </View>
  );

  const renderLogicMission = () => (
    <View style={styles.missionContent}>
      <Text style={styles.question}>{mission?.data.question}</Text>
      <View style={styles.optionsContainer}>
        {mission?.data.options?.map((option: string, index: number) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option && styles.optionSelected
            ]}
            onPress={async () => {
              await playUISound(); // SOM AO SELECIONAR OPÇÃO
              setSelectedAnswer(option);
            }}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderMissionContent = () => {
    if (!mission) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>MISSÃO CORROMPIDA</Text>
          <TouchableOpacity style={styles.backButton} onPress={async () => {
            await playUISound(); // SOM NO BOTÃO DE ERRO
            onClose();
          }}>
            <Text style={styles.backButtonText}>VOLTAR AO MAPA</Text>
          </TouchableOpacity>
        </View>
      );
    }

    switch (mission.type) {
      case 'math':
        return renderMathMission();
      case 'code':
        return renderCodeMission();
      case 'logic':
        return renderLogicMission();
      default:
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>TIPO DE MISSÃO DESCONHECIDO</Text>
          </View>
        );
    }
  };

  const canSubmit = () => {
    if (!mission) return false;

    switch (mission.type) {
      case 'math':
        return selectedAnswer !== '';
      case 'code':
        return codeAnswer.trim() !== '';
      case 'logic':
        return selectedAnswer !== '';
      default:
        return false;
    }
  };

  const renderResultScreen = () => (
    <View style={styles.resultContainer}>
      <Text style={[styles.resultText, isCorrect ? styles.correct : styles.incorrect]}>
        {isCorrect ? '✅ MISSÃO CONCLUÍDA' : '❌ RESPOSTA INCORRETA'}
      </Text>
      <Text style={styles.resultSubtext}>
        {isCorrect ? 'Acesso concedido ao sistema' : 'Tente novamente, netrunner'}
      </Text>

      <View style={styles.resultButtons}>
        {isCorrect ? (
          <TouchableOpacity style={styles.continueButton} onPress={async () => {
            await playUISound(); // SOM NO BOTÃO DE CONTINUAR
            onClose();
          }}>
            <Text style={styles.continueButtonText}>VOLTAR AO MAPA</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.tryAgainButton} onPress={async () => {
              await playUISound(); // SOM NO BOTÃO TENTAR NOVAMENTE
              setShowResult(false);
              setSelectedAnswer('');
              setCodeAnswer('');
            }}>
              <Text style={styles.tryAgainText}>TENTAR NOVAMENTE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.abortButton} onPress={async () => {
              await playUISound(); // SOM NO BOTÃO ABORTAR
              onClose();
            }}>
              <Text style={styles.abortButtonText}>VOLTAR AO MAPA</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.overlayContainer}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>
              {mission?.title || 'MISSÃO'}
            </Text>
            <View style={styles.missionInfo}>
              <Text style={[styles.difficulty, { color: getDifficultyColor(mission?.difficulty || 'easy') }]}>
                {mission?.difficulty?.toUpperCase()}
              </Text>
              <Text style={styles.type}>
                {mission?.type?.toUpperCase()}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={async () => {
            await playUISound(); // SOM NO BOTÃO FECHAR
            onClose();
          }}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* CONTEÚDO */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {showResult ? renderResultScreen() : (
            <>
              <Text style={styles.description}>
                {mission?.description}
              </Text>
              {renderMissionContent()}

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !canSubmit() && styles.submitButtonDisabled
                ]}
                onPress={handleSubmit}
                disabled={!canSubmit()}
              >
                <Text style={styles.submitButtonText}>
                  {mission?.type === 'code' ? 'EXECUTAR CÓDIGO' : 'VERIFICAR RESPOSTA'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>

        {/* FOOTER */}
        {!showResult && mission && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              XP: {mission?.xp} • ₵: {mission?.gold}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

// ... (os estilos permanecem EXATAMENTE iguais)
const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    zIndex: 9999,
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#fcee0944',
    backgroundColor: '#00000066',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Cyberpunk',
    color: '#fcee09',
    marginBottom: 8,
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  missionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficulty: {
    fontSize: 12,
    fontFamily: 'ChakraPetch-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  type: {
    fontSize: 12,
    fontFamily: 'ChakraPetch-Bold',
    color: '#00ffcc',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fcee09',
  },
  closeButtonText: {
    color: '#fcee09',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Regular',
    color: '#00ffcc',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  missionContent: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontFamily: 'ChakraPetch-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  answersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  answerButton: {
    width: '48%',
    backgroundColor: '#00000066',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fcee0944',
    alignItems: 'center',
  },
  answerSelected: {
    backgroundColor: '#fcee0922',
    borderColor: '#fcee09',
  },
  answerText: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Regular',
    color: '#ffffff',
  },
  codeContainer: {
    backgroundColor: '#00000066',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#00ffcc44',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#00ffcc',
    lineHeight: 16,
  },
  codeLabel: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Bold',
    color: '#00ffcc',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#00ffcc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#00000066',
    color: '#00ffcc',
    fontFamily: 'monospace',
    fontSize: 14,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#00000066',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fcee0944',
  },
  optionSelected: {
    backgroundColor: '#fcee0922',
    borderColor: '#fcee09',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Regular',
    color: '#ffffff',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#fcee09',
    padding: 18,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fcee09',
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: '#666666',
    borderColor: '#999999',
  },
  submitButtonText: {
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Cyberpunk',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 300,
  },
  resultText: {
    fontSize: 24,
    fontFamily: 'Cyberpunk',
    textAlign: 'center',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  correct: {
    color: '#00ffcc',
    textShadowColor: '#00ffcc',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  incorrect: {
    color: '#ff3366',
    textShadowColor: '#ff3366',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  resultSubtext: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  resultButtons: {
    width: '100%',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#00ffcc',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    borderWidth: 2,
    borderColor: '#00ffcc',
  },
  continueButtonText: {
    color: '#000000',
    fontFamily: 'Cyberpunk',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  tryAgainButton: {
    backgroundColor: '#fcee09',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#fcee09',
  },
  tryAgainText: {
    color: '#000000',
    fontFamily: 'Cyberpunk',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  abortButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    borderWidth: 2,
    borderColor: '#ff3366',
  },
  abortButtonText: {
    color: '#ff3366',
    fontFamily: 'Cyberpunk',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff3366',
    fontSize: 18,
    fontFamily: 'ChakraPetch-Bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#fcee09',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fcee09',
  },
  backButtonText: {
    color: '#000000',
    fontFamily: 'Cyberpunk',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#fcee0944',
    backgroundColor: '#00000066',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});