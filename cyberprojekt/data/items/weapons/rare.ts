// data/items/weapons/rare.ts
import { GameItem } from '../types';

export const rareWeapons: GameItem[] = [
  {
    itemId: 'weapon_rare_1',
    name: 'Pistola Plasma',
    category: 'Arma',
    rarity: 'Rara',
    levelRequired: 5,
    price: 150,
    stats: { strength: 8, speed: 15, damage: 25, resistance: 5 },
    passive: 'Disparo de energia que atravessa armaduras leves',
    type: 'fixed'
  },
  {
    itemId: 'weapon_rare_2',
    name: 'Katana Monofilamento',
    category: 'Arma',
    rarity: 'Rara',
    levelRequired: 6,
    price: 180,
    stats: { strength: 15, speed: 25, damage: 20, resistance: 0 },
    passive: 'Cortes precisos com chance de sangramento',
    type: 'fixed'
  },
  {
    itemId: 'weapon_rare_3',
    name: 'Rifle de Precisão',
    category: 'Arma',
    rarity: 'Rara',
    levelRequired: 7,
    price: 200,
    stats: { strength: 10, speed: 12, damage: 35, resistance: 0 },
    passive: 'Headshot causa dano crítico',
    type: 'fixed'
  },
  {
    itemId: 'weapon_rare_4',
    name: 'Martelo Cinético',
    category: 'Arma',
    rarity: 'Rara',
    levelRequired: 6,
    price: 175,
    stats: { strength: 25, speed: 10, damage: 28, resistance: 10 },
    passive: 'Impacto causa onda de choque',
    type: 'fixed'
  },
  {
    itemId: 'weapon_rare_5',
    name: 'SMG Inteligente',
    category: 'Arma',
    rarity: 'Rara',
    levelRequired: 8,
    price: 220,
    stats: { strength: 8, speed: 30, damage: 18, resistance: 5 },
    passive: 'Mira assistida aumenta precisão',
    type: 'fixed'
  },
  {
    itemId: 'weapon_rare_6',
    name: 'Lança-Chamas Portátil',
    category: 'Arma',
    rarity: 'Rara',
    levelRequired: 7,
    price: 195,
    stats: { strength: 12, speed: 15, damage: 22, resistance: 8 },
    passive: 'Causa dano contínuo de queimadura',
    type: 'fixed'
  },
  {
    itemId: 'weapon_rare_7',
    name: 'Arco Composto Tech',
    category: 'Arma',
    rarity: 'Rara',
    levelRequired: 6,
    price: 165,
    stats: { strength: 18, speed: 20, damage: 24, resistance: 0 },
    passive: 'Flechas explosivas',
    type: 'fixed'
  },
  {
    itemId: 'weapon_rare_8',
    name: 'Chicote Neural',
    category: 'Arma',
    rarity: 'Rara',
    levelRequired: 8,
    price: 210,
    stats: { strength: 10, speed: 28, damage: 20, resistance: 5 },
    passive: 'Desabilita implantes cibernéticos temporariamente',
    type: 'fixed'
  }
];
