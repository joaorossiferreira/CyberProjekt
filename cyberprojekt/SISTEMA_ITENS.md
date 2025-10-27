# Sistema de Itens - Resumo

## ✅ O que foi criado:

### 1. Estrutura de Dados (`data/items/`)
- **types.ts**: Definições TypeScript para itens
- **weapons/**: 33 armas divididas por raridade
  - common.ts: 10 armas
  - rare.ts: 8 armas
  - epic.ts: 7 armas
  - legendary.ts: 5 armas
  - mythic.ts: 3 armas
- **sandevistan/**: 33 sandevistan divididos por raridade
  - Mesma distribuição das armas
- **rotation/**: 8 itens exclusivos da rotação
- **index.ts**: Exporta tudo e tem função de sync

### 2. Hook React (`hooks/useItems.ts`)
- Remove automaticamente "(gacha)" dos nomes
- Funções helper para filtrar itens
- Pronto para usar em qualquer componente

### 3. Script de Sincronização (`scripts/syncItems.ts`)
- Mostra estatísticas dos itens
- Explica como sincronizar com backend

### 4. Documentação (`data/items/README.md`)
- Como adicionar novos itens
- Regras do sistema
- Estrutura completa

## 📊 Totais:

- **74 itens únicos no jogo**
- **Armas**: 33 fixas + itens rotação
- **Sandevistan**: 33 fixos + itens rotação
- **Rotação**: 8 exclusivos

## 🎯 Próximos Passos:

### 1. Backend - Criar endpoint `/items/sync`

```javascript
// backend/server.js
app.post('/items/sync', authenticateToken, async (req, res) => {
  const { items } = req.body;
  
  try {
    for (const item of items) {
      // Upsert: atualiza se existe, cria se não existe
      await db.collection('items').updateOne(
        { itemId: item.itemId },
        { $set: item },
        { upsert: true }
      );
    }
    
    res.json({ 
      message: 'Itens sincronizados com sucesso',
      count: items.length 
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao sincronizar itens' });
  }
});
```

### 2. Modificar Shop para usar itens locais

```typescript
// Em shop.tsx
import { useItems } from '../../hooks/useItems';

const { fixedItems, rotationItems, allItems } = useItems();

// Usar fixedItems para loja física
// Usar rotationItems para rotação
// Usar allItems para gacha
```

### 3. Remover "(gacha)" automático

O hook `useItems` já faz isso! Só usar o hook em todos os lugares.

## 🔧 Como Usar:

### Adicionar nova arma comum:
1. Abra `data/items/weapons/common.ts`
2. Adicione objeto no array
3. Rode `npx ts-node scripts/syncItems.ts`
4. Backend atualiza automaticamente

### Adicionar item de rotação:
1. Abra `data/items/rotation/index.ts`
2. Adicione com `type: 'rotation'`
3. Sync com backend
4. Aparece apenas na rotação!

### Em qualquer componente:
```typescript
const { allItems, cleanItemName } = useItems();
const myItem = allItems.find(i => i.itemId === 'weapon_common_1');
console.log(myItem.name); // Sem "(gacha)"!
```
