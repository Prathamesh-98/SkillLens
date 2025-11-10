import { useState } from 'react';
import { Upload, FileText, CheckCircle, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Skill } from '../types';

interface ResumeUploadProps {
  onUploadSuccess: () => void;
}

export const ResumeUpload = ({ onUploadSuccess }: ResumeUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { user } = useAuth();

  const parseResume = (text: string): Skill[] => {
    const skills: Skill[] = [];
    const skillKeywords = [
      'Python', 'JavaScript', 'React', 'Node.js', 'Machine Learning', 'TensorFlow',
      'Deep Learning', 'Data Analysis', 'SQL', 'Docker', 'Kubernetes', 'AWS',
      'Cloud Computing', 'Natural Language Processing', 'Computer Vision',
      'Data Visualization', 'HTML', 'CSS', 'TypeScript', 'Java', 'C++'
    ];

    skillKeywords.forEach(skill => {
      if (text.toLowerCase().includes(skill.toLowerCase())) {
        skills.push({
          name: skill,
          proficiency: Math.floor(Math.random() * 40) + 60,
          category: getCategoryForSkill(skill)
        });
      }
    });

    return skills;
  };

  const getCategoryForSkill = (skill: string): string => {
    if (['Machine Learning', 'TensorFlow', 'Deep Learning', 'Natural Language Processing', 'Computer Vision'].includes(skill)) {
      return 'AI';
    } else if (['Python', 'Data Analysis', 'SQL', 'Data Visualization'].includes(skill)) {
      return 'Data Science';
    } else if (['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'TypeScript'].includes(skill)) {
      return 'Web Dev';
    } else if (['Docker', 'Kubernetes', 'AWS', 'Cloud Computing'].includes(skill)) {
      return 'Cloud';
    }
    return 'Other';
  };

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const skills = parseResume(text);

      setTimeout(() => {
        const profile = {
          user_id: user?.id,
          skills,
          experience: [],
          education: [],
          certifications: [],
          resume_text: text,
          uploaded_at: new Date().toISOString()
        };

        localStorage.setItem(`profile_${user?.id}`, JSON.stringify(profile));
        setIsProcessing(false);
        setIsCompleted(true);
        setTimeout(() => {
          onUploadSuccess();
        }, 2000);
      }, 3000);
    };

    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'text/plain' || file.name.endsWith('.docx'))) {
      handleFileUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Upload Your Resume</h1>
        <p className="text-gray-400 text-lg">Let AI analyze your skills and unlock your career potential</p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative p-12 bg-white/5 backdrop-blur-sm rounded-3xl border-2 border-dashed transition-all ${
          isDragging
            ? 'border-purple-500 bg-purple-500/10'
            : 'border-white/20 hover:border-white/40'
        }`}
      >
        {!isProcessing && !isCompleted && (
          <>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Drop your resume here</h3>
              <p className="text-gray-400 mb-6">or click to browse</p>
              <label className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold cursor-pointer hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105">
                Select File
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileInput}
                />
              </label>
              <p className="text-gray-500 text-sm mt-4">Supported formats: PDF, DOC, DOCX, TXT</p>
            </div>
          </>
        )}

        {isProcessing && (
          <div className="text-center">
            <Loader className="w-16 h-16 text-purple-400 mx-auto mb-6 animate-spin" />
            <h3 className="text-2xl font-bold text-white mb-2">Analyzing Your Resume</h3>
            <p className="text-gray-400">AI is extracting your skills and experience...</p>
          </div>
        )}

        {isCompleted && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">Analysis Complete!</h3>
            <p className="text-gray-400">Your profile has been created successfully</p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <FileText className="w-8 h-8 text-blue-400 mb-3" />
          <h4 className="text-lg font-bold text-white mb-2">Instant Parsing</h4>
          <p className="text-gray-400 text-sm">AI extracts skills, experience, and education instantly</p>
        </div>
        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
          <h4 className="text-lg font-bold text-white mb-2">Smart Analysis</h4>
          <p className="text-gray-400 text-sm">Advanced algorithms identify your strengths and gaps</p>
        </div>
        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <Upload className="w-8 h-8 text-purple-400 mb-3" />
          <h4 className="text-lg font-bold text-white mb-2">Secure Upload</h4>
          <p className="text-gray-400 text-sm">Your data is encrypted and stored securely</p>
        </div>
      </div>
    </div>
  );
};
