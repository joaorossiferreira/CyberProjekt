// data/items/types.ts

export interface ItemStats {
  strength: number;
  speed: number;
  damage: number;
  resistance: number;
}

export interface GameItem {
  itemId: string;
  name: string;
  category: 'Arma' | 'Sandevistan' | 'Espada' | 'Implante' | 'Cabeça' | 'Armadura';
  rarity: 'Comum' | 'Rara' | 'Épica' | 'Lendária' | 'Mítica';
  levelRequired: number;
  price: number;
  stats: ItemStats;
  passive: string;
  type: 'fixed' | 'rotation' | 'gacha';
}

export type ItemCategory = 'weapons' | 'swords' | 'sandevistan' | 'implants' | 'helmets' | 'armors' | 'rotation';
