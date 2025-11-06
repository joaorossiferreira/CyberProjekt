import { Enemy, PlayerStats, BattleState } from '../types';

// 🎯 Gera nome aleatório para inimigos
const ENEMY_NAMES = [
  'Cyber Thug', 'Rogue Netrunner', 'Corp Guard', 'Street Samurai',
  'Techno Scavenger', 'Data Pirate', 'Neon Gangster', 'Chrome Mercenary',
  'Digital Phantom', 'AI Construct', 'Augmented Bouncer', 'Code Reaper'
];

// 🎯 Determina tier de item desbloqueado baseado no nível
export function getUnlockedTier(playerLevel: number): string {
  if (playerLevel >= 20) return 'Mítica';
  if (playerLevel >= 17) return 'Lendária';
  if (playerLevel >= 10) return 'Épica';
  if (playerLevel >= 5) return 'Rara';
  return 'Comum';
}

// 🎯 Gera inimigo baseado no nível do jogador
export function generateEnemy(
  playerLevel: number, 
  difficulty: 'easy' | 'medium' | 'hard',
  isBoss: boolean = false
): Enemy {
  // Fórmula de nível do inimigo
  let enemyLevel: number;
  if (isBoss) {
    // Boss Arena
    if (difficulty === 'easy') enemyLevel = Math.max(1, playerLevel - 2);
    else if (difficulty === 'medium') enemyLevel = playerLevel;
    else enemyLevel = playerLevel + 2;
  } else {
    // Inimigos do mapa
    if (difficulty === 'easy') enemyLevel = Math.max(1, playerLevel - 4);
    else if (difficulty === 'medium') enemyLevel = Math.max(2, playerLevel - 2);
    else enemyLevel = Math.max(3, playerLevel - 1);
  }

  // Stats do inimigo
  const hp = enemyLevel * 50 + 100;
  const damage = enemyLevel * 10 + 20;
  const defense = enemyLevel * 5;
  const speed = enemyLevel * 3 + 10;

  // Recompensas
  const xpReward = enemyLevel * 25 + (isBoss ? 100 : 50);
  const goldReward = enemyLevel * 15 + (isBoss ? 75 : 30);

  // Nome aleatório
  const name = isBoss 
    ? `${ENEMY_NAMES[Math.floor(Math.random() * ENEMY_NAMES.length)]} Boss`
    : ENEMY_NAMES[Math.floor(Math.random() * ENEMY_NAMES.length)];

  return {
    id: `enemy_${Date.now()}_${Math.random()}`,
    name,
    level: enemyLevel,
    hp,
    maxHp: hp,
    damage,
    defense,
    speed,
    xpReward,
    goldReward,
    difficulty,
    isBoss,
  };
}

// 🎯 Calcula HP máximo do jogador baseado nos stats
export function calculatePlayerMaxHP(stats: PlayerStats): number {
  return 100 + (stats.resistance * 10);
}

// 🎯 Determina quem ataca primeiro
export function determineFirstAttacker(playerSpeed: number, enemySpeed: number): 'player' | 'enemy' {
  if (playerSpeed > enemySpeed) return 'player';
  if (enemySpeed > playerSpeed) return 'enemy';
  return Math.random() < 0.5 ? 'player' : 'enemy';
}

// 🎯 Verifica se deu crítico (baseado em Inteligência)
export function checkCritical(intelligence: number): boolean {
  // Fórmula: Inteligência / 5 = % de crítico (máximo 50%)
  // Exemplo: Int 100 = 20%, Int 150 = 30%, Int 250 = 50%
  const critChance = Math.min(intelligence / 5, 50);
  return Math.random() * 100 < critChance;
}

// 🎯 Calcula dano de ataque
export function calculateDamage(
  attackerStrength: number,
  defenderDefense: number,
  isCritical: boolean = false
): number {
  const baseDamage = attackerStrength;
  const reducedDamage = Math.max(1, baseDamage - Math.floor(defenderDefense / 2));
  return isCritical ? reducedDamage * 2 : reducedDamage;
}

// 🎯 Processa um turno de ataque
export function processTurn(
  state: BattleState,
  action: 'attack' | 'defend' | 'flee'
): BattleState {
  const newState = { ...state, log: [...state.log] };

  if (action === 'flee') {
    const fleeSuccess = Math.random() < 0.7;
    if (fleeSuccess) {
      newState.log.push('💨 Você fugiu da batalha!');
      newState.isOver = true;
      newState.winner = 'enemy';
    } else {
      newState.log.push('❌ Fuga falhou! O inimigo atacou!');
      // Inimigo ataca
      const enemyDamage = calculateDamage(state.enemy.damage, state.player.stats.resistance);
      newState.player.hp = Math.max(0, state.player.hp - enemyDamage);
      newState.log.push(`⚔️ ${state.enemy.name} causou ${enemyDamage} de dano!`);
      
      if (newState.player.hp <= 0) {
        newState.isOver = true;
        newState.winner = 'enemy';
        newState.log.push('💀 Você foi derrotado!');
      }
    }
    return newState;
  }

  if (action === 'defend') {
    newState.player.isDefending = true;
    newState.log.push('🛡️ Você está defendendo! (+50% Resistência)');
  }

  // Determina ordem de ataque
  const playerGoesFirst = state.turn === 'player';

  if (playerGoesFirst && action === 'attack') {
    // Jogador ataca
    const isCrit = checkCritical(state.player.stats.damage);
    const playerDamage = calculateDamage(state.player.stats.strength, state.enemy.defense, isCrit);
    newState.enemy.hp = Math.max(0, state.enemy.hp - playerDamage);
    newState.log.push(
      isCrit 
        ? `💥 CRÍTICO! Você causou ${playerDamage} de dano!`
        : `⚔️ Você causou ${playerDamage} de dano!`
    );

    if (newState.enemy.hp <= 0) {
      newState.isOver = true;
      newState.winner = 'player';
      newState.log.push('🏆 Vitória! Inimigo derrotado!');
      return newState;
    }
  }

  // Inimigo ataca
  const defenseBonus = newState.player.isDefending ? state.player.stats.resistance * 0.5 : 0;
  const enemyDamage = calculateDamage(
    state.enemy.damage, 
    state.player.stats.resistance + defenseBonus
  );
  newState.player.hp = Math.max(0, state.player.hp - enemyDamage);
  newState.log.push(`⚔️ ${state.enemy.name} causou ${enemyDamage} de dano!`);
  newState.player.isDefending = false; // Reset defesa

  if (newState.player.hp <= 0) {
    newState.isOver = true;
    newState.winner = 'enemy';
    newState.log.push('💀 Você foi derrotado!');
    return newState;
  }

  // Se jogador foi segundo, ataca agora
  if (!playerGoesFirst && action === 'attack') {
    const isCrit = checkCritical(state.player.stats.damage);
    const playerDamage = calculateDamage(state.player.stats.strength, state.enemy.defense, isCrit);
    newState.enemy.hp = Math.max(0, state.enemy.hp - playerDamage);
    newState.log.push(
      isCrit 
        ? `💥 CRÍTICO! Você causou ${playerDamage} de dano!`
        : `⚔️ Você causou ${playerDamage} de dano!`
    );

    if (newState.enemy.hp <= 0) {
      newState.isOver = true;
      newState.winner = 'player';
      newState.log.push('🏆 Vitória! Inimigo derrotado!');
    }
  }

  return newState;
}

// 🎯 Calcula chance de drop baseado no tier e dificuldade do boss
export function calculateDropChance(
  playerLevel: number,
  bossDifficulty: 'easy' | 'medium' | 'hard'
): { tier: string; chance: number } {
  const unlockedTier = getUnlockedTier(playerLevel);
  
  if (bossDifficulty === 'easy') {
    return { tier: unlockedTier, chance: playerLevel >= 20 ? 25 : playerLevel >= 17 ? 20 : 15 };
  } else if (bossDifficulty === 'medium') {
    return { tier: unlockedTier, chance: playerLevel >= 20 ? 60 : playerLevel >= 17 ? 50 : 40 };
  } else {
    return { tier: unlockedTier, chance: 100 };
  }
}
