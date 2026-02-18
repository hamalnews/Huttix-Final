
import React, { useState } from 'react';
import { Language, Translation, FAQItem } from '../types';
import { ChevronDown, CircleHelp, ChevronUp, Sparkles, HelpCircle } from 'lucide-react';

interface FAQProps {
  lang: Language;
  t: Translation;
  darkMode: boolean;
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ lang, t, darkMode, faqs }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const isRtl = lang === 'he' || lang === 'ar';

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const INITIAL_COUNT = 6;
  const visibleFaqs = showAll ? faqs : (faqs || []).slice(0, INITIAL_COUNT);

  return (
    <section id="faq" className="py-24 px-4 bg-slate-50 dark:bg-slate-900/10 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* هيدر قسم الأسئلة - Elite Header */}
        <div className="text-center mb-20 relative animate-in fade-in slide-in-from-bottom-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.25em] mb-8 shadow-2xl animate-pulse">
            <HelpCircle size={16} />
            {t.faqTitle}
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 dark:text-white tracking-tighter leading-tight">
            {t.faqSub}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto">
            {lang === 'ar' ? 'كل ما تحتاج لمعرفته حول خدمات النمو والاحترافية في مكان واحد.' : 'כל מה שרציתם לדעת על צמיחה מקצועית וביטחון החשבון במקום אחד.'}
          </p>
        </div>

        {/* حاوية الأسئلة الاحترافية - Professional Accordion Container */}
        <div className="bg-white dark:bg-slate-950 p-6 md:p-12 rounded-[4rem] shadow-3xl border dark:border-white/5 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none rotate-12"><Sparkles size={150} /></div>
          
          <div className="space-y-4 relative z-10">
            {visibleFaqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div 
                  key={item.id}
                  className={`rounded-[2.5rem] border transition-all duration-500 ${
                    isOpen 
                      ? 'bg-blue-600 border-blue-600 shadow-2xl shadow-blue-500/30 -translate-y-1' 
                      : (darkMode ? 'bg-slate-900/50 border-white/5 hover:border-white/10' : 'bg-slate-50 border-slate-100 hover:border-blue-200')
                  }`}
                >
                  <button 
                    onClick={() => toggle(item.id)}
                    className={`w-full px-8 py-8 flex items-center justify-between gap-6 transition-all ${isRtl ? 'flex-row-reverse' : ''}`}
                  >
                    <span className={`text-lg font-black tracking-tight flex-1 ${isOpen ? 'text-white' : 'dark:text-white'} ${isRtl ? 'text-right' : 'text-left'}`}>
                      {item.question[lang] || item.question.en}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shrink-0 ${isOpen ? 'bg-white/20 text-white rotate-180' : (darkMode ? 'bg-white/5 text-slate-400' : 'bg-white text-slate-400 shadow-sm')}`}>
                      <ChevronDown size={24} className={isOpen ? 'scale-110' : ''} />
                    </div>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className={`px-10 pb-10 text-base font-bold leading-relaxed ${isOpen ? 'text-blue-50' : 'text-slate-500 dark:text-slate-400'} ${isRtl ? 'text-right' : 'text-left'}`}>
                      <div className={`w-16 h-1.5 bg-white/30 rounded-full mb-8 ${isRtl ? 'mr-0 ml-auto' : 'ml-0 mr-auto'}`}></div>
                      {item.answer[lang] || item.answer.en}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {faqs.length > INITIAL_COUNT && (
            <div className="mt-12 text-center relative z-10">
               <button 
                onClick={() => setShowAll(!showAll)}
                className="group inline-flex items-center gap-4 px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.25em] hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-2xl active:scale-95"
               >
                  {showAll ? <ChevronUp size={20} className="animate-bounce" /> : <ChevronDown size={20} className="animate-bounce" />}
                  <span>{showAll ? (lang === 'ar' ? 'طي الأسئلة' : 'הצג פחות') : (lang === 'ar' ? `عرض المزيد من الأسئلة (${faqs.length - INITIAL_COUNT})` : `הצג עוד שאלות (${faqs.length - INITIAL_COUNT})`)}</span>
               </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
