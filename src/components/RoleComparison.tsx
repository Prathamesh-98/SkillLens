import { useEffect, useState } from 'react';
import { GitCompare, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Skill } from '../types';
import { roleRequirements } from '../data/learningPaths';

export const RoleComparison = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['AI Engineer', 'Data Scientist']);
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const profile = localStorage.getItem(`profile_${user?.id}`);
    if (profile) {
      const data = JSON.parse(profile);
      setUserSkills(data.skills || []);
    }
  }, [user]);

  const calculateMatch = (role: string) => {
    const requirements = roleRequirements[role as keyof typeof roleRequirements];
    if (!requirements) return 0;

    const matchedSkills = requirements.skills.filter(reqSkill =>
      userSkills.some(s => s.name === reqSkill && s.proficiency >= 60)
    );

    return Math.round((matchedSkills.length / requirements.skills.length) * 100);
  };

  const getMissingSkills = (role: string) => {
    const requirements = roleRequirements[role as keyof typeof roleRequirements];
    if (!requirements) return [];

    return requirements.skills.filter(reqSkill =>
      !userSkills.some(s => s.name === reqSkill && s.proficiency >= 60)
    );
  };

  const getUpskillTime = (role: string) => {
    const missingSkills = getMissingSkills(role);
    const months = missingSkills.length * 2;
    return `${months} months`;
  };

  const roles = Object.keys(roleRequirements);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Role Comparison</h1>
        <p className="text-gray-400 text-lg">Compare different roles and find your best fit</p>
      </div>

      <div className="flex flex-wrap gap-4">
        {roles.map(role => (
          <button
            key={role}
            onClick={() => {
              if (selectedRoles.includes(role)) {
                setSelectedRoles(selectedRoles.filter(r => r !== role));
              } else if (selectedRoles.length < 3) {
                setSelectedRoles([...selectedRoles, role]);
              }
            }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedRoles.includes(role)
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedRoles.map(role => {
          const match = calculateMatch(role);
          const requirements = roleRequirements[role as keyof typeof roleRequirements];
          const missingSkills = getMissingSkills(role);
          const matchedSkills = requirements.skills.filter(s => !missingSkills.includes(s));

          return (
            <div
              key={role}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all"
            >
              <h3 className="text-2xl font-bold text-white mb-6">{role}</h3>

              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${match * 3.27} ${327 - match * 3.27}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-3xl font-bold text-white">{match}%</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Upskilling Time</p>
                    <p className="text-white font-semibold">{getUpskillTime(role)}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-3">Matched Skills</h4>
                <div className="space-y-2">
                  {matchedSkills.slice(0, 3).map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{skill}</span>
                    </div>
                  ))}
                  {matchedSkills.length > 3 && (
                    <p className="text-xs text-gray-500">+{matchedSkills.length - 3} more</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3">Missing Skills</h4>
                <div className="space-y-2">
                  {missingSkills.slice(0, 3).map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{skill}</span>
                    </div>
                  ))}
                  {missingSkills.length > 3 && (
                    <p className="text-xs text-gray-500">+{missingSkills.length - 3} more</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedRoles.length > 0 && (
        <div className="p-8 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-4">Recommendation</h3>
          <p className="text-gray-300 text-lg">
            Based on your current skills, <span className="text-purple-400 font-semibold">{selectedRoles[0]}</span> appears to be your best fit with a {calculateMatch(selectedRoles[0])}% match.
            {getMissingSkills(selectedRoles[0]).length > 0 && (
              <> Focus on developing {getMissingSkills(selectedRoles[0]).slice(0, 2).join(' and ')} to increase your match percentage.</>
            )}
          </p>
        </div>
      )}
    </div>
  );
};
