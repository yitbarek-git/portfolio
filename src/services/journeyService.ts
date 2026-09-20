import { mockJourneyEntries } from '../data/journey';
import { JourneyEntry } from '../types';

const SIMULATED_LATENCY = 300;

export const journeyService = {
  async getAll(): Promise<JourneyEntry[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockJourneyEntries);
      }, SIMULATED_LATENCY);
    });
  }
};
