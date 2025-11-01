const path = require('path');
const missionsModule = require(path.join(__dirname, '..', 'components', 'MissionSystem', 'missions', 'index'));

function countByDifficulty(allMissions) {
  const counts = { easy: 0, medium: 0, hard: 0 };
  for (const m of allMissions) {
    counts[m.difficulty] = (counts[m.difficulty] || 0) + 1;
  }
  return counts;
}

const all = missionsModule.allMissions || [];
const counts = countByDifficulty(all);
console.log('Total missions:', all.length);
console.log('By difficulty:', counts);
