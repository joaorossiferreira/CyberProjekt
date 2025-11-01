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
  },
  {
    id: 'easy-code-4',
    title: 'Maior que Dez',
    description: 'Retorne true se o número for maior que 10',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function maiorQueDez(n) {\n  // Complete a função\n  return \n}`,
      correctCode: `function maiorQueDez(n) {\n  return n > 10;\n}`,
      language: 'javascript',
      description: 'Retorna true se n > 10, senão false'
    } as CodeMissionData
  },
  {
    id: 'easy-code-5',
    title: 'Cumprimento',
    description: 'Retorne "Olá, [nome]!"',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function saudacao(nome) {\n  // Complete a função\n  return \n}`,
      correctCode: `function saudacao(nome) {\n  return "Olá, " + nome + "!";\n}`,
      language: 'javascript',
      description: 'Retorne uma saudação com o nome'
    } as CodeMissionData
  },
  {
    id: 'easy-code-6',
    title: 'Dobro do Número',
    description: 'Retorne o dobro do número informado',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function dobro(n) {\n  // Complete a função\n  return \n}`,
      correctCode: `function dobro(n) {\n  return n * 2;\n}`,
      language: 'javascript',
      description: 'Retorne n multiplicado por 2'
    } as CodeMissionData
  },
  {
    id: 'easy-code-7',
    title: 'É Positivo?',
    description: 'Retorne true se o número for positivo',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function ehPositivo(n) {\n  // Complete a função\n  return \n}`,
      correctCode: `function ehPositivo(n) {\n  return n > 0;\n}`,
      language: 'javascript',
      description: 'Retorne true se n > 0'
    } as CodeMissionData
  },
  {
    id: 'easy-code-8',
    title: 'Tamanho da String',
    description: 'Retorne o comprimento da string',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function tamanho(str) {\n  // Complete a função\n  return \n}`,
      correctCode: `function tamanho(str) {\n  return str.length;\n}`,
      language: 'javascript',
      description: 'Retorne o número de caracteres'
    } as CodeMissionData
  },
  {
    id: 'easy-code-9',
    title: 'Maiúsculas',
    description: 'Converta a string para maiúsculas',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function maiusculas(str) {\n  // Complete a função\n  return \n}`,
      correctCode: `function maiusculas(str) {\n  return str.toUpperCase();\n}`,
      language: 'javascript',
      description: 'Retorne a string em letras maiúsculas'
    } as CodeMissionData
  },
  {
    id: 'easy-code-10',
    title: 'É Zero?',
    description: 'Retorne true se o número for zero',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function ehZero(n) {\n  // Complete a função\n  return \n}`,
      correctCode: `function ehZero(n) {\n  return n === 0;\n}`,
      language: 'javascript',
      description: 'Retorne true apenas se n for 0'
    } as CodeMissionData
  },
  {
    id: 'easy-code-11',
    title: 'Subtração',
    description: 'Retorne a subtração de b de a',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function subtrair(a, b) {\n  // Complete a função\n  return \n}`,
      correctCode: `function subtrair(a, b) {\n  return a - b;\n}`,
      language: 'javascript',
      description: 'Retorne a - b'
    } as CodeMissionData
  },
  {
    id: 'easy-code-12',
    title: 'Primeira Letra',
    description: 'Retorne o primeiro caractere da string',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function primeiraLetra(str) {\n  // Complete a função\n  return \n}`,
      correctCode: `function primeiraLetra(str) {\n  return str[0];\n}`,
      language: 'javascript',
      description: 'Retorne o caractere na posição 0'
    } as CodeMissionData
  },
  {
    id: 'easy-code-13',
    title: 'Multiplicação',
    description: 'Retorne o produto de dois números',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function multiplicar(a, b) {\n  // Complete a função\n  return \n}`,
      correctCode: `function multiplicar(a, b) {\n  return a * b;\n}`,
      language: 'javascript',
      description: 'Retorne a multiplicação de a e b'
    } as CodeMissionData
  },
  {
    id: 'easy-code-14',
    title: 'É Negativo?',
    description: 'Retorne true se o número for negativo',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function ehNegativo(n) {\n  // Complete a função\n  return \n}`,
      correctCode: `function ehNegativo(n) {\n  return n < 0;\n}`,
      language: 'javascript',
      description: 'Retorne true se n < 0'
    } as CodeMissionData
  },
  {
    id: 'easy-code-15',
    title: 'Última Letra',
    description: 'Retorne o último caractere da string',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function ultimaLetra(str) {\n  // Complete a função\n  return \n}`,
      correctCode: `function ultimaLetra(str) {\n  return str[str.length - 1];\n}`,
      language: 'javascript',
      description: 'Retorne o caractere final'
    } as CodeMissionData
  },
  {
    id: 'easy-code-16',
    title: 'Quadrado',
    description: 'Retorne o quadrado do número',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function quadrado(n) {\n  // Complete a função\n  return \n}`,
      correctCode: `function quadrado(n) {\n  return n * n;\n}`,
      language: 'javascript',
      description: 'Retorne n elevado ao quadrado'
    } as CodeMissionData
  },
  {
    id: 'easy-code-17',
    title: 'É String Vazia?',
    description: 'Retorne true se a string estiver vazia',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function estaVazia(str) {\n  // Complete a função\n  return \n}`,
      correctCode: `function estaVazia(str) {\n  return str === "";\n}`,
      language: 'javascript',
      description: 'Retorne true se str for vazia'
    } as CodeMissionData
  },
  {
    id: 'easy-code-18',
    title: 'Divisão',
    description: 'Retorne a divisão de a por b',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function dividir(a, b) {\n  // Complete a função\n  return \n}`,
      correctCode: `function dividir(a, b) {\n  return a / b;\n}`,
      language: 'javascript',
      description: 'Retorne a dividido por b'
    } as CodeMissionData
  },
  {
    id: 'easy-code-19',
    title: 'Arredondar',
    description: 'Arredonde o número para baixo',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function arredondarParaBaixo(n) {\n  // Complete a função\n  return \n}`,
      correctCode: `function arredondarParaBaixo(n) {\n  return Math.floor(n);\n}`,
      language: 'javascript',
      description: 'Use Math.floor()'
    } as CodeMissionData
  },
  {
    id: 'easy-code-20',
    title: 'É Número?',
    description: 'Retorne true se for um número',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function ehNumero(valor) {\n  // Complete a função\n  return \n}`,
      correctCode: `function ehNumero(valor) {\n  return typeof valor === 'number';\n}`,
      language: 'javascript',
      description: 'Use typeof'
    } as CodeMissionData
  },
  {
    id: 'easy-code-21',
    title: 'Inverter Sinal',
    description: 'Retorne o número com sinal invertido',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function inverterSinal(n) {\n  // Complete a função\n  return \n}`,
      correctCode: `function inverterSinal(n) {\n  return -n;\n}`,
      language: 'javascript',
      description: 'Multiplique por -1 ou use -n'
    } as CodeMissionData
  },
  {
    id: 'easy-code-22',
    title: 'Contém "a"',
    description: 'Retorne true se a string contém a letra "a"',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function contemA(str) {\n  // Complete a função\n  return \n}`,
      correctCode: `function contemA(str) {\n  return str.includes('a');\n}`,
      language: 'javascript',
      description: 'Use includes()'
    } as CodeMissionData
  },
  {
    id: 'easy-code-23',
    title: 'Trim',
    description: 'Remova espaços do início e fim',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function limparEspacos(str) {\n  // Complete a função\n  return \n}`,
      correctCode: `function limparEspacos(str) {\n  return str.trim();\n}`,
      language: 'javascript',
      description: 'Use trim()'
    } as CodeMissionData
  },
  {
    id: 'easy-code-24',
    title: 'Módulo',
    description: 'Retorne o resto da divisão de a por b',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function resto(a, b) {\n  // Complete a função\n  return \n}`,
      correctCode: `function resto(a, b) {\n  return a % b;\n}`,
      language: 'javascript',
      description: 'Use o operador %'
    } as CodeMissionData
  },
  {
    id: 'easy-code-25',
    title: 'É Maior de Idade?',
    description: 'Retorne true se idade >= 18',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function ehMaiorDeIdade(idade) {\n  // Complete a função\n  return \n}`,
      correctCode: `function ehMaiorDeIdade(idade) {\n  return idade >= 18;\n}`,
      language: 'javascript',
      description: 'Verifique se é maior ou igual a 18'
    } as CodeMissionData
  },
  {
    id: 'easy-code-26',
    title: 'Potência',
    description: 'Retorne base elevada a expoente',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function potencia(base, expoente) {\n  // Complete a função\n  return \n}`,
      correctCode: `function potencia(base, expoente) {\n  return Math.pow(base, expoente);\n}`,
      language: 'javascript',
      description: 'Use Math.pow()'
    } as CodeMissionData
  },
  {
    id: 'easy-code-27',
    title: 'Arredondar para Cima',
    description: 'Arredonde o número para cima',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function arredondarParaCima(n) {\n  // Complete a função\n  return \n}`,
      correctCode: `function arredondarParaCima(n) {\n  return Math.ceil(n);\n}`,
      language: 'javascript',
      description: 'Use Math.ceil()'
    } as CodeMissionData
  },
  {
    id: 'easy-code-28',
    title: 'É Par ou Ímpar',
    description: 'Retorne "par" ou "ímpar"',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function parOuImpar(n) {\n  // Complete a função\n  return \n}`,
      correctCode: `function parOuImpar(n) {\n  return n % 2 === 0 ? "par" : "ímpar";\n}`,
      language: 'javascript',
      description: 'Use operador ternário ou if'
    } as CodeMissionData
  },
  {
    id: 'easy-code-29',
    title: 'Repetir String',
    description: 'Repita a string 3 vezes',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function repetir(str) {\n  // Complete a função\n  return \n}`,
      correctCode: `function repetir(str) {\n  return str.repeat(3);\n}`,
      language: 'javascript',
      description: 'Use .repeat(3)'
    } as CodeMissionData
  },
  {
    id: 'easy-code-30',
    title: 'Raiz Quadrada',
    description: 'Retorne a raiz quadrada do número',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function raiz(n) {\n  // Complete a função\n  return \n}`,
      correctCode: `function raiz(n) {\n  return Math.sqrt(n);\n}`,
      language: 'javascript',
      description: 'Use Math.sqrt()'
    } as CodeMissionData
  },
  {
    id: 'easy-code-31',
    title: 'Primeiros 3 Caracteres',
    description: 'Retorne os 3 primeiros caracteres',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function primeirosTres(str) {\n  // Complete a função\n  return \n}`,
      correctCode: `function primeirosTres(str) {\n  return str.slice(0, 3);\n}`,
      language: 'javascript',
      description: 'Use slice(0, 3)'
    } as CodeMissionData
  },
  {
    id: 'easy-code-32',
    title: 'É Vogal?',
    description: 'Retorne true se for vogal (a, e, i, o, u)',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function ehVogal(letra) {\n  // Complete a função\n  return \n}`,
      correctCode: `function ehVogal(letra) {\n  return ['a','e','i','o','u'].includes(letra.toLowerCase());\n}`,
      language: 'javascript',
      description: 'Ignora maiúsculas'
    } as CodeMissionData
  },
  {
    id: 'easy-code-33',
    title: 'Valor Absoluto',
    description: 'Retorne o valor absoluto',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function absoluto(n) {\n  // Complete a função\n  return \n}`,
      correctCode: `function absoluto(n) {\n  return Math.abs(n);\n}`,
      language: 'javascript',
      description: 'Use Math.abs()'
    } as CodeMissionData
  },
  {
    id: 'easy-code-34',
    title: 'Começa com "JS"',
    description: 'Retorne true se começar com "JS"',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function comecaComJS(str) {\n  // Complete a função\n  return \n}`,
      correctCode: `function comecaComJS(str) {\n  return str.startsWith("JS");\n}`,
      language: 'javascript',
      description: 'Use startsWith()'
    } as CodeMissionData
  },
  {
    id: 'easy-code-35',
    title: 'Maior entre Dois',
    description: 'Retorne o maior dos dois números',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function maior(a, b) {\n  // Complete a função\n  return \n}`,
      correctCode: `function maior(a, b) {\n  return a > b ? a : b;\n}`,
      language: 'javascript',
      description: 'Use ternário ou Math.max'
    } as CodeMissionData
  },
  {
    id: 'easy-code-36',
    title: 'É Fim de Semana?',
    description: 'Retorne true se for sábado (6) ou domingo (0)',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function ehFimDeSemana(dia) {\n  // Complete a função\n  return \n}`,
      correctCode: `function ehFimDeSemana(dia) {\n  return dia === 0 || dia === 6;\n}`,
      language: 'javascript',
      description: 'dia é de 0 a 6 (domingo a sábado)'
    } as CodeMissionData
  },
  {
    id: 'easy-code-37',
    title: 'Converter para Número',
    description: 'Converta string para número',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function paraNumero(str) {\n  // Complete a função\n  return \n}`,
      correctCode: `function paraNumero(str) {\n  return Number(str);\n}`,
      language: 'javascript',
      description: 'Use Number()'
    } as CodeMissionData
  },
  {
    id: 'easy-code-38',
    title: 'É Letra?',
    description: 'Retorne true se for letra (a-z ou A-Z)',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function ehLetra(caractere) {\n  // Complete a função\n  return \n}`,
      correctCode: `function ehLetra(caractere) {\n  return /[a-zA-Z]/.test(caractere);\n}`,
      language: 'javascript',
      description: 'Use regex ou isNaN + typeof'
    } as CodeMissionData
  },
  {
    id: 'easy-code-39',
    title: 'Juntar com Hífen',
    description: 'Junte duas strings com hífen',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function juntarComHifen(a, b) {\n  // Complete a função\n  return \n}`,
      correctCode: `function juntarComHifen(a, b) {\n  return a + "-" + b;\n}`,
      language: 'javascript',
      description: 'Ex: "ola" + "mundo" → "ola-mundo"'
    } as CodeMissionData
  },
  {
    id: 'easy-code-40',
    title: 'Arredondar Normal',
    description: 'Arredonde para o inteiro mais próximo',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function arredondar(n) {\n  // Complete a função\n  return \n}`,
      correctCode: `function arredondar(n) {\n  return Math.round(n);\n}`,
      language: 'javascript',
      description: 'Use Math.round()'
    } as CodeMissionData
  },
  {
    id: 'easy-code-41',
    title: 'É Múltiplo de 3?',
    description: 'Retorne true se for múltiplo de 3',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function multiploDeTres(n) {\n  // Complete a função\n  return \n}`,
      correctCode: `function multiploDeTres(n) {\n  return n % 3 === 0;\n}`,
      language: 'javascript',
      description: 'Use % 3'
    } as CodeMissionData
  },
  {
    id: 'easy-code-42',
    title: 'Substituir "a" por "x"',
    description: 'Substitua todas as letras "a" por "x"',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function substituirA(str) {\n  // Complete a função\n  return \n}`,
      correctCode: `function substituirA(str) {\n  return str.replace(/a/g, 'x');\n}`,
      language: 'javascript',
      description: 'Use replace com regex'
    } as CodeMissionData
  },
  {
    id: 'easy-code-43',
    title: 'É Falso?',
    description: 'Retorne true se o valor for falsy',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function ehFalsy(valor) {\n  // Complete a função\n  return \n}`,
      correctCode: `function ehFalsy(valor) {\n  return !valor;\n}`,
      language: 'javascript',
      description: 'Use negação'
    } as CodeMissionData
  },
  {
    id: 'easy-code-44',
    title: 'Tamanho ≥ 5?',
    description: 'Retorne true se a string tiver 5 ou mais caracteres',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function grande(str) {\n  // Complete a função\n  return \n}`,
      correctCode: `function grande(str) {\n  return str.length >= 5;\n}`,
      language: 'javascript',
      description: 'Use .length'
    } as CodeMissionData
  },
  {
    id: 'easy-code-45',
    title: 'Soma de Três',
    description: 'Retorne a soma de três números',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function somaTres(a, b, c) {\n  // Complete a função\n  return \n}`,
      correctCode: `function somaTres(a, b, c) {\n  return a + b + c;\n}`,
      language: 'javascript',
      description: 'Some os três parâmetros'
    } as CodeMissionData
  },
  {
    id: 'easy-code-46',
    title: 'É Array?',
    description: 'Retorne true se for um array',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function ehArray(valor) {\n  // Complete a função\n  return \n}`,
      correctCode: `function ehArray(valor) {\n  return Array.isArray(valor);\n}`,
      language: 'javascript',
      description: 'Use Array.isArray()'
    } as CodeMissionData
  },
  {
    id: 'easy-code-47',
    title: 'Primeiro Elemento',
    description: 'Retorne o primeiro elemento do array',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function primeiro(arr) {\n  // Complete a função\n  return \n}`,
      correctCode: `function primeiro(arr) {\n  return arr[0];\n}`,
      language: 'javascript',
      description: 'Acesse índice 0'
    } as CodeMissionData
  },
  {
    id: 'easy-code-48',
    title: 'Último Elemento',
    description: 'Retorne o último elemento do array',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function ultimo(arr) {\n  // Complete a função\n  return \n}`,
      correctCode: `function ultimo(arr) {\n  return arr[arr.length - 1];\n}`,
      language: 'javascript',
      description: 'Use arr.length - 1'
    } as CodeMissionData
  },
  {
    id: 'easy-code-49',
    title: 'Adicionar no Fim',
    description: 'Retorne o array com um novo item no final',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function adicionarFim(arr, item) {\n  // Complete a função\n  return [...arr, item];\n}`,
      correctCode: `function adicionarFim(arr, item) {\n  return [...arr, item];\n}`,
      language: 'javascript',
      description: 'Use spread operator'
    } as CodeMissionData
  },
  {
    id: 'easy-code-50',
    title: 'É Verdadeiro?',
    description: 'Retorne true se o valor for truthy',
    difficulty: 'easy',
    type: 'code',
    xp: 15,
    gold: 8,
    data: {
      code: `function ehTruthy(valor) {\n  // Complete a função\n  return \n}`,
      correctCode: `function ehTruthy(valor) {\n  return !!valor;\n}`,
      language: 'javascript',
      description: 'Use dupla negação'
    } as CodeMissionData
  }
];