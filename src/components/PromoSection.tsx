
import React, { useState, useMemo } from 'react';
import { Language, Translation, CartItem } from '../types';
import { Award, CheckCircle2, ShoppingCart, Check, Gem, Star, Rocket, TrendingUp } from 'lucide-react';

interface PromoSectionProps {
  lang: Language;
  t: Translation;
  onAddToCart?: (item: CartItem) => void;
}

const PromoSection: React.FC<PromoSectionProps> = ({ lang, t, onAddToCart }) => {
  const [isAddedMap, setIsAddedMap] = useState<Record<string, boolean>>({});
  const isRtl = lang === 'he' || lang === 'ar';

  const bundles = useMemo(() => [
    {
      id: 'bronze-starter',
      number: '#1',
      discount: '25%',
      titleEn: 'Bronze Starter Pack', titleHe: 'חבילת ברונזה למתחילים', titleAr: 'باقة البرونز للمبتدئين',
      price: 339, oldPrice: 450,
      icon: <Star className="w-8 h-8" />,
      colorClass: 'from-blue-600 to-indigo-700', accent: 'text-blue-600', badge: 'bg-blue-600',
      features: [
        { en: '5,000 VIP Followers', he: '5,000 עוקבי VIP', ar: '5,000 متابع VIP' },
        { en: '2,000 Power Likes', he: '2,000 לייקים ויראליים', ar: '2,000 إعجاب قوي' },
        { en: 'Fast Delivery', he: 'אספקה מהירה', ar: 'تنفيذ سريع وآمن' }
      ]
    },
    {
      id: 'silver-pro',
      number: '#2',
      discount: '25%',
      titleEn: 'Silver Professional', titleHe: 'חבילת סילבר למקצוענים', titleAr: 'باقة سيلفر للمحترفين',
      price: 719, oldPrice: 955,
      icon: <TrendingUp className="w-8 h-8" />,
      colorClass: 'from-rose-500 to-pink-600', accent: 'text-rose-600', badge: 'bg-rose-500',
      features: [
        { en: '10,000 VIP Followers', he: '10,000 עוקבי VIP', ar: '10,000 متابع VIP' },
        { en: '5,000 Power Likes', he: '5,000 לייקים ויראליים', ar: '5,000 إعجاب قوي' },
        { en: 'Express Priority', he: 'עדיפות בביצוע', ar: 'أولوية قصوى في التنفيذ' }
      ]
    },
    {
      id: 'gold-elite',
      number: '#3',
      discount: '25%',
      titleEn: 'Gold Elite Strategy', titleHe: 'חבילת גולד אליט מורחבת', titleAr: 'باقة جولد إيليت الاستراتيجية',
      price: 1899, oldPrice: 2525, isBestSeller: true,
      icon: <Award className="w-8 h-8" />,
      colorClass: 'from-teal-500 to-emerald-600', accent: 'text-teal-600', badge: 'bg-teal-600',
      features: [
        { en: '25,000 VIP Followers', he: '25,000 עוקבי VIP', ar: '25,000 متابع VIP' },
        { en: '15,000 Power Likes', he: '15,000 לייקים ויראליים', ar: '15,000 إعجاب قوي' },
        { en: 'Elite Strategy', he: 'אסטרטגיית צמיחה', ar: 'خطة نمو مخصصة' }
      ]
    },
    {
      id: 'diamond-legend',
      number: '#4',
      discount: '25%',
      titleEn: 'Diamond Legend Plus', titleHe: 'חבילת יהלום אגדית', titleAr: 'باقة دياموند الأسطورية بلس',
      price: 3799, oldPrice: 5050,
      icon: <Gem className="w-8 h-8" />,
      colorClass: 'from-amber-500 to-orange-600', accent: 'text-amber-600', badge: 'bg-amber-600',
      features: [
        { en: '50,000 VIP Followers', he: '50,000 עוקבי VIP', ar: '50,000 متابع VIP' },
        { en: '30,000 Power Likes', he: '30,000 לייקים ויראליים', ar: '30,000 إعجاب قوي' },
        { en: 'Priority Manager', he: 'מנהל חשבון אישי', ar: 'مدير حساب شخصي VIP' }
      ]
    }
  ], []);

  const handleAddToCart = (bundle: any) => {
    if (onAddToCart) {
      onAddToCart({
        id: 'bundle-' + bundle.id,
        serviceId: bundle.id,
        serviceTitle: lang === 'he' ? bundle.titleHe : lang === 'ar' ? bundle.titleAr : bundle.titleEn,
        packageLabel: 'Elite Bundle Offer',
        price: bundle.price,
        quantity: 1
      });
      setIsAddedMap(prev => ({ ...prev, [bundle.id]: true }));
      setTimeout(() => setIsAddedMap(prev => ({ ...prev, [bundle.id]: false })), 2000);
    }
  };

  return (
    <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900/40 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.25em] mb-8 shadow-2xl">
            <Rocket size={16} />
            <span>{lang === 'ar' ? 'عروض الحزم الذهبية' : lang === 'he' ? 'חבילות פרימיום בלעדיות' : 'EXCLUSIVE BUNDLES'}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 dark:text-white tracking-tighter">
            {lang === 'ar' ? 'باقات النمو المتكاملة' : lang === 'he' ? 'חבילות צמיחה משתלמות' : 'Growth Bundles'}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
             {lang === 'ar' ? 'وفر حتى 25% مع باقات التوفير الأكثر طلباً' : lang === 'he' ? 'חסכו עד 25% עם חבילות הצמיחה המקיפות' : 'Save up to 25% now'}
          </p>
        </div>

        {/* تفعيل التمرير الأفقي snap-x */}
        <div className="flex overflow-x-auto no-scrollbar gap-8 pb-12 px-4 snap-x snap-mandatory cursor-grab active:cursor-grabbing">
          {bundles.map((bundle) => (
            <div key={bundle.id} className="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] flex-shrink-0 snap-center group relative p-[2px] rounded-[4rem] transition-all duration-700 hover:scale-[1.03]">
              <div className="bg-white dark:bg-slate-950 rounded-[3.9rem] p-10 h-full flex flex-col relative overflow-hidden shadow-2xl border dark:border-white/5">
                
                {/* الترقيم الخلفي البارز */}
                <div className="absolute top-8 left-10 font-black text-6xl italic opacity-5 dark:text-white pointer-events-none">
                  {bundle.number}
                </div>

                {/* بادج الخصم الملون في الزاوية */}
                <div className={`absolute top-0 right-10 px-4 py-2 rounded-b-2xl font-black text-[10px] text-white shadow-lg z-20 ${bundle.badge} animate-pulse`}>
                  SAVE {bundle.discount}
                </div>

                <div className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center mb-10 bg-gradient-to-br ${bundle.colorClass} text-white shadow-xl mt-4`}>
                  {bundle.icon}
                </div>
                
                <h3 className="text-xl font-black mb-4 dark:text-white leading-tight min-h-[50px]">
                  {lang === 'he' ? bundle.titleHe : lang === 'ar' ? bundle.titleAr : bundle.titleEn}
                </h3>
                
                <div className="flex items-baseline gap-3 mb-10">
                  <span className={`text-5xl font-black italic tracking-tighter dark:text-white group-hover:${bundle.accent}`}>{bundle.price}₪</span>
                  <span className="text-lg text-slate-400 line-through font-bold opacity-60">{bundle.oldPrice}₪</span>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {bundle.features.map((feat: any, idx) => (
                    <div key={idx} className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span className="text-[11px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-tight">{feat[lang] || feat.en}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleAddToCart(bundle)}
                  className={`w-full py-6 rounded-[2.5rem] font-black text-[12px] uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 shadow-2xl ${
                    isAddedMap[bundle.id] ? 'bg-emerald-500 text-white' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  {isAddedMap[bundle.id] ? <Check size={20} /> : <ShoppingCart size={20} />}
                  <span>{isAddedMap[bundle.id] ? (lang === 'ar' ? 'تمت الإضافة' : 'נוסף לסל') : t.addToCartBtn}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
