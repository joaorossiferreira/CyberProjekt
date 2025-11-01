# CyberProjekt - Jogo de Puzzles e Missões com Tema Cyberpunk 🌌  
React Native | TypeScript | Expo | Node.js | MongoDB  

**Desenvolvedor Responsável**: João Vitor Rossi Ferreira  

## 📋 Sobre o Projeto  
CyberProjekt é um jogo mobile inovador com temática cyberpunk, inspirado em *Cyberpunk 2077 Edgerunners*. O jogo combina exploração de mapa virtual com desafios intelectuais em três categorias principais:

### **🎯 Tipos de Missões**
- **💻 Missões de Código**: Desafios de programação em JavaScript, Python e outras linguagens. Complete funções, encontre bugs ou implemente algoritmos.
- **🧩 Missões de Lógica**: Resolva sequências numéricas, padrões visuais, charadas e quebra-cabeças que testam seu raciocínio lógico.
- **📐 Missões de Matemática**: Enfrente equações complexas, problemas de geometria, cálculo e probabilidade.

### **⚡ Níveis de Dificuldade**
Cada categoria possui três níveis de dificuldade, com recompensas progressivas:
- **Fácil**: Desafios introdutórios (10 XP, 50 Gold)
- **Médio**: Puzzles intermediários (30 XP, 150 Gold)
- **Difícil**: Desafios avançados (60 XP, 300 Gold)

### **🌟 Características Principais**
- **Mapa Interativo**: Navegue por pontos de interesse virtuais para desbloquear missões
- **Sistema de Progressão**: Ganhe XP para subir de nível e gold para comprar equipamentos
- **Loja Dinâmica**: Adquira itens através de compra direta, rotação diária ou sistema gacha com 5 raridades (Comum, Rara, Épica, Lendária, Mítica)
- **Inventário e Equipamentos**: Gerencie e equipe itens que aumentam seus atributos (força, velocidade, dano, resistência)
- **Rankings Competitivos**: Compare seu nível e riqueza com outros jogadores
- **Modo Treino**: Pratique missões offline sem ganhar recompensas, apenas para aperfeiçoar suas habilidades
- **Estética Cyberpunk Imersiva**: Interface com efeitos visuais neon, glitch, animações fluidas, música atmosférica e feedback tátil
- **Segurança Total**: Autenticação JWT, criptografia de senhas com bcrypt, autenticação biométrica e recuperação de senha via email

## 🎯 Missão  
Proporcionar uma experiência de jogo envolvente que mescle deslocamento físico ou virtual com desafios intelectuais, promovendo progressão, interação social e imersão em um universo cyberpunk, com suporte offline, segurança de dados e interface intuitiva.

## 🎯 Objetivos  
- ✅ Criar perfis de usuário com login/registro seguro e autenticação JWT.  
- ✅ Exibir um mapa interativo com pontos de interesse virtuais para missões.  
- ✅ Desbloquear missões ao alcançar locais designados no mapa.  
- ✅ Oferecer puzzles variados em 3 níveis de dificuldade (fácil, médio, difícil):
  - Missões de **código** (JavaScript, Python, etc.)
  - Missões de **lógica** (sequências, padrões, charadas)
  - Missões de **matemática** (equações, geometria, probabilidade)
- ✅ Implementar sistema de progressão por níveis com XP e gold.  
- ✅ Gerenciar itens em inventário com sistema de equipamento.  
- ✅ Sistema de loja com itens fixos, rotação diária e gacha por raridade.  
- ✅ Incluir missões com diferentes dificuldades e recompensas variadas.  
- ✅ Suportar rankings de nível e gold para competição.  
- ✅ Modo treino offline para praticar missões sem ganhar recompensas.  
- ✅ Sistema de recuperação de senha via email com código de verificação.  
- ✅ Autenticação biométrica (impressão digital/Face ID).  
- ✅ Interface com estética cyberpunk completa (neon, glitch, efeitos visuais, áudio imersivo).  
- ✅ Feedback tátil (haptics) para ações e interações.  
- ✅ Sistema de áudio com músicas de fundo e efeitos sonoros.  
- ✅ Eventos sazonais: Halloween (31/out) e Natal (25/dez) com missões exclusivas e itens especiais.  
- ✅ Proteger dados do usuário com bcrypt e JWT.  
- ✅ Configurações personalizáveis (volume música, volume SFX, modo imersivo).

## 🛠️ Tecnologias Utilizadas  
### Backend  
- **Node.js** - Runtime do servidor  
- **Express.js** - Framework para API REST  
- **MongoDB** - Banco de dados NoSQL  
- **Mongoose** - ODM (Object Data Modeling) para MongoDB  
- **JWT** - Autenticação e autorização  
- **bcryptjs** - Criptografia de senhas  
- **nodemailer** - Envio de emails  
- **Vercel** - Plataforma de deploy  
- **CORS** - Suporte a requisições cross-origin  

### Frontend Mobile  
- **React Native** - Framework mobile  
- **React** - Biblioteca JavaScript  
- **Expo** - Plataforma de desenvolvimento  
- **TypeScript** - Linguagem de programação  
- **Expo Router** - Sistema de navegação baseado em arquivos  
- **Expo Location** - Geolocalização para mapas  
- **Expo AV** - Reprodução de áudio e vídeo  
- **Expo Haptics** - Feedback tátil  
- **Expo Local Authentication** - Autenticação biométrica  
- **Expo Secure Store** - Armazenamento seguro de dados  
- **React Native Reanimated** - Animações avançadas  
- **AsyncStorage** - Armazenamento local para modo offline  

## 📜 Product Backlog  

| RANK | SPRINT | PRIORIDADE | ESTIMATIVA | USER STORY | STATUS |
|------|--------|------------|------------|------------|--------|
| 1    | 1      | Alta       | 8          | Como usuário, quero criar um perfil com nome, email e avatar personalizado, para me identificar no universo do jogo. | ✅ |
| 2    | 1      | Alta       | 8          | Como usuário, quero visualizar um mapa interativo com pontos de interesse virtuais ou reais (GPS), para navegar e encontrar missões. | ✅ |
| 3    | 1      | Alta       | 8          | Como usuário, quero desbloquear missões ao alcançar pontos no mapa, para iniciar puzzles ou tarefas. | ✅ |
| 4    | 2      | Alta       | 8          | Como usuário, quero resolver puzzles lógicos simples (e.g., sequências numéricas), para progredir no jogo. | ✅ |
| 5    | 2      | Alta       | 5          | Como usuário, quero ganhar pontos de experiência (XP) ao concluir missões, para subir de nível. | ✅ |
| 6    | 2      | Média      | 5          | Como usuário, quero acessar um inventário para gerenciar itens coletados, para organizar recompensas. | ✅ |
| 7    | 2      | Média      | 5          | Como usuário, quero consultar rankings de nível e gold, para comparar meu desempenho com outros jogadores. | ✅ |
| 8    | 2      | Alta       | 8          | Como usuário, quero resolver puzzles variados (código, lógica, matemática), para maior diversidade de desafios. | ✅ |
| 9    | 2      | Alta       | 5          | Como usuário, quero realizar missões temporizadas, para aumentar o desafio. | ✅ |
| 10   | 2      | Média      | 8          | Como usuário, quero comprar itens na loja (fixos, rotação, gacha) para melhorar meu personagem. | ✅ |
| 11   | 2      | Média      | 8          | Como usuário, quero jogar em modo treino offline sem ganhar recompensas, para praticar puzzles sem pressão. | ✅ |
| 12   | 2      | Alta       | 5          | Como usuário, quero recuperar minha senha por email com código de verificação, para não perder acesso à minha conta. | ✅ |
| 13   | 3      | Média      | 8          | Como usuário, quero acessar eventos sazonais com puzzles temáticos, para manter o jogo atualizado. | ✅ |
| 14   | 3      | Média      | 5          | Como usuário, quero usar autenticação biométrica, para maior segurança e praticidade. | ✅ |
| 15   | 3      | Baixa      | 5          | Como usuário, quero personalizar configurações de áudio e interface, para uma experiência adaptada. | ✅ |

**Legenda de Status**:  
- ✅ **Implementado**: Funcionalidade completamente desenvolvida e funcional.  
- 🔄 **Parcialmente Implementado**: Backend ou frontend implementado, mas precisa de integração ou refinamentos.  
- ❌ **Não Implementado**: Funcionalidade planejada para desenvolvimento futuro.

## 🚀 Instalação e Execução  

### Pré-requisitos  
- **Node.js 18+**  
- **MongoDB** (local ou Atlas)  
- **Expo CLI**  
- **npm**  

### Backend (Node.js/Express)  
```bash
cd backend
npm install
npm start
```
A API estará disponível em `https://backend-psi-fawn-77.vercel.app` (ou `http://localhost:3000` para desenvolvimento local).  

### Frontend Mobile (React Native)  
```bash
cd cyberprojekt
npm install
npx expo start
```

### Executar no Dispositivo  
1. Instale o **Expo Go** no seu smartphone (Android/iOS).  
2. Escaneie o QR code gerado pelo comando `npx expo start`.  
3. Ou execute `npx expo run:android` / `npx expo run:ios` para builds nativas.  

## 📚 Documentação da API  
A API REST será documentada com **Swagger/OpenAPI** (a ser implementado em Sprint 2):  
- **Base URL**: `https://backend-psi-fawn-77.vercel.app/api` (ou `http://localhost:3000/api` localmente)  

## 📁 Estrutura do Projeto  
```
CyberProjekt/
├── app/   
│   ├── (tabs)/                  # Telas principais do app
│   │   ├── explore.tsx          # Tela do mapa e missões
│   │   ├── index.tsx            # Tela inicial/home
│   │   ├── inventory.tsx        # Inventário de itens
│   │   ├── profile.tsx          # Perfil do usuário
│   │   ├── shop.tsx             # Loja de itens
│   │   ├── training.tsx         # Modo treino offline
│   │   └── _layout.tsx          # Layout das tabs
│   ├── _layout.tsx              # Layout raiz
│   ├── +not-found.tsx           # Tela de erro 404
│   └── index.tsx                # Ponto de entrada
├── components/       
│   ├── AudioManager.tsx         # Gerenciador de áudio/música
│   ├── CodeMission.tsx          # Missões de código
│   ├── CyberpunkEffect.tsx      # Tela de login/registro com estética cyberpunk
│   ├── CyberpunkStyles.ts       # Estilos visuais do tema cyberpunk
│   ├── ErrorBoundary.tsx        # Tratamento de erros
│   ├── MapComponent.tsx         # Mapa interativo para navegação
│   ├── MenuModal.tsx            # Menu de navegação
│   ├── MissionScreen.tsx        # Tela de execução de missões
│   ├── MissionSystem/           # Sistema de missões
│   │   ├── index.tsx            # Lógica principal de missões
│   │   ├── types.ts             # Tipos TypeScript
│   │   └── missions/            # Missões por dificuldade
│   │       ├── easy/            # Missões fáceis (code, logic, math)
│   │       ├── medium/          # Missões médias
│   │       └── hard/            # Missões difíceis
│   ├── OptionModal.tsx          # Modal de opções/configurações
│   ├── OverlayContext.tsx       # Contexto de overlays/modais
│   └── RankingModal.tsx         # Modal de rankings
├── assets/   
│   ├── fonts/                   # Fontes cyberpunk (Chakra Petch)
│   ├── images/                  # Imagens e ícones
│   ├── songs/                   # Músicas de fundo
│   └── sounds/                  # Efeitos sonoros
├── backend/   
│   ├── package.json             # Dependências do backend
│   ├── server.js                # API Node.js/Express
│   └── vercel.json              # Configuração de deploy
├── constants/  
│   └── Colors.ts                # Cores do tema
├── hooks/ 
│   ├── useColorScheme.ts        # Gerenciamento de temas
│   ├── useColorScheme.web.ts    # Suporte a temas no web
│   ├── useFonts.ts              # Carregamento de fontes
│   ├── useImmersiveMode.ts      # Modo imersivo (fullscreen)
│   └── useThemeColor.ts         # Utilitário de cores
├── scripts/ 
│   ├── reset-project.js         # Script de reinicialização
│   ├── buildItemsJson.ts        # Gerador de itens JSON
│   ├── syncItems.ts             # Sincronização de itens
│   ├── uploadItems.js           # Upload de itens para DB
│   └── resetAndUploadItems.js   # Reset e upload de itens
├── services/
│   ├── location.ts              # Serviço de geolocalização
│   └── map.ts                   # Lógica do mapa
├── types/        
│   └── index.ts                 # Definições TypeScript globais
├── app.json                     # Configuração Expo
├── package.json                 # Dependências frontend
├── tsconfig.json                # Configuração TypeScript
├── eslint.config.js             # Configuração ESLint
└── README.md                    # Documentação
```

## 👨‍💻 Desenvolvedor  
João Vitor Rossi Ferreira  

## 📄 Licença  
Este projeto é desenvolvido para fins educacionais e demonstração de competências técnicas.
