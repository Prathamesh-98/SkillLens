import { Trophy, Flame, Star } from 'lucide-react';

export const Gamification = () => {
  const achievements = [
    { id: 1, name: 'First Steps', earned: true, points: 50 },
    { id: 2, name: 'Skill Analyst', earned: true, points: 75 },
    { id: 3, name: '7-Day Streak', earned: true, points: 100 },
    { id: 4, name: 'Path Explorer', earned: false, points: 100 }
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h1 className="text-4xl font-bold text-white">Your Achievements</h1>
        </div>
        <p className="text-gray-400 text-lg">Track your learning journey</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-8 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-3xl border border-yellow-500/30">
          <Star className="w-8 h-8 text-yellow-400 mb-4" />
          <h3 className="text-gray-400 text-sm mb-1">Level</h3>
          <p className="text-5xl font-bold text-white">3</p>
        </div>

        <div className="p-8 bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-sm rounded-3xl border border-orange-500/30">
          <Flame className="w-8 h-8 text-orange-400 mb-4" />
          <h3 className="text-gray-400 text-sm mb-1">Streak</h3>
          <p className="text-5xl font-bold text-white">7</p>
        </div>

        <div className="p-8 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-purple-500/30">
          <Trophy className="w-8 h-8 text-purple-400 mb-4" />
          <h3 className="text-gray-400 text-sm mb-1">Achievements</h3>
          <p className="text-5xl font-bold text-white">3</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-6 rounded-2xl border ${
              achievement.earned ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 opacity-60'
            }`}
          >
            <h4 className="text-xl font-bold text-white mb-2">{achievement.name}</h4>
            <span className="text-sm font-semibold text-white">{achievement.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};
