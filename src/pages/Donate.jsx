import { useState } from 'react';
import { Auth } from '../services/auth.js';

const translations = {
  en: {
    heroSub: 'Give directly to someone in need',
    heroTitle: 'Person-to-Person Donation',
    heroDesc: 'Offer clothing directly to a person you choose and arrange a handoff with them.',
    donationTitle: 'Donation Form',
    donationHeading: 'Send clothing directly to a recipient',
    donationDesc: 'Enter your details, describe the clothing, and provide the recipient’s contact information so you can coordinate the donation directly.',
    fullName: 'Full Name *',
    email: 'Email *',
    recipientName: 'Recipient Full Name *',
    recipientPhone: 'Recipient Phone Number *',
    recipientAddress: 'Recipient Area / Address',
    type: 'Clothing Type *',
    items: 'Number of Items *',
    size: 'Size',
    condition: 'Condition',
    notes: 'Additional Notes',
    fullNamePlaceholder: 'Your full name',
    emailPlaceholder: 'email@example.com',
    recipientNamePlaceholder: 'Name of the person receiving the donation',
    recipientPhonePlaceholder: 'Recipient phone number',
    recipientAddressPlaceholder: 'City, area, or handoff location',
    sizePlaceholder: 'e.g. M, L, 40',
    typePlaceholder: 'Select type',
    itemsPlaceholder: 'e.g. 5',
    notesPlaceholder: 'Write here...',
    selectType: 'Select type',
    mens: "Men's",
    womens: "Women's",
    unisex: 'Unisex',
    selectCondition: 'Select condition',
    newCondition: 'New',
    likeNew: 'Like New',
    good: 'Good',
    fair: 'Fair',
    submit: 'Submit Donation',
    note: 'Contact the recipient directly to arrange delivery or pickup.',
    errorFullName: 'Please enter your full name.',
    errorEmail: 'Please enter a valid email address.',
    errorType: 'Please select a clothing type.',
    errorItems: 'Please enter a valid number of items.',
    success: 'Donation submitted. Contact the recipient directly to arrange the handoff.'
  },
  ar: {
    heroSub: 'تبرع مباشرةً لشخص محتاج',
    heroTitle: 'تبرع من شخص لشخص',
    heroDesc: 'قدّم الملابس مباشرةً لشخص تختاره ونسّق معه موعد ومكان التسليم.',
    donationTitle: 'نموذج التبرع',
    donationHeading: 'أرسل الملابس مباشرةً للمستفيد',
    donationDesc: 'اكتب بياناتك وتفاصيل الملابس وبيانات تواصل المستفيد حتى تتمكن من تنسيق التبرع معه مباشرةً.',
    fullName: 'الاسم بالكامل *',
    email: 'البريد الإلكتروني *',
    recipientName: 'اسم المستفيد بالكامل *',
    recipientPhone: 'رقم هاتف المستفيد *',
    recipientAddress: 'المنطقة أو العنوان',
    type: 'نوع الملابس *',
    items: 'عدد القطع *',
    size: 'المقاس',
    condition: 'حالة المنتج',
    notes: 'ملاحظات إضافية',
    fullNamePlaceholder: 'اسمك الكامل',
    emailPlaceholder: 'example@domain.com',
    recipientNamePlaceholder: 'اسم الشخص الذي سيستلم التبرع',
    recipientPhonePlaceholder: 'رقم هاتف المستفيد',
    recipientAddressPlaceholder: 'المدينة أو المنطقة أو مكان التسليم',
    sizePlaceholder: 'e.g. M, L, 40',
    typePlaceholder: 'اختر النوع',
    itemsPlaceholder: 'مثال: 5',
    notesPlaceholder: 'اكتب هنا...',
    selectType: 'اختر النوع',
    mens: 'رجالي',
    womens: 'نسائي',
    unisex: 'للجنسين',
    selectCondition: 'اختر الحالة',
    newCondition: 'جديد',
    likeNew: 'كالجديد',
    good: 'جيد',
    fair: 'مقبول',
    submit: 'أرسل التبرع',
    note: 'تواصل مع المستفيد مباشرةً لتنسيق التسليم أو الاستلام.',
    errorFullName: 'الاسم مطلوب.',
    errorEmail: 'البريد الإلكتروني غير صالح.',
    errorType: 'اختر نوع الملابس.',
    errorItems: 'أدخل عددًا صحيحًا.',
    success: 'تم إرسال التبرع. تواصل مع المستفيد مباشرةً لتنسيق التسليم.'
  }
};

const initialValues = {
  fullName: '',
  email: '',
  recipientName: '',
  recipientPhone: '',
  recipientAddress: '',
  type: '',
  items: '',
  size: '',
  condition: '',
  notes: ''
};

export default function Donate({ currentUser, lang = 'en', onToast = () => {}, onUserChange = () => {}, onDonationCreated = () => {} }) {
  const copy = translations[lang] || translations.en;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function updateField(event) {
    const { name, value } = event.target;
    setValues(current => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!values.fullName.trim()) nextErrors.fullName = copy.errorFullName;
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = copy.errorEmail;
    }
    if (!values.recipientName.trim()) nextErrors.recipientName = lang === 'ar' ? 'اسم المستفيد مطلوب.' : 'Please enter the recipient’s name.';
    const recipientPhone = values.recipientPhone.trim();
    const phoneDigits = recipientPhone.replace(/\D/g, '');
    if (!/^\+?[\d\s()-]+$/.test(recipientPhone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
      nextErrors.recipientPhone = lang === 'ar' ? 'أدخل رقم هاتف صحيحًا للمستفيد.' : 'Please enter a valid recipient phone number.';
    }
    if (!values.type) nextErrors.type = copy.errorType;
    if (!values.items || !Number.isInteger(Number(values.items)) || Number(values.items) <= 0) nextErrors.items = copy.errorItems;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const itemCount = Number(values.items);
    const donation = {
      id: Date.now(),
      userId: currentUser ? currentUser.id : null,
      userName: currentUser ? currentUser.name : values.fullName.trim(),
      userEmail: currentUser ? currentUser.email : values.email.trim(),
      name: values.fullName.trim(),
      email: values.email.trim(),
      recipientName: values.recipientName.trim(),
      recipientPhone: values.recipientPhone.trim(),
      recipientAddress: values.recipientAddress.trim(),
      type: copy[values.type],
      size: values.size.trim(),
      condition: values.condition,
      items: itemCount,
      status: 'submitted',
      notes: values.notes.trim(),
      date: new Date().toLocaleDateString(),
      timestamp: Date.now()
    };
    try {
      const storedDonations = JSON.parse(localStorage.getItem('aurum_donations') || '[]');
      const donations = Array.isArray(storedDonations) ? storedDonations : [];
      donations.push(donation);
      localStorage.setItem('aurum_donations', JSON.stringify(donations));
    } catch (error) {
      console.error('Unable to save the donation.', error);
      onToast(lang === 'ar' ? 'تعذر حفظ التبرع. يرجى المحاولة مرة أخرى.' : 'Unable to save your donation. Please try again.');
      return;
    }
    if (currentUser) {
      const saved = Auth.updateUserStats(currentUser.id, { itemsDonated: (currentUser.itemsDonated || 0) + itemCount });
      if (!saved) {
        onToast(lang === 'ar' ? 'تم حفظ التبرع، لكن تعذر تحديث إحصاءات الحساب.' : 'Donation saved, but account statistics could not be updated.');
      } else {
        onUserChange(Auth.getCurrentUser());
      }
    }

    onDonationCreated(donation);
    onToast(copy.success);
    setValues(initialValues);
    setErrors({});
  }

  return (
    <>
      <section className="relative py-16 px-4 text-center">
        <p className="uppercase text-xs tracking-[6px] accent mb-3 font-semibold" data-i18n="hero_sub">{copy.heroSub}</p>
        <h1 className="font-display text-5xl md:text-6xl font-light mb-4 support" id="heroTagline" data-i18n="hero_title">
          {copy.heroTitle.split(' ').slice(0, -1).join(' ')} <span className="accent font-semibold">{copy.heroTitle.split(' ').slice(-1)}</span>
        </h1>
        <p className="text-gray-300 max-w-lg mx-auto text-sm" data-i18n="hero_desc">{copy.heroDesc}</p>
      </section>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        <section className="donation-form-card mx-auto bg-card border border-[#222] rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.35)] p-8 sm:p-10 lg:p-12">
          <div className="max-w-3xl mx-auto">
            <p className="uppercase text-xs tracking-[6px] accent mb-3 font-semibold" data-i18n="donation_title">{copy.donationTitle}</p>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold mb-4 support" data-i18n="donation_heading">{copy.donationHeading}</h2>
            <p className="text-gray-300 text-sm mb-10" data-i18n="donation_desc">{copy.donationDesc}</p>
            <form id="donationForm" className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <label className="form-label" htmlFor="fullName" data-i18n="label_fullName">{copy.fullName}</label>
                  <input id="fullName" name="fullName" type="text" autoComplete="name" required className={`form-input${errors.fullName ? ' border-red-500' : ''}`} placeholder={copy.fullNamePlaceholder} data-i18n-placeholder="placeholder_fullName" value={values.fullName} onChange={updateField} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'errorFullName' : undefined} />
                  <p className="error-text" id="errorFullName">{errors.fullName || ''}</p>
                </div>
                <div>
                  <label className="form-label" htmlFor="email" data-i18n="label_email">{copy.email}</label>
                  <input id="email" name="email" type="email" autoComplete="email" required className={`form-input${errors.email ? ' border-red-500' : ''}`} placeholder={copy.emailPlaceholder} data-i18n-placeholder="placeholder_email" value={values.email} onChange={updateField} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'errorEmail' : undefined} />
                  <p className="error-text" id="errorEmail">{errors.email || ''}</p>
                </div>
              </div>
              <div className="border-t border-[#222] pt-6">
                <h3 className="font-display text-xl font-semibold mb-2">{lang === 'ar' ? 'بيانات الشخص المستفيد' : 'Person receiving the donation'}</h3>
                <p className="text-gray-500 text-sm mb-5">{lang === 'ar' ? 'اكتب بيانات التواصل التي ستستخدمها لتنسيق التسليم مباشرةً.' : 'Add contact details so you can coordinate the handoff directly.'}</p>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <label className="form-label" htmlFor="recipientName">{copy.recipientName}</label>
                    <input id="recipientName" name="recipientName" type="text" autoComplete="name" required className={`form-input${errors.recipientName ? ' border-red-500' : ''}`} placeholder={copy.recipientNamePlaceholder} value={values.recipientName} onChange={updateField} aria-invalid={Boolean(errors.recipientName)} aria-describedby={errors.recipientName ? 'errorRecipientName' : undefined} />
                    <p className="error-text" id="errorRecipientName">{errors.recipientName || ''}</p>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="recipientPhone">{copy.recipientPhone}</label>
                    <input id="recipientPhone" name="recipientPhone" type="tel" autoComplete="tel" required className={`form-input${errors.recipientPhone ? ' border-red-500' : ''}`} placeholder={copy.recipientPhonePlaceholder} value={values.recipientPhone} onChange={updateField} aria-invalid={Boolean(errors.recipientPhone)} aria-describedby={errors.recipientPhone ? 'errorRecipientPhone' : undefined} />
                    <p className="error-text" id="errorRecipientPhone">{errors.recipientPhone || ''}</p>
                  </div>
                  <div className="lg:col-span-2">
                    <label className="form-label" htmlFor="recipientAddress">{copy.recipientAddress}</label>
                    <input id="recipientAddress" name="recipientAddress" type="text" autoComplete="street-address" className="form-input" placeholder={copy.recipientAddressPlaceholder} value={values.recipientAddress} onChange={updateField} />
                  </div>
                </div>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <label className="form-label" htmlFor="type" data-i18n="label_type">{copy.type}</label>
                  <select id="type" name="type" required className={`form-input${errors.type ? ' border-red-500' : ''}`} data-i18n-placeholder="placeholder_type" value={values.type} onChange={updateField} aria-invalid={Boolean(errors.type)} aria-describedby={errors.type ? 'errorType' : undefined}>
                    <option value="" data-i18n="option_selectType">{copy.selectType}</option>
                    <option value="mens" data-i18n="option_mens">{copy.mens}</option>
                    <option value="womens" data-i18n="option_womens">{copy.womens}</option>
                    <option value="unisex" data-i18n="option_unisex">{copy.unisex}</option>
                  </select>
                  <p className="error-text" id="errorType">{errors.type || ''}</p>
                </div>
                <div>
                  <label className="form-label" htmlFor="items" data-i18n="label_items">{copy.items}</label>
                  <input id="items" name="items" type="number" min="1" step="1" required className={`form-input${errors.items ? ' border-red-500' : ''}`} placeholder={copy.itemsPlaceholder} data-i18n-placeholder="placeholder_items" value={values.items} onChange={updateField} aria-invalid={Boolean(errors.items)} aria-describedby={errors.items ? 'errorItems' : undefined} />
                  <p className="error-text" id="errorItems">{errors.items || ''}</p>
                </div>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <label className="form-label" htmlFor="size" data-i18n="label_size">{copy.size}</label>
                  <input id="size" name="size" type="text" className="form-input" placeholder={copy.sizePlaceholder} data-i18n-placeholder="placeholder_size" value={values.size} onChange={updateField} />
                  <p className="error-text" id="errorSize"></p>
                </div>
                <div>
                  <label className="form-label" htmlFor="condition" data-i18n="label_condition">{copy.condition}</label>
                  <select id="condition" name="condition" className="form-input" value={values.condition} onChange={updateField}>
                    <option value="" data-i18n="option_condition_select">{copy.selectCondition}</option>
                    <option value="new" data-i18n="option_condition_new">{copy.newCondition}</option>
                    <option value="like_new" data-i18n="option_condition_like_new">{copy.likeNew}</option>
                    <option value="good" data-i18n="option_condition_good">{copy.good}</option>
                    <option value="fair" data-i18n="option_condition_fair">{copy.fair}</option>
                  </select>
                  <p className="error-text" id="errorCondition"></p>
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="notes" data-i18n="label_notes">{copy.notes}</label>
                <textarea id="notes" name="notes" rows="4" className="form-input" placeholder={copy.notesPlaceholder} data-i18n-placeholder="placeholder_notes" value={values.notes} onChange={updateField}></textarea>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button id="donateButton" type="submit" className="gold-btn w-full sm:w-auto py-3 text-sm uppercase tracking-wider d-btn p-10" data-i18n="submit_button">{copy.submit}</button>
                <p className="text-gray-500 text-xs" data-i18n="note_text">{copy.note}</p>
              </div>
            </form>
          </div>
        </section>
      </main>

    </>
  );
}
