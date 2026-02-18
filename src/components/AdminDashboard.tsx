
import React, { useState, useEffect, useMemo } from 'react';
import { Testimonial, Order, StaffMember, StaffRequest, WithdrawalRequest, SiteSettings, Coupon } from '../types';
import { 
  X, Trash2, ShoppingBag, TrendingUp, Users, Wallet, 
  UserPlus, Landmark, Settings, BarChart, Database,
  ShieldCheck, Save, Smartphone, Edit3, Tag, Power, Plus, Mail, MessageSquare, Instagram, ExternalLink,
  UserCheck, Lock, Key, Copy, Check, Filter, Calendar, MapPin, Image as ImageIcon, Eye, CreditCard, 
  ChevronLeft, ChevronRight, AlertCircle, CheckCircle2, History, Send, Star
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  darkMode: boolean;
  onSettingsUpdate: (settings: SiteSettings) => void;
  currentSettings: SiteSettings;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, testimonials, setTestimonials, darkMode, onSettingsUpdate, currentSettings }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'orders' | 'coupons' | 'payouts' | 'workers' | 'requests' | 'reviews' | 'settings'>('stats');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showCreds, setShowCreds] = useState<{user: string, pass: string, coupon: string, name: string} | null>(null);
  const [orderFilter, setOrderFilter] = useState<'all' | 'Bit' | 'Paybox'>('all');
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  const [adminLang, setAdminLang] = useState<'he' | 'ar'>('he');
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [workers, setWorkers] = useState<StaffMember[]>([]);
  const [requests, setRequests] = useState<StaffRequest[]>([]);
  const [payouts, setPayouts] = useState<WithdrawalRequest[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(currentSettings);

  const [newCoupon, setNewCoupon] = useState({ code: '', discount: 10 });

  useEffect(() => {
    const load = (key: string) => {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
      } catch { return []; }
    };

    setOrders(load('huutix_orders'));
    setWorkers(load('huutix_staff_members'));
    setRequests(load('huutix_staff_requests'));
    setPayouts(load('huutix_payouts'));
    setCoupons(load('huutix_master_coupons'));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Hamdan5500') setIsAuthenticated(true);
    else alert(adminLang === 'he' ? 'סיסמה שגויה!' : 'الرمز السري غير صحيح!');
  };

  const handleApproveRequest = (req: StaffRequest) => {
    const user = req.name.toLowerCase().replace(/\s/g, '') + Math.floor(10 + Math.random() * 89);
    const pass = Math.random().toString(36).slice(-8);
    const coupon = req.name.toUpperCase().split(' ')[0] + Math.floor(100 + Math.random() * 899);
    
    const newWorker: StaffMember = {
      id: req.id,
      name: req.name,
      username: user,
      password: pass,
      phone: req.phone,
      city: req.city,
      couponCode: coupon,
      earnings: 0,
      salesCount: 0,
      joinedDate: new Date().toISOString()
    };
    
    const currentWorkers = JSON.parse(localStorage.getItem('huutix_staff_members') || '[]');
    const updatedWorkers = [...currentWorkers, newWorker];
    setWorkers(updatedWorkers);
    localStorage.setItem('huutix_staff_members', JSON.stringify(updatedWorkers));
    
    const updatedRequests = (requests || []).map(r => r.id === req.id ? {...r, status: 'approved'} : r);
    setRequests(updatedRequests as any);
    localStorage.setItem('huutix_staff_requests', JSON.stringify(updatedRequests));
    
    setShowCreds({ user, pass, coupon, name: req.name });
  };

  const handlePayoutStatus = (id: string, status: 'completed' | 'rejected') => {
    const updated = payouts.map(p => p.id === id ? { ...p, status } : p);
    setPayouts(updated);
    localStorage.setItem('huutix_payouts', JSON.stringify(updated));
  };

  const handleReviewStatus = (id: string, status: 'approved' | 'rejected') => {
    const updated = testimonials.map(t => t.id === id ? { ...t, status } : t);
    setTestimonials(updated);
  };

  const handleAddCoupon = () => {
    if (!newCoupon.code) return;
    const n: Coupon = { id: Date.now().toString(), code: newCoupon.code.toUpperCase(), discount: newCoupon.discount, isActive: true };
    const updated = [...coupons, n];
    setCoupons(updated);
    localStorage.setItem('huutix_master_coupons', JSON.stringify(updated));
    setNewCoupon({ code: '', discount: 10 });
  };

  const handleDeleteCoupon = (id: string) => {
    const updated = coupons.filter(c => c.id !== id);
    setCoupons(updated);
    localStorage.setItem('huutix_master_coupons', JSON.stringify(updated));
  };

  const handleSaveSettings = () => {
    onSettingsUpdate(siteSettings);
    alert(adminLang === 'he' ? 'ההגדרות נשמרו בהצלחה!' : 'تم حفظ الإعدادات بنجاح!');
  };

  const labels = {
    he: {
      stats: 'סטטיסטיקות',
      orders: 'הזמנות',
      coupons: 'קופונים',
      payouts: 'משיכות',
      workers: 'שותפים',
      requests: 'בקשות',
      reviews: 'ביקורות',
      settings: 'הגדרות',
      noData: 'אין נתונים להצגה',
      totalSales: 'סה"כ מכירות',
      completedOrders: 'הזמנות שבוצעו',
      activePartners: 'שותפים פעילים',
      pendingWithdrawals: 'משיכות ממתינות',
      receipt: 'צפה בקבלה',
      approve: 'אשר',
      reject: 'דחה',
      delete: 'מחק',
      save: 'שמור שינויים'
    },
    ar: {
      stats: 'الإحصائيات',
      orders: 'الطلبات',
      coupons: 'الكوبونات',
      payouts: 'السحوبات',
      workers: 'الشركاء',
      requests: 'طلبات التوظيف',
      reviews: 'المراجعات',
      settings: 'الإعدادات',
      noData: 'لا توجد بيانات',
      totalSales: 'إجمالي المبيعات',
      completedOrders: 'طلبات مكتملة',
      activePartners: 'شركاء نشطون',
      pendingWithdrawals: 'سحوبات معلقة',
      receipt: 'عرض الإيصال',
      approve: 'موافقة',
      reject: 'رفض',
      delete: 'حذف',
      save: 'حفظ الإعدادات'
    }
  }[adminLang];

  const filteredOrders = useMemo(() => {
    const safeOrders = Array.isArray(orders) ? orders : [];
    if (orderFilter === 'all') return safeOrders;
    return safeOrders.filter(o => o.method === orderFilter);
  }, [orders, orderFilter]);

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#020617] p-6">
        <div className="w-full max-w-sm p-12 bg-slate-900 rounded-[4rem] border border-white/5 text-center shadow-3xl">
          <ShieldCheck size={48} className="text-blue-500 mx-auto mb-10" />
          <h2 className="text-2xl font-black text-white mb-10 tracking-tighter uppercase italic">HQ Console</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input autoFocus type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="PIN" className="w-full p-6 bg-slate-800 rounded-2xl text-white outline-none border-2 border-transparent focus:border-blue-600 text-center tracking-[1em] font-black text-2xl" />
            <button type="submit" className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs">LOGIN</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col h-screen ${darkMode ? 'bg-[#020617] text-white' : 'bg-[#f8fafc] text-slate-900'}`} dir="rtl">
      
      {selectedReceipt && (
        <div className="fixed inset-0 z-[400] bg-slate-950/90 flex items-center justify-center p-4 backdrop-blur-md" onClick={() => setSelectedReceipt(null)}>
           <div className="relative max-w-3xl w-full bg-slate-900 rounded-[3rem] p-4 shadow-3xl" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedReceipt(null)} className="absolute -top-4 -right-4 p-4 bg-white text-slate-900 rounded-full shadow-2xl z-10 hover:bg-red-500 transition-all"><X size={24}/></button>
              <img src={selectedReceipt} alt="Receipt" className="w-full rounded-[2.5rem] shadow-2xl object-contain max-h-[85vh]" />
           </div>
        </div>
      )}

      {showCreds && (
        <div className="fixed inset-0 z-[300] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6">
           <div className="bg-white dark:bg-slate-900 w-full max-w-md p-10 rounded-[3rem] shadow-3xl text-center relative border border-blue-500/30 animate-in zoom-in">
              <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-8"><UserCheck size={40} /></div>
              <h3 className="text-2xl font-black mb-4 italic">{adminLang === 'he' ? 'שותף נוצר בהצלחה!' : 'تم إنشاء حساب الشريك!'}</h3>
              <div className="space-y-3 mb-10">
                 <div className="p-5 bg-slate-100 dark:bg-white/5 rounded-2xl text-right flex justify-between items-center group cursor-pointer" onClick={() => {navigator.clipboard.writeText(`User: ${showCreds.user}\nPass: ${showCreds.pass}\nCode: ${showCreds.coupon}`); alert('Copied!');}}>
                    <div className="text-right">
                       <span className="text-[10px] font-black text-slate-400 block mb-1 uppercase">LOGINS</span>
                       <span className="font-black text-blue-500 text-sm">@{showCreds.user} | {showCreds.pass}</span>
                    </div>
                    <Copy size={20} className="text-slate-400"/>
                 </div>
                 <div className="p-5 bg-slate-950 text-white rounded-2xl text-right flex justify-between items-center">
                    <div className="text-right">
                       <span className="text-[10px] font-black text-slate-400 block mb-1 uppercase">PROMO CODE</span>
                       <span className="font-black text-blue-400 text-lg uppercase tracking-widest">{showCreds.coupon}</span>
                    </div>
                    <Tag size={20} className="text-blue-400"/>
                 </div>
              </div>
              <button onClick={() => setShowCreds(null)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl">CLOSE</button>
           </div>
        </div>
      )}

      <header className="px-6 sm:px-8 py-5 border-b dark:border-white/5 flex items-center justify-between bg-white dark:bg-[#020617] z-20 shadow-lg shrink-0">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl"><Database size={24} /></div>
           <div className="text-right">
              <h1 className="text-lg font-black italic uppercase tracking-tight leading-none mb-1">Huutix HQ Panel</h1>
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">ACTIVE SESSION</span>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden sm:flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
              <button onClick={() => setAdminLang('he')} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase ${adminLang === 'he' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400'}`}>HE</button>
              <button onClick={() => setAdminLang('ar')} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase ${adminLang === 'ar' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400'}`}>AR</button>
           </div>
           <button onClick={onClose} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><X size={24}/></button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-20 sm:w-72 border-l dark:border-white/5 flex flex-col p-4 bg-slate-50 dark:bg-[#020617] overflow-y-auto no-scrollbar shrink-0 shadow-inner z-10">
          {[
            { id: 'stats', label: labels.stats, icon: <BarChart size={22} /> },
            { id: 'orders', label: labels.orders, icon: <ShoppingBag size={22} />, count: (orders || []).filter(o => o.status === 'new').length },
            { id: 'payouts', label: labels.payouts, icon: <Wallet size={22} />, count: (payouts || []).filter(p => p.status === 'pending').length },
            { id: 'coupons', label: labels.coupons, icon: <Tag size={22} /> },
            { id: 'workers', label: labels.workers, icon: <Users size={22} /> },
            { id: 'requests', label: labels.requests, icon: <UserPlus size={22} />, count: (requests || []).filter(r => r.status === 'pending').length },
            { id: 'reviews', label: labels.reviews, icon: <Star size={22} />, count: (testimonials || []).filter(t => t.status === 'pending').length },
            { id: 'settings', label: labels.settings, icon: <Settings size={22} /> },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`w-full flex items-center justify-center sm:justify-start gap-5 p-5 rounded-2xl transition-all mb-3 relative group ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-2xl scale-[1.02]' : 'hover:bg-blue-500/10 text-slate-400'}`}>
               <span className="shrink-0">{tab.icon}</span>
               <span className="hidden sm:block text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
               {tab.count && tab.count > 0 ? (
                 <span className="absolute sm:static top-2 right-2 bg-red-600 text-white w-5 h-5 sm:mr-auto rounded-full text-[9px] font-black flex items-center justify-center animate-pulse border-2 border-white dark:border-slate-900 shadow-md">
                   {tab.count}
                 </span>
               ) : null}
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-y-auto p-6 sm:p-12 no-scrollbar bg-grid relative text-right">
          
          {activeTab === 'stats' && (
            <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                   {[
                     { label: labels.totalSales, val: `${(orders || []).reduce((a,b)=>a+(b.price || 0),0).toLocaleString()}₪`, icon: <TrendingUp className="text-emerald-500" /> },
                     { label: labels.completedOrders, val: (orders || []).length, icon: <ShoppingBag className="text-blue-500" /> },
                     { label: labels.activePartners, val: (workers || []).length, icon: <Users className="text-purple-500" /> },
                     { label: labels.pendingWithdrawals, val: (payouts || []).filter(p=>p.status==='pending').length, icon: <Landmark className="text-orange-500" /> },
                   ].map((s, i) => (
                     <div key={i} className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border dark:border-white/5 shadow-xl flex flex-col items-center text-center group hover:scale-[1.05] transition-all overflow-hidden relative">
                        <div className="w-14 h-14 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">{s.icon}</div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{s.label}</p>
                        <p className="text-4xl font-black italic tracking-tighter leading-none dark:text-white">{s.val}</p>
                     </div>
                   ))}
                </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in">
                <h3 className="text-3xl font-black italic tracking-tight">{labels.reviews}</h3>
                <div className="grid grid-cols-1 gap-6">
                   {testimonials.map(rev => (
                     <div key={rev.id} className={`p-8 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border-2 flex flex-col md:flex-row items-center justify-between gap-8 transition-all ${rev.status === 'approved' ? 'border-emerald-500/20' : rev.status === 'pending' ? 'border-orange-500/30 animate-pulse' : 'border-red-500/20'}`}>
                        <div className="flex-1 text-right">
                           <div className="flex items-center gap-4 mb-4">
                              <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">{rev.name.charAt(0)}</div>
                              <div>
                                 <h4 className="font-black text-xl leading-none mb-1 dark:text-white">{rev.name}</h4>
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{rev.handle}</span>
                              </div>
                           </div>
                           <p className="text-sm font-bold text-slate-500 italic">"{rev.content}"</p>
                        </div>
                        <div className="flex gap-4">
                           {rev.status === 'pending' && (
                             <button onClick={() => handleReviewStatus(rev.id, 'approved')} className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg hover:scale-105 transition-all">{labels.approve}</button>
                           )}
                           <button onClick={() => {if(confirm('Delete?')){const n=testimonials.filter(x=>x.id!==rev.id); setTestimonials(n);}}} className="p-5 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={24}/></button>
                        </div>
                     </div>
                   ))}
                </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in">
               <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <h3 className="text-3xl font-black italic tracking-tight">{labels.orders}</h3>
                  <div className="flex gap-2 bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl">
                     {['all', 'Bit', 'Paybox'].map(m => (
                       <button key={m} onClick={() => setOrderFilter(m as any)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${orderFilter === m ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400'}`}>{m === 'all' ? 'הكل' : m}</button>
                     ))}
                  </div>
               </div>
               <div className="grid grid-cols-1 gap-6">
                  {filteredOrders.map(order => (
                    <div key={order.id} className="p-8 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-transparent shadow-xl hover:border-blue-600/30 transition-all flex flex-col md:flex-row items-center gap-8 group relative overflow-hidden">
                       {order.status === 'new' && <div className="absolute top-0 right-0 w-32 h-1.5 bg-blue-600"></div>}
                       <div className="flex-1 text-right">
                          <div className="flex items-center gap-4 mb-4">
                             <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${order.method === 'Bit' ? 'bg-[#00E5E5]' : 'bg-[#00AEEF]'}`}><ImageIcon size={20}/></div>
                             <div>
                                <h4 className="font-black text-xl leading-none mb-1 dark:text-white">{order.packageName}</h4>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(order.date).toLocaleString()}</span>
                             </div>
                          </div>
                          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                             <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><Smartphone size={14} className="text-blue-500"/> {order.phone}</div>
                             <div className="flex items-center gap-2 text-xs font-bold text-slate-500 truncate max-w-[200px]"><ExternalLink size={14} className="text-blue-500"/> {order.link}</div>
                             <div className="flex items-center gap-2 text-xs font-black text-emerald-500"><Landmark size={14}/> {order.price}₪</div>
                             <div className="flex items-center gap-2 text-xs font-black text-blue-500"><CreditCard size={14}/> {order.method}</div>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          {order.receiptImage && (
                            <button onClick={() => setSelectedReceipt(order.receiptImage as string)} className="flex flex-col items-center gap-2">
                               <div className="w-16 h-16 bg-slate-100 dark:bg-white/10 rounded-2xl overflow-hidden border-2 border-dashed border-blue-500/50 flex items-center justify-center relative hover:scale-105 transition-transform">
                                  <img src={order.receiptImage as string} className="w-full h-full object-cover blur-[1px]" />
                                  <div className="absolute inset-0 flex items-center justify-center bg-blue-600/20"><Eye size={18} className="text-white" /></div>
                               </div>
                               <span className="text-[9px] font-black text-blue-500 uppercase">{labels.receipt}</span>
                            </button>
                          )}
                          <button onClick={() => {if(confirm('Delete?')){setOrders(prev => {const n=prev.filter(x=>x.id!==order.id); localStorage.setItem('huutix_orders', JSON.stringify(n)); return n;})}}} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={22}/></button>
                       </div>
                    </div>
                  ))}
                  {filteredOrders.length === 0 && <div className="text-center py-20 opacity-30 font-black uppercase text-xl">{labels.noData}</div>}
               </div>
            </div>
          )}

          {activeTab === 'payouts' && (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in">
               <h3 className="text-3xl font-black italic tracking-tight">{labels.payouts}</h3>
               <div className="grid grid-cols-1 gap-6">
                  {payouts.map(p => (
                    <div key={p.id} className="p-8 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border-2 border-transparent hover:border-orange-500/20 transition-all flex items-center justify-between">
                       <div className="flex items-center gap-6">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${p.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : p.status === 'pending' ? 'bg-orange-500/10 text-orange-500 animate-pulse' : 'bg-red-500/10 text-red-500'}`}>
                             {p.status === 'completed' ? <CheckCircle2 size={32}/> : p.status === 'pending' ? <History size={32}/> : <X size={32}/>}
                          </div>
                          <div className="text-right">
                             <h4 className="text-4xl font-black italic tracking-tighter mb-1 dark:text-white">{p.amount}₪</h4>
                             <span className="text-[10px] font-black text-slate-400 uppercase">Worker ID: {p.workerId}</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          {p.status === 'pending' && (
                            <>
                               <button onClick={() => handlePayoutStatus(p.id, 'completed')} className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase hover:bg-emerald-700 shadow-lg">{labels.approve}</button>
                               <button onClick={() => handlePayoutStatus(p.id, 'rejected')} className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase hover:bg-red-700 shadow-lg">{labels.reject}</button>
                            </>
                          )}
                          <button onClick={() => {if(confirm('Delete?')){const n=payouts.filter(x=>x.id!==p.id); setPayouts(n); localStorage.setItem('huutix_payouts', JSON.stringify(n))}}} className="p-4 text-slate-300 hover:text-red-500"><Trash2 size={20}/></button>
                       </div>
                    </div>
                  ))}
                  {payouts.length === 0 && <div className="text-center py-20 opacity-30 font-black uppercase text-xl">{labels.noData}</div>}
               </div>
            </div>
          )}

          {activeTab === 'coupons' && (
            <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in">
               <h3 className="text-3xl font-black italic tracking-tight">{labels.coupons}</h3>
               <div className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border dark:border-white/5 shadow-2xl flex flex-col sm:flex-row items-end gap-6">
                  <div className="flex-1 space-y-4 w-full">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mr-2">CODE</label>
                     <input type="text" value={newCoupon.code} onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})} placeholder="GOLD50" className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-white/5 outline-none font-black text-center text-blue-600 tracking-widest" />
                  </div>
                  <div className="w-full sm:w-32 space-y-4">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mr-2">%</label>
                     <input type="number" value={newCoupon.discount} onChange={e => setNewCoupon({...newCoupon, discount: parseInt(e.target.value)})} className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-white/5 outline-none font-black text-center" />
                  </div>
                  <button onClick={handleAddCoupon} className="w-full sm:w-auto h-16 px-12 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-700 transition-all">ADD</button>
               </div>

               <div className="grid grid-cols-1 gap-4">
                  {coupons.map(c => (
                    <div key={c.id} className="p-8 bg-slate-900 text-white rounded-[2.5rem] flex items-center justify-between shadow-xl">
                       <div className="flex items-center gap-8">
                          <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center font-black italic">%{c.discount}</div>
                          <span className="text-2xl font-black tracking-widest uppercase italic text-blue-400">{c.code}</span>
                       </div>
                       <button onClick={() => handleDeleteCoupon(c.id!)} className="p-4 bg-white/5 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={22}/></button>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'workers' && (
            <div className="max-w-6xl mx-auto animate-in fade-in">
                <div className="flex items-center justify-between mb-12">
                   <h3 className="text-3xl font-black italic tracking-tight">{labels.workers}</h3>
                   <div className="bg-blue-500/10 px-6 py-3 rounded-2xl border border-blue-500/20">
                      <span className="text-sm font-black text-blue-600">{(workers || []).length} {adminLang === 'he' ? 'שותפים פעילים' : 'شريك نشط'}</span>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {(workers || []).map(w => (
                     <div key={w.id} className="p-10 bg-white dark:bg-slate-900 rounded-[3.5rem] border-2 border-transparent shadow-xl group hover:border-blue-600 transition-all relative overflow-hidden">
                        <div className="flex items-center justify-between mb-10">
                           <div className="flex items-center gap-5">
                              <div className="w-16 h-16 bg-blue-600 text-white rounded-3xl flex items-center justify-center font-black text-2xl shadow-xl uppercase">{w.name.charAt(0)}</div>
                              <div className="text-right">
                                 <h4 className="font-black text-xl leading-none mb-2 dark:text-white">{w.name}</h4>
                                 <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest">@{w.username}</span>
                              </div>
                           </div>
                           <button onClick={()=>{if(confirm('Delete Partner?')){const n=workers.filter(x=>x.id!==w.id); setWorkers(n); localStorage.setItem('huutix_staff_members', JSON.stringify(n))}}} className="p-4 bg-red-500/5 text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"><Trash2 size={22}/></button>
                        </div>
                        <div className="grid grid-cols-2 gap-5 mb-8">
                           <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] text-center border dark:border-white/5">
                              <span className="text-[10px] font-black text-slate-400 uppercase block mb-2">{adminLang === 'he' ? 'עמלה' : 'العمولة'}</span>
                              <span className="text-3xl font-black italic text-emerald-500">{w.earnings || 0}₪</span>
                           </div>
                           <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] text-center border dark:border-white/5">
                              <span className="text-[10px] font-black text-slate-400 uppercase block mb-2">{adminLang === 'he' ? 'מכירות' : 'المبيعات'}</span>
                              <span className="text-3xl font-black italic text-blue-600">{w.salesCount || 0}</span>
                           </div>
                        </div>
                        <div className="p-5 bg-slate-950 text-white rounded-[2rem] flex items-center justify-between">
                           <div className="text-right">
                              <span className="text-[9px] font-black uppercase opacity-50 tracking-widest mb-1">Code</span>
                              <span className="text-lg font-black italic text-blue-400 uppercase tracking-widest block">{w.couponCode}</span>
                           </div>
                           <Tag size={20} className="text-blue-400"/>
                        </div>
                     </div>
                   ))}
                </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="max-w-6xl mx-auto animate-in fade-in space-y-8">
                <h3 className="text-3xl font-black italic tracking-tight">{labels.requests}</h3>
                <div className="grid grid-cols-1 gap-6">
                   {requests.filter(r => r.status === 'pending').map(req => (
                     <div key={req.id} className="p-8 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border-r-8 border-blue-600">
                        <div className="flex-1 text-right space-y-2">
                           <h4 className="text-2xl font-black dark:text-white italic">{req.name} <span className="text-sm font-bold text-slate-400">({req.age})</span></h4>
                           <div className="flex gap-8">
                              <span className="text-xs font-bold text-slate-500 flex items-center gap-2"><Smartphone size={14}/> {req.phone}</span>
                              <span className="text-xs font-bold text-slate-500 flex items-center gap-2"><MapPin size={14}/> {req.city}</span>
                              <span className="text-xs font-bold text-slate-500 flex items-center gap-2"><Mail size={14}/> {req.email}</span>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <button onClick={() => handleApproveRequest(req)} className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 shadow-xl transition-all">{labels.approve}</button>
                           <button onClick={() => {const n=requests.filter(x=>x.id!==req.id); setRequests(n); localStorage.setItem('huutix_staff_requests', JSON.stringify(n))}} className="p-5 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={24}/></button>
                        </div>
                     </div>
                   ))}
                   {requests.filter(r => r.status === 'pending').length === 0 && <div className="text-center py-20 opacity-30 font-black uppercase text-xl">{labels.noData}</div>}
                </div>
            </div>
          )}

          {activeTab === 'settings' && (
             <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in">
                <h3 className="text-3xl font-black italic tracking-tight">{labels.settings}</h3>
                <div className="p-10 bg-white dark:bg-slate-900 rounded-[4rem] border dark:border-white/5 shadow-2xl space-y-8">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mr-2">WHATSAPP (SUPPORT)</label>
                      <input type="text" value={siteSettings.whatsapp} onChange={e=>setSiteSettings({...siteSettings, whatsapp: e.target.value})} className="w-full p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border dark:border-white/10 outline-none font-bold text-center" dir="ltr" />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mr-2">PAYMENT PHONE (BIT/PAYBOX)</label>
                      <input type="text" value={siteSettings.paymentPhone} onChange={e=>setSiteSettings({...siteSettings, paymentPhone: e.target.value})} className="w-full p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border dark:border-white/10 outline-none font-bold text-center" dir="ltr" />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mr-2">TELEGRAM HANDLE</label>
                      <input type="text" value={siteSettings.telegram} onChange={e=>setSiteSettings({...siteSettings, telegram: e.target.value})} placeholder="@username" className="w-full p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border dark:border-white/10 outline-none font-bold text-center" dir="ltr" />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mr-2">OFFICIAL EMAIL</label>
                      <input type="text" value={siteSettings.gmail} onChange={e=>setSiteSettings({...siteSettings, gmail: e.target.value})} className="w-full p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border dark:border-white/10 outline-none font-bold text-center" dir="ltr" />
                   </div>
                   <button onClick={handleSaveSettings} className="w-full py-6 bg-blue-600 text-white rounded-[2.5rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-4 hover:bg-emerald-600 transition-all shadow-xl"><Save size={20}/> {labels.save}</button>
                </div>
             </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
