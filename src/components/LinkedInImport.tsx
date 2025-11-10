import { Linkedin } from 'lucide-react';

export const LinkedInImport = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Linkedin className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl font-bold text-white">LinkedIn Profile Import</h1>
        </div>
        <p className="text-gray-400 text-lg">Instantly populate your profile from LinkedIn</p>
      </div>
      <div className="p-12 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-3xl border border-blue-500/30 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Linkedin className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Connect Your LinkedIn</h2>
        <p className="text-gray-300 mb-8">Import skills and experience automatically</p>
        <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-bold">
          Connect LinkedIn Profile
        </button>
      </div>
    </div>
  );
};
