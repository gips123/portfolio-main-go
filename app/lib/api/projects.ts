// Projects API functions

import { apiClient } from './client';
import { Project, Category, ProjectImage } from '../types';
/**
 * Get all projects, optionally filtered by category
 */
export async function getProjects(category?: string): Promise<Project[]> {
  try {
    const endpoint = category 
      ? `/api/projects?category=${category}` 
      : '/api/projects';
    return await apiClient.get<Project[]>(endpoint);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Get a single project by ID
 */
export async function getProjectById(id: number): Promise<Project | undefined> {
  try {
    return await apiClient.get<Project>(`/api/projects/${id}`);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Get all project categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await apiClient.get<Array<{ value: string; label: string }>>('/api/projects/categories');
    // Map backend format (value, label) to frontend format (id, name)
    return response.map(cat => ({
      id: cat.value,
      name: cat.label,
    }));
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Get all images for a project
 */
export async function getProjectImages(
  projectId: number,
  mainImage: string
): Promise<string[]> {
  try {
    const images = await apiClient.get<ProjectImage[]>(`/api/projects/${projectId}/images`);
    return images.map(img => img.imageUrl);
  } catch (error) {
    console.error('API Error:', error);
    // Fallback to mainImage only if API fails
    return [mainImage];
  }
}


