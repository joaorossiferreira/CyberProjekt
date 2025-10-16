import { Mission, LogicMissionData } from '../../types';

export const hardLogicMissions: Mission[] = [
  {
    id: 'hard-logic-1',
    title: 'Quebra-Cabeça Lógico',
    description: 'Resolva este desafio complexo',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: 'Um homem olha para um retrato e diz: "Não tenho irmãos ou irmãs, mas o pai deste homem é o filho do meu pai." Quem é o homem no retrato?',
      answer: 'Seu filho',
      options: ['Seu pai', 'Seu avô', 'Seu filho', 'Ele mesmo']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-2',
    title: 'Problema de Lógica Avançado',
    description: 'Use a lógica para resolver',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: 'Se 3 pessoas levam 3 horas para pintar 3 paredes, quanto tempo levam 9 pessoas para pintar 9 paredes?',
      answer: '3 horas',
      options: ['1 hora', '3 horas', '6 horas', '9 horas']
    } as LogicMissionData
  }
];