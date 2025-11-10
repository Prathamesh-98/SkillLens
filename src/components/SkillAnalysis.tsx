import { useEffect, useState } from 'react';
import { TrendingUp, Award, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Skill } from '../types';

export const SkillAnalysis = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const profile = localStorage.getItem(`profile_${user?.id}`);
    if (profile) {
      const data = JSON.parse(profile);
      setSkills(data.skills || []);
    }
  }, [user]);

  const getSkillsByCategory = (category: string) => {
    return skills.filter(s => s.category === category);
  };

  const categories = ['AI', 'Data Science', 'Web Dev', 'Cloud'];
  const overallMatch = skills.length > 0 ? Math.round(skills.reduce((acc, s) => acc + s.proficiency, 0) / skills.length) : 0;

  const getColor = (proficiency: number) => {
    if (proficiency >= 80) return 'from-green-500 to-emerald-600';
    if (proficiency >= 60) return 'from-blue-500 to-cyan-600';
    if (proficiency >= 40) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Skill Analysis</h1>
        <p className="text-gray-400 text-lg">Comprehensive breakdown of your technical capabilities</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl border border-white/20">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Overall Match</h3>
          <p className="text-4xl font-bold text-white">{overallMatch}%</p>
        </div>

        <div className="p-8 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-white/20">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Total Skills</h3>
          <p className="text-4xl font-bold text-white">{skills.length}</p>
        </div>

        <div className="p-8 bg-gradient-to-br from-pink-600/20 to-red-600/20 backdrop-blur-sm rounded-3xl border border-white/20">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Strong Skills</h3>
          <p className="text-4xl font-bold text-white">{skills.filter(s => s.proficiency >= 70).length}</p>
        </div>
      </div>

      <div className="relative w-64 h-64 mx-auto mb-8">
        <svg className="transform -rotate-90 w-64 h-64">
          <circle
            cx="128"
            cy="128"
            r="100"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="20"
            fill="none"
          />
          <circle
            cx="128"
            cy="128"
            r="100"
            stroke="url(#gradient)"
            strokeWidth="20"
            fill="none"
            strokeDasharray={`${overallMatch * 6.28} ${628 - overallMatch * 6.28}`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-5xl font-bold text-white">{overallMatch}%</p>
            <p className="text-gray-400 text-sm mt-1">Skill Match</p>
          </div>
        </div>
      </div>

      {categories.map(category => {
        const categorySkills = getSkillsByCategory(category);
        if (categorySkills.length === 0) return null;

        return (
          <div key={category} className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">{category}</h3>
            <div className="space-y-4">
              {categorySkills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-gray-400">{skill.proficiency}%</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getColor(skill.proficiency)} rounded-full transition-all duration-1000`}
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl border border-green-500/30">
          <h4 className="text-lg font-bold text-white mb-3">Strong Skills</h4>
          <div className="space-y-2">
            {skills.filter(s => s.proficiency >= 70).map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-2xl border border-yellow-500/30">
          <h4 className="text-lg font-bold text-white mb-3">Moderate Skills</h4>
          <div className="space-y-2">
            {skills.filter(s => s.proficiency >= 50 && s.proficiency < 70).map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl border border-red-500/30">
          <h4 className="text-lg font-bold text-white mb-3">Needs Improvement</h4>
          <div className="space-y-2">
            {skills.filter(s => s.proficiency < 50).map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
