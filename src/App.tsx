
import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import { Language, CartItem, ServiceData, Testimonial, StaffMember, SiteSettings, FAQItem } from './types';
import { DEFAULT_SERVICES, TRANSLATIONS, INITIAL_TESTIMONIALS, FAQ_DATA as DEFAULT_FAQ, DEFAULT_WHATSAPP, DEFAULT_PAYMENT_PHONE, DEFAULT_GMAIL, DEFAULT_INSTAGRAM, DEFAULT_TELEGRAM } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import ServiceCard from './components/ServiceCard';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import PromoSection from './components/PromoSection';
import AIChat from './components/AIChat';
import AIFeatureSection from './components/AIFeatureSection';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';

const OrderModal = lazy(() => import('./components/OrderModal'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const LegalModal = lazy(() => import('./components/LegalModal'));
const StaffPortal = lazy(() => import('./components/StaffPortal'));

const GlobalLoader = () => (
  <div className="fixed inset-0 z-[300] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const StaffLoginModal: React.FC<{onLogin: (staff: StaffMember) => void, onClose: () => void, darkMode: boolean, lang: Language}> = ({onLogin, onClose, darkMode, lang}) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const t = TRANSLATIONS[lang];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const rawWorkers = localStorage.getItem('huutix_staff_members');
    const workers = rawWorkers ? JSON.parse(rawWorkers) : [];
    
    if (Array.isArray(workers)) {
      const found = workers.find((w: StaffMember) => w.username === user && w.password === pass);
      if (found) onLogin(found);
      else setErr(lang === 'ar' ? 'خطأ في بيانات الدخول!' : 'Invalid credentials');
    } else {
      setErr(lang === 'ar' ? 'خطأ في قاعدة البيانات!' : 'Database error');
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-3xl">
       <div className="bg-white dark:bg-[#020617] w-full max-w-sm p-12 rounded-[4rem] shadow-3xl text-center relative border dark:border-white/5 animate-in zoom-in duration-300">
          <button onClick={onClose} className="absolute top-10 right-10 text-slate-400 hover:text-red-500 transition-all"><X size={28} /></button>
          <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <ShieldCheck size={40} />
          </div>
          <h3 className="text-3xl font-black mb-1 dark:text-white uppercase italic tracking-widest">PARTNER LOGIN</h3>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-10">Secure Access</p>
          {err && <p className="text-red-500 text-[10px] font-bold mb-6 bg-red-500/10 py-3 rounded-xl">{err}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
             <input required type="text" placeholder="Username" value={user} onChange={e => setUser(e.target.value)} className="w-full p-6 rounded-2xl bg-slate-100 dark:bg-[#0f172a] dark:text-white outline-none font-bold text-center" />
             <input required type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} className="w-full p-6 rounded-2xl bg-slate-100 dark:bg-[#0f172a] dark:text-white outline-none font-bold text-center tracking-[0.5em]" />
             <button type="submit" className="w-full py-6 bg-blue-600 text-white font-black rounded-[2rem] hover:bg-blue-700 transition-all uppercase tracking-[0.3em] text-[11px]">ACCESS HUB</button>
          </form>
       </div>
    </div>
  );
};

const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] px-8 py-4 bg-slate-950 text-white rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4 toast-animate">
    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center"><CheckCircle2 size={18} /></div>
    <span className="text-xs font-black uppercase tracking-widest">{message}</span>
  </div>
);

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('huutix_lang') as Language) || 'he'); 
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('huutix_theme') === 'dark');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('huutix_site_settings');
    const defaults = {
      whatsapp: DEFAULT_WHATSAPP,
      paymentPhone: DEFAULT_PAYMENT_PHONE,
      gmail: DEFAULT_GMAIL,
      instagram: DEFAULT_INSTAGRAM,
      telegram: DEFAULT_TELEGRAM
    };
    try {
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaults, ...parsed };
      }
      return defaults;
    } catch {
      return defaults;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeStaff, setActiveStaff] = useState<StaffMember | null>(null);
  const [isStaffLoginOpen, setIsStaffLoginOpen] = useState(false);
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | null>(null);
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('huutix_testimonials');
    const parsed = saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    return (Array.isArray(parsed) && parsed.length > 0) ? parsed : INITIAL_TESTIMONIALS;
  });

  const t = useMemo(() => TRANSLATIONS[lang], [lang]);
  const isRtl = useMemo(() => lang === 'he' || lang === 'ar', [lang]);

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    if (darkMode) document.body.classList.add('dark'); else document.body.classList.remove('dark');
    localStorage.setItem('huutix_lang', lang);
    localStorage.setItem('huutix_theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('huutix_testimonials', JSON.stringify(testimonials));
  }, [lang, darkMode, isRtl, testimonials]);

  const addToCart = useCallback((item: CartItem) => {
    setCartItems(prev => [...(prev || []), item]);
    setToast(lang === 'ar' ? 'تمت الإضافة للسلة!' : lang === 'he' ? 'נוסף לסל!' : 'Added to cart!');
    setTimeout(() => setToast(null), 3000);
  }, [lang]);

  const totalCartPrice = useMemo(() => (cartItems || []).reduce((acc, item) => acc + (item.price || 0), 0), [cartItems]);

  const updateSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    localStorage.setItem('huutix_site_settings', JSON.stringify(newSettings));
  };

  const updateStaffMember = (updated: StaffMember) => {
    setActiveStaff(updated);
    const rawWorkers = localStorage.getItem('huutix_staff_members');
    const workers = rawWorkers ? JSON.parse(rawWorkers) : [];
    if (Array.isArray(workers)) {
      const newWorkers = workers.map((w: StaffMember) => w.id === updated.id ? updated : w);
      localStorage.setItem('huutix_staff_members', JSON.stringify(newWorkers));
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark text-white' : 'text-slate-900'} transition-colors duration-300 bg-grid pb-20`}>
      <Navbar lang={lang} setLang={setLang} darkMode={darkMode} setDarkMode={setDarkMode} cartItems={cartItems || []} setCartItems={setCartItems} onCheckout={() => setIsCheckoutOpen(true)} onReset={() => window.scrollTo({top:0, behavior:'smooth'})} />
      
      <main className="relative z-10">
        <Hero t={t} lang={lang} />
        
        <HowItWorks t={t} lang={lang} darkMode={darkMode} />

        <section id="services" className="py-16 px-4 max-w-7xl mx-auto">
          <div className="flex overflow-x-auto no-scrollbar gap-8 pb-10 px-4 snap-x snap-mandatory">
            {DEFAULT_SERVICES.map((service) => (
              <div key={service.id} className="min-w-[320px] md:min-w-[420px] flex-shrink-0 snap-center">
                <ServiceCard service={service} lang={lang} t={t} darkMode={darkMode} onAddToCart={addToCart} />
              </div>
            ))}
          </div>
        </section>

        <AIFeatureSection lang={lang} t={t} darkMode={darkMode} />
        <PromoSection lang={lang} t={t} onAddToCart={addToCart} />
        <Testimonials testimonials={testimonials || []} onAddReview={(r) => {const n=[(r as Testimonial), ...(testimonials || [])]; setTestimonials(n);}} lang={lang} t={t} darkMode={darkMode} />
        <FAQ lang={lang} t={t} darkMode={darkMode} faqs={DEFAULT_FAQ || []} />
      </main>

      <Footer 
        t={t} 
        lang={lang} 
        onLegalClick={(type) => setLegalType(type)} 
        onStaffLoginClick={() => setIsStaffLoginOpen(true)} 
        onAdminClick={() => { console.log("Opening Admin..."); setIsAdminOpen(true); }}
        settings={siteSettings} 
      />
      
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <Suspense fallback={<GlobalLoader />}>
        {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} testimonials={testimonials || []} setTestimonials={setTestimonials} darkMode={darkMode} onSettingsUpdate={updateSettings} currentSettings={siteSettings} />}
        {isStaffLoginOpen && <StaffLoginModal darkMode={darkMode} lang={lang} onClose={() => setIsStaffLoginOpen(false)} onLogin={(s) => { setActiveStaff(s); setIsStaffLoginOpen(false); }} />}
        {activeStaff && <StaffPortal staff={activeStaff} darkMode={darkMode} lang={lang} onClose={() => setActiveStaff(null)} onUpdateStaff={updateStaffMember} />}
        {legalType && <LegalModal isOpen={true} type={legalType} onClose={() => setLegalType(null)} lang={lang} />}
        {isCheckoutOpen && (
          <OrderModal 
            isOpen={isCheckoutOpen} 
            onClose={() => setIsCheckoutOpen(false)} 
            lang={lang} 
            settings={siteSettings}
            package={{ 
              price: totalCartPrice, 
              labelEn: 'Elite Selections', labelAr: 'اختيارات النخبة السريعة', labelHe: 'סל בחירות מובחר', labelRu: 'Корзина', 
              amount: (cartItems || []).length 
            } as any} 
          />
        )}
      </Suspense>

      <AIChat lang={lang} darkMode={darkMode} cartItems={cartItems || []} />
    </div>
  );
};

export default App;
