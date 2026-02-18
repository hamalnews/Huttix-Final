
import React from 'react';
import { Language, Translation } from '../types';
import { Bot, Sparkles, Zap, Target, TrendingUp, MessageCircleCode } from 'lucide-react';

interface AIFeatureSectionProps {
  lang: Language;
  t: Translation;
  darkMode: boolean;
}

const AIFeatureSection: React.FC<AIFeatureSectionProps> = ({ lang, t, darkMode }) => {
  const isRtl = lang === 'he' || lang === 'ar';
  
  return (
    <section className="py-24 px-4 overflow-hidden relative bg-slate-50 dark:bg-slate-900/10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className={`flex-1 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
            <Sparkles size={14} className="fill-blue-600" />
            {t.aiFeatureBadge}
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-8 dark:text-white tracking-tighter leading-tight">
            {t.aiFeatureTitle}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mb-10 leading-relaxed max-w-2xl">
            {t.aiFeatureDesc}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: <Target className="text-blue-500" />, title: lang === 'ar' ? 'استهداف دقيق' : lang === 'he' ? 'מיקוד מדויק' : 'Targeted Growth' },
              { icon: <Zap className="text-orange-500" />, title: lang === 'ar' ? 'تحسين فوري' : lang === 'he' ? 'אופטימיזציה מיידית' : 'Instant Optimization' },
              { icon: <TrendingUp className="text-emerald-500" />, title: lang === 'ar' ? 'نمو مستدام' : lang === 'he' ? 'תוצאות יציבות' : 'Sustainable Results' },
              { icon: <MessageCircleCode className="text-purple-500" />, title: lang === 'ar' ? 'مدرب ذكي مدمج' : lang === 'he' ? 'מנטור AI מובנה' : 'Integrated AI Mentor' }
            ].map((item, idx) => (
              <div key={idx} className={`flex items-center gap-4 p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-xl hover:translate-y-[-4px] transition-all group ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center transition-transform group-hover:scale-110">{item.icon}</div>
                <span className="text-[11px] font-black dark:text-white uppercase tracking-widest">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-1 relative w-full max-w-xl">
           <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
           <div className="relative p-12 bg-slate-950 rounded-[4rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.4)] overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-blue-500/10 group-hover:text-blue-500/30 transition-colors duration-700">
                <Bot size={250} />
              </div>
              <div className="relative z-10 space-y-10">
                 <div className="flex items-center justify-between">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-[0_15px_30px_rgba(37,99,235,0.4)]">
                       <Bot size={32} />
                    </div>
                    <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[8px] font-black text-emerald-400 uppercase tracking-widest">System Online</div>
                 </div>
                 <div className="space-y-4">
                    <div className="h-2 w-40 bg-blue-600 rounded-full"></div>
                    <div className="h-2 w-64 bg-white/20 rounded-full"></div>
                    <div className="h-2 w-32 bg-white/10 rounded-full"></div>
                 </div>
                 <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></div>
                       <p className="text-[10px] font-mono text-blue-400 font-bold uppercase">Huutix_Neural_Core</p>
                    </div>
                    <p className="text-base text-white/90 leading-relaxed font-black italic tracking-tight">
                       {lang === 'ar' ? 'قم بتفعيل ميزة الدردشة الذكية في الزاوية للحصول على استراتيجيات مخصصة لحسابك فوراً.' : 
                        lang === 'he' ? 'הפעילו את הצ’אט החכם בפינה לקבלת אסטרטגיות מותאמות אישית לחשבון שלכם.' :
                        'Activate the AI Strategy Mentor in the corner to get custom growth strategies for your account instantly.'}
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeatureSection;
