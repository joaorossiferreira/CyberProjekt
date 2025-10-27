// hooks/useItems.ts
import { useMemo } from 'react';
import { fixedItems, rotationExclusiveItems, allGameItems, GameItem } from '../data/items';

/**
 * Hook para gerenciar itens do jogo
 * Remove automaticamente o sufixo "(gacha)" dos nomes
 */
export const useItems = () => {
  // Remove "(gacha)" dos nomes dos itens
  const cleanItemName = (name: string): string => {
    return name.replace(/\s*\(gacha\)\s*$/i, '').trim();
  };

  // Limpa todos os itens
  const cleanItems = useMemo(() => {
    const cleanItem = (item: GameItem): GameItem => ({
      ...item,
      name: cleanItemName(item.name)
    });

    return {
      fixed: fixedItems.map(cleanItem),
      rotation: rotationExclusiveItems.map(cleanItem),
      all: allGameItems.map(cleanItem)
    };
  }, []);

  // Retorna itens por categoria
  const getItemsByCategory = (category: 'Arma' | 'Sandevistan') => {
    return cleanItems.all.filter(item => item.category === category);
  };

  // Retorna itens por raridade
  const getItemsByRarity = (rarity: string) => {
    return cleanItems.all.filter(item => item.rarity === rarity);
  };

  // Retorna itens por tipo (fixed, rotation, gacha)
  const getItemsByType = (type: 'fixed' | 'rotation' | 'gacha') => {
    return cleanItems.all.filter(item => item.type === type);
  };

  // Retorna item por ID
  const getItemById = (itemId: string) => {
    return cleanItems.all.find(item => item.itemId === itemId);
  };

  return {
    fixedItems: cleanItems.fixed,
    rotationItems: cleanItems.rotation,
    allItems: cleanItems.all,
    getItemsByCategory,
    getItemsByRarity,
    getItemsByType,
    getItemById,
    cleanItemName
  };
};
