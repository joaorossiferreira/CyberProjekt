// data/items/implants/index.ts
import { GameItem } from '../types';

export const implantItems: GameItem[] = [
  // Comuns (10)
  {
    itemId: 'implant_common_1',
    name: 'Chip de Memória Básico',
    category: 'Implante',
    rarity: 'Comum',
    levelRequired: 1,
    price: 40,
    stats: { strength: 0, speed: 5, damage: 0, resistance: 5 },
    passive: 'Aumenta capacidade de aprendizado',
    type: 'fixed'
  },
  {
    itemId: 'implant_common_2',
    name: 'Reforço Muscular Mk1',
    category: 'Implante',
    rarity: 'Comum',
    levelRequired: 1,
    price: 45,
    stats: { strength: 8, speed: 0, damage: 3, resistance: 0 },
    passive: 'Fibras sintéticas nos músculos',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_common_3',
    name: 'Acelerador Neural',
    category: 'Implante',
    rarity: 'Comum',
    levelRequired: 2,
    price: 50,
    stats: { strength: 0, speed: 10, damage: 0, resistance: 0 },
    passive: 'Melhora tempo de reação',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_common_4',
    name: 'Derme Reforçada',
    category: 'Implante',
    rarity: 'Comum',
    levelRequired: 2,
    price: 55,
    stats: { strength: 0, speed: 0, damage: 0, resistance: 10 },
    passive: 'Pele mais resistente a danos',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_common_5',
    name: 'Estimulante Adrenal',
    category: 'Implante',
    rarity: 'Comum',
    levelRequired: 3,
    price: 60,
    stats: { strength: 5, speed: 5, damage: 5, resistance: 0 },
    passive: 'Libera adrenalina em combate',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_common_6',
    name: 'Olhos Cyber Básicos',
    category: 'Implante',
    rarity: 'Comum',
    levelRequired: 3,
    price: 65,
    stats: { strength: 0, speed: 8, damage: 8, resistance: 0 },
    passive: 'Visão aprimorada e mira assistida',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_common_7',
    name: 'Ossos Reforçados',
    category: 'Implante',
    rarity: 'Comum',
    levelRequired: 4,
    price: 70,
    stats: { strength: 6, speed: 0, damage: 0, resistance: 8 },
    passive: 'Esqueleto mais resistente',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_common_8',
    name: 'Processador de Dor',
    category: 'Implante',
    rarity: 'Comum',
    levelRequired: 4,
    price: 75,
    stats: { strength: 0, speed: 0, damage: 0, resistance: 12 },
    passive: 'Reduz sensação de dor',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_common_9',
    name: 'Nanomedicina Básica',
    category: 'Implante',
    rarity: 'Comum',
    levelRequired: 5,
    price: 80,
    stats: { strength: 0, speed: 0, damage: 0, resistance: 15 },
    passive: 'Regeneração lenta de HP',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_common_10',
    name: 'Boost de Stamina',
    category: 'Implante',
    rarity: 'Comum',
    levelRequired: 5,
    price: 85,
    stats: { strength: 4, speed: 8, damage: 0, resistance: 4 },
    passive: 'Aumenta resistência física',
    type: 'fixed',
    stackable: true
  },

  // Raras (8)
  {
    itemId: 'implant_rare_1',
    name: 'Processador Neural Mk2',
    category: 'Implante',
    rarity: 'Rara',
    levelRequired: 7,
    price: 180,
    stats: { strength: 0, speed: 20, damage: 15, resistance: 10 },
    passive: 'Processa informações em tempo real',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_rare_2',
    name: 'Coração Sintético',
    category: 'Implante',
    rarity: 'Rara',
    levelRequired: 8,
    price: 200,
    stats: { strength: 15, speed: 15, damage: 0, resistance: 20 },
    passive: 'Nunca fica cansado',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_rare_3',
    name: 'Pulmões Aprimorados',
    category: 'Implante',
    rarity: 'Rara',
    levelRequired: 8,
    price: 190,
    stats: { strength: 10, speed: 0, damage: 0, resistance: 25 },
    passive: 'Imune a gases tóxicos',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_rare_4',
    name: 'Tendões Sintéticos',
    category: 'Implante',
    rarity: 'Rara',
    levelRequired: 9,
    price: 210,
    stats: { strength: 20, speed: 18, damage: 12, resistance: 0 },
    passive: 'Saltos e movimentos sobre-humanos',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_rare_5',
    name: 'Chip de Combate',
    category: 'Implante',
    rarity: 'Rara',
    levelRequired: 9,
    price: 220,
    stats: { strength: 12, speed: 15, damage: 20, resistance: 8 },
    passive: 'Conhecimento de artes marciais instalado',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_rare_6',
    name: 'Subderme Blindada',
    category: 'Implante',
    rarity: 'Rara',
    levelRequired: 10,
    price: 230,
    stats: { strength: 0, speed: 0, damage: 0, resistance: 35 },
    passive: 'Placa de kevlar sob a pele',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_rare_7',
    name: 'Glândula de Adrenalina',
    category: 'Implante',
    rarity: 'Rara',
    levelRequired: 10,
    price: 240,
    stats: { strength: 18, speed: 22, damage: 15, resistance: 10 },
    passive: 'Adrenalina constante em combate',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_rare_8',
    name: 'Sistema Nervoso Tech',
    category: 'Implante',
    rarity: 'Rara',
    levelRequired: 11,
    price: 250,
    stats: { strength: 0, speed: 30, damage: 18, resistance: 12 },
    passive: 'Reflexos sobre-humanos',
    type: 'fixed',
    stackable: true
  },

  // Épicas (7)
  {
    itemId: 'implant_epic_1',
    name: 'Cérebro Quântico',
    category: 'Implante',
    rarity: 'Épica',
    levelRequired: 13,
    price: 450,
    stats: { strength: 0, speed: 40, damage: 35, resistance: 25 },
    passive: 'Processa probabilidades futuras',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_epic_2',
    name: 'Nanobots Militares',
    category: 'Implante',
    rarity: 'Épica',
    levelRequired: 14,
    price: 500,
    stats: { strength: 25, speed: 0, damage: 0, resistance: 50 },
    passive: 'Regeneração rápida de ferimentos',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_epic_3',
    name: 'Esqueleto de Titânio',
    category: 'Implante',
    rarity: 'Épica',
    levelRequired: 14,
    price: 480,
    stats: { strength: 35, speed: 0, damage: 20, resistance: 40 },
    passive: 'Ossos indestrutíveis',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_epic_4',
    name: 'Sangue Sintético',
    category: 'Implante',
    rarity: 'Épica',
    levelRequired: 15,
    price: 520,
    stats: { strength: 30, speed: 25, damage: 0, resistance: 35 },
    passive: 'Imune a venenos e doenças',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_epic_5',
    name: 'Olhos Kiroshi Mk3',
    category: 'Implante',
    rarity: 'Épica',
    levelRequired: 15,
    price: 540,
    stats: { strength: 0, speed: 35, damage: 40, resistance: 15 },
    passive: 'Visão térmica, raio-x e zoom 20x',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_epic_6',
    name: 'Reactor de Energia',
    category: 'Implante',
    rarity: 'Épica',
    levelRequired: 16,
    price: 560,
    stats: { strength: 40, speed: 30, damage: 30, resistance: 30 },
    passive: 'Energia ilimitada para implantes',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_epic_7',
    name: 'Módulo de Hacking',
    category: 'Implante',
    rarity: 'Épica',
    levelRequired: 16,
    price: 580,
    stats: { strength: 0, speed: 45, damage: 38, resistance: 20 },
    passive: 'Hackeia implantes e dispositivos',
    type: 'fixed',
    stackable: true
  },

  // Lendárias (5)
  {
    itemId: 'implant_legendary_1',
    name: 'Projeto Cyber-Adam',
    category: 'Implante',
    rarity: 'Lendária',
    levelRequired: 18,
    price: 1000,
    stats: { strength: 50, speed: 50, damage: 50, resistance: 50 },
    passive: 'Projeto secreto de supersoldado',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_legendary_2',
    name: 'Nanomáquinas Armstrong',
    category: 'Implante',
    rarity: 'Lendária',
    levelRequired: 19,
    price: 1100,
    stats: { strength: 70, speed: 0, damage: 40, resistance: 60 },
    passive: 'Endurecem em resposta a trauma físico',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_legendary_3',
    name: 'Sistema Nervoso Raiden',
    category: 'Implante',
    rarity: 'Lendária',
    levelRequired: 20,
    price: 1200,
    stats: { strength: 45, speed: 75, damage: 55, resistance: 35 },
    passive: 'Reflexos além da compreensão humana',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_legendary_4',
    name: 'Pele Líquida T-1000',
    category: 'Implante',
    rarity: 'Lendária',
    levelRequired: 19,
    price: 1150,
    stats: { strength: 0, speed: 60, damage: 0, resistance: 80 },
    passive: 'Regenera de qualquer ferimento',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_legendary_5',
    name: 'Cérebro Cyber Completo',
    category: 'Implante',
    rarity: 'Lendária',
    levelRequired: 21,
    price: 1300,
    stats: { strength: 0, speed: 80, damage: 70, resistance: 40 },
    passive: 'QI 300, memória perfeita, multitasking',
    type: 'fixed',
    stackable: true
  },

  // Míticas (3)
  {
    itemId: 'implant_mythic_1',
    name: 'Projeto Deus Ex',
    category: 'Implante',
    rarity: 'Mítica',
    levelRequired: 22,
    price: 2200,
    stats: { strength: 80, speed: 80, damage: 80, resistance: 80 },
    passive: 'Transforma humano em semi-deus',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_mythic_2',
    name: 'Nanobots Infinity',
    category: 'Implante',
    rarity: 'Mítica',
    levelRequired: 24,
    price: 2600,
    stats: { strength: 70, speed: 70, damage: 70, resistance: 100 },
    passive: 'Imortalidade, regeneração instantânea',
    type: 'fixed',
    stackable: true
  },
  {
    itemId: 'implant_mythic_3',
    name: 'Singularidade Neural',
    category: 'Implante',
    rarity: 'Mítica',
    levelRequired: 23,
    price: 2400,
    stats: { strength: 60, speed: 100, damage: 90, resistance: 70 },
    passive: 'Conecta a mente com a matrix universal',
    type: 'fixed',
    stackable: true
  }
];
