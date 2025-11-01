// hardCodeMissions.ts
import { Mission, CodeMissionData } from '../../types';

export const hardCodeMissions: Mission[] = [
  {
    id: 'hard-code-1',
    title: 'Fibonacci Recursivo',
    description: 'Implemente Fibonacci com recursão',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function fibonacci(n) {\n  // Retorne o n-ésimo termo\n}`,
      correctCode: `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
      language: 'javascript',
      description: 'n=6 → 8'
    } as CodeMissionData
  },
  {
    id: 'hard-code-2',
    title: 'Bubble Sort',
    description: 'Implemente ordenação por bolha',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function bubbleSort(arr) {\n  // Ordene em ordem crescente\n}`,
      correctCode: `function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}`,
      language: 'javascript',
      description: 'Use troca direta'
    } as CodeMissionData
  },
  {
    id: 'hard-code-3',
    title: 'Busca Binária',
    description: 'Implemente busca binária iterativa',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function buscaBinaria(arr, alvo) {\n  let esquerda = 0;\n  let direita = arr.length - 1;\n  while (esquerda <= direita) {\n    \n  }\n  return -1;\n}`,
      correctCode: `function buscaBinaria(arr, alvo) {\n  let esquerda = 0;\n  let direita = arr.length - 1;\n  while (esquerda <= direita) {\n    let meio = Math.floor((esquerda + direita) / 2);\n    if (arr[meio] === alvo) return meio;\n    if (arr[meio] < alvo) esquerda = meio + 1;\n    else direita = meio - 1;\n  }\n  return -1;\n}`,
      language: 'javascript',
      description: 'Array ordenado'
    } as CodeMissionData
  },
  {
    id: 'hard-code-4',
    title: 'Quick Sort',
    description: 'Implemente Quick Sort recursivo',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  let pivo = arr[0];\n  let esquerda = [];\n  let direita = [];\n  for (let i = 1; i < arr.length; i++) {\n    \n  }\n  return [...quickSort(esquerda), pivo, ...quickSort(direita)];\n}`,
      correctCode: `function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  let pivo = arr[0];\n  let esquerda = [];\n  let direita = [];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] < pivo) esquerda.push(arr[i]);\n    else direita.push(arr[i]);\n  }\n  return [...quickSort(esquerda), pivo, ...quickSort(direita)];\n}`,
      language: 'javascript',
      description: 'Pivô é o primeiro'
    } as CodeMissionData
  },
  {
    id: 'hard-code-5',
    title: 'Validação de Parênteses',
    description: 'Use pilha para validar balanceamento',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function parentesesValidos(str) {\n  let pilha = [];\n  const pares = { ')': '(', '}': '{', ']': '[' };\n  for (let char of str) {\n    \n  }\n  return pilha.length === 0;\n}`,
      correctCode: `function parentesesValidos(str) {\n  let pilha = [];\n  const pares = { ')': '(', '}': '{', ']': '[' };\n  for (let char of str) {\n    if ('({['.includes(char)) pilha.push(char);\n    else if (pilha.length === 0 || pilha.pop() !== pares[char]) return false;\n  }\n  return pilha.length === 0;\n}`,
      language: 'javascript',
      description: '()[]{} → true'
    } as CodeMissionData
  },
  {
    id: 'hard-code-6',
    title: 'Subarray Máximo (Kadane)',
    description: 'Encontre subarray com soma máxima',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function subarrayMaxSoma(arr) {\n  let maxAtual = arr[0];\n  let maxGlobal = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    \n  }\n  return maxGlobal;\n}`,
      correctCode: `function subarrayMaxSoma(arr) {\n  let maxAtual = arr[0];\n  let maxGlobal = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    maxAtual = Math.max(arr[i], maxAtual + arr[i]);\n    maxGlobal = Math.max(maxGlobal, maxAtual);\n  }\n  return maxGlobal;\n}`,
      language: 'javascript',
      description: '[-2,1,-3,4] → 4'
    } as CodeMissionData
  },
  {
    id: 'hard-code-7',
    title: 'Merge Sort',
    description: 'Implemente Merge Sort completo',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  let meio = Math.floor(arr.length / 2);\n  let esquerda = mergeSort(arr.slice(0, meio));\n  let direita = mergeSort(arr.slice(meio));\n  return merge(esquerda, direita);\n}\nfunction merge(e, d) {\n  let resultado = [];\n  let i = 0, j = 0;\n  while (i < e.length && j < d.length) {\n    \n  }\n  return resultado.concat(e.slice(i)).concat(d.slice(j));\n}`,
      correctCode: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  let meio = Math.floor(arr.length / 2);\n  let esquerda = mergeSort(arr.slice(0, meio));\n  let direita = mergeSort(arr.slice(meio));\n  return merge(esquerda, direita);\n}\nfunction merge(e, d) {\n  let resultado = [];\n  let i = 0, j = 0;\n  while (i < e.length && j < d.length) {\n    if (e[i] <= d[j]) resultado.push(e[i++]);\n    else resultado.push(d[j++]);\n  }\n  return resultado.concat(e.slice(i)).concat(d.slice(j));\n}`,
      language: 'javascript',
      description: 'Dividir e conquistar'
    } as CodeMissionData
  },
  {
    id: 'hard-code-8',
    title: 'Permutações de String',
    description: 'Gere todas as permutações',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function permutacoes(str) {\n  if (str.length <= 1) return [str];\n  let resultado = [];\n  for (let i = 0; i < str.length; i++) {\n    \n  }\n  return resultado;\n}`,
      correctCode: `function permutacoes(str) {\n  if (str.length <= 1) return [str];\n  let resultado = [];\n  for (let i = 0; i < str.length; i++) {\n    let char = str[i];\n    let resto = str.slice(0, i) + str.slice(i + 1);\n    for (let p of permutacoes(resto)) {\n      resultado.push(char + p);\n    }\n  }\n  return resultado;\n}`,
      language: 'javascript',
      description: '"ab" → ["ab","ba"]'
    } as CodeMissionData
  },
  {
    id: 'hard-code-9',
    title: 'Árvore Binária - Inorder',
    description: 'Travessia inorder recursiva',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `class No { constructor(valor) { this.valor = valor; this.esq = null; this.dir = null; } }\nfunction inorder(raiz, resultado = []) {\n  if (!raiz) return resultado;\n  \n  return resultado;\n}`,
      correctCode: `class No { constructor(valor) { this.valor = valor; this.esq = null; this.dir = null; } }\nfunction inorder(raiz, resultado = []) {\n  if (!raiz) return resultado;\n  inorder(raiz.esq, resultado);\n  resultado.push(raiz.valor);\n  inorder(raiz.dir, resultado);\n  return resultado;\n}`,
      language: 'javascript',
      description: 'Esq → Raiz → Dir'
    } as CodeMissionData
  },
  {
    id: 'hard-code-10',
    title: 'Dijkstra Simples',
    description: 'Menor caminho em grafo',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function dijkstra(grafo, inicio) {\n  let dist = {};\n  let visitado = new Set();\n  for (let no in grafo) dist[no] = Infinity;\n  dist[inicio] = 0;\n  while (visitado.size < Object.keys(grafo).length) {\n    \n  }\n  return dist;\n}`,
      correctCode: `function dijkstra(grafo, inicio) {\n  let dist = {};\n  let visitado = new Set();\n  for (let no in grafo) dist[no] = Infinity;\n  dist[inicio] = 0;\n  while (visitado.size < Object.keys(grafo).length) {\n    let minNo = null;\n    for (let no in grafo) {\n      if (!visitado.has(no) && (minNo === null || dist[no] < dist[minNo])) minNo = no;\n    }\n    if (minNo === null) break;\n    visitado.add(minNo);\n    for (let vizinho in grafo[minNo]) {\n      let novaDist = dist[minNo] + grafo[minNo][vizinho];\n      if (novaDist < dist[vizinho]) dist[vizinho] = novaDist;\n    }\n  }\n  return dist;\n}`,
      language: 'javascript',
      description: 'Grafo como objeto'
    } as CodeMissionData
  },
  {
    id: 'hard-code-11',
    title: 'LRU Cache',
    description: 'Implemente cache com ordem de uso',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `class LRUCache {\n  constructor(capacidade) {\n    this.capacidade = capacidade;\n    this.cache = new Map();\n  }\n  get(chave) {\n    \n  }\n  put(chave, valor) {\n    \n  }\n}`,
      correctCode: `class LRUCache {\n  constructor(capacidade) {\n    this.capacidade = capacidade;\n    this.cache = new Map();\n  }\n  get(chave) {\n    if (!this.cache.has(chave)) return -1;\n    let valor = this.cache.get(chave);\n    this.cache.delete(chave);\n    this.cache.set(chave, valor);\n    return valor;\n  }\n  put(chave, valor) {\n    if (this.cache.has(chave)) this.cache.delete(chave);\n    this.cache.set(chave, valor);\n    if (this.cache.size > this.capacidade) {\n      let primeira = this.cache.keys().next().value;\n      this.cache.delete(primeira);\n    }\n  }\n}`,
      language: 'javascript',
      description: 'Use Map'
    } as CodeMissionData
  },
  {
    id: 'hard-code-12',
    title: 'Subarray com Soma K',
    description: 'Retorne índices do subarray',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function subarraySoma(arr, k) {\n  let mapa = new Map();\n  let soma = 0;\n  mapa.set(0, -1);\n  for (let i = 0; i < arr.length; i++) {\n    \n  }\n  return null;\n}`,
      correctCode: `function subarraySoma(arr, k) {\n  let mapa = new Map();\n  let soma = 0;\n  mapa.set(0, -1);\n  for (let i = 0; i < arr.length; i++) {\n    soma += arr[i];\n    if (mapa.has(soma - k)) return [mapa.get(soma - k) + 1, i];\n    mapa.set(soma, i);\n  }\n  return null;\n}`,
      language: 'javascript',
      description: 'Soma contígua'
    } as CodeMissionData
  },
  {
    id: 'hard-code-13',
    title: 'Árvore AVL - Inserção',
    description: 'Balanceamento básico',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `class NoAVL { constructor(valor) { this.valor = valor; this.esq = null; this.dir = null; this.altura = 1; } }\nfunction inserir(raiz, valor) {\n  if (!raiz) return new NoAVL(valor);\n  \n  return balancear(raiz);\n}`,
      correctCode: `class NoAVL { constructor(valor) { this.valor = valor; this.esq = null; this.dir = null; this.altura = 1; } }\nfunction inserir(raiz, valor) {\n  if (!raiz) return new NoAVL(valor);\n  if (valor < raiz.valor) raiz.esq = inserir(raiz.esq, valor);\n  else if (valor > raiz.valor) raiz.dir = inserir(raiz.dir, valor);\n  else return raiz;\n  raiz.altura = 1 + Math.max(altura(raiz.esq), altura(raiz.dir));\n  return balancear(raiz);\n}\nfunction altura(no) { return no ? no.altura : 0; }\nfunction balancear(raiz) { /* simplificado */ return raiz; }`,
      language: 'javascript',
      description: 'Base para AVL'
    } as CodeMissionData
  },
  {
    id: 'hard-code-14',
    title: 'Trie - Inserir e Buscar',
    description: 'Estrutura de prefixo',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `class TrieNode { constructor() { this.filhos = {}; this.fim = false; } }\nclass Trie {\n  constructor() { this.raiz = new TrieNode(); }\n  inserir(palavra) {\n    \n  }\n  buscar(palavra) {\n    \n  }\n}`,
      correctCode: `class TrieNode { constructor() { this.filhos = {}; this.fim = false; } }\nclass Trie {\n  constructor() { this.raiz = new TrieNode(); }\n  inserir(palavra) {\n    let no = this.raiz;\n    for (let char of palavra) {\n      if (!no.filhos[char]) no.filhos[char] = new TrieNode();\n      no = no.filhos[char];\n    }\n    no.fim = true;\n  }\n  buscar(palavra) {\n    let no = this.raiz;\n    for (let char of palavra) {\n      if (!no.filhos[char]) return false;\n      no = no.filhos[char];\n    }\n    return no.fim;\n  }\n}`,
      language: 'javascript',
      description: 'Busca por prefixo'
    } as CodeMissionData
  },
  {
    id: 'hard-code-15',
    title: 'Heap Mínimo',
    description: 'Implemente heap mínimo',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `class MinHeap {\n  constructor() { this.heap = []; }\n  inserir(valor) {\n    \n  }\n  extrairMin() {\n    \n  }\n}`,
      correctCode: `class MinHeap {\n  constructor() { this.heap = []; }\n  inserir(valor) {\n    this.heap.push(valor);\n    this.subir(this.heap.length - 1);\n  }\n  extrairMin() {\n    if (this.heap.length === 0) return null;\n    if (this.heap.length === 1) return this.heap.pop();\n    let min = this.heap[0];\n    this.heap[0] = this.heap.pop();\n    this.descer(0);\n    return min;\n  }\n  subir(i) {\n    while (i > 0) {\n      let pai = Math.floor((i - 1) / 2);\n      if (this.heap[i] >= this.heap[pai]) break;\n      [this.heap[i], this.heap[pai]] = [this.heap[pai], this.heap[i]];\n      i = pai;\n    }\n  }\n  descer(i) {\n    let n = this.heap.length;\n    while (true) {\n      let menor = i;\n      let esq = 2 * i + 1;\n      let dir = 2 * i + 2;\n      if (esq < n && this.heap[esq] < this.heap[menor]) menor = esq;\n      if (dir < n && this.heap[dir] < this.heap[menor]) menor = dir;\n      if (menor === i) break;\n      [this.heap[i], this.heap[menor]] = [this.heap[menor], this.heap[i]];\n      i = menor;\n    }\n  }\n}`,
      language: 'javascript',
      description: 'Heap binário'
    } as CodeMissionData
  },
  {
    id: 'hard-code-16',
    title: 'Grafo - Ciclo',
    description: 'Detecte ciclo em grafo direcionado',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function temCiclo(grafo) {\n  let visitado = new Set();\n  let recStack = new Set();\n  for (let no in grafo) {\n    \n  }\n  return false;\n}`,
      correctCode: `function temCiclo(grafo) {\n  let visitado = new Set();\n  let recStack = new Set();\n  function dfs(no) {\n    visitado.add(no);\n    recStack.add(no);\n    for (let vizinho of grafo[no] || []) {\n      if (!visitado.has(vizinho) && dfs(vizinho)) return true;\n      if (recStack.has(vizinho)) return true;\n    }\n    recStack.delete(no);\n    return false;\n  }\n  for (let no in grafo) {\n    if (!visitado.has(no) && dfs(no)) return true;\n  }\n  return false;\n}`,
      language: 'javascript',
      description: 'DFS com pilha de recursão'
    } as CodeMissionData
  },
  {
    id: 'hard-code-17',
    title: 'Editar Distância',
    description: 'Distância de Levenshtein',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function distanciaEdicao(s1, s2) {\n  let dp = Array(s1.length + 1).fill().map(() => Array(s2.length + 1).fill(0));\n  for (let i = 0; i <= s1.length; i++) dp[i][0] = i;\n  for (let j = 0; j <= s2.length; j++) dp[0][j] = j;\n  for (let i = 1; i <= s1.length; i++) {\n    for (let j = 1; j <= s2.length; j++) {\n      \n    }\n  }\n  return dp[s1.length][s2.length];\n}`,
      correctCode: `function distanciaEdicao(s1, s2) {\n  let dp = Array(s1.length + 1).fill().map(() => Array(s2.length + 1).fill(0));\n  for (let i = 0; i <= s1.length; i++) dp[i][0] = i;\n  for (let j = 0; j <= s2.length; j++) dp[0][j] = j;\n  for (let i = 1; i <= s1.length; i++) {\n    for (let j = 1; j <= s2.length; j++) {\n      let custo = s1[i-1] === s2[j-1] ? 0 : 1;\n      dp[i][j] = Math.min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + custo);\n    }\n  }\n  return dp[s1.length][s2.length];\n}`,
      language: 'javascript',
      description: 'Inserir, deletar, substituir'
    } as CodeMissionData
  },
  {
    id: 'hard-code-18',
    title: 'Knapsack 0/1',
    description: 'Problema da mochila',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function knapsack(pesos, valores, capacidade) {\n  let n = pesos.length;\n  let dp = Array(n + 1).fill().map(() => Array(capacidade + 1).fill(0));\n  for (let i = 1; i <= n; i++) {\n    for (let w = 0; w <= capacidade; w++) {\n      \n    }\n  }\n  return dp[n][capacidade];\n}`,
      correctCode: `function knapsack(pesos, valores, capacidade) {\n  let n = pesos.length;\n  let dp = Array(n + 1).fill().map(() => Array(capacidade + 1).fill(0));\n  for (let i = 1; i <= n; i++) {\n    for (let w = 0; w <= capacidade; w++) {\n      if (pesos[i-1] <= w) {\n        dp[i][w] = Math.max(dp[i-1][w], dp[i-1][w - pesos[i-1]] + valores[i-1]);\n      } else {\n        dp[i][w] = dp[i-1][w];\n      }\n    }\n  }\n  return dp[n][capacidade];\n}`,
      language: 'javascript',
      description: 'Programação dinâmica'
    } as CodeMissionData
  },
  {
    id: 'hard-code-19',
    title: 'Topological Sort',
    description: 'Ordenação topológica',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function topologicalSort(grafo) {\n  let visitado = new Set();\n  let resultado = [];\n  function dfs(no) {\n    \n  }\n  for (let no in grafo) {\n    \n  }\n  return resultado.reverse();\n}`,
      correctCode: `function topologicalSort(grafo) {\n  let visitado = new Set();\n  let resultado = [];\n  function dfs(no) {\n    visitado.add(no);\n    for (let vizinho of grafo[no] || []) {\n      if (!visitado.has(vizinho)) dfs(vizinho);\n    }\n    resultado.push(no);\n  }\n  for (let no in grafo) {\n    if (!visitado.has(no)) dfs(no);\n  }\n  return resultado.reverse();\n}`,
      language: 'javascript',
      description: 'DAG'
    } as CodeMissionData
  },
  {
    id: 'hard-code-20',
    title: 'N-Queens',
    description: 'Coloque N rainhas sem ataque',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function resolverNQueens(n) {\n  let tabuleiro = Array(n).fill().map(() => Array(n).fill('.'));\n  let resultado = [];\n  function backtrack(linha, colunas, diag1, diag2) {\n    \n  }\n  backtrack(0, new Set(), new Set(), new Set());\n  return resultado;\n}`,
      correctCode: `function resolverNQueens(n) {\n  let tabuleiro = Array(n).fill().map(() => Array(n).fill('.'));\n  let resultado = [];\n  function backtrack(linha, colunas, diag1, diag2) {\n    if (linha === n) {\n      resultado.push(tabuleiro.map(linha => linha.join('')));\n      return;\n    }\n    for (let col = 0; col < n; col++) {\n      if (colunas.has(col) || diag1.has(linha - col) || diag2.has(linha + col)) continue;\n      tabuleiro[linha][col] = 'Q';\n      colunas.add(col);\n      diag1.add(linha - col);\n      diag2.add(linha + col);\n      backtrack(linha + 1, colunas, diag1, diag2);\n      tabuleiro[linha][col] = '.';\n      colunas.delete(col);\n      diag1.delete(linha - col);\n      diag2.delete(linha + col);\n    }\n  }\n  backtrack(0, new Set(), new Set(), new Set());\n  return resultado;\n}`,
      language: 'javascript',
      description: 'Backtracking'
    } as CodeMissionData
  },
  {
    id: 'hard-code-21',
    title: 'Segment Tree',
    description: 'Soma em intervalo',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `class SegmentTree {\n  constructor(arr) {\n    this.n = arr.length;\n    this.arvore = new Array(4 * this.n);\n    this.construir(arr, 0, 0, this.n - 1);\n  }\n  construir(arr, no, inicio, fim) {\n    \n  }\n  query(esq, dir) {\n    \n  }\n}`,
      correctCode: `class SegmentTree {\n  constructor(arr) {\n    this.n = arr.length;\n    this.arvore = new Array(4 * this.n);\n    this.construir(arr, 0, 0, this.n - 1);\n  }\n  construir(arr, no, inicio, fim) {\n    if (inicio === fim) {\n      this.arvore[no] = arr[inicio];\n      return;\n    }\n    let meio = Math.floor((inicio + fim) / 2);\n    this.construir(arr, 2*no+1, inicio, meio);\n    this.construir(arr, 2*no+2, meio+1, fim);\n    this.arvore[no] = this.arvore[2*no+1] + this.arvore[2*no+2];\n  }\n  query(esq, dir) {\n    return this._query(0, 0, this.n-1, esq, dir);\n  }\n  _query(no, inicio, fim, esq, dir) {\n    if (esq > fim || dir < inicio) return 0;\n    if (esq <= inicio && fim <= dir) return this.arvore[no];\n    let meio = Math.floor((inicio + fim) / 2);\n    return this._query(2*no+1, inicio, meio, esq, dir) + this._query(2*no+2, meio+1, fim, esq, dir);\n  }\n}`,
      language: 'javascript',
      description: 'Árvore de segmentos'
    } as CodeMissionData
  },
  {
    id: 'hard-code-22',
    title: 'Union-Find com Rank',
    description: 'Estrutura de conjuntos disjuntos',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `class UnionFind {\n  constructor(n) {\n    this.pai = Array(n).fill().map((_, i) => i);\n    this.rank = Array(n).fill(0);\n  }\n  find(x) {\n    \n  }\n  union(x, y) {\n    \n  }\n}`,
      correctCode: `class UnionFind {\n  constructor(n) {\n    this.pai = Array(n).fill().map((_, i) => i);\n    this.rank = Array(n).fill(0);\n  }\n  find(x) {\n    if (this.pai[x] !== x) this.pai[x] = this.find(this.pai[x]);\n    return this.pai[x];\n  }\n  union(x, y) {\n    let raizX = this.find(x);\n    let raizY = this.find(y);\n    if (raizX === raizY) return;\n    if (this.rank[raizX] < this.rank[raizY]) [raizX, raizY] = [raizY, raizX];\n    this.pai[raizY] = raizX;\n    if (this.rank[raizX] === this.rank[raizY]) this.rank[raizX]++;\n  }\n}`,
      language: 'javascript',
      description: 'Path compression + rank'
    } as CodeMissionData
  },
  {
    id: 'hard-code-23',
    title: 'Bellman-Ford',
    description: 'Menor caminho com pesos negativos',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function bellmanFord(arestas, vertices, inicio) {\n  let dist = {};\n  for (let i = 0; i < vertices; i++) dist[i] = Infinity;\n  dist[inicio] = 0;\n  for (let i = 0; i < vertices - 1; i++) {\n    \n  }\n  return dist;\n}`,
      correctCode: `function bellmanFord(arestas, vertices, inicio) {\n  let dist = {};\n  for (let i = 0; i < vertices; i++) dist[i] = Infinity;\n  dist[inicio] = 0;\n  for (let i = 0; i < vertices - 1; i++) {\n    for (let [u, v, peso] of arestas) {\n      if (dist[u] + peso < dist[v]) dist[v] = dist[u] + peso;\n    }\n  }\n  return dist;\n}`,
      language: 'javascript',
      description: 'Detecta ciclo negativo'
    } as CodeMissionData
  },
  {
    id: 'hard-code-24',
    title: 'Floyd-Warshall',
    description: 'Todos os pares de menor caminho',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function floydWarshall(grafo) {\n  let n = grafo.length;\n  let dist = grafo.map(linha => linha.slice());\n  for (let k = 0; k < n; k++) {\n    for (let i = 0; i < n; i++) {\n      for (let j = 0; j < n; j++) {\n        \n      }\n    }\n  }\n  return dist;\n}`,
      correctCode: `function floydWarshall(grafo) {\n  let n = grafo.length;\n  let dist = grafo.map(linha => linha.slice());\n  for (let k = 0; k < n; k++) {\n    for (let i = 0; i < n; i++) {\n      for (let j = 0; j < n; j++) {\n        if (dist[i][k] + dist[k][j] < dist[i][j]) {\n          dist[i][j] = dist[i][k] + dist[k][j];\n        }\n      }\n    }\n  }\n  return dist;\n}`,
      language: 'javascript',
      description: 'Matriz de adjacência'
    } as CodeMissionData
  },
  {
    id: 'hard-code-25',
    title: 'Suffix Array',
    description: 'Construa array de sufixos',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function suffixArray(str) {\n  let sufixos = [];\n  for (let i = 0; i < str.length; i++) {\n    \n  }\n  return sufixos.map(s => s.indice);\n}`,
      correctCode: `function suffixArray(str) {\n  let sufixos = [];\n  for (let i = 0; i < str.length; i++) {\n    sufixos.push({ suf: str.slice(i), indice: i });\n  }\n  sufixos.sort((a, b) => a.suf.localeCompare(b.suf));\n  return sufixos.map(s => s.indice);\n}`,
      language: 'javascript',
      description: 'Ordenação de sufixos'
    } as CodeMissionData
  },
  {
    id: 'hard-code-26',
    title: 'KMP - Busca de Padrão',
    description: 'Knuth-Morris-Pratt',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function kmpBusca(texto, padrao) {\n  let lps = construirLPS(padrao);\n  let i = 0, j = 0;\n  while (i < texto.length) {\n    \n  }\n  return -1;\n}`,
      correctCode: `function kmpBusca(texto, padrao) {\n  let lps = construirLPS(padrao);\n  let i = 0, j = 0;\n  while (i < texto.length) {\n    if (padrao[j] === texto[i]) {\n      i++; j++;\n    }\n    if (j === padrao.length) return i - j;\n    else if (i < texto.length && padrao[j] !== texto[i]) {\n      if (j !== 0) j = lps[j - 1];\n      else i++;\n    }\n  }\n  return -1;\n}\nfunction construirLPS(padrao) {\n  let lps = new Array(padrao.length).fill(0);\n  let len = 0, i = 1;\n  while (i < padrao.length) {\n    if (padrao[i] === padrao[len]) {\n      len++; lps[i] = len; i++;\n    } else {\n      if (len !== 0) len = lps[len - 1];\n      else { lps[i] = 0; i++; }\n    }\n  }\n  return lps;\n}`,
      language: 'javascript',
      description: 'Busca eficiente'
    } as CodeMissionData
  },
  {
    id: 'hard-code-27',
    title: 'Rabin-Karp',
    description: 'Busca com hash',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function rabinKarp(texto, padrao) {\n  const d = 256;\n  const q = 101;\n  let h = 1;\n  for (let i = 0; i < padrao.length - 1; i++) h = (h * d) % q;\n  let p = 0, t = 0;\n  for (let i = 0; i < padrao.length; i++) {\n    \n  }\n  for (let i = 0; i <= texto.length - padrao.length; i++) {\n    \n  }\n  return -1;\n}`,
      correctCode: `function rabinKarp(texto, padrao) {\n  const d = 256;\n  const q = 101;\n  let h = 1;\n  for (let i = 0; i < padrao.length - 1; i++) h = (h * d) % q;\n  let p = 0, t = 0;\n  for (let i = 0; i < padrao.length; i++) {\n    p = (d * p + padrao.charCodeAt(i)) % q;\n    t = (d * t + texto.charCodeAt(i)) % q;\n  }\n  for (let i = 0; i <= texto.length - padrao.length; i++) {\n    if (p === t && texto.slice(i, i + padrao.length) === padrao) return i;\n    if (i < texto.length - padrao.length) {\n      t = (d * (t - texto.charCodeAt(i) * h) + texto.charCodeAt(i + padrao.length)) % q;\n      if (t < 0) t += q;\n    }\n  }\n  return -1;\n}`,
      language: 'javascript',
      description: 'Hash rolling'
    } as CodeMissionData
  },
  {
    id: 'hard-code-28',
    title: 'Suffix Tree',
    description: 'Estrutura básica',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `class SuffixTreeNode { constructor() { this.filhos = {}; this.indices = []; } }\nfunction construirSuffixTree(str) {\n  let raiz = new SuffixTreeNode();\n  for (let i = 0; i < str.length; i++) {\n    \n  }\n  return raiz;\n}`,
      correctCode: `class SuffixTreeNode { constructor() { this.filhos = {}; this.indices = []; } }\nfunction construirSuffixTree(str) {\n  let raiz = new SuffixTreeNode();\n  for (let i = 0; i < str.length; i++) {\n    let no = raiz;\n    for (let j = i; j < str.length; j++) {\n      let char = str[j];\n      if (!no.filhos[char]) no.filhos[char] = new SuffixTreeNode();\n      no = no.filhos[char];\n      no.indices.push(i);\n    }\n  }\n  return raiz;\n}`,
      language: 'javascript',
      description: 'Árvore de sufixos'
    } as CodeMissionData
  },
  {
    id: 'hard-code-29',
    title: 'Aho-Corasick',
    description: 'Múltiplos padrões',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `class AhoCorasick { constructor(palavras) { this.raiz = this.construirAutomato(palavras); } construirAutomato(palavras) { /* complexo */ return null; } }`,
      correctCode: `class AhoCorasick { constructor(palavras) { this.raiz = this.construirAutomato(palavras); } construirAutomato(palavras) { /* implementação completa muito longa */ return null; } }`,
      language: 'javascript',
      description: 'Busca múltipla'
    } as CodeMissionData
  },
  {
    id: 'hard-code-30',
    title: 'Validador de CPF',
    description: 'Validação completa com dígitos',
    difficulty: 'hard',
    type: 'code',
    xp: 40,
    gold: 30,
    data: {
      code: `function validarCPF(cpf) {\n  cpf = cpf.replace(/\\D/g, '');\n  if (cpf.length !== 11) return false;\n  \n  return true;\n}`,
      correctCode: `function validarCPF(cpf) {\n  cpf = cpf.replace(/\\D/g, '');\n  if (cpf.length !== 11 || /^(\\d)\\1+$/.test(cpf)) return false;\n  let soma = 0;\n  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);\n  let digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);\n  if (digito1 !== parseInt(cpf[9])) return false;\n  soma = 0;\n  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);\n  let digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);\n  return digito2 === parseInt(cpf[10]);\n}`,
      language: 'javascript',
      description: 'Dígitos verificadores'
    } as CodeMissionData
  }
];