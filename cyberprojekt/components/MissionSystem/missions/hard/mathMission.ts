// hardMathMissions.ts
import { Mission, MathMissionData } from '../../types';

export const hardMathMissions: Mission[] = [
  {
    id: 'hard-math-1',
    title: 'Sistema Linear',
    description: 'x + y = 10, x - y = 2',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'x + y = 10\nx - y = 2\nx = ?',
      answer: 6,
      options: [5, 6, 7, 8]
    }
  },
  {
    id: 'hard-math-2',
    title: 'Equação Quadrática',
    description: 'x² - 5x + 6 = 0',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Raízes da equação?',
      answer: '2 e 3',
      options: ['1 e 4', '2 e 3', '0 e 5', '-1 e 6']
    }
  },
  {
    id: 'hard-math-3',
    title: 'Teorema de Pitágoras',
    description: 'Catetos 8 e 15',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Hipotenusa = ?',
      answer: 17,
      options: [15, 16, 17, 18]
    }
  },
  {
    id: 'hard-math-4',
    title: 'Volume do Cilindro',
    description: 'Raio 4, altura 9, π ≈ 3,14',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Volume ≈ ?',
      answer: 452.16,
      options: [400, 452.16, 500, 550]
    }
  },
  {
    id: 'hard-math-5',
    title: 'Fatorial Grande',
    description: '10!',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: '10! = ?',
      answer: 3628800,
      options: [362880, 3628800, 36288000, 1000000]
    }
  },
  {
    id: 'hard-math-6',
    title: 'Bhaskara',
    description: 'x² - 4x - 5 = 0',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Raízes?',
      answer: '5 e -1',
      options: ['4 e -1', '5 e -1', '3 e 1', '2 e 2']
    }
  },
  {
    id: 'hard-math-7',
    title: 'Área do Trapézio',
    description: 'Bases 10 e 6, altura 8',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Área = ?',
      answer: 64,
      options: [60, 64, 68, 72]
    }
  },
  {
    id: 'hard-math-8',
    title: 'Juros Compostos',
    description: 'R$1000, 5%, 3 anos',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Montante ≈ ?',
      answer: 1157.63,
      options: [1150, 1157.63, 1200, 1250]
    }
  },
  {
    id: 'hard-math-9',
    title: 'Logaritmo',
    description: 'log₂(64)',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'log₂(64) = ?',
      answer: 6,
      options: [4, 5, 6, 8]
    }
  },
  {
    id: 'hard-math-10',
    title: 'Volume da Esfera',
    description: 'Raio 5, π ≈ 3,14',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Volume ≈ ?',
      answer: 523.33,
      options: [500, 523.33, 550, 600]
    }
  },
  {
    id: 'hard-math-11',
    title: 'Progressão Geométrica',
    description: 'a₁ = 3, r = 2, a₅ = ?',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: '5º termo = ?',
      answer: 48,
      options: [32, 48, 64, 96]
    }
  },
  {
    id: 'hard-math-12',
    title: 'Determinante 2x2',
    description: 'Matriz [[3,1],[2,4]]',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Det = ?',
      answer: 10,
      options: [8, 10, 12, 14]
    }
  },
  {
    id: 'hard-math-13',
    title: 'Trigonometria',
    description: 'sen(30°) + cos(60°)',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'sen(30°) + cos(60°) = ?',
      answer: 1,
      options: [0.5, 1, 1.5, 2]
    }
  },
  {
    id: 'hard-math-14',
    title: 'Discriminante',
    description: 'x² + 2x - 3 = 0',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Δ = ?',
      answer: 16,
      options: [4, 8, 16, 20]
    }
  },
  {
    id: 'hard-math-15',
    title: 'Área do Losango',
    description: 'Diagonais 12 e 8',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Área = ?',
      answer: 48,
      options: [40, 48, 50, 56]
    }
  },
  {
    id: 'hard-math-16',
    title: 'Combinação',
    description: 'C(10,3)',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'C(10,3) = ?',
      answer: 120,
      options: [100, 120, 150, 200]
    }
  },
  {
    id: 'hard-math-17',
    title: 'Derivada Polinomial',
    description: 'f(x) = 3x⁴ - 2x³ + x',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'f\'(x) = ?',
      answer: '12x³ - 6x² + 1',
      options: ['12x³ - 6x²', '12x³ - 6x² + 1', '9x³ - 4x²', '3x³ - 2x²']
    }
  },
  {
    id: 'hard-math-18',
    title: 'Integral Indefinida',
    description: '∫(2x + 1) dx',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Resultado?',
      answer: 'x² + x + C',
      options: ['x² + C', 'x² + x + C', '2x² + x + C', 'x² + 2x + C']
    }
  },
  {
    id: 'hard-math-19',
    title: 'MDC',
    description: 'MDC(48, 18)',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'MDC(48, 18) = ?',
      answer: 6,
      options: [3, 6, 9, 12]
    }
  },
  {
    id: 'hard-math-20',
    title: 'Fibonacci',
    description: 'F(10)',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'F(10) = ?',
      answer: 55,
      options: [34, 55, 89, 144]
    }
  },
  {
    id: 'hard-math-21',
    title: 'Soma dos Ângulos',
    description: 'Polígono de 8 lados',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Soma interna = ?',
      answer: 1080,
      options: [900, 1080, 1260, 1440]
    }
  },
  {
    id: 'hard-math-22',
    title: 'Progressão Aritmética',
    description: 'a₁ = 5, d = 3, a₁₀ = ?',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: '10º termo = ?',
      answer: 32,
      options: [30, 32, 35, 38]
    }
  },
  {
    id: 'hard-math-23',
    title: 'Equação Exponencial',
    description: '2^x = 32',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'x = ?',
      answer: 5,
      options: [4, 5, 6, 8]
    }
  },
  {
    id: 'hard-math-24',
    title: 'Área do Círculo',
    description: 'Raio 7, π ≈ 3,14',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Área ≈ ?',
      answer: 153.86,
      options: [150, 153.86, 160, 170]
    }
  },
  {
    id: 'hard-math-25',
    title: 'Permutação',
    description: 'P(5,3)',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'P(5,3) = ?',
      answer: 60,
      options: [50, 60, 120, 20]
    }
  },
  {
    id: 'hard-math-26',
    title: 'Regra de Três Composta',
    description: '6 máquinas, 8h → 480 peças. 4 máquinas, 10h → ?',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Peças produzidas?',
      answer: 400,
      options: [360, 400, 440, 480]
    }
  },
  {
    id: 'hard-math-27',
    title: 'Matriz Inversa',
    description: '[[1,2],[3,4]], det = -2',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'Elemento (1,1) da inversa?',
      answer: -2,
      options: [-2, -1.5, -1, 2]
    }
  },
  {
    id: 'hard-math-28',
    title: 'Limite',
    description: 'lim(x->0) (sin x)/x',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'lim(x->0) (sin x)/x = ?',
      answer: 1,
      options: [0, 1, '∞', -1]
    }
  },
  {
    id: 'hard-math-29',
    title: 'Soma Infinita',
    description: 'S = 1/2 + 1/4 + 1/8 + ...',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'S = ?',
      answer: 1,
      options: [0.5, 1, 1.5, '∞']
    }
  },
  {
    id: 'hard-math-30',
    title: 'Teorema do Resto',
    description: 'P(x) = x³ + 2x² - 5x + 1, P(2) = ?',
    difficulty: 'hard',
    type: 'math',
    xp: 35,
    gold: 25,
    data: {
      question: 'P(2) = ?',
      answer: 7,
      options: [5, 7, 9, 11]
    }
  }
];