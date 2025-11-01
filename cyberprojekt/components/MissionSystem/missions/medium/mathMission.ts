// mediumMathMissions.ts
import { Mission, MathMissionData } from '../../types';

export const mediumMathMissions: Mission[] = [
  {
    id: 'medium-math-1',
    title: 'Soma de Frações',
    description: 'Calcule 1/2 + 1/4',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '1/2 + 1/4 = ?',
      answer: 0.75,
      options: [0.5, 0.75, 1, 1.25]
    } as MathMissionData
  },
  {
    id: 'medium-math-2',
    title: 'Porcentagem',
    description: '25% de 200',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '25% de 200 é:',
      answer: 50,
      options: [25, 50, 75, 100]
    } as MathMissionData
  },
  {
    id: 'medium-math-3',
    title: 'Equação Linear',
    description: '2x + 5 = 15',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '2x + 5 = 15 → x = ?',
      answer: 5,
      options: [4, 5, 6, 7]
    } as MathMissionData
  },
  {
    id: 'medium-math-4',
    title: 'Área do Triângulo',
    description: 'Base 8, altura 6',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Área = (8 × 6) / 2 = ?',
      answer: 24,
      options: [20, 24, 28, 32]
    } as MathMissionData
  },
  {
    id: 'medium-math-5',
    title: 'MMC',
    description: 'MMC(6,8)',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'MMC de 6 e 8 é:',
      answer: 24,
      options: [12, 18, 24, 48]
    } as MathMissionData
  },
  {
    id: 'medium-math-6',
    title: 'MDC',
    description: 'MDC(12,18)',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'MDC de 12 e 18 é:',
      answer: 6,
      options: [3, 6, 9, 12]
    } as MathMissionData
  },
  {
    id: 'medium-math-7',
    title: 'Fração Mista',
    description: '5/4 em número misto',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '5/4 = ? (número misto)',
      answer: '1 1/4',
      options: ['1 1/2', '1 1/4', '2 1/4', '1 3/4']
    } as MathMissionData
  },
  {
    id: 'medium-math-8',
    title: 'Aumento Percentual',
    description: 'R$100 com 20% de aumento',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Valor final:',
      answer: 120,
      options: [110, 115, 120, 125]
    } as MathMissionData
  },
  {
    id: 'medium-math-9',
    title: 'Equação com Parênteses',
    description: '3(x + 2) = 15',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '3(x + 2) = 15 → x = ?',
      answer: 3,
      options: [2, 3, 4, 5]
    } as MathMissionData
  },
  {
    id: 'medium-math-10',
    title: 'Área do Círculo',
    description: 'Raio = 5, π ≈ 3,14',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Área ≈ ?',
      answer: 78.5,
      options: [75, 78.5, 80, 85]
    } as MathMissionData
  },
  {
    id: 'medium-math-11',
    title: 'Simplificar Fração',
    description: '18/24',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '18/24 simplificado:',
      answer: '3/4',
      options: ['1/2', '2/3', '3/4', '4/5']
    } as MathMissionData
  },
  {
    id: 'medium-math-12',
    title: 'Desconto',
    description: '10% de desconto em R$80',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Valor a pagar:',
      answer: 72,
      options: [70, 72, 75, 78]
    } as MathMissionData
  },
  {
    id: 'medium-math-13',
    title: 'Sistema de Equações',
    description: 'x + y = 10, x - y = 4',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'x = ?',
      answer: 7,
      options: [6, 7, 8, 9]
    } as MathMissionData
  },
  {
    id: 'medium-math-14',
    title: 'Volume do Cubo',
    description: 'Aresta = 4',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Volume = ?',
      answer: 64,
      options: [48, 56, 64, 72]
    } as MathMissionData
  },
  {
    id: 'medium-math-15',
    title: 'Decimal para Fração',
    description: '0,75 como fração',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '0,75 = ?',
      answer: '3/4',
      options: ['1/2', '2/3', '3/4', '4/5']
    } as MathMissionData
  },
  {
    id: 'medium-math-16',
    title: 'Regra de Três',
    description: '3 lápis = R$6, 5 lápis = ?',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Custo de 5 lápis:',
      answer: 10,
      options: [8, 9, 10, 12]
    } as MathMissionData
  },
  {
    id: 'medium-math-17',
    title: 'Equação Quadrática',
    description: 'x² = 16',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'x = ? (valor positivo)',
      answer: 4,
      options: [2, 3, 4, 5]
    } as MathMissionData
  },
  {
    id: 'medium-math-18',
    title: 'Perímetro do Retângulo',
    description: '10 × 6',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Perímetro = ?',
      answer: 32,
      options: [28, 30, 32, 36]
    } as MathMissionData
  },
  {
    id: 'medium-math-19',
    title: 'Média Aritmética',
    description: 'Notas: 7, 8, 9',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Média = ?',
      answer: 8,
      options: [7.5, 8, 8.5, 9]
    } as MathMissionData
  },
  {
    id: 'medium-math-20',
    title: 'Potenciação',
    description: '2³',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '2³ = ?',
      answer: 8,
      options: [4, 6, 8, 16]
    } as MathMissionData
  },
  {
    id: 'medium-math-21',
    title: 'Frações Equivalentes',
    description: '2/3 = ?/12',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '2/3 = ?/12',
      answer: 8,
      options: [6, 7, 8, 9]
    } as MathMissionData
  },
  {
    id: 'medium-math-22',
    title: 'Juros Simples',
    description: 'R$1000, 5%, 2 anos',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Juros = ?',
      answer: 100,
      options: [50, 75, 100, 150]
    } as MathMissionData
  },
  {
    id: 'medium-math-23',
    title: 'Área do Quadrado',
    description: 'Lado = 7',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Área = ?',
      answer: 49,
      options: [42, 45, 49, 56]
    } as MathMissionData
  },
  {
    id: 'medium-math-24',
    title: 'Radiciação',
    description: '√25',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '√25 = ?',
      answer: 5,
      options: [4, 5, 6, 7]
    } as MathMissionData
  },
  {
    id: 'medium-math-25',
    title: 'Volume da Esfera',
    description: 'Raio = 3, π ≈ 3,14',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Volume ≈ ?',
      answer: 113,
      options: [100, 108, 113, 120]
    } as MathMissionData
  },
  {
    id: 'medium-math-26',
    title: 'Expressão com Parênteses',
    description: '2 × (3 + 4)',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '2 × (3 + 4) = ?',
      answer: 14,
      options: [10, 12, 14, 16]
    } as MathMissionData
  },
  {
    id: 'medium-math-27',
    title: 'Fração de Quantidade',
    description: '1/5 de 30',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '1/5 de 30 = ?',
      answer: 6,
      options: [5, 6, 7, 8]
    } as MathMissionData
  },
  {
    id: 'medium-math-28',
    title: 'Perímetro do Triângulo',
    description: 'Lados 5, 5, 6',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Perímetro = ?',
      answer: 16,
      options: [14, 15, 16, 17]
    } as MathMissionData
  },
  {
    id: 'medium-math-29',
    title: 'Média Ponderada',
    description: '6 (peso 2), 8 (peso 3)',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Média = ?',
      answer: 7.2,
      options: [7, 7.2, 7.5, 8]
    } as MathMissionData
  },
  {
    id: 'medium-math-30',
    title: 'Potência de 10',
    description: '10³',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '10³ = ?',
      answer: 1000,
      options: [100, 500, 1000, 10000]
    } as MathMissionData
  },
  {
    id: 'medium-math-31',
    title: 'Área do Trapézio',
    description: 'Bases 6 e 10, altura 5',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Área = ?',
      answer: 40,
      options: [35, 38, 40, 45]
    } as MathMissionData
  },
  {
    id: 'medium-math-32',
    title: 'Equação com Fração',
    description: 'x/3 = 9',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'x = ?',
      answer: 27,
      options: [24, 27, 30, 33]
    } as MathMissionData
  },
  {
    id: 'medium-math-33',
    title: 'Porcentagem Inversa',
    description: '50 é 25% de ?',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '50 é 25% de:',
      answer: 200,
      options: [100, 150, 200, 250]
    } as MathMissionData
  },
  {
    id: 'medium-math-34',
    title: 'Volume do Cilindro',
    description: 'Raio 2, altura 5, π ≈ 3,14',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Volume ≈ ?',
      answer: 62.8,
      options: [60, 62.8, 65, 70]
    } as MathMissionData
  },
  {
    id: 'medium-math-35',
    title: 'Fatorial',
    description: '5!',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '5! = ?',
      answer: 120,
      options: [100, 110, 120, 130]
    } as MathMissionData
  },
  {
    id: 'medium-math-36',
    title: 'Teorema de Pitágoras',
    description: 'Catetos 3 e 4',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Hipotenusa = ?',
      answer: 5,
      options: [4, 5, 6, 7]
    } as MathMissionData
  },
  {
    id: 'medium-math-37',
    title: 'Expressão Algébrica',
    description: '2a + 3b, a=4, b=5',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Valor = ?',
      answer: 23,
      options: [20, 22, 23, 25]
    } as MathMissionData
  },
  {
    id: 'medium-math-38',
    title: 'Área do Losango',
    description: 'Diagonais 6 e 8',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: 'Área = ?',
      answer: 24,
      options: [20, 22, 24, 28]
    } as MathMissionData
  },
  {
    id: 'medium-math-39',
    title: 'Sequência Aritmética',
    description: 'Primeiro termo 2, razão 3, 5º termo',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '5º termo = ?',
      answer: 14,
      options: [12, 13, 14, 15]
    } as MathMissionData
  },
  {
    id: 'medium-math-40',
    title: 'Sequência Geométrica',
    description: 'Primeiro termo 3, razão 2, 4º termo',
    difficulty: 'medium',
    type: 'math',
    xp: 20,
    gold: 12,
    data: {
      question: '4º termo = ?',
      answer: 24,
      options: [18, 20, 24, 27]
    } as MathMissionData
  }
];