import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coords, Item } from '../types';

export function generateRandomItems(center: Coords, count: number): Item[] {
  const items: Item[] = [];
  for (let i = 0; i < count; i++) {
    const offsetLat = (Math.random() - 0.5) * 0.01; // ±0.005 graus (~500m)
    const offsetLng = (Math.random() - 0.5) * 0.01;
    items.push({
      id: `item-${i}`,
      name: `Item ${i + 1}`,
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