# Sistema de Itens

Este diretório contém todos os itens do jogo organizados por categoria e raridade.

## Estrutura

```
data/items/
├── types.ts              # Definições de tipos TypeScript
├── index.ts              # Exporta todos os itens e funções de sync
├── weapons/              # Armas permanentes por raridade
│   ├── common.ts         # 10 armas comuns
│   ├── rare.ts           # 8 armas raras
│   ├── epic.ts           # 7 armas épicas
│   ├── legendary.ts      # 5 armas lendárias
│   └── mythic.ts         # 3 armas míticas
├── sandevistan/          # Sandevistan por raridade
│   └── index.ts          # Todos os sandevistan (10 comuns, 8 raras, 7 épicas, 5 lendárias, 3 míticas)
└── rotation/             # Itens exclusivos da rotação
    └── index.ts          # Itens que SÓ aparecem na rotação da loja
```

## Como Adicionar Novos Itens

### 1. Adicionar Arma Comum

Edite `weapons/common.ts` e adicione um novo objeto no array:

```typescript
{
  itemId: 'weapon_common_11',  // ID único
  name: 'Minha Nova Arma',
  category: 'Arma',
  rarity: 'Comum',
  levelRequired: 1,
  price: 50,
  stats: { strength: 5, speed: 10, damage: 15, resistance: 0 },
  passive: 'Descrição do efeito passivo',
  type: 'fixed'  // 'fixed' = loja física, 'rotation' = rotação, 'gacha' = apenas gacha
}
```

### 2. Adicionar Sandevistan

Edite `sandevistan/index.ts` e adicione no array correspondente à raridade.

### 3. Adicionar Item de Rotação (Exclusivo)

Edite `rotation/index.ts`:

```typescript
{
  itemId: 'rotation_9',
  name: 'Item Exclusivo',
  category: 'Arma' ou 'Sandevistan',
  rarity: 'qualquer',
  levelRequired: 10,
  price: 500,
  stats: { ... },
  passive: 'EXCLUSIVO DA ROTAÇÃO - descrição',
  type: 'rotation'  // IMPORTANTE!
}
```

## Sincronizar com Backend

Após adicionar novos itens, você precisa sincronizá-los com o backend:

```bash
npx ts-node scripts/syncItems.ts
```

Ou adicione ao `package.json`:

```json
{
  "scripts": {
    "sync-items": "ts-node scripts/syncItems.ts"
  }
}
```

## Regras

1. **itemId** deve ser único em todo o jogo
2. **Itens de Rotação** devem ter `type: 'rotation'` e passive começando com "EXCLUSIVO DA ROTAÇÃO"
3. **Itens Fixos** têm `type: 'fixed'` e aparecem na loja física
4. **Gacha** pode puxar QUALQUER item do jogo (fixed + rotation)
5. **Não remova o texto "(gacha)"** - isso será removido automaticamente no código

## Contagem Atual

- **Armas**: 33 fixas (10 comum, 8 rara, 7 épica, 5 lendária, 3 mítica)
- **Sandevistan**: 33 fixos (10 comum, 8 rara, 7 épica, 5 lendária, 3 mítica)
- **Rotação**: 8 exclusivos
- **Total**: 74 itens únicos

## Backend

O backend precisa ter um endpoint `/items/sync` que:
1. Recebe array de itens
2. Para cada item:
   - Se `itemId` existe: atualiza (PUT)
   - Se não existe: cria (POST)
3. Retorna confirmação

Exemplo de chamada:

```typescript
POST /items/sync
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [...]
}
```
