import { Mission, CodeMissionData } from '../../types';

export const easyCodeMissions: Mission[] = [
  {
    id: 'easy-code-1',
    title: 'Função Simples',
    description: 'Complete a função para retornar a soma de dois números',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function soma(a, b) {\n  // Complete a função\n  return \n}`,
      correctCode: `function soma(a, b) {\n  return a + b;\n}`,
      language: 'javascript',
      description: 'A função deve retornar a soma dos parâmetros a e b'
    } as CodeMissionData
  },
  {
    id: 'easy-code-2',
    title: 'Verificar Paridade',
    description: 'Complete a função para verificar se um número é par',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function ehPar(numero) {\n  // Complete a função\n  return \n}`,
      correctCode: `function ehPar(numero) {\n  return numero % 2 === 0;\n}`,
      language: 'javascript',
      description: 'A função deve retornar true se o número for par, false se for ímpar'
    } as CodeMissionData
  },
  {
    id: 'easy-code-3',
    title: 'Concatenar Strings',
    description: 'Complete a função para concatenar duas strings',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function concatenar(str1, str2) {\n  // Complete a função\n  return \n}`,
      correctCode: `function concatenar(str1, str2) {\n  return str1 + str2;\n}`,
      language: 'javascript',
      description: 'A função deve retornar as duas strings concatenadas'
    } as CodeMissionData
  }
];