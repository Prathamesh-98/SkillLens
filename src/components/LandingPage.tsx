import { Sparkles, Target, TrendingUp, Award, Brain, Zap } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const quotes = [
    "Your career is a journey, not a destination. Keep evolving.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "The future belongs to those who learn more skills and combine them in creative ways.",
    "Every expert was once a beginner. Keep learning, keep growing."
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your resume and identify skill patterns instantly"
    },
    {
      icon: Target,
      title: "Skill Gap Detection",
      description: "Discover exactly what skills you need to reach your career goals"
    },
    {
      icon: TrendingUp,
      title: "Career Insights",
      description: "Get data-driven recommendations for roles that match your potential"
    },
    {
      icon: Award,
      title: "Certification Paths",
      description: "Curated learning paths from top platforms like Coursera, Google, and AWS"
    },
    {
      icon: Sparkles,
      title: "AI Mentor",
      description: "24/7 personalized guidance from your intelligent career assistant"
    },
    {
      icon: Zap,
      title: "Progress Tracking",
      description: "Watch your skills grow with detailed before-and-after comparisons"
    }
  ];

  const benefits = [
    "Instant resume analysis with AI precision",
    "Personalized skill gap identification",
    "Industry-aligned certification recommendations",
    "Salary insights based on your skill match",
    "Compare roles and find your perfect fit",
    "Track your progress over time"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/Gemini_Generated_Image_nsit64nsit64nsit-Photoroom.png"
              alt="SkillLens"
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SkillLens
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefits</a>
            <button
              onClick={onGetStarted}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-blue-300 font-semibold">Powered by Advanced AI</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              See Your Career Potential
            </span>
            <br />
            <span className="text-white">Crystal Clear</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Unlock your true potential with precision skill analysis, personalized guidance, and data-driven insights
          </p>

          <button
            onClick={onGetStarted}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full text-white text-lg font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110 animate-pulse"
          >
            <span className="relative z-10">Start Your Analysis</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
          </button>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {quotes.map((quote, idx) => (
              <div key={idx} className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all hover:scale-105">
                <Sparkles className="w-8 h-8 text-yellow-400 mb-2 mx-auto" />
                <p className="text-sm text-gray-300 italic">"{quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Features for Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Success</span>
            </h2>
            <p className="text-xl text-gray-400">Everything you need to accelerate your career growth</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 px-6 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">SkillLens</span>
            </h2>
            <p className="text-xl text-gray-400">Transform your career with intelligent insights</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <p className="text-lg text-gray-300">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-white/20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of professionals who have discovered their true potential
            </p>
            <button
              onClick={onGetStarted}
              className="px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full text-white text-lg font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110"
            >
              Start Free Analysis
            </button>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 SkillLens. Empowering careers with AI intelligence.</p>
        </div>
      </footer>
    </div>
  );
};
