import { useEffect, useState } from 'react';
import { TrendingUp, Award, Target, Lightbulb, CheckCircle, Zap, Star, Trophy, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Skill } from '../types';

export const DashboardHome = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const { user } = useAuth();

  const tips = [
    "Consistency beats intensity. 30 minutes of daily learning is better than cramming!",
    "Building projects while learning reinforces concepts 3x faster than passive study.",
    "Your next breakthrough is just one skill away. Keep pushing forward!",
    "Top performers spend 20% of their time learning new skills. Are you investing in yourself?",
    "Certifications open doors, but projects keep them open. Build, build, build!",
    "The best time to start was yesterday. The next best time is now.",
    "Focus on depth over breadth. Master one skill before moving to the next.",
    "Network while you learn. Your next opportunity might come from a study group connection."
  ];

  const achievements = [
    { name: 'Quick Starter', icon: Zap, earned: true, color: 'from-yellow-500 to-orange-600' },
    { name: 'Skill Analyst', icon: Target, earned: true, color: 'from-blue-500 to-cyan-600' },
    { name: 'Growth Minded', icon: TrendingUp, earned: false, color: 'from-green-500 to-emerald-600' },
    { name: 'Top Learner', icon: Trophy, earned: false, color: 'from-purple-500 to-pink-600' },
    { name: 'Skill Booster', icon: Star, earned: false, color: 'from-red-500 to-pink-600' },
    { name: 'Career Master', icon: Crown, earned: false, color: 'from-amber-500 to-yellow-600' }
  ];

  const todayTip = tips[Math.floor(Math.random() * tips.length)];

  useEffect(() => {
    const profile = localStorage.getItem(`profile_${user?.id}`);
    if (profile) {
      const data = JSON.parse(profile);
      setSkills(data.skills || []);

      let completion = 30;
      if (data.skills?.length > 0) completion += 40;
      if (data.experience?.length > 0) completion += 15;
      if (data.education?.length > 0) completion += 15;
      setProfileCompletion(completion);
    }
  }, [user]);

  const overallMatch = skills.length > 0
    ? Math.round(skills.reduce((acc, s) => acc + s.proficiency, 0) / skills.length)
    : 0;

  const strongSkills = skills.filter(s => s.proficiency >= 70);
  const moderateSkills = skills.filter(s => s.proficiency >= 50 && s.proficiency < 70);
  const weakSkills = skills.filter(s => s.proficiency < 50);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const skillOffset = circumference - (overallMatch / 100) * circumference;
  const profileOffset = circumference - (profileCompletion / 100) * circumference;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{user?.name}</span>
          </h1>
          <p className="text-gray-400 text-lg">Let's continue building your career success</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
          <div className="p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl border border-blue-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <h3 className="text-gray-400 text-sm mb-4">Your Skill Match Score</h3>
              <div className="flex items-center justify-between">
                <div className="relative w-40 h-40">
                  <svg className="transform -rotate-90 w-40 h-40">
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="14"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="url(#skillGradient)"
                      strokeWidth="14"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={skillOffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#9333ea" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-5xl font-bold text-white">{overallMatch}</p>
                      <p className="text-gray-400 text-xs">Score</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-white text-sm">{strongSkills.length} Strong</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-white text-sm">{moderateSkills.length} Moderate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-white text-sm">{weakSkills.length} Weak</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-purple-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <h3 className="text-gray-400 text-sm mb-4">Profile Completion</h3>
              <div className="flex items-center justify-between">
                <div className="relative w-40 h-40">
                  <svg className="transform -rotate-90 w-40 h-40">
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="14"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="url(#profileGradient)"
                      strokeWidth="14"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={profileOffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="profileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9333ea" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-5xl font-bold text-white">{profileCompletion}</p>
                      <p className="text-gray-400 text-xs">%</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-white text-sm mb-2">Complete your profile</p>
                  <p className="text-gray-400 text-xs">to unlock insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-3xl border border-yellow-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <div className="relative h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center animate-pulse">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Tip of the Day</h3>
            </div>
            <p className="text-gray-300 leading-relaxed flex-1">{todayTip}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-6 h-6 text-blue-400" />
            <h4 className="text-lg font-bold text-white">Current Goal</h4>
          </div>
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Engineer
          </p>
          <p className="text-gray-400 text-sm mt-1">6 months to target</p>
        </div>

        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-6 h-6 text-purple-400" />
            <h4 className="text-lg font-bold text-white">Total Skills</h4>
          </div>
          <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {skills.length} Skills
          </p>
          <p className="text-gray-400 text-sm mt-1">{strongSkills.length} at expert level</p>
        </div>

        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h4 className="text-lg font-bold text-white">This Week</h4>
          </div>
          <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            +5% Growth
          </p>
          <p className="text-gray-400 text-sm mt-1">Keep up the momentum!</p>
        </div>
      </div>

      <div className="p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
        <h3 className="text-2xl font-bold text-white mb-6">Your Achievements</h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((achievement, idx) => {
            const Icon = achievement.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  achievement.earned
                    ? 'bg-gradient-to-br ' + achievement.color + '/20 border-white/20 hover:scale-105'
                    : 'bg-white/5 border-white/10 opacity-50'
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                  achievement.earned ? 'bg-gradient-to-br ' + achievement.color : 'bg-white/10'
                }`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white text-xs text-center font-semibold">{achievement.name}</p>
                {achievement.earned && (
                  <CheckCircle className="w-4 h-4 text-green-400 mx-auto mt-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 text-left flex items-center gap-3">
              <Target className="w-5 h-5" />
              <span>Analyze Skill Gaps</span>
            </button>
            <button className="w-full px-4 py-3 bg-white/10 rounded-xl text-white font-semibold hover:bg-white/20 transition-all text-left flex items-center gap-3">
              <Award className="w-5 h-5" />
              <span>Browse Learning Paths</span>
            </button>
            <button className="w-full px-4 py-3 bg-white/10 rounded-xl text-white font-semibold hover:bg-white/20 transition-all text-left flex items-center gap-3">
              <TrendingUp className="w-5 h-5" />
              <span>Compare Roles</span>
            </button>
          </div>
        </div>

        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-white text-sm font-semibold">Resume Uploaded</p>
                <p className="text-gray-400 text-xs">Profile created successfully</p>
              </div>
              <span className="text-gray-500 text-xs">Today</span>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-white text-sm font-semibold">Skills Analyzed</p>
                <p className="text-gray-400 text-xs">{skills.length} skills identified</p>
              </div>
              <span className="text-gray-500 text-xs">Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
