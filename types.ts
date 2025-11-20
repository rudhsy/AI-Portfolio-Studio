
export interface ProjectCaseStudyBlock {
  type: 'text' | 'image' | 'video';
  content: string;
  caption?: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  role: string;
  shortDescription: string;
  coverImageGradient: string;
  textColor?: string;
  caseStudy: ProjectCaseStudyBlock[];
}

export interface ResumeItem {
  id: string;
  title: string;
  subtitle: string;
  date?: string;
  description?: string;
  bullets?: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface PersonalDetails {
  name: string;
  rollNo: string;
  program: string;
  department: string;
  institute: string;
  specialization: string;
  gender: string;
  dob: string;
  graduationYear: string;
  cpi: string;
  tagline: string;
  portfolio: string;
}

export interface ResumeData {
  personal: PersonalDetails;
  education: ResumeItem[];
  experience: ResumeItem[];
  projects: ResumeItem[];
  positions: ResumeItem[];
  skills: SkillCategory[];
  awards: ResumeItem[];
}
