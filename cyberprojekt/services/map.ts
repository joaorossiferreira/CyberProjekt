import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coords, Item } from '../types';
import { MissionSystem } from '../components/MissionSystem';

// ARMAZENA QUAIS MISSÕES JÁ FORAM GERADAS RECENTEMENTE
let recentlyGeneratedMissions: string[] = [];

export function generateRandomItems(center: Coords, count: number, currentItems: Item[]): Item[] {
  const items: Item[] = [];
  const maxItems = 6;
  const itemsToGenerate = Math.min(count, maxItems - currentItems.length);

  // PEGA MISSÕES DISPONÍVEIS (QUE NÃO FORAM GERADAS RECENTEMENTE)
  const allMissions = MissionSystem.getAllMissions();
  const availableMissions = allMissions.filter(mission => 
    !recentlyGeneratedMissions.includes(mission.id)
  );

  for (let i = 0; i < itemsToGenerate; i++) {
    const offsetLat = (Math.random() - 0.5) * 0.001;
    const offsetLng = (Math.random() - 0.5) * 0.001;
    
    // USA MISSÃO DISPONÍVEL OU QUALQUER UMA SE NÃO HOUVER
    const missionPool = availableMissions.length > 0 ? availableMissions : allMissions;
    const randomIndex = Math.floor(Math.random() * missionPool.length);
    const randomMission = missionPool[randomIndex];
    
    // ADICIONA À LISTA DE MISSÕES RECENTES
    recentlyGeneratedMissions.push(randomMission.id);
    
    // LIMITA O TAMANHO DA LISTA DE RECENTES
    if (recentlyGeneratedMissions.length > 10) {
      recentlyGeneratedMissions = recentlyGeneratedMissions.slice(-10);
    }
    
    items.push({
      id: `item-${Date.now()}-${i}`,
      name: `Brecha ${i + 1} - ${randomMission.difficulty}`,
      coords: {
        latitude: center.latitude + offsetLat,
        longitude: center.longitude + offsetLng,
      },
      mission: randomMission,
      createdAt: Date.now(),
      expiresAt: Date.now() + (2 * 60 * 1000) // 2 MINUTOS
    });
  }
  return items;
}

export function getExpiredItems(items: Item[]): Item[] {
  const now = Date.now();
  return items.filter(item => item.expiresAt && item.expiresAt <= now);
}

export function removeExpiredItems(items: Item[]): Item[] {
  const now = Date.now();
  const filtered = items.filter(item => !item.expiresAt || item.expiresAt > now);
  
  // ATUALIZA LISTA DE MISSÕES RECENTES BASEADO NAS QUE FORAM REMOVIDAS
  const expiredItems = items.filter(item => item.expiresAt && item.expiresAt <= now);
  expiredItems.forEach(item => {
    if (item.mission?.id) {
      recentlyGeneratedMissions = recentlyGeneratedMissions.filter(id => id !== item.mission!.id);
    }
  });
  
  return filtered;
}

export async function saveItems(items: Item[]) {
  await AsyncStorage.setItem('mapItems', JSON.stringify(items));
}

export async function loadItems(): Promise<Item[]> {
  const items = await AsyncStorage.getItem('mapItems');
  return items ? JSON.parse(items) : [];
}