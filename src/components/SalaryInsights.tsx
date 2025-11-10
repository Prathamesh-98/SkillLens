import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Skill } from '../types';
import { roleRequirements } from '../data/learningPaths';

interface SalaryData {
  role: string;
  minSalary: number;
  maxSalary: number;
  avgSalary: number;
  skillMatch: number;
}

export const SalaryInsights = () => {
  const [salaryData, setSalaryData] = useState<SalaryData[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const profile = localStorage.getItem(`profile_${user?.id}`);
    if (profile) {
      const data = JSON.parse(profile);
      const userSkills: Skill[] = data.skills || [];
      calculateSalaries(userSkills);
    }
  }, [user]);

  const calculateSalaries = (userSkills: Skill[]) => {
    const baseSalaries: Record<string, { min: number; max: number; avg: number }> = {
      'AI Engineer': { min: 120000, max: 200000, avg: 160000 },
      'Data Scientist': { min: 100000, max: 170000, avg: 135000 },
      'Full Stack Developer': { min: 90000, max: 150000, avg: 120000 },
      'Cloud Architect': { min: 130000, max: 210000, avg: 170000 },
      'Frontend Developer': { min: 80000, max: 140000, avg: 110000 }
    };

    const salaries: SalaryData[] = Object.keys(roleRequirements).map(role => {
      const requirements = roleRequirements[role as keyof typeof roleRequirements];
      const matchedSkills = requirements.skills.filter(reqSkill =>
        userSkills.some(s => s.name === reqSkill && s.proficiency >= 60)
      );
      const skillMatch = Math.round((matchedSkills.length / requirements.skills.length) * 100);

      const base = baseSalaries[role];
      const multiplier = skillMatch / 100;

      return {
        role,
        minSalary: Math.round(base.min * (0.7 + multiplier * 0.3)),
        maxSalary: Math.round(base.max * (0.7 + multiplier * 0.3)),
        avgSalary: Math.round(base.avg * (0.7 + multiplier * 0.3)),
        skillMatch
      };
    });

    setSalaryData(salaries.sort((a, b) => b.avgSalary - a.avgSalary));
  };

  const formatSalary = (amount: number) => {
    return `$${(amount / 1000).toFixed(0)}K`;
  };

  const getMatchColor = (match: number) => {
    if (match >= 80) return 'from-green-500 to-emerald-600';
    if (match >= 60) return 'from-blue-500 to-cyan-600';
    if (match >= 40) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const highestPaying = salaryData[0];
  const totalAvg = salaryData.length > 0
    ? Math.round(salaryData.reduce((sum, d) => sum + d.avgSalary, 0) / salaryData.length)
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Salary Insights</h1>
        <p className="text-gray-400 text-lg">Understand your earning potential based on skills</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-8 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-3xl border border-green-500/30">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Highest Potential</h3>
          <p className="text-3xl font-bold text-white mb-1">{formatSalary(highestPaying?.maxSalary || 0)}</p>
          <p className="text-gray-400 text-sm">{highestPaying?.role}</p>
        </div>

        <div className="p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl border border-blue-500/30">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Average Salary</h3>
          <p className="text-3xl font-bold text-white">{formatSalary(totalAvg)}</p>
          <p className="text-gray-400 text-sm">Across all roles</p>
        </div>

        <div className="p-8 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-purple-500/30">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Best Match</h3>
          <p className="text-3xl font-bold text-white">{highestPaying?.skillMatch}%</p>
          <p className="text-gray-400 text-sm">{highestPaying?.role}</p>
        </div>
      </div>

      <div className="space-y-4">
        {salaryData.map((data, idx) => (
          <div
            key={idx}
            className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{data.role}</h3>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 bg-gradient-to-r ${getMatchColor(data.skillMatch)} rounded-full`}>
                    <span className="text-white text-xs font-semibold">{data.skillMatch}% Match</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {formatSalary(data.avgSalary)}
                </p>
                <p className="text-gray-400 text-sm">Average</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex-1">
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000"
                    style={{ width: `${data.skillMatch}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Min</p>
                  <p className="text-white font-semibold">{formatSalary(data.minSalary)}</p>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div>
                  <p className="text-gray-400">Max</p>
                  <p className="text-white font-semibold">{formatSalary(data.maxSalary)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-4">Maximize Your Earnings</h3>
        <p className="text-gray-300 text-lg mb-4">
          Your skill match directly impacts your earning potential. Improving your skills in high-demand areas can increase your salary by up to 30%.
        </p>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">•</span>
            <span>Focus on closing skill gaps for your target role</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">•</span>
            <span>Earn certifications from recognized providers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">•</span>
            <span>Build projects to demonstrate practical experience</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
