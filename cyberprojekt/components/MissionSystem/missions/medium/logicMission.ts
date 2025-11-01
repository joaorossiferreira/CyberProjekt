// mediumLogicMissions.ts
import { Mission, LogicMissionData } from '../../types';

export const mediumLogicMissions: Mission[] = [
  {
    id: 'medium-logic-1',
    title: 'Sequência de Fibonacci',
    description: 'Próximo número da sequência',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '1, 1, 2, 3, 5, 8, ?',
      answer: '13',
      options: ['11', '12', '13', '14']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-2',
    title: 'Quadrados Perfeitos',
    description: 'Próximo quadrado',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '1, 4, 9, 16, 25, ?',
      answer: '36',
      options: ['30', '32', '36', '40']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-3',
    title: 'Silogismo Avançado',
    description: 'Conclusão lógica',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'Todos os A são B. Alguns B não são C. Logo:',
      answer: 'Alguns A podem não ser C',
      options: ['Todos A são C', 'Nenhum A é C', 'Alguns A podem não ser C', 'Todos B são C']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-4',
    title: 'Números Triangulares',
    description: 'Próximo número',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '1, 3, 6, 10, 15, ?',
      answer: '21',
      options: ['18', '20', '21', '24']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-5',
    title: 'Horário Noturno',
    description: 'Que horas serão?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'São 23:45. Em 2h30, que horas?',
      answer: '02:15',
      options: ['01:15', '02:15', '01:45', '02:45']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-6',
    title: 'Padrão de Subtração',
    description: 'Próximo número',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '100, 81, 64, 49, ?',
      answer: '36',
      options: ['30', '36', '40', '45']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-7',
    title: 'Lógica de Conjuntos',
    description: 'Quantos elementos?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'A tem 5, B tem 3, interseção 2. |A ∪ B| = ?',
      answer: '6',
      options: ['5', '6', '7', '8']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-8',
    title: 'Sequência de Cubos',
    description: 'Próximo cubo',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '1, 8, 27, 64, ?',
      answer: '125',
      options: ['100', '125', '150', '216']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-9',
    title: 'Dias até Evento',
    description: 'Quantos dias?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'Hoje é 15/03. Evento em 20/04. Quantos dias?',
      answer: '36',
      options: ['30', '35', '36', '40']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-10',
    title: 'Padrão Alternado',
    description: 'Próximo número',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '2, 5, 3, 6, 4, ?',
      answer: '7',
      options: ['5', '6', '7', '8']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-11',
    title: 'Lógica Condicional',
    description: 'Qual conclusão?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'Se chove, fico em casa. Não estou em casa. Logo:',
      answer: 'Não chove',
      options: ['Chove', 'Não chove', 'Pode chover', 'Não sei']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-12',
    title: 'Sequência de Múltiplos',
    description: 'Próximo múltiplo',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '3, 6, 12, 24, ?',
      answer: '48',
      options: ['36', '42', '48', '60']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-13',
    title: 'Idade em Anos',
    description: 'Quantos anos?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'Nasci em 1998. Em 2025, terei:',
      answer: '27',
      options: ['26', '27', '28', '29']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-14',
    title: 'Padrão de Soma',
    description: 'Próximo número',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '1, 3, 6, 10, 15, ?',
      answer: '21',
      options: ['18', '20', '21', '22']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-15',
    title: 'Fuso Horário',
    description: 'Que horas em SP?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '12:00 em Londres. Que horas em SP (-3h)?',
      answer: '09:00',
      options: ['08:00', '09:00', '10:00', '11:00']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-16',
    title: 'Sequência de Primos',
    description: 'Próximo primo',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '2, 3, 5, 7, 11, ?',
      answer: '13',
      options: ['12', '13', '15', '17']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-17',
    title: 'Lógica de Portas',
    description: 'Quantas portas abertas?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '100 portas. Toda k-ésima visita inverte. Quantas abertas no final?',
      answer: '10',
      options: ['9', '10', '11', '12']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-18',
    title: 'Padrão de Diferença',
    description: 'Próximo número',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '2, 6, 12, 20, 30, ?',
      answer: '42',
      options: ['36', '40', '42', '44']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-19',
    title: 'Silogismo Negativo',
    description: 'Conclusão',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'Nenhum pássaro é mamífero. Todos os morcegos são mamíferos. Logo:',
      answer: 'Nenhum morcego é pássaro',
      options: ['Todos morcegos voam', 'Nenhum morcego é pássaro', 'Alguns pássaros são morcegos', 'Não sei']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-20',
    title: 'Contagem de Semanas',
    description: 'Quantas semanas?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'De 1/jan a 31/dez em ano não bissexto: quantas semanas?',
      answer: '52',
      options: ['50', '51', '52', '53']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-21',
    title: 'Padrão de Potência',
    description: 'Próximo número',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '2, 4, 8, 16, 32, ?',
      answer: '64',
      options: ['48', '56', '64', '128']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-22',
    title: 'Horário de Volta',
    description: 'Que horas chega?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'Sai às 14:30, viagem 3h15. Chega às:',
      answer: '17:45',
      options: ['17:15', '17:30', '17:45', '18:00']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-23',
    title: 'Lógica de Cores',
    description: 'Conclusão',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'Todas as rosas são flores. Algumas flores murcham rápido. Logo:',
      answer: 'Algumas rosas podem murchar rápido',
      options: ['Todas rosas murcham', 'Nenhuma rosa murcha', 'Algumas rosas podem murchar rápido', 'Flores não murcham']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-24',
    title: 'Sequência de Fatorial',
    description: 'Próximo número',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '1, 2, 6, 24, 120, ?',
      answer: '720',
      options: ['480', '600', '720', '840']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-25',
    title: 'Dias até Feriado',
    description: 'Quantos dias?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'Hoje é 20/12. Natal é 25/12. Faltam:',
      answer: '5 dias',
      options: ['4 dias', '5 dias', '6 dias', '7 dias']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-26',
    title: 'Padrão de Subtração',
    description: 'Próximo número',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '50, 41, 33, 26, ?',
      answer: '20',
      options: ['18', '20', '22', '24']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-27',
    title: 'Raciocínio com Dinheiro',
    description: 'Quanto sobra?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'R$100,00. Gasta 37% em conta. Sobra:',
      answer: 'R$63,00',
      options: ['R$60,00', 'R$63,00', 'R$65,00', 'R$70,00']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-28',
    title: 'Sequência de Triângulos',
    description: 'Próximo número',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '1, 3, 6, 10, 15, 21, ?',
      answer: '28',
      options: ['24', '26', '28', '30']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-29',
    title: 'Lógica de Números',
    description: 'Qual número falta?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'Em 1 a 100, quantos números contêm o dígito 7?',
      answer: '20',
      options: ['18', '19', '20', '21']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-30',
    title: 'Contagem de Minutos',
    description: 'Quantos minutos?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'De 8:15 até 14:45, quantos minutos?',
      answer: '390',
      options: ['360', '375', '390', '405']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-31',
    title: 'Padrão de Soma',
    description: 'Próximo número',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '1, 4, 10, 20, 35, ?',
      answer: '56',
      options: ['50', '54', '56', '60']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-32',
    title: 'Temperatura Média',
    description: 'Qual a média?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'Manhã: 18°C, Tarde: 28°C, Noite: 22°C. Média?',
      answer: '22,67°C',
      options: ['22°C', '22,67°C', '23°C', '24°C']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-33',
    title: 'Silogismo de Escola',
    description: 'Conclusão',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'Todos os alunos estudam. Alguns estudam muito. Logo:',
      answer: 'Alguns alunos estudam muito',
      options: ['Todos estudam muito', 'Nenhum estuda', 'Alguns alunos estudam muito', 'Estudar não ajuda']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-34',
    title: 'Sequência de Divisão',
    description: 'Próximo número',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '81, 27, 9, 3, ?',
      answer: '1',
      options: ['0', '1', '2', '3']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-35',
    title: 'Ano Bissexto',
    description: 'É bissexto?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '2024 é bissexto?',
      answer: 'Sim',
      options: ['Não', 'Sim', 'Só em fevereiro', 'Não sei']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-36',
    title: 'Padrão de Soma',
    description: 'Próximo número',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '1, 8, 27, 64, 125, ?',
      answer: '216',
      options: ['180', '200', '216', '250']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-37',
    title: 'Raciocínio com Livros',
    description: 'Quantos livros?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '5 prateleiras com 12 livros cada. Total?',
      answer: '60',
      options: ['50', '55', '60', '65']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-38',
    title: 'Sequência de Fibonacci',
    description: 'Próximo número',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: '1, 2, 3, 5, 8, 13, ?',
      answer: '21',
      options: ['18', '20', '21', '22']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-39',
    title: 'Lógica de Transporte',
    description: 'Conclusão',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'Todos os aviões voam. Este avião voa. Logo:',
      answer: 'É um avião',
      options: ['Não voa', 'É um avião', 'Todos voam', 'Aviões não voam']
    } as LogicMissionData
  },
  {
    id: 'medium-logic-40',
    title: 'Problema do Barco',
    description: 'Quantas travessias?',
    difficulty: 'medium',
    type: 'logic',
    xp: 22,
    gold: 14,
    data: {
      question: 'Barco leva 10 min ida e volta. Em 1 hora, quantas travessias completas?',
      answer: '6',
      options: ['5', '6', '7', '10']
    } as LogicMissionData
  }
];