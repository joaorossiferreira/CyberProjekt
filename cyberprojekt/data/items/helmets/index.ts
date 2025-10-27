// data/items/helmets/index.ts
import { GameItem } from '../types';

export const helmetItems: GameItem[] = [
  // Comuns (10)
  {
    itemId: 'helmet_common_1',
    name: 'Capacete de Motoqueiro',
    category: 'Cabeça',
    rarity: 'Comum',
    levelRequired: 1,
    price: 50,
    stats: { strength: 0, speed: 0, damage: 0, resistance: 10 },
    passive: 'Proteção básica para a cabeça',
    type: 'fixed'
  },
  {
    itemId: 'helmet_common_2',
    name: 'Boné Tech',
    category: 'Cabeça',
    rarity: 'Comum',
    levelRequired: 1,
    price: 45,
    stats: { strength: 0, speed: 8, damage: 5, resistance: 3 },
    passive: 'LED integrado para visão noturna',
    type: 'fixed'
  },
  {
    itemId: 'helmet_common_3',
    name: 'Bandana Cyber',
    category: 'Cabeça',
    rarity: 'Comum',
    levelRequired: 2,
    price: 55,
    stats: { strength: 5, speed: 5, damage: 8, resistance: 0 },
    passive: 'Aumento de foco em combate',
    type: 'fixed'
  },
  {
    itemId: 'helmet_common_4',
    name: 'Óculos de Proteção',
    category: 'Cabeça',
    rarity: 'Comum',
    levelRequired: 2,
    price: 60,
    stats: { strength: 0, speed: 0, damage: 12, resistance: 5 },
    passive: 'Protege contra clarões e poeira',
    type: 'fixed'
  },
  {
    itemId: 'helmet_common_5',
    name: 'Máscara Simples',
    category: 'Cabeça',
    rarity: 'Comum',
    levelRequired: 3,
    price: 65,
    stats: { strength: 0, speed: 0, damage: 0, resistance: 15 },
    passive: 'Filtro de ar básico',
    type: 'fixed'
  },
  {
    itemId: 'helmet_common_6',
    name: 'Capacete Tático Mk1',
    category: 'Cabeça',
    rarity: 'Comum',
    levelRequired: 3,
    price: 70,
    stats: { strength: 0, speed: 0, damage: 10, resistance: 12 },
    passive: 'Comunicação de rádio integrada',
    type: 'fixed'
  },
  {
    itemId: 'helmet_common_7',
    name: 'Viseira HUD Básica',
    category: 'Cabeça',
    rarity: 'Comum',
    levelRequired: 4,
    price: 75,
    stats: { strength: 0, speed: 10, damage: 8, resistance: 0 },
    passive: 'Display de informações básicas',
    type: 'fixed'
  },
  {
    itemId: 'helmet_common_8',
    name: 'Capuz Urbano',
    category: 'Cabeça',
    rarity: 'Comum',
    levelRequired: 4,
    price: 68,
    stats: { strength: 0, speed: 12, damage: 6, resistance: 8 },
    passive: 'Mantém identidade oculta',
    type: 'fixed'
  },
  {
    itemId: 'helmet_common_9',
    name: 'Tiara Sensorial',
    category: 'Cabeça',
    rarity: 'Comum',
    levelRequired: 5,
    price: 80,
    stats: { strength: 0, speed: 15, damage: 10, resistance: 5 },
    passive: 'Detecta movimentos ao redor',
    type: 'fixed'
  },
  {
    itemId: 'helmet_common_10',
    name: 'Elmo de Kevlar',
    category: 'Cabeça',
    rarity: 'Comum',
    levelRequired: 5,
    price: 85,
    stats: { strength: 0, speed: 0, damage: 0, resistance: 18 },
    passive: 'Proteção balística básica',
    type: 'fixed'
  },

  // Raras (8)
  {
    itemId: 'helmet_rare_1',
    name: 'Capacete Arasaka Mk2',
    category: 'Cabeça',
    rarity: 'Rara',
    levelRequired: 7,
    price: 200,
    stats: { strength: 0, speed: 15, damage: 20, resistance: 25 },
    passive: 'Análise tática em tempo real',
    type: 'fixed'
  },
  {
    itemId: 'helmet_rare_2',
    name: 'Máscara de Samurai',
    category: 'Cabeça',
    rarity: 'Rara',
    levelRequired: 8,
    price: 220,
    stats: { strength: 12, speed: 0, damage: 25, resistance: 20 },
    passive: 'Intimida inimigos próximos',
    type: 'fixed'
  },
  {
    itemId: 'helmet_rare_3',
    name: 'Viseira Térmica',
    category: 'Cabeça',
    rarity: 'Rara',
    levelRequired: 8,
    price: 210,
    stats: { strength: 0, speed: 20, damage: 28, resistance: 10 },
    passive: 'Visão térmica avançada',
    type: 'fixed'
  },
  {
    itemId: 'helmet_rare_4',
    name: 'Capacete Militech',
    category: 'Cabeça',
    rarity: 'Rara',
    levelRequired: 9,
    price: 230,
    stats: { strength: 0, speed: 10, damage: 22, resistance: 30 },
    passive: 'Sistema de comunicação criptografado',
    type: 'fixed'
  },
  {
    itemId: 'helmet_rare_5',
    name: 'Máscara Anti-Gas',
    category: 'Cabeça',
    rarity: 'Rara',
    levelRequired: 9,
    price: 215,
    stats: { strength: 0, speed: 0, damage: 0, resistance: 40 },
    passive: 'Imunidade total a toxinas aéreas',
    type: 'fixed'
  },
  {
    itemId: 'helmet_rare_6',
    name: 'HUD Tático V2',
    category: 'Cabeça',
    rarity: 'Rara',
    levelRequired: 10,
    price: 240,
    stats: { strength: 0, speed: 25, damage: 30, resistance: 15 },
    passive: 'Marcação automática de alvos',
    type: 'fixed'
  },
  {
    itemId: 'helmet_rare_7',
    name: 'Capacete Netrunner',
    category: 'Cabeça',
    rarity: 'Rara',
    levelRequired: 10,
    price: 250,
    stats: { strength: 0, speed: 30, damage: 25, resistance: 18 },
    passive: 'Interface neural para hacking',
    type: 'fixed'
  },
  {
    itemId: 'helmet_rare_8',
    name: 'Elmo Blindado',
    category: 'Cabeça',
    rarity: 'Rara',
    levelRequired: 11,
    price: 260,
    stats: { strength: 0, speed: 0, damage: 15, resistance: 45 },
    passive: 'Blindagem de titânio',
    type: 'fixed'
  },

  // Épicas (7)
  {
    itemId: 'helmet_epic_1',
    name: 'Máscara Psico',
    category: 'Cabeça',
    rarity: 'Épica',
    levelRequired: 13,
    price: 500,
    stats: { strength: 20, speed: 25, damage: 45, resistance: 30 },
    passive: 'Causa medo em inimigos fracos',
    type: 'fixed'
  },
  {
    itemId: 'helmet_epic_2',
    name: 'Capacete Trauma Team',
    category: 'Cabeça',
    rarity: 'Épica',
    levelRequired: 14,
    price: 550,
    stats: { strength: 0, speed: 35, damage: 40, resistance: 40 },
    passive: 'Monitoramento vital constante',
    type: 'fixed'
  },
  {
    itemId: 'helmet_epic_3',
    name: 'Viseira Quântica',
    category: 'Cabeça',
    rarity: 'Épica',
    levelRequired: 14,
    price: 520,
    stats: { strength: 0, speed: 40, damage: 50, resistance: 25 },
    passive: 'Vê através de paredes',
    type: 'fixed'
  },
  {
    itemId: 'helmet_epic_4',
    name: 'Máscara de Johnny Silverhand',
    category: 'Cabeça',
    rarity: 'Épica',
    levelRequired: 15,
    price: 580,
    stats: { strength: 30, speed: 30, damage: 35, resistance: 35 },
    passive: 'Aura de rebeldia aumenta carisma',
    type: 'fixed'
  },
  {
    itemId: 'helmet_epic_5',
    name: 'Elmo de Adam Smasher',
    category: 'Cabeça',
    rarity: 'Épica',
    levelRequired: 15,
    price: 600,
    stats: { strength: 25, speed: 0, damage: 48, resistance: 55 },
    passive: 'Sistema de mira assistida por IA',
    type: 'fixed'
  },
  {
    itemId: 'helmet_epic_6',
    name: 'Capacete Kang Tao',
    category: 'Cabeça',
    rarity: 'Épica',
    levelRequired: 16,
    price: 560,
    stats: { strength: 0, speed: 45, damage: 42, resistance: 38 },
    passive: 'Smart targeting system',
    type: 'fixed'
  },
  {
    itemId: 'helmet_epic_7',
    name: 'Máscara Oni Cibernética',
    category: 'Cabeça',
    rarity: 'Épica',
    levelRequired: 16,
    price: 590,
    stats: { strength: 35, speed: 35, damage: 40, resistance: 30 },
    passive: 'Espírito do demônio aumenta força',
    type: 'fixed'
  },

  // Lendárias (5)
  {
    itemId: 'helmet_legendary_1',
    name: 'Capacete Dragoon',
    category: 'Cabeça',
    rarity: 'Lendária',
    levelRequired: 18,
    price: 1200,
    stats: { strength: 40, speed: 50, damage: 60, resistance: 60 },
    passive: 'Sistema de combate militar avançado',
    type: 'fixed'
  },
  {
    itemId: 'helmet_legendary_2',
    name: 'Máscara V Exclusiva',
    category: 'Cabeça',
    rarity: 'Lendária',
    levelRequired: 19,
    price: 1300,
    stats: { strength: 50, speed: 60, damage: 55, resistance: 50 },
    passive: 'Lenda de Night City',
    type: 'fixed'
  },
  {
    itemId: 'helmet_legendary_3',
    name: 'Elmo MaxTac',
    category: 'Cabeça',
    rarity: 'Lendária',
    levelRequired: 20,
    price: 1400,
    stats: { strength: 35, speed: 45, damage: 70, resistance: 65 },
    passive: 'Detecção de cyberpsicose',
    type: 'fixed'
  },
  {
    itemId: 'helmet_legendary_4',
    name: 'Viseira Alt Cunningham',
    category: 'Cabeça',
    rarity: 'Lendária',
    levelRequired: 19,
    price: 1350,
    stats: { strength: 0, speed: 75, damage: 68, resistance: 45 },
    passive: 'Interface direta com a net',
    type: 'fixed'
  },
  {
    itemId: 'helmet_legendary_5',
    name: 'Capacete Morgan Blackhand',
    category: 'Cabeça',
    rarity: 'Lendária',
    levelRequired: 21,
    price: 1500,
    stats: { strength: 55, speed: 55, damage: 65, resistance: 55 },
    passive: 'Lenda da guerra corporativa',
    type: 'fixed'
  },

  // Míticas (3)
  {
    itemId: 'helmet_mythic_1',
    name: 'Máscara do Bartmoss',
    category: 'Cabeça',
    rarity: 'Mítica',
    levelRequired: 22,
    price: 2500,
    stats: { strength: 0, speed: 100, damage: 90, resistance: 70 },
    passive: 'Maior netrunner da história',
    type: 'fixed'
  },
  {
    itemId: 'helmet_mythic_2',
    name: 'Elmo Zetatech Infinito',
    category: 'Cabeça',
    rarity: 'Mítica',
    levelRequired: 24,
    price: 3000,
    stats: { strength: 70, speed: 80, damage: 85, resistance: 90 },
    passive: 'Tecnologia além do tempo',
    type: 'fixed'
  },
  {
    itemId: 'helmet_mythic_3',
    name: 'Coroa do Imperador Cyber',
    category: 'Cabeça',
    rarity: 'Mítica',
    levelRequired: 23,
    price: 2700,
    stats: { strength: 80, speed: 75, damage: 80, resistance: 85 },
    passive: 'Controla todas as máquinas ao redor',
    type: 'fixed'
  }
];
