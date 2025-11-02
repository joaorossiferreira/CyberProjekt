import { Mission, CodeMissionData, LogicMissionData, MathMissionData } from '../../types';

export const christmasMissions: Mission[] = [
  {
    id: 'christmas_1',
    title: '🎄 HACK NATALINO',
    description: 'Desvende os mistérios do Natal cibernético...',
    difficulty: 'medium',
    type: 'logic',
    xp: 100,
    gold: 500,
    data: {
      question: 'Papai Noel tem 8 renas. Cada rena puxa o trenó por 3 horas. Se a viagem dura 24 horas, quantas vezes cada rena descansa?',
      answer: '7',
      options: ['5', '6', '7', '8'],
    } as LogicMissionData,
  },
  {
    id: 'christmas_2',
    title: '🎄 CÓDIGO DOS PRESENTES',
    description: 'Programe a distribuição automática de presentes...',
    difficulty: 'medium',
    type: 'code',
    xp: 100,
    gold: 500,
    data: {
      code: `function naughtyOrNice(score) {\n  // Complete a função\n  return \n}`,
      correctCode: `function naughtyOrNice(score) {\n  return score < 5 ? "NAUGHTY" : "NICE";\n}`,
      language: 'javascript',
      description: 'Retorna "NAUGHTY" se score < 5, senão "NICE"',
    } as CodeMissionData,
  },
  {
    id: 'christmas_3',
    title: '🎄 CÁLCULO FESTIVO',
    description: 'Resolva a equação do espírito natalino...',
    difficulty: 'medium',
    type: 'math',
    xp: 100,
    gold: 500,
    data: {
      question: 'Se um elfo empacota 12 presentes por hora e trabalha 8 horas por dia durante 5 dias, quantos presentes ele empacota no total?',
      answer: 480,
      options: [420, 450, 480, 500],
      explanation: '12 presentes/hora × 8 horas/dia × 5 dias = 480 presentes',
    } as MathMissionData,
  },
];
