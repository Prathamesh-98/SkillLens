import { useState } from 'react';
import { BookOpen, ExternalLink, Clock, Award, Lightbulb } from 'lucide-react';
import { learningPaths } from '../data/learningPaths';

export const LearningPaths = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI', 'Data Science', 'Web Dev', 'Cloud'];

  const filteredPaths = selectedCategory === 'All'
    ? learningPaths
    : learningPaths.filter(path => path.category === selectedCategory);

  const getLevelColor = (level: string) => {
    if (level === 'Beginner') return 'from-green-500 to-emerald-600';
    if (level === 'Intermediate') return 'from-blue-500 to-cyan-600';
    return 'from-purple-500 to-pink-600';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Learning Paths</h1>
        <p className="text-gray-400 text-lg">Curated courses to bridge your skill gaps</p>
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

      <div className="grid md:grid-cols-2 gap-6">
        {filteredPaths.map((path) => (
          <div
            key={path.id}
            className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all hover:scale-105 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {path.course_name}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{path.provider}</p>
              </div>
              <div className={`px-3 py-1 bg-gradient-to-r ${getLevelColor(path.level)} rounded-full`}>
                <span className="text-white text-xs font-semibold">{path.level}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{path.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Award className="w-4 h-4" />
                <span className="text-sm">{path.skill_name}</span>
              </div>
            </div>

            <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Project Idea</p>
                  <p className="text-sm text-gray-300">{path.project_idea}</p>
                </div>
              </div>
            </div>

            <a
              href={path.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              <span>Start Learning</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
