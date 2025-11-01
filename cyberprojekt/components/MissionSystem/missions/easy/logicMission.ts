import { Mission, LogicMissionData } from '../../types';

export const easyLogicMissions: Mission[] = [
  {
    id: 'easy-logic-1',
    title: 'Lógica Básica',
    description: 'Resolva este problema lógico',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se todos os humanos são mortais e Sócrates é humano, então:',
      answer: 'Sócrates é mortal',
      options: [
        'Sócrates é imortal',
        'Sócrates é mortal', 
        'Humanos são imortais',
        'Sócrates não é humano'
      ]
    } as LogicMissionData
  },
  {
    id: 'easy-logic-2',
    title: 'Sequência Lógica',
    description: 'Complete a sequência',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Complete a sequência: 2, 4, 6, 8, ?',
      answer: '10',
      options: ['9', '10', '12', '14']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-3',
    title: 'Problema de Lógica',
    description: 'Pense logicamente',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se um relógio marca 15:00 horas, que horas serão em 45 minutos?',
      answer: '15:45',
      options: ['15:45', '16:00', '15:30', '16:15']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-4',
    title: 'Sequência Simples',
    description: 'Encontre o próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Qual é o próximo número: 1, 3, 5, 7, ?',
      answer: '9',
      options: ['8', '9', '10', '11']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-5',
    title: 'Raciocínio Temporal',
    description: 'Calcule o horário',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se agora são 10:30 e você adiciona 1 hora e 15 minutos, que horas serão?',
      answer: '11:45',
      options: ['11:30', '11:45', '12:00', '12:15']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-6',
    title: 'Silogismo Simples',
    description: 'Complete a conclusão',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Todos os gatos são mamíferos. Mimi é um gato. Logo:',
      answer: 'Mimi é mamífero',
      options: ['Mimi voa', 'Mimi é mamífero', 'Mamíferos são gatos', 'Mimi é peixe']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-7',
    title: 'Sequência de Letras',
    description: 'Encontre a letra que falta',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'A, C, E, G, ?',
      answer: 'I',
      options: ['H', 'I', 'J', 'K']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-8',
    title: 'Contagem de Dias',
    description: 'Quantos dias?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Quantos dias tem o mês de fevereiro em um ano não bissexto?',
      answer: '28',
      options: ['28', '29', '30', '31']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-9',
    title: 'Padrão Numérico',
    description: 'Qual é o próximo?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '10, 20, 30, 40, ?',
      answer: '50',
      options: ['45', '50', '60', '70']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-10',
    title: 'Raciocínio Lógico',
    description: 'Conclusão correta',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se chove, o chão fica molhado. O chão está molhado. Logo:',
      answer: 'Pode ter chovido',
      options: ['Definitivamente choveu', 'Pode ter chovido', 'Não choveu', 'O chão sempre fica molhado']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-11',
    title: 'Sequência de Quadrados',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '1, 4, 9, 16, ?',
      answer: '25',
      options: ['20', '21', '25', '36']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-12',
    title: 'Horário',
    description: 'Que horas serão?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se são 14:20 e adicionamos 50 minutos, que horas serão?',
      answer: '15:10',
      options: ['14:50', '15:00', '15:10', '15:20']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-13',
    title: 'Silogismo Animal',
    description: 'Conclusão',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Todos os pássaros têm penas. Pinguins são pássaros. Logo:',
      answer: 'Pinguins têm penas',
      options: ['Pinguins voam', 'Pinguins têm penas', 'Pássaros não têm penas', 'Pinguins não são pássaros']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-14',
    title: 'Sequência de Três',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '3, 6, 9, 12, ?',
      answer: '15',
      options: ['13', '14', '15', '18']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-15',
    title: 'Dias da Semana',
    description: 'Qual é o dia?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se hoje é segunda-feira, que dia será daqui a 3 dias?',
      answer: 'Quinta-feira',
      options: ['Terça', 'Quarta', 'Quinta-feira', 'Sexta']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-16',
    title: 'Padrão de Subtração',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '20, 17, 14, 11, ?',
      answer: '8',
      options: ['7', '8', '9', '10']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-17',
    title: 'Raciocínio com Idade',
    description: 'Quantos anos?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'João tem 15 anos. Em 5 anos, quantos anos ele terá?',
      answer: '20',
      options: ['18', '19', '20', '21']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-18',
    title: 'Sequência de Pares',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '2, 6, 10, 14, ?',
      answer: '18',
      options: ['16', '17', '18', '20']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-19',
    title: 'Lógica de Cores',
    description: 'Qual é a cor?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se todas as rosas são flores e algumas flores são vermelhas, então:',
      answer: 'Algumas rosas podem ser vermelhas',
      options: ['Todas as rosas são vermelhas', 'Nenhuma rosa é vermelha', 'Algumas rosas podem ser vermelhas', 'Flores não são vermelhas']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-20',
    title: 'Contagem de Meses',
    description: 'Qual mês?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se hoje é janeiro, qual será o mês daqui a 4 meses?',
      answer: 'Maio',
      options: ['Abril', 'Maio', 'Junho', 'Julho']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-21',
    title: 'Padrão de Multiplicação',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '5, 10, 15, 20, ?',
      answer: '25',
      options: ['22', '23', '25', '30']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-22',
    title: 'Horário AM/PM',
    description: 'Que horas?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se são 11:00 AM e adicionamos 2 horas, que horas serão?',
      answer: '1:00 PM',
      options: ['12:00 PM', '1:00 PM', '2:00 PM', '11:00 PM']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-23',
    title: 'Silogismo de Frutas',
    description: 'Conclusão',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Todas as maçãs são frutas. Esta fruta é uma maçã. Logo:',
      answer: 'Esta fruta é uma maçã',
      options: ['Todas as frutas são maçãs', 'Esta fruta é uma maçã', 'Maçãs não são frutas', 'Esta fruta não é maçã']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-24',
    title: 'Sequência de Ímpares',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '1, 5, 9, 13, ?',
      answer: '17',
      options: ['15', '16', '17', '18']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-25',
    title: 'Dias até o Fim de Semana',
    description: 'Quantos dias?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se hoje é quarta-feira, quantos dias faltam para o sábado?',
      answer: '3',
      options: ['2', '3', '4', '5']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-26',
    title: 'Padrão de Subtração',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '100, 90, 80, 70, ?',
      answer: '60',
      options: ['65', '60', '55', '50']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-27',
    title: 'Raciocínio com Dinheiro',
    description: 'Quanto sobra?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Você tem R$50 e gasta R$32. Quanto sobra?',
      answer: 'R$18',
      options: ['R$15', 'R$18', 'R$20', 'R$22']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-28',
    title: 'Sequência de Cubos',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '1, 8, 27, 64, ?',
      answer: '125',
      options: ['100', '125', '150', '216']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-29',
    title: 'Lógica de Estações',
    description: 'Qual estação?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se hoje é 21 de março no hemisfério sul, qual estação começa?',
      answer: 'Outono',
      options: ['Primavera', 'Verão', 'Outono', 'Inverno']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-30',
    title: 'Contagem de Horas',
    description: 'Quantas horas?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'De 8:00 até 14:00, quantas horas se passaram?',
      answer: '6',
      options: ['5', '6', '7', '8']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-31',
    title: 'Padrão de Adição',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '7, 11, 15, 19, ?',
      answer: '23',
      options: ['20', '21', '22', '23']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-32',
    title: 'Raciocínio com Temperatura',
    description: 'Qual temperatura?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se a temperatura é 25°C e sobe 7°C, qual será?',
      answer: '32°C',
      options: ['30°C', '31°C', '32°C', '33°C']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-33',
    title: 'Silogismo de Escola',
    description: 'Conclusão',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Todos os alunos estudam. Maria é aluna. Logo:',
      answer: 'Maria estuda',
      options: ['Maria não estuda', 'Maria estuda', 'Nenhum aluno estuda', 'Estudar não é para alunos']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-34',
    title: 'Sequência de Divisão',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '64, 32, 16, 8, ?',
      answer: '4',
      options: ['2', '4', '6', '8']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-35',
    title: 'Dias no Ano',
    description: 'Quantos dias?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Quantos dias tem um ano não bissexto?',
      answer: '365',
      options: ['364', '365', '366', '367']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-36',
    title: 'Padrão de Soma',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '1, 2, 4, 7, 11, ?',
      answer: '16',
      options: ['14', '15', '16', '17']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-37',
    title: 'Raciocínio com Livros',
    description: 'Quantos livros?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Você tem 3 livros e ganha mais 4. Quantos tem agora?',
      answer: '7',
      options: ['6', '7', '8', '9']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-38',
    title: 'Sequência de Fibonacci (simples)',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '1, 1, 2, 3, 5, ?',
      answer: '8',
      options: ['6', '7', '8', '9']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-39',
    title: 'Lógica de Transporte',
    description: 'Qual meio?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se todos os carros têm 4 rodas e um fusca é um carro, então:',
      answer: 'Fusca tem 4 rodas',
      options: ['Fusca tem 3 rodas', 'Fusca tem 4 rodas', 'Carros têm 2 rodas', 'Fusca não é carro']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-40',
    title: 'Contagem de Semanas',
    description: 'Quantas semanas?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Quantas semanas têm 28 dias?',
      answer: '4',
      options: ['3', '4', '5', '6']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-41',
    title: 'Padrão de Multiplicação',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '2, 6, 12, 20, ?',
      answer: '30',
      options: ['25', '28', '30', '32']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-42',
    title: 'Horário de Volta',
    description: 'Que horas?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Você sai às 9:00 e volta após 3 horas e meia. Que horas chega?',
      answer: '12:30',
      options: ['12:00', '12:30', '1:00', '1:30']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-43',
    title: 'Silogismo de Esporte',
    description: 'Conclusão',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Todos os nadadores sabem nadar. Ana é nadadora. Logo:',
      answer: 'Ana sabe nadar',
      options: ['Ana não sabe nadar', 'Ana sabe nadar', 'Nem todos nadam', 'Nadadores não sabem nadar']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-44',
    title: 'Sequência de Potências',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '2, 4, 8, 16, ?',
      answer: '32',
      options: ['24', '28', '32', '64']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-45',
    title: 'Dias até o Natal',
    description: 'Quantos dias?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Se hoje é 20 de dezembro, quantos dias faltam para o Natal?',
      answer: '5',
      options: ['4', '5', '6', '7']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-46',
    title: 'Padrão de Subtração',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '50, 45, 40, 35, ?',
      answer: '30',
      options: ['28', '30', '32', '35']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-47',
    title: 'Raciocínio com Comida',
    description: 'Quantas frutas?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Você come 2 maçãs por dia. Em 3 dias, quantas comeu?',
      answer: '6',
      options: ['5', '6', '7', '8']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-48',
    title: 'Sequência de Triângulos',
    description: 'Próximo número',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: '1, 3, 6, 10, ?',
      answer: '15',
      options: ['12', '13', '14', '15']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-49',
    title: 'Lógica de Números Primos',
    description: 'Qual é primo?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Qual dos números abaixo é primo?',
      answer: '7',
      options: ['4', '6', '7', '9']
    } as LogicMissionData
  },
  {
    id: 'easy-logic-50',
    title: 'Contagem de Minutos',
    description: 'Quantos minutos?',
    difficulty: 'easy',
    type: 'logic',
    xp: 12,
    gold: 6,
    data: {
      question: 'Quantos minutos têm 2 horas e meia?',
      answer: '150',
      options: ['120', '135', '150', '180']
    } as LogicMissionData
  }
];