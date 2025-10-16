import { easyMissions } from './easy';
import { mediumMissions } from './medium';
import { hardMissions } from './hard';

export const allMissions = [
  ...easyMissions,
  ...mediumMissions,
  ...hardMissions,
];

export { easyMissions, mediumMissions, hardMissions };