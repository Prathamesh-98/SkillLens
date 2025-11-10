import { Award, Download, Share2, Target, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfileShowcase = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl font-bold text-white">Profile Showcase</h1>
        </div>
        <p className="text-gray-400 text-lg">Create a shareable portfolio of your skills</p>
      </div>

      <div className="flex gap-4">
        <button className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl text-white font-bold hover:shadow-lg transition-all flex items-center gap-3">
          <Download className="w-5 h-5" />
          <span>Generate Portfolio</span>
        </button>
        <button className="px-8 py-4 bg-white/10 rounded-xl text-white font-bold hover:bg-white/20 transition-all flex items-center gap-3">
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      <div className="p-12 bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border-2 border-white/20">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl font-bold">{user?.email?.charAt(0).toUpperCase()}</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">{user?.email}</h2>
          <p className="text-gray-400 text-lg">SkillLens User</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl text-center">
            <Target className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <p className="text-3xl font-bold text-white mb-1">78%</p>
            <p className="text-gray-400 text-sm">Skill Match</p>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl text-center">
            <Award className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <p className="text-3xl font-bold text-white mb-1">12</p>
            <p className="text-gray-400 text-sm">Total Skills</p>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl text-center">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <p className="text-3xl font-bold text-white mb-1">3</p>
            <p className="text-gray-400 text-sm">Achievements</p>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <p className="text-3xl font-bold text-white mb-1">Level 3</p>
            <p className="text-gray-400 text-sm">425 Points</p>
          </div>
        </div>
      </div>
    </div>
  );
};
