import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coords, Item } from '../types';

export function generateRandomItems(center: Coords, count: number, currentItems: Item[]): Item[] {
  const items: Item[] = [];
  const maxItems = 6;
  const itemsToGenerate = Math.min(count, maxItems - currentItems.length);

  for (let i = 0; i < itemsToGenerate; i++) {
    const offsetLat = (Math.random() - 0.5) * 0.001; // ~100m
    const offsetLng = (Math.random() - 0.5) * 0.001;
    items.push({
      id: `item-${Date.now()}-${i}`,
      name: `Brecha ${i + 1}`,
      coords: {
        latitude: center.latitude + offsetLat,
        longitude: center.longitude + offsetLng,
      },
    });
  }
  return items;
}

export async function saveItems(items: Item[]) {
  await AsyncStorage.setItem('mapItems', JSON.stringify(items));
}

export async function loadItems(): Promise<Item[]> {
  const items = await AsyncStorage.getItem('mapItems');
  return items ? JSON.parse(items) : [];
}