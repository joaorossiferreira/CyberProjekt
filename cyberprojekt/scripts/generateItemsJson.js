// scripts/generateItemsJson.js
const fs = require('fs');
const path = require('path');

async function generateJson() {
  try {
    const { allGameItems } = await import('../data/items/index.js');
    
    const jsonPath = path.join(process.cwd(), 'data/all-items.json');
    fs.writeFileSync(jsonPath, JSON.stringify(allGameItems, null, 2), 'utf-8');
    
    console.log('✅ Arquivo all-items.json gerado com sucesso!');
    console.log(`📦 Total de itens: ${allGameItems.length}`);
    console.log(`📁 Localização: ${jsonPath}`);
  } catch (err) {
    console.error('❌ Erro ao gerar JSON:', err.message);
  }
}

generateJson();
