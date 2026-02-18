
import React from 'react';
import { X, Scale, FileText, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const isRtl = lang === 'ar' || lang === 'he';

  const content = {
    ar: {
      title: 'شروط الخدمة والأحكام الرسمية',
      sections: [
        { h: '1. الالتزام القانوني', p: 'باستخدامك لمنصة Huutix، فإنك تقر وتوافق على شروط الخدمة المذكورة. نحن نقدم خدمات تعزيز التفاعل الاجتماعي لأغراض ترويجية مشروعة.' },
        { h: '2. طبيعة الخدمات المقدمة', p: 'خدماتنا مستقلة تماماً ولا تتبع رسمياً لشركة Instagram أو Meta. نستخدم أحدث التقنيات الآمنة لضمان استقرار حسابك.' },
        { h: '3. مسؤولية العميل الفنية', p: 'يتحمل العميل مسؤولية بقاء الحساب "عاماً" طوال فترة التنفيذ. أي تغيير في إعدادات الخصوصية أو اسم المستخدم يؤدي لإبطال ضمان التسليم.' },
        { h: '4. سياسة الإلغاء والتعويض', p: 'نظراً للطبيعة الرقمية الفورية، لا يمكن إلغاء الطلب بعد البدء. يتم التعويض المالي فقط في حال تعذر تشغيل النظام خلال 72 ساعة عمل.' }
      ]
    },
    he: {
      title: 'תנאי שימוש ומדיניות משפטית',
      sections: [
        { h: '1. הסכמה ושימוש', p: 'בעצם השימוש בפלטפורמת Huutix, הנך מצהיר על הסכמתך לתנאי השירות. השירותים מיועדים לקידום חברתי ושיווקי בלבד.' },
        { h: '2. מהות השירותים', p: 'אנו פועלים כספק עצמאי ואיננו נציגים רשמיים של Instagram או Meta. אנו מקפידים על שיטות עבודה בטוחות המותאמות לפלטפורמה.' },
        { h: '3. אחריות טכנית של המזמין', p: 'האחריות על השארת החשבון "ציבורי" חלה על המזמין בלבד. שינוי סטטוס החשבון או שם המשתמש בזמן ביצוע יביא לביטול אחריות האספקה.' },
        { h: '4. מדיניות ביטולים והחזרים', p: 'בשל אופי השירות הדיגיטלי, לא ניתן לבצע ביטול לאחר תחילת העבודה. החזר כספי יינתן רק במידה והמערכת לא החלה לפעול תוך 72 שעות.' }
      ]
    },
    en: {
      title: 'Official Terms of Service',
      sections: [
        { h: '1. Legal Agreement', p: 'By accessing Huutix, you confirm your acceptance of these terms. Our platform provides social engagement solutions for promotional use.' },
        { h: '2. Nature of Services', p: 'Huutix operates independently and is not affiliated with Meta or Instagram. We use secure methodologies to ensure profile stability.' },
        { h: '3. Client Obligations', p: 'Accounts must remain "Public" throughout the delivery phase. Altering privacy settings or usernames voids our delivery guarantees.' },
        { h: '4. Refund & Cancellation', p: 'Due to the instant digital nature of fulfillment, orders are final once started. Refunds are exclusively processed if system startup fails beyond 72 hours.' }
      ]
    },
    ru: {
      title: 'Официальные условия использования',
      sections: [
        { h: '1. Юридическое соглашение', p: 'Используя платформу Huutix, вы подтверждаете свое согласие с данными условиями. Наши услуги предназначены для целей продвижения.' },
        { h: '2. Природа услуг', p: 'Huutix работает независимо и не является аффилированным лицом Instagram или Meta. Мы используем безопасные методы работы.' },
        { h: '3. Обязательства клиента', p: 'Аккаунт должен оставаться открытым (Public) в течение всего периода выполнения. Смена ника аннулирует гарантию.' },
        { h: '4. Возврат и отмена', p: 'В связи с цифровой природой услуг, отмена после начала невозможна. Возврат осуществляется, если запуск не начался в течение 72 часов.' }
      ]
    }
  }[lang];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg">
              <Scale className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{content.title}</h2>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"><X className="w-6 h-6" /></button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-8">
          {content.sections.map((sec, i) => (
            <div key={i} className={`space-y-3 ${isRtl ? 'text-right' : 'text-left'}`}>
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                {sec.h}
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed">{sec.p}</p>
            </div>
          ))}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-green-600 font-bold text-[10px] uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4" />
            Verified Legal Framework
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
