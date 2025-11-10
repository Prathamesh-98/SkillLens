import { Palette } from 'lucide-react';

export const ThemeSettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Palette className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl font-bold text-white">Theme Personalization</h1>
        </div>
        <p className="text-gray-400 text-lg">Customize your SkillLens experience</p>
      </div>
      <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
        <h3 className="text-2xl font-bold text-white mb-4">Theme Options</h3>
        <p className="text-gray-300">Theme customization coming soon</p>
      </div>
    </div>
  );
};
