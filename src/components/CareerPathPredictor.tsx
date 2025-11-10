import { Sparkles } from 'lucide-react';

export const CareerPathPredictor = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h1 className="text-4xl font-bold text-white">AI Career Path Predictor</h1>
        </div>
        <p className="text-gray-400 text-lg">AI-powered career recommendations</p>
      </div>
      <div className="p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl border border-purple-500/30">
        <h2 className="text-3xl font-bold text-white mb-4">AI Engineer</h2>
        <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">85%</div>
      </div>
    </div>
  );
};
