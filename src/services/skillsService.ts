import { mockSkillCategories } from '../data/skills';
import { SkillCategory } from '../types';

const SIMULATED_LATENCY = 300;

export const skillsService = {
  async getAllCategories(): Promise<SkillCategory[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockSkillCategories);
      }, SIMULATED_LATENCY);
    });
  }
};
