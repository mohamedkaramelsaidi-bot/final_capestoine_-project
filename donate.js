const donationForm = document.getElementById('donationForm');
const toastElement = document.getElementById('toast');
const langBtn = document.getElementById('langBtn');
const langStorageKey = 'site_lang';
let currentLang = 'en';
let darkMode = false;

const translations = {
  en: {
    nav_home: 'Home',
    nav_products: 'Products',
    nav_donate: 'Donate',
    nav_contact: 'Contact',
    hero_sub: 'Support Our Vision',
    hero_title: 'Support Our Vision',
    hero_desc: 'Help us continue creating luxury fashion experiences.',
    donation_title: 'Donation Form',
    donation_heading: 'Give to our next luxury collection',
    donation_desc: 'Complete the form below to support ClothBridge and help us deliver premium fashion experiences.',
    label_fullName: 'Full Name *',
    label_email: 'Email *',
    label_type: 'Clothing Type *',
    label_items: 'Number of Items *',
    label_size: 'Size',
    label_condition: 'Condition',
    label_notes: 'Additional Notes',
    placeholder_fullName: 'Your full name',
    placeholder_email: 'email@example.com',
    placeholder_size: 'e.g. M, L, 40',
    placeholder_type: 'Select type',
    placeholder_items: 'e.g. 5',
    placeholder_notes: 'Write here...',
    option_selectType: 'Select type',
    option_mens: "Men's",
    option_womens: "Women's",
    option_unisex: 'Unisex',
    option_condition_select: 'Select condition',
    option_condition_new: 'New',
    option_condition_like_new: 'Like New',
    option_condition_good: 'Good',
    option_condition_fair: 'Fair',
    submit_button: 'Submit Donation',
    note_text: 'All donations support our next luxury collection.',
    error_fullName: 'Please enter your full name.',
    error_email: 'Please enter a valid email address.',
    error_type: 'Please select a clothing type.',
    error_items: 'Please enter a valid number of items.',
    toast_success: 'Thank you! Your donation has been submitted.',
    toast_cart: 'Cart is not active on this page.',
    brand_name_html: '<span class="accent">Cloth</span>Bridge',
    footer_copy: 'ClothBridge. All rights reserved.',
    ft_shop: 'Shop',
    ft_men: "Men's Collection",
    ft_women: "Women's Collection",
    ft_new: 'New Arrivals',
    ft_support: 'Support',
    ft_faq: 'FAQ',
    ft_shipping: 'Shipping',
    ft_returns: 'Returns',
    ft_follow: 'Follow Us',
    footer_desc: 'Luxury fashion crafted for those who demand excellence in every detail.'
  },
  ar: {
    nav_home: 'الرئيسية',
    nav_products: 'المنتجات',
    nav_donate: 'تبرع',
    nav_contact: 'اتصل',
    hero_sub: 'ادعم رؤيتنا',
    hero_title: 'ادعم رؤيتنا',
    hero_desc: 'ساعدنا على الاستمرار في خلق تجارب أزياء فاخرة.',
    donation_title: 'نموذج التبرع',
    donation_heading: 'ساهم في مجموعتنا الفاخرة القادمة',
    donation_desc: 'أكمل النموذج أدناه لدعم ClothBridge ومساعدتنا في تقديم تجارب أزياء فاخرة.',
    label_fullName: 'الاسم بالكامل *',
    label_email: 'البريد الإلكتروني *',
    label_type: 'نوع الملابس *',
    label_items: 'عدد القطع *',
    label_size: 'المقاس',
    label_condition: 'حالة المنتج',
    label_notes: 'ملاحظات إضافية',
    placeholder_fullName: 'اسمك الكامل',
    placeholder_email: 'example@domain.com',
    placeholder_type: 'اختر النوع',
    placeholder_items: 'مثال: 5',
    placeholder_notes: 'اكتب هنا...',
    option_selectType: 'اختر النوع',
    option_mens: 'رجالي',
    option_womens: 'نسائي',
    option_unisex: 'للجنسين',
    option_condition_select: 'اختر الحالة',
    option_condition_new: 'جديد',
    option_condition_like_new: 'كالجديد',
    option_condition_good: 'جيد',
    option_condition_fair: 'مقبول',
    submit_button: 'أرسل التبرع',
    note_text: 'جميع التبرعات تدعم مجموعتنا الفاخرة القادمة.',
    error_fullName: 'الاسم مطلوب.',
    error_email: 'البريد الإلكتروني غير صالح.',
    error_type: 'اختر نوع الملابس.',
    error_items: 'أدخل عددًا صحيحًا.',
    toast_success: 'تم إرسال التبرع بنجاح.',
    toast_cart: 'عربة التسوق غير متاحة في هذه الصفحة.',
    brand_name_html: '<span class="accent">جسر</span> ملابس',
    footer_copy: 'جسر ملابس. جميع الحقوق محفوظة.',
    ft_shop: 'تسوق',
    ft_men: 'مجموعة الرجال',
    ft_women: 'مجموعة النساء',
    ft_new: 'جديد',
    ft_support: 'الدعم',
    ft_faq: 'الأسئلة',
    ft_shipping: 'الشحن',
    ft_returns: 'الإرجاع',
    ft_follow: 'تابعنا',
    footer_desc: 'أزياء فاخرة مصممة لمن يطلبون التميز في كل تفصيل.'
  }
};

function t(key) {
  return translations[currentLang][key] || translations.en[key] || key;
}

function saveLang() {
  try {
    localStorage.setItem(langStorageKey, currentLang);
  } catch (e) {
    // ignore storage errors
  }
}

function loadLang() {
  try {
    const savedLang = localStorage.getItem(langStorageKey);
    if (savedLang === 'ar' || savedLang === 'en') {
      currentLang = savedLang;
    }
  } catch (e) {
    // ignore storage errors
  }
}

function accentizeText(text) {
  const words = text.split(' ');
  if (words.length < 2) return `<span class="accent font-semibold">${text}</span>`;
  const last = words.pop();
  return `${words.join(' ')} <span class="accent font-semibold">${last}</span>`;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (element.id === 'heroTagline') {
      element.innerHTML = accentizeText(t(key));
    } else if (element.tagName === 'OPTION') {
      element.textContent = t(key);
    } else {
      element.textContent = t(key);
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.getAttribute('data-i18n-placeholder'));
  });

  const navBrand = document.getElementById('nav-brand');
  const footerBrand = document.getElementById('footer-brand');
  const footerCopyText = document.getElementById('footerCopyText');
  if (navBrand) navBrand.innerHTML = t('brand_name_html');
  if (footerBrand) footerBrand.innerHTML = t('brand_name_html');
  if (footerCopyText) footerCopyText.textContent = t('footer_copy');

  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = currentLang === 'ar' ? 'ar' : 'en';
  if (langBtn) langBtn.textContent = currentLang === 'ar' ? 'EN' : 'AR';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(id, messageKey) {
  const errorEl = document.getElementById(`error${id.charAt(0).toUpperCase() + id.slice(1)}`);
  const field = document.getElementById(id);
  if (errorEl) errorEl.textContent = t(messageKey);
  if (field) field.classList.add('border-red-500');
}

function clearErrors() {
  document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-input').forEach(el => el.classList.remove('border-red-500'));
}

function showToast(messageKey) {
  toastElement.textContent = t(messageKey);
  toastElement.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toastElement.classList.remove('show'), 3000);
}

function toggleLang() {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  saveLang();
  applyTranslations();
  
  // Re-apply translations to nav and footer
  const nav = document.querySelector('main-nav');
  if (nav && nav.applyNavTranslations) nav.applyNavTranslations();
  const footer = document.querySelector('main-footer');
  if (footer && footer.applyFooterTranslations) footer.applyFooterTranslations();
}

function applyTheme() {
  document.body.classList.toggle('dark-mode', darkMode);
  document.body.classList.toggle('light-mode', !darkMode);
  const icon = document.querySelector('button[onclick="toggleTheme()"] i');
  if (icon) {
    icon.setAttribute('data-lucide', darkMode ? 'moon' : 'sun');
    lucide.createIcons();
  }
}

function loadTheme() {
  try {
    const savedTheme = localStorage.getItem('aurum_theme');
    darkMode = savedTheme === 'light' ? false : true;
  } catch (e) {
    darkMode = true;
  }
  applyTheme();
}

function toggleTheme() {
  darkMode = !darkMode;
  applyTheme();
  try {
    localStorage.setItem('aurum_theme', darkMode ? 'dark' : 'light');
  } catch (e) {
    // ignore storage errors
  }
}

function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('active');
}

function openCart() {
  window.location.href = 'productes.html?openCart=1';
}

function loadCartCount() {
  try {
    const saved = localStorage.getItem('aurum_cart');
    const cart = saved ? JSON.parse(saved) : [];
    const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const el = document.getElementById('cartCount');
    if (el) {
      if (count > 0) {
        el.style.display = 'inline-flex';
        el.textContent = count;
      } else {
        el.style.display = 'none';
      }
    }
  } catch (e) {
    // ignore
  }
}

loadLang();
applyTranslations();

window.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  loadCartCount();
  lucide.createIcons();
});

donationForm.addEventListener('submit', event => {
  event.preventDefault();
  clearErrors();

  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const type = document.getElementById('type');
  const items = document.getElementById('items');
  const size = document.getElementById('size');
  const condition = document.getElementById('condition');

  let valid = true;

  if (!fullName.value.trim()) {
    showError('fullName', 'error_fullName');
    valid = false;
  }

  if (!email.value.trim() || !validateEmail(email.value)) {
    showError('email', 'error_email');
    valid = false;
  }

  if (!type.value) {
    showError('type', 'error_type');
    valid = false;
  }

  if (!items.value || Number(items.value) <= 0) {
    showError('items', 'error_items');
    valid = false;
  }

  // size and condition are optional, no strict validation required

  if (!valid) return;

  // Save donation to localStorage
  try {
    const currentUser = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
    const donation = {
      id: Date.now(),
      userId: currentUser ? currentUser.id : null,
      userName: currentUser ? currentUser.name : fullName.value.trim(),
      userEmail: currentUser ? currentUser.email : email.value.trim(),
      name: fullName.value.trim(),
      email: email.value.trim(),
      type: type.value,
      size: size ? size.value.trim() : '',
      condition: condition ? condition.value : '',
      items: Number(items.value),
      notes: document.getElementById('notes').value.trim(),
      date: new Date().toLocaleDateString(),
      timestamp: Date.now()
    };

    const donations = JSON.parse(localStorage.getItem('aurum_donations')) || [];
    donations.push(donation);
    localStorage.setItem('aurum_donations', JSON.stringify(donations));
    
    // Update user stats if logged in
    if (currentUser && typeof Auth !== 'undefined') {
      const updatedStats = {
        itemsDonated: (currentUser.itemsDonated || 0) + Number(items.value)
      };
      Auth.updateUserStats(currentUser.id, updatedStats);
    }
  } catch (e) {
    console.error('Error saving donation:', e);
  }

  showToast('toast_success');
  donationForm.reset();
});


