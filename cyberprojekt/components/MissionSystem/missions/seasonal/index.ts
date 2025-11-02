import { halloweenMissions } from './halloween';
import { christmasMissions } from './christmas';

export { halloweenMissions, christmasMissions };

// 🔧 DEBUG MODE: Simula data sem mudar o relógio do celular
// Altere para testar eventos sazonais sem problemas de SSL/JWT
// Valores: null (desativado), 'halloween', 'christmas'
const DEBUG_FORCE_EVENT: 'halloween' | 'christmas' | null = null;

// Verifica se é Halloween (31 de outubro)
export function isHalloween(): boolean {
  if (DEBUG_FORCE_EVENT === 'halloween') {
    console.log('🔧 DEBUG MODE: Forçando evento Halloween');r
    return true;
  }
  
  const now = new Date();
  const month = now.getMonth(); // 0-11 (outubro = 9)
  const day = now.getDate();
  console.log(`🎃 Halloween Check: Month=${month}, Day=${day}, IsHalloween=${month === 9 && day === 31}`);
  return month === 9 && day === 31;
}

// Verifica se é Natal (25 de dezembro)
export function isChristmas(): boolean {
  if (DEBUG_FORCE_EVENT === 'christmas') {
    console.log('🔧 DEBUG MODE: Forçando evento Christmas');
    return true;
  }
  
  const now = new Date();
  const month = now.getMonth(); // 0-11 (dezembro = 11)
  const day = now.getDate();
  console.log(`🎄 Christmas Check: Month=${month}, Day=${day}, IsChristmas=${month === 11 && day === 25}`);
  return month === 11 && day === 25;
}

// Retorna evento sazonal ativo (se houver)
export function getActiveSeasonalEvent(): 'halloween' | 'christmas' | null {
  if (DEBUG_FORCE_EVENT) {
    console.log(`🔧 DEBUG MODE: Forçando evento ${DEBUG_FORCE_EVENT.toUpperCase()}`);
    return DEBUG_FORCE_EVENT;
  }
  
  const event = isHalloween() ? 'halloween' : isChristmas() ? 'christmas' : null;
  console.log(`🎉 Active Seasonal Event: ${event || 'NONE'}`);
  return event;
}
