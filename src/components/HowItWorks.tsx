
import React from 'react';
import { Language, Translation } from '../types';
import { MousePointer2, ClipboardEdit, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  lang: Language;
  t: Translation;
  darkMode: boolean;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ lang, t, darkMode }) => {
  const isRtl = lang === 'he' || lang === 'ar';

  const steps = [
    {
      title: t.howItWorksStep1Title,
      desc: t.howItWorksStep1Desc,
      icon: <MousePointer2 className="w-8 h-8" />,
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      title: t.howItWorksStep2Title,
      desc: t.howItWorksStep2Desc,
      icon: <ClipboardEdit className="w-8 h-8" />,
      color: 'bg-purple-500/10 text-purple-600',
    },
    {
      title: t.howItWorksStep3Title,
      desc: t.howItWorksStep3Desc,
      icon: <ShieldCheck className="w-8 h-8" />,
      color: 'bg-emerald-500/10 text-emerald-600',
    },
    {
      title: t.howItWorksStep4Title,
      desc: t.howItWorksStep4Desc,
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'bg-orange-500/10 text-orange-600',
    }
  ];

  return (
    <section className="py-24 px-4 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-black mb-4 dark:text-white tracking-tighter">
            {t.howItWorksTitle}
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 rounded-full mx-auto"></div>
          <p className="mt-6 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">
            {lang === 'ar' ? 'رحلة نمو حسابك تبدأ من هنا' : lang === 'he' ? 'מסע הצמיחה שלך מתחיל כאן' : 'Your growth journey starts here'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className={`hidden lg:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-100 dark:border-white/5 -translate-y-12 z-0`}></div>

          {steps.map((step, idx) => (
            <div key={idx} className="reveal stagger-1 flex flex-col items-center text-center relative z-10 group">
              <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-8 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 animate-pulse-soft shadow-xl ${step.color} ${darkMode ? 'border border-white/5' : 'border border-slate-100'}`}>
                <div className="transition-transform duration-1000 group-hover:scale-125">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full flex items-center justify-center font-black text-xs shadow-lg ring-4 ring-white dark:ring-slate-950">
                  {idx + 1}
                </div>
              </div>
              <h3 className="text-xl font-black mb-3 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-[250px]">
                {step.desc}
              </p>
              
              {idx < steps.length - 1 && (
                <div className={`lg:hidden mt-8 text-slate-200 dark:text-slate-800 animate-bounce`}>
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
