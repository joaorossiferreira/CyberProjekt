export interface Coords {
  latitude: number;
  longitude: number;
}

export interface Item {
  id: string;
  name: string;
  coords: Coords;
}