// scripts/resetAndUploadItems.js
/**
 * Script para limpar todos os itens do banco e reenviar
 * Use este script se houver problemas com os itens
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://backend-psi-fawn-77.vercel.app';

async function resetAndUpload() {
  console.log('🗑️  Limpando itens antigos do banco de dados...\n');

  try {
    // Primeiro, limpa todos os itens
    const deleteResponse = await fetch(`${BASE_URL}/items/clear`, {
      method: 'DELETE',
    });

    if (deleteResponse.ok) {
      const deleteData = await deleteResponse.json();
      console.log(`✅ ${deleteData.deletedCount} itens removidos do banco\n`);
    } else {
      console.error('❌ Erro ao limpar itens:', deleteResponse.status);
    }

    // Aguarda 2 segundos
    console.log('⏳ Aguardando 2 segundos...\n');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Agora envia os novos itens
    console.log('📤 Enviando itens atualizados...\n');

    const jsonPath = path.join(process.cwd(), 'data', 'all-items.json');
    const allGameItems = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    const uploadResponse = await fetch(`${BASE_URL}/items/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: allGameItems }),
    });

    if (uploadResponse.ok) {
      const data = await uploadResponse.json();
      console.log('✅ SUCESSO! Itens sincronizados com o backend!');
      console.log(`📊 Total: ${data.total} | Criados: ${data.created} | Atualizados: ${data.updated}\n`);
      console.log('🎉 Banco de dados limpo e atualizado com os 206 itens!');
    } else {
      const errorText = await uploadResponse.text();
      console.error('❌ Erro ao enviar itens:', uploadResponse.status);
      console.error('📄 Resposta:', errorText);
    }
  } catch (err) {
    console.error('❌ Erro:', err.message);
  }
}

resetAndUpload();
