
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Timer, Zap, X, Copy, Check } from 'lucide-react';

interface FlashOfferBannerProps {
  lang: Language;
}

const FlashOfferBanner: React.FC<FlashOfferBannerProps> = ({ lang }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isVisible, setIsVisible] = useState(true);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('huutix_flash_dismissed');
    if (isDismissed) {
      setIsVisible(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateCode = () => {
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newCode = `VIP-${randomStr}`;
    
    // Updated flash discount to 15%
    const existingCodes = JSON.parse(localStorage.getItem('huutix_dynamic_codes') || '[]');
    existingCodes.push({ code: newCode, discount: 15 });
    localStorage.setItem('huutix_dynamic_codes', JSON.stringify(existingCodes));
    
    setGeneratedCode(newCode);
  };

  const copyToClipboard = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('huutix_flash_dismissed', 'true');
  };

  if (!isVisible || (timeLeft <= 0 && !generatedCode)) return null;

  const isRtl = lang === 'he' || lang === 'ar';

  const textsMap = {
    ar: {
      title: "عرض الـ 60 ثانية الحصري!",
      desc: "احصل على كود خصم 15% فوراً قبل فوات الأوان!",
      cta: "احصل على الكود",
      copy: "نسخ الكود",
      ready: "كود الخصم جاهز للاستخدام!"
    },
    he: {
      title: "מבצע ה-60 שניות הבלעדי!",
      desc: "קבלו קוד קופון של 15% הנחה מיידית לפני שייגמר!",
      cta: "קבלת קוד קופון",
      copy: "העתק קוד",
      ready: "הקוד שלכם מוכן לשימוש!"
    },
    en: {
      title: "Exclusive 60-Second Flash Offer!",
      desc: "Get an instant 15% discount code before it expires!",
      cta: "Generate Code",
      copy: "Copy Code",
      ready: "Your discount code is ready!"
    }
  };
  const texts = textsMap[lang as keyof typeof textsMap] || textsMap.en;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] w-[95%] max-w-4xl animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 rounded-[2.5rem] p-1 shadow-[0_20px_50px_rgba(220,38,38,0.4)] group">
        <div className="bg-white dark:bg-slate-900 rounded-[2.3rem] px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl animate-pulse"></div>
          
          <button 
            onClick={handleDismiss}
            className="absolute top-3 right-5 p-1 text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X size={18} />
          </button>

          <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className="relative">
                <div className="w-14 h-14 bg-red-100 dark:bg-red-500/20 text-red-600 rounded-2xl flex items-center justify-center animate-bounce">
                    <Zap className="w-7 h-7 fill-current" />
                </div>
                {!generatedCode && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                      {timeLeft}
                  </div>
                )}
            </div>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <h4 className="text-lg font-black text-slate-900 dark:text-white leading-none mb-1">
                {texts.title}
              </h4>
              <p className="text-xs font-bold text-red-600 dark:text-red-400">
                {generatedCode ? texts.ready : texts.desc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             {generatedCode ? (
               <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                 <div className="px-5 py-3 bg-slate-100 dark:bg-white/5 border-2 border-dashed border-red-500/50 rounded-xl font-mono font-black text-lg text-slate-900 dark:text-white select-all">
                    {generatedCode}
                 </div>
                 <button 
                    onClick={copyToClipboard}
                    className="w-12 h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all active:scale-90 flex items-center justify-center shadow-lg"
                 >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                 </button>
               </div>
             ) : (
               <>
                 <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-full border border-slate-100 dark:border-white/5">
                    <Timer className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-black text-slate-900 dark:text-white font-mono">00:{timeLeft.toString().padStart(2, '0')}</span>
                 </div>
                 <button 
                    onClick={generateCode}
                    className="flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-all hover:scale-105 active:scale-95 shadow-xl group/btn text-[11px] uppercase tracking-widest"
                 >
                    {texts.cta}
                    <Zap size={16} className="fill-current transition-transform group-hover/btn:rotate-12" />
                 </button>
               </>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashOfferBanner;
