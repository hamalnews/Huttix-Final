
import React, { useState, useMemo } from 'react';
import { Testimonial, Language, Translation } from '../types';
import { Star, Quote, Send, CheckCircle, Plus, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { TestimonialSkeleton } from './Skeleton';

interface TestimonialsProps {
  testimonials: Testimonial[];
  onAddReview: (review: Partial<Testimonial>) => void;
  lang: Language;
  t: Translation;
  darkMode: boolean;
  isLoading?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials = [], onAddReview, lang, t, darkMode, isLoading }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', handle: '', content: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const isRtl = lang === 'he' || lang === 'ar';
  
  const approvedReviews = useMemo(() => (testimonials || []).filter(t => t.status === 'approved'), [testimonials]);
  
  const INITIAL_COUNT = 6;
  const visibleReviews = isExpanded ? approvedReviews : (approvedReviews || []).slice(0, INITIAL_COUNT);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReview({
      ...newReview,
      handle: newReview.handle.startsWith('@') ? newReview.handle : `@${newReview.handle}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    });
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setIsFormOpen(false); setNewReview({ name: '', handle: '', content: '', rating: 5 }); }, 4000);
  };

  return (
    <section id="reviews" className="py-24 px-4 bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        
        {/* هيدر ممركز احترافي مطلي بالأناقة */}
        <div className="text-center mb-20 relative">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/10 text-emerald-600 text-[11px] font-black uppercase tracking-[0.25em] mb-8 shadow-sm">
            <Sparkles size={16} className="animate-pulse" />
            {t.testimonialsBadge}
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 dark:text-white tracking-tighter leading-tight">
            {t.trustTitle}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto mb-10">
            {lang === 'ar' ? 'انضم لآلاف العملاء الذين حققوا الشهرة العالمية بفضل خدماتنا الموثوقة.' : 'הצטרפו לאלפי לקוחות שכבר הגיעו לפסגה עם השירותים שלנו.'}
          </p>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 mx-auto"
          >
            <Plus size={20} />
            {lang === 'ar' ? 'أضف رأيك الآن' : 'הוסף ביקורת'}
          </button>
        </div>

        {/* صندوق التقييمات الاحترافي (Professional Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading 
            ? [...Array(6)].map((_, i) => <TestimonialSkeleton key={i} />)
            : (visibleReviews || []).map((rev) => (
              <div 
                key={rev.id} 
                className={`p-10 rounded-[4rem] border transition-all duration-500 animate-in zoom-in-95 group ${isRtl ? 'text-right' : 'text-left'} ${
                  darkMode ? 'bg-slate-900/50 border-white/5 hover:border-blue-500/30' : 'bg-white border-slate-100 shadow-xl hover:shadow-2xl'
                } hover:-translate-y-2`}
              >
                <div className={`flex items-start justify-between mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-xl group-hover:rotate-6 transition-transform">
                      {rev.name.charAt(0)}
                    </div>
                    <div className={isRtl ? 'text-right' : 'text-left'}>
                      <h4 className="text-lg font-black dark:text-white leading-none mb-2">{rev.name}</h4>
                      <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">{rev.handle}</p>
                    </div>
                  </div>
                  <div className={`flex gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={`${i < rev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                    ))}
                  </div>
                </div>
                
                <div className="relative min-h-[100px]">
                  <Quote size={40} className={`absolute -top-4 opacity-5 text-blue-600 ${isRtl ? '-right-4' : '-left-4'}`} />
                  <p className="text-sm font-bold leading-relaxed text-slate-600 dark:text-slate-400 italic">
                    {rev.content}
                  </p>
                </div>
                
                <div className={`mt-8 pt-8 border-t border-slate-50 dark:border-white/5 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{rev.date}</span>
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-tighter shadow-sm">
                    <CheckCircle size={12} /> VERIFIED BUYER
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {approvedReviews.length > INITIAL_COUNT && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="group inline-flex items-center gap-4 px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.25em] hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-2xl active:scale-95"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                  {lang === 'ar' ? 'طي المراجعات' : 'הצג פחות'}
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  {lang === 'ar' ? `استعراض كافة المراجعات (${approvedReviews.length})` : `הצג את כל הביקורות (${approvedReviews.length})`}
                </>
              )}
            </button>
          </div>
        )}

        {isFormOpen && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
            <div className={`w-full max-w-xl rounded-[4rem] p-12 shadow-3xl animate-in zoom-in duration-300 relative border dark:border-white/5 ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
              <button onClick={() => setIsFormOpen(false)} className={`absolute top-10 ${isRtl ? 'left-10' : 'right-10'} text-slate-400 hover:text-red-500 transition-colors`}><Plus size={32} className="rotate-45" /></button>
              <div className={`mb-12 ${isRtl ? 'text-right' : 'text-left'}`}>
                <h3 className="text-4xl font-black mb-2 tracking-tighter">{lang === 'ar' ? 'اترك بصمتك' : 'שתפו את החוויה'}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ساعد الآخرين في اتخاذ القرار</p>
              </div>
              {submitted ? (
                <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in">
                   <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl animate-bounce"><CheckCircle size={48} /></div>
                   <h4 className="text-2xl font-black">{lang === 'ar' ? 'تم استلام رأيك بنجاح!' : 'הביקורת התקבלה בהצלחה!'}</h4>
                   <p className="text-sm font-bold text-slate-500">سيتم عرضه بعد المراجعة السريعة.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className={`grid grid-cols-2 gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <input required type="text" placeholder="Full Name" value={newReview.name} onChange={e => setNewReview({...newReview, name: e.target.value})} className={`w-full p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 outline-none font-black text-sm ${isRtl ? 'text-right' : ''}`} />
                    <input required type="text" placeholder="@instagram_user" value={newReview.handle} onChange={e => setNewReview({...newReview, handle: e.target.value})} className={`w-full p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 outline-none font-black text-sm ${isRtl ? 'text-right' : ''}`} />
                  </div>
                  <textarea required rows={4} placeholder="What did you think of the service?" value={newReview.content} onChange={e => setNewReview({...newReview, content: e.target.value})} className={`w-full p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 outline-none font-black text-sm ${isRtl ? 'text-right' : ''}`} />
                  <div className={`flex items-center justify-between gap-6 pt-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map(star => (
                        <button key={star} type="button" onClick={() => setNewReview({...newReview, rating: star})} className={`transition-all hover:scale-110 ${star <= newReview.rating ? 'text-yellow-400' : 'text-slate-200'}`}><Star size={28} className={star <= newReview.rating ? 'fill-yellow-400' : ''} /></button>
                      ))}
                    </div>
                    <button type="submit" className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl flex items-center gap-3 active:scale-95"><Send size={20} /> {lang === 'ar' ? 'إرسال' : 'שליחה'}</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
