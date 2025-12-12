// Contact API functions

import { apiClient } from './client';
import { ContactPageData, ContactInfo, SocialLink } from '../types';

/**
 * Get contact page data (includes contact info, social links, and page metadata)
 */
export async function getContactData(): Promise<ContactPageData> {
  return await apiClient.get<ContactPageData>('/api/contact');
}

/**
 * Get contact info only
 */
export async function getContactInfo(): Promise<ContactInfo[]> {
  const data = await getContactData();
  return data.contactInfo;
}

/**
 * Get social links only
 */
export async function getSocialLinks(): Promise<SocialLink[]> {
  const data = await getContactData();
  return data.socialLinks;
}

