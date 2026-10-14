import { useState } from 'react';

const translations = {
  en: {
    customerCare: 'Customer Care',
    title: 'Contact Us',
    subtitle: 'We would love to hear from you',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    namePlaceholder: 'Your Name',
    emailPlaceholder: 'you@example.com',
    messagePlaceholder: 'Write your message...',
    send: 'Send Message',
    success: 'Your message has been sent successfully.'
  },
  ar: {
    customerCare: 'خدمة العملاء',
    title: 'اتصل بنا',
    subtitle: 'يسعدنا أن نسمع منك',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    message: 'الرسالة',
    namePlaceholder: 'اسمك',
    emailPlaceholder: 'you@example.com',
    messagePlaceholder: 'اكتب رسالتك...',
    send: 'إرسال الرسالة',
    success: 'تم إرسال رسالتك بنجاح.'
  }
};

export default function Contact({ lang = 'en', onToast = () => {} }) {
  const copy = translations[lang] || translations.en;
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  function updateField(event) {
    const { name, value } = event.target;
    setValues(current => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!values.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!values.message.trim()) nextErrors.message = 'Please enter your message.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setValues({ name: '', email: '', message: '' });
    onToast(copy.success);
  }

  return (
    <>
      <section className="relative py-16 px-4 text-center">
        <p className="uppercase text-xs tracking-[6px] accent mb-3 font-semibold" data-i18n="customer_care">{copy.customerCare}</p>
        <h1 className="font-display text-5xl md:text-6xl font-light mb-4"><span data-i18n="contact_title">{copy.title}</span></h1>
        <p className="text-gray-300 max-w-lg mx-auto text-sm" data-i18n="contact_subtitle">{copy.subtitle}</p>
      </section>

      <main className="max-w-3xl mx-auto px-4 pb-20">
        <div className="bg-card border border-[#222] w-full rounded-3xl p-8 shadow-lg">
          <form id="contactForm" className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium" data-i18n="name">{copy.name}</label>
              <input id="name" name="name" type="text" className={`form-input w-full${errors.name ? ' border-red-500' : ''}`} data-i18n-placeholder="placeholder_name" placeholder={copy.namePlaceholder} value={values.name} onChange={updateField} required />
              <p className="error-text mt-1" id="errorName">{errors.name || ''}</p>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium" data-i18n="email">{copy.email}</label>
              <input id="email" name="email" type="email" className={`form-input w-full${errors.email ? ' border-red-500' : ''}`} data-i18n-placeholder="placeholder_email" placeholder={copy.emailPlaceholder} value={values.email} onChange={updateField} required />
              <p className="error-text mt-1" id="errorEmail">{errors.email || ''}</p>
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium" data-i18n="message">{copy.message}</label>
              <textarea id="message" name="message" rows="5" className={`form-input w-full${errors.message ? ' border-red-500' : ''}`} data-i18n-placeholder="placeholder_message" placeholder={copy.messagePlaceholder} value={values.message} onChange={updateField} required />
              <p className="error-text mt-1" id="errorMessage">{errors.message || ''}</p>
            </div>
            <button id="submitButton" type="submit" className="gold-btn w-full py-3 text-sm uppercase tracking-wider" data-i18n="send_message">{copy.send}</button>
          </form>
        </div>
      </main>

    </>
  );
}
