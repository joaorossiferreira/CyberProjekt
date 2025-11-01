// hardLogicMissions.ts
import { Mission, LogicMissionData } from '../../types';

export const hardLogicMissions: Mission[] = [
  {
    id: 'hard-logic-1',
    title: 'Retrato do Filho',
    description: 'Quebra-cabeça clássico',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: 'Um homem olha para um retrato e diz: "Não tenho irmãos ou irmãs, mas o pai deste homem é o filho do meu pai." Quem é o homem no retrato?',
      answer: 'Seu filho',
      options: ['Seu pai', 'Seu avô', 'Seu filho', 'Ele mesmo']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-2',
    title: 'Pintores e Paredes',
    description: 'Lógica de proporcionalidade',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: 'Se 3 pessoas levam 3 horas para pintar 3 paredes, quanto tempo levam 9 pessoas para pintar 9 paredes?',
      answer: '3 horas',
      options: ['1 hora', '3 horas', '6 horas', '9 horas']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-3',
    title: 'Lobo, Cabra e Repolho',
    description: 'Primeira travessia',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: 'Fazendeiro, lobo, cabra, repolho. Barco leva 2. Lobo come cabra, cabra come repolho. O que ele leva primeiro?',
      answer: 'A cabra',
      options: ['O lobo', 'O repolho', 'A cabra', 'Nada']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-4',
    title: 'Chapéus dos Prisioneiros',
    description: '3 prisioneiros, o de trás vê 2 vermelhos',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '3 prisioneiros em fila. Chapéus vermelho ou branco. O de trás vê os dois à frente. Ele diz "Vermelho". Por quê?',
      answer: 'Viu 2 vermelhos',
      options: ['Viu 2 brancos', 'Viu 2 vermelhos', 'Viu 1 de cada', 'Chutou']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-5',
    title: 'Monty Hall',
    description: 'Trocar aumenta chance',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: 'Você escolhe porta 1. Monty abre porta 3 (cabra). Trocar para porta 2 aumenta sua chance para?',
      answer: '2/3',
      options: ['1/3', '1/2', '2/3', '1']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-6',
    title: '100 Portas',
    description: 'Portas abertas no final',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '100 portas fechadas. 100 passes. i-ésimo passe inverte múltiplos de i. Quantas abertas?',
      answer: '10',
      options: ['9', '10', '11', '12']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-7',
    title: 'Piratas e Moedas',
    description: '5 piratas, 100 moedas',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '5 piratas, 100 moedas. Mais velho propõe. Se 50% rejeitar, morre. O mais velho oferece 98, 0, 1, 0, 1. Por quê?',
      answer: 'Garante 3 votos',
      options: ['Ganha tudo', 'Garante 3 votos', 'É justo', 'Aleatório']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-8',
    title: 'Einstein\'s Riddle',
    description: 'Quem tem o peixe?',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '5 casas, 5 cores, 5 nacionalidades, 5 bebidas, 5 cigarros, 5 animais. Britânico na vermelha, sueco tem cachorro, etc. Quem tem o peixe?',
      answer: 'O alemão',
      options: ['Norueguês', 'Alemão', 'Sueco', 'Britânico']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-9',
    title: 'Ponte e Lanternas',
    description: '4 pessoas, 1, 2, 5, 10 min',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '4 pessoas: 1, 2, 5, 10 min. Ponte leva 2. Lanterna obrigatória. Tempo mínimo?',
      answer: '17 minutos',
      options: ['15', '17', '19', '21']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-10',
    title: 'Caixas Rotuladas',
    description: '3 caixas: uma verdade, uma mentira, uma aleatória',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: 'Caixa 1: "Ouro aqui". Caixa 2: "Ouro na 1". Caixa 3: "Ouro na 2". Uma verdade, uma mentira, uma aleatória. Onde está o ouro?',
      answer: 'Caixa 3',
      options: ['Caixa 1', 'Caixa 2', 'Caixa 3', 'Nenhuma']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-11',
    title: 'Prisioneiro e 2 Portas',
    description: 'Guarda sempre abre porta com cabra',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '2 portas: 1 carro, 1 cabra. Você escolhe 1. Guarda abre outra com cabra. Trocar?',
      answer: 'Sim, chance 2/3',
      options: ['Não', 'Sim, 1/2', 'Sim, 2/3', 'Indiferente']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-12',
    title: 'Balança e Moedas',
    description: '12 moedas, 1 falsa (mais leve ou pesada)',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '12 moedas, 1 falsa (leve ou pesada). 3 pesagens. É possível?',
      answer: 'Sim',
      options: ['Não', 'Sim', 'Só se leve', 'Só se pesada']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-13',
    title: 'Soma de 1 a 100',
    description: 'Gauss aos 7 anos',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '1 + 2 + ... + 100 = ?',
      answer: '5050',
      options: ['5000', '5050', '5100', '10000']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-14',
    title: 'Três Interruptores',
    description: '1 lâmpada, 3 interruptores',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '3 interruptores, 1 controla lâmpada. Outros dois não. Como descobrir em 2 idas?',
      answer: 'Ligar 1, esperar, ligar 2, ir',
      options: ['Ligar todos', 'Ligar 1, esperar, ligar 2, ir', 'Ir sem ligar', 'Impossível']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-15',
    title: 'Camelo e Bananas',
    description: '1000km, 3000 bananas, 1 camel',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: 'Camel carrega 1000 bananas, come 1 por km. 1000km até o mercado. Máximo de bananas?',
      answer: '533',
      options: ['500', '533', '600', '1000']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-16',
    title: 'Prisioneiros e Chapéus (100)',
    description: '100 prisioneiros, 1 fala, outros ouvem',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '100 prisioneiros, chapéus preto ou branco. O de trás vê 99. Pode falar uma palavra. Estratégia para salvar 99?',
      answer: 'Paridade',
      options: ['Impossível', 'Paridade', 'Cor do último', 'Silêncio']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-17',
    title: 'Dois Ovos',
    description: '100 andares, 2 ovos',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '100 andares. 2 ovos. Encontre andar crítico com menos quedas no pior caso.',
      answer: '14',
      options: ['10', '14', '20', '50']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-18',
    title: 'Falso entre Verdadeiros',
    description: '3 pessoas: 2 sempre verdade, 1 sempre mentira',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: 'A diz: "B é mentiroso". B diz: "C é mentiroso". C diz: "A e B são verdadeiros". Quem mente?',
      answer: 'C',
      options: ['A', 'B', 'C', 'Impossível']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-19',
    title: 'Cavalos e Apostas',
    description: '25 cavalos, 5 pistas, 3 corridas',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '25 cavalos. 5 pistas. 3 corridas. Encontre os 3 mais rápidos.',
      answer: 'Possível',
      options: ['Impossível', 'Possível', 'Só 2', '4 corridas']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-20',
    title: 'Riddle do Barco',
    description: 'Barco afundando, 10 pessoas',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: 'Barco leva 5. 10 pessoas: 5 homens, 5 mulheres. Só homens remam. Como todos atravessam?',
      answer: 'Homens vão e voltam',
      options: ['Impossível', 'Homens vão e voltam', 'Mulheres remam', 'Barco maior']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-21',
    title: 'Prisioneiro e Caixa',
    description: '100 caixas, 100 prisioneiros',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '100 caixas com nomes. Cada prisioneiro abre 50. Estratégia para todos encontrarem seu nome?',
      answer: 'Ciclo de caixas',
      options: ['Impossível', 'Ciclo de caixas', 'Aleatório', '50%']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-22',
    title: 'Três Deuses',
    description: 'Verdadeiro, Falso, Aleatório',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '3 deuses: Verdadeiro, Falso, Aleatório. Pergunta para identificar o caminho seguro?',
      answer: 'Perguntar ao Aleatório',
      options: ['Perguntar ao Verdadeiro', 'Perguntar ao Aleatório', 'Impossível', 'Qualquer']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-23',
    title: 'Peso das Moedas',
    description: '9 moedas, 1 falsa mais leve',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '9 moedas, 1 falsa mais leve. 2 pesagens. Encontre a falsa.',
      answer: 'Dividir em 3 grupos',
      options: ['Impossível', 'Dividir em 3 grupos', 'Pesar todas', '1 pesagem']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-24',
    title: 'Soma de Quadrados',
    description: '1² + 2² + ... + n²',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: 'Fórmula para soma dos quadrados?',
      answer: 'n(n+1)(2n+1)/6',
      options: ['n²(n+1)²/4', 'n(n+1)(2n+1)/6', 'n(n+1)/2', 'n³/3']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-25',
    title: 'Prisioneiro e 50 Portas',
    description: '50 portas, 1 prêmio',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '50 portas. Você escolhe 1. Host abre 48 com cabras. Trocar as 2 restantes?',
      answer: 'Sim, chance alta',
      options: ['Não', 'Sim, 50%', 'Sim, alta', 'Indiferente']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-26',
    title: 'Falso Positivo',
    description: 'Doença rara, teste 99% preciso',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '1% da população tem doença. Teste 99% preciso. Positivo → probabilidade real?',
      answer: '50%',
      options: ['99%', '50%', '90%', '1%']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-27',
    title: 'Três Caixas de Novo',
    description: 'Ouro, Prata, Vazio',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '3 caixas: Ouro, Prata, Vazio. Rotulos todos errados. Caixa "Ouro" tem?',
      answer: 'Prata',
      options: ['Ouro', 'Prata', 'Vazio', 'Aleatório']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-28',
    title: 'Cem Moedas',
    description: '50 caras, 50 rotuladas',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '100 moedas em 4 sacos. Um com 50 caras, um com 50 rotuladas, etc. Estratégia?',
      answer: 'Pegar do "Caras"',
      options: ['Aleatório', 'Pegar do "Caras"', 'Evitar rotuladas', 'Impossível']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-29',
    title: 'Barco com 3 Casais',
    description: 'Maridos ciumentos',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '3 casais. Barco leva 2. Marido não deixa esposa com outro homem. Como atravessar?',
      answer: 'Mulheres vão primeiro',
      options: ['Impossível', 'Mulheres vão primeiro', 'Homens remam', 'Barco maior']
    } as LogicMissionData
  },
  {
    id: 'hard-logic-30',
    title: 'O Último Sobrevivente',
    description: '100 pessoas em círculo',
    difficulty: 'hard',
    type: 'logic',
    xp: 35,
    gold: 25,
    data: {
      question: '100 pessoas em círculo. Matam a cada 2ª. Quem sobrevive?',
      answer: 'Posição 73',
      options: ['1', '50', '73', '100']
    } as LogicMissionData
  }
];