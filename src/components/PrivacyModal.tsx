
import React from 'react';
import { X, ShieldCheck, Lock, EyeOff } from 'lucide-react';
import { Language } from '../types';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const isRtl = lang === 'ar' || lang === 'he';

  const content = {
    ar: {
      title: 'سياسة الخصوصية والأمان',
      sections: [
        { h: '1. حماية الخصوصية', p: 'نحن نقدر خصوصيتك بشدة. لا نطلب أبداً كلمات مرور أو أي وصول مباشر لحسابك الشخصي.' },
        { h: '2. البيانات التي نجمعها', p: 'نجمع فقط رابط الحساب ورقم الهاتف لغرض التنفيذ والدعم. لا يتم تخزين هذه البيانات لأغراض دعائية خارجية.' },
        { h: '3. أمن الدفع', p: 'عمليات الدفع تتم عبر تطبيقات خارجية مشفرة (Bit/Paybox). لا نطلع على بياناتك البنكية بأي شكل من الأشكال.' },
        { h: '4. ملفات الارتباط', p: 'نستخدم الكوكيز لتحسين تجربة المستخدم وحفظ تفضيلات اللغة المختارة فقط.' }
      ]
    },
    he: {
      title: 'מדיניות פרטיות ואבטחה',
      sections: [
        { h: '1. הגנה על הפרטיות', p: 'אנו מעריכים את פרטיותך. לעולם לא נבקש סיסמאות או גישה ישירה לחשבונך האישי.' },
        { h: '2. איסוף נתונים', p: 'אנו אוספים אך ורק את קישור החשבון ומספר הטלפון לצורך ביצוע ההזמנה. המידע אינו מועבר לצדדים שלישיים.' },
        { h: '3. אבטחת תשלום', p: 'התשלומים מתבצעים דרך אפליקציות חיצוניות מאובטחות (Bit/Paybox). אין לנו גישה לפרטי חשבון הבנק שלך.' },
        { h: '4. עוגיות (Cookies)', p: 'האתר משתמש בעוגיות אך ורק לצורך שיפור חווית המשתמש ושמירת הגדרות השפה.' }
      ]
    },
    en: {
      title: 'Privacy & Security Policy',
      sections: [
        { h: '1. Privacy Shield', p: 'Your privacy is our priority. We never ask for passwords or direct account access.' },
        { h: '2. Data Collection', p: 'We only collect your Instagram link and phone number for order processing. We do not sell your data.' },
        { h: '3. Secure Payments', p: 'Payments are handled via external encrypted apps (Bit/Paybox). We never see your financial credentials.' },
        { h: '4. Cookies', p: 'We use cookies strictly to improve site performance and remember your language settings.' }
      ]
    },
    ru: {
      title: 'Политика конфиденциальности',
      sections: [
        { h: '1. Защита данных', p: 'Мы ценим вашу конфиденциальность. Мы никогда не запрашиваем пароли.' },
        { h: '2. Сбор данных', p: 'Мы собираем только ссылку на профиль и номер телефона для связи. Данные не передаются третьим лицам.' },
        { h: '3. Платежи', p: 'Оплата производится через защищенные приложения (Bit/Paybox). У нас нет доступа к вашим банковским данным.' },
        { h: '4. Cookies', p: 'Мы используем файлы cookie только для улучшения работы сайта и сохранения языка.' }
      ]
    }
  }[lang];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{content.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 text-gray-400"><X className="w-6 h-6" /></button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-8">
          {content.sections.map((sec, i) => (
            <div key={i} className={`space-y-3 ${isRtl ? 'text-right' : 'text-left'}`}>
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-600" />
                {sec.h}
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed">{sec.p}</p>
            </div>
          ))}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
            <EyeOff className="w-4 h-4" />
            Encrypted & Private
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
