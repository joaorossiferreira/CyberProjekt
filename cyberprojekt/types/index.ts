export interface Coords {
  latitude: number;
  longitude: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'math' | 'code' | 'logic' | 'puzzle';
  xp: number;
  gold: number;
  data: any;
}

export interface Item {
  id: string;
  name: string;
  coords: Coords;
  mission?: Mission;
  createdAt?: number; // TIMESTAMP DE CRIAÇÃO
  expiresAt?: number; // TIMESTAMP DE EXPIRAÇÃO (2 MINUTOS)
}