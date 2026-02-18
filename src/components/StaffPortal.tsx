
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  X, Briefcase, TrendingUp, Award, LogOut, Copy, Check,
  Wallet, Star, Medal, Gem, MessageCircle, Send, Clock, CheckCircle2, Bot, 
  Target, BarChart3, LayoutGrid, Sparkles, Zap, Tag, Calendar, 
  FileText, Megaphone, Info, ChevronRight, Share2, Rocket, HelpCircle, Heart, Languages, Globe
} from 'lucide-react';
import { StaffMember, Language, WithdrawalRequest } from '../types';
import { GoogleGenAI } from '@google/genai';
import { TRANSLATIONS, DEFAULT_SERVICES } from '../constants';

interface StaffPortalProps {
  onClose: () => void;
  staff: StaffMember;
  darkMode: boolean;
  lang: Language;
  onUpdateStaff: (updated: StaffMember) => void;
}

const StaffPortal: React.FC<StaffPortalProps> = ({ onClose, staff, darkMode, lang: initialLang, onUpdateStaff }) => {
  // Local language state inside portal to allow worker to switch independently
  const [pLang, setPLang] = useState<Language>(initialLang);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'guide' | 'marketing' | 'ranks' | 'history' | 'support'>('dashboard');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const isRtl = pLang === 'he' || pLang === 'ar';
  
  // Professional internal translations for the portal
  // Fix: Separated the translations object to avoid using portalT before declaration
  const translations = {
    ar: {
      withdraw: 'سحب العمولات',
      minWithdraw: 'الحد الأدنى للسحب 100₪',
      codeLabel: 'كود التسويق الخاص بك',
      codeDesc: 'يمنح الزبون خصم 15% فوري',
      totalSales: 'إجمالي المبيعات',
      commission: 'نسبة العمولة',
      careerPath: 'مسارك الوظيفي',
      marketingHub: 'مركز التسويق',
      copySuccess: 'تم النسخ!',
      copyBtn: 'نسخ النص',
      aiMentor: 'المدرب الذكي AI',
      payoutHistory: 'سجل السحوبات',
      workGuide: 'دليل النجاح',
      ranksTitle: 'نظام الترقيات',
      ranksSub: 'ارتقِ بمستواك لزيادة عمولتك',
      statusPending: 'قيد الانتظار',
      statusDone: 'مكتمل'
    },
    he: {
      withdraw: 'משיכת עמלות',
      minWithdraw: 'מינימום למשיכה 100₪',
      codeLabel: 'קוד השיווק האישי שלך',
      codeDesc: 'מעניק ללקוח 15% הנחה מיידית',
      totalSales: 'סה"כ מכירות',
      commission: 'אחוז עמלה',
      careerPath: 'התקדמות קריירה',
      marketingHub: 'חומרי שיווק',
      copySuccess: 'הועתק!',
      copyBtn: 'העתק טקסט',
      aiMentor: 'מנטור AI חכם',
      payoutHistory: 'היסטוריית משיכות',
      workGuide: 'מדריך להצלחה',
      ranksTitle: 'מערכת דרגות',
      ranksSub: 'תתקדמו בדרגות כדי להרוויח יותר',
      statusPending: 'בהמתנה',
      statusDone: 'בוצע'
    },
    en: {
      withdraw: 'Withdraw Commissions',
      minWithdraw: 'Min Withdrawal 100₪',
      codeLabel: 'Your Marketing Code',
      codeDesc: 'Gives 15% OFF to customers',
      totalSales: 'Total Sales',
      commission: 'Commission Rate',
      careerPath: 'Career Progress',
      marketingHub: 'Marketing Hub',
      copySuccess: 'Copied!',
      copyBtn: 'Copy Script',
      aiMentor: 'AI Sales Coach',
      payoutHistory: 'Withdrawal History',
      workGuide: 'Success Guide',
      ranksTitle: 'Partner Ranks',
      ranksSub: 'Level up to increase commission',
      statusPending: 'Pending',
      statusDone: 'Completed'
    }
  };
  const portalT = translations[pLang as 'ar' | 'he' | 'en'] || translations.en;

  // Ranks configuration
  const RANKS = useMemo(() => [
    { level: 1, name: { ar: 'مبتدئ', he: 'מתחיל', en: 'STARTER' }, sales: 0, commission: 15, icon: <Medal /> },
    { level: 2, name: { ar: 'خبير', he: 'מומחה', en: 'EXPERT' }, sales: 25, commission: 17, icon: <Award /> },
    { level: 3, name: { ar: 'نخبة', he: 'אليط', en: 'ELITE' }, sales: 100, commission: 20, icon: <Star /> },
    { level: 4, name: { ar: 'أسطورة', he: 'אגדה', en: 'LEGEND' }, sales: 300, commission: 25, icon: <Gem /> },
  ], []);

  const currentRank = useMemo(() => {
    return [...RANKS].reverse().find(r => (staff.salesCount || 0) >= r.sales) || RANKS[0];
  }, [staff.salesCount, RANKS]);

  const nextRank = useMemo(() => {
    return RANKS.find(r => r.sales > (staff.salesCount || 0));
  }, [staff.salesCount, RANKS]);

  const progressToNext = nextRank ? Math.min(100, ((staff.salesCount || 0) / nextRank.sales) * 100) : 100;

  // Marketing Scripts
  const marketingScripts = useMemo(() => ({
    ar: [
      { title: "رسالة مباشرة للمؤثرين", content: `مرحباً، لاحظت المحتوى الرائع الذي تقدمه! نحن في Huutix نساعد الحسابات المميزة مثلك على زيادة التفاعل والوصول لقائمة الاستكشاف (Explore) عبر خدمات VIP حقيقية بضمان استقرار. يمكنك استخدام كودي الخاص [${staff.couponCode}] للحصول على خصم 15% فوري! رابط الموقع: huutix.com` },
      { title: "نص إعلان ستوري", content: `تريد زيادة متابعينك وتفاعل حسابك بطريقة آمنة؟ 🚀 شركة Huutix Elite تقدم أفضل خدمات تطوير الحسابات في البلاد. استعمل الكود الخاص فيني [${staff.couponCode}] واطلب الآن من الرابط في البايو!` },
      { title: "رسالة واتساب للشركات", content: `تحية طيبة، بصفتي مستشار نمو رقمي في Huutix، يسعدني تقديم حلول لتعزيز مصداقية شركتكم عبر زيادة المتابعين واللايكات بجودة VIP. خدماتنا مضمونة وتساعد في كسب ثقة الزبائن الجدد. استخدم كود الخصم [${staff.couponCode}].` }
    ],
    he: [
      { title: "הודעה ישירה למשפיענים", content: `היי, ראיתי את התוכן המדהים שלך! ב-Huutix אנחנו עוזרים לחשבונות איכותיים להגיע לאקספלור ולהגדיל חשיפה עם שירותי VIP אמיתיים. מוזמן להשתמש בקוד שלי [${staff.couponCode}] לקבלת 15% הנחה מיידית! לינק לאתר: huutix.com` },
      { title: "טקסט לסטורי", content: `רוצים להקפיץ את האינסטגרם שלכם? 🚀 שירותי הקידום של Huutix Elite הם הכי אמינים בארץ. השתמשו בקוד שלי [${staff.couponCode}] והזמינו עכשיו דרך הלינק בביו!` },
      { title: "הודעה לעסקים בוואטסאפ", content: `שלום רב, כיועץ צמיחה דיגיטלית ב-Huutix, אשמח להציע לכם פתרונות להגברת האמינות של העסק דרך עוקבים ולייקים באיכות פרימיום. השירות עוזר בבניית אמון מול לקוחות חדשים. השתמשו בקוד הקופון [${staff.couponCode}].` }
    ],
    en: [
      { title: "Direct Message for Influencers", content: `Hi! Love your content. At Huutix, we help creators like you reach the Explore page and boost engagement with VIP quality services. Use my code [${staff.couponCode}] for an instant 15% discount! Website: huutix.com` },
      { title: "Story Ad Script", content: `Want to skyrocket your Instagram growth? 🚀 Huutix Elite offers the most reliable social growth services. Use my code [${staff.couponCode}] and order now from the link in bio!` },
      { title: "B2B WhatsApp Message", content: `Hello, as a growth consultant at Huutix, I’d love to help boost your business credibility through premium social signals. Our services are guaranteed and build fast trust with new customers. Use code [${staff.couponCode}].` }
    ]
  }), [staff.couponCode]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleWithdrawalRequest = () => {
    if ((staff.earnings || 0) < 100) { alert(portalT.minWithdraw); return; }
    setIsWithdrawing(true);
    setTimeout(() => {
        const rawPayouts = localStorage.getItem('huutix_payouts');
        const allPayouts = rawPayouts ? JSON.parse(rawPayouts) : [];
        const newReq: WithdrawalRequest = { 
          id: Date.now().toString(), 
          workerId: staff.id, 
          amount: staff.earnings, 
          method: 'Bit', 
          status: 'pending', 
          date: new Date().toISOString() 
        };
        localStorage.setItem('huutix_payouts', JSON.stringify([...allPayouts, newReq]));
        
        // Critical: Update staff balance without deleting credentials
        onUpdateStaff({...staff, earnings: 0});
        setIsWithdrawing(false);
        alert(pLang === 'ar' ? 'تم تقديم طلب السحب بنجاح!' : 'בקשת המשיכה התקבלה בהצלחה!');
    }, 1500);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault(); 
    if (!inputText.trim() || isTyping) return;
    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputText(''); 
    setIsTyping(true);
    try {
      // Create a new instance for each interaction as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = `You are the Huutix Elite Marketing Mentor. Support ${staff.name} who is in ${currentRank.name.en} tier. Respond in ${pLang}. Focus on Instagram sales strategies.`;
      const response = await ai.models.generateContent({ 
        model: 'gemini-3-pro-preview', 
        contents: userMsg, 
        config: { systemInstruction } 
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "Connection Error." }]);
    } catch (err) { 
      setMessages(prev => [...prev, { role: 'model', text: "Support logic error." }]); 
    } finally { setIsTyping(false); }
  };

  const payoutHistory = useMemo(() => {
    try {
      const rawPayouts = localStorage.getItem('huutix_payouts');
      const allPayouts = rawPayouts ? JSON.parse(rawPayouts) : [];
      return Array.isArray(allPayouts) ? allPayouts.filter((p: WithdrawalRequest) => p.workerId === staff.id).reverse() : [];
    } catch { return []; }
  }, [staff.id]);

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col h-screen ${darkMode ? 'bg-[#020617] text-white' : 'bg-[#f8fafc] text-slate-900'}`} dir={isRtl ? 'rtl' : 'ltr'}>
       
       <header className="px-8 py-4 border-b dark:border-white/5 flex items-center justify-between bg-white dark:bg-[#020617] shrink-0 shadow-sm z-30">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg"><Briefcase size={24} /></div>
             <div>
                <h2 className="text-lg font-black uppercase italic leading-none mb-1">{staff.name}</h2>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{currentRank.name[pLang as 'ar' | 'he' | 'en'] || currentRank.name.en} PARTNER</span>
                </div>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
                {['ar', 'he', 'en'].map(l => (
                  <button 
                    key={l} 
                    onClick={() => setPLang(l as any)} 
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${pLang === l ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}
                  >
                    {l}
                  </button>
                ))}
             </div>
             <button onClick={onClose} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95"><LogOut size={20} /></button>
          </div>
       </header>

       <div className="flex flex-1 overflow-hidden">
          <aside className="w-20 sm:w-72 border-inline dark:border-white/5 flex flex-col p-4 bg-slate-50 dark:bg-[#020617] shrink-0 z-20 overflow-y-auto no-scrollbar">
             {[
               { id: 'dashboard', label: pLang === 'ar' ? 'لوحة التحكم' : pLang === 'he' ? 'לוח בקרה' : 'Dashboard', icon: <LayoutGrid size={20}/> },
               { id: 'guide', label: pLang === 'ar' ? 'دليل النجاح' : pLang === 'he' ? 'מדריך הצלחה' : 'Success Guide', icon: <HelpCircle size={20}/> },
               { id: 'marketing', label: pLang === 'ar' ? 'نصوص جاهزة' : pLang === 'he' ? 'חומרי שיווק' : 'Marketing Hub', icon: <Megaphone size={20}/> },
               { id: 'ranks', label: pLang === 'ar' ? 'المستويات' : pLang === 'he' ? 'דרגות וקריירה' : 'Career Path', icon: <Target size={20}/> },
               { id: 'history', label: pLang === 'ar' ? 'سجل السحوبات' : pLang === 'he' ? 'היסטוריית משיכות' : 'Withdrawals', icon: <Clock size={20}/> },
               { id: 'support', label: pLang === 'ar' ? 'مدرب الـ AI' : pLang === 'he' ? 'מנטור AI' : 'AI Coach', icon: <Bot size={20}/> }
             ].map(tab => (
               <button 
                 key={tab.id} 
                 onClick={() => setActiveTab(tab.id as any)} 
                 className={`w-full flex items-center justify-center sm:justify-start gap-4 p-4 rounded-2xl transition-all mb-2 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl' : 'hover:bg-blue-500/10 text-slate-400'}`}
               >
                 <span className="shrink-0">{tab.icon}</span>
                 <span className="hidden sm:block text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
               </button>
             ))}
          </aside>

          <main className="flex-1 overflow-y-auto p-6 sm:p-10 no-scrollbar bg-grid relative">
             
             {activeTab === 'dashboard' && (
               <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                     <div className="lg:col-span-2 p-10 rounded-[3rem] bg-slate-950 text-white shadow-2xl relative overflow-hidden border border-white/5">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                        <div className="relative z-10">
                           <p className="text-[10px] font-black uppercase text-blue-400 mb-2 tracking-[0.4em]">CURRENT BALANCE</p>
                           <div className="flex items-baseline gap-3 mb-10">
                              <h3 className="text-8xl font-black italic tracking-tighter">{staff.earnings || 0}</h3>
                              <span className="text-3xl font-black text-blue-500">₪</span>
                           </div>
                           <button 
                             disabled={(staff.earnings || 0) < 100 || isWithdrawing} 
                             onClick={handleWithdrawalRequest} 
                             className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-4 disabled:opacity-30 active:scale-95"
                           >
                              {isWithdrawing ? <Zap className="animate-spin" /> : <Wallet size={20} />}
                              {portalT.withdraw}
                           </button>
                        </div>
                     </div>
                     
                     <div className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border dark:border-white/5 shadow-xl text-center flex flex-col justify-center">
                        <div className="w-14 h-14 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4"><Tag size={28}/></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-3">{portalT.codeLabel}</p>
                        <div 
                          className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-between cursor-pointer hover:border-blue-500 transition-all group" 
                          onClick={() => handleCopy(staff.couponCode)}
                        >
                           <span className="text-3xl font-black text-blue-600 italic uppercase">{staff.couponCode}</span>
                           <div className={`p-2 rounded-lg ${copiedText === staff.couponCode ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white group-hover:bg-blue-600'}`}>
                              {copiedText === staff.couponCode ? <Check size={18} /> : <Copy size={18} />}
                           </div>
                        </div>
                        <p className="text-[9px] font-bold text-slate-400 mt-4 uppercase">{portalT.codeDesc}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border dark:border-white/5 shadow-xl">
                          <div className="flex items-center justify-between mb-8">
                             <h4 className="text-lg font-black italic uppercase">{portalT.careerPath}</h4>
                             <Target size={24} className="text-blue-600"/>
                          </div>
                          <div className="space-y-6">
                             <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                                <span>{currentRank.name[pLang as 'ar' | 'he' | 'en'] || currentRank.name.en}</span>
                                <span>{nextRank ? `Goal: ${nextRank.name[pLang as 'ar' | 'he' | 'en'] || nextRank.name.en}` : 'Max Tier'}</span>
                             </div>
                             <div className="h-6 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-1">
                                <div className="h-full bg-blue-600 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(37,99,235,0.4)]" style={{width: `${progressToNext}%`}}></div>
                             </div>
                          </div>
                      </div>
                      
                      <div className="p-8 rounded-[3rem] bg-slate-900 text-white border border-white/5 shadow-2xl flex flex-col justify-center">
                         <div className="grid grid-cols-2 gap-8">
                            <div className="text-center">
                               <span className="text-[9px] font-black uppercase text-slate-500 block mb-2 tracking-widest">{portalT.totalSales}</span>
                               <span className="text-5xl font-black italic tracking-tighter">{staff.salesCount || 0}</span>
                            </div>
                            <div className="text-center border-l border-white/10 px-4">
                               <span className="text-[9px] font-black uppercase text-slate-500 block mb-2 tracking-widest">{portalT.commission}</span>
                               <span className="text-5xl font-black italic text-blue-500">{currentRank.commission}%</span>
                            </div>
                         </div>
                      </div>
                  </div>
               </div>
             )}

             {activeTab === 'ranks' && (
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
                   <div className="text-center mb-12">
                      <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4">{portalT.ranksTitle}</h3>
                      <p className="text-slate-500 font-bold">{portalT.ranksSub}</p>
                   </div>
                   <div className="grid grid-cols-1 gap-6">
                      {RANKS.map((rank) => {
                        const isCurrent = currentRank.level === rank.level;
                        return (
                          <div key={rank.level} className={`p-8 rounded-[2.5rem] border-2 flex items-center justify-between transition-all ${isCurrent ? 'bg-blue-600 text-white border-blue-600 shadow-2xl scale-[1.02]' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-white/5 opacity-80'}`}>
                             <div className="flex items-center gap-6">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-xl ${isCurrent ? 'bg-white text-blue-600' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                                   {rank.icon}
                                </div>
                                <div className={isRtl ? 'text-right' : 'text-left'}>
                                   <h4 className="text-2xl font-black italic">{rank.name[pLang as 'ar' | 'he' | 'en'] || rank.name.en}</h4>
                                   <p className={`text-xs font-bold ${isCurrent ? 'text-blue-100' : 'text-slate-400'}`}>
                                      {rank.sales}+ {pLang === 'ar' ? 'مبيعات' : pLang === 'he' ? 'מכירות' : 'Sales'}
                                   </p>
                                </div>
                             </div>
                             <div className={isRtl ? 'text-left' : 'text-right'}>
                                <span className={`text-4xl font-black italic ${isCurrent ? 'text-white' : 'text-emerald-500'}`}>{rank.commission}%</span>
                                <p className={`text-[10px] font-black uppercase tracking-widest ${isCurrent ? 'text-blue-100' : 'text-slate-400'}`}>{portalT.commission}</p>
                             </div>
                          </div>
                        );
                      })}
                   </div>
                </div>
             )}

             {activeTab === 'marketing' && (
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
                   <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-8">{portalT.marketingHub}</h3>
                   <div className="space-y-6">
                      {(marketingScripts[pLang as 'ar' | 'he' | 'en'] || marketingScripts.en).map((script, idx) => (
                         <div key={idx} className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border dark:border-white/5 shadow-xl group hover:border-blue-500 transition-all">
                            <div className="flex items-center justify-between mb-6">
                               <h4 className="text-lg font-black text-blue-600 flex items-center gap-3"><FileText size={20}/> {script.title}</h4>
                               <button 
                                 onClick={() => handleCopy(script.content)}
                                 className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${copiedText === script.content ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-blue-600'}`}
                               >
                                  {copiedText === script.content ? <Check size={14}/> : <Share2 size={14}/>}
                                  {copiedText === script.content ? portalT.copySuccess : portalT.copyBtn}
                               </button>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border dark:border-white/10 text-sm font-medium leading-relaxed italic text-slate-600 dark:text-slate-300">
                               "{script.content}"
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             )}

             {activeTab === 'guide' && (
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
                   <div className="p-10 rounded-[3rem] bg-blue-600 text-white shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12"><Rocket size={150} /></div>
                      <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4">{portalT.workGuide}</h3>
                      <p className="text-blue-100 font-bold max-w-xl text-lg leading-relaxed">
                         {pLang === 'ar' ? 'بصفتك شريكاً في Huutix، عملك هو جسر الثقة بيننا وبين الزبون. إليك كيف تبدأ بجني الأرباح فوراً.' : 
                          pLang === 'he' ? 'כשותפים ב-Huutix, התפקיד שלכם הוא לבנות אמון מול הלקוח. כך תתחילו להרוויח כסף כבר עכשיו.' :
                          'As a Huutix partner, your job is to build trust. Here is how to start earning immediately.'}
                      </p>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { 
                          title: pLang === 'ar' ? '1. افهم جودة الخدمة' : pLang === 'he' ? '1. הבנת איכות השירות' : '1. Understand Quality', 
                          desc: pLang === 'ar' ? 'تعرف على خدماتنا (VIP)، الضمان لمدة 30 يوماً، وسرعة التنفيذ. المعرفة هي سلاحك.' : pLang === 'he' ? 'למדו על שירותי ה-VIP, אחריות ה-30 יום ומהירות הביצוע. הידע הוא הכוח שלכם.' : 'Learn about VIP services, 30-day guarantee, and speed.', 
                          icon: <Info /> 
                        },
                        { 
                          title: pLang === 'ar' ? '2. ابحث عن حسابات تجارية' : pLang === 'he' ? '2. מציאת חשבונות עסקיים' : '2. Find Business Accounts', 
                          desc: pLang === 'ar' ? 'استهدف الصفحات التي تبيع منتجات أو مؤثرين في بدايتهم. هؤلاء هم زبائنك الأساسيين.' : pLang === 'he' ? 'פנו לעסקים שמוכרים מוצרים או משפיענים מתחילים. אלו הלקוחות הפוטנציאליים שלכם.' : 'Target sellers or micro-influencers.', 
                          icon: <Target /> 
                        },
                        { 
                          title: pLang === 'ar' ? '3. قدم كودك الشخصي' : pLang === 'he' ? '3. הצגת הקוד האישי' : '3. Offer Your Code', 
                          desc: pLang === 'ar' ? 'كودك يمنح الزبون خصم 15% ويضمن لك عمولتك. شجعهم على استخدامه دائماً.' : pLang === 'he' ? 'הקוד שלכם נותן 15% הנחה ומבטיח לכם עמלה. תמיד תזכירו להשתמש בו.' : 'Your code gives 15% OFF and secures your commission.', 
                          icon: <Zap /> 
                        },
                        { 
                          title: pLang === 'ar' ? '4. الخدمة المستمرة' : pLang === 'he' ? '4. שירות מתמשך' : '4. Continuous Support', 
                          desc: pLang === 'ar' ? 'تابع الزبون بعد الطلب لضمان رضاه. الزبون الراضي سيطلب منك مرة أخرى.' : pLang === 'he' ? 'עקבו אחרי הלקוח כדי לוודא שביעות רצון. לקוח מרוצה יחזור אליכם שוב.' : 'Follow up with clients to ensure satisfaction.', 
                          icon: <Heart /> 
                        }
                      ].map((step, idx) => (
                        <div key={idx} className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border dark:border-white/5 flex gap-6">
                           <div className="w-14 h-14 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center shrink-0">{step.icon}</div>
                           <div className={isRtl ? 'text-right' : 'text-left'}>
                              <h4 className="font-black text-xl leading-tight mb-2">{step.title}</h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{step.desc}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             )}

             {activeTab === 'history' && (
                <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
                   <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-8">{portalT.payoutHistory}</h3>
                   {payoutHistory.length === 0 && (
                      <div className="py-32 text-center">
                         <Clock className="text-slate-200 dark:text-slate-800 mx-auto mb-6" size={64} />
                         <p className="text-slate-400 font-black uppercase tracking-widest">No payout history found</p>
                      </div>
                   )}
                   {payoutHistory.map((p: WithdrawalRequest) => (
                      <div key={p.id} className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border dark:border-white/5 flex items-center justify-between shadow-xl">
                         <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${p.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                               {p.status === 'completed' ? <CheckCircle2 size={32}/> : <Clock size={32}/>}
                            </div>
                            <div className={isRtl ? 'text-right' : 'text-left'}>
                               <h4 className="font-black text-3xl italic tracking-tighter mb-1">{p.amount}₪</h4>
                               <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                  <Calendar size={12}/> {new Date(p.date).toLocaleDateString()}
                               </div>
                            </div>
                         </div>
                         <div className={isRtl ? 'text-left' : 'text-right'}>
                            <div className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${p.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-orange-500 text-white animate-pulse'}`}>
                               {p.status === 'pending' ? portalT.statusPending : p.status === 'completed' ? portalT.statusDone : p.status}
                            </div>
                            <span className="text-[9px] font-black text-slate-400 uppercase mt-2 block">via {p.method}</span>
                         </div>
                      </div>
                   ))}
                </div>
             )}

             {activeTab === 'support' && (
                <div className="max-w-4xl mx-auto h-[75vh] flex flex-col bg-white dark:bg-slate-900 rounded-[3rem] border dark:border-white/5 shadow-2xl overflow-hidden">
                   <div className="p-8 border-b dark:border-white/5 bg-slate-950 text-white flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center animate-pulse"><Bot size={28}/></div>
                         <div className={isRtl ? 'text-right' : 'text-left'}>
                            <h4 className="text-lg font-black italic uppercase tracking-tighter">{portalT.aiMentor}</h4>
                            <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">Available 24/7 for strategies</span>
                         </div>
                      </div>
                   </div>
                   <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar bg-grid">
                      <div className="flex justify-start">
                         <div className="max-w-[85%] p-8 rounded-[2rem] text-sm font-bold bg-slate-100 dark:bg-white/5 dark:text-white rounded-tl-none border dark:border-white/5 shadow-xl leading-relaxed">
                            {pLang === 'ar' ? `مرحباً ${staff.name}! كيف يمكنني مساعدتك في زيادة مبيعاتك اليوم؟` : pLang === 'he' ? `היי ${staff.name}! איך אני יכול לעזור לך להגדיל את המכירות היום?` : `Hi ${staff.name}, how can I help you grow today?`}
                         </div>
                      </div>
                      {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                           <div className={`max-w-[85%] p-8 rounded-[2rem] text-sm font-bold shadow-xl leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-100 dark:bg-white/5 dark:text-white rounded-tl-none border dark:border-white/5'}`}>
                              {m.text}
                           </div>
                        </div>
                      ))}
                      {isTyping && (
                         <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 px-6 py-3 rounded-full w-fit">
                            <div className="flex gap-1">
                               <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                               <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                               <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                            </div>
                         </div>
                      )}
                   </div>
                   <form onSubmit={handleSendMessage} className="p-8 border-t dark:border-white/5 flex gap-4 bg-slate-50 dark:bg-slate-950/50">
                      <input value={inputText} onChange={e=>setInputText(e.target.value)} type="text" placeholder={pLang === 'ar' ? "اسأل عن استراتيجية..." : pLang === 'he' ? "שאל את המנטור..." : "Ask strategy..."} className={`flex-1 p-5 rounded-xl bg-white dark:bg-white/5 dark:text-white outline-none font-bold text-sm shadow-inner ${isRtl ? 'text-right' : 'text-left'}`} />
                      <button type="submit" disabled={!inputText.trim() || isTyping} className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center active:scale-95 shadow-xl"><Send size={20}/></button>
                   </form>
                </div>
             )}

          </main>
       </div>
    </div>
  );
};

export default StaffPortal;
