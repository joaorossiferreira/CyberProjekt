# CyberProjekt - Jogo de Puzzles e Missões com Tema Cyberpunk 🌌  
React Native | TypeScript | Expo | Node.js | MongoDB  

**Desenvolvedor Responsável**: João Vitor Rossi Ferreira  

## 📋 Sobre o Projeto  
CyberProjekt é um jogo mobile inovador com temática cyberpunk, inspirado em *Cyberpunk 2077 Edgerunners*. Ele combina deslocamento (físico via GPS ou virtual) com puzzles e missões variadas, como enigmas lógicos, charadas matemáticas, desafios de memória e minijogos dinâmicos. Os jogadores navegam por um mapa interativo, desbloqueiam missões ao alcançar pontos de interesse, acumulam pontos de experiência (XP) para progredir em níveis e coletam recompensas (moedas virtuais, itens colecionáveis, upgrades). O jogo oferece rankings sociais, missões colaborativas, notificações inteligentes, eventos sazonais e suporte offline, tudo envolto em uma interface imersiva com efeitos visuais de glitch neon e áudio atmosférico.

## 🎯 Missão  
Proporcionar uma experiência de jogo envolvente que mescle deslocamento físico ou virtual com desafios intelectuais, promovendo progressão, interação social e imersão em um universo cyberpunk, com suporte offline, segurança de dados e interface intuitiva.

## 🎯 Objetivos  
- ✅ Criar perfis de usuário com informações básicas e personalização de avatar.  
- ✅ Exibir um mapa interativo com pontos de interesse reais (GPS) ou virtuais.  
- ✅ Desbloquear missões/puzzles ao alcançar locais designados.  
- ✅ Oferecer puzzles variados (lógicos, matemáticos, de memória, visuais, minijogos).  
- ✅ Implementar sistema de progressão por níveis com XP e recompensas.  
- ✅ Gerenciar itens coletados em um inventário acessível.  
- ✅ Incluir missões temporizadas para maior desafio.  
- ✅ Suportar rankings online e missões colaborativas.  
- ✅ Registrar histórico de missões concluídas para consulta.  
- 🔄 Implementar eventos sazonais/temáticos com novos desafios.  
- 🔄 Suportar modo offline para rejogar puzzles desbloqueados com sincronização automática.  
- 🔄 Garantir interface com estética cyberpunk (neon, glitch, áudio imersivo).  
- 🔄 Proteger dados do usuário e privacidade de localização com autenticação segura.  
- 🛠️ Oferecer configurações personalizáveis (volume, idioma, notificações).

## 🛠️ Tecnologias Utilizadas  
### Backend  
- **Node.js** - Runtime do servidor  
- **Express.js** - Framework para API REST  
- **MongoDB** - Banco de dados para perfis, missões e progresso  
- **JWT** - Autenticação e autorização  
- **Vercel** - Plataforma de deploy  
- **CORS** - Suporte a requisições cross-origin  

### Frontend Mobile  
- **React Native 0.79.6** - Framework mobile  
- **Expo 53.0.22** - Plataforma de desenvolvimento  
- **TypeScript 5.8.3** - Linguagem de programação  
- **Expo Location** - Geolocalização para mapas  
- **Expo Notifications** - Sistema de notificações  
- **SQLite** - Banco de dados local para modo offline  

## 📜 Product Backlog  

| RANK | SPRINT | PRIORIDADE | ESTIMATIVA | USER STORY | STATUS |
|------|--------|------------|------------|------------|--------|
| 1    | 1      | Alta       | 8          | Como usuário, quero criar um perfil com nome, email e avatar personalizado, para me identificar no universo do jogo. | ✅ |
| 2    | 1      | Alta       | 8          | Como usuário, quero visualizar um mapa interativo com pontos de interesse virtuais ou reais (GPS), para navegar e encontrar missões. | ✅ |
| 3    | 1      | Média      | 5          | Como usuário, quero usar autenticação biométrica, para maior segurança e praticidade. | ✅ |
| 4    | 1      | Alta       | 8          | Como usuário, quero desbloquear missões ao alcançar pontos no mapa, para iniciar puzzles ou tarefas. | 🔄 |
| 5    | 2      | Alta       | 8          | Como usuário, quero resolver puzzles lógicos simples (e.g., sequências numéricas), para progredir no jogo. | 🔄 |
| 6    | 2      | Baixa      | 5          | Como usuário, quero ganhar pontos de experiência (XP) ao concluir missões, para subir de nível. | ❌ |
| 7    | 2      | Média      | 5          | Como usuário, quero acessar um inventário para gerenciar itens coletados, para organizar recompensas. | 🔄 |
| 8    | 2      | Média      | 5          | Como usuário, quero consultar o histórico de missões concluídas, para revisar meu progresso. | ❌ |
| 9    | 2      | Alta       | 8          | Como usuário, quero resolver puzzles variados (matemáticos, memória, visuais), para maior diversidade de desafios. | ❌ |
| 10   | 2      | Alta       | 5          | Como usuário, quero realizar missões temporizadas, para aumentar o desafio. | ❌ |
| 11   | 2      | Média      | 8          | Como usuário, quero participar de rankings online, para comparar meu desempenho com outros jogadores. | ❌ |
| 12   | 2      | Média      | 8          | Como usuário, quero jogar em modo offline e sincronizar progresso ao reconectar, para rejogar puzzles sem internet. | ❌ |
| 13   | 3      | Alta       | 13         | Como usuário, quero participar de missões colaborativas com outros jogadores, para uma experiência social. | ❌ |
| 14   | 3      | Média      | 8          | Como usuário, quero acessar eventos sazonais com puzzles temáticos, para manter o jogo atualizado. | ❌ |
| 15   | 3      | Baixa      | 5          | Como usuário, quero personalizar configurações (volume, idioma), para uma experiência adaptada. | ❌ |

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
├── components/       
│   ├── CyberpunkEffect.tsx      # Tela de login/registro com estética cyberpunk
│   ├── CyberpunkStyles.ts       # Estilos visuais do tema cyberpunk
│   ├── MapComponent.tsx         # Mapa interativo para navegação
│   ├── MenuModal.tsx            # Menu de navegação
│   ├── OptionModal.tsx          # Modal de opções/configurações
│   └── ModalComponent.tsx       # Modais genéricos
├── assets/   
│   ├── fonts/                   # Fontes cyberpunk
│   └── images/                  # Imagens e ícones
├── backend/   
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js                # API Node.js/Express
│   ├── vercel.json              # Configuração de deploy
│   └── .gitignore
├── constants/  
│   └── Colors.ts                # Cores do tema
├── hooks/ 
│   ├── useColorScheme.ts        # Gerenciamento de temas
│   ├── useColorScheme.web.ts    # Suporte a temas no web
│   └── useThemeColor.ts         # Utilitário de cores
├── scripts/ 
│   └── reset-project.js         # Script de reinicialização
├── services/
│   ├── location.ts              # Serviço de geolocalização
│   └── map.ts                   # Lógica do mapa
├── types/        
│   └── index.ts                 # Definições TypeScript
│   │   ├── components/          # Tipos para componentes
│   │   ├── screens/             # Tipos para telas
│   │   ├── services/            # Tipos para serviços
│   │   ├── navigation/          # Tipos para navegação
│   │   └── types/               # Tipos gerais
│   └── package.json
├── app.json                     # Configuração Expo
├── package.json                 # Dependências frontend
└── README.md                    # Documentação
```

## 👨‍💻 Desenvolvedor  
João Vitor Rossi Ferreira  

## 📄 Licença  
Este projeto é desenvolvido para fins educacionais e demonstração de competências técnicas.
