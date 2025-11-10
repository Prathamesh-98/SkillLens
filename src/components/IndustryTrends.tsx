import { useState } from 'react';
import { TrendingUp, Flame, Star, Zap } from 'lucide-react';

export const IndustryTrends = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('AI');

  const trends = {
    'AI': [
      { skill: 'Large Language Models', demand: 95, growth: '+145%', icon: Flame },
      { skill: 'Computer Vision', demand: 88, growth: '+92%', icon: TrendingUp },
      { skill: 'Deep Learning', demand: 85, growth: '+78%', icon: Star },
      { skill: 'Natural Language Processing', demand: 82, growth: '+85%', icon: Zap },
      { skill: 'TensorFlow', demand: 78, growth: '+65%', icon: Star },
      { skill: 'PyTorch', demand: 76, growth: '+72%', icon: Star }
    ],
    'Web Dev': [
      { skill: 'React', demand: 92, growth: '+68%', icon: Flame },
      { skill: 'TypeScript', demand: 89, growth: '+112%', icon: TrendingUp },
      { skill: 'Next.js', demand: 85, growth: '+156%', icon: Zap },
      { skill: 'Node.js', demand: 82, growth: '+45%', icon: Star },
      { skill: 'GraphQL', demand: 75, growth: '+88%', icon: TrendingUp },
      { skill: 'Tailwind CSS', demand: 72, growth: '+198%', icon: Flame }
    ],
    'Data Science': [
      { skill: 'Python', demand: 94, growth: '+58%', icon: Flame },
      { skill: 'SQL', demand: 91, growth: '+42%', icon: Star },
      { skill: 'Data Visualization', demand: 86, growth: '+67%', icon: TrendingUp },
      { skill: 'Pandas', demand: 83, growth: '+54%', icon: Star },
      { skill: 'Machine Learning', demand: 89, growth: '+95%', icon: Zap },
      { skill: 'Tableau', demand: 77, growth: '+61%', icon: TrendingUp }
    ],
    'Cloud': [
      { skill: 'AWS', demand: 90, growth: '+72%', icon: Flame },
      { skill: 'Kubernetes', demand: 87, growth: '+128%', icon: TrendingUp },
      { skill: 'Docker', demand: 85, growth: '+98%', icon: Zap },
      { skill: 'Azure', demand: 82, growth: '+86%', icon: Star },
      { skill: 'Terraform', demand: 79, growth: '+145%', icon: Zap },
      { skill: 'Microservices', demand: 76, growth: '+92%', icon: TrendingUp }
    ]
  };

  const categories = Object.keys(trends);
  const selectedTrends = trends[selectedCategory as keyof typeof trends];

  const getDemandColor = (demand: number) => {
    if (demand >= 85) return 'from-red-500 to-orange-600';
    if (demand >= 75) return 'from-yellow-500 to-orange-600';
    return 'from-blue-500 to-cyan-600';
  };

  const topTrend = selectedTrends[0];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Industry Trends</h1>
        <p className="text-gray-400 text-lg">Stay ahead with the most in-demand skills</p>
      </div>

      <div className="flex gap-4 flex-wrap">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-8 bg-gradient-to-br from-red-600/20 to-orange-600/20 backdrop-blur-sm rounded-3xl border border-red-500/30">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm text-gray-400 mb-1">Hottest Trend in {selectedCategory}</h3>
              <p className="text-3xl font-bold text-white mb-2">{topTrend.skill}</p>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-white/10 rounded-full">
                  <span className="text-white font-semibold">{topTrend.demand}% Demand</span>
                </div>
                <div className="px-4 py-2 bg-white/10 rounded-full">
                  <span className="text-green-400 font-semibold">{topTrend.growth} Growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl border border-blue-500/30">
          <TrendingUp className="w-10 h-10 text-blue-400 mb-4" />
          <h3 className="text-gray-400 text-sm mb-1">Category Average</h3>
          <p className="text-4xl font-bold text-white mb-1">
            {Math.round(selectedTrends.reduce((sum, t) => sum + t.demand, 0) / selectedTrends.length)}%
          </p>
          <p className="text-gray-400 text-sm">Market Demand</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {selectedTrends.map((trend, idx) => {
          const Icon = trend.icon;
          return (
            <div
              key={idx}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all hover:scale-105 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getDemandColor(trend.demand)} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{trend.skill}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">Demand: {trend.demand}%</span>
                    <span className="text-sm text-green-400 font-semibold">{trend.growth}</span>
                  </div>
                </div>
              </div>

              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getDemandColor(trend.demand)} rounded-full transition-all duration-1000`}
                  style={{ width: `${trend.demand}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-8 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-red-600/20 backdrop-blur-sm rounded-3xl border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-4">Market Insights</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Rising Stars</h4>
            <p className="text-gray-300 text-sm mb-3">
              Skills with the highest growth rates are seeing massive demand increases. Early adopters have a competitive advantage.
            </p>
            <ul className="space-y-2">
              {selectedTrends
                .sort((a, b) => parseInt(b.growth) - parseInt(a.growth))
                .slice(0, 3)
                .map((trend, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">{trend.skill}</span>
                    <span className="text-green-400 font-semibold">{trend.growth}</span>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Stable Demand</h4>
            <p className="text-gray-300 text-sm mb-3">
              Core skills with consistently high demand provide long-term career stability and opportunities.
            </p>
            <ul className="space-y-2">
              {selectedTrends
                .sort((a, b) => b.demand - a.demand)
                .slice(0, 3)
                .map((trend, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">{trend.skill}</span>
                    <span className="text-blue-400 font-semibold">{trend.demand}%</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
