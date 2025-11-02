import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { MissionSystem } from './MissionSystem';
import { Mission } from '../types';
import CodeMission from './CodeMission';
import { useAudio } from './AudioManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const BASE_URL = 'https://backend-psi-fawn-77.vercel.app';

interface MissionScreenProps {
  missionId?: string;
  itemId?: string;
  mission?: Mission; // Permite passar missão diretamente (modo treino)
  trainingMode?: boolean; // Se true, não concede recompensas
  onClose: () => void;
  onComplete?: () => void; // Callback genérico para treino
  onMissionComplete?: (itemId: string) => void; // Callback para missões normais
}

export default function MissionScreen({ 
  missionId, 
  itemId, 
  mission: propMission,
  trainingMode = false,
  onClose, 
  onComplete,
  onMissionComplete 
}: MissionScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [codeAnswer, setCodeAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [mission, setMission] = useState<Mission | null>(null);
  const [userStats, setUserStats] = useState<{ level: number; currentExp: number; gold: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { playUISound } = useAudio();

  useEffect(() => {
    // Se propMission foi passada (modo treino), usa ela diretamente
    if (propMission) {
      setMission(propMission);
    } else if (missionId) {
      // Busca a missão pelo ID (inclui missões normais E sazonais)
      const allMissions = MissionSystem.getAllMissions();
      let foundMission = allMissions.find(m => m.id === missionId);
      
      // Se não encontrou nas missões normais, procura nas sazonais
      if (!foundMission) {
        const seasonalMissions = MissionSystem.getSeasonalMissions();
        if (seasonalMissions) {
          foundMission = seasonalMissions.find(m => m.id === missionId);
        }
      }
      
      setMission(foundMission || null);
    }

    // No modo treino, não busca stats do servidor
    if (trainingMode) {
      setUserStats({ level: 0, currentExp: 0, gold: 0 }); // Stats fictícias para treino
      return;
    }

    const fetchUserStats = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log('MissionScreen: Verificando token:', token);
        if (!token) {
          setError('Usuário não logado. Conecte-se para ver suas stats.');
          return;
        }
        const response = await fetch(`${BASE_URL}/user-stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          console.log('MissionScreen: Stats recebidas:', data);
          setUserStats(data);
          setError(null);
        } else {
          console.error('MissionScreen: Erro ao buscar stats:', response.status);
          setError('Erro ao carregar suas stats. Tente novamente.');
        }
      } catch (err) {
        console.error('MissionScreen: Erro de rede ao buscar stats:', err);
        setError('Erro de conexão com o servidor.');
      }
    };
    fetchUserStats();
  }, [missionId, propMission, trainingMode]);

  const handleSubmit = async () => {
    await playUISound();
    if (!mission) return;

    let correct = false;
    switch (mission.type) {
      case 'math':
        correct = mission.data.answer === Number(selectedAnswer);
        break;
      case 'code':
        // Normalize both codes: remove all whitespace differences
        const normalizeCode = (code: string) => {
          return code
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n');
        };
        const userCode = normalizeCode(codeAnswer);
        const expectedCode = normalizeCode(mission.data.correctCode);
        
        console.log('🔍 Code Comparison:');
        console.log('User:', JSON.stringify(userCode));
        console.log('Expected:', JSON.stringify(expectedCode));
        
        correct = userCode === expectedCode;
        break;
      case 'logic':
        correct = mission.data.answer === selectedAnswer;
        break;
    }

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setTimeout(() => {
        if (trainingMode) {
          // Modo treino: chama onComplete sem passar itemId
          if (onComplete) onComplete();
        } else {
          // Modo normal: chama onMissionComplete com itemId
          if (onMissionComplete && itemId) {
            onMissionComplete(itemId);
          }
        }
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
              await playUISound();
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
              await playUISound();
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
            await playUISound();
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
            await playUISound();
            onClose();
          }}>
            <Text style={styles.continueButtonText}>VOLTAR AO MAPA</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.tryAgainButton} onPress={async () => {
              await playUISound();
              setShowResult(false);
              setSelectedAnswer('');
              setCodeAnswer('');
            }}>
              <Text style={styles.tryAgainText}>TENTAR NOVAMENTE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.abortButton} onPress={async () => {
              await playUISound();
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
            await playUISound();
            onClose();
          }}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

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

        {!showResult && mission && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              XP: {mission?.xp} • ₵: {mission?.gold}
            </Text>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : userStats ? (
              <Text style={styles.footerText}>
                Seu nível: {userStats.level} (XP: {userStats.currentExp}) • ₵: {userStats.gold}
              </Text>
            ) : (
              <Text style={styles.footerText}>
                Carregando stats...
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

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
    fontFamily: 'ChakraPetch-Bold',
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