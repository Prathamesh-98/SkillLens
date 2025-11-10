import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, CreditCard as Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    careerGoal: 'AI Engineer',
    targetDate: '2025-12-31',
    bio: 'Passionate about technology and continuous learning. Focused on developing AI and machine learning skills to build innovative solutions.'
  });

  const handleSave = () => {
    localStorage.setItem(`profile_extended_${user?.id}`, JSON.stringify(formData));
    setIsEditing(false);
  };

  useEffect(() => {
    const savedProfile = localStorage.getItem(`profile_extended_${user?.id}`);
    if (savedProfile) {
      const data = JSON.parse(savedProfile);
      setFormData(prev => ({ ...prev, ...data }));
    }
  }, [user]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-gray-400 text-lg">Manage your account and preferences</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 flex items-center gap-2"
          >
            <Edit2 className="w-5 h-5" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 bg-white/10 rounded-xl text-white font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <User className="w-5 h-5 text-blue-400" />
                    <span className="text-white">{formData.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span className="text-white">{formData.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <Phone className="w-5 h-5 text-green-400" />
                    <span className="text-white">{formData.phone || 'Not provided'}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                ) : (
                  <p className="text-gray-300 p-3 bg-white/5 rounded-xl">{formData.bio}</p>
                )}
              </div>
            </div>
          </div>

          <div className="p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Career Goals</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Target Role</label>
                {isEditing ? (
                  <select
                    value={formData.careerGoal}
                    onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="AI Engineer" className="bg-slate-900">AI Engineer</option>
                    <option value="Data Scientist" className="bg-slate-900">Data Scientist</option>
                    <option value="Full Stack Developer" className="bg-slate-900">Full Stack Developer</option>
                    <option value="Cloud Architect" className="bg-slate-900">Cloud Architect</option>
                    <option value="Frontend Developer" className="bg-slate-900">Frontend Developer</option>
                  </select>
                ) : (
                  <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {formData.careerGoal}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Target Achievement Date</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <Calendar className="w-5 h-5 text-pink-400" />
                    <span className="text-white">{new Date(formData.targetDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl border border-blue-500/30 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{user?.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{user?.email}</p>
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
              <span className="text-white text-sm font-semibold">Active Member</span>
            </div>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Account Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Member Since</span>
                <span className="text-white font-semibold">
                  {new Date(user?.created_at || '').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Skills Analyzed</span>
                <span className="text-white font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Achievements</span>
                <span className="text-white font-semibold">2 / 6</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Progress Reports</span>
                <span className="text-white font-semibold">1</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-2xl border border-yellow-500/30">
            <h3 className="text-lg font-bold text-white mb-2">Pro Tip</h3>
            <p className="text-gray-300 text-sm">
              Complete your profile to unlock personalized recommendations and advanced insights!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
