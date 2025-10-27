// data/items/rotation/index.ts
import { GameItem } from '../types';

export const rotationItems: GameItem[] = [
  {
    itemId: 'rotation_1',
    name: 'Devastador Sombrio',
    category: 'Arma',
    rarity: 'Épica',
    levelRequired: 12,
    price: 600,
    stats: { strength: 28, speed: 32, damage: 48, resistance: 18 },
    passive: 'EXCLUSIVO DA ROTAÇÃO - Tiros criam campos de sombra',
    type: 'rotation'
  },
  {
    itemId: 'rotation_2',
    name: 'Relâmpago Azul',
    category: 'Arma',
    rarity: 'Lendária',
    levelRequired: 16,
    price: 1200,
    stats: { strength: 32, speed: 42, damage: 72, resistance: 28 },
    passive: 'EXCLUSIVO DA ROTAÇÃO - Dispara raios que saltam entre inimigos',
    type: 'rotation'
  },
  {
    itemId: 'rotation_3',
    name: 'Fênix Ardente',
    category: 'Arma',
    rarity: 'Mítica',
    levelRequired: 20,
    price: 2800,
    stats: { strength: 70, speed: 60, damage: 110, resistance: 50 },
    passive: 'EXCLUSIVO DA ROTAÇÃO - Renascer das cinzas uma vez por missão',
    type: 'rotation'
  },
  {
    itemId: 'rotation_4',
    name: 'Veneno Viper',
    category: 'Arma',
    rarity: 'Rara',
    levelRequired: 9,
    price: 280,
    stats: { strength: 16, speed: 35, damage: 26, resistance: 14 },
    passive: 'EXCLUSIVO DA ROTAÇÃO - Ataques envenenam inimigos',
    type: 'rotation'
  },
  {
    itemId: 'rotation_5',
    name: 'Gelo Eterno',
    category: 'Arma',
    rarity: 'Épica',
    levelRequired: 14,
    price: 720,
    stats: { strength: 24, speed: 28, damage: 44, resistance: 32 },
    passive: 'EXCLUSIVO DA ROTAÇÃO - Congela inimigos temporariamente',
    type: 'rotation'
  },
  {
    itemId: 'rotation_6',
    name: 'Trovão Celestial',
    category: 'Sandevistan',
    rarity: 'Lendária',
    levelRequired: 18,
    price: 2100,
    stats: { strength: 58, speed: 155, damage: 58, resistance: 62 },
    passive: 'EXCLUSIVO DA ROTAÇÃO - Raios caem ao redor durante efeito',
    type: 'rotation'
  },
  {
    itemId: 'rotation_7',
    name: 'Predador Noturno',
    category: 'Arma',
    rarity: 'Épica',
    levelRequired: 13,
    price: 680,
    stats: { strength: 30, speed: 38, damage: 46, resistance: 22 },
    passive: 'EXCLUSIVO DA ROTAÇÃO - Mais forte à noite',
    type: 'rotation'
  },
  {
    itemId: 'rotation_8',
    name: 'Espectro Digital',
    category: 'Sandevistan',
    rarity: 'Mítica',
    levelRequired: 22,
    price: 3300,
    stats: { strength: 88, speed: 195, damage: 88, resistance: 88 },
    passive: 'EXCLUSIVO DA ROTAÇÃO - Entra no mundo digital durante slow motion',
    type: 'rotation'
  }
  // --- AUTO-GENERATED ROTATION POOL START ---
  // For each category below we add 20 rotation-only items: 10 Épica, 7 Lendária, 3 Mítica

  // Arma (weapons) - 20 items
  ,{
    itemId: 'rotation_9', name: 'Lâmina Neon', category: 'Arma', rarity: 'Épica', levelRequired: 12, price: 650,
    stats: { strength: 30, speed: 36, damage: 50, resistance: 20 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Corte que atravessa armaduras', type: 'rotation'
  },{
    itemId: 'rotation_10', name: 'Pulso Cintilante', category: 'Arma', rarity: 'Épica', levelRequired: 13, price: 720,
    stats: { strength: 32, speed: 34, damage: 54, resistance: 22 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Golpes ricocheteiam', type: 'rotation'
  },{
    itemId: 'rotation_11', name: 'Coração de Aço', category: 'Arma', rarity: 'Épica', levelRequired: 12, price: 700,
    stats: { strength: 34, speed: 30, damage: 56, resistance: 26 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Ganho de resistência a cada acerto', type: 'rotation'
  },{
    itemId: 'rotation_12', name: 'Fio Lúcido', category: 'Arma', rarity: 'Épica', levelRequired: 11, price: 600,
    stats: { strength: 26, speed: 40, damage: 46, resistance: 18 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumenta velocidade ao esquivar', type: 'rotation'
  },{
    itemId: 'rotation_13', name: 'Sombra Cortante', category: 'Arma', rarity: 'Épica', levelRequired: 13, price: 760,
    stats: { strength: 36, speed: 38, damage: 60, resistance: 24 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Ataques à distância deixam sombra', type: 'rotation'
  },{
    itemId: 'rotation_14', name: 'Ressonância', category: 'Arma', rarity: 'Épica', levelRequired: 14, price: 800,
    stats: { strength: 30, speed: 32, damage: 66, resistance: 28 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Hits carregam dano adicional', type: 'rotation'
  },{
    itemId: 'rotation_15', name: 'Vórtice', category: 'Arma', rarity: 'Épica', levelRequired: 13, price: 740,
    stats: { strength: 28, speed: 44, damage: 52, resistance: 22 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Cria mini-tornado ao acertar', type: 'rotation'
  },{
    itemId: 'rotation_16', name: 'Olho de Marte', category: 'Arma', rarity: 'Épica', levelRequired: 15, price: 820,
    stats: { strength: 40, speed: 30, damage: 70, resistance: 30 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Penetração aumentada contra inimigos blindados', type: 'rotation'
  },{
    itemId: 'rotation_17', name: 'Falcão Metálico', category: 'Arma', rarity: 'Épica', levelRequired: 12, price: 690,
    stats: { strength: 34, speed: 42, damage: 58, resistance: 20 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumenta precisão e crítico', type: 'rotation'
  },{
    itemId: 'rotation_18', name: 'Corrente Quântica', category: 'Arma', rarity: 'Épica', levelRequired: 14, price: 780,
    stats: { strength: 36, speed: 34, damage: 64, resistance: 26 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Acertos energizam o usuário', type: 'rotation'
  },{
    itemId: 'rotation_19', name: 'Aço Fantasma', category: 'Arma', rarity: 'Lendária', levelRequired: 17, price: 1400,
    stats: { strength: 50, speed: 40, damage: 90, resistance: 36 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Evita dano uma vez por combate', type: 'rotation'
  },{
    itemId: 'rotation_20', name: 'Tempestade Carmesim', category: 'Arma', rarity: 'Lendária', levelRequired: 18, price: 1500,
    stats: { strength: 52, speed: 44, damage: 96, resistance: 38 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Golpe final causa explosão', type: 'rotation'
  },{
    itemId: 'rotation_21', name: 'Guardião de Neon', category: 'Arma', rarity: 'Lendária', levelRequired: 16, price: 1320,
    stats: { strength: 48, speed: 36, damage: 88, resistance: 40 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Escudo energético ao bloquear', type: 'rotation'
  },{
    itemId: 'rotation_22', name: 'Aríete Solar', category: 'Arma', rarity: 'Lendária', levelRequired: 17, price: 1450,
    stats: { strength: 56, speed: 30, damage: 100, resistance: 42 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Ataque carregado rompe defesas', type: 'rotation'
  },{
    itemId: 'rotation_23', name: 'Eco Implacável', category: 'Arma', rarity: 'Lendária', levelRequired: 18, price: 1520,
    stats: { strength: 50, speed: 48, damage: 94, resistance: 36 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Acertos aumentam dano subsequente', type: 'rotation'
  },{
    itemId: 'rotation_24', name: 'Abissal', category: 'Arma', rarity: 'Lendária', levelRequired: 19, price: 1700,
    stats: { strength: 60, speed: 34, damage: 110, resistance: 44 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Chance de causar medo', type: 'rotation'
  },{
    itemId: 'rotation_25', name: 'Coruja Obsidiana', category: 'Arma', rarity: 'Mítica', levelRequired: 22, price: 3000,
    stats: { strength: 88, speed: 62, damage: 140, resistance: 60 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Habilidade ultimate que limpa inimigos', type: 'rotation'
  },{
    itemId: 'rotation_26', name: 'Juízo Final', category: 'Arma', rarity: 'Mítica', levelRequired: 24, price: 3600,
    stats: { strength: 96, speed: 54, damage: 160, resistance: 68 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Dano massivo em área uma vez por missão', type: 'rotation'
  },{
    itemId: 'rotation_27', name: 'Sussurro Estelar', category: 'Arma', rarity: 'Mítica', levelRequired: 25, price: 4200,
    stats: { strength: 104, speed: 70, damage: 180, resistance: 72 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Dobra tempo local por segundos', type: 'rotation'
  }

  // Implante - 20 items
  ,{
    itemId: 'rotation_28', name: 'Neurolink Prisma', category: 'Implante', rarity: 'Épica', levelRequired: 12, price: 700,
    stats: { strength: 8, speed: 60, damage: 12, resistance: 18 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumenta reação do usuário', type: 'rotation'
  },{
    itemId: 'rotation_29', name: 'Circuito Vespertino', category: 'Implante', rarity: 'Épica', levelRequired: 13, price: 720,
    stats: { strength: 10, speed: 64, damage: 14, resistance: 20 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Boost de velocidade quando ferido', type: 'rotation'
  },{
    itemId: 'rotation_30', name: 'Sintonizador de Pulsos', category: 'Implante', rarity: 'Épica', levelRequired: 12, price: 680,
    stats: { strength: 12, speed: 58, damage: 16, resistance: 16 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Melhora cadência de tiros', type: 'rotation'
  },{
    itemId: 'rotation_31', name: 'Memória Fulgente', category: 'Implante', rarity: 'Épica', levelRequired: 11, price: 660,
    stats: { strength: 6, speed: 56, damage: 10, resistance: 14 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Regenera pequena energia a cada acerto', type: 'rotation'
  },{
    itemId: 'rotation_32', name: 'Neurovigor', category: 'Implante', rarity: 'Épica', levelRequired: 13, price: 760,
    stats: { strength: 14, speed: 68, damage: 18, resistance: 22 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumenta dano crítico', type: 'rotation'
  },{
    itemId: 'rotation_33', name: 'Onda Sináptica', category: 'Implante', rarity: 'Épica', levelRequired: 14, price: 800,
    stats: { strength: 10, speed: 72, damage: 20, resistance: 24 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Ativa pequena slow on hit', type: 'rotation'
  },{
    itemId: 'rotation_34', name: 'Pulso Cerúleo', category: 'Implante', rarity: 'Épica', levelRequired: 12, price: 700,
    stats: { strength: 12, speed: 66, damage: 16, resistance: 18 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumenta penetração de projéteis', type: 'rotation'
  },{
    itemId: 'rotation_35', name: 'Sinal de Cauda', category: 'Implante', rarity: 'Épica', levelRequired: 13, price: 730,
    stats: { strength: 8, speed: 70, damage: 12, resistance: 20 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Rastro que confunde inimigos', type: 'rotation'
  },{
    itemId: 'rotation_36', name: 'Córtex Ondulante', category: 'Implante', rarity: 'Épica', levelRequired: 12, price: 690,
    stats: { strength: 14, speed: 64, damage: 18, resistance: 18 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Pequeno aumento de esquiva', type: 'rotation'
  },{
    itemId: 'rotation_37', name: 'Ressonador Nerve', category: 'Implante', rarity: 'Épica', levelRequired: 14, price: 780,
    stats: { strength: 16, speed: 62, damage: 20, resistance: 20 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Amplifica efeitos de outros implantes', type: 'rotation'
  },{
    itemId: 'rotation_38', name: 'Vetor Azul', category: 'Implante', rarity: 'Lendária', levelRequired: 17, price: 1600,
    stats: { strength: 20, speed: 92, damage: 28, resistance: 26 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Ativa burst de velocidade curto', type: 'rotation'
  },{
    itemId: 'rotation_39', name: 'Catalisador Neon', category: 'Implante', rarity: 'Lendária', levelRequired: 18, price: 1700,
    stats: { strength: 24, speed: 88, damage: 30, resistance: 28 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Dano elemental extra', type: 'rotation'
  },{
    itemId: 'rotation_40', name: 'Sopro Ferruginoso', category: 'Implante', rarity: 'Lendária', levelRequired: 16, price: 1480,
    stats: { strength: 22, speed: 86, damage: 26, resistance: 30 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Recupera vida em altas velocidades', type: 'rotation'
  },{
    itemId: 'rotation_41', name: 'Rede Neural', category: 'Implante', rarity: 'Lendária', levelRequired: 17, price: 1550,
    stats: { strength: 26, speed: 84, damage: 32, resistance: 32 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Diminui cooldowns das habilidades', type: 'rotation'
  },{
    itemId: 'rotation_42', name: 'Pulso Titânico', category: 'Implante', rarity: 'Lendária', levelRequired: 18, price: 1750,
    stats: { strength: 30, speed: 80, damage: 36, resistance: 34 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumenta dano contra elites', type: 'rotation'
  },{
    itemId: 'rotation_43', name: 'Helix Supremo', category: 'Implante', rarity: 'Mítica', levelRequired: 22, price: 3200,
    stats: { strength: 40, speed: 120, damage: 48, resistance: 44 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Ativa modo sobre-humano', type: 'rotation'
  },{
    itemId: 'rotation_44', name: 'Cortex Divino', category: 'Implante', rarity: 'Mítica', levelRequired: 24, price: 3800,
    stats: { strength: 44, speed: 132, damage: 52, resistance: 48 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Restaura recursos e aumenta tudo temporariamente', type: 'rotation'
  },{
    itemId: 'rotation_45', name: 'Ápice Neural', category: 'Implante', rarity: 'Mítica', levelRequired: 25, price: 4200,
    stats: { strength: 48, speed: 140, damage: 56, resistance: 52 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Habilidade única de controle de tempo', type: 'rotation'
  }

  // Espada - 20 items
  ,{
    itemId: 'rotation_46', name: 'Katana Lúcida', category: 'Espada', rarity: 'Épica', levelRequired: 12, price: 640,
    stats: { strength: 28, speed: 44, damage: 52, resistance: 18 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Cortes rápidos em cadeia', type: 'rotation'
  },{
    itemId: 'rotation_47', name: 'Alvorada', category: 'Espada', rarity: 'Épica', levelRequired: 13, price: 700,
    stats: { strength: 30, speed: 42, damage: 56, resistance: 20 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Golpe que clareia área', type: 'rotation'
  },{
    itemId: 'rotation_48', name: 'Língua de Fogo', category: 'Espada', rarity: 'Épica', levelRequired: 12, price: 680,
    stats: { strength: 32, speed: 40, damage: 60, resistance: 22 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Incendeia inimigos', type: 'rotation'
  },{
    itemId: 'rotation_49', name: 'Vento Cortante', category: 'Espada', rarity: 'Épica', levelRequired: 11, price: 620,
    stats: { strength: 26, speed: 46, damage: 48, resistance: 16 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumenta alcance por tempo curto', type: 'rotation'
  },{
    itemId: 'rotation_50', name: 'Seda Titânica', category: 'Espada', rarity: 'Épica', levelRequired: 13, price: 740,
    stats: { strength: 34, speed: 44, damage: 62, resistance: 24 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Sangramento contínuo', type: 'rotation'
  },{
    itemId: 'rotation_51', name: 'Lua Sangrenta', category: 'Espada', rarity: 'Épica', levelRequired: 14, price: 780,
    stats: { strength: 36, speed: 40, damage: 66, resistance: 26 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Regenera vida ao eliminar inimigos', type: 'rotation'
  },{
    itemId: 'rotation_52', name: 'Eco da Lâmina', category: 'Espada', rarity: 'Épica', levelRequired: 13, price: 760,
    stats: { strength: 30, speed: 48, damage: 58, resistance: 22 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Dobra ataques consecutivos', type: 'rotation'
  },{
    itemId: 'rotation_53', name: 'Penumbral', category: 'Espada', rarity: 'Épica', levelRequired: 14, price: 800,
    stats: { strength: 38, speed: 46, damage: 70, resistance: 28 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Invisibilidade breve pós-esquiva', type: 'rotation'
  },{
    itemId: 'rotation_54', name: 'Cordão de Prata', category: 'Espada', rarity: 'Épica', levelRequired: 12, price: 700,
    stats: { strength: 32, speed: 50, damage: 60, resistance: 20 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumenta precisão em combos', type: 'rotation'
  },{
    itemId: 'rotation_55', name: 'Fio de Vênus', category: 'Espada', rarity: 'Épica', levelRequired: 14, price: 820,
    stats: { strength: 36, speed: 48, damage: 68, resistance: 26 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Ataques ricocheteiam em múltiplos alvos', type: 'rotation'
  },{
    itemId: 'rotation_56', name: 'Aço Lunar', category: 'Espada', rarity: 'Lendária', levelRequired: 17, price: 1500,
    stats: { strength: 54, speed: 56, damage: 102, resistance: 36 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Dano aumentado à noite', type: 'rotation'
  },{
    itemId: 'rotation_57', name: 'Grifo Magnético', category: 'Espada', rarity: 'Lendária', levelRequired: 18, price: 1600,
    stats: { strength: 56, speed: 52, damage: 108, resistance: 38 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Puxa inimigos para perto', type: 'rotation'
  },{
    itemId: 'rotation_58', name: 'Sirene Obsidiana', category: 'Espada', rarity: 'Lendária', levelRequired: 16, price: 1420,
    stats: { strength: 52, speed: 60, damage: 100, resistance: 34 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Causa confusão em inimigos atingidos', type: 'rotation'
  },{
    itemId: 'rotation_59', name: 'Punho de Titã', category: 'Espada', rarity: 'Lendária', levelRequired: 17, price: 1550,
    stats: { strength: 60, speed: 48, damage: 112, resistance: 40 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Bônus de força em combos', type: 'rotation'
  },{
    itemId: 'rotation_60', name: 'Soberana', category: 'Espada', rarity: 'Lendária', levelRequired: 18, price: 1680,
    stats: { strength: 62, speed: 50, damage: 118, resistance: 42 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumenta crítico contra bosses', type: 'rotation'
  },{
    itemId: 'rotation_61', name: 'Coroa de Fulgor', category: 'Espada', rarity: 'Mítica', levelRequired: 22, price: 3400,
    stats: { strength: 90, speed: 78, damage: 150, resistance: 64 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Lâmina que define o campo de batalha', type: 'rotation'
  },{
    itemId: 'rotation_62', name: 'Rasante Estelar', category: 'Espada', rarity: 'Mítica', levelRequired: 24, price: 3800,
    stats: { strength: 96, speed: 84, damage: 170, resistance: 68 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Salto e ataque massivo', type: 'rotation'
  },{
    itemId: 'rotation_63', name: 'Lamento da Aurora', category: 'Espada', rarity: 'Mítica', levelRequired: 25, price: 4200,
    stats: { strength: 104, speed: 96, damage: 190, resistance: 72 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Habilidade que altera gravidade', type: 'rotation'
  }

  // Sandevistan - 20 items
  ,{
    itemId: 'rotation_64', name: 'Sandevistan Prisma I', category: 'Sandevistan', rarity: 'Épica', levelRequired: 12, price: 900,
    stats: { strength: 20, speed: 120, damage: 22, resistance: 28 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Acelera o tempo localmente', type: 'rotation'
  },{
    itemId: 'rotation_65', name: 'Sandevistan Prisma II', category: 'Sandevistan', rarity: 'Épica', levelRequired: 13, price: 920,
    stats: { strength: 22, speed: 128, damage: 24, resistance: 30 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumenta chance de crítico em slow', type: 'rotation'
  },{
    itemId: 'rotation_66', name: 'Neon Slow', category: 'Sandevistan', rarity: 'Épica', levelRequired: 12, price: 880,
    stats: { strength: 18, speed: 132, damage: 20, resistance: 26 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Pequeno aumento de duração do slow', type: 'rotation'
  },{
    itemId: 'rotation_67', name: 'Ritmo Cortante', category: 'Sandevistan', rarity: 'Épica', levelRequired: 11, price: 860,
    stats: { strength: 16, speed: 140, damage: 18, resistance: 24 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Ataques lentos causam efeito extra', type: 'rotation'
  },{
    itemId: 'rotation_68', name: 'Pulsar Cinético', category: 'Sandevistan', rarity: 'Épica', levelRequired: 13, price: 940,
    stats: { strength: 24, speed: 136, damage: 26, resistance: 30 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Consome energia para dano extra', type: 'rotation'
  },{
    itemId: 'rotation_69', name: 'Trama Temporal', category: 'Sandevistan', rarity: 'Épica', levelRequired: 14, price: 980,
    stats: { strength: 26, speed: 144, damage: 28, resistance: 32 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Pequena distorção que atordoa', type: 'rotation'
  },{
    itemId: 'rotation_70', name: 'Eco Rápido', category: 'Sandevistan', rarity: 'Épica', levelRequired: 12, price: 900,
    stats: { strength: 20, speed: 148, damage: 24, resistance: 28 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Teleporta curto após ataque', type: 'rotation'
  },{
    itemId: 'rotation_71', name: 'Matiz Veloz', category: 'Sandevistan', rarity: 'Épica', levelRequired: 13, price: 920,
    stats: { strength: 22, speed: 152, damage: 26, resistance: 30 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumenta esquiva em slow', type: 'rotation'
  },{
    itemId: 'rotation_72', name: 'Corte Cronal', category: 'Sandevistan', rarity: 'Épica', levelRequired: 12, price: 890,
    stats: { strength: 24, speed: 156, damage: 28, resistance: 30 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Dano aumentado em velocidade', type: 'rotation'
  },{
    itemId: 'rotation_73', name: 'Véu de Mercúrio', category: 'Sandevistan', rarity: 'Épica', levelRequired: 14, price: 1000,
    stats: { strength: 28, speed: 160, damage: 30, resistance: 34 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Invisibilidade breve em slow', type: 'rotation'
  },{
    itemId: 'rotation_74', name: 'Espiral de Luz', category: 'Sandevistan', rarity: 'Lendária', levelRequired: 17, price: 2000,
    stats: { strength: 36, speed: 190, damage: 40, resistance: 44 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Slow prolongado e mais crítico', type: 'rotation'
  },{
    itemId: 'rotation_75', name: 'Teto de Aço', category: 'Sandevistan', rarity: 'Lendária', levelRequired: 18, price: 2100,
    stats: { strength: 40, speed: 200, damage: 44, resistance: 48 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Dano massivo a alvos lentos', type: 'rotation'
  },{
    itemId: 'rotation_76', name: 'Manto Hipersônico', category: 'Sandevistan', rarity: 'Lendária', levelRequired: 16, price: 1880,
    stats: { strength: 38, speed: 196, damage: 42, resistance: 46 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Recuperação de energia ao ativar', type: 'rotation'
  },{
    itemId: 'rotation_77', name: 'Velocidade Absoluta', category: 'Sandevistan', rarity: 'Lendária', levelRequired: 17, price: 1950,
    stats: { strength: 44, speed: 210, damage: 48, resistance: 50 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Extremo aumento de velocidade por segundos', type: 'rotation'
  },{
    itemId: 'rotation_78', name: 'Olho do Tempo', category: 'Sandevistan', rarity: 'Lendária', levelRequired: 18, price: 2200,
    stats: { strength: 46, speed: 220, damage: 50, resistance: 52 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Detecta inimigos ocultos durante slow', type: 'rotation'
  },{
    itemId: 'rotation_79', name: 'Centelha Divina', category: 'Sandevistan', rarity: 'Mítica', levelRequired: 22, price: 4200,
    stats: { strength: 80, speed: 300, damage: 80, resistance: 70 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Slow infinito por breve duração com buffs', type: 'rotation'
  },{
    itemId: 'rotation_80', name: 'Tempus Imperium', category: 'Sandevistan', rarity: 'Mítica', levelRequired: 24, price: 4800,
    stats: { strength: 88, speed: 330, damage: 88, resistance: 74 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Congela o tempo ao custo de recursos', type: 'rotation'
  },{
    itemId: 'rotation_81', name: 'Cicatriz do Relógio', category: 'Sandevistan', rarity: 'Mítica', levelRequired: 25, price: 5200,
    stats: { strength: 96, speed: 360, damage: 96, resistance: 80 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Permite múltiplas ações instantâneas', type: 'rotation'
  }

  // Cabeça (helmets) - 20 items
  ,{
    itemId: 'rotation_82', name: 'Visor Ônix', category: 'Cabeça', rarity: 'Épica', levelRequired: 12, price: 560,
    stats: { strength: 6, speed: 12, damage: 6, resistance: 40 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumenta visão de alvo', type: 'rotation'
  },{
    itemId: 'rotation_83', name: 'Capacete Prisma', category: 'Cabeça', rarity: 'Épica', levelRequired: 13, price: 600,
    stats: { strength: 8, speed: 10, damage: 8, resistance: 44 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Reduz dano elemental', type: 'rotation'
  },{
    itemId: 'rotation_84', name: 'Cúpula Solar', category: 'Cabeça', rarity: 'Épica', levelRequired: 12, price: 580,
    stats: { strength: 10, speed: 8, damage: 10, resistance: 48 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Regeneração de resistência', type: 'rotation'
  },{
    itemId: 'rotation_85', name: 'Máscara Neutra', category: 'Cabeça', rarity: 'Épica', levelRequired: 11, price: 540,
    stats: { strength: 6, speed: 14, damage: 6, resistance: 36 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Reduz detecção por inimigos', type: 'rotation'
  },{
    itemId: 'rotation_86', name: 'Halo Ferro', category: 'Cabeça', rarity: 'Épica', levelRequired: 13, price: 620,
    stats: { strength: 12, speed: 10, damage: 12, resistance: 50 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Pequeno escudo ao receber dano', type: 'rotation'
  },{
    itemId: 'rotation_87', name: 'Olho de Vidro', category: 'Cabeça', rarity: 'Épica', levelRequired: 14, price: 660,
    stats: { strength: 8, speed: 12, damage: 8, resistance: 46 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Marca inimigos à distância', type: 'rotation'
  },{
    itemId: 'rotation_88', name: 'Coroa de Latão', category: 'Cabeça', rarity: 'Épica', levelRequired: 12, price: 600,
    stats: { strength: 10, speed: 10, damage: 10, resistance: 48 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumento de moral e stats', type: 'rotation'
  },{
    itemId: 'rotation_89', name: 'Máscara do Viajante', category: 'Cabeça', rarity: 'Épica', levelRequired: 13, price: 630,
    stats: { strength: 12, speed: 14, damage: 12, resistance: 50 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Reduz cooldown de habilidades', type: 'rotation'
  },{
    itemId: 'rotation_90', name: 'Tampa Sílex', category: 'Cabeça', rarity: 'Épica', levelRequired: 12, price: 610,
    stats: { strength: 10, speed: 12, damage: 10, resistance: 49 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Mitiga dano crítico', type: 'rotation'
  },{
    itemId: 'rotation_91', name: 'Helm do Vigia', category: 'Cabeça', rarity: 'Épica', levelRequired: 14, price: 680,
    stats: { strength: 14, speed: 12, damage: 14, resistance: 52 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumenta alcance de interação', type: 'rotation'
  },{
    itemId: 'rotation_92', name: 'Casco Monarca', category: 'Cabeça', rarity: 'Lendária', levelRequired: 17, price: 1300,
    stats: { strength: 18, speed: 14, damage: 18, resistance: 72 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Absorve porcentagem de dano', type: 'rotation'
  },{
    itemId: 'rotation_93', name: 'Visor Antártico', category: 'Cabeça', rarity: 'Lendária', levelRequired: 18, price: 1400,
    stats: { strength: 20, speed: 16, damage: 20, resistance: 76 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Imune a congelamento', type: 'rotation'
  },{
    itemId: 'rotation_94', name: 'Máscara do Sábio', category: 'Cabeça', rarity: 'Lendária', levelRequired: 16, price: 1220,
    stats: { strength: 18, speed: 18, damage: 18, resistance: 70 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumenta XP ganho', type: 'rotation'
  },{
    itemId: 'rotation_95', name: 'Cúpula de Titânio', category: 'Cabeça', rarity: 'Lendária', levelRequired: 17, price: 1350,
    stats: { strength: 22, speed: 16, damage: 22, resistance: 78 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Reduz explosões próximas', type: 'rotation'
  },{
    itemId: 'rotation_96', name: 'Óculos Regente', category: 'Cabeça', rarity: 'Lendária', levelRequired: 18, price: 1480,
    stats: { strength: 24, speed: 18, damage: 24, resistance: 80 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Marca pontos fracos em inimigos', type: 'rotation'
  },{
    itemId: 'rotation_97', name: 'Névoa Arcana', category: 'Cabeça', rarity: 'Mítica', levelRequired: 22, price: 3000,
    stats: { strength: 28, speed: 20, damage: 28, resistance: 100 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Imunidade a status negativos por poucos segundos', type: 'rotation'
  },{
    itemId: 'rotation_98', name: 'Coroa do Crepúsculo', category: 'Cabeça', rarity: 'Mítica', levelRequired: 24, price: 3600,
    stats: { strength: 32, speed: 24, damage: 32, resistance: 110 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Grande aumento de resistência e visão', type: 'rotation'
  },{
    itemId: 'rotation_99', name: 'Máscara do Temível', category: 'Cabeça', rarity: 'Mítica', levelRequired: 25, price: 4200,
    stats: { strength: 36, speed: 28, damage: 36, resistance: 120 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Redireciona dano recebido para projéteis próximos', type: 'rotation'
  }

  // Armadura - 20 items
  ,{
    itemId: 'rotation_100', name: 'Peitoral Neón', category: 'Armadura', rarity: 'Épica', levelRequired: 12, price: 780,
    stats: { strength: 18, speed: 12, damage: 12, resistance: 60 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Reduz dano físico', type: 'rotation'
  },{
    itemId: 'rotation_101', name: 'Couraça Prisma', category: 'Armadura', rarity: 'Épica', levelRequired: 13, price: 820,
    stats: { strength: 20, speed: 10, damage: 14, resistance: 64 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Aumenta resistência elemental', type: 'rotation'
  },{
    itemId: 'rotation_102', name: 'Matriz de Placas', category: 'Armadura', rarity: 'Épica', levelRequired: 12, price: 800,
    stats: { strength: 22, speed: 8, damage: 16, resistance: 66 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Recupera parte da defesa ao bloquear', type: 'rotation'
  },{
    itemId: 'rotation_103', name: 'Fibra Lunar', category: 'Armadura', rarity: 'Épica', levelRequired: 11, price: 760,
    stats: { strength: 16, speed: 14, damage: 10, resistance: 58 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Leve e resistente', type: 'rotation'
  },{
    itemId: 'rotation_104', name: 'Sutura de Aço', category: 'Armadura', rarity: 'Épica', levelRequired: 13, price: 840,
    stats: { strength: 24, speed: 12, damage: 18, resistance: 70 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Diminui dano de perfuração', type: 'rotation'
  },{
    itemId: 'rotation_105', name: 'Rede Energética', category: 'Armadura', rarity: 'Épica', levelRequired: 14, price: 880,
    stats: { strength: 20, speed: 12, damage: 16, resistance: 72 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Rebate parte do dano elemental', type: 'rotation'
  },{
    itemId: 'rotation_106', name: 'Véu de Carapaça', category: 'Armadura', rarity: 'Épica', levelRequired: 12, price: 800,
    stats: { strength: 22, speed: 14, damage: 18, resistance: 74 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Reduz dano crítico', type: 'rotation'
  },{
    itemId: 'rotation_107', name: 'Casca de Mercúrio', category: 'Armadura', rarity: 'Épica', levelRequired: 13, price: 830,
    stats: { strength: 24, speed: 10, damage: 20, resistance: 76 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Melhora resistência física e térmica', type: 'rotation'
  },{
    itemId: 'rotation_108', name: 'Estribo Vento', category: 'Armadura', rarity: 'Épica', levelRequired: 12, price: 810,
    stats: { strength: 20, speed: 16, damage: 16, resistance: 72 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Leve aumento de velocidade ao correr', type: 'rotation'
  },{
    itemId: 'rotation_109', name: 'Núcleo Reforçado', category: 'Armadura', rarity: 'Épica', levelRequired: 14, price: 880,
    stats: { strength: 26, speed: 12, damage: 20, resistance: 78 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Melhora estabilização contra empuxos', type: 'rotation'
  },{
    itemId: 'rotation_110', name: 'Couraça de Guerra', category: 'Armadura', rarity: 'Lendária', levelRequired: 17, price: 1700,
    stats: { strength: 40, speed: 14, damage: 28, resistance: 110 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Diminui dano recebido de bosses', type: 'rotation'
  },{
    itemId: 'rotation_111', name: 'Placas Titan', category: 'Armadura', rarity: 'Lendária', levelRequired: 18, price: 1800,
    stats: { strength: 44, speed: 12, damage: 30, resistance: 120 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Alta absorção de impacto', type: 'rotation'
  },{
    itemId: 'rotation_112', name: 'Velo de Ferro', category: 'Armadura', rarity: 'Lendária', levelRequired: 16, price: 1520,
    stats: { strength: 38, speed: 16, damage: 26, resistance: 102 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Estabiliza tremores e explosões', type: 'rotation'
  },{
    itemId: 'rotation_113', name: 'Fornalha de Aço', category: 'Armadura', rarity: 'Lendária', levelRequired: 17, price: 1650,
    stats: { strength: 42, speed: 14, damage: 32, resistance: 108 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Reduz dano de fogo', type: 'rotation'
  },{
    itemId: 'rotation_114', name: 'Muralha Santificada', category: 'Armadura', rarity: 'Lendária', levelRequired: 18, price: 1850,
    stats: { strength: 46, speed: 12, damage: 34, resistance: 124 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Cria barreira temporária', type: 'rotation'
  },{
    itemId: 'rotation_115', name: 'Armamento Supremo', category: 'Armadura', rarity: 'Mítica', levelRequired: 22, price: 3600,
    stats: { strength: 70, speed: 18, damage: 48, resistance: 180 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Ativa modo fortaleza', type: 'rotation'
  },{
    itemId: 'rotation_116', name: 'Placas do Infinito', category: 'Armadura', rarity: 'Mítica', levelRequired: 24, price: 4200,
    stats: { strength: 76, speed: 20, damage: 52, resistance: 200 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Bulwark: absorve um ataque fatal', type: 'rotation'
  },{
    itemId: 'rotation_117', name: 'Santuário de Titãs', category: 'Armadura', rarity: 'Mítica', levelRequired: 25, price: 4800,
    stats: { strength: 84, speed: 22, damage: 60, resistance: 220 }, passive: 'EXCLUSIVO DA ROTAÇÃO - Grande redução de dano e retaliação', type: 'rotation'
  }

  // --- AUTO-GENERATED ROTATION POOL END ---
];
