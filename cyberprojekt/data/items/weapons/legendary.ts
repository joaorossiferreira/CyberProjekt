// data/items/weapons/legendary.ts
import { GameItem } from '../types';

export const legendaryWeapons: GameItem[] = [
  {
    itemId: 'weapon_legendary_1',
    name: 'Widow Maker',
    category: 'Arma',
    rarity: 'Lendária',
    levelRequired: 15,
    price: 800,
    stats: { strength: 25, speed: 35, damage: 60, resistance: 20 },
    passive: 'Tiros rastreiam alvos através de paredes',
    type: 'fixed'
  },
  {
    itemId: 'weapon_legendary_2',
    name: 'Mjolnir Tech',
    category: 'Arma',
    rarity: 'Lendária',
    levelRequired: 16,
    price: 900,
    stats: { strength: 45, speed: 20, damage: 70, resistance: 30 },
    passive: 'Impacto libera descarga elétrica em área',
    type: 'fixed'
  },
  {
    itemId: 'weapon_legendary_3',
    name: 'Erebus Sniper',
    category: 'Arma',
    rarity: 'Lendária',
    levelRequired: 17,
    price: 950,
    stats: { strength: 20, speed: 25, damage: 85, resistance: 15 },
    passive: 'Headshots eliminam instantaneamente inimigos comuns',
    type: 'fixed'
  },
  {
    itemId: 'weapon_legendary_4',
    name: 'Excalibur Plasma',
    category: 'Arma',
    rarity: 'Lendária',
    levelRequired: 18,
    price: 1000,
    stats: { strength: 35, speed: 40, damage: 65, resistance: 25 },
    passive: 'Lâmina de plasma atravessa múltiplos inimigos',
    type: 'fixed'
  },
  {
    itemId: 'weapon_legendary_5',
    name: 'Hellfire Launcher',
    category: 'Arma',
    rarity: 'Lendária',
    levelRequired: 19,
    price: 1100,
    stats: { strength: 30, speed: 18, damage: 80, resistance: 28 },
    passive: 'Mísseis teleguiados com rastro de fogo',
    type: 'fixed'
  }
];
