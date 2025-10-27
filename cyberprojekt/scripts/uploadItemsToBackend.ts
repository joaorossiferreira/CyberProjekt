// scripts/uploadItemsToBackend.ts
/**
 * Script para enviar todos os 206 itens locais para o backend
 * Rode este script UMA VEZ para popular o banco de dados
 * 
 * Como usar:
 * 1. npm run upload-items
 */

import { allGameItems } from '../data/items/index.js';

const BASE_URL = 'https://backend-psi-fawn-77.vercel.app';

async function uploadItems() {
  console.log('🚀 Iniciando upload de itens para o backend...\n');
  
  console.log(`📦 Total de itens a enviar: ${allGameItems.length}`);
  console.log('   - Itens Fixed: ' + allGameItems.filter(i => i.type === 'fixed').length);
  console.log('   - Itens Rotation: ' + allGameItems.filter(i => i.type === 'rotation').length);
  console.log('\n⏳ Enviando itens...\n');

  try {
    const response = await fetch(`${BASE_URL}/items/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: allGameItems }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ SUCESSO! Itens sincronizados com o backend!');
      console.log(`📊 Resposta do servidor:`, data);
      
      console.log('\n📋 Resumo por Categoria:');
      const categories = ['Arma', 'Sandevistan', 'Espada', 'Implante', 'Cabeça', 'Armadura'];
      categories.forEach(cat => {
        const count = allGameItems.filter(i => i.category === cat).length;
        console.log(`   - ${cat}: ${count} itens`);
      });
      
      console.log('\n📋 Resumo por Raridade:');
      const rarities = ['Comum', 'Rara', 'Épica', 'Lendária', 'Mítica'];
      rarities.forEach(rar => {
        const count = allGameItems.filter(i => i.rarity === rar).length;
        console.log(`   - ${rar}: ${count} itens`);
      });
      
      console.log('\n🎉 Pronto! Agora a loja vai funcionar com os itens do backend!');
    } else {
      const errorText = await response.text();
      console.error('❌ Erro ao sincronizar itens:', response.status);
      console.error('📄 Resposta do servidor:', errorText);
      
      if (response.status === 404) {
        console.log('\n⚠️  ATENÇÃO: Endpoint /items/sync não encontrado!');
        console.log('📝 Você precisa criar este endpoint no backend primeiro:');
        console.log('\n--- Código para adicionar no backend (server.js) ---\n');
        console.log(`
// Endpoint para sincronizar itens
app.post('/items/sync', async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ msg: 'Array de itens inválido' });
    }

    let createdCount = 0;
    let updatedCount = 0;

    for (const item of items) {
      const existingItem = await Item.findOne({ itemId: item.itemId });
      
      if (existingItem) {
        // Atualiza item existente
        await Item.updateOne({ itemId: item.itemId }, item);
        updatedCount++;
      } else {
        // Cria novo item
        await Item.create(item);
        createdCount++;
      }
    }

    res.json({
      message: 'Itens sincronizados com sucesso',
      total: items.length,
      created: createdCount,
      updated: updatedCount
    });
  } catch (err) {
    console.error('Erro ao sincronizar itens:', err);
    res.status(500).json({ msg: 'Erro ao sincronizar itens' });
  }
});
        `);
      }
    }
  } catch (err) {
    console.error('❌ Erro de rede ao conectar com o backend:', err);
    console.log('\n⚠️  Verifique se:');
    console.log('   1. O backend está rodando');
    console.log('   2. A URL está correta:', BASE_URL);
    console.log('   3. Você tem conexão com a internet');
  }
}

uploadItems();
