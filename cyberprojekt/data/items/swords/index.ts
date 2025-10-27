// data/items/swords/index.ts
import { GameItem } from '../types';

export const swordItems: GameItem[] = [
  // Comuns (10)
  {
    itemId: 'sword_common_1',
    name: 'Katana Básica',
    category: 'Espada',
    rarity: 'Comum',
    levelRequired: 1,
    price: 60,
    stats: { strength: 12, speed: 18, damage: 20, resistance: 0 },
    passive: 'Cortes rápidos e precisos',
    type: 'fixed'
  },
  {
    itemId: 'sword_common_2',
    name: 'Espada de Ferro',
    category: 'Espada',
    rarity: 'Comum',
    levelRequired: 1,
    price: 55,
    stats: { strength: 15, speed: 15, damage: 18, resistance: 2 },
    passive: 'Durável e confiável',
    type: 'fixed'
  },
  {
    itemId: 'sword_common_3',
    name: 'Machete Urbano',
    category: 'Espada',
    rarity: 'Comum',
    levelRequired: 2,
    price: 70,
    stats: { strength: 18, speed: 12, damage: 22, resistance: 0 },
    passive: 'Ideal para combate nas ruas',
    type: 'fixed'
  },
  {
    itemId: 'sword_common_4',
    name: 'Wakizashi',
    category: 'Espada',
    rarity: 'Comum',
    levelRequired: 2,
    price: 65,
    stats: { strength: 10, speed: 22, damage: 16, resistance: 0 },
    passive: 'Lâmina curta ágil',
    type: 'fixed'
  },
  {
    itemId: 'sword_common_5',
    name: 'Gladius Digital',
    category: 'Espada',
    rarity: 'Comum',
    levelRequired: 3,
    price: 75,
    stats: { strength: 14, speed: 16, damage: 20, resistance: 3 },
    passive: 'Espada romana modernizada',
    type: 'fixed'
  },
  {
    itemId: 'sword_common_6',
    name: 'Sabre de Choque',
    category: 'Espada',
    rarity: 'Comum',
    levelRequired: 3,
    price: 80,
    stats: { strength: 12, speed: 20, damage: 18, resistance: 0 },
    passive: 'Libera pequenas descargas elétricas',
    type: 'fixed'
  },
  {
    itemId: 'sword_common_7',
    name: 'Cimitarra Tech',
    category: 'Espada',
    rarity: 'Comum',
    levelRequired: 4,
    price: 85,
    stats: { strength: 16, speed: 18, damage: 21, resistance: 0 },
    passive: 'Lâmina curva para cortes profundos',
    type: 'fixed'
  },
  {
    itemId: 'sword_common_8',
    name: 'Dao Cyber',
    category: 'Espada',
    rarity: 'Comum',
    levelRequired: 4,
    price: 78,
    stats: { strength: 17, speed: 14, damage: 23, resistance: 2 },
    passive: 'Sabre chinês aprimorado',
    type: 'fixed'
  },
  {
    itemId: 'sword_common_9',
    name: 'Espada Laser Mk1',
    category: 'Espada',
    rarity: 'Comum',
    levelRequired: 5,
    price: 90,
    stats: { strength: 10, speed: 25, damage: 19, resistance: 0 },
    passive: 'Lâmina de luz de baixa potência',
    type: 'fixed'
  },
  {
    itemId: 'sword_common_10',
    name: 'Nodachi Iniciante',
    category: 'Espada',
    rarity: 'Comum',
    levelRequired: 5,
    price: 95,
    stats: { strength: 20, speed: 10, damage: 25, resistance: 0 },
    passive: 'Espada grande e pesada',
    type: 'fixed'
  },

  // Raras (8)
  {
    itemId: 'sword_rare_1',
    name: 'Katana Elétrica',
    category: 'Espada',
    rarity: 'Rara',
    levelRequired: 6,
    price: 200,
    stats: { strength: 20, speed: 30, damage: 35, resistance: 8 },
    passive: 'Cortes liberam descargas elétricas',
    type: 'fixed'
  },
  {
    itemId: 'sword_rare_2',
    name: 'Lâmina Vibratória',
    category: 'Espada',
    rarity: 'Rara',
    levelRequired: 7,
    price: 220,
    stats: { strength: 25, speed: 28, damage: 38, resistance: 10 },
    passive: 'Vibração ultrassônica corta armaduras',
    type: 'fixed'
  },
  {
    itemId: 'sword_rare_3',
    name: 'Sabre de Plasma',
    category: 'Espada',
    rarity: 'Rara',
    levelRequired: 8,
    price: 250,
    stats: { strength: 18, speed: 35, damage: 32, resistance: 5 },
    passive: 'Lâmina de plasma corta quase tudo',
    type: 'fixed'
  },
  {
    itemId: 'sword_rare_4',
    name: 'Espada do Dragão',
    category: 'Espada',
    rarity: 'Rara',
    levelRequired: 7,
    price: 230,
    stats: { strength: 28, speed: 25, damage: 36, resistance: 12 },
    passive: 'Ataques podem causar queimaduras',
    type: 'fixed'
  },
  {
    itemId: 'sword_rare_5',
    name: 'Katana Mono-Molecular',
    category: 'Espada',
    rarity: 'Rara',
    levelRequired: 9,
    price: 270,
    stats: { strength: 22, speed: 32, damage: 40, resistance: 8 },
    passive: 'Lâmina afiada a nível molecular',
    type: 'fixed'
  },
  {
    itemId: 'sword_rare_6',
    name: 'Zweihänder Tech',
    category: 'Espada',
    rarity: 'Rara',
    levelRequired: 8,
    price: 240,
    stats: { strength: 35, speed: 18, damage: 42, resistance: 15 },
    passive: 'Espada gigante com campo de força',
    type: 'fixed'
  },
  {
    itemId: 'sword_rare_7',
    name: 'Lâmina Fantasma',
    category: 'Espada',
    rarity: 'Rara',
    levelRequired: 9,
    price: 260,
    stats: { strength: 20, speed: 38, damage: 34, resistance: 6 },
    passive: 'Pode atacar através de objetos sólidos',
    type: 'fixed'
  },
  {
    itemId: 'sword_rare_8',
    name: 'Scimitar Nano',
    category: 'Espada',
    rarity: 'Rara',
    levelRequired: 10,
    price: 280,
    stats: { strength: 24, speed: 33, damage: 37, resistance: 10 },
    passive: 'Nanobots reparam a lâmina automaticamente',
    type: 'fixed'
  },

  // Épicas (7)
  {
    itemId: 'sword_epic_1',
    name: 'Murasama',
    category: 'Espada',
    rarity: 'Épica',
    levelRequired: 12,
    price: 500,
    stats: { strength: 35, speed: 50, damage: 55, resistance: 20 },
    passive: 'Lendária katana com lâmina vermelha',
    type: 'fixed'
  },
  {
    itemId: 'sword_epic_2',
    name: 'Excalibur Cyber',
    category: 'Espada',
    rarity: 'Épica',
    levelRequired: 13,
    price: 550,
    stats: { strength: 40, speed: 45, damage: 60, resistance: 25 },
    passive: 'Espada lendária com poder divino',
    type: 'fixed'
  },
  {
    itemId: 'sword_epic_3',
    name: 'Lâmina Quântica',
    category: 'Espada',
    rarity: 'Épica',
    levelRequired: 14,
    price: 600,
    stats: { strength: 30, speed: 55, damage: 52, resistance: 18 },
    passive: 'Existe em múltiplas dimensões simultaneamente',
    type: 'fixed'
  },
  {
    itemId: 'sword_epic_4',
    name: 'Masamune Digital',
    category: 'Espada',
    rarity: 'Épica',
    levelRequired: 13,
    price: 570,
    stats: { strength: 38, speed: 48, damage: 58, resistance: 22 },
    passive: 'Obra-prima forjada digitalmente',
    type: 'fixed'
  },
  {
    itemId: 'sword_epic_5',
    name: 'Kusanagi-no-Tsurugi',
    category: 'Espada',
    rarity: 'Épica',
    levelRequired: 15,
    price: 620,
    stats: { strength: 42, speed: 52, damage: 56, resistance: 24 },
    passive: 'Espada sagrada que controla o vento',
    type: 'fixed'
  },
  {
    itemId: 'sword_epic_6',
    name: 'Flamberge Infernal',
    category: 'Espada',
    rarity: 'Épica',
    levelRequired: 14,
    price: 590,
    stats: { strength: 45, speed: 42, damage: 62, resistance: 28 },
    passive: 'Lâmina ondulada em chamas perpétuas',
    type: 'fixed'
  },
  {
    itemId: 'sword_epic_7',
    name: 'Naginata Cyber',
    category: 'Espada',
    rarity: 'Épica',
    levelRequired: 16,
    price: 640,
    stats: { strength: 40, speed: 50, damage: 54, resistance: 26 },
    passive: 'Lança-espada com alcance estendido',
    type: 'fixed'
  },

  // Lendárias (5)
  {
    itemId: 'sword_legendary_1',
    name: 'Zangetsu',
    category: 'Espada',
    rarity: 'Lendária',
    levelRequired: 18,
    price: 1200,
    stats: { strength: 60, speed: 70, damage: 85, resistance: 35 },
    passive: 'Libera ondas de energia cortante',
    type: 'fixed'
  },
  {
    itemId: 'sword_legendary_2',
    name: 'Durandal Quantum',
    category: 'Espada',
    rarity: 'Lendária',
    levelRequired: 19,
    price: 1350,
    stats: { strength: 65, speed: 68, damage: 90, resistance: 40 },
    passive: 'Indestrutível, corta matéria escura',
    type: 'fixed'
  },
  {
    itemId: 'sword_legendary_3',
    name: 'Gram Celestial',
    category: 'Espada',
    rarity: 'Lendária',
    levelRequired: 20,
    price: 1500,
    stats: { strength: 70, speed: 65, damage: 95, resistance: 38 },
    passive: 'Espada que matou Fafnir, queima dragões',
    type: 'fixed'
  },
  {
    itemId: 'sword_legendary_4',
    name: 'Tyrfing Tech',
    category: 'Espada',
    rarity: 'Lendária',
    levelRequired: 19,
    price: 1400,
    stats: { strength: 62, speed: 72, damage: 88, resistance: 36 },
    passive: 'Nunca erra o alvo, sempre mata',
    type: 'fixed'
  },
  {
    itemId: 'sword_legendary_5',
    name: 'Ame-no-Habakiri',
    category: 'Espada',
    rarity: 'Lendária',
    levelRequired: 21,
    price: 1600,
    stats: { strength: 68, speed: 75, damage: 92, resistance: 42 },
    passive: 'Mata serpentes e dragões instantaneamente',
    type: 'fixed'
  },

  // Míticas (3)
  {
    itemId: 'sword_mythic_1',
    name: 'Yamato',
    category: 'Espada',
    rarity: 'Mítica',
    levelRequired: 22,
    price: 2500,
    stats: { strength: 85, speed: 95, damage: 120, resistance: 50 },
    passive: 'Corta o próprio espaço, abre portais dimensionais',
    type: 'fixed'
  },
  {
    itemId: 'sword_mythic_2',
    name: 'Rebellion Omega',
    category: 'Espada',
    rarity: 'Mítica',
    levelRequired: 24,
    price: 3000,
    stats: { strength: 95, speed: 90, damage: 130, resistance: 55 },
    passive: 'Absorve poder demoníaco dos inimigos',
    type: 'fixed'
  },
  {
    itemId: 'sword_mythic_3',
    name: 'Kusanagi Infinita',
    category: 'Espada',
    rarity: 'Mítica',
    levelRequired: 23,
    price: 2700,
    stats: { strength: 90, speed: 92, damage: 125, resistance: 52 },
    passive: 'Controla todos os elementos, imortal',
    type: 'fixed'
  }
];
