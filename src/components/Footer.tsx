
import React, { useState } from 'react';
import { Translation, Language, StaffRequest, SiteSettings } from '../types';
import { 
  Instagram, Mail, MessageSquare, ShieldCheck, ArrowRight, 
  Home, LayoutGrid, Scale, Lock, Compass, LifeBuoy, Globe, Heart,
  Coins, UserPlus, Briefcase, Key, Send, CheckCircle, X, Database, Sparkles, Zap
} from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface FooterProps {
  t: Translation;
  lang: Language;
  onLegalClick: (type: 'terms' | 'privacy') => void;
  onStaffLoginClick: () => void;
  onAdminClick: () => void;
  settings: SiteSettings;
}

const Footer: React.FC<FooterProps> = ({ t, lang, onLegalClick, onStaffLoginClick, onAdminClick, settings }) => {
  const isRtl = lang === 'he' || lang === 'ar';
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [requestData, setRequestData] = useState({ name: '', age: '', phone: '', email: '', city: '' });
  const [isSent, setIsSent] = useState(false);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requests = JSON.parse(localStorage.getItem('huutix_staff_requests') || '[]');
    const newReq: StaffRequest = {
      id: Math.random().toString(36).substr(2, 9),
      ...requestData,
      status: 'pending',
      date: new Date().toISOString()
    };
    localStorage.setItem('huutix_staff_requests', JSON.stringify([...requests, newReq]));
    setIsSent(true);
    setTimeout(() => { setIsSent(false); setIsRequestOpen(false); setRequestData({ name: '', age: '', phone: '', email: '', city: '' }); }, 3000);
  };
  
  const quickLinks = [
    { label: t.navHome, icon: <Home className="w-4 h-4" />, action: () => window.scrollTo({top: 0, behavior: 'smooth'}) },
    { label: t.navServices, icon: <LayoutGrid className="w-4 h-4" />, action: () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: t.navTerms, icon: <Scale className="w-4 h-4" />, action: () => onLegalClick('terms') },
    { label: t.navPrivacy, icon: <Lock className="w-4 h-4" />, action: () => onLegalClick('privacy') }
  ];

  const telegramHandle = (settings?.telegram || 'Huutix').replace('@', '');

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-white/5 pt-24 pb-12 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* المربع الأزرق للعمل - شرح جذاب واحترافي */}
          <div className={`lg:col-span-4 p-10 rounded-[4rem] bg-blue-600 text-white shadow-2xl relative overflow-hidden group ${isRtl ? 'text-right' : 'text-left'}`}>
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700"><Briefcase size={160} /></div>
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                   <div className={`flex items-center gap-4 mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-md shadow-xl"><UserPlus size={28} className="text-white" /></div>
                      <h3 className="text-3xl font-black italic tracking-tighter uppercase">{t.hiringTitle}</h3>
                   </div>
                   <div className="space-y-5 mb-8">
                      <p className="text-sm font-black text-blue-100 uppercase tracking-widest flex items-center gap-3">
                        <Zap size={16} className="fill-yellow-400 text-yellow-400 animate-pulse" />
                        {lang === 'ar' ? 'نظام العمولات المباشر' : 'מערכת עמלות ישירה'}
                      </p>
                      <p className="text-base font-bold leading-relaxed text-blue-50 opacity-95">
                        {lang === 'ar' ? 'سوق لخدماتنا باستخدام كود خصم خاص بك، واحصل على عمولة مالية فورية عن كل طلب. عمل مريح من المنزل مع دخل مرتفع ومستمر.' : 
                         lang === 'he' ? 'שווקו את השירותים שלנו עם קוד קופון אישי, וקבלו עמלה כספית מיידית על כל הזמנה. עבודה נוחה מהבית עם הכנסה גבוהה.' : 
                         'Market our services with your personal code and earn instant commissions. Work from home with high potential earnings.'}
                      </p>
                   </div>
                </div>
                <button onClick={() => setIsRequestOpen(true)} className="w-full py-6 bg-white text-blue-600 rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:scale-[1.03] active:scale-95 transition-all shadow-3xl flex items-center justify-center gap-3 group/btn">
                  {t.hiringSubmit}
                  <ArrowRight size={20} className={`transition-transform group-hover/btn:translate-x-1 ${isRtl ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
                </button>
             </div>
          </div>

          <div className={`lg:col-span-3 p-10 rounded-[4rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-xl space-y-8 ${isRtl ? 'text-right' : 'text-left'}`}>
            <h4 className={`text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <Compass className="w-4 h-4 text-blue-500" />
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <button onClick={link.action} className={`text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 font-bold transition-all flex items-center gap-4 group active:scale-95 w-full ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">{link.icon}</div>
                    <span className="dark:text-white/90">{link.label}</span>
                  </button>
                </li>
              ))}
              <li>
                <button onClick={onStaffLoginClick} className={`text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 font-bold transition-all flex items-center gap-4 group active:scale-95 w-full ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all"><Key className="w-4 h-4" /></div>
                    <span className="dark:text-white/90">{t.staffPortalTitle}</span>
                </button>
              </li>
              <li className="pt-4">
                <button onClick={onAdminClick} className={`text-[10px] text-slate-300 dark:text-slate-500 hover:text-blue-500 font-black transition-all flex items-center gap-4 group active:scale-95 w-full ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                    <div className="p-3 rounded-2xl bg-slate-500/5 group-hover:bg-blue-500/10 transition-colors"><Database className="w-4 h-4" /></div>
                    <span className="uppercase tracking-widest">{lang === 'ar' ? 'لوحة الإدارة' : 'ניהול מערכת'}</span>
                </button>
              </li>
            </ul>
          </div>

          <div className={`lg:col-span-5 p-10 rounded-[4rem] bg-slate-900 dark:bg-slate-800 border border-white/5 shadow-2xl space-y-8 ${isRtl ? 'text-right' : 'text-left'}`}>
            <h4 className={`text-[11px] font-black text-blue-400 uppercase tracking-[0.3em] flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <LifeBuoy className="w-4 h-4" />
              {t.footerSupportHub}
            </h4>
            <div className="grid grid-cols-2 gap-5">
              <a href={`https://wa.me/${settings?.whatsapp || '972522426476'}`} target="_blank" rel="noopener noreferrer" className={`group flex flex-col gap-4 bg-white/5 border border-white/10 p-6 rounded-[2.5rem] hover:bg-white/10 transition-all ${isRtl ? 'text-right' : ''}`}>
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shadow-lg group-hover:scale-110 transition-transform"><MessageSquare className="w-6 h-6" /></div>
                <div>
                  <div className="text-xs font-black text-white">WhatsApp</div>
                  <div className="text-[9px] text-emerald-400 font-black uppercase tracking-widest mt-1 opacity-70">Support Hotline</div>
                </div>
              </a>
              <a href={`https://t.me/${telegramHandle}`} target="_blank" rel="noopener noreferrer" className={`group flex flex-col gap-4 bg-white/5 border border-white/10 p-6 rounded-[2.5rem] hover:bg-white/10 transition-all ${isRtl ? 'text-right' : ''}`}>
                <div className="w-12 h-12 rounded-2xl bg-[#0088cc]/10 flex items-center justify-center text-[#0088cc] shadow-lg group-hover:scale-110 transition-transform"><Send className="w-6 h-6" /></div>
                <div>
                  <div className="text-xs font-black text-white">Telegram</div>
                  <div className="text-[9px] text-blue-400 font-black uppercase tracking-widest mt-1 opacity-70">Official Channel</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className={`${isRtl ? 'text-right md:order-1' : 'text-left md:order-1'} flex-1`}>
             <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">© {new Date().getFullYear()} Huutix Headquarters. {t.footerRights}</p>
          </div>
          <div className="flex gap-5 md:order-2">
            <a href={settings?.instagram || '#'} target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-900 dark:bg-white/5 rounded-2xl text-white hover:bg-pink-600 transition-all shadow-xl hover:-translate-y-1">
               <Instagram size={20} />
            </a>
            <a href={`https://t.me/${telegramHandle}`} target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-900 dark:bg-white/5 rounded-2xl text-white hover:bg-blue-500 transition-all shadow-xl hover:-translate-y-1">
               <Send size={20} />
            </a>
          </div>
        </div>
      </div>

      {isRequestOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
           <div className="bg-white dark:bg-slate-900 w-full max-w-xl p-12 rounded-[4rem] shadow-3xl animate-in zoom-in duration-300 relative overflow-y-auto max-h-[90vh] border dark:border-white/10">
              <button onClick={() => setIsRequestOpen(false)} className="absolute top-10 right-10 text-slate-400 hover:text-red-500 transition-all"><X size={32} /></button>
              <div className="text-center mb-12">
                 <div className="w-20 h-20 bg-blue-600 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl animate-float"><UserPlus size={40} /></div>
                 <h3 className="text-4xl font-black tracking-tighter mb-2 dark:text-white uppercase italic">{t.hiringTitle}</h3>
                 <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">{lang === 'ar' ? 'ابدأ رحلة الربح الرقمي' : 'התחילו להרוויח כסף בדיגיטל'}</p>
              </div>
              {isSent ? (
                <div className="py-16 text-center animate-in fade-in zoom-in">
                   <div className="w-24 h-24 bg-emerald-500 text-white rounded-[3rem] flex items-center justify-center mx-auto mb-8 shadow-2xl animate-bounce"><CheckCircle size={48} /></div>
                   <h4 className="text-2xl font-black mb-2 dark:text-white">{t.hiringSuccess}</h4>
                   <p className="text-slate-400 font-bold">{lang === 'ar' ? 'سنتواصل معك قريبا عبر واتساب' : 'ניצור איתך קשר בהקדם בוואטסאפ'}</p>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-6">
                   <input required type="text" placeholder={lang === 'ar' ? 'الاسم الكامل' : 'שם מלא'} value={requestData.name} onChange={e => setRequestData({...requestData, name: e.target.value})} className={`w-full p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 outline-none font-bold shadow-inner ${isRtl ? 'text-right' : ''}`} />
                   <div className="grid grid-cols-2 gap-5">
                      <input required type="number" placeholder={lang === 'ar' ? 'العمر' : 'גיל'} value={requestData.age} onChange={e => setRequestData({...requestData, age: e.target.value})} className={`w-full p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 outline-none font-bold shadow-inner ${isRtl ? 'text-right' : ''}`} />
                      <input required type="text" placeholder={lang === 'ar' ? 'المدينة' : 'עיר מגורים'} value={requestData.city} onChange={e => setRequestData({...requestData, city: e.target.value})} className={`w-full p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 outline-none font-bold shadow-inner ${isRtl ? 'text-right' : ''}`} />
                   </div>
                   <input required type="tel" placeholder={t.phoneInput} value={requestData.phone} onChange={e => setRequestData({...requestData, phone: e.target.value})} className="w-full p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-center shadow-inner" dir="ltr" />
                   <input required type="email" placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'אימייל'} value={requestData.email} onChange={e => setRequestData({...requestData, email: e.target.value})} className="w-full p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-600 outline-none font-bold text-center shadow-inner" dir="ltr" />
                   <button type="submit" className="w-full py-7 bg-blue-600 text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.3em] hover:bg-blue-700 shadow-2xl transition-all flex items-center justify-center gap-4 active:scale-95">
                      <Send size={20} />
                      {t.hiringSubmit}
                   </button>
                </form>
              )}
           </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
