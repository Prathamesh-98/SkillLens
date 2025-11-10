import { FileText } from 'lucide-react';

export const SmartResumeImprover = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl font-bold text-white">Smart Resume Improver</h1>
        </div>
        <p className="text-gray-400 text-lg">AI-powered resume optimization</p>
      </div>
      <div className="p-8 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl border border-purple-500/30">
        <h3 className="text-2xl font-bold text-white mb-6">Optimize Your Resume</h3>
        <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-bold">
          Generate AI Improvements
        </button>
      </div>
    </div>
  );
};
