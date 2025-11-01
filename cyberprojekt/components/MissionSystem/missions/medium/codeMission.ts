// mediumCodeMissions.ts
import { Mission, CodeMissionData } from '../../types';

export const mediumCodeMissions: Mission[] = [
  {
    id: 'medium-code-1',
    title: 'Encontrar Maior',
    description: 'Encontre o maior número no array',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function encontrarMaior(numeros) {\n  let maior = numeros[0];\n  for (let i = 1; i < numeros.length; i++) {\n    \n  }\n  return maior;\n}`,
      correctCode: `function encontrarMaior(numeros) {\n  let maior = numeros[0];\n  for (let i = 1; i < numeros.length; i++) {\n    if (numeros[i] > maior) {\n      maior = numeros[i];\n    }\n  }\n  return maior;\n}`,
      language: 'javascript',
      description: 'Retorne o maior valor do array'
    } as CodeMissionData
  },
  {
    id: 'medium-code-2',
    title: 'Inverter String',
    description: 'Inverta uma string manualmente',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function inverterString(str) {\n  let invertida = '';\n  for (let i = str.length - 1; i >= 0; i--) {\n    \n  }\n  return invertida;\n}`,
      correctCode: `function inverterString(str) {\n  let invertida = '';\n  for (let i = str.length - 1; i >= 0; i--) {\n    invertida += str[i];\n  }\n  return invertida;\n}`,
      language: 'javascript',
      description: 'Use loop para inverter'
    } as CodeMissionData
  },
  {
    id: 'medium-code-3',
    title: 'Contar Vogais',
    description: 'Conte vogais (maiúsculas e minúsculas)',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function contarVogais(str) {\n  let count = 0;\n  const vogais = 'aeiouAEIOU';\n  for (let i = 0; i < str.length; i++) {\n    \n  }\n  return count;\n}`,
      correctCode: `function contarVogais(str) {\n  let count = 0;\n  const vogais = 'aeiouAEIOU';\n  for (let i = 0; i < str.length; i++) {\n    if (vogais.includes(str[i])) count++;\n  }\n  return count;\n}`,
      language: 'javascript',
      description: 'Retorne total de vogais'
    } as CodeMissionData
  },
  {
    id: 'medium-code-4',
    title: 'É Palíndromo?',
    description: 'Verifique se é palíndromo (ignore espaços e pontuação)',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function ehPalindromo(str) {\n  str = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  let esquerda = 0;\n  let direita = str.length - 1;\n  while (esquerda < direita) {\n    \n  }\n  return true;\n}`,
      correctCode: `function ehPalindromo(str) {\n  str = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  let esquerda = 0;\n  let direita = str.length - 1;\n  while (esquerda < direita) {\n    if (str[esquerda] !== str[direita]) return false;\n    esquerda++;\n    direita--;\n  }\n  return true;\n}`,
      language: 'javascript',
      description: 'Ex: "A man a plan" → true'
    } as CodeMissionData
  },
  {
    id: 'medium-code-5',
    title: 'Fatorial',
    description: 'Calcule fatorial com loop',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function fatorial(n) {\n  if (n === 0 || n === 1) return 1;\n  let res = 1;\n  for (let i = 2; i <= n; i++) {\n    \n  }\n  return res;\n}`,
      correctCode: `function fatorial(n) {\n  if (n === 0 || n === 1) return 1;\n  let res = 1;\n  for (let i = 2; i <= n; i++) {\n    res *= i;\n  }\n  return res;\n}`,
      language: 'javascript',
      description: '5! = 120'
    } as CodeMissionData
  },
  {
    id: 'medium-code-6',
    title: 'Remover Duplicatas',
    description: 'Remova duplicatas do array',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function removerDuplicatas(arr) {\n  let unico = [];\n  for (let i = 0; i < arr.length; i++) {\n    \n  }\n  return unico;\n}`,
      correctCode: `function removerDuplicatas(arr) {\n  let unico = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (!unico.includes(arr[i])) unico.push(arr[i]);\n  }\n  return unico;\n}`,
      language: 'javascript',
      description: 'Sem usar Set'
    } as CodeMissionData
  },
  {
    id: 'medium-code-7',
    title: 'Fibonacci',
    description: 'Gere n termos da sequência',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function fibonacci(n) {\n  let seq = [0, 1];\n  for (let i = 2; i < n; i++) {\n    \n  }\n  return seq.slice(0, n);\n}`,
      correctCode: `function fibonacci(n) {\n  let seq = [0, 1];\n  for (let i = 2; i < n; i++) {\n    seq.push(seq[i-1] + seq[i-2]);\n  }\n  return seq.slice(0, n);\n}`,
      language: 'javascript',
      description: 'n=6 → [0,1,1,2,3,5]'
    } as CodeMissionData
  },
  {
    id: 'medium-code-8',
    title: 'Somar Pares',
    description: 'Some apenas números pares',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function somarPares(arr) {\n  let soma = 0;\n  for (let i = 0; i < arr.length; i++) {\n    \n  }\n  return soma;\n}`,
      correctCode: `function somarPares(arr) {\n  let soma = 0;\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] % 2 === 0) soma += arr[i];\n  }\n  return soma;\n}`,
      language: 'javascript',
      description: 'Ignore ímpares'
    } as CodeMissionData
  },
  {
    id: 'medium-code-9',
    title: 'Contar Palavras',
    description: 'Conte palavras em uma frase',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function contarPalavras(frase) {\n  frase = frase.trim();\n  if (!frase) return 0;\n  return frase.split(' ').length;\n}`,
      correctCode: `function contarPalavras(frase) {\n  frase = frase.trim();\n  if (!frase) return 0;\n  return frase.split(' ').length;\n}`,
      language: 'javascript',
      description: 'Use split'
    } as CodeMissionData
  },
  {
    id: 'medium-code-10',
    title: 'Número Primo',
    description: 'Verifique se é primo',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function ehPrimo(n) {\n  if (n <= 1) return false;\n  for (let i = 2; i < n; i++) {\n    \n  }\n  return true;\n}`,
      correctCode: `function ehPrimo(n) {\n  if (n <= 1) return false;\n  for (let i = 2; i < n; i++) {\n    if (n % i === 0) return false;\n  }\n  return true;\n}`,
      language: 'javascript',
      description: '17 → true'
    } as CodeMissionData
  },
  {
    id: 'medium-code-11',
    title: 'Índice do Menor',
    description: 'Retorne o índice do menor valor',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function indiceMenor(arr) {\n  let menor = arr[0];\n  let indice = 0;\n  for (let i = 1; i < arr.length; i++) {\n    \n  }\n  return indice;\n}`,
      correctCode: `function indiceMenor(arr) {\n  let menor = arr[0];\n  let indice = 0;\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] < menor) {\n      menor = arr[i];\n      indice = i;\n    }\n  }\n  return indice;\n}`,
      language: 'javascript',
      description: '[3,1,4] → 1'
    } as CodeMissionData
  },
  {
    id: 'medium-code-12',
    title: 'Capitalizar Palavras',
    description: 'Capitalize cada palavra',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function capitalizar(frase) {\n  let palavras = frase.split(' ');\n  for (let i = 0; i < palavras.length; i++) {\n    \n  }\n  return palavras.join(' ');\n}`,
      correctCode: `function capitalizar(frase) {\n  let palavras = frase.split(' ');\n  for (let i = 0; i < palavras.length; i++) {\n    palavras[i] = palavras[i][0].toUpperCase() + palavras[i].slice(1).toLowerCase();\n  }\n  return palavras.join(' ');\n}`,
      language: 'javascript',
      description: '"olá mundo" → "Olá Mundo"'
    } as CodeMissionData
  },
  {
    id: 'medium-code-13',
    title: 'Contar Caracteres',
    description: 'Conte ocorrências de um caractere',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function contarCaractere(str, char) {\n  let count = 0;\n  for (let i = 0; i < str.length; i++) {\n    \n  }\n  return count;\n}`,
      correctCode: `function contarCaractere(str, char) {\n  let count = 0;\n  for (let i = 0; i < str.length; i++) {\n    if (str[i].toLowerCase() === char.toLowerCase()) count++;\n  }\n  return count;\n}`,
      language: 'javascript',
      description: 'Ignore maiúsculas'
    } as CodeMissionData
  },
  {
    id: 'medium-code-14',
    title: 'Array de Quadrados',
    description: 'Retorne array com quadrados',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function quadrados(arr) {\n  let resultado = [];\n  for (let i = 0; i < arr.length; i++) {\n    \n  }\n  return resultado;\n}`,
      correctCode: `function quadrados(arr) {\n  let resultado = [];\n  for (let i = 0; i < arr.length; i++) {\n    resultado.push(arr[i] * arr[i]);\n  }\n  return resultado;\n}`,
      language: 'javascript',
      description: '[1,2,3] → [1,4,9]'
    } as CodeMissionData
  },
  {
    id: 'medium-code-15',
    title: 'Maior Produto',
    description: 'Encontre dois números com maior produto',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function maiorProduto(arr) {\n  let max1 = -Infinity, max2 = -Infinity;\n  for (let num of arr) {\n    \n  }\n  return max1 * max2;\n}`,
      correctCode: `function maiorProduto(arr) {\n  let max1 = -Infinity, max2 = -Infinity;\n  for (let num of arr) {\n    if (num > max1) {\n      max2 = max1;\n      max1 = num;\n    } else if (num > max2) {\n      max2 = num;\n    }\n  }\n  return max1 * max2;\n}`,
      language: 'javascript',
      description: 'Dois maiores números'
    } as CodeMissionData
  },
  {
    id: 'medium-code-16',
    title: 'Filtrar Positivos',
    description: 'Retorne apenas números positivos',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function apenasPositivos(arr) {\n  let positivos = [];\n  for (let i = 0; i < arr.length; i++) {\n    \n  }\n  return positivos;\n}`,
      correctCode: `function apenasPositivos(arr) {\n  let positivos = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] > 0) positivos.push(arr[i]);\n  }\n  return positivos;\n}`,
      language: 'javascript',
      description: 'Ignora zero e negativos'
    } as CodeMissionData
  },
  {
    id: 'medium-code-17',
    title: 'Inverter Array',
    description: 'Inverta array sem reverse()',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function inverterArray(arr) {\n  let invertido = [];\n  for (let i = arr.length - 1; i >= 0; i--) {\n    \n  }\n  return invertido;\n}`,
      correctCode: `function inverterArray(arr) {\n  let invertido = [];\n  for (let i = arr.length - 1; i >= 0; i--) {\n    invertido.push(arr[i]);\n  }\n  return invertido;\n}`,
      language: 'javascript',
      description: 'Use loop'
    } as CodeMissionData
  },
  {
    id: 'medium-code-18',
    title: 'Soma dos Dígitos',
    description: 'Some os dígitos de um número',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function somaDigitos(n) {\n  let soma = 0;\n  let str = n.toString();\n  for (let i = 0; i < str.length; i++) {\n    \n  }\n  return soma;\n}`,
      correctCode: `function somaDigitos(n) {\n  let soma = 0;\n  let str = n.toString();\n  for (let i = 0; i < str.length; i++) {\n    soma += parseInt(str[i]);\n  }\n  return soma;\n}`,
      language: 'javascript',
      description: '123 → 6'
    } as CodeMissionData
  },
  {
    id: 'medium-code-19',
    title: 'Média do Array',
    description: 'Calcule a média dos elementos',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function media(arr) {\n  let soma = 0;\n  for (let i = 0; i < arr.length; i++) {\n    \n  }\n  return soma / arr.length;\n}`,
      correctCode: `function media(arr) {\n  let soma = 0;\n  for (let i = 0; i < arr.length; i++) {\n    soma += arr[i];\n  }\n  return soma / arr.length;\n}`,
      language: 'javascript',
      description: 'Retorne número'
    } as CodeMissionData
  },
  {
    id: 'medium-code-20',
    title: 'Contar Múltiplos',
    description: 'Conte múltiplos de 3 até n',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function contarMultiplosDe3(n) {\n  let count = 0;\n  for (let i = 1; i <= n; i++) {\n    \n  }\n  return count;\n}`,
      correctCode: `function contarMultiplosDe3(n) {\n  let count = 0;\n  for (let i = 1; i <= n; i++) {\n    if (i % 3 === 0) count++;\n  }\n  return count;\n}`,
      language: 'javascript',
      description: 'n=10 → 3'
    } as CodeMissionData
  },
  {
    id: 'medium-code-21',
    title: 'Array Ordenado?',
    description: 'Verifique se está ordenado',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function estaOrdenado(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    \n  }\n  return true;\n}`,
      correctCode: `function estaOrdenado(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] < arr[i-1]) return false;\n  }\n  return true;\n}`,
      language: 'javascript',
      description: 'Crescente'
    } as CodeMissionData
  },
  {
    id: 'medium-code-22',
    title: 'Juntar Arrays',
    description: 'Junte dois arrays sem duplicatas',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function juntarSemDuplicatas(a, b) {\n  let resultado = [...a];\n  for (let i = 0; i < b.length; i++) {\n    \n  }\n  return resultado;\n}`,
      correctCode: `function juntarSemDuplicatas(a, b) {\n  let resultado = [...a];\n  for (let i = 0; i < b.length; i++) {\n    if (!resultado.includes(b[i])) resultado.push(b[i]);\n  }\n  return resultado;\n}`,
      language: 'javascript',
      description: 'União'
    } as CodeMissionData
  },
  {
    id: 'medium-code-23',
    title: 'Maior Sequência',
    description: 'Encontre maior sequência crescente',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function maiorSequenciaCrescente(arr) {\n  let max = 1, atual = 1;\n  for (let i = 1; i < arr.length; i++) {\n    \n  }\n  return max;\n}`,
      correctCode: `function maiorSequenciaCrescente(arr) {\n  let max = 1, atual = 1;\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > arr[i-1]) {\n      atual++;\n      max = Math.max(max, atual);\n    } else {\n      atual = 1;\n    }\n  }\n  return max;\n}`,
      language: 'javascript',
      description: 'Tamanho da maior'
    } as CodeMissionData
  },
  {
    id: 'medium-code-24',
    title: 'Rotacionar Array',
    description: 'Rotacione array k posições',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function rotacionar(arr, k) {\n  k = k % arr.length;\n  let rotacionado = [];\n  for (let i = 0; i < arr.length; i++) {\n    \n  }\n  return rotacionado;\n}`,
      correctCode: `function rotacionar(arr, k) {\n  k = k % arr.length;\n  let rotacionado = [];\n  for (let i = 0; i < arr.length; i++) {\n    rotacionado[(i + k) % arr.length] = arr[i];\n  }\n  return rotacionado;\n}`,
      language: 'javascript',
      description: 'k=2, [1,2,3] → [2,3,1]'
    } as CodeMissionData
  },
  {
    id: 'medium-code-25',
    title: 'Contar Pares',
    description: 'Conte pares de números que somam target',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function contarParesSoma(arr, target) {\n  let count = 0;\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = i + 1; j < arr.length; j++) {\n      \n    }\n  }\n  return count;\n}`,
      correctCode: `function contarParesSoma(arr, target) {\n  let count = 0;\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[i] + arr[j] === target) count++;\n    }\n  }\n  return count;\n}`,
      language: 'javascript',
      description: 'Pares únicos'
    } as CodeMissionData
  },
  {
    id: 'medium-code-26',
    title: 'Substituir Espaços',
    description: 'Substitua espaços por %20',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function urlify(str) {\n  return str.trim().split(' ').join('%20');\n}`,
      correctCode: `function urlify(str) {\n  return str.trim().split(' ').join('%20');\n}`,
      language: 'javascript',
      description: '"Mr John Smith" → "Mr%20John%20Smith"'
    } as CodeMissionData
  },
  {
    id: 'medium-code-27',
    title: 'Array de Primos',
    description: 'Retorne primos até n',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function primosAte(n) {\n  let primos = [];\n  for (let i = 2; i <= n; i++) {\n    let ehPrimo = true;\n    for (let j = 2; j < i; j++) {\n      \n    }\n    if (ehPrimo) primos.push(i);\n  }\n  return primos;\n}`,
      correctCode: `function primosAte(n) {\n  let primos = [];\n  for (let i = 2; i <= n; i++) {\n    let ehPrimo = true;\n    for (let j = 2; j < i; j++) {\n      if (i % j === 0) {\n        ehPrimo = false;\n        break;\n      }\n    }\n    if (ehPrimo) primos.push(i);\n  }\n  return primos;\n}`,
      language: 'javascript',
      description: 'n=10 → [2,3,5,7]'
    } as CodeMissionData
  },
  {
    id: 'medium-code-28',
    title: 'Maior Palavra',
    description: 'Encontre a palavra mais longa',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function palavraMaisLonga(frase) {\n  let palavras = frase.split(' ');\n  let maior = '';\n  for (let palavra of palavras) {\n    \n  }\n  return maior;\n}`,
      correctCode: `function palavraMaisLonga(frase) {\n  let palavras = frase.split(' ');\n  let maior = '';\n  for (let palavra of palavras) {\n    if (palavra.length > maior.length) maior = palavra;\n  }\n  return maior;\n}`,
      language: 'javascript',
      description: 'Retorne string'
    } as CodeMissionData
  },
  {
    id: 'medium-code-29',
    title: 'Interseção',
    description: 'Elementos comuns entre arrays',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function intersecao(a, b) {\n  let comum = [];\n  for (let item of a) {\n    \n  }\n  return comum;\n}`,
      correctCode: `function intersecao(a, b) {\n  let comum = [];\n  for (let item of a) {\n    if (b.includes(item) && !comum.includes(item)) comum.push(item);\n  }\n  return comum;\n}`,
      language: 'javascript',
      description: 'Sem duplicatas'
    } as CodeMissionData
  },
  {
    id: 'medium-code-30',
    title: 'Binário para Decimal',
    description: 'Converta binário para decimal',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function binarioParaDecimal(bin) {\n  let decimal = 0;\n  for (let i = 0; i < bin.length; i++) {\n    \n  }\n  return decimal;\n}`,
      correctCode: `function binarioParaDecimal(bin) {\n  let decimal = 0;\n  for (let i = 0; i < bin.length; i++) {\n    decimal += parseInt(bin[bin.length - 1 - i]) * Math.pow(2, i);\n  }\n  return decimal;\n}`,
      language: 'javascript',
      description: '"101" → 5'
    } as CodeMissionData
  },
  {
    id: 'medium-code-31',
    title: 'Remover Falsos',
    description: 'Remova valores falsy',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function removerFalsos(arr) {\n  let verdadeiros = [];\n  for (let item of arr) {\n    \n  }\n  return verdadeiros;\n}`,
      correctCode: `function removerFalsos(arr) {\n  let verdadeiros = [];\n  for (let item of arr) {\n    if (item) verdadeiros.push(item);\n  }\n  return verdadeiros;\n}`,
      language: 'javascript',
      description: '0, "", null, false → removidos'
    } as CodeMissionData
  },
  {
    id: 'medium-code-32',
    title: 'Contar Letras',
    description: 'Conte frequência de letras',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function contarLetras(str) {\n  let freq = {};\n  str = str.toLowerCase();\n  for (let char of str) {\n    \n  }\n  return freq;\n}`,
      correctCode: `function contarLetras(str) {\n  let freq = {};\n  str = str.toLowerCase();\n  for (let char of str) {\n    if (/[a-z]/.test(char)) {\n      freq[char] = (freq[char] || 0) + 1;\n    }\n  }\n  return freq;\n}`,
      language: 'javascript',
      description: 'Retorne objeto'
    } as CodeMissionData
  },
  {
    id: 'medium-code-33',
    title: 'Array Único',
    description: 'Remova duplicatas com Set',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function unico(arr) {\n  return Array.from(new Set(arr));\n}`,
      correctCode: `function unico(arr) {\n  return Array.from(new Set(arr));\n}`,
      language: 'javascript',
      description: 'Use Set'
    } as CodeMissionData
  },
  {
    id: 'medium-code-34',
    title: 'Soma Recursiva',
    description: 'Some array recursivamente',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function somaRecursiva(arr, i = 0) {\n  if (i >= arr.length) return 0;\n  return arr[i] + somaRecursiva(arr, i + 1);\n}`,
      correctCode: `function somaRecursiva(arr, i = 0) {\n  if (i >= arr.length) return 0;\n  return arr[i] + somaRecursiva(arr, i + 1);\n}`,
      language: 'javascript',
      description: 'Sem loop'
    } as CodeMissionData
  },
  {
    id: 'medium-code-35',
    title: 'Encontrar Duplicata',
    description: 'Retorne primeiro duplicado',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function primeiroDuplicado(arr) {\n  let visto = new Set();\n  for (let num of arr) {\n    \n  }\n  return -1;\n}`,
      correctCode: `function primeiroDuplicado(arr) {\n  let visto = new Set();\n  for (let num of arr) {\n    if (visto.has(num)) return num;\n    visto.add(num);\n  }\n  return -1;\n}`,
      language: 'javascript',
      description: 'Use Set'
    } as CodeMissionData
  },
  {
    id: 'medium-code-36',
    title: 'Array Rotacionado',
    description: 'Verifique se é rotação de outro',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function ehRotacao(a, b) {\n  if (a.length !== b.length) return false;\n  let concatenado = a.concat(a);\n  return concatenado.includes(b.join(','));\n}`,
      correctCode: `function ehRotacao(a, b) {\n  if (a.length !== b.length) return false;\n  let concatenado = a.concat(a);\n  return concatenado.join(',').includes(b.join(','));\n}`,
      language: 'javascript',
      description: '[1,2,3] e [2,3,1] → true'
    } as CodeMissionData
  },
  {
    id: 'medium-code-37',
    title: 'String Comprimida',
    description: 'Comprima string (aabbc → a2b2c1)',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function comprimir(str) {\n  let resultado = '';\n  let count = 1;\n  for (let i = 0; i < str.length; i++) {\n    \n  }\n  return resultado;\n}`,
      correctCode: `function comprimir(str) {\n  let resultado = '';\n  let count = 1;\n  for (let i = 0; i < str.length; i++) {\n    if (str[i] === str[i+1]) {\n      count++;\n    } else {\n      resultado += str[i] + count;\n      count = 1;\n    }\n  }\n  return resultado;\n}`,
      language: 'javascript',
      description: 'Repetições consecutivas'
    } as CodeMissionData
  },
  {
    id: 'medium-code-38',
    title: 'Subarray com Soma',
    description: 'Encontre subarray com soma k',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function subarraySoma(arr, k) {\n  let mapa = new Map();\n  let soma = 0;\n  for (let i = 0; i < arr.length; i++) {\n    \n  }\n  return false;\n}`,
      correctCode: `function subarraySoma(arr, k) {\n  let mapa = new Map();\n  let soma = 0;\n  mapa.set(0, -1);\n  for (let i = 0; i < arr.length; i++) {\n    soma += arr[i];\n    if (mapa.has(soma - k)) {\n      return [mapa.get(soma - k) + 1, i];\n    }\n    mapa.set(soma, i);\n  }\n  return false;\n}`,
      language: 'javascript',
      description: 'Retorne índices'
    } as CodeMissionData
  },
  {
    id: 'medium-code-39',
    title: 'Validador de Parênteses',
    description: 'Valide parênteses balanceados',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function parentesesValidos(str) {\n  let pilha = [];\n  const pares = { ')': '(', '}': '{', ']': '[' };\n  for (let char of str) {\n    \n  }\n  return pilha.length === 0;\n}`,
      correctCode: `function parentesesValidos(str) {\n  let pilha = [];\n  const pares = { ')': '(', '}': '{', ']': '[' };\n  for (let char of str) {\n    if ('({['.includes(char)) {\n      pilha.push(char);\n    } else if (pilha.length === 0 || pilha.pop() !== pares[char]) {\n      return false;\n    }\n  }\n  return pilha.length === 0;\n}`,
      language: 'javascript',
      description: '()[]{} → true'
    } as CodeMissionData
  },
  {
    id: 'medium-code-40',
    title: 'Anagrama',
    description: 'Verifique se são anagramas',
    difficulty: 'medium',
    type: 'code',
    xp: 25,
    gold: 15,
    data: {
      code: `function saoAnagramas(s1, s2) {\n  s1 = s1.toLowerCase().replace(/[^a-z]/g, '');\n  s2 = s2.toLowerCase().replace(/[^a-z]/g, '');\n  if (s1.length !== s2.length) return false;\n  let count = {};\n  for (let i = 0; i < s1.length; i++) {\n    \n  }\n  return true;\n}`,
      correctCode: `function saoAnagramas(s1, s2) {\n  s1 = s1.toLowerCase().replace(/[^a-z]/g, '');\n  s2 = s2.toLowerCase().replace(/[^a-z]/g, '');\n  if (s1.length !== s2.length) return false;\n  let count = {};\n  for (let i = 0; i < s1.length; i++) {\n    count[s1[i]] = (count[s1[i]] || 0) + 1;\n    count[s2[i]] = (count[s2[i]] || 0) - 1;\n  }\n  return Object.values(count).every(v => v === 0);\n}`,
      language: 'javascript',
      description: '"listen" e "silent" → true'
    } as CodeMissionData
  }
];