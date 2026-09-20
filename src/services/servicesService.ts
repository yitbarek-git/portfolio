import { mockServices } from '../data/services';
import { Service } from '../types';

const SIMULATED_LATENCY = 300;

export const servicesService = {
  async getAll(): Promise<Service[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockServices);
      }, SIMULATED_LATENCY);
    });
  },

  async getBySlug(slug: string): Promise<Service | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = mockServices.find(s => s.slug === slug);
        resolve(found || null);
      }, SIMULATED_LATENCY);
    });
  }
};
