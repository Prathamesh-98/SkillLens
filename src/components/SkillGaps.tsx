import { useEffect, useState } from 'react';
import { AlertCircle, TrendingDown, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Skill, SkillGap } from '../types';
import { roleRequirements } from '../data/learningPaths';

export const SkillGaps = () => {
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('AI Engineer');
  const { user } = useAuth();

  useEffect(() => {
    const profile = localStorage.getItem(`profile_${user?.id}`);
    if (profile) {
      const data = JSON.parse(profile);
      const userSkills: Skill[] = data.skills || [];
      calculateGaps(userSkills, selectedRole);
    }
  }, [user, selectedRole]);

  const calculateGaps = (userSkills: Skill[], role: string) => {
    const requirements = roleRequirements[role as keyof typeof roleRequirements];
    if (!requirements) return;

    const gaps: SkillGap[] = requirements.skills.map(reqSkill => {
      const userSkill = userSkills.find(s => s.name === reqSkill);
      const current = userSkill?.proficiency || 0;
      const required = 75;
      const gap = Math.max(0, required - current);

      let priority: 'high' | 'medium' | 'low' = 'low';
      if (gap > 50) priority = 'high';
      else if (gap > 25) priority = 'medium';

      return { skill: reqSkill, current, required, gap, priority };
    });

    setSkillGaps(gaps.sort((a, b) => b.gap - a.gap));
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'from-red-500 to-pink-600';
    if (priority === 'medium') return 'from-yellow-500 to-orange-600';
    return 'from-green-500 to-emerald-600';
  };

  const highPriorityCount = skillGaps.filter(g => g.priority === 'high').length;
  const mediumPriorityCount = skillGaps.filter(g => g.priority === 'medium').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Skill Gaps Analysis</h1>
        <p className="text-gray-400 text-lg">Identify what's missing to reach your target role</p>
      </div>

      <div className="flex gap-4 flex-wrap">
        {Object.keys(roleRequirements).map(role => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedRole === role
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-8 bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-red-500/30">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">High Priority</h3>
          <p className="text-4xl font-bold text-white">{highPriorityCount}</p>
        </div>

        <div className="p-8 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-3xl border border-yellow-500/30">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
            <TrendingDown className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Medium Priority</h3>
          <p className="text-4xl font-bold text-white">{mediumPriorityCount}</p>
        </div>

        <div className="p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl border border-blue-500/30">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Total Gaps</h3>
          <p className="text-4xl font-bold text-white">{skillGaps.length}</p>
        </div>
      </div>

      <div className="space-y-4">
        {skillGaps.map((gap, idx) => (
          <div
            key={idx}
            className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{gap.skill}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm">Current: {gap.current}%</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-400 text-sm">Required: {gap.required}%</span>
                </div>
              </div>
              <div className={`px-4 py-2 bg-gradient-to-r ${getPriorityColor(gap.priority)} rounded-full`}>
                <span className="text-white text-sm font-semibold capitalize">{gap.priority}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-400">Current Level</span>
                <span className="text-gray-400">Target Level</span>
              </div>
              <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                  style={{ width: `${gap.current}%` }}
                ></div>
                <div
                  className="absolute h-full border-r-2 border-white/50"
                  style={{ left: `${gap.required}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-400">Gap: {gap.gap}%</p>
            </div>
          </div>
        ))}
      </div>

      {skillGaps.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No Skill Gaps Found!</h3>
          <p className="text-gray-400">You meet all requirements for this role</p>
        </div>
      )}
    </div>
  );
};
