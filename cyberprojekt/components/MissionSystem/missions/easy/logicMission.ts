import { Mission, LogicMissionData } from '../../types';

export const easyLogicMissions: Mission[] = [
  {
    id: 'easy-logic-1',
    title: 'Lógica Básica',
    description: 'Resolva este problema lógico',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se todos os humanos são mortais e Sócrates é humano, então:',
      answer: 'Sócrates é mortal',
      options: [
        'Sócrates é imortal',
        'Sócrates é mortal', 
        'Humanos são imortais',
        'Sócrates não é humano'
      ]
    } as LogicMissionData
  },
  {
    id: 'easy-logic-2',
    title: 'Sequência Lógica',
    description: 'Complete a sequência',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Complete a sequência: 2, 4, 6, 8, ?',
      answer: '10',
      options: ['9', '10', '12', '14']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-3',
    title: 'Problema de Lógica',
    description: 'Pense logicamente',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se um relógio marca 15:00 horas, que horas serão em 45 minutos?',
      answer: '15:45',
      options: ['15:45', '16:00', '15:30', '16:15']
    } as LogicMissionData
  }
];