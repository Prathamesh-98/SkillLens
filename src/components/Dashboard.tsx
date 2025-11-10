import { useState } from 'react';
import { Home, Upload, BarChart3, Target, BookOpen, MessageSquare, GitCompare, TrendingUp, Activity, User as UserIcon, LogOut, Bell, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DashboardHome } from './DashboardHome';
import { ResumeUpload } from './ResumeUpload';
import { SkillAnalysis } from './SkillAnalysis';
import { SkillGaps } from './SkillGaps';
import { LearningPaths } from './LearningPaths';
import { RoleComparison } from './RoleComparison';
import { SalaryInsights } from './SalaryInsights';
import { IndustryTrends } from './IndustryTrends';
import { ProgressTracker } from './ProgressTracker';
import { Profile } from './Profile';
import { AIMentor } from './AIMentor';

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [hasUploadedResume, setHasUploadedResume] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'upload', label: 'Upload Resume', icon: Upload },
    { id: 'analysis', label: 'Skill Analysis', icon: BarChart3, requiresResume: true },
    { id: 'gaps', label: 'Skill Gaps', icon: Target, requiresResume: true },
    { id: 'learning', label: 'Learning Paths', icon: BookOpen, requiresResume: true },
    { id: 'comparison', label: 'Role Comparison', icon: GitCompare, requiresResume: true },
    { id: 'salary', label: 'Salary Insights', icon: TrendingUp, requiresResume: true },
    { id: 'trends', label: 'Industry Trends', icon: Activity, requiresResume: true },
    { id: 'progress', label: 'Progress Tracker', icon: Activity, requiresResume: true },
    { id: 'profile', label: 'My Profile', icon: UserIcon }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <DashboardHome />;
      case 'upload':
        return <ResumeUpload onUploadSuccess={() => setHasUploadedResume(true)} />;
      case 'analysis':
        return <SkillAnalysis />;
      case 'gaps':
        return <SkillGaps />;
      case 'learning':
        return <LearningPaths />;
      case 'comparison':
        return <RoleComparison />;
      case 'salary':
        return <SalaryInsights />;
      case 'trends':
        return <IndustryTrends />;
      case 'progress':
        return <ProgressTracker />;
      case 'profile':
        return <Profile />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-lg bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            {showMobileMenu ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
          <div className="flex items-center gap-4">
            <img
              src="/Gemini_Generated_Image_nsit64nsit64nsit-Photoroom.png"
              alt="SkillLens"
              className="h-16 w-16 object-contain"
            />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SkillLens
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all hover:scale-105 relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-white/20 rounded-2xl shadow-2xl p-4">
                  <h3 className="text-white font-bold mb-3">Notifications</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-white/5 rounded-xl">
                      <p className="text-white text-sm font-semibold">Profile Analysis Complete</p>
                      <p className="text-gray-400 text-xs">Your skills have been analyzed</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl">
                      <p className="text-white text-sm font-semibold">New Learning Path Available</p>
                      <p className="text-gray-400 text-xs">Check out AI courses</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setActiveSection('profile')}
              className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all hover:scale-105"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-white" />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-white font-semibold text-sm">{user?.name}</p>
                <p className="text-gray-400 text-xs">{user?.email}</p>
              </div>
            </button>
            <button
              onClick={logout}
              className="p-3 bg-white/10 rounded-xl hover:bg-red-500/20 transition-all hover:scale-105"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>
      </nav>

      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setShowMobileMenu(false)}>
          <aside className="fixed left-0 top-24 bottom-0 w-64 bg-slate-900 border-r border-white/10 p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isDisabled = item.requiresResume && !hasUploadedResume;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (!isDisabled) {
                        setActiveSection(item.id);
                        setShowMobileMenu(false);
                      }
                    }}
                    disabled={isDisabled}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : isDisabled
                        ? 'text-gray-600 cursor-not-allowed'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      )}

      <div className="flex pt-24">
        <aside className="fixed left-0 top-24 bottom-0 w-72 bg-white/5 backdrop-blur-sm border-r border-white/10 p-6 overflow-y-auto hidden md:block">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isDisabled = item.requiresResume && !hasUploadedResume;
              return (
                <button
                  key={item.id}
                  onClick={() => !isDisabled && setActiveSection(item.id)}
                  disabled={isDisabled}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : isDisabled
                      ? 'text-gray-600 cursor-not-allowed'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="md:ml-72 flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      <AIMentor />
    </div>
  );
};
