// scripts/uploadItems.js
/**
 * Script para enviar todos os 206 itens locais para o backend
 * Rode este script UMA VEZ para popular o banco de dados
 * 
 * Como usar:
 * node scripts/uploadItems.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://backend-psi-fawn-77.vercel.app';

async function loadItems() {
  // Tenta carregar de all-items.json se existir
  const jsonPath = path.join(process.cwd(), 'data', 'all-items.json');
  
  if (fs.existsSync(jsonPath)) {
    console.log('📂 Carregando itens de all-items.json...');
    const data = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(data);
  }
  
  // Se não existir, instrui o usuário
  console.log('⚠️  Arquivo all-items.json não encontrado!');
  console.log('📝 Execute primeiro: npm run build-items-json');
  process.exit(1);
}

async function uploadItems() {
  console.log('🚀 Iniciando upload de itens para o backend...\n');

  try {
    const allGameItems = await loadItems();
    
    console.log(`📦 Total de itens a enviar: ${allGameItems.length}`);
    console.log('   - Itens Fixed: ' + allGameItems.filter(i => i.type === 'fixed').length);
    console.log('   - Itens Rotation: ' + allGameItems.filter(i => i.type === 'rotation').length);
    console.log('\n⏳ Enviando itens para o backend...\n');

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
      console.log(`📊 Resposta do servidor:`);
      console.log(`   - Total: ${data.total}`);
      console.log(`   - Criados: ${data.created}`);
      console.log(`   - Atualizados: ${data.updated}`);
      
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
      console.log('💡 Você pode acessar a loja no app e ver todos os 206 itens!');
    } else {
      const errorText = await response.text();
      console.error('❌ Erro ao sincronizar itens:', response.status);
      console.error('📄 Resposta do servidor:', errorText);
      
      if (response.status === 404) {
        console.log('\n⚠️  ATENÇÃO: Endpoint /items/sync não encontrado!');
        console.log('✅ O código do endpoint já foi adicionado em backend/server.js');
        console.log('📝 Certifique-se de fazer deploy do backend atualizado no Vercel');
      }
    }
  } catch (err) {
    console.error('❌ Erro ao executar upload:', err.message);
    console.log('\n⚠️  Verifique se:');
    console.log('   1. O backend está rodando e com o código atualizado');
    console.log('   2. A URL está correta:', BASE_URL);
    console.log('   3. Você tem conexão com a internet');
    console.log('   4. O endpoint /items/sync foi adicionado no backend');
  }
}

uploadItems();
