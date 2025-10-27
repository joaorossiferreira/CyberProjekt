// scripts/buildItemsJson.ts
import { allGameItems } from '../data/items/index.js';
import * as fs from 'fs';
import * as path from 'path';

const jsonPath = path.join(process.cwd(), 'data', 'all-items.json');

fs.writeFileSync(jsonPath, JSON.stringify(allGameItems, null, 2), 'utf-8');

console.log('✅ Arquivo all-items.json gerado com sucesso!');
console.log(`📦 Total de itens: ${allGameItems.length}`);
console.log(`📁 Localização: ${jsonPath}`);
