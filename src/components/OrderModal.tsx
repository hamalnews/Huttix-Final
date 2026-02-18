
import React, { useState, useRef, useMemo } from 'react';
import { 
  X, CheckCircle2, Paperclip, Send, Copy, Check, Tag, ChevronLeft, ChevronRight, Link2, Smartphone, Gift, Wallet2, CreditCard
} from 'lucide-react';
import { Language, ServicePrice, SiteSettings, Coupon, Order } from '../types';
import { TRANSLATIONS } from '../constants';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: any;
  package?: ServicePrice;
  lang: Language;
  settings: SiteSettings;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, package: pkg, lang, settings }) => {
  const [step, setStep] = useState(1);
  const [instaLink, setInstaLink] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [receiptBase64, setReceiptBase64] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<'Bit' | 'Paybox' | null>(null);
  const [copied, setCopied] = useState(false);
  
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'he' || lang === 'ar';

  const finalPrice = useMemo(() => {
    const base = pkg?.price || 0;
    if (discountPercent > 0) {
      return Math.round(base * (1 - discountPercent / 100));
    }
    return base;
  }, [pkg, discountPercent]);

  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    const workers = JSON.parse(localStorage.getItem('huutix_staff_members') || '[]');
    const workerMatch = workers.find((w: any) => w.couponCode.toUpperCase() === code);
    if (workerMatch) { setDiscountPercent(15); setIsCouponApplied(true); return; }

    const masterCoupons = JSON.parse(localStorage.getItem('huutix_master_coupons') || '[]');
    const masterMatch = masterCoupons.find((c: Coupon) => c.code.toUpperCase() === code);
    if (masterMatch) { setDiscountPercent(masterMatch.discount); setIsCouponApplied(true); return; }

    const flashCodes = JSON.parse(localStorage.getItem('huutix_dynamic_codes') || '[]');
    const flashMatch = flashCodes.find((c: any) => c.code.toUpperCase() === code);
    if (flashMatch) { setDiscountPercent(flashMatch.discount); setIsCouponApplied(true); return; }

    setCouponError(t.invalidCoupon);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setReceiptBase64(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // توليد رسالة واتساب ذكية مترجمة حسب اللغة المختارة
  const generateWhatsAppMessage = () => {
    const serviceName = pkg?.labelAr || pkg?.labelEn || 'Elite Package';
    const discountText = isCouponApplied ? `(${lang === 'ar' ? 'خصم' : lang === 'he' ? 'הנחה' : 'Discount'} ${discountPercent}%)` : '';
    
    const messages = {
      ar: `*طلب جديد - Huutix Elite*\n--------------------------\n📦 الخدمة: ${serviceName}\n💰 المبلغ: ${finalPrice}₪ ${discountText}\n🔗 الرابط: ${instaLink}\n📱 واتساب: ${phone}\n🏦 الوسيلة: ${selectedPayment}\n--------------------------\nلقد قمت بتحويل المبلغ وإرفاق الإيصال في الموقع. يرجى تأكيد الطلب.`,
      he: `*הזמנה חדשה - Huutix Elite*\n--------------------------\n📦 שירות: ${pkg?.labelHe || pkg?.labelEn}\n💰 סכום: ${finalPrice}₪ ${discountText}\n🔗 לינק: ${instaLink}\n📱 וואטסאפ: ${phone}\n🏦 אמצעי תשלום: ${selectedPayment}\n--------------------------\nביצעתי את ההעברה וצירפתי קבלה באתר. נא לאשר את ההזמנה.`,
      en: `*New Order - Huutix Elite*\n--------------------------\n📦 Service: ${pkg?.labelEn}\n💰 Amount: ${finalPrice}₪ ${discountText}\n🔗 Link: ${instaLink}\n📱 WhatsApp: ${phone}\n🏦 Method: ${selectedPayment}\n--------------------------\nI have transferred the amount and attached the receipt on the site. Please confirm the order.`,
      ru: `*Новый заказ - Huutix Elite*\n--------------------------\n📦 Услуга: ${pkg?.labelRu || pkg?.labelEn}\n💰 Сумма: ${finalPrice}₪\n🔗 Ссылка: ${instaLink}\n📱 WhatsApp: ${phone}\n--------------------------\nЯ перевел сумму и прикрепил чек. Пожалуйста, подтвердите заказ.`
    };

    return messages[lang as keyof typeof messages] || messages.en;
  };

  const handleOrderSubmit = () => {
    const newOrder: any = {
      id: Math.random().toString(36).substr(2, 9),
      serviceId: pkg?.labelEn || 'Elite Order',
      packageName: pkg?.labelAr || pkg?.labelEn || 'Custom Package',
      price: finalPrice,
      link: instaLink,
      phone: phone,
      method: selectedPayment || 'Bit',
      receiptImage: receiptBase64,
      date: new Date().toISOString(),
      status: 'new'
    };
    const existingOrders = JSON.parse(localStorage.getItem('huutix_orders') || '[]');
    localStorage.setItem('huutix_orders', JSON.stringify([newOrder, ...existingOrders]));

    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl p-4 overflow-y-auto no-scrollbar">
      <div className="bg-white dark:bg-[#020617] w-full max-w-xl my-auto rounded-[3.5rem] flex flex-col overflow-hidden animate-in zoom-in duration-500 shadow-3xl border dark:border-white/5">
        
        <div className="px-10 py-6 border-b dark:border-white/5 bg-slate-50 dark:bg-white/5 relative">
          <div className="absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-500" style={{ width: `${(step/3)*100}%` }}></div>
          <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
             <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
               <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">{step}/3</span>
               <h2 className="text-sm font-black uppercase tracking-widest">{lang === 'ar' ? 'تأكيد الطلب والدفع' : 'Order Verification'}</h2>
             </div>
             <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-red-500 transition-colors"><X size={20} /></button>
          </div>
        </div>
        
        <div className="p-10 space-y-8">
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-10">
                <div className="bg-slate-950 p-8 rounded-[2.5rem] text-white relative overflow-hidden group border border-white/5 shadow-2xl">
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform"><Gift size={64}/></div>
                   <p className="text-[10px] font-black uppercase text-blue-400 mb-2 tracking-widest text-center">{pkg?.labelAr || pkg?.labelEn}</p>
                   <div className="flex flex-col items-center justify-center gap-1">
                      {isCouponApplied && <span className="text-lg text-slate-500 line-through font-bold">{pkg?.price}₪</span>}
                      <div className="text-6xl font-black italic text-center tracking-tighter">{finalPrice}₪</div>
                   </div>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <Link2 className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-5' : 'left-5'} text-slate-400 group-focus-within:text-blue-500 transition-colors`} size={18} />
                    <input type="text" value={instaLink} onChange={e => setInstaLink(e.target.value)} placeholder={t.profileLinkInput} className={`w-full p-5 ${isRtl ? 'pr-14 text-right' : 'pl-14'} bg-slate-50 dark:bg-white/5 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-bold transition-all shadow-inner`} />
                  </div>
                  <div className="relative group">
                    <Smartphone className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-5' : 'left-5'} text-slate-400 group-focus-within:text-blue-500 transition-colors`} size={18} />
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.phoneInput} className={`w-full p-5 ${isRtl ? 'pr-14 text-right' : 'pl-14'} bg-slate-50 dark:bg-white/5 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-bold transition-all shadow-inner`} />
                  </div>

                  <div className="flex gap-3">
                    <div className="relative flex-1 group">
                       <Tag className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-5' : 'left-5'} text-slate-400 group-focus-within:text-blue-500 transition-colors`} size={18} />
                       <input 
                        type="text" 
                        value={couponCode} 
                        onChange={e => {setCouponCode(e.target.value); setCouponError('');}} 
                        disabled={isCouponApplied}
                        placeholder={t.couponLabel} 
                        className={`w-full p-5 ${isRtl ? 'pr-14 text-right' : 'pl-14'} bg-slate-50 dark:bg-white/5 rounded-2xl outline-none border-2 ${isCouponApplied ? 'border-emerald-500 bg-emerald-500/5' : 'border-transparent focus:border-blue-600'} font-black uppercase tracking-widest text-xs transition-all shadow-inner`} 
                       />
                       {isCouponApplied && <CheckCircle2 className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'left-5' : 'right-5'} text-emerald-500 animate-in zoom-in`} size={18} />}
                    </div>
                    {!isCouponApplied ? (
                      <button onClick={handleApplyCoupon} className="px-6 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg">
                        {t.applyBtn}
                      </button>
                    ) : (
                      <button onClick={() => {setIsCouponApplied(false); setDiscountPercent(0); setCouponCode('');}} className="px-6 bg-red-500/10 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95">
                        {lang === 'ar' ? 'إزالة' : 'הסרה'}
                      </button>
                    )}
                  </div>
                  {couponError && <p className={`text-[10px] font-black text-red-500 px-2 animate-pulse ${isRtl ? 'text-right' : ''}`}>{couponError}</p>}
                </div>

                <button disabled={!instaLink || !phone} onClick={() => setStep(2)} className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest disabled:opacity-30 flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] active:scale-95 transition-all">
                   {lang === 'ar' ? 'اختيار وسيلة الدفع' : 'המשך לבחירת תשלום'} <ChevronRight size={18} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-10">
                <div className="text-center">
                   <h3 className="text-xl font-black mb-2 dark:text-white">{lang === 'ar' ? 'اختر وسيلة الدفع المفضلة' : 'בחר אמצעי תשלום'}</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تأمين بنسبة 100%</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <button 
                    onClick={() => setSelectedPayment('Bit')} 
                    className={`relative p-8 rounded-[3rem] border-4 transition-all flex flex-col items-center gap-4 group overflow-hidden ${selectedPayment === 'Bit' ? 'border-[#00E5E5] bg-[#00E5E5]/5 shadow-2xl scale-[1.02]' : 'border-slate-100 dark:border-white/5 hover:border-slate-200 bg-white dark:bg-white/5'}`}
                  >
                    {selectedPayment === 'Bit' && <div className="absolute top-4 right-4 text-[#00E5E5] animate-in zoom-in"><CheckCircle2 size={24} fill="currentColor" className="text-white dark:text-slate-900" /></div>}
                    <div className="w-24 h-24 bg-gradient-to-br from-[#00E5E5] to-[#00C2C2] text-white rounded-[2rem] flex flex-col items-center justify-center shadow-xl transition-transform group-hover:scale-110">
                       <span className="text-3xl font-black italic tracking-tighter">BIT</span>
                    </div>
                    <div className="text-center">
                       <span className={`text-sm font-black uppercase tracking-widest block ${selectedPayment === 'Bit' ? 'text-[#00A0A0]' : 'text-slate-400'}`}>Bit Payment</span>
                       <span className="text-[9px] font-bold text-slate-400 block mt-1">אפליקציית ביט</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => setSelectedPayment('Paybox')} 
                    className={`relative p-8 rounded-[3rem] border-4 transition-all flex flex-col items-center gap-4 group overflow-hidden ${selectedPayment === 'Paybox' ? 'border-[#00AEEF] bg-[#00AEEF]/5 shadow-2xl scale-[1.02]' : 'border-slate-100 dark:border-white/5 hover:border-slate-200 bg-white dark:bg-white/5'}`}
                  >
                    {selectedPayment === 'Paybox' && <div className="absolute top-4 right-4 text-[#00AEEF] animate-in zoom-in"><CheckCircle2 size={24} fill="currentColor" className="text-white dark:text-slate-900" /></div>}
                    <div className="w-24 h-24 bg-gradient-to-br from-[#00AEEF] to-[#0088CC] text-white rounded-[2rem] flex flex-col items-center justify-center shadow-xl transition-transform group-hover:scale-110">
                       <span className="text-3xl font-black italic tracking-tighter">PB</span>
                    </div>
                    <div className="text-center">
                       <span className={`text-sm font-black uppercase tracking-widest block ${selectedPayment === 'Paybox' ? 'text-[#0088CC]' : 'text-slate-400'}`}>Paybox Payment</span>
                       <span className="text-[9px] font-bold text-slate-400 block mt-1">אפליקציית פייבוקס</span>
                    </div>
                  </button>
                </div>
                
                {selectedPayment && (
                  <div className="p-8 bg-slate-950 text-white rounded-[3rem] text-center border-2 border-dashed border-white/20 animate-in slide-in-from-bottom-5">
                     <p className="text-[10px] font-black text-slate-400 uppercase mb-3 tracking-[0.3em] flex items-center justify-center gap-2">
                        <Wallet2 size={12}/> {lang === 'ar' ? 'رقم التحويل للمنصة' : 'מספר להעברה'}
                     </p>
                     <h4 className="text-4xl font-black italic mb-8 tracking-tighter text-blue-400">{settings.paymentPhone}</h4>
                     <button onClick={() => {navigator.clipboard.writeText(settings.paymentPhone); setCopied(true); setTimeout(()=>setCopied(false),2000)}} className={`w-full py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 ${copied ? 'bg-emerald-500 text-white' : 'bg-white text-slate-900 hover:bg-blue-600 hover:text-white'}`}>
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? (lang === 'ar' ? 'تم النسخ' : 'הועתק בהצלחה') : (lang === 'ar' ? 'نسخ الرقم الآن' : 'העתק מספר')}
                     </button>
                  </div>
                )}

                <div className="flex gap-4">
                   <button onClick={() => setStep(1)} className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center text-slate-400 active:scale-90 transition-all hover:bg-slate-200 dark:hover:bg-white/10"><ChevronLeft size={28}/></button>
                   <button disabled={!selectedPayment} onClick={() => setStep(3)} className="flex-1 py-6 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest disabled:opacity-30 shadow-2xl active:scale-95 transition-all text-xs">
                      {lang === 'ar' ? 'المتابعة لإرفاق الإيصال' : 'המשך לצירוף קבלה'}
                   </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-10">
                <div 
                  onClick={() => fileInputRef.current?.click()} 
                  className={`border-4 border-dashed rounded-[3.5rem] p-16 flex flex-col items-center gap-6 cursor-pointer transition-all hover:scale-[1.02] active:scale-95 group ${selectedFile ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-200 dark:border-white/10 bg-slate-50/50 hover:border-blue-500/50 shadow-inner'}`}
                >
                  <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all group-hover:rotate-6 ${selectedFile ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white'}`}>
                    {selectedFile ? <CheckCircle2 size={40}/> : <Paperclip size={40} />}
                  </div>
                  <div className="text-center">
                     <p className="text-sm font-black uppercase tracking-widest mb-2 dark:text-white">
                        {selectedFile ? selectedFile.name : (lang === 'ar' ? 'إرفاق إيصال الدفع' : 'צרף אישור העברה')}
                     </p>
                     <p className="text-[10px] text-slate-400 font-bold max-w-[200px]">
                        {lang === 'ar' ? 'يجب إرفاق لقطة شاشة من تطبيق التحويل للتحقق من طلبك فورا' : 'חובה לצרף צילום מסך של אישור ההעברה'}
                     </p>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                </div>

                <div className="flex gap-4">
                   <button onClick={() => setStep(2)} className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center text-slate-400 active:scale-90 transition-all hover:bg-slate-200 dark:hover:bg-white/10"><ChevronLeft size={28}/></button>
                   <button disabled={!selectedFile} onClick={handleOrderSubmit} className="flex-1 py-6 bg-emerald-600 text-white rounded-[2rem] font-black uppercase tracking-widest disabled:opacity-30 shadow-2xl flex items-center justify-center gap-4 active:scale-95 transition-all text-xs">
                      <Send size={24} /> {t.completeOrderBtn}
                   </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
