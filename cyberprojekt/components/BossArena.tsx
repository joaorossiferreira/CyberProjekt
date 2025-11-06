import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAudio } from './AudioManager';
import { generateEnemy } from '../services/battle';
import { Enemy, PlayerStats } from '../types';
import BattleScreen from './BattleScreen';

interface BossArenaProps {
  playerLevel: number;
  playerStats: PlayerStats;
  onClose: () => void;
  onBattleEnd: (result: any) => void;
}

export default function BossArena({ playerLevel, playerStats, onClose, onBattleEnd }: BossArenaProps) {
  const { playUISound } = useAudio();
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const [selectedBoss, setSelectedBoss] = useState<Enemy | null>(null);
  const [showBattle, setShowBattle] = useState(false);

  // Verifica cooldown ao montar
  useEffect(() => {
    checkCooldown();
  }, []);

  // Atualiza countdown a cada segundo
  useEffect(() => {
    if (cooldownRemaining > 0) {
      const timer = setInterval(() => {
        setCooldownRemaining(prev => Math.max(0, prev - 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldownRemaining]);

  const checkCooldown = async () => {
    const lastBattle = await AsyncStorage.getItem('lastBossBattle');
    if (lastBattle) {
      const timePassed = Date.now() - parseInt(lastBattle);
      const cooldown = 5 * 1000; // 10 SEGUNDOS (TESTE) - MUDAR PARA 24 * 60 * 60 * 1000 (24h)
      if (timePassed < cooldown) {
        setCooldownRemaining(cooldown - timePassed);
      }
    }
  };

  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleSelectDifficulty = async (difficulty: 'easy' | 'medium' | 'hard') => {
    await playUISound();
    if (cooldownRemaining > 0) return;

    const boss = generateEnemy(playerLevel, difficulty, true);
    setSelectedBoss(boss);
    setShowBattle(true);
  };

  const handleBattleEnd = async (result: any) => {
    // Salva timestamp da última batalha
    await AsyncStorage.setItem('lastBossBattle', Date.now().toString());
    setCooldownRemaining(24 * 60 * 60 * 1000); // 5 SEGUNDOS (TESTE) - MUDAR PARA 24 * 60 * 60 * 1000 (24h)
    
    // Adiciona informação do boss ao resultado
    const resultWithEnemy = {
      ...result,
      enemy: selectedBoss, // PASSA O BOSS PARA O HANDLER
    };
    
    setShowBattle(false);
    setSelectedBoss(null);
    onBattleEnd(resultWithEnemy);
  };

  // Calcula níveis dos bosses
  const easyBossLevel = Math.max(1, playerLevel - 2);
  const mediumBossLevel = playerLevel;
  const hardBossLevel = playerLevel + 2;

  // Calcula chances de drop
  const getDropChance = (difficulty: string): string => {
    if (difficulty === 'easy') return '15-25%';
    if (difficulty === 'medium') return '40-60%';
    return '100%';
  };

  if (showBattle && selectedBoss) {
    return (
      <BattleScreen
        enemy={selectedBoss}
        playerStats={playerStats}
        playerLevel={playerLevel}
        onBattleEnd={handleBattleEnd}
        onClose={() => {
          setShowBattle(false);
          setSelectedBoss(null);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>BOSS ARENA</Text>
          <Text style={styles.subtitle}>Enfrente chefes poderosos</Text>
        </View>

        {/* Cooldown Display */}
        {cooldownRemaining > 0 && (
          <View style={styles.cooldownContainer}>
            <Text style={styles.cooldownTitle}>⏳ PRÓXIMA BATALHA EM:</Text>
            <Text style={styles.cooldownTime}>{formatTime(cooldownRemaining)}</Text>
          </View>
        )}

        {/* Boss Cards */}
        <View style={styles.bossGrid}>
          {/* FÁCIL */}
          <TouchableOpacity
            style={[
              styles.bossCard,
              { borderColor: '#00ff00' },
              cooldownRemaining > 0 && styles.bossCardDisabled
            ]}
            onPress={() => handleSelectDifficulty('easy')}
            disabled={cooldownRemaining > 0}
            activeOpacity={0.8}
          >
            <View style={[styles.difficultyBadge, { backgroundColor: '#00ff00' }]}>
              <Text style={styles.difficultyText}>FÁCIL</Text>
            </View>
            <Text style={styles.bossLevel}>Nível {easyBossLevel}</Text>
            <Text style={styles.bossReward}>💎 Drop: {getDropChance('easy')}</Text>
            <Text style={styles.bossDescription}>
              Boss 2 níveis abaixo{'\n'}
              Recompensa: Comum/Rara
            </Text>
          </TouchableOpacity>

          {/* MÉDIO */}
          <TouchableOpacity
            style={[
              styles.bossCard,
              { borderColor: '#ffaa00' },
              cooldownRemaining > 0 && styles.bossCardDisabled
            ]}
            onPress={() => handleSelectDifficulty('medium')}
            disabled={cooldownRemaining > 0}
            activeOpacity={0.8}
          >
            <View style={[styles.difficultyBadge, { backgroundColor: '#ffaa00' }]}>
              <Text style={styles.difficultyText}>MÉDIO</Text>
            </View>
            <Text style={styles.bossLevel}>Nível {mediumBossLevel}</Text>
            <Text style={styles.bossReward}>💎 Drop: {getDropChance('medium')}</Text>
            <Text style={styles.bossDescription}>
              Boss do seu nível{'\n'}
              Recompensa: Rara/Épica
            </Text>
          </TouchableOpacity>

          {/* DIFÍCIL */}
          <TouchableOpacity
            style={[
              styles.bossCard,
              { borderColor: '#ff0000' },
              cooldownRemaining > 0 && styles.bossCardDisabled
            ]}
            onPress={() => handleSelectDifficulty('hard')}
            disabled={cooldownRemaining > 0}
            activeOpacity={0.8}
          >
            <View style={[styles.difficultyBadge, { backgroundColor: '#ff0000' }]}>
              <Text style={styles.difficultyText}>DIFÍCIL</Text>
            </View>
            <Text style={styles.bossLevel}>Nível {hardBossLevel}</Text>
            <Text style={styles.bossReward}>💎 Drop: {getDropChance('hard')}</Text>
            <Text style={styles.bossDescription}>
              Boss 2 níveis acima{'\n'}
              Recompensa: Épica/Lendária/Mítica
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>ℹ️ INFORMAÇÕES</Text>
          <Text style={styles.infoText}>
            • Cooldown: 24 horas{'\n'}
            • Recompensas: XP, Gold e Item (com chance){'\n'}
            • Dificuldade afeta nível do boss e chance de drop{'\n'}
            • Itens dropados são do tier desbloqueado pelo seu nível
          </Text>
        </View>

        {/* Close Button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={async () => {
            await playUISound();
            onClose();
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.closeButtonText}>VOLTAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ff0066',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Cyberpunk',
    color: '#ff0066',
    letterSpacing: 3,
    textShadowColor: '#ff0066',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fff',
    marginTop: 8,
  },
  cooldownContainer: {
    backgroundColor: '#1a0000',
    borderWidth: 2,
    borderColor: '#ff0066',
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  cooldownTitle: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Bold',
    color: '#ff0066',
    marginBottom: 8,
  },
  cooldownTime: {
    fontSize: 24,
    fontFamily: 'Cyberpunk',
    color: '#fcee09',
    letterSpacing: 2,
  },
  bossGrid: {
    gap: 16,
  },
  bossCard: {
    backgroundColor: '#0a0a0a',
    borderWidth: 3,
    padding: 16,
    marginBottom: 12,
  },
  bossCardDisabled: {
    opacity: 0.4,
  },
  difficultyBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  difficultyText: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Bold',
    color: '#000',
    letterSpacing: 1,
  },
  bossLevel: {
    fontSize: 20,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  bossReward: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    marginBottom: 8,
  },
  bossDescription: {
    fontSize: 13,
    fontFamily: 'ChakraPetch-Regular',
    color: '#aaa',
    lineHeight: 20,
  },
  infoContainer: {
    backgroundColor: '#001a1a',
    borderWidth: 2,
    borderColor: '#00ccff',
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Bold',
    color: '#00ccff',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 13,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fff',
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: '#fcee09',
    padding: 16,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    fontFamily: 'Cyberpunk',
    color: '#000',
    letterSpacing: 2,
  },
});
