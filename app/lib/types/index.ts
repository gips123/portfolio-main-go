// Type definitions matching Golang backend models

// About Types
export interface Paragraph {
  text: string;
  type: "highlight" | "normal";
}

export interface Hobby {
  title: string;
  desc: string;
}

export interface AboutContent {
  paragraphs?: Paragraph[];
  hobbies?: Hobby[];
  quote?: string;
}

export interface AboutCard {
  id: string;
  title: string;
  icon: string;
  content: AboutContent;
}

// Project Types
export interface Category {
  id: string;
  name: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  imageTitle: string;
  imageDescription: string;
  imageUrl: string;
  buttonText: string;
  detailUrl: string;
  category: string;
}

export interface ProjectImage {
  id: number;
  projectId: number;
  imageUrl: string;
  order: number;
}

// Contact Types
export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  link: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string;
}

export interface ContactPageData {
  title: string;
  description: string;
  contactInfo: ContactInfo[];
  socialLinks: SocialLink[];
}

// Skills Types
export interface Skill {
  name: string;
  percentage: number;
  icon: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: Skill[];
}

export interface SkillsPageData {
  title: string;
  description: string;
}

