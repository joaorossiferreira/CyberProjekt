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

export interface MathMissionData {
  question: string;
  answer: number;
  options?: number[];
}

export interface CodeMissionData {
  code: string;
  correctCode: string;
  language: 'javascript' | 'python' | 'typescript';
  description: string;
}

export interface LogicMissionData {
  question: string;
  answer: string;
  options?: string[];
}