export interface Coords {
  latitude: number;
  longitude: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'math' | 'code' | 'logic' | 'puzzle';
  xp: number;
  gold: number;
  data: any;
}

export interface Item {
  id: string;
  name: string;
  icon?: string; // ÍCONE CUSTOMIZADO (enemy_easy, enemy_medium, enemy_hard, etc)
  coords: Coords;
  mission?: Mission;
  enemy?: Enemy; // NOVO: Inimigo no ponto
  createdAt?: number; // TIMESTAMP DE CRIAÇÃO
  expiresAt?: number; // TIMESTAMP DE EXPIRAÇÃO (2 MINUTOS)
}

// ⚔️ BATTLE SYSTEM TYPES

export interface PlayerStats {
  strength: number;    // Força (dano base)
  speed: number;       // Velocidade (ordem de ataque)
  damage: number;      // Inteligência (chance de crítico)
  resistance: number;  // Resistência (defesa)
}

export interface Enemy {
  id: string;
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  damage: number;
  defense: number;
  speed: number;
  xpReward: number;
  goldReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  isBoss?: boolean;
}

export interface BattleState {
  player: {
    hp: number;
    maxHp: number;
    stats: PlayerStats;
    isDefending: boolean;
  };
  enemy: Enemy;
  turn: 'player' | 'enemy';
  log: string[];
  isOver: boolean;
  winner?: 'player' | 'enemy';
}

export interface BattleResult {
  victory: boolean;
  xpGained: number;
  goldGained: number;
  itemDropped?: {
    itemId: string;
    name: string;
    rarity: string;
  };
  damageDealt: number;
  damageTaken: number;
  turns: number;
}