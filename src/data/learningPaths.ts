import { LearningPath } from '../types';

export const learningPaths: LearningPath[] = [
  {
    id: '1',
    skill_name: 'Machine Learning',
    course_name: 'Machine Learning Specialization',
    provider: 'Coursera',
    level: 'Intermediate',
    duration: '3 months',
    link: 'https://www.coursera.org/specializations/machine-learning-introduction',
    project_idea: 'Build a predictive model for customer churn',
    category: 'AI'
  },
  {
    id: '2',
    skill_name: 'Python',
    course_name: 'Python for Everybody',
    provider: 'Coursera',
    level: 'Beginner',
    duration: '2 months',
    link: 'https://www.coursera.org/specializations/python',
    project_idea: 'Create a web scraper and data analyzer',
    category: 'Data Science'
  },
  {
    id: '3',
    skill_name: 'TensorFlow',
    course_name: 'DeepLearning.AI TensorFlow Developer',
    provider: 'Coursera',
    level: 'Advanced',
    duration: '4 months',
    link: 'https://www.coursera.org/professional-certificates/tensorflow-in-practice',
    project_idea: 'Build a computer vision image classifier',
    category: 'AI'
  },
  {
    id: '4',
    skill_name: 'Data Analysis',
    course_name: 'Google Data Analytics',
    provider: 'Google',
    level: 'Beginner',
    duration: '6 months',
    link: 'https://www.coursera.org/professional-certificates/google-data-analytics',
    project_idea: 'Analyze business metrics and create dashboards',
    category: 'Data Science'
  },
  {
    id: '5',
    skill_name: 'Cloud Computing',
    course_name: 'AWS Cloud Practitioner Essentials',
    provider: 'AWS',
    level: 'Beginner',
    duration: '1 month',
    link: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    project_idea: 'Deploy a scalable web application on AWS',
    category: 'Cloud'
  },
  {
    id: '6',
    skill_name: 'React',
    course_name: 'Meta Front-End Developer',
    provider: 'Coursera',
    level: 'Intermediate',
    duration: '5 months',
    link: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
    project_idea: 'Build a full-featured e-commerce site',
    category: 'Web Dev'
  },
  {
    id: '7',
    skill_name: 'Node.js',
    course_name: 'IBM Back-End Development',
    provider: 'IBM SkillsBuild',
    level: 'Intermediate',
    duration: '3 months',
    link: 'https://www.coursera.org/professional-certificates/ibm-backend-development',
    project_idea: 'Create a RESTful API with authentication',
    category: 'Web Dev'
  },
  {
    id: '8',
    skill_name: 'Deep Learning',
    course_name: 'Deep Learning Specialization',
    provider: 'Coursera',
    level: 'Advanced',
    duration: '5 months',
    link: 'https://www.coursera.org/specializations/deep-learning',
    project_idea: 'Build a neural network from scratch',
    category: 'AI'
  },
  {
    id: '9',
    skill_name: 'SQL',
    course_name: 'Google Data Analytics SQL',
    provider: 'Google',
    level: 'Beginner',
    duration: '1 month',
    link: 'https://www.coursera.org/learn/analyze-data',
    project_idea: 'Design and query a complex database',
    category: 'Data Science'
  },
  {
    id: '10',
    skill_name: 'Docker',
    course_name: 'Docker and Kubernetes',
    provider: 'Google Cloud',
    level: 'Intermediate',
    duration: '2 months',
    link: 'https://www.coursera.org/learn/introduction-to-containers-and-docker',
    project_idea: 'Containerize and deploy microservices',
    category: 'Cloud'
  },
  {
    id: '11',
    skill_name: 'Natural Language Processing',
    course_name: 'NLP Specialization',
    provider: 'Coursera',
    level: 'Advanced',
    duration: '4 months',
    link: 'https://www.coursera.org/specializations/natural-language-processing',
    project_idea: 'Build a chatbot with sentiment analysis',
    category: 'AI'
  },
  {
    id: '12',
    skill_name: 'Data Visualization',
    course_name: 'Tableau Business Intelligence Analyst',
    provider: 'Tableau',
    level: 'Intermediate',
    duration: '3 months',
    link: 'https://www.coursera.org/professional-certificates/tableau-business-intelligence-analyst',
    project_idea: 'Create interactive business dashboards',
    category: 'Data Science'
  },
  {
    id: '13',
    skill_name: 'JavaScript',
    course_name: 'Meta JavaScript Fundamentals',
    provider: 'Meta',
    level: 'Beginner',
    duration: '2 months',
    link: 'https://www.coursera.org/learn/programming-with-javascript',
    project_idea: 'Build an interactive web game',
    category: 'Web Dev'
  },
  {
    id: '14',
    skill_name: 'Kubernetes',
    course_name: 'Kubernetes Fundamentals',
    provider: 'Google Cloud',
    level: 'Advanced',
    duration: '2 months',
    link: 'https://www.coursera.org/learn/google-kubernetes-engine',
    project_idea: 'Orchestrate containerized applications',
    category: 'Cloud'
  },
  {
    id: '15',
    skill_name: 'Computer Vision',
    course_name: 'Computer Vision Specialization',
    provider: 'Coursera',
    level: 'Advanced',
    duration: '4 months',
    link: 'https://www.coursera.org/specializations/firstprinciplesofcomputervision',
    project_idea: 'Build an object detection system',
    category: 'AI'
  }
];

export const roleRequirements = {
  'AI Engineer': {
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Deep Learning', 'Natural Language Processing', 'Computer Vision'],
    proficiency: { beginner: 20, intermediate: 40, advanced: 40 }
  },
  'Data Scientist': {
    skills: ['Python', 'Data Analysis', 'Machine Learning', 'SQL', 'Data Visualization'],
    proficiency: { beginner: 20, intermediate: 50, advanced: 30 }
  },
  'Full Stack Developer': {
    skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Docker'],
    proficiency: { beginner: 15, intermediate: 55, advanced: 30 }
  },
  'Cloud Architect': {
    skills: ['Cloud Computing', 'Docker', 'Kubernetes', 'Python', 'SQL'],
    proficiency: { beginner: 10, intermediate: 40, advanced: 50 }
  },
  'Frontend Developer': {
    skills: ['JavaScript', 'React', 'HTML/CSS', 'TypeScript'],
    proficiency: { beginner: 20, intermediate: 50, advanced: 30 }
  }
};
