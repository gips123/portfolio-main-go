// About API functions

import { apiClient } from './client';
import { AboutCard } from '../types';

/**
 * Get all about cards
 */
export async function getAboutCards(): Promise<AboutCard[]> {
  return await apiClient.get<AboutCard[]>('/api/about');
}

