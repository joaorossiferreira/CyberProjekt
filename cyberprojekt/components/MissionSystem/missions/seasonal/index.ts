import { halloweenMissions } from './halloween';
import { christmasMissions } from './christmas';

export { halloweenMissions, christmasMissions };

// Verifica se é Halloween (31 de outubro)
export function isHalloween(): boolean {
  const now = new Date();
  const month = now.getMonth(); // 0-11 (outubro = 9)
  const day = now.getDate();
  console.log(`🎃 Halloween Check: Month=${month}, Day=${day}, IsHalloween=${month === 9 && day === 31}`);
  return month === 9 && day === 31;
}

// Verifica se é Natal (25 de dezembro)
export function isChristmas(): boolean {
  const now = new Date();
  const month = now.getMonth(); // 0-11 (dezembro = 11)
  const day = now.getDate();
  console.log(`🎄 Christmas Check: Month=${month}, Day=${day}, IsChristmas=${month === 11 && day === 25}`);
  return month === 11 && day === 25;
}

// Retorna evento sazonal ativo (se houver)
export function getActiveSeasonalEvent(): 'halloween' | 'christmas' | null {
  const event = isHalloween() ? 'halloween' : isChristmas() ? 'christmas' : null;
  console.log(`🎉 Active Seasonal Event: ${event || 'NONE'}`);
  return event;
}
