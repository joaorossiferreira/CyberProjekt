// data/items/armors/index.ts
import { GameItem } from '../types';

export const armorItems: GameItem[] = [
  // Comuns (10)
  {
    itemId: 'armor_common_1',
    name: 'Jaqueta de Couro',
    category: 'Armadura',
    rarity: 'Comum',
    levelRequired: 1,
    price: 60,
    stats: { strength: 5, speed: 0, damage: 0, resistance: 10 },
    passive: 'Proteção básica contra cortes',
    type: 'fixed'
  },
  {
    itemId: 'armor_common_2',
    name: 'Colete Tático',
    category: 'Armadura',
    rarity: 'Comum',
    levelRequired: 1,
    price: 70,
    stats: { strength: 0, speed: 0, damage: 0, resistance: 15 },
    passive: 'Bolsos para equipamento',
    type: 'fixed'
  },
  {
    itemId: 'armor_common_3',
    name: 'Roupa Urbana Reforçada',
    category: 'Armadura',
    rarity: 'Comum',
    levelRequired: 2,
    price: 65,
    stats: { strength: 0, speed: 10, damage: 0, resistance: 8 },
    passive: 'Leve e discreta',
    type: 'fixed'
  },
  {
    itemId: 'armor_common_4',
    name: 'Uniforme Corpo',
    category: 'Armadura',
    rarity: 'Comum',
    levelRequired: 2,
    price: 75,
    stats: { strength: 8, speed: 5, damage: 0, resistance: 12 },
    passive: 'Padrão da polícia corporativa',
    type: 'fixed'
  },
  {
    itemId: 'armor_common_5',
    name: 'Camisa Balística',
    category: 'Armadura',
    rarity: 'Comum',
    levelRequired: 3,
    price: 80,
    stats: { strength: 0, speed: 0, damage: 0, resistance: 18 },
    passive: 'Kevlar discreto',
    type: 'fixed'
  },
  {
    itemId: 'armor_common_6',
    name: 'Armadura de Motoqueiro',
    category: 'Armadura',
    rarity: 'Comum',
    levelRequired: 3,
    price: 85,
    stats: { strength: 10, speed: 8, damage: 0, resistance: 15 },
    passive: 'Proteção em acidentes',
    type: 'fixed'
  },
  {
    itemId: 'armor_common_7',
    name: 'Jaqueta Blindada Leve',
    category: 'Armadura',
    rarity: 'Comum',
    levelRequired: 4,
    price: 90,
    stats: { strength: 0, speed: 12, damage: 0, resistance: 20 },
    passive: 'Placas de cerâmica finas',
    type: 'fixed'
  },
  {
    itemId: 'armor_common_8',
    name: 'Traje de Netrunner',
    category: 'Armadura',
    rarity: 'Comum',
    levelRequired: 4,
    price: 88,
    stats: { strength: 0, speed: 15, damage: 8, resistance: 10 },
    passive: 'Conectores neurais integrados',
    type: 'fixed'
  },
  {
    itemId: 'armor_common_9',
    name: 'Colete Anti-Balas Mk1',
    category: 'Armadura',
    rarity: 'Comum',
    levelRequired: 5,
    price: 95,
    stats: { strength: 0, speed: 0, damage: 0, resistance: 25 },
    passive: 'Para calibres pequenos',
    type: 'fixed'
  },
  {
    itemId: 'armor_common_10',
    name: 'Uniforme Militech Básico',
    category: 'Armadura',
    rarity: 'Comum',
    levelRequired: 5,
    price: 100,
    stats: { strength: 12, speed: 0, damage: 0, resistance: 22 },
    passive: 'Padrão de segurança corporativa',
    type: 'fixed'
  },

  // Raras (8)
  {
    itemId: 'armor_rare_1',
    name: 'Armadura Arasaka Mk2',
    category: 'Armadura',
    rarity: 'Rara',
    levelRequired: 7,
    price: 250,
    stats: { strength: 15, speed: 10, damage: 0, resistance: 35 },
    passive: 'Tecnologia japonesa avançada',
    type: 'fixed'
  },
  {
    itemId: 'armor_rare_2',
    name: 'Exoesqueleto Leve',
    category: 'Armadura',
    rarity: 'Rara',
    levelRequired: 8,
    price: 280,
    stats: { strength: 25, speed: 15, damage: 0, resistance: 30 },
    passive: 'Aumenta força física',
    type: 'fixed'
  },
  {
    itemId: 'armor_rare_3',
    name: 'Traje Stealth',
    category: 'Armadura',
    rarity: 'Rara',
    levelRequired: 8,
    price: 270,
    stats: { strength: 0, speed: 30, damage: 15, resistance: 25 },
    passive: 'Reduz ruído de movimentos',
    type: 'fixed'
  },
  {
    itemId: 'armor_rare_4',
    name: 'Colete Trauma Team',
    category: 'Armadura',
    rarity: 'Rara',
    levelRequired: 9,
    price: 290,
    stats: { strength: 10, speed: 20, damage: 0, resistance: 40 },
    passive: 'Nanomedicina integrada',
    type: 'fixed'
  },
  {
    itemId: 'armor_rare_5',
    name: 'Armadura de Samurai',
    category: 'Armadura',
    rarity: 'Rara',
    levelRequired: 9,
    price: 300,
    stats: { strength: 20, speed: 18, damage: 12, resistance: 35 },
    passive: 'Honra do guerreiro',
    type: 'fixed'
  },
  {
    itemId: 'armor_rare_6',
    name: 'Traje Anti-Explosão',
    category: 'Armadura',
    rarity: 'Rara',
    levelRequired: 10,
    price: 310,
    stats: { strength: 0, speed: 0, damage: 0, resistance: 50 },
    passive: 'Reduz 50% de dano explosivo',
    type: 'fixed'
  },
  {
    itemId: 'armor_rare_7',
    name: 'Armadura Kang Tao',
    category: 'Armadura',
    rarity: 'Rara',
    levelRequired: 10,
    price: 320,
    stats: { strength: 18, speed: 22, damage: 10, resistance: 38 },
    passive: 'Sistema de mira inteligente',
    type: 'fixed'
  },
  {
    itemId: 'armor_rare_8',
    name: 'Colete MaxTac Padrão',
    category: 'Armadura',
    rarity: 'Rara',
    levelRequired: 11,
    price: 330,
    stats: { strength: 22, speed: 15, damage: 15, resistance: 42 },
    passive: 'Usado por unidades de elite',
    type: 'fixed'
  },

  // Épicas (7)
  {
    itemId: 'armor_epic_1',
    name: 'Exoesqueleto Pesado',
    category: 'Armadura',
    rarity: 'Épica',
    levelRequired: 13,
    price: 600,
    stats: { strength: 45, speed: 20, damage: 0, resistance: 55 },
    passive: 'Servo-motores hidráulicos',
    type: 'fixed'
  },
  {
    itemId: 'armor_epic_2',
    name: 'Armadura Óptica Ativa',
    category: 'Armadura',
    rarity: 'Épica',
    levelRequired: 14,
    price: 650,
    stats: { strength: 0, speed: 50, damage: 30, resistance: 45 },
    passive: 'Camuflagem óptica parcial',
    type: 'fixed'
  },
  {
    itemId: 'armor_epic_3',
    name: 'Traje de Adam Smasher',
    category: 'Armadura',
    rarity: 'Épica',
    levelRequired: 14,
    price: 680,
    stats: { strength: 50, speed: 0, damage: 35, resistance: 60 },
    passive: 'Borg completo de combate',
    type: 'fixed'
  },
  {
    itemId: 'armor_epic_4',
    name: 'Armadura de Titânio',
    category: 'Armadura',
    rarity: 'Épica',
    levelRequired: 15,
    price: 700,
    stats: { strength: 35, speed: 25, damage: 0, resistance: 65 },
    passive: 'Liga de titânio-carbono',
    type: 'fixed'
  },
  {
    itemId: 'armor_epic_5',
    name: 'Traje Tático V',
    category: 'Armadura',
    rarity: 'Épica',
    levelRequired: 15,
    price: 720,
    stats: { strength: 30, speed: 40, damage: 35, resistance: 50 },
    passive: 'Personalizado para lendas',
    type: 'fixed'
  },
  {
    itemId: 'armor_epic_6',
    name: 'Armadura Netwatch',
    category: 'Armadura',
    rarity: 'Épica',
    levelRequired: 16,
    price: 740,
    stats: { strength: 20, speed: 45, damage: 40, resistance: 48 },
    passive: 'Firewall neural integrado',
    type: 'fixed'
  },
  {
    itemId: 'armor_epic_7',
    name: 'Colete Energético',
    category: 'Armadura',
    rarity: 'Épica',
    levelRequired: 16,
    price: 760,
    stats: { strength: 40, speed: 35, damage: 25, resistance: 55 },
    passive: 'Escudo de energia recarregável',
    type: 'fixed'
  },

  // Lendárias (5)
  {
    itemId: 'armor_legendary_1',
    name: 'Armadura Dragoon Completa',
    category: 'Armadura',
    rarity: 'Lendária',
    levelRequired: 18,
    price: 1400,
    stats: { strength: 60, speed: 50, damage: 40, resistance: 70 },
    passive: 'Borg militar de última geração',
    type: 'fixed'
  },
  {
    itemId: 'armor_legendary_2',
    name: 'Traje Thermoóptico',
    category: 'Armadura',
    rarity: 'Lendária',
    levelRequired: 19,
    price: 1500,
    stats: { strength: 30, speed: 75, damage: 55, resistance: 60 },
    passive: 'Invisibilidade completa',
    type: 'fixed'
  },
  {
    itemId: 'armor_legendary_3',
    name: 'Exoesqueleto Titan',
    category: 'Armadura',
    rarity: 'Lendária',
    levelRequired: 20,
    price: 1600,
    stats: { strength: 80, speed: 40, damage: 35, resistance: 75 },
    passive: 'Força sobre-humana',
    type: 'fixed'
  },
  {
    itemId: 'armor_legendary_4',
    name: 'Armadura de Morgan Blackhand',
    category: 'Armadura',
    rarity: 'Lendária',
    levelRequired: 19,
    price: 1550,
    stats: { strength: 55, speed: 60, damage: 50, resistance: 68 },
    passive: 'Lenda viva da guerra',
    type: 'fixed'
  },
  {
    itemId: 'armor_legendary_5',
    name: 'Traje Corpo Inteiro Cyber',
    category: 'Armadura',
    rarity: 'Lendária',
    levelRequired: 21,
    price: 1700,
    stats: { strength: 65, speed: 55, damage: 45, resistance: 72 },
    passive: 'Fusão perfeita homem-máquina',
    type: 'fixed'
  },

  // Míticas (3)
  {
    itemId: 'armor_mythic_1',
    name: 'Armadura Relic 2.0',
    category: 'Armadura',
    rarity: 'Mítica',
    levelRequired: 22,
    price: 3000,
    stats: { strength: 85, speed: 75, damage: 70, resistance: 90 },
    passive: 'Tecnologia de ressurreição',
    type: 'fixed'
  },
  {
    itemId: 'armor_mythic_2',
    name: 'Exoesqueleto Zetatech Omega',
    category: 'Armadura',
    rarity: 'Mítica',
    levelRequired: 24,
    price: 3500,
    stats: { strength: 100, speed: 60, damage: 65, resistance: 95 },
    passive: 'Força de um tanque',
    type: 'fixed'
  },
  {
    itemId: 'armor_mythic_3',
    name: 'Traje do Imperador Cyber',
    category: 'Armadura',
    rarity: 'Mítica',
    levelRequired: 23,
    price: 3200,
    stats: { strength: 80, speed: 85, damage: 75, resistance: 88 },
    passive: 'Nanotecnologia auto-reparável',
    type: 'fixed'
  }
];
