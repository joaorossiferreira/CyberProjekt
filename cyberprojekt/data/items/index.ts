// data/items/index.ts
import { commonWeapons } from './weapons/common.js';
import { rareWeapons } from './weapons/rare.js';
import { epicWeapons } from './weapons/epic.js';
import { legendaryWeapons } from './weapons/legendary.js';
import { mythicWeapons } from './weapons/mythic.js';
import { sandevistanItems } from './sandevistan/index.js';
import { swordItems } from './swords/index.js';
import { implantItems } from './implants/index.js';
import { helmetItems } from './helmets/index.js';
import { armorItems } from './armors/index.js';
import { rotationItems } from './rotation/index.js';
import type { GameItem } from './types.js';

// Todos os itens fixos (aparecem na loja física)
export const fixedItems: GameItem[] = [
  ...commonWeapons,
  ...rareWeapons,
  ...epicWeapons,
  ...legendaryWeapons,
  ...mythicWeapons,
  ...sandevistanItems,
  ...swordItems,
  ...implantItems,
  ...helmetItems,
  ...armorItems
];

// Itens exclusivos da rotação
export const rotationExclusiveItems: GameItem[] = rotationItems;

// Todos os itens do jogo (para gacha)
export const allGameItems: GameItem[] = [
  ...fixedItems,
  ...rotationItems
];

// Função para sincronizar itens com o backend
export const syncItemsWithBackend = async (token: string, baseUrl: string) => {
  try {
    const response = await fetch(`${baseUrl}/items/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ items: allGameItems })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Itens sincronizados com sucesso:', data);
      return data;
    } else {
      console.error('Erro ao sincronizar itens:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Erro de rede ao sincronizar itens:', error);
    return null;
  }
};

// Exportar tipos
export type * from './types.js';
