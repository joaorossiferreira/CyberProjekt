import { Mission, CodeMissionData } from '../../types';

export const hardCodeMissions: Mission[] = [
  {
    id: 'hard-code-1',
    title: 'Algoritmo Complexo',
    description: 'Implemente o algoritmo de Fibonacci',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function fibonacci(n) {\n  // Implemente a sequência de Fibonacci\n  \n}`,
      correctCode: `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
      language: 'javascript',
      description: 'A função deve retornar o n-ésimo número da sequência de Fibonacci'
    } as CodeMissionData
  },
  {
    id: 'hard-code-2',
    title: 'Ordenação',
    description: 'Implemente o algoritmo bubble sort',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function bubbleSort(arr) {\n  // Implemente o bubble sort\n  \n}`,
      correctCode: `function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}`,
      language: 'javascript',
      description: 'A função deve ordenar o array usando bubble sort'
    } as CodeMissionData
  }
];