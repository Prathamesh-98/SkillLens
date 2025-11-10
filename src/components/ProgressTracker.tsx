import { useState } from 'react';
import { TrendingUp, Upload, CheckCircle, Award, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProgressTracker = () => {
  const [hasComparison, setHasComparison] = useState(false);
  const { user } = useAuth();

  const handleCompare = () => {
    const oldProfile = localStorage.getItem(`profile_${user?.id}`);
    if (oldProfile) {
      const comparisonData = {
        oldSkillCount: 8,
        newSkillCount: 12,
        improvement: 35,
        newSkills: ['Kubernetes', 'Docker', 'TypeScript', 'GraphQL'],
        improvedSkills: ['React', 'Python', 'Machine Learning', 'AWS']
      };

      localStorage.setItem(`progress_${user?.id}`, JSON.stringify(comparisonData));
      setHasComparison(true);
    }
  };

  if (!hasComparison) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Progress Tracker</h1>
          <p className="text-gray-400 text-lg">Track your skill development over time</p>
        </div>

        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Upload className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Upload an Updated Resume</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            To track your progress, upload an updated version of your resume. We'll compare it with your previous profile and show you how much you've grown.
          </p>
          <button
            onClick={handleCompare}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl text-white font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
          >
            Compare Progress (Demo)
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
            <h4 className="text-lg font-bold text-white mb-2">Before & After</h4>
            <p className="text-gray-400 text-sm">See exactly how your skills have improved</p>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <TrendingUp className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="text-lg font-bold text-white mb-2">Growth Metrics</h4>
            <p className="text-gray-400 text-sm">Quantify your skill development journey</p>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <Award className="w-8 h-8 text-purple-400 mb-3" />
            <h4 className="text-lg font-bold text-white mb-2">Achievements</h4>
            <p className="text-gray-400 text-sm">Celebrate your learning milestones</p>
          </div>
        </div>
      </div>
    );
  }

  const progressData = {
    oldSkillCount: 8,
    newSkillCount: 12,
    improvement: 35,
    newSkills: ['Kubernetes', 'Docker', 'TypeScript', 'GraphQL'],
    improvedSkills: ['React', 'Python', 'Machine Learning', 'AWS']
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Progress Report</h1>
        <p className="text-gray-400 text-lg">Your skill development journey</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-8 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-3xl border border-green-500/30">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Overall Improvement</h3>
          <p className="text-5xl font-bold text-white">+{progressData.improvement}%</p>
        </div>

        <div className="p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl border border-blue-500/30">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">New Skills Added</h3>
          <p className="text-5xl font-bold text-white">+{progressData.newSkills.length}</p>
        </div>

        <div className="p-8 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-purple-500/30">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Skills Improved</h3>
          <p className="text-5xl font-bold text-white">{progressData.improvedSkills.length}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Before</h3>
          </div>
          <div className="text-center py-8">
            <p className="text-5xl font-bold text-gray-400 mb-2">{progressData.oldSkillCount}</p>
            <p className="text-gray-500">Total Skills</p>
          </div>
        </div>

        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white">After</h3>
          </div>
          <div className="text-center py-8">
            <p className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              {progressData.newSkillCount}
            </p>
            <p className="text-gray-500">Total Skills</p>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-3xl border border-green-500/30">
        <h3 className="text-2xl font-bold text-white mb-6">New Skills Acquired</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {progressData.newSkills.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-semibold">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl border border-blue-500/30">
        <h3 className="text-2xl font-bold text-white mb-6">Improved Skills</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {progressData.improvedSkills.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-semibold">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-red-600/20 backdrop-blur-sm rounded-3xl border border-white/20 text-center">
        <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-white mb-3">Outstanding Progress!</h3>
        <p className="text-gray-300 text-lg">
          You've improved your skill set by {progressData.improvement}%. Keep up the great work and continue learning!
        </p>
      </div>
    </div>
  );
};
