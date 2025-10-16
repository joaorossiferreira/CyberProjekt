import { Mission, LogicMissionData } from '../../types';

export const mediumLogicMissions: Mission[] = [
  {
    id: 'medium-logic-1',
    title: 'Problema de Lógica',
    description: 'Resolva este desafio lógico',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'Se A = 1, B = 2, C = 3, então qual é o valor de A + B + C?',
      answer: '6',
      options: ['5', '6', '7', '8']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-2',
    title: 'Padrão Numérico',
    description: 'Encontre o padrão',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'Qual número completa a sequência: 1, 1, 2, 3, 5, 8, ?',
      answer: '13',
      options: ['11', '12', '13', '14']
    } as LogicMissionData
  }
];