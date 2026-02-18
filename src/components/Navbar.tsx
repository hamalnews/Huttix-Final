
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Language, CartItem } from '../types';
import { Zap, Moon, Sun, ShoppingCart, Trash2, ArrowRight, Sparkles, Ghost, Globe, ChevronDown } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onCheckout: () => void;
  onReset?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, darkMode, setDarkMode, cartItems, setCartItems, onCheckout, onReset }) => {
  const t = TRANSLATIONS[lang];
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showCartDropdown && cartItems.length === 0) {
      document.body.classList.add('highlight-mode');
    } else {
      document.body.classList.remove('highlight-mode');
    }
  }, [showCartDropdown, cartItems.length]);

  const totalCartPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const emptyCartMessage = useMemo(() => {
    const msgs = {
      ar: "سلتك فارغة.. ابدأ رحلة النمو الآن!",
      he: "הסל שלך ריק.. זה הזמן להתחיל לצמוח!",
      en: "Your bag is empty.. start your growth journey!",
      ru: "Ваша корзина пуста.. время расти!"
    };
    return msgs[lang] || msgs['en'];
  }, [lang]);

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setShowCartDropdown(false);
    }
  };

  // Added Russian ('ru') to the supported languages list in the Navbar.
  const languages: { id: Language; label: string; flag: string }[] = [
    { id: 'ar', label: 'العربية', flag: '🇸🇦' },
    { id: 'he', label: 'עברית', flag: '🇮🇱' },
    { id: 'en', label: 'English', flag: '🇺🇸' },
    { id: 'ru', label: 'Русский', flag: '🇷🇺' }
  ];

  return (
    <div className="sticky top-0 z-[140] w-full">
      <div className={`py-1.5 px-4 text-center transition-all duration-700 overflow-hidden bg-slate-950 text-white ${scrolled ? 'h-0 py-0 opacity-0' : 'h-auto opacity-100'}`}>
        <p className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-[0.3em]">
          <Zap className="w-2.5 h-2.5 fill-current animate-pulse text-yellow-400" /> {t.flashSale}
        </p>
      </div>

      <nav className={`px-4 md:px-8 py-3 border-b backdrop-blur-xl transition-all duration-500 ${darkMode ? 'bg-slate-950/95 border-white/5 shadow-2xl' : 'bg-white/95 border-slate-100 shadow-xl'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onReset}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xl transition-all group-hover:scale-110 ${darkMode ? 'bg-blue-600 shadow-lg' : 'bg-slate-950'}`}>H</div>
            <span className={`text-xl font-black tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>Huutix</span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button onClick={() => setShowLangDropdown(!showLangDropdown)} className="h-11 px-3 rounded-xl border flex items-center gap-2 transition-all active:scale-90 dark:bg-slate-900 dark:border-white/5 dark:text-white">
                <Globe size={18} className="text-blue-500" />
                <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest">{languages.find(l => l.id === lang)?.label}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${showLangDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showLangDropdown && (
                <div className="absolute top-[55px] right-0 w-44 bg-white dark:bg-slate-900 border dark:border-white/10 rounded-2xl shadow-3xl p-2 animate-in zoom-in duration-200">
                  {languages.map(l => (
                    <button 
                      key={l.id} 
                      onClick={() => { setLang(l.id); setShowLangDropdown(false); }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl text-xs font-bold transition-all ${lang === l.id ? 'bg-blue-600 text-white' : 'hover:bg-slate-50 dark:hover:bg-white/5 dark:text-white'}`}
                    >
                      <span>{l.label}</span>
                      <span>{l.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => setShowCartDropdown(!showCartDropdown)} className="w-11 h-11 rounded-xl border relative flex items-center justify-center transition-all active:scale-90 group dark:bg-slate-900 dark:border-white/5 dark:text-blue-400">
                <ShoppingCart className={`w-5 h-5 transition-transform group-hover:scale-110 ${cartItems.length > 0 ? 'animate-subtle-bounce' : ''}`} />
                {cartItems.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">{cartItems.length}</span>}
              </button>

              {showCartDropdown && (
                 <div className={`absolute top-[60px] ${lang === 'en' ? 'right-0' : 'left-0'} w-80 rounded-[2.5rem] border shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-white dark:bg-slate-900 dark:border-white/10 overflow-hidden z-[150] animate-in zoom-in duration-300`}>
                    <div className="p-6 border-b dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.cartTitle}</span>
                      {cartItems.length > 0 && <button onClick={() => setCartItems([])} className="text-[8px] font-black uppercase text-red-500 hover:underline">Clear All</button>}
                    </div>
                    <div className="p-3 max-h-[400px] overflow-y-auto no-scrollbar">
                      {cartItems.length > 0 ? cartItems.map(item => (
                        <div key={item.id} className="p-4 flex justify-between items-center rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
                          <div className="flex flex-col">
                            <span className="text-xs font-black dark:text-white">{item.serviceTitle}</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">{item.packageLabel}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-black text-blue-600 italic">{item.price}₪</span>
                            <button onClick={() => setCartItems(prev => prev.filter(i => i.id !== item.id))} className="text-slate-300 hover:text-red-500 transition-colors">
                              <Trash2 size={14}/>
                            </button>
                          </div>
                        </div>
                      )) : (
                        <div className="py-16 px-6 text-center flex flex-col items-center">
                          <div className="relative mb-6">
                            <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center animate-float">
                                <Ghost className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                            </div>
                            <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-blue-400 animate-pulse" />
                          </div>
                          <p className="text-[12px] uppercase font-black text-slate-500 dark:text-slate-400 mb-8 tracking-widest leading-relaxed">
                            {emptyCartMessage}
                          </p>
                          <button 
                            onClick={scrollToServices} 
                            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                          >
                            <Zap size={14} className="fill-white" />
                            {lang === 'ar' ? 'استعرض الخدمات' : lang === 'he' ? 'התחל לקנות' : 'Browse Services'}
                          </button>
                        </div>
                      )}
                    </div>
                    {cartItems.length > 0 && (
                      <div className="p-6 bg-slate-950 text-white">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black uppercase text-slate-400">Total</span>
                          <span className="text-2xl font-black italic">{totalCartPrice}₪</span>
                        </div>
                        <button onClick={() => {onCheckout(); setShowCartDropdown(false);}} className="w-full py-4 bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20">
                          {t.proceedBtn} <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                 </div>
              )}
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className="w-11 h-11 rounded-xl border flex items-center justify-center transition-all active:scale-90 dark:bg-slate-900 dark:border-white/5">
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-500" />}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
