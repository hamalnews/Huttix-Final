
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ServiceData, Language, Translation, ServicePrice, CartItem } from '../types';
import { Check, ShoppingCart, Minus, Plus, Star, ShieldCheck } from 'lucide-react';
import { getIconById } from '../constants';

interface ServiceCardProps {
  service: ServiceData & { badgeLabel?: Record<string, string> };
  lang: Language;
  t: Translation;
  darkMode: boolean;
  onAddToCart?: (item: CartItem) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, lang, t, darkMode, onAddToCart }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [dynamicQty, setDynamicQty] = useState(service.min || 0);
  const [dynamicPrice, setDynamicPrice] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const isRtl = lang === 'he' || lang === 'ar';

  const theme = useMemo(() => {
    switch (service.id) {
      case 'followers': return { 
        gradient: 'from-blue-600 to-indigo-700', 
        text: 'text-blue-600', 
        bg: 'bg-blue-600', 
        lightBg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        shadow: 'shadow-blue-500/20' 
      };
      case 'likes': return { 
        gradient: 'from-rose-500 to-pink-600', 
        text: 'text-rose-600', 
        bg: 'bg-rose-500', 
        lightBg: 'bg-rose-500/10',
        border: 'border-rose-500/20',
        shadow: 'shadow-rose-500/20' 
      };
      case 'comments': return { 
        gradient: 'from-teal-500 to-emerald-600', 
        text: 'text-teal-600', 
        bg: 'bg-teal-600', 
        lightBg: 'bg-teal-500/10',
        border: 'border-teal-500/20',
        shadow: 'shadow-teal-500/20' 
      };
      case 'views': return { 
        gradient: 'from-amber-500 to-orange-600', 
        text: 'text-amber-600', 
        bg: 'bg-amber-600', 
        lightBg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        shadow: 'shadow-amber-500/20' 
      };
      default: return { 
        gradient: 'from-slate-800 to-slate-900', 
        text: 'text-slate-900', 
        bg: 'bg-slate-900', 
        lightBg: 'bg-slate-100',
        border: 'border-slate-200',
        shadow: 'shadow-slate-500/20' 
      };
    }
  }, [service.id]);

  useEffect(() => {
    if (service.isDynamic && service.unitPrice) {
      setDynamicPrice(Math.round(dynamicQty * service.unitPrice));
    }
  }, [dynamicQty, service]);

  const currentPriceObj: ServicePrice = service.isDynamic 
    ? { amount: dynamicQty, price: dynamicPrice, labelEn: `${dynamicQty} Units`, labelHe: `${dynamicQty} יחידות`, labelAr: `${dynamicQty} وحدة`, labelRu: `${dynamicQty} Ед.` }
    : (service.prices ? service.prices[selectedIdx] : { amount: 0, price: 0, labelEn: '', labelHe: '', labelAr: '', labelRu: '' });

  const handleAddToCart = useCallback(() => {
    if (onAddToCart) {
      onAddToCart({
        id: Math.random().toString(36).substr(2, 9),
        serviceId: service.id,
        serviceTitle: lang === 'ar' ? service.titleAr : lang === 'he' ? service.titleHe : service.titleEn,
        packageLabel: lang === 'ar' ? currentPriceObj.labelAr : lang === 'he' ? currentPriceObj.labelHe : currentPriceObj.labelEn,
        price: currentPriceObj.price,
        quantity: 1
      });
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  }, [onAddToCart, service, lang, currentPriceObj]);

  return (
    <div className={`group relative rounded-[4rem] border p-8 flex flex-col transition-all duration-700 h-full ${darkMode ? 'bg-slate-900 border-white/5 hover:border-white/10' : 'bg-white border-slate-100 shadow-2xl hover:shadow-3xl'} hover:-translate-y-4 overflow-hidden`}>
      
      {/* بادج الزاوية الملون */}
      <div className={`absolute top-0 ${isRtl ? 'left-10' : 'right-10'} px-5 py-2.5 rounded-b-2xl font-black text-[10px] uppercase tracking-widest text-white shadow-lg z-20 ${theme.bg} animate-pulse`}>
        {service.badgeLabel ? service.badgeLabel[lang] : 'VIP'}
      </div>

      {/* دائرة الشعار الملونة */}
      <div className="flex justify-center mb-10 mt-6 relative">
        <div className={`absolute inset-0 blur-[40px] opacity-20 rounded-full ${theme.bg}`}></div>
        <div className={`w-24 h-24 rounded-[2.5rem] ${theme.bg} text-white flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 relative z-10`}>
          {getIconById(service.iconId, "w-12 h-12")}
        </div>
      </div>

      {/* نصوص الخدمة */}
      <div className={`relative z-10 flex flex-col mb-10 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div className={`inline-flex items-center gap-2 mb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
           <ShieldCheck size={14} className={theme.text} />
           <span className={`text-[10px] font-black uppercase tracking-widest ${theme.text}`}>100% Safe Delivery</span>
        </div>
        <h3 className={`text-2xl font-black dark:text-white tracking-tighter leading-tight mb-3 min-h-[60px] flex items-center ${isRtl ? 'justify-end' : 'justify-start'}`}>
          {lang === 'ar' ? service.titleAr : lang === 'he' ? service.titleHe : service.titleEn}
        </h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] line-clamp-2 italic opacity-80">
          {lang === 'ar' ? service.descriptionAr : lang === 'he' ? service.descriptionHe : service.descriptionEn}
        </p>
      </div>

      {/* منطقة التحكم والتفاعل */}
      <div className="relative z-10 mb-8 flex-grow space-y-8">
        <div className={`${theme.lightBg} p-6 rounded-[2.5rem] text-center border-2 border-dashed ${theme.border} shadow-inner group-hover:border-solid transition-all`}>
          <span className={`text-5xl font-black italic tracking-tighter leading-none transition-all duration-500 ${theme.text}`}>{dynamicQty.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 font-black uppercase block mt-2 tracking-widest">{t.selectAmount}</span>
        </div>
        
        <div className="px-2">
          <input 
            type="range" 
            min={service.min} 
            max={service.max} 
            step={service.step} 
            value={dynamicQty} 
            onChange={(e) => setDynamicQty(parseInt(e.target.value))} 
            className={`w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-current ${theme.text}`} 
          />
        </div>

        {/* مربع السعر الملون */}
        <div className={`p-6 bg-slate-950 text-white rounded-[2.5rem] flex items-center justify-between shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 group-hover:scale-[1.05] transition-transform`}>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Elite Price</span>
            <span className={`text-3xl font-black italic tracking-tighter transition-colors ${theme.text}`}>{dynamicPrice}₪</span>
          </div>
          <div className="flex gap-2">
            <button onClick={(e) => { e.stopPropagation(); setDynamicQty(q => Math.max(service.min||0, q-(service.step||500))); }} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all border border-white/5 active:scale-90"><Minus size={18}/></button>
            <button onClick={(e) => { e.stopPropagation(); setDynamicQty(q => Math.min(service.max||Infinity, q+(service.step||500))); }} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all border border-white/5 active:scale-90"><Plus size={18}/></button>
          </div>
        </div>
      </div>

      {/* زر الإضافة للسلة الملون */}
      <button 
        onClick={handleAddToCart} 
        className={`relative z-10 w-full py-6 rounded-[2.8rem] font-black text-[13px] uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-4 active:scale-95 shadow-2xl ${
          isAdded 
            ? 'bg-emerald-500 text-white' 
            : `bg-slate-900 dark:bg-white text-white dark:text-slate-900 group-hover:bg-gradient-to-r group-hover:${theme.gradient} group-hover:text-white`
        }`}
      >
        {isAdded ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
        <span>{isAdded ? (lang === 'ar' ? 'تمت الإضافة!' : 'נוסף לסל!') : t.addToCartBtn}</span>
      </button>
      
      {/* تزيين لوني في أسفل الكرت */}
      <div className={`absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
    </div>
  );
};

export default ServiceCard;
