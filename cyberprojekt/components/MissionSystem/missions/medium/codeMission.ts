import { Mission, CodeMissionData } from '../../types';

export const mediumCodeMissions: Mission[] = [
  {
    id: 'medium-code-1',
    title: 'Loop e Array',
    description: 'Complete a função para encontrar o maior número',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function encontrarMaior(numeros) {\n  let maior = numeros[0];\n  // Complete o loop\n  for (let i = 1; i < numeros.length; i++) {\n    \n  }\n  return maior;\n}`,
      correctCode: `function encontrarMaior(numeros) {\n  let maior = numeros[0];\n  for (let i = 1; i < numeros.length; i++) {\n    if (numeros[i] > maior) {\n      maior = numeros[i];\n    }\n  }\n  return maior;\n}`,
      language: 'javascript',
      description: 'A função deve retornar o maior número do array'
    } as CodeMissionData
  },
  {
    id: 'medium-code-2',
    title: 'Manipulação de String',
    description: 'Complete a função para inverter uma string',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function inverterString(str) {\n  let invertida = '';\n  // Complete o loop\n  for (let i = str.length - 1; i >= 0; i--) {\n    \n  }\n  return invertida;\n}`,
      correctCode: `function inverterString(str) {\n  let invertida = '';\n  for (let i = str.length - 1; i >= 0; i--) {\n    invertida += str[i];\n  }\n  return invertida;\n}`,
      language: 'javascript',
      description: 'A função deve retornar a string invertida'
    } as CodeMissionData
  }
];