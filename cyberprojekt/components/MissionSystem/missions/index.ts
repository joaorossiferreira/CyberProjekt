import { easyMissions } from './easy';
import { mediumMissions } from './medium';
import { hardMissions } from './hard';
import { Mission } from '../types';

function normalizeText(s?: string) {
  if (!s) return '';
  // remove diacritics, lowercase, remove non-alphanumeric, collapse spaces
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function missionKey(m: Mission) {
  // Prefer code content for code missions, else use description+question/title
  if (m.type === 'code' && m.data) {
    const code = (m.data.correctCode || m.data.code || '').toString();
    return `code:${normalizeText(code)}`;
  }
  const parts = [m.title, m.description, m.data?.question, m.data?.description]
    .map(p => normalizeText(p))
    .filter(Boolean)
    .join(' ');
  return `gen:${parts}`;
}

// Merge and deduplicate
const merged: Mission[] = [...easyMissions, ...mediumMissions, ...hardMissions];
const seen = new Map<string, Mission>();
for (const m of merged) {
  const key = missionKey(m);
  if (!seen.has(key)) seen.set(key, m);
}

// Fuzzy-dedupe for human text (catch case/spacing and small-typo duplicates)
function levenshtein(a: string, b: string) {
  if (a === b) return 0;
  const al = a.length, bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;
  const v0 = new Array(bl + 1).fill(0);
  const v1 = new Array(bl + 1).fill(0);
  for (let j = 0; j <= bl; j++) v0[j] = j;
  for (let i = 0; i < al; i++) {
    v1[0] = i + 1;
    for (let j = 0; j < bl; j++) {
      const cost = a[i] === b[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (let j = 0; j <= bl; j++) v0[j] = v1[j];
  }
  return v1[bl];
}

const unique: Mission[] = [];
const keys = Array.from(seen.keys());
for (const k of keys) {
  const m = seen.get(k)!;
  // code missions already deduped by code key; accept them directly
  if (k.startsWith('code:')) {
    unique.push(m);
    continue;
  }

  const normalized = k.replace(/^gen:/, '').trim();
  let isDuplicate = false;
  for (const u of unique) {
    const uk = missionKey(u);
    if (uk.startsWith('code:')) continue;
    const unorm = uk.replace(/^gen:/, '').trim();
    const maxLen = Math.max(normalized.length, unorm.length) || 1;
    const dist = levenshtein(normalized, unorm);
    const ratio = 1 - dist / maxLen;
    // if very similar (>=85%) or one contains the other, treat as duplicate
    if (ratio >= 0.85 || normalized.includes(unorm) || unorm.includes(normalized)) {
      isDuplicate = true;
      break;
    }
  }
  if (!isDuplicate) unique.push(m);
}

export const allMissions = unique;

export { easyMissions, mediumMissions, hardMissions };