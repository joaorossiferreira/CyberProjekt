// data/items/weapons/mythic.ts
import { GameItem } from '../types';

export const mythicWeapons: GameItem[] = [
  {
    itemId: 'weapon_mythic_1',
    name: 'Ragnarok',
    category: 'Arma',
    rarity: 'Mítica',
    levelRequired: 20,
    price: 2000,
    stats: { strength: 50, speed: 45, damage: 100, resistance: 40 },
    passive: 'Cada kill regenera HP e aumenta dano temporariamente',
    type: 'fixed'
  },
  {
    itemId: 'weapon_mythic_2',
    name: 'Supernova Cannon',
    category: 'Arma',
    rarity: 'Mítica',
    levelRequired: 22,
    price: 2500,
    stats: { strength: 40, speed: 30, damage: 120, resistance: 35 },
    passive: 'Disparo carregado cria buraco negro temporário',
    type: 'fixed'
  },
  {
    itemId: 'weapon_mythic_3',
    name: 'Void Blade',
    category: 'Arma',
    rarity: 'Mítica',
    levelRequired: 21,
    price: 2200,
    stats: { strength: 60, speed: 55, damage: 95, resistance: 30 },
    passive: 'Cortes abrem portais dimensionais que causam dano adicional',
    type: 'fixed'
  }
];
