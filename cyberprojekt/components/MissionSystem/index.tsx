import { allMissions } from './missions';
import { Mission } from './types';

export class MissionSystem {
  static getRandomMission(difficulty?: 'easy' | 'medium' | 'hard'): Mission {
    let availableMissions = allMissions;
    
    if (difficulty) {
      availableMissions = allMissions.filter(mission => mission.difficulty === difficulty);
    }
    
    if (availableMissions.length === 0) {
      availableMissions = allMissions;
    }
    
    const randomIndex = Math.floor(Math.random() * availableMissions.length);
    return availableMissions[randomIndex];
  }
  
  static getMissionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Mission[] {
    return allMissions.filter(mission => mission.difficulty === difficulty);
  }
  
  static getAllMissions(): Mission[] {
    return allMissions;
  }
}