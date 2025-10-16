import { Mission, MathMissionData } from '../../types';

export const mediumMathMissions: Mission[] = [
  {
    id: 'medium-math-1',
    title: 'Frações',
    description: 'Resolva esta operação com frações',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Qual é o resultado de 1/2 + 1/4?',
      answer: 0.75,
      options: [0.5, 0.75, 1, 1.25]
    } as MathMissionData
  },
  {
    id: 'medium-math-2',
    title: 'Porcentagem',
    description: 'Calcule a porcentagem',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Quanto é 25% de 200?',
      answer: 50,
      options: [25, 50, 75, 100]
    } as MathMissionData
  },
  {
    id: 'medium-math-3',
    title: 'Equação Linear',
    description: 'Resolva a equação',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Se 2x + 5 = 15, qual o valor de x?',
      answer: 5,
      options: [5, 6, 7, 8]
    } as MathMissionData
  }
];