import { Mission, MathMissionData } from '../../types';

export const easyMathMissions: Mission[] = [
  {
    id: 'easy-math-1',
    title: 'Cálculo Básico',
    description: 'Resolva esta operação matemática simples',
    difficulty: 'easy',
    type: 'math',
    xp: 10,
    gold: 5,
    data: {
      question: 'Qual é o resultado de 8 + 5?',
      answer: 13,
      options: [12, 13, 14, 15]
    } as MathMissionData
  },
  {
    id: 'easy-math-2',
    title: 'Subtração Simples',
    description: 'Resolva esta subtração',
    difficulty: 'easy',
    type: 'math',
    xp: 10,
    gold: 5,
    data: {
      question: 'Quanto é 15 - 7?',
      answer: 8,
      options: [7, 8, 9, 10]
    } as MathMissionData
  },
  {
    id: 'easy-math-3',
    title: 'Multiplicação Básica',
    description: 'Calcule a multiplicação',
    difficulty: 'easy',
    type: 'math',
    xp: 10,
    gold: 5,
    data: {
      question: 'Qual o resultado de 6 × 4?',
      answer: 24,
      options: [20, 24, 28, 30]
    } as MathMissionData
  }
];