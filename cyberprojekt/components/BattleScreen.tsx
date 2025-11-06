import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Enemy, PlayerStats, BattleState, BattleResult } from '../types';
import { 
  calculatePlayerMaxHP, 
  determineFirstAttacker, 
  processTurn 
} from '../services/battle';
import { useAudio } from './AudioManager';

interface BattleScreenProps {
  enemy: Enemy;
  playerStats: PlayerStats;
  playerLevel: number;
  onBattleEnd: (result: BattleResult) => void;
  onClose: () => void;
}

export default function BattleScreen({ 
  enemy, 
  playerStats, 
  playerLevel,
  onBattleEnd, 
  onClose 
}: BattleScreenProps) {
  const { playUISound } = useAudio();
  const [battle, setBattle] = useState<BattleState>(() => {
    const playerMaxHP = calculatePlayerMaxHP(playerStats);
    const firstAttacker = determineFirstAttacker(playerStats.speed, enemy.speed);
    
    return {
      player: {
        hp: playerMaxHP,
        maxHp: playerMaxHP,
        stats: playerStats,
        isDefending: false,
      },
      enemy: { ...enemy },
      turn: firstAttacker,
      log: [
        `⚔️ Batalha iniciada contra ${enemy.name}!`,
        firstAttacker === 'player' 
          ? '🏃 Você ataca primeiro!' 
          : '⚠️ Inimigo ataca primeiro!'
      ],
      isOver: false,
    };
  });

  const [turns, setTurns] = useState(0);
  const [damageDealt, setDamageDealt] = useState(0);
  const [damageTaken, setDamageTaken] = useState(0);

  const playerHPAnim = useRef(new Animated.Value(100)).current;
  const enemyHPAnim = useRef(new Animated.Value(100)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Anima barras de HP
  useEffect(() => {
    Animated.timing(playerHPAnim, {
      toValue: (battle.player.hp / battle.player.maxHp) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(enemyHPAnim, {
      toValue: (battle.enemy.hp / battle.enemy.maxHp) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [battle.player.hp, battle.enemy.hp]);

  // Animação de shake quando recebe dano
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleAction = async (action: 'attack' | 'defend' | 'flee') => {
    if (battle.isOver) return;
    await playUISound();

    const oldEnemyHP = battle.enemy.hp;
    const oldPlayerHP = battle.player.hp;

    const newBattle = processTurn(battle, action);
    
    // Calcula dano causado/recebido
    const dmgDealt = oldEnemyHP - newBattle.enemy.hp;
    const dmgTaken = oldPlayerHP - newBattle.player.hp;
    
    setDamageDealt(prev => prev + dmgDealt);
    setDamageTaken(prev => prev + dmgTaken);
    setTurns(prev => prev + 1);

    if (dmgTaken > 0) triggerShake();

    setBattle(newBattle);

    // Se batalha acabou
    if (newBattle.isOver) {
      setTimeout(() => {
        const result: BattleResult = {
          victory: newBattle.winner === 'player',
          xpGained: newBattle.winner === 'player' ? enemy.xpReward : 0,
          goldGained: newBattle.winner === 'player' ? enemy.goldReward : 0,
          damageDealt,
          damageTaken,
          turns: turns + 1,
        };
        onBattleEnd(result);
      }, 1500);
    }
  };

  const getHPColor = (percentage: number) => {
    if (percentage > 60) return '#00ff00';
    if (percentage > 30) return '#ffaa00';
    return '#ff0000';
  };

  return (
    <View style={styles.container}>
      {/* Enemy Info */}
      <View style={styles.enemySection}>
        <Text style={styles.enemyName}>{battle.enemy.name}</Text>
        <Text style={styles.enemyLevel}>Nível {battle.enemy.level}</Text>
        
        <View style={styles.hpBarContainer}>
          <Text style={styles.hpText}>
            {battle.enemy.hp} / {battle.enemy.maxHp} HP
          </Text>
          <View style={styles.hpBarBackground}>
            <Animated.View
              style={[
                styles.hpBarFill,
                {
                  width: enemyHPAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                  backgroundColor: getHPColor((battle.enemy.hp / battle.enemy.maxHp) * 100),
                },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Battle Log */}
      <ScrollView 
        style={styles.logContainer}
        contentContainerStyle={styles.logContent}
        ref={(ref) => ref?.scrollToEnd({ animated: true })}
      >
        {battle.log.map((msg, idx) => (
          <Text key={idx} style={styles.logText}>{msg}</Text>
        ))}
      </ScrollView>

      {/* Player Info */}
      <Animated.View 
        style={[
          styles.playerSection,
          { transform: [{ translateX: shakeAnim }] }
        ]}
      >
        <Text style={styles.playerName}>VOCÊ</Text>
        <Text style={styles.playerLevel}>Nível {playerLevel}</Text>
        
        <View style={styles.hpBarContainer}>
          <Text style={styles.hpText}>
            {battle.player.hp} / {battle.player.maxHp} HP
          </Text>
          <View style={styles.hpBarBackground}>
            <Animated.View
              style={[
                styles.hpBarFill,
                {
                  width: playerHPAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                  backgroundColor: getHPColor((battle.player.hp / battle.player.maxHp) * 100),
                },
              ]}
            />
          </View>
        </View>

        {/* Action Buttons */}
        {!battle.isOver && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#ff0066' }]}
              onPress={() => handleAction('attack')}
              activeOpacity={0.8}
            >
              <Text style={styles.actionIcon}>⚔️</Text>
              <Text style={styles.actionButtonText}>ATACAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#00ccff' }]}
              onPress={() => handleAction('defend')}
              activeOpacity={0.8}
            >
              <Text style={styles.actionIcon}>🛡️</Text>
              <Text style={styles.actionButtonText}>DEFENDER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#666' }]}
              onPress={() => handleAction('flee')}
              activeOpacity={0.8}
            >
              <Text style={styles.actionIcon}>💨</Text>
              <Text style={styles.actionButtonText}>FUGIR</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Close Button (aparece quando acaba) */}
        {battle.isOver && (
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: '#fcee09' }]}
            onPress={async () => {
              await playUISound();
              onClose();
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.closeButtonText}>CONTINUAR</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  enemySection: {
    backgroundColor: '#1a0000',
    borderWidth: 2,
    borderColor: '#ff0066',
    padding: 16,
    marginBottom: 20,
  },
  enemyName: {
    fontSize: 24,
    fontFamily: 'ChakraPetch-Bold',
    color: '#ff0066',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  enemyLevel: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#ff0066',
    textAlign: 'center',
    marginBottom: 12,
  },
  hpBarContainer: {
    marginTop: 8,
  },
  hpText: {
    fontSize: 12,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    marginBottom: 4,
    textAlign: 'center',
  },
  hpBarBackground: {
    height: 20,
    backgroundColor: '#222',
    borderWidth: 2,
    borderColor: '#fcee09',
    overflow: 'hidden',
  },
  hpBarFill: {
    height: '100%',
  },
  logContainer: {
    flex: 1,
    backgroundColor: '#111',
    borderWidth: 2,
    borderColor: '#fcee09',
    padding: 12,
    marginBottom: 20,
  },
  logContent: {
    paddingBottom: 10,
  },
  logText: {
    fontSize: 13,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
    marginBottom: 6,
  },
  playerSection: {
    backgroundColor: '#001a1a',
    borderWidth: 2,
    borderColor: '#00ffcc',
    padding: 16,
  },
  playerName: {
    fontSize: 24,
    fontFamily: 'ChakraPetch-Bold',
    color: '#00ffcc',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  playerLevel: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#00ffcc',
    textAlign: 'center',
    marginBottom: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'ChakraPetch-Bold',
    color: '#000',
    textTransform: 'uppercase',
  },
  closeButton: {
    marginTop: 16,
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
    textTransform: 'uppercase',
  },
});
