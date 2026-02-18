import React from 'react';
import { X, ShieldCheck, Scale, FileText, CheckCircle2, Lock, EyeOff, Gavel, Handshake } from 'lucide-react';
import { Language } from '../types';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
  lang: Language;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type, lang }) => {
  if (!isOpen) return null;

  const isRtl = lang === 'ar' || lang === 'he';

  const content = {
    terms: {
      ar: {
        title: 'اتفاقية شروط الخدمة الاحترافية',
        icon: <Scale className="w-6 h-6" />,
        sections: [
          { h: '1. أحكام عامة', p: 'تُحدد هذه الاتفاقية الشروط القانونية لاستخدام منصة Huutix Elite. باستخدامك لخدماتنا، فإنك توافق ضمنياً على الالتزام بكافة البنود المذكورة أدناه.' },
          { h: '2. طبيعة الخدمات التسويقية', p: 'نحن نقدم حلولاً تقنية لتعزيز الحضور الاجتماعي. Huutix هي كيان مستقل تماماً ولا تتبع، ولا ترتبط، ولا تُمثل رسمياً شركة Meta أو Instagram أو أي منصة تواصل اجتماعي أخرى.' },
          { h: '3. التزامات العميل التقنية', p: 'يُشترط أن يكون الحساب المستهدف "عاماً" (Public) طوال فترة تنفيذ الخدمة. أي تغيير في خصوصية الحساب أو اسم المستخدم (Username) أثناء التنفيذ يُعتبر إخلالاً بالعقد ويُسقط حق العميل في المطالبة بالتعويض.' },
          { h: '4. سياسة الإلغاء والتعويض المالي', p: 'نظراً للطبيعة الرقمية الفورية للخدمات، لا يُسمح بإلغاء الطلب بعد بدء مرحلة المعالجة. يتم رد الأموال فقط في حالة تعذر النظام عن بدء الخدمة خلال 72 ساعة عمل من وقت التأكيد.' },
          { h: '5. المسؤولية القانونية', p: 'نحن نستخدم تقنيات آمنة تحاكي النمو الطبيعي، ومع ذلك، يتحمل المستخدم كامل المسؤولية عن استخدامه لخدماتنا والالتزام بسياسات منصات التواصل الاجتماعي.' }
        ]
      },
      he: {
        title: 'תקנון תנאי שימוש מקצועי',
        icon: <Scale className="w-6 h-6" />,
        sections: [
          { h: '1. הסכמה כללית', p: 'מסמך זה מהווה הסכם משפטי מחייב בין המשתמש לבין פלטפורמת Huutix Elite. עצם השימוש בשירותים מהווה הסכמה מלאה לתנאים המפורטים.' },
          { h: '2. מהות השירות', p: 'Huutix הינה ספקית טכנולוגית לקידום נוכחות דיגיטלית. החברה פועלת באופן עצמאי לחלוטין ואינה קשורה או מיוצגת על ידי Meta, Instagram או כל גוף רשמי אחר.' },
          { h: '3. אחריות על הגדרות החשבון', p: 'על המשתמש לוודא כי החשבון המקודם מוגדר כ-"ציבורי" (Public) לאורך כל תקופת האספקה. כל שינוי בהגדרות אלו או בשם המשתמש יביא לביטול אחריות האספקה באופן מיידי.' },
          { h: '4. מדיניות ביטולים והחזרים', p: 'בשל אופי השירות הדיגיטלי, לא ניתן לבצע ביטול לאחר תחילת העבודה. החזר כספי יתאפשר רק במידה והמערכת לא החלה לפעול תוך 72 שעות מרגע אישור ההזמנה.' },
          { h: '5. אבטחה ומידע', p: 'לעולם לא נבקש את סיסמת הגישה לחשבונכם. השימוש בשירות נעשה על אחריות המשתמש בלבד ובהתאם למדיניות הרשתות החברתיות.' }
        ]
      },
      en: {
        title: 'Professional Terms of Service',
        icon: <Scale className="w-6 h-6" />,
        sections: [
          { h: '1. General Terms', p: 'This agreement governs the use of Huutix Elite platform. By utilizing our services, you confirm your acceptance of all terms specified herein.' },
          { h: '2. Independent Service Provider', p: 'Huutix is a third-party technology provider. We are not affiliated with, authorized, or endorsed by Meta, Instagram, or any other social media corporation.' },
          { h: '3. Technical Requirements', p: 'Target accounts must remain set to "Public" throughout the delivery cycle. Modifying privacy settings or changing usernames voids all delivery guarantees.' },
          { h: '4. Refund & Cancellation Policy', p: 'Due to the non-tangible, immediate nature of digital growth services, cancellations are not permitted once processing begins. Refunds are only eligible if the system fails to initiate delivery within 72 business hours.' },
          { h: '5. Liability Statement', p: 'While we employ safe methodologies, the user assumes full responsibility for their social media strategy and compliance with platform guidelines.' }
        ]
      }
    },
    privacy: {
      ar: {
        title: 'سياسة الخصوصية وأمن البيانات',
        icon: <ShieldCheck className="w-6 h-6" />,
        sections: [
          { h: '1. شفافية جمع البيانات', p: 'نحن نجمع الحد الأدنى من البيانات اللازمة لتنفيذ طلبك، وهي: رابط الحساب (Username) ورقم هاتف واتساب للتواصل.' },
          { h: '2. سرية المعلومات', p: 'نحن نلتزم بعدم بيع، أو تأجير، أو مشاركة بيانات عملائنا مع أي أطراف ثالثة لأغراض دعائية أو تجارية.' },
          { h: '3. أمن المعاملات المالية', p: 'تتم كافة التحويلات عبر تطبيقات مستقلة ومشفرة (Bit / Paybox). Huutix لا تطلع ولا تحتفظ بأي بيانات بنكية أو بطاقات ائتمانية.' },
          { h: '4. ملفات الارتباط (Cookies)', p: 'نستخدم الكوكيز فقط لتحسين استقرار الموقع وحفظ تفضيلات اللغة الخاصة بك لضمان تجربة تصفح سلسة.' },
          { h: '5. التواصل الآمن', p: 'المحادثات عبر واتساب مشفرة وتستخدم حصراً لأغراض الدعم الفني وتأكيد حالة الطلب.' }
        ]
      },
      he: {
        title: 'מדיניות פרטיות ואבטחת מידע',
        icon: <ShieldCheck className="w-6 h-6" />,
        sections: [
          { h: '1. איסוף נתונים מינימלי', p: 'אנו אוספים אך ורק את המידע הנדרש לביצוע ההזמנה: קישור לפרופיל ומספר וואטסאפ ליצירת קשר.' },
          { h: '2. הגנת הפרטיות', p: 'המידע שלכם מאובטח אצלנו. אנו מתחייבים לא למכור או לשתף את פרטיכם עם גורמים חיצוניים למטרות פרסום.' },
          { h: '3. אבטחת תשלומים', p: 'התשלומים מבוצעים דרך פלטפורמות חיצוניות מאובטחות (Bit / Paybox). אין לנו גישה לפרטי חשבון הבנק או כרטיסי האשראי שלכם.' },
          { h: '4. עוגיות (Cookies)', p: 'האתר משתמש בעוגיות לצורך שיפור ביצועי המערכת ושמירת העדפות השפה שלכם בלבד.' },
          { h: '5. תקשורת מוצפנת', p: 'כל התקשורת מול מערך השירות בווטסאפ מוצפנת ומשמשת לטיפול בהזמנות בלבד.' }
        ]
      },
      en: {
        title: 'Data Privacy & Security Standard',
        icon: <ShieldCheck className="w-6 h-6" />,
        sections: [
          { h: '1. Data Collection Transparency', p: 'We collect only the essential data required for fulfillment: target profile link and WhatsApp phone number.' },
          { h: '2. Non-Disclosure Commitment', p: 'Customer information is strictly confidential. We do not sell, rent, or distribute data to third-party marketers.' },
          { h: '3. Financial Security', p: 'Payments are processed via secure external fintech applications. Huutix does not store or access your banking or credit card details.' },
          { h: '4. Cookie Usage', p: 'Our site utilizes cookies strictly for stability and language preference persistence to enhance your user experience.' },
          { h: '5. Encrypted Support', p: 'Our support communications via WhatsApp are private and utilized exclusively for order verification and assistance.' }
        ]
      }
    }
  };

  const currentData = content[type][lang as 'ar' | 'he' | 'en'] || content[type]['en'];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-3xl overflow-hidden flex flex-col max-h-[90vh] border dark:border-white/10">
        
        <div className={`p-8 border-b dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-white/5 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl">
              {currentData.icon}
            </div>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <h2 className="text-xl font-black dark:text-white tracking-tight leading-none mb-1">
                {currentData.title}
              </h2>
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Huutix Elite Official Documents</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-2xl bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-white hover:bg-red-500 hover:text-white transition-all active:scale-90"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-10 overflow-y-auto no-scrollbar flex-1 space-y-10 bg-grid">
          {currentData.sections.map((sec, i) => (
            <div key={i} className={`space-y-4 ${isRtl ? 'text-right' : 'text-left'}`}>
              <h3 className={`text-lg font-black text-slate-900 dark:text-white flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                {sec.h}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                {sec.p}
              </p>
            </div>
          ))}
          
          <div className="pt-10 border-t dark:border-white/5">
            <div className="bg-blue-600 text-white p-8 rounded-[2.5rem] text-center shadow-xl">
               <CheckCircle2 className="w-10 h-10 mx-auto mb-4" />
               <p className="text-xs font-black uppercase tracking-[0.3em] mb-2">Platform Verified</p>
               <p className="text-[10px] opacity-70 font-bold">
                 {lang === 'ar' ? 'آخر تحديث: يونيو 2024 - جميع الحقوق محفوظة لهووتيكس' : 
                  lang === 'he' ? 'עדכון אחרון: יוני 2024 - כל הזכויות שמורות להוטיקס' : 
                  'Last Updated: June 2024 - All Rights Reserved to Huutix'}
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;