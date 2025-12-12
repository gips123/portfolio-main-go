// Skills API functions

import { apiClient } from './client';
import { SkillCategory, SkillsPageData } from '../types';
// API only; no dummy fallback

/**
 * Get all skill categories with skills
 */
export async function getSkills(): Promise<SkillCategory[]> {
  return await apiClient.get<SkillCategory[]>('/api/skills');
}

/**
 * Get skills page metadata
 */
export async function getSkillsPageData(): Promise<SkillsPageData> {
  return await apiClient.get<SkillsPageData>('/api/skills/page-data');
}

