import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coords, Item } from '../types';
import { MissionSystem } from '../components/MissionSystem';

// ARMAZENA QUAIS MISSÕES JÁ FORAM GERADAS RECENTEMENTE
let recentlyGeneratedMissions: string[] = [];

// CONTADOR DE MISSÕES SAZONAIS SPAWNED (MÁXIMO 3)
let seasonalMissionsSpawned = 0;

export function generateRandomItems(center: Coords, count: number, currentItems: Item[]): Item[] {
  const items: Item[] = [];
  
  // MISSÕES NORMAIS: SEMPRE 6
  const maxNormalItems = 6;
  
  // CONTA QUANTAS MISSÕES NORMAIS JÁ EXISTEM
  const currentNormalItems = currentItems.filter(item => !item.id.startsWith('seasonal-'));
  const normalItemsToGenerate = Math.min(count, maxNormalItems - currentNormalItems.length);

  // VERIFICA SE HÁ EVENTO SAZONAL ATIVO
  const seasonalMissions = MissionSystem.getSeasonalMissions();
  const hasSeasonalEvent = seasonalMissions && seasonalMissions.length > 0;
  
  console.log(`🗺️ Map Generation: Normal=${normalItemsToGenerate}, SeasonalEvent=${hasSeasonalEvent}, SeasonalCount=${seasonalMissions?.length || 0}`);

  // PEGA MISSÕES DISPONÍVEIS (QUE NÃO FORAM GERADAS RECENTEMENTE)
  const allMissions = MissionSystem.getAllMissions();
  const availableMissions = allMissions.filter(mission => 
    !recentlyGeneratedMissions.includes(mission.id)
  );

  // GERA MISSÕES NORMAIS (SEMPRE 6)
  for (let i = 0; i < normalItemsToGenerate; i++) {
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

  // GERA MISSÕES SAZONAIS EXTRAS (+3 SE EVENTO ATIVO)
  if (hasSeasonalEvent && seasonalMissions) {
    // CALCULA QUANTAS MISSÕES SAZONAIS ADICIONAR (MÁXIMO 3 TOTAL)
    const seasonalToAdd = Math.min(3 - seasonalMissionsSpawned, 3);
    
    console.log(`🎃 Spawning Seasonal: ToAdd=${seasonalToAdd}, AlreadySpawned=${seasonalMissionsSpawned}`);
    
    for (let i = 0; i < seasonalToAdd; i++) {
      const offsetLat = (Math.random() - 0.5) * 0.001;
      const offsetLng = (Math.random() - 0.5) * 0.001;
      
      const randomMission = seasonalMissions[Math.floor(Math.random() * seasonalMissions.length)];
      
      console.log(`🎃 Adding seasonal mission: ${randomMission.title}`);
      
      items.push({
        id: `seasonal-${Date.now()}-${i}`,
        name: randomMission.title, // USA O TÍTULO DA MISSÃO (COM EMOJI)
        coords: {
          latitude: center.latitude + offsetLat,
          longitude: center.longitude + offsetLng,
        },
        mission: randomMission,
        createdAt: Date.now(),
        expiresAt: Date.now() + (2 * 60 * 1000) // 2 MINUTOS
      });
      
      seasonalMissionsSpawned++;
    }
  }

  console.log(`✅ Total items generated: ${items.length}`);
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
      
      // SE FOR MISSÃO SAZONAL, DECREMENTA O CONTADOR
      if (item.id.startsWith('seasonal-')) {
        seasonalMissionsSpawned = Math.max(0, seasonalMissionsSpawned - 1);
      }
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

// RESETA O CONTADOR DE MISSÕES SAZONAIS (CHAMAR QUANDO EVENTO TERMINAR)
export function resetSeasonalMissionsCounter() {
  seasonalMissionsSpawned = 0;
}