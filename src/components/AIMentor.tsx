import { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export const AIMentor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI Career Mentor. I'm here to help you with career advice, skill development suggestions, and motivation. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const responses: Record<string, string> = {
    'hello': "Hello! Great to see you here. How's your learning journey going?",
    'help': "I can help you with:\n• Career guidance and role recommendations\n• Skill development strategies\n• Certification suggestions\n• Learning path recommendations\n• Motivation and encouragement\n\nWhat would you like to know?",
    'skill': "Building skills takes consistent effort. Focus on one skill at a time, practice through projects, and don't forget to document your learning. What skill are you working on?",
    'career': "Your career path should align with your interests and market demand. Based on your profile, I'd recommend focusing on roles that match your strongest skills. Would you like specific role recommendations?",
    'motivation': "Remember, every expert was once a beginner! You've already taken the first step by analyzing your skills. Keep learning, stay curious, and celebrate small wins. You're making progress! 🌟",
    'certification': "Certifications from Coursera, Google, AWS, and Microsoft are highly valued. I recommend starting with certifications that address your biggest skill gaps. Check out the Learning Paths section for specific recommendations!",
    'salary': "Your earning potential grows with your skills! Focus on high-demand skills in your target role. The Salary Insights section shows how skill improvements can increase your earning potential by up to 30%.",
    'progress': "Tracking progress is crucial for growth. Upload an updated resume in the Progress Tracker to see how far you've come. Celebrating milestones keeps you motivated!",
    'default': "That's a great question! While I'm here to provide guidance on career development and skills, I recommend exploring the different sections of SkillLens for detailed insights. Is there a specific aspect of your career you'd like to discuss?"
  };

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) return responses['hello'];
    if (lowerMessage.includes('help')) return responses['help'];
    if (lowerMessage.includes('skill')) return responses['skill'];
    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('role')) return responses['career'];
    if (lowerMessage.includes('motivat') || lowerMessage.includes('encourage')) return responses['motivation'];
    if (lowerMessage.includes('cert')) return responses['certification'];
    if (lowerMessage.includes('salary') || lowerMessage.includes('pay') || lowerMessage.includes('earn')) return responses['salary'];
    if (lowerMessage.includes('progress') || lowerMessage.includes('track')) return responses['progress'];

    return responses['default'];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110 z-50 animate-pulse"
        >
          <MessageSquare className="w-8 h-8 text-white" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-8 right-8 w-96 h-[600px] bg-slate-900 rounded-3xl border border-white/20 shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">AI Career Mentor</h3>
                <p className="text-white/80 text-xs">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-white/10 text-gray-300'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-4 rounded-2xl">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
              />
              <button
                onClick={handleSend}
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
