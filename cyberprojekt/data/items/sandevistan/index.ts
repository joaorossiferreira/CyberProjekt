// data/items/sandevistan/index.ts
import { GameItem } from '../types';

export const sandevistanItems: GameItem[] = [
  // Comuns
  {
    itemId: 'sand_common_1',
    name: 'Sandevistan MK1',
    category: 'Sandevistan',
    rarity: 'Comum',
    levelRequired: 3,
    price: 100,
    stats: { strength: 5, speed: 25, damage: 5, resistance: 5 },
    passive: 'Acelera percepção de tempo por 3s',
    type: 'fixed'
  },
  {
    itemId: 'sand_common_2',
    name: 'Sandevistan Básico',
    category: 'Sandevistan',
    rarity: 'Comum',
    levelRequired: 4,
    price: 120,
    stats: { strength: 8, speed: 28, damage: 8, resistance: 6 },
    passive: 'Acelera percepção de tempo por 3.5s',
    type: 'fixed'
  },
  {
    itemId: 'sand_common_3',
    name: 'Sandevistan Veloz',
    category: 'Sandevistan',
    rarity: 'Comum',
    levelRequired: 5,
    price: 140,
    stats: { strength: 10, speed: 30, damage: 10, resistance: 8 },
    passive: 'Acelera percepção de tempo por 4s',
    type: 'fixed'
  },
  {
    itemId: 'sand_common_4',
    name: 'Sandevistan Sprint',
    category: 'Sandevistan',
    rarity: 'Comum',
    levelRequired: 4,
    price: 130,
    stats: { strength: 7, speed: 32, damage: 7, resistance: 7 },
    passive: 'Aumenta velocidade de movimento durante efeito',
    type: 'fixed'
  },
  {
    itemId: 'sand_common_5',
    name: 'Sandevistan Reflexo',
    category: 'Sandevistan',
    rarity: 'Comum',
    levelRequired: 5,
    price: 150,
    stats: { strength: 9, speed: 35, damage: 9, resistance: 9 },
    passive: 'Melhora esquiva durante efeito',
    type: 'fixed'
  },
  {
    itemId: 'sand_common_6',
    name: 'Sandevistan Ágil',
    category: 'Sandevistan',
    rarity: 'Comum',
    levelRequired: 6,
    price: 160,
    stats: { strength: 11, speed: 37, damage: 11, resistance: 10 },
    passive: 'Acelera ataques corpo a corpo',
    type: 'fixed'
  },
  {
    itemId: 'sand_common_7',
    name: 'Sandevistan Rápido',
    category: 'Sandevistan',
    rarity: 'Comum',
    levelRequired: 5,
    price: 145,
    stats: { strength: 8, speed: 33, damage: 8, resistance: 8 },
    passive: 'Reduz cooldown de habilidades',
    type: 'fixed'
  },
  {
    itemId: 'sand_common_8',
    name: 'Sandevistan Flash',
    category: 'Sandevistan',
    rarity: 'Comum',
    levelRequired: 6,
    price: 170,
    stats: { strength: 12, speed: 38, damage: 12, resistance: 11 },
    passive: 'Permite dash rápido',
    type: 'fixed'
  },
  {
    itemId: 'sand_common_9',
    name: 'Sandevistan Turbo',
    category: 'Sandevistan',
    rarity: 'Comum',
    levelRequired: 7,
    price: 180,
    stats: { strength: 13, speed: 40, damage: 13, resistance: 12 },
    passive: 'Aumenta cadência de tiro',
    type: 'fixed'
  },
  {
    itemId: 'sand_common_10',
    name: 'Sandevistan Iniciante',
    category: 'Sandevistan',
    rarity: 'Comum',
    levelRequired: 3,
    price: 110,
    stats: { strength: 6, speed: 26, damage: 6, resistance: 6 },
    passive: 'Primeira ativação do combate dura 50% mais',
    type: 'fixed'
  },

  // Raras
  {
    itemId: 'sand_rare_1',
    name: 'Sandevistan MK2',
    category: 'Sandevistan',
    rarity: 'Rara',
    levelRequired: 8,
    price: 300,
    stats: { strength: 15, speed: 50, damage: 15, resistance: 15 },
    passive: 'Acelera percepção de tempo por 5s, reduz cooldown',
    type: 'fixed'
  },
  {
    itemId: 'sand_rare_2',
    name: 'Sandevistan Aprimorado',
    category: 'Sandevistan',
    rarity: 'Rara',
    levelRequired: 9,
    price: 350,
    stats: { strength: 18, speed: 55, damage: 18, resistance: 18 },
    passive: 'Slow motion mais intenso',
    type: 'fixed'
  },
  {
    itemId: 'sand_rare_3',
    name: 'Sandevistan Militar',
    category: 'Sandevistan',
    rarity: 'Rara',
    levelRequired: 10,
    price: 400,
    stats: { strength: 20, speed: 60, damage: 20, resistance: 20 },
    passive: 'Pode ser usado duas vezes seguidas',
    type: 'fixed'
  },
  {
    itemId: 'sand_rare_4',
    name: 'Sandevistan Fantasma',
    category: 'Sandevistan',
    rarity: 'Rara',
    levelRequired: 9,
    price: 370,
    stats: { strength: 17, speed: 57, damage: 17, resistance: 19 },
    passive: 'Fica invisível durante efeito',
    type: 'fixed'
  },
  {
    itemId: 'sand_rare_5',
    name: 'Sandevistan Berserker',
    category: 'Sandevistan',
    rarity: 'Rara',
    levelRequired: 10,
    price: 420,
    stats: { strength: 25, speed: 52, damage: 25, resistance: 15 },
    passive: 'Aumenta dano crítico durante efeito',
    type: 'fixed'
  },
  {
    itemId: 'sand_rare_6',
    name: 'Sandevistan Ninja',
    category: 'Sandevistan',
    rarity: 'Rara',
    levelRequired: 11,
    price: 450,
    stats: { strength: 19, speed: 65, damage: 19, resistance: 17 },
    passive: 'Passos silenciosos durante efeito',
    type: 'fixed'
  },
  {
    itemId: 'sand_rare_7',
    name: 'Sandevistan Fury',
    category: 'Sandevistan',
    rarity: 'Rara',
    levelRequired: 10,
    price: 410,
    stats: { strength: 22, speed: 58, damage: 22, resistance: 18 },
    passive: 'Cada kill durante efeito estende duração',
    type: 'fixed'
  },
  {
    itemId: 'sand_rare_8',
    name: 'Sandevistan Matrix',
    category: 'Sandevistan',
    rarity: 'Rara',
    levelRequired: 12,
    price: 480,
    stats: { strength: 21, speed: 62, damage: 21, resistance: 21 },
    passive: 'Pode esquivar de projéteis',
    type: 'fixed'
  },

  // Épicas
  {
    itemId: 'sand_epic_1',
    name: 'Sandevistan MK3',
    category: 'Sandevistan',
    rarity: 'Épica',
    levelRequired: 13,
    price: 700,
    stats: { strength: 30, speed: 80, damage: 30, resistance: 30 },
    passive: 'Slow motion extremo por 7s',
    type: 'fixed'
  },
  {
    itemId: 'sand_epic_2',
    name: 'Sandevistan Quantum',
    category: 'Sandevistan',
    rarity: 'Épica',
    levelRequired: 14,
    price: 800,
    stats: { strength: 35, speed: 90, damage: 35, resistance: 32 },
    passive: 'Teleporte curta distância durante efeito',
    type: 'fixed'
  },
  {
    itemId: 'sand_epic_3',
    name: 'Sandevistan Cyber',
    category: 'Sandevistan',
    rarity: 'Épica',
    levelRequired: 15,
    price: 900,
    stats: { strength: 38, speed: 95, damage: 38, resistance: 35 },
    passive: 'Todos os ataques são críticos durante efeito',
    type: 'fixed'
  },
  {
    itemId: 'sand_epic_4',
    name: 'Sandevistan Tempestade',
    category: 'Sandevistan',
    rarity: 'Épica',
    levelRequired: 14,
    price: 850,
    stats: { strength: 33, speed: 88, damage: 33, resistance: 33 },
    passive: 'Cria after-images que atacam inimigos',
    type: 'fixed'
  },
  {
    itemId: 'sand_epic_5',
    name: 'Sandevistan Titan',
    category: 'Sandevistan',
    rarity: 'Épica',
    levelRequired: 16,
    price: 950,
    stats: { strength: 40, speed: 85, damage: 40, resistance: 40 },
    passive: 'Não pode ser interrompido durante efeito',
    type: 'fixed'
  },
  {
    itemId: 'sand_epic_6',
    name: 'Sandevistan Assassino',
    category: 'Sandevistan',
    rarity: 'Épica',
    levelRequired: 15,
    price: 920,
    stats: { strength: 36, speed: 92, damage: 36, resistance: 31 },
    passive: 'Ataques pelas costas eliminam instantaneamente',
    type: 'fixed'
  },
  {
    itemId: 'sand_epic_7',
    name: 'Sandevistan Divino',
    category: 'Sandevistan',
    rarity: 'Épica',
    levelRequired: 17,
    price: 1000,
    stats: { strength: 42, speed: 98, damage: 42, resistance: 38 },
    passive: 'Regenera HP durante slow motion',
    type: 'fixed'
  },

  // Lendárias
  {
    itemId: 'sand_legendary_1',
    name: 'Sandevistan MK4',
    category: 'Sandevistan',
    rarity: 'Lendária',
    levelRequired: 18,
    price: 1500,
    stats: { strength: 50, speed: 120, damage: 50, resistance: 50 },
    passive: 'Slow motion de 10s, permite ações impossíveis',
    type: 'fixed'
  },
  {
    itemId: 'sand_legendary_2',
    name: 'Sandevistan Arasaka',
    category: 'Sandevistan',
    rarity: 'Lendária',
    levelRequired: 19,
    price: 1700,
    stats: { strength: 55, speed: 130, damage: 55, resistance: 55 },
    passive: 'Tecnologia corporativa de ponta, múltiplas ativações',
    type: 'fixed'
  },
  {
    itemId: 'sand_legendary_3',
    name: 'Sandevistan Militech',
    category: 'Sandevistan',
    rarity: 'Lendária',
    levelRequired: 20,
    price: 1900,
    stats: { strength: 60, speed: 140, damage: 60, resistance: 58 },
    passive: 'Versão militar com recarga ultra rápida',
    type: 'fixed'
  },
  {
    itemId: 'sand_legendary_4',
    name: 'Sandevistan Netrunner',
    category: 'Sandevistan',
    rarity: 'Lendária',
    levelRequired: 19,
    price: 1800,
    stats: { strength: 52, speed: 135, damage: 52, resistance: 54 },
    passive: 'Hackeia inimigos durante slow motion',
    type: 'fixed'
  },
  {
    itemId: 'sand_legendary_5',
    name: 'Sandevistan Cronos',
    category: 'Sandevistan',
    rarity: 'Lendária',
    levelRequired: 21,
    price: 2000,
    stats: { strength: 65, speed: 145, damage: 65, resistance: 60 },
    passive: 'Manipula tempo, pode reverter dano recebido',
    type: 'fixed'
  },

  // Míticas
  {
    itemId: 'sand_mythic_1',
    name: 'Sandevistan MK5 Omega',
    category: 'Sandevistan',
    rarity: 'Mítica',
    levelRequired: 22,
    price: 3000,
    stats: { strength: 80, speed: 180, damage: 80, resistance: 80 },
    passive: 'Controle total do tempo, pode parar completamente por 5s',
    type: 'fixed'
  },
  {
    itemId: 'sand_mythic_2',
    name: 'Sandevistan Apocalipse',
    category: 'Sandevistan',
    rarity: 'Mítica',
    levelRequired: 24,
    price: 3500,
    stats: { strength: 90, speed: 200, damage: 90, resistance: 85 },
    passive: 'Cria loop temporal, pode reviver uma vez por combate',
    type: 'fixed'
  },
  {
    itemId: 'sand_mythic_3',
    name: 'Sandevistan Infinito',
    category: 'Sandevistan',
    rarity: 'Mítica',
    levelRequired: 23,
    price: 3200,
    stats: { strength: 85, speed: 190, damage: 85, resistance: 82 },
    passive: 'Sem cooldown, pode ser usado continuamente',
    type: 'fixed'
  }
];
