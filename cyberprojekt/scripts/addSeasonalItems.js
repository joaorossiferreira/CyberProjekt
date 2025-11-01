// Script para adicionar itens sazonais ao banco de dados
// Execute: node scripts/addSeasonalItems.js

const seasonalItems = [
  {
    itemId: 'halloween_scythe',
    name: '🎃 Foice das Trevas',
    category: 'Arma',
    rarity: 'Lendária',
    levelRequired: 20,
    price: 3500,
    stats: {
      strength: 50,
      speed: 60,
      damage: 150,
      resistance: 40,
    },
    passive: '👻 Roubo de Alma: 25% de chance de recuperar 10% de vida ao acertar',
    type: 'Rotativo',
    available: true,
  },
  {
    itemId: 'christmas_cannon',
    name: '🎄 Canhão de Presentes',
    category: 'Arma',
    rarity: 'Lendária',
    levelRequired: 20,
    price: 3500,
    stats: {
      strength: 55,
      speed: 50,
      damage: 160,
      resistance: 45,
    },
    passive: '🎁 Explosão Festiva: 20% de chance de causar dano em área',
    type: 'Rotativo',
    available: true,
  },
];

async function addSeasonalItems() {
  const BASE_URL = 'https://backend-psi-fawn-77.vercel.app';
  
  try {
    const response = await fetch(`${BASE_URL}/items/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: seasonalItems }),
    });

    const data = await response.json();
    console.log('✅ Itens sazonais adicionados:', data);
  } catch (error) {
    console.error('❌ Erro ao adicionar itens sazonais:', error);
  }
}

addSeasonalItems();
