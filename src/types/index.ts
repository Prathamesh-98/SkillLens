export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photoURL?: string;
  created_at: string;
}

export interface Skill {
  name: string;
  proficiency: number;
  category: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  resume_text: string;
  uploaded_at: string;
}

export interface LearningPath {
  id: string;
  skill_name: string;
  course_name: string;
  provider: string;
  level: string;
  duration: string;
  link: string;
  project_idea: string;
  category: string;
}

export interface ProgressReport {
  id: string;
  user_id: string;
  old_skills: Skill[];
  new_skills: Skill[];
  improvement_score: number;
  skill_additions: Skill[];
  skill_improvements: Skill[];
  generated_at: string;
}

export interface SkillGap {
  skill: string;
  current: number;
  required: number;
  gap: number;
  priority: 'high' | 'medium' | 'low';
}

export interface RoleComparison {
  role: string;
  match_percentage: number;
  required_skills: string[];
  missing_skills: string[];
  upskilling_time: string;
}

export interface SalaryInsight {
  role: string;
  min_salary: number;
  max_salary: number;
  avg_salary: number;
  skill_match: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
