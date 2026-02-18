
import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, Timer } from 'lucide-react';
import { Language, Translation } from '../types';

interface PromoBannerProps {
  lang: Language;
  t: Translation;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ lang, t }) => {
  const [timeLeft, setTimeLeft] = useState('00:59:59');
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59);
      const diff = end.getTime() - now.getTime();
      
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
      const m = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
      const s = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
      
      setTimeLeft(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isRtl = lang === 'he' || lang === 'ar';

  const bannerData = {
    ar: { title: "عرض اليوم المحدود!", desc: "خصم إضافي 20% على باقات الـ 10K+.", btn: "احصل على العرض" },
    he: { title: "מבצע היום המוגבל!", desc: "20% הנחה נוספת על חבילות 10K+.", btn: "קבלו את המבצע" },
    en: { title: "Daily Limited Offer!", desc: "Extra 20% off on all 10K+ packages.", btn: "Get Offer" },
    ru: { title: "Дневное предложение!", desc: "Доп. скидка 20% на все пакеты 10K+.", btn: "Забрать" }
  }[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="relative group overflow-hidden rounded-[3rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-[2px] shadow-3xl transition-transform hover:scale-[1.01] duration-500">
        <div className="relative bg-white rounded-[2.9rem] px-8 md:px-12 py-8 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-blue-50 text-blue-600 rounded-[1.5rem] shadow-inner animate-pulse">
              <Zap className="w-10 h-10 fill-blue-600" />
            </div>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <h4 className="text-xl font-black text-gray-900 leading-none mb-2.5">{bannerData.title}</h4>
              <p className="text-sm text-gray-500 font-bold opacity-80 leading-tight">{bannerData.desc}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
            <div className="flex items-center gap-4 px-8 py-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner min-w-[180px] justify-center">
               <Timer className="w-5 h-5 text-blue-600" />
               <span className="text-xl font-black text-gray-900 font-mono tracking-wider leading-none">{timeLeft}</span>
            </div>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto flex items-center justify-center gap-4 px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all text-[11px] uppercase tracking-[0.2em] active:scale-95 shadow-2xl hover:shadow-blue-500/30"
            >
              <span>{bannerData.btn}</span>
              <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
