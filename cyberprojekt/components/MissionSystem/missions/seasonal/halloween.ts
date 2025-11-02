import { Mission, CodeMissionData, LogicMissionData, MathMissionData } from '../../types';

export const halloweenMissions: Mission[] = [
  {
    id: 'halloween_1',
    title: '🎃 HACK DO ESPÍRITO',
    description: 'Desvende os segredos da noite das bruxas...',
    difficulty: 'medium',
    type: 'logic',
    xp: 100,
    gold: 500,
    data: {
      question: 'Em uma mansão assombrada há 13 quartos. Cada quarto tem 2 fantasmas, mas 3 quartos estão vazios. Quantos fantasmas há na mansão?',
      answer: '20',
      options: ['13', '20', '26', '10'],
    } as LogicMissionData,
  },
  {
    id: 'halloween_2',
    title: '🎃 CÓDIGO SOMBRIO',
    description: 'Implemente a função das trevas...',
    difficulty: 'medium',
    type: 'code',
    xp: 100,
    gold: 500,
    data: {
      code: `function trickOrTreat(num) {\n  // Complete a função\n  return \n}`,
      correctCode: `function trickOrTreat(num) {\n  return num % 2 === 0 ? "TRICK" : "TREAT";\n}`,
      language: 'javascript',
      description: 'Retorna "TRICK" se par e "TREAT" se ímpar',
    } as CodeMissionData,
  },
  {
    id: 'halloween_3',
    title: '🎃 EQUAÇÃO MACABRA',
    description: 'Resolva o enigma matemático das sombras...',
    difficulty: 'medium',
    type: 'math',
    xp: 100,
    gold: 500,
    data: {
      question: 'Se uma bruxa prepara 3 poções a cada 13 minutos, quantas poções ela prepara em 78 minutos?',
      answer: 18,
      options: [15, 18, 21, 24],
      explanation: '78 ÷ 13 = 6 intervalos, então 6 × 3 = 18 poções',
    } as MathMissionData,
  },
];

