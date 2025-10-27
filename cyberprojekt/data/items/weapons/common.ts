// data/items/weapons/common.ts
import { GameItem } from '../types';

export const commonWeapons: GameItem[] = [
  {
    itemId: 'weapon_common_1',
    name: 'Pistola Básica',
    category: 'Arma',
    rarity: 'Comum',
    levelRequired: 1,
    price: 50,
    stats: { strength: 5, speed: 10, damage: 15, resistance: 0 },
    passive: 'Disparo simples sem efeitos especiais',
    type: 'fixed'
  },
  {
    itemId: 'weapon_common_2',
    name: 'Faca de Combate',
    category: 'Arma',
    rarity: 'Comum',
    levelRequired: 1,
    price: 40,
    stats: { strength: 10, speed: 15, damage: 10, resistance: 0 },
    passive: 'Ataque corpo a corpo rápido',
    type: 'fixed'
  },
  {
    itemId: 'weapon_common_3',
    name: 'Bastão Elétrico',
    category: 'Arma',
    rarity: 'Comum',
    levelRequired: 2,
    price: 60,
    stats: { strength: 8, speed: 12, damage: 12, resistance: 0 },
    passive: 'Causa pequeno atordoamento',
    type: 'fixed'
  },
  {
    itemId: 'weapon_common_4',
    name: 'Revólver Antigo',
    category: 'Arma',
    rarity: 'Comum',
    levelRequired: 2,
    price: 55,
    stats: { strength: 6, speed: 8, damage: 18, resistance: 0 },
    passive: 'Alto dano, baixa cadência',
    type: 'fixed'
  },
  {
    itemId: 'weapon_common_5',
    name: 'Taser Portátil',
    category: 'Arma',
    rarity: 'Comum',
    levelRequired: 3,
    price: 70,
    stats: { strength: 5, speed: 20, damage: 8, resistance: 0 },
    passive: 'Paralisa por 1 segundo',
    type: 'fixed'
  },
  {
    itemId: 'weapon_common_6',
    name: 'Estilingue Reforçado',
    category: 'Arma',
    rarity: 'Comum',
    levelRequired: 1,
    price: 35,
    stats: { strength: 12, speed: 18, damage: 5, resistance: 0 },
    passive: 'Ataque à distância silencioso',
    type: 'fixed'
  },
  {
    itemId: 'weapon_common_7',
    name: 'Soco Inglês',
    category: 'Arma',
    rarity: 'Comum',
    levelRequired: 1,
    price: 45,
    stats: { strength: 15, speed: 10, damage: 12, resistance: 5 },
    passive: 'Aumenta dano de socos',
    type: 'fixed'
  },
  {
    itemId: 'weapon_common_8',
    name: 'Arco Improvisado',
    category: 'Arma',
    rarity: 'Comum',
    levelRequired: 3,
    price: 65,
    stats: { strength: 10, speed: 12, damage: 16, resistance: 0 },
    passive: 'Ataque silencioso de longa distância',
    type: 'fixed'
  },
  {
    itemId: 'weapon_common_9',
    name: 'Machado de Mão',
    category: 'Arma',
    rarity: 'Comum',
    levelRequired: 2,
    price: 50,
    stats: { strength: 14, speed: 8, damage: 14, resistance: 0 },
    passive: 'Dano pesado corpo a corpo',
    type: 'fixed'
  },
  {
    itemId: 'weapon_common_10',
    name: 'Granada de Mão',
    category: 'Arma',
    rarity: 'Comum',
    levelRequired: 4,
    price: 80,
    stats: { strength: 5, speed: 15, damage: 25, resistance: 0 },
    passive: 'Dano em área (uso único)',
    type: 'fixed'
  }
];
