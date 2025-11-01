import { Mission } from '../../types';

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
    },
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
      question: 'Complete a função que retorna "TRICK" se o número for par e "TREAT" se for ímpar:',
      code: 'function trickOrTreat(num) {\n  // Complete aqui\n}',
      answer: 'return num % 2 === 0 ? "TRICK" : "TREAT";',
      language: 'javascript',
      testCases: [
        { input: '2', expected: 'TRICK' },
        { input: '7', expected: 'TREAT' },
      ],
    },
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
      question: 'Se uma bruxa prepara 3 poções a cada 13 minutos, quantas poções ela prepara em 1 hora e 30 minutos (90 minutos)?',
      answer: '21',
      options: ['18', '21', '24', '27'],
      explanation: '90 ÷ 13 ≈ 6.92 intervalos, então 6 × 3 = 18, mais as 3 extras = 21 poções',
    },
  },
];

