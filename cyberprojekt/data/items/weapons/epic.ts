// data/items/weapons/epic.ts
import { GameItem } from '../types';

export const epicWeapons: GameItem[] = [
  {
    itemId: 'weapon_epic_1',
    name: 'Desert Eagle Tech',
    category: 'Arma',
    rarity: 'Épica',
    levelRequired: 10,
    price: 350,
    stats: { strength: 15, speed: 20, damage: 40, resistance: 10 },
    passive: 'Tiros causam pequenas explosões',
    type: 'fixed'
  },
  {
    itemId: 'weapon_epic_2',
    name: 'Espada Térmica',
    category: 'Arma',
    rarity: 'Épica',
    levelRequired: 11,
    price: 400,
    stats: { strength: 25, speed: 30, damage: 35, resistance: 15 },
    passive: 'Lâmina aquecida corta armaduras médias',
    type: 'fixed'
  },
  {
    itemId: 'weapon_epic_3',
    name: 'Rifle Gauss',
    category: 'Arma',
    rarity: 'Épica',
    levelRequired: 12,
    price: 450,
    stats: { strength: 18, speed: 18, damage: 50, resistance: 10 },
    passive: 'Projéteis eletromagnéticos perfurantes',
    type: 'fixed'
  },
  {
    itemId: 'weapon_epic_4',
    name: 'Lançador de Nanobots',
    category: 'Arma',
    rarity: 'Épica',
    levelRequired: 13,
    price: 420,
    stats: { strength: 12, speed: 25, damage: 38, resistance: 20 },
    passive: 'Nanobots desintegram armaduras',
    type: 'fixed'
  },
  {
    itemId: 'weapon_epic_5',
    name: 'Shotgun Quântica',
    category: 'Arma',
    rarity: 'Épica',
    levelRequired: 11,
    price: 380,
    stats: { strength: 20, speed: 15, damage: 45, resistance: 12 },
    passive: 'Tiros se dividem em múltiplos projetéis',
    type: 'fixed'
  },
  {
    itemId: 'weapon_epic_6',
    name: 'Lâminas Mantis',
    category: 'Arma',
    rarity: 'Épica',
    levelRequired: 12,
    price: 410,
    stats: { strength: 30, speed: 35, damage: 32, resistance: 8 },
    passive: 'Lâminas retráteis para ataques rápidos',
    type: 'fixed'
  },
  {
    itemId: 'weapon_epic_7',
    name: 'Canhão de Íons',
    category: 'Arma',
    rarity: 'Épica',
    levelRequired: 14,
    price: 480,
    stats: { strength: 15, speed: 12, damage: 55, resistance: 15 },
    passive: 'Disparo carregado causa dano massivo',
    type: 'fixed'
  }
];
