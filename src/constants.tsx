
import React from 'react';
import { UserPlus, Heart, Star, TrendingUp, MessageSquare, Play, CircleHelp, BarChart } from 'lucide-react';
import { ServiceData, Language, Translation, Testimonial, FAQItem } from './types';

export const DEFAULT_WHATSAPP = '972522426476';
export const DEFAULT_PAYMENT_PHONE = '0546980606';
export const DEFAULT_GMAIL = 'huutix_isr_official@gmail.com';
export const DEFAULT_INSTAGRAM = 'https://www.instagram.com/huutix.official?igsh=MTYxYWgzcWJjMXZwbA==';
export const DEFAULT_TELEGRAM = 'Huutix';

export const getIconById = (id: string, className?: string) => {
  const icons: Record<string, React.ReactNode> = {
    followers: <UserPlus className={className} />,
    likes: <Heart className={className} />,
    views: <Play className={className} />,
    comments: <MessageSquare className={className} />,
    bundles: <TrendingUp className={className} />,
    stats: <BarChart className={className} />,
    faq: <CircleHelp className={className} />,
  };
  return icons[id] || <Star className={className} />;
};

export const FAQ_DATA: FAQItem[] = [
  { id: 'f1', question: { ar: 'هل المتابعون حقيقيون؟', he: 'האם העוקבים אמיתיים?', en: 'Are they real?', ru: 'Они настоящие?' }, answer: { ar: 'نعم، نوفر متابعين VIP من حسابات نشطة لضمان المصداقية والنمو المستمر.', he: 'כן, אנו מספקים עוקבי VIP מחשבונות פעילים לאמינות וצמיחה.', en: 'Yes, we provide VIP followers.', ru: 'Да, качественные акка운ты.' } },
  { id: 'f2', question: { ar: 'متى يبدأ تنفيذ الطلب؟', he: 'מתי מתחילה האספקה?', en: 'When does it start?', ru: 'Когда начало?' }, answer: { ar: 'يبدأ النظام في المعالجة فورياً، وتظهر النتائج خلال 5-30 دقيقة عادةً.', he: 'המערכת מתחילה לעבוד מיד, ותוצאות נראות תוך 5-30 דקות.', en: 'Starts within 5-30 minutes.', ru: 'Через 5-30 минут.' } },
  { id: 'f3', question: { ar: 'هل أحتاج لإعطائكم كلمة السر؟', he: 'האם צריך לתת סיסמה?', en: 'Do you need my password?', ru: 'Нужен ли пароль?' }, answer: { ar: 'لا! نحن لا نطلب كلمات السر أبداً. نحتاج فقط لرابط الحساب أو المنشور.', he: 'בכלל לא! אנחנו לא מבקשים סיסמאות. רק לינק.', en: 'No password needed.', ru: 'Пароль לא нужен.' } },
  { id: 'f4', question: { ar: 'هل هناك ضمان ضد النقص؟', he: 'יש אחריות נגד ירידה?', en: 'Is there a refill guarantee?', ru: 'Есть ли гарантия?' }, answer: { ar: 'نعم، نقدم ضمان إعادة تعبئة تلقائي لمدة 30 يوماً في حال حدوث أي نقص.', he: 'כן, יש אחריות מילוי אוטומטית ל-30 יום.', en: '30-day refill guarantee.', ru: 'Гарантия 30 дней.' } },
  { id: 'f5', question: { ar: 'ما هي طرق الدفع المتاحة؟', he: 'איך אפשר לשלם?', en: 'Payment methods?', ru: 'Как платить?' }, answer: { ar: 'نقبل الدفع عبر تطبيقات Bit و Paybox لضمان أقصى درجات الأمان.', he: 'אנו מקבלים Bit ו-Paybox לאבטחה מקסימלית.', en: 'Bit and Paybox.', ru: 'Bit и Paybox.' } },
  { id: 'f6', question: { ar: 'هل الخدمة آمنة على حسابي؟', he: 'האם זה בטוח לחשבון?', en: 'Is it safe?', ru: 'Это безопасно?' }, answer: { ar: 'نعم، نستخدم تقنيات متوافقة مع خوارزميات إنستغرام لضمان سلامة حسابك 100%.', he: 'בטוח לחלוטין, אנו עובדים לפי חוקי אינסטגרם.', en: '100% safe.', ru: 'Безопасно.' } },
  { id: 'f7', question: { ar: 'هل يمكنني جعل حسابي خاصاً أثناء التنفيذ؟', he: 'אפשר לשים את החשבון על פרטי?', en: 'Can I set to private?', ru: 'Можно закрыть профиль?' }, answer: { ar: 'لا، يجب أن يكون الحساب عاماً (Public) حتى نتمكن من إيصال الخدمة.', he: 'לא, החשבון חייב להיות ציבורי בזמן האספקה.', en: 'Account must be public.', ru: 'Только открытый профиль.' } },
  { id: 'f8', question: { ar: 'كيف أتواصل مع الدعم الفني؟', he: 'איך יוצרים קשר עם תמיכה?', en: 'Contact support?', ru: 'Как связаться?' }, answer: { ar: 'عبر زر الواتساب الموجود في الموقع، فريقنا متاح للرد على مدار الساعة.', he: 'דרך כפתור הוואטסאפ באתר, אנחנו זמינים 24/7.', en: 'Via WhatsApp button.', ru: 'Через WhatsApp.' } },
  { id: 'f9', question: { ar: 'هل توفرون متابعين من دول محددة؟', he: 'יש עוקבים מישראל?', en: 'Country-targeted?', ru: 'Из определенных стран?' }, answer: { ar: 'نوفر متابعين VIP بجودة عالمية تساهم في رفع تقييم حسابك في منطقتك.', he: 'אנו מספקים עוקבי VIP באיכות פרימיום גלובלית.', en: 'Premium global VIP quality.', ru: 'Качественные VIP подписчики.' } },
  { id: 'f10', question: { ar: 'هل يمكنني تقسيم الطلب على عدة روابط؟', he: 'אפשר לחלק את ההזמנה?', en: 'Can I split order?', ru: 'Разделить заказ?' }, answer: { ar: 'كل طلب مخصص لرابط واحد فقط لضمان دقة وسرعة التنفيذ.', he: 'כל הזמנה מיועדת ללינק אחד בלבד לדיוק מקסימלי.', en: 'One link per order.', ru: 'Одна ссылка.' } },
  { id: 'f11', question: { ar: 'ماذا لو لم يصل الطلب؟', he: 'מה אם ההזמנה לא הגיעה?', en: 'What if it fails?', ru: 'Если не пришло?' }, answer: { ar: 'نحن نضمن وصول كل الطلبات، وفي حال وجود مشكلة يتم التعويض فوراً.', he: 'אנו מבטיחים הגעה מלאה, במקרה של תקלה יש פיצוי.', en: 'Full delivery guarantee.', ru: 'Полная гарантия.' } },
  { id: 'f12', question: { ar: 'هل يختفي المتابعون بعد فترة؟', he: 'העוקבים נעלמים?', en: 'Do they drop?', ru: 'Они пропадут?' }, answer: { ar: 'نستخدم حسابات عالية الجودة لضمان الاستقرار الدائم مع ضمان تعبئة.', he: 'אנו משתמשים בחשבונות איכותיים ליציבות מקסימלית.', en: 'High stability accounts.', ru: 'Стабильные.' } },
  { id: 'f13', question: { ar: 'هل اللايكات حقيقية؟', he: 'הלייקים אמיתיים?', en: 'Are likes real?', ru: 'Лайки реальные?' }, answer: { ar: 'نعم، اللايكات من حسابات نشطة تساعد في الوصول للإكسبلور.', he: 'כן, לייקים מחשבונות פעילים שעוזרים להגיע לאקספלור.', en: 'Real active likes.', ru: 'Активные лайки.' } },
  { id: 'f14', question: { ar: 'هل يمكن الطلب من خارج البلاد؟', he: 'אפשר להזמין מחו"ל?', en: 'Order from abroad?', ru: 'Заказ из-за границы?' }, answer: { ar: 'نعم، خدماتنا متاحة للجميع حول العالم مع طرق دفع دولية.', he: 'כן, השירות זמין לכל העולם.', en: 'Global service available.', ru: 'Доступно везде.' } },
  { id: 'f15', question: { ar: 'هل سأحصل على إيصال؟', he: 'מקבלים אישור?', en: 'Do I get a receipt?', ru: 'Будет чек?' }, answer: { ar: 'نعم، يتم تأكيد طلبك وإرسال التفاصيل فور التحقق من الدفع.', he: 'כן, תקבלו אישור מלא לאחר אימות התשלום.', en: 'Order confirmed after payment.', ru: 'Чек будет.' } }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Sara L.', handle: '@sarah_style', rating: 5, status: 'approved', date: '2024-05-20', content: 'השירות הכי מהיר בארץ! האיכות של העוקבים פשוט מדהימה.' },
  { id: '2', name: 'Ahmed M.', handle: '@ahmed_vlogs', rating: 5, status: 'approved', date: '2024-05-18', content: 'ممتاز جداً، السرعة في التنفيذ والخدمة راقية.' },
  { id: '3', name: 'Noa K.', handle: '@noa_lifestyle', rating: 5, status: 'approved', date: '2024-05-15', content: 'שדרג לי את העסק משמעותית. הלייקים נראים אמיתיים לגמרי.' },
  { id: '4', name: 'Yossi B.', handle: '@yossi_biz', rating: 5, status: 'approved', date: '2024-05-12', content: 'ממליץ בחום! אמינות ודיוק ברמה הכי גבוהה שיש.' },
  { id: '5', name: 'Laila H.', handle: '@laila_art', rating: 5, status: 'approved', date: '2024-05-10', content: 'أفضل موقع تعاملت معه، الدعم الفني متعاون جداً.' },
  { id: '6', name: 'Dan G.', handle: '@dan_travels', rating: 5, status: 'approved', date: '2024-05-08', content: 'Amazing speed and quality. Best followers ever!' },
  { id: '7', name: 'Maya S.', handle: '@maya_fit', rating: 5, status: 'approved', date: '2024-05-05', content: 'העוקבים הכי יציבים שמצאתי. לא יורדים בכלל.' },
  { id: '8', name: 'Tarek Z.', handle: '@tarek_tech', rating: 5, status: 'approved', date: '2024-05-01', content: 'خدمة احترافية بكل معنى الكلمة. شكراً لكم.' },
  { id: '9', name: 'Ronit A.', handle: '@ronit_fashion', rating: 5, status: 'approved', date: '2024-04-28', content: 'תודה רבה על השירות! האינסטגרם שלי נראה הרבה יותר טוב.' },
  { id: '10', name: 'Kevin D.', handle: '@kevin_official', rating: 5, status: 'approved', date: '2024-04-25', content: 'Top tier service. 100% recommended for growth.' },
  { id: '11', name: 'Sami K.', handle: '@sami_chef', rating: 5, status: 'approved', date: '2024-04-22', content: 'ساعدني في الوصول لعدد أكبر من الزبائن لمطعمي.' },
  { id: '12', name: 'Ella R.', handle: '@ella_beauty', rating: 5, status: 'approved', date: '2024-04-20', content: 'פשוט וואו. המון לייקים ותגובות איכותיות.' },
  { id: '13', name: 'David W.', handle: '@david_w', rating: 5, status: 'approved', date: '2024-04-18', content: 'Consistent results and very safe for my account.' },
  { id: '14', name: 'Noura S.', handle: '@noura_designs', rating: 5, status: 'approved', date: '2024-04-15', content: 'تصاميمي وصلت للإكسبلور بفضل دعمكم المستمر.' },
  { id: '15', name: 'Gal L.', handle: '@gal_photo', rating: 5, status: 'approved', date: '2024-04-12', content: 'צילומים שלי קיבלו חשיפה מטורפת בזכותכם.' },
  { id: '16', name: 'Omar F.', handle: '@omar_fit', rating: 5, status: 'approved', date: '2024-04-10', content: 'النتائج فاقت توقعاتي. جودة الحسابات مبهرة.' },
  { id: '17', name: 'Adi T.', handle: '@adi_moments', rating: 5, status: 'approved', date: '2024-04-08', content: 'השירות הכי נוח שיש. התשלום קל והאספקה מהירה.' },
  { id: '18', name: 'Sophia J.', handle: '@sophia_style', rating: 5, status: 'approved', date: '2024-04-05', content: 'Elegant service. Very satisfied with the outcome.' },
  { id: '19', name: 'Zaid K.', handle: '@zaid_vlogs', rating: 5, status: 'approved', date: '2024-04-01', content: 'الموقع رقم 1 في المنطقة بلا منازع.' },
  { id: '20', name: 'Inbal P.', handle: '@inbal_beauty', rating: 5, status: 'approved', date: '2024-03-28', content: 'כל מי שרוצה לגדול באינסטגרם - זה המקום.' }
];

export const DEFAULT_SERVICES: (ServiceData & { badgeLabel: Record<string, string> })[] = [
  {
    id: 'followers',
    badgeLabel: { ar: 'نمو سريع', he: 'צמיחה', en: 'GROWTH' },
    titleEn: 'Elite VIP Followers', titleHe: 'עוקבי VIP פרימיום', titleAr: 'متابعون VIP نخبة', titleRu: 'VIP Подписчики',
    descriptionEn: 'Stable profiles with 30-day guarantee.', descriptionHe: 'פרופילים יציבים עם אחריות ל-30 יום.', descriptionAr: 'حسابات حقيقية مستقرة مع ضمان استقرار.', descriptionRu: 'VIP Подписчики.',
    iconId: 'followers', isDynamic: true, min: 500, max: 100000, step: 500, unitPrice: 0.12,
  },
  {
    id: 'likes',
    badgeLabel: { ar: 'انتشار', he: 'ויראלי', en: 'VIRAL' },
    titleEn: 'Power Viral Likes', titleHe: 'לייקים ויראליים עוצמתיים', titleAr: 'إعجابات قوية (Viral)', titleRu: 'Лايكي',
    descriptionEn: 'Boost engagement instantly.', descriptionHe: 'הגדלת מעורבות באופן מיידי.', descriptionAr: 'ارفع تفاعل منشوراتك فوراً.', descriptionRu: 'Лايكي.',
    iconId: 'likes', isDynamic: true, min: 1000, max: 50000, step: 500, unitPrice: 0.055,
  },
  {
    id: 'comments',
    badgeLabel: { ar: 'ثقة', he: 'אמינות', en: 'TRUST' },
    titleEn: 'Professional HQ Comments', titleHe: 'תגובות איכותיות', titleAr: 'تعليقات عالية الجودة', titleRu: 'Комментарии',
    descriptionEn: 'Build trust with real comments.', descriptionHe: 'בניית אמון עם תגובות אמיתיות.', descriptionAr: 'تعليقات حقيقية تعزز الثقة.', descriptionRu: 'Комментарии.',
    iconId: 'comments', isDynamic: true, min: 10, max: 1000, step: 5, unitPrice: 0.40,
  },
  {
    id: 'views',
    badgeLabel: { ar: 'شهرة', he: 'פופולרי', en: 'POPULAR' },
    titleEn: 'Ultra Fast Reels Views', titleHe: 'צפיות VIP לסרטונים', titleAr: 'مشاهدات ريلز نخبة', titleRu: 'Просмотры',
    descriptionEn: 'High retention video views.', descriptionHe: 'צפיות איכותיות לסרטונים.', descriptionAr: 'مشاهدات ريلز بمدة عالية.', descriptionRu: 'Просмотры.',
    iconId: 'views', isDynamic: true, min: 1000, max: 500000, step: 1000, unitPrice: 0.05,
  }
];

export const TRANSLATIONS: any = {
  he: {
    heroTitle: 'צמיחה אמיתית באינסטגרם', heroSub: 'הדרך המהירה והבטוחה ביותר להפוך למותג מוביל.', promoText: 'מבצע מוגבל: עד 25% הנחה על חבילות!', orderBtn: 'הזמינו עכשיו', addToCartBtn: 'הוסף לסל', selectAmount: 'בחר כמות יחידות', guaranteeText: 'אחריות מלאה לכל הזמנה', footerRights: 'כל הזכויות שמורות ל-Huutix Elite.', contactSupport: 'תמיכה טכנית', flashSale: 'מכירת בזק מופעלת כעת!', savePercent: 'חסוך', servicesTitle: 'השירותים המקצועיים שלנו', servicesSub: 'שדרגו את החשבון שלכם עם השירותים המובילים ביותר', trustTitle: 'אלפי לקוחות כבר סומכים עלינו', testimonialsBadge: 'ביקורות מאומתות', faqTitle: 'שאלות ותשובות', faqSub: 'מרכז המידע והתמיכה', checkoutTitle: 'קופה מאובטחת', secureSupport: 'תמיכה מוצפנת 24/7', selectedPlanLabel: 'חבילה נבחרת', profileLinkInput: 'קישור לפרופיל', postLinkInput: 'קישור לפוסט', phoneInput: 'מספר טלפון', couponLabel: 'קוד קופון', applyBtn: 'החל קופון', totalPayable: 'סה"כ לתשלום', proceedBtn: 'המשך לאישור', transferToLabel: 'העברה למספר:', uploadReceipt: 'צרף צילום מסך אישור העברה', clickToUpload: 'לחץ להעלאה', completeOrderBtn: 'שלח הזמנה לוואטסאפ', bitMethod: 'Bit', payboxMethod: 'Paybox', supportPlaceholder: 'איך נעזור?', whatsappBtn: 'תמיכה בוואטסאפ', validCoupon: 'הקופון הוחל!', invalidCoupon: 'קוד לא תקין', invalidLink: 'קישור לא תקין', invalidPhone: 'מספר לא תקין', navHome: 'בית', navServices: 'שירותים', navFAQ: 'שאלות', navTerms: 'תקנון', navPrivacy: 'פרטיות', footerSupportHub: 'מרכז עזרה', footerInstantChat: 'צ’אט מהיר', footerOfficialEmail: 'אימייל רשמי', footerBrandDesc: 'המותג המוביל לקידום ברשתות.', footerQuickLinks: 'ניווט מהיר', cartEmpty: 'הסل ריק', cartTitle: 'סל הקניות', itemRemoved: 'הפריט הוסר', howItWorksTitle: 'איך זה עובד?', howItWorksStep1Title: 'בחירת שירות', howItWorksStep1Desc: 'בחרו את החבילה המתאימה.', howItWorksStep2Title: 'הזנת פרטים', howItWorksStep2Desc: 'הזינו קישור לחשבון.', howItWorksStep3Title: 'ביצוע תשלום', howItWorksStep3Desc: 'שלמו דרך Bit/Paybox.', howItWorksStep4Title: 'צמיחה מיידית', howItWorksStep4Desc: 'המערכת מתחילה לעבוד', aiFeatureTitle: 'טכנולוגיית AI', aiFeatureDesc: 'אלגוריתמים מתקדמים.', aiFeatureBadge: 'מבוסס AI',
    hiringTitle: 'הצטרפו לצוות שלנו', hiringDesc: 'שיווק פשוט: הפיצו את הקוד שלכם והרוויחו עמלות גבוהות!', hiringSubmit: 'שלח בקשה', hiringSuccess: 'הבקשה נשלחה בהצלחה!', staffPortalTitle: 'מערכת עובדים'
  },
  ar: {
    heroTitle: 'نمو حقيقي واحترافي على إنستغرام', heroSub: 'الطريق الأسرع والأكثر أماناً لبناء حضور رقمي قوي ومؤثر.', promoText: 'عرض خاص: خصومات تصل لـ 25% على الباقات!', orderBtn: 'اطلب الآن', addToCartBtn: 'إضافة للسلة', selectAmount: 'حدد الكمية المطلوبة', guaranteeText: 'ضمان استقرار كامل لكل طلب', footerRights: 'جميع الحقوق محفوظة لهووتيكس إيليت.', contactSupport: 'الدعم الفني', flashSale: 'عرض البرق مفعّل الآن!', savePercent: 'وفر', servicesTitle: 'خدماتنا الاحترافية', servicesSub: 'ارتقِ بحسابك الآن مع خدماتنا الأكثر طلباً وجودة', trustTitle: 'آلاف العملاء يثقون في نتائجنا', testimonialsBadge: 'آراء عملاء حقيقية', faqTitle: 'الأسئلة الشائعة', faqSub: 'مركز المساعدة', checkoutTitle: 'إتمام الطلب', secureSupport: 'دعم مشفر 24/7', selectedPlanLabel: 'الباقة المختارة', profileLinkInput: 'رابط الملف الشخصي', postLinkInput: 'رابط المنشور', phoneInput: 'رقم الواتساب', couponLabel: 'كود الخصم', applyBtn: 'تطبيق', totalPayable: 'الإجمالي', proceedBtn: 'المتابعة للتحويل', transferToLabel: 'حول للرقم التالي:', uploadReceipt: 'ارفق إيصال التحويل', clickToUpload: 'انقر للتحميل', completeOrderBtn: 'تأكيد عبر واتساب', bitMethod: 'تطبيق Bit', payboxMethod: 'تطبيق Paybox', supportPlaceholder: 'كيف نساعدك؟', whatsappBtn: 'واتساب', validCoupon: 'تم بنجاح!', invalidCoupon: 'كود خطأ', invalidLink: 'رابط خطأ', invalidPhone: 'رقم خطأ', navHome: 'الرئيسية', navServices: 'الخدمات', navFAQ: 'المساعدة', navTerms: 'الشروط', navPrivacy: 'الخصوصية', footerSupportHub: 'مركز النمو', footerInstantChat: 'محادثة', footerOfficialEmail: 'البريد', footerBrandDesc: 'العلامة الرائدة لنمو الحسابات.', footerQuickLinks: 'روابط', cartEmpty: 'السلة فارغة', cartTitle: 'السلة', itemRemoved: 'تم الحذف', howItWorksTitle: 'كيف تبدأ؟', howItWorksStep1Title: 'اختر', howItWorksStep1Desc: 'حدد باقتك المفضلة.', howItWorksStep2Title: 'بيانات', howItWorksStep2Desc: 'زودنا برابط حسابك.', howItWorksStep3Title: 'دفع', howItWorksStep3Desc: 'ادفع عبر Bit/Paybox.', howItWorksStep4Title: 'نمو', howItWorksStep4Desc: 'نفذنا طلبك بنجاح', aiFeatureTitle: 'تقنيات ذكية', aiFeatureDesc: 'نستخدم الذكاء الاصطناعي.', aiFeatureBadge: 'بذكاء AI',
    hiringTitle: 'انضم لفريقنا', hiringDesc: 'سوق لخدماتنا بكودك الشخصي واحصل على عمولات مجزية فوراً!', hiringSubmit: 'تقديم طلب', hiringSuccess: 'تم تقديم طلبك بنجاح!', staffPortalTitle: 'نظام الموظفين'
  }
};
