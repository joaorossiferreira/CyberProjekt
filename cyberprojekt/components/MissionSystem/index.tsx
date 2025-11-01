import { allMissions } from './missions';
import { Mission } from './types';

import { easyCodeMissions } from './missions/easy/codeMission';
import { easyLogicMissions } from './missions/easy/logicMission';
import { easyMathMissions } from './missions/easy/mathMission';

import { mediumCodeMissions } from './missions/medium/codeMission';
import { mediumLogicMissions } from './missions/medium/logicMission';
import { mediumMathMissions } from './missions/medium/mathMission';

import { hardCodeMissions } from './missions/hard/codeMission';
import { hardLogicMissions } from './missions/hard/logicMission';
import { hardMathMissions } from './missions/hard/mathMission';

import { getActiveSeasonalEvent, halloweenMissions, christmasMissions } from './missions/seasonal';

export class MissionSystem {
  // Get a random mission with weighted difficulty (50% easy, 40% medium, 10% hard).
  // If `type` is provided (code|logic|math), picks from that specific type within the weighted difficulty.
  // If `difficulty` is provided explicitly, uses that difficulty (ignores weighted probability).
  static getRandomMission(difficulty?: 'easy' | 'medium' | 'hard', type?: 'code' | 'logic' | 'math'): Mission {
    // If difficulty is explicitly provided, use it directly (manual selection)
    if (difficulty) {
      if (type) {
        // Select from the specific pool
        let pool: Mission[] = [];
        if (difficulty === 'easy') {
          pool = type === 'code' ? easyCodeMissions : type === 'logic' ? easyLogicMissions : easyMathMissions;
        } else if (difficulty === 'medium') {
          pool = type === 'code' ? mediumCodeMissions : type === 'logic' ? mediumLogicMissions : mediumMathMissions;
        } else if (difficulty === 'hard') {
          pool = type === 'code' ? hardCodeMissions : type === 'logic' ? hardLogicMissions : hardMathMissions;
        }

        if (pool && pool.length > 0) {
          return pool[Math.floor(Math.random() * pool.length)];
        }
      }

      // If no type or pool not found, pick random from allMissions with that difficulty
      const availableMissions = allMissions.filter(mission => mission.difficulty === difficulty);
      if (availableMissions.length > 0) {
        return availableMissions[Math.floor(Math.random() * availableMissions.length)];
      }
    }

    // No explicit difficulty: use weighted random (50% easy, 40% medium, 10% hard)
    const rand = Math.random() * 100;
    let selectedDifficulty: 'easy' | 'medium' | 'hard';
    
    if (rand < 50) {
      selectedDifficulty = 'easy';
    } else if (rand < 90) {
      selectedDifficulty = 'medium';
    } else {
      selectedDifficulty = 'hard';
    }

    // Now pick from the selected difficulty
    if (type) {
      let pool: Mission[] = [];
      if (selectedDifficulty === 'easy') {
        pool = type === 'code' ? easyCodeMissions : type === 'logic' ? easyLogicMissions : easyMathMissions;
      } else if (selectedDifficulty === 'medium') {
        pool = type === 'code' ? mediumCodeMissions : type === 'logic' ? mediumLogicMissions : mediumMathMissions;
      } else {
        pool = type === 'code' ? hardCodeMissions : type === 'logic' ? hardLogicMissions : hardMathMissions;
      }

      if (pool && pool.length > 0) {
        return pool[Math.floor(Math.random() * pool.length)];
      }
    }

    // No type provided: pick from allMissions with the selected difficulty
    const availableMissions = allMissions.filter(mission => mission.difficulty === selectedDifficulty);
    if (availableMissions.length > 0) {
      return availableMissions[Math.floor(Math.random() * availableMissions.length)];
    }

    // Ultimate fallback: any mission
    return allMissions[Math.floor(Math.random() * allMissions.length)];
  }

  static getMissionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Mission[] {
    return allMissions.filter(mission => mission.difficulty === difficulty);
  }

  static getMissionsByDifficultyAndType(difficulty: 'easy' | 'medium' | 'hard', type: 'code' | 'logic' | 'math'): Mission[] {
    if (difficulty === 'easy') {
      return type === 'code' ? easyCodeMissions : type === 'logic' ? easyLogicMissions : easyMathMissions;
    }
    if (difficulty === 'medium') {
      return type === 'code' ? mediumCodeMissions : type === 'logic' ? mediumLogicMissions : mediumMathMissions;
    }
    return type === 'code' ? hardCodeMissions : type === 'logic' ? hardLogicMissions : hardMathMissions;
  }

  static getAllMissions(): Mission[] {
    return allMissions;
  }

  // Verifica se há evento sazonal ativo e retorna missões do evento
  static getSeasonalMissions(): Mission[] | null {
    const event = getActiveSeasonalEvent();
    if (event === 'halloween') return halloweenMissions;
    if (event === 'christmas') return christmasMissions;
    return null;
  }

  // Retorna uma missão sazonal aleatória (se evento ativo)
  static getRandomSeasonalMission(): Mission | null {
    const seasonalMissions = this.getSeasonalMissions();
    if (!seasonalMissions || seasonalMissions.length === 0) return null;
    return seasonalMissions[Math.floor(Math.random() * seasonalMissions.length)];
  }
}