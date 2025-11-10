import { Brain } from 'lucide-react';

export const InterviewReadiness = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl font-bold text-white">Interview Readiness Analyzer</h1>
        </div>
        <p className="text-gray-400 text-lg">Evaluate your interview preparedness</p>
      </div>
      <div className="p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl border border-white/20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Your Readiness Score</h2>
          <div className="text-6xl font-bold text-white mb-4">78</div>
          <p className="text-gray-300">Good preparation level</p>
        </div>
      </div>
    </div>
  );
};
