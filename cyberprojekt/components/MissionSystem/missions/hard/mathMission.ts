import { Mission, MathMissionData } from '../../types';

export const hardMathMissions: Mission[] = [
  {
    id: 'hard-math-1',
    title: 'Álgebra Avançada',
    description: 'Resolva este sistema de equações',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Se x + y = 10 e x - y = 2, qual o valor de x?',
      answer: 6,
      options: [5, 6, 7, 8]
    } as MathMissionData
  },
  {
    id: 'hard-math-2',
    title: 'Geometria',
    description: 'Calcule a área do triângulo',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Qual a área de um triângulo com base 8 e altura 6?',
      answer: 24,
      options: [20, 24, 28, 32]
    } as MathMissionData
  }
];