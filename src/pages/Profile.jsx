import { useEffect, useMemo, useState } from 'react';
import { TriangleAlert } from 'lucide-react';
import { Auth } from '../services/auth.js';
import { assetUrl } from '../assets.js';
import { formatPrice, products as defaultProducts } from '../data/products.js';

const REGISTER_TYPE_KEY = 'aurum_register_type';
const DONATION_FALLBACK_IMAGE = 'https://via.placeholder.com/80x80?text=Donation';

const translations = {
  en: {
    profile_title: 'My Profile',
    profile_subtitle: 'Manage your account and view your activity',
    not_logged_in: 'You are not logged in.',
    register: 'Register',
    sign_in: 'Sign In',
    logout: 'Logout',
    user_type: 'User Type',
    joined: 'Joined',
    orders_placed: 'Orders Placed',
    order_history: 'Order tracking',
    management: 'Operations dashboard',
    inventory: 'Inventory',
    donations_queue: 'Donation requests',
    notifications: 'Notifications',
    no_notifications: 'No notifications yet.',
    mark_read: 'Mark read',
    save_stock: 'Update stock',
    customer: 'Customer',
    status: 'Status',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    submitted: 'Submitted',
    reviewed: 'Reviewed',
    pickup_scheduled: 'Pickup scheduled',
    completed: 'Completed',
    rejected: 'Rejected',
    items_donated: 'Items Donated',
    positive_impact: 'Positive Impact',
    browse_shop: 'Browse Shop',
    donate_now: 'Donate Now',
    account_settings: 'Account Settings',
    recent_purchases: 'Recent Purchases',
    no_purchases: 'No purchases yet.',
    start_shopping: 'Start shopping',
    donations_made: 'Donations Made',
    recipient: 'Recipient',
    recipient_phone: 'Recipient phone',
    recipient_address: 'Handoff area',
    no_donations: 'No donations yet.',
    make_donation: 'Make your first donation',
    auth_title: 'Sign In / Register',
    email: 'Email',
    password: 'Password',
    no_account: "Don't have an account?",
    register_here: 'Register here',
    has_account: 'Already have an account?',
    signin_here: 'Sign in here',
    type_individual: '👤 Individual',
    type_donor: '💝 Donor',
    type_charity: '🤝 Charity',
    desc_individual: 'Shop for clothing and track your purchases.',
    desc_donor: 'Donate clothing and help people in need.',
    desc_charity: 'Register as a charity organization to coordinate donations.',
    org_name: 'Organization Name',
    checkout_full_name: 'Full Name',
    checkout_phone: 'Phone Number',
    checkout_address: 'Address',
    no_account_fields: 'Please fill in all fields.',
    required_fields: 'Please fill in all required fields.',
    logged_in: 'Successfully logged in!',
    registered: 'Account created successfully!',
    logged_out: 'Logged out successfully.',
    logout_title: 'Logout',
    logout_confirm: 'Are you sure you want to logout?',
    yes_logout: 'Yes, logout',
    cancel: 'Cancel',
    coming_soon: 'Coming Soon!',
    settings_message: 'Account Settings page coming soon! Currently you can only update your profile through logout/login.',
    close: 'Close',
    message_included: 'Message included',
    donated: '✓ Donated',
    user_type_prefix: 'User Type:',
    items_suffix: 'items',
    donated_items: 'donated',
    clothing_suffix: 'Clothing',
    general: 'General',
    donation: 'Donation'
  },
  ar: {
    profile_title: 'ملفي الشخصي',
    profile_subtitle: 'إدارة حسابك وعرض نشاطك',
    not_logged_in: 'لم تسجل الدخول.',
    register: 'إنشاء حساب',
    sign_in: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    user_type: 'نوع المستخدم',
    joined: 'تاريخ الانضمام',
    orders_placed: 'الطلبات',
    order_history: 'متابعة الطلبات',
    management: 'لوحة إدارة العمليات',
    inventory: 'المخزون',
    donations_queue: 'طلبات التبرع',
    notifications: 'الإشعارات',
    no_notifications: 'لا توجد إشعارات حتى الآن.',
    mark_read: 'تحديد كمقروء',
    save_stock: 'تحديث المخزون',
    customer: 'العميل',
    status: 'الحالة',
    processing: 'قيد التجهيز',
    shipped: 'تم الشحن',
    delivered: 'تم التسليم',
    cancelled: 'ملغي',
    submitted: 'مُرسل',
    reviewed: 'قيد المراجعة',
    pickup_scheduled: 'تم تحديد موعد الاستلام',
    completed: 'مكتمل',
    rejected: 'مرفوض',
    items_donated: 'العناصر المتبرع بها',
    positive_impact: 'الأثر الإيجابي',
    browse_shop: 'تصفح المتجر',
    donate_now: 'تبرع الآن',
    account_settings: 'إعدادات الحساب',
    recent_purchases: 'المشتريات الأخيرة',
    no_purchases: 'لا توجد مشتريات حتى الآن.',
    start_shopping: 'ابدأ التسوق',
    donations_made: 'التبرعات المقدمة',
    recipient: 'المستفيد',
    recipient_phone: 'هاتف المستفيد',
    recipient_address: 'مكان التسليم',
    no_donations: 'لا توجد تبرعات حتى الآن.',
    make_donation: 'قدم تبرعك الأول',
    auth_title: 'تسجيل الدخول / إنشاء حساب',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    no_account: 'ليس لديك حساب؟',
    register_here: 'أنشئ حسابًا',
    has_account: 'لديك حساب بالفعل؟',
    signin_here: 'سجل الدخول',
    type_individual: '👤 فرد',
    type_donor: '💝 متبرع',
    type_charity: '🤝 جمعية خيرية',
    desc_individual: 'تسوق الملابس وتابع مشترياتك.',
    desc_donor: 'تبرع بالملابس وساعد المحتاجين.',
    desc_charity: 'سجل كجمعية خيرية لتنسيق التبرعات.',
    org_name: 'اسم المؤسسة',
    checkout_full_name: 'الاسم الكامل',
    checkout_phone: 'رقم الهاتف',
    checkout_address: 'العنوان',
    no_account_fields: 'يرجى تعبئة جميع الحقول.',
    required_fields: 'يرجى تعبئة جميع الحقول المطلوبة.',
    logged_in: 'تم تسجيل الدخول بنجاح!',
    registered: 'تم إنشاء الحساب بنجاح!',
    logged_out: 'تم تسجيل الخروج بنجاح.',
    logout_title: 'تسجيل الخروج',
    logout_confirm: 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
    yes_logout: 'نعم، تسجيل الخروج',
    cancel: 'إلغاء',
    coming_soon: 'قريبًا!',
    settings_message: 'صفحة إعدادات الحساب قادمة قريبًا! يمكنك حاليًا تحديث ملفك الشخصي عبر تسجيل الخروج ثم الدخول مجددًا.',
    close: 'إغلاق',
    message_included: 'تتضمن رسالة',
    donated: '✓ تم التبرع',
    user_type_prefix: 'نوع المستخدم:',
    items_suffix: 'عناصر',
    donated_items: 'تم التبرع بها',
    clothing_suffix: 'ملابس',
    general: 'عام',
    donation: 'تبرع'
  }
};

const fieldDefinitions = {
  individual: [
    ['checkout_full_name', 'registerName', 'text'],
    ['email', 'registerEmail', 'email'],
    ['password', 'registerPassword', 'password']
  ],
  donor: [
    ['checkout_full_name', 'registerName', 'text'],
    ['email', 'registerEmail', 'email'],
    ['checkout_phone', 'registerPhone', 'tel'],
    ['checkout_address', 'registerAddress', 'text'],
    ['password', 'registerPassword', 'password']
  ],
  charity: [
    ['org_name', 'registerName', 'text'],
    ['email', 'registerEmail', 'email'],
    ['checkout_address', 'registerAddress', 'text'],
    ['password', 'registerPassword', 'password']
  ]
};

function readStoredRegisterType() {
  try {
    const storedType = localStorage.getItem(REGISTER_TYPE_KEY);
    return fieldDefinitions[storedType] ? storedType : 'individual';
  } catch {
    return 'individual';
  }
}

function readStoredList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export default function Profile({ currentUser, lang = 'en', catalogProducts = defaultProducts, orders: allOrders = [], donationRecords = [], stockOverrides = {}, notifications = [], onToast = () => {}, onUserChange = () => {}, onUpdateOrderStatus = () => false, onUpdateDonationStatus = () => false, onUpdateInventory = () => false, onUpdateProductPrice = () => false, onAddCatalogProduct = () => false, onMarkNotificationRead = () => {} }) {
  const locale = lang === 'ar' ? 'ar' : 'en';
  const text = (key) => translations[locale][key] || translations.en[key] || key;
  const [profileUser, setProfileUser] = useState(currentUser || null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signIn');
  const [registerType, setRegisterType] = useState(readStoredRegisterType);
  const [signInValues, setSignInValues] = useState({ email: '', password: '' });
  const [registerValues, setRegisterValues] = useState({});
  const [signInError, setSignInError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [notice, setNotice] = useState(null);
  const [inventoryDraft, setInventoryDraft] = useState({});
  const [priceDraft, setPriceDraft] = useState({});
  const [newProduct, setNewProduct] = useState({ name: '', arabicName: '', category: 'women', image: '', description: '', arabicDescription: '', price: '', stock: '', colors: '', sizes: '' });

  useEffect(() => {
    if (!currentUser) {
      setProfileUser(null);
      return;
    }

    let user = currentUser;
    if (!user.avatar || !user.avatar.startsWith('data:image/svg+xml')) {
      user = { ...user, avatar: Auth.createInitialsAvatar(user.name) };
      try {
        localStorage.setItem('aurum_auth', JSON.stringify(user));
      } catch {
        // The in-memory profile remains usable when storage is unavailable.
      }
      onUserChange(user);
    }
    setProfileUser(user);
  }, [currentUser, onUserChange]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('action=login') && !currentUser) {
      setAuthOpen(true);
    }
  }, [currentUser]);

  const isCharity = profileUser?.userType === 'charity';
  const userOrders = useMemo(() => allOrders
    .filter((order) => isCharity || order.userId === profileUser?.id)
    .slice()
    .sort((first, second) => second.timestamp - first.timestamp), [allOrders, isCharity, profileUser]);
  const purchases = useMemo(() => userOrders.flatMap((order) => order.items.map((item) => ({
    ...item,
    id: `${order.id}-${item.productId}`,
    n: item.name,
    orderId: order.id,
    orderStatus: order.status,
  }))), [userOrders]);
  const donations = useMemo(() => {
    const matching = isCharity ? donationRecords : donationRecords.filter((item) => item.userId === profileUser?.id);
    const sorted = matching
      .slice()
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    return isCharity ? sorted : sorted.slice(0, 10);
  }, [donationRecords, isCharity, profileUser]);

  const ordersPlaced = Number(profileUser?.ordersPlaced) || 0;
  const itemsDonated = Number(profileUser?.itemsDonated) || 0;
  const impact = isCharity ? itemsDonated * 3 : (ordersPlaced + itemsDonated) * 2;

  function openAuth(mode = 'signIn') {
    setAuthMode(mode);
    setSignInError('');
    setRegisterError('');
    setAuthOpen(true);
  }

  function switchAuthMode() {
    setAuthMode((mode) => mode === 'signIn' ? 'register' : 'signIn');
    setSignInError('');
    setRegisterError('');
  }

  function returnHomeAfterSignIn() {
    try {
      localStorage.removeItem('redirectAfterLogin');
    } catch (error) {
      console.error('Unable to clear the saved destination after signing in.', error);
    }
    window.location.replace('index.html');
  }

  function selectRegisterType(type) {
    setRegisterType(type);
    setRegisterValues({});
    setRegisterError('');
    try {
      localStorage.setItem(REGISTER_TYPE_KEY, type);
    } catch {
      // Registration still works when local storage is unavailable.
    }
  }

  function handleSignIn(event) {
    event.preventDefault();
    const { email, password } = signInValues;
    if (!email.trim() || !password) {
      setSignInError(text('no_account_fields'));
      return;
    }

    const result = Auth.login(email.trim(), password);
    if (!result.success) {
      setSignInError(result.message);
      return;
    }
    const user = Auth.getCurrentUser();
    setProfileUser(user);
    onUserChange(user);
    onToast(text('logged_in'));
    setAuthOpen(false);
    returnHomeAfterSignIn();
  }

  function handleRegister(event) {
    event.preventDefault();
    const fields = fieldDefinitions[registerType];
    if (fields.some(([, id]) => !String(registerValues[id] || '').trim())) {
      setRegisterError(text('required_fields'));
      return;
    }

    const name = registerValues.registerName || '';
    const email = registerValues.registerEmail || '';
    const password = registerValues.registerPassword || '';
    const result = Auth.register(name.trim(), email.trim(), password, registerType);
    if (!result.success) {
      setRegisterError(result.message);
      return;
    }
    const user = Auth.getCurrentUser();
    setProfileUser(user);
    onUserChange(user);
    onToast(text('registered'));
    setAuthOpen(false);
    returnHomeAfterSignIn();
  }

  function handleLogout() {
    setNotice({
      title: text('logout_title'),
      message: text('logout_confirm'),
      confirmLabel: text('yes_logout'),
      onConfirm: () => {
        const result = Auth.logout();
        if (!result.success) {
          setNotice({ title: text('logout_title'), message: result.message, confirmLabel: text('close') });
          return;
        }
        onUserChange(null);
        setProfileUser(null);
        setNotice(null);
        onToast(text('logged_out'));
      }
    });
  }

  function openAccountSettings() {
    setNotice({
      title: text('coming_soon'),
      message: text('settings_message'),
      confirmLabel: text('close')
    });
  }

  const selectedFields = fieldDefinitions[registerType];

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <section className="relative py-16 px-4 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-light mb-4">
          {text('profile_title')} <span className="accent font-semibold">✓</span>
        </h1>
        <p className="text-gray-300 max-w-lg mx-auto text-sm">{text('profile_subtitle')}</p>
      </section>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        {!profileUser ? (
          <div className="text-center py-20">
            <p className="text-gray-300 mb-4">{text('not_logged_in')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button type="button" onClick={() => openAuth('register')} className="gold-btn py-3 px-8 text-sm uppercase tracking-wider">{text('register')}</button>
              <button type="button" onClick={() => openAuth('signIn')} className="outline-btn py-3 px-8 text-sm uppercase tracking-wider">{text('sign_in')}</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-card border border-[#222] rounded-3xl p-8 mb-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img src={profileUser.avatar} alt="Avatar" className="w-32 h-32 rounded-full border-2 border-[rgb(51, 153, 255)]" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-1">{profileUser.name}</h2>
                  <p className="text-gray-300 mb-2">{profileUser.email}</p>
                  <p className="text-sm text-[rgb(51, 153, 255)] font-medium mb-2">
                    {profileUser.userType ? `${text('user_type_prefix')} ${profileUser.userType}` : ''}
                  </p>
                  <p className="text-xs text-gray-500">{text('joined')} {profileUser.joinedDate}</p>
                </div>
                <button type="button" onClick={handleLogout} className="outline-btn py-2 px-6 text-sm uppercase tracking-wider">{text('logout')}</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card border border-[#222] rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition">
                <p className="text-4xl accent font-bold mb-2">{isCharity ? 0 : ordersPlaced}</p>
                <p className="text-gray-300 text-sm">{text('orders_placed')}</p>
              </div>
              <div className="bg-card border border-[#222] rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition">
                <p className="text-4xl accent font-bold mb-2">{itemsDonated}</p>
                <p className="text-gray-300 text-sm">{text('items_donated')}</p>
              </div>
              <div className="bg-card border border-[#222] rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition">
                <p className="text-4xl accent font-bold mb-2">{impact}</p>
                <p className="text-gray-300 text-sm">{text('positive_impact')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {!isCharity && <a href="productes.html" className="gold-btn py-3 px-6 text-sm uppercase tracking-wider text-center">{text('browse_shop')}</a>}
              {!isCharity && <a href="donate.html" className="outline-btn py-3 px-6 text-sm uppercase tracking-wider text-center">{text('donate_now')}</a>}
              <button type="button" onClick={openAccountSettings} className="border border-[#333] text-white py-3 px-6 text-sm uppercase tracking-wider hover:border-[rgb(51, 153, 255)] transition">{text('account_settings')}</button>
            </div>

            <section id="notifications" className="bg-card border border-[#222] rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">{text('notifications')}</h3>
              {notifications.length === 0
                ? <p className="text-sm text-gray-400">{text('no_notifications')}</p>
                : <ul className="divide-y divide-[#222]">
                {notifications.slice(0, 10).map((notification) => <li key={notification.id} className="flex items-start justify-between gap-4 py-3">
                  <p className={`text-sm ${notification.read ? 'text-gray-400' : 'text-white font-medium'}`}>{locale === 'ar' ? notification.messageAr : notification.message}</p>
                  {!notification.read && <button type="button" className="outline-btn px-3 py-1 text-xs" onClick={() => onMarkNotificationRead(notification.id)}>{text('mark_read')}</button>}
                </li>)}
              </ul>}
            </section>

            {isCharity && <section className="bg-card border border-[#222] rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-6">{text('management')}</h3>
              <form className="management-create-form mb-8" onSubmit={(event) => {
                event.preventDefault();
                if (onAddCatalogProduct(newProduct)) {
                  onToast(locale === 'ar' ? 'تمت إضافة المنتج.' : 'Product added.');
                  setNewProduct({ name: '', arabicName: '', category: 'women', image: '', description: '', arabicDescription: '', price: '', stock: '', colors: '', sizes: '' });
                } else {
                  onToast(locale === 'ar' ? 'تحقق من السعر والمخزون والألوان والمقاسات.' : 'Check the price, stock, colors, and sizes.');
                }
              }}>
                <h4 className="font-semibold mb-4">{locale === 'ar' ? 'إضافة منتج' : 'Add a product'}</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="management-field">{locale === 'ar' ? 'الاسم بالإنجليزية' : 'English name'}<input required value={newProduct.name} onChange={(event) => setNewProduct((current) => ({ ...current, name: event.target.value }))} /></label>
                  <label className="management-field">{locale === 'ar' ? 'الاسم بالعربية' : 'Arabic name'}<input required value={newProduct.arabicName} onChange={(event) => setNewProduct((current) => ({ ...current, arabicName: event.target.value }))} /></label>
                  <label className="management-field">{locale === 'ar' ? 'الفئة' : 'Category'}<select value={newProduct.category} onChange={(event) => setNewProduct((current) => ({ ...current, category: event.target.value }))}><option value="women">{locale === 'ar' ? 'نسائي' : 'Women'}</option><option value="men">{locale === 'ar' ? 'رجالي' : 'Men'}</option></select></label>
                  <label className="management-field">{locale === 'ar' ? 'رابط الصورة' : 'Image URL'}<input type="url" value={newProduct.image} onChange={(event) => setNewProduct((current) => ({ ...current, image: event.target.value }))} placeholder="https://..." /></label>
                  <label className="management-field">{locale === 'ar' ? 'الوصف بالإنجليزية' : 'English description'}<input value={newProduct.description} onChange={(event) => setNewProduct((current) => ({ ...current, description: event.target.value }))} /></label>
                  <label className="management-field">{locale === 'ar' ? 'الوصف بالعربية' : 'Arabic description'}<input value={newProduct.arabicDescription} onChange={(event) => setNewProduct((current) => ({ ...current, arabicDescription: event.target.value }))} /></label>
                  <label className="management-field">{locale === 'ar' ? 'السعر' : 'Price'}<input type="number" min="0" step="1" required value={newProduct.price} onChange={(event) => setNewProduct((current) => ({ ...current, price: event.target.value }))} /></label>
                  <label className="management-field">{locale === 'ar' ? 'الكمية المتاحة' : 'Stock quantity'}<input type="number" min="0" step="1" required value={newProduct.stock} onChange={(event) => setNewProduct((current) => ({ ...current, stock: event.target.value }))} /></label>
                  <label className="management-field">{locale === 'ar' ? 'الألوان، مفصولة بفواصل' : 'Colors, comma separated'}<input required value={newProduct.colors} onChange={(event) => setNewProduct((current) => ({ ...current, colors: event.target.value }))} placeholder="Black, Navy" /></label>
                  <label className="management-field">{locale === 'ar' ? 'المقاسات، مفصولة بفواصل' : 'Sizes, comma separated'}<input required value={newProduct.sizes} onChange={(event) => setNewProduct((current) => ({ ...current, sizes: event.target.value }))} placeholder="S, M, L" /></label>
                </div>
                <button type="submit" className="gold-btn mt-4 px-5 py-2 text-sm">{locale === 'ar' ? 'إضافة المنتج' : 'Add product'}</button>
              </form>
              <div className="mb-8">
                <h4 className="font-semibold mb-2">{text('inventory')}</h4>
                {catalogProducts.map((product) => <form key={product.id} className="management-row flex flex-wrap items-center justify-between gap-3" onSubmit={(event) => {
                  event.preventDefault();
                  const value = inventoryDraft[product.id] ?? stockOverrides[product.id] ?? product.stock;
                  const price = priceDraft[product.id] ?? product.price;
                  const stockUpdated = onUpdateInventory(product.id, value);
                  const priceUpdated = onUpdateProductPrice(product.id, price);
                  if (stockUpdated && priceUpdated) {
                    onToast(locale === 'ar' ? 'تم تحديث المخزون.' : 'Stock updated.');
                    setInventoryDraft((draft) => { const next = { ...draft }; delete next[product.id]; return next; });
                    setPriceDraft((draft) => { const next = { ...draft }; delete next[product.id]; return next; });
                  } else {
                    onToast(locale === 'ar' ? 'تحقق من السعر والكمية.' : 'Check the price and stock quantity.');
                  }
                }}>
                  <div className="min-w-0 flex-1"><p className="text-sm font-medium">{locale === 'ar' ? product.an : product.n}</p></div>
                  <label className="sr-only" htmlFor={`price-${product.id}`}>{locale === 'ar' ? 'السعر' : 'Price'} {product.n}</label>
                  <input id={`price-${product.id}`} type="number" min="0" step="1" value={priceDraft[product.id] ?? product.price} onChange={(event) => setPriceDraft((draft) => ({ ...draft, [product.id]: event.target.value }))} />
                  <label className="sr-only" htmlFor={`stock-${product.id}`}>{text('inventory')} {product.n}</label>
                  <input id={`stock-${product.id}`} type="number" min="0" step="1" value={inventoryDraft[product.id] ?? stockOverrides[product.id] ?? product.stock} onChange={(event) => setInventoryDraft((draft) => ({ ...draft, [product.id]: event.target.value }))} />
                  <button type="submit" className="outline-btn px-3 py-2 text-xs">{text('save_stock')}</button>
                </form>)}
              </div>
              <div className="mb-8">
                <h4 className="font-semibold mb-2">{text('order_history')}</h4>
                {allOrders.length === 0 ? <p className="text-sm text-gray-400">{text('no_purchases')}</p> : allOrders.slice().sort((first, second) => second.timestamp - first.timestamp).map((order) => <div key={order.id} className="management-row flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0 flex-1"><p className="text-sm font-medium">#{String(order.id).slice(-6)} · {order.userName}</p><p className="text-xs text-gray-400">{order.items.map((item) => `${item.name} × ${item.qty}`).join(', ')}</p><p className="text-xs accent">{formatPrice(order.total, locale)}</p></div>
                  <label className="sr-only" htmlFor={`order-status-${order.id}`}>{text('status')}</label>
                  <select id={`order-status-${order.id}`} value={order.status || 'processing'} onChange={(event) => { if (onUpdateOrderStatus(order.id, event.target.value)) onToast(locale === 'ar' ? 'تم تحديث حالة الطلب.' : 'Order status updated.'); }}>
                    {['processing', 'shipped', 'delivered', 'cancelled'].map((status) => <option key={status} value={status}>{text(status)}</option>)}
                  </select>
                </div>)}
              </div>
              <div>
                <h4 className="font-semibold mb-2">{text('donations_queue')}</h4>
                {donations.length === 0 ? <p className="text-sm text-gray-400">{text('no_donations')}</p> : donations.map((donation) => <div key={donation.id} className="management-row flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0 flex-1"><p className="text-sm font-medium">{donation.productName || donation.type || text('donation')}</p><p className="text-xs text-gray-400">{donation.userName} · {donation.recipientName || donation.charityName || ''}</p><p className="text-xs text-gray-400">{donation.items || donation.quantity || 1} {text('items_suffix')}</p></div>
                  <label className="sr-only" htmlFor={`donation-status-${donation.id}`}>{text('status')}</label>
                  <select id={`donation-status-${donation.id}`} value={donation.status || 'submitted'} onChange={(event) => { if (onUpdateDonationStatus(donation.id, event.target.value)) onToast(locale === 'ar' ? 'تم تحديث حالة التبرع.' : 'Donation status updated.'); }}>
                    {['submitted', 'reviewed', 'pickup_scheduled', 'completed', 'rejected'].map((status) => <option key={status} value={status}>{text(status)}</option>)}
                  </select>
                </div>)}
              </div>
            </section>}

            {!isCharity && <section id="orderTracking" className="bg-card border border-[#222] rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">{text('order_history')}</h3>
              {userOrders.length === 0
                ? <p className="text-gray-400 text-sm">{text('no_purchases')}</p>
                : userOrders.map((order) => <article key={order.id} className="order-tracking-row">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">#{String(order.id).slice(-6)}</p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                    <span className={`order-status status-${order.status || 'processing'}`}>{text(order.status === 'demo' ? 'processing' : order.status || 'processing')}</span>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm text-gray-300">
                    {order.items.map((item, index) => <li key={`${item.productId}-${index}`}>{item.name} × {item.qty}</li>)}
                  </ul>
                  <p className="mt-3 text-sm accent font-semibold">{formatPrice(order.total, locale)}</p>
                </article>)}
            </section>}

            {!isCharity && (
              <>
                <div className="bg-card border border-[#222] rounded-3xl p-8 mb-8 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">{text('recent_purchases')}</h3>
                  {purchases.length === 0 ? (
                    <p className="text-gray-400 text-sm">{text('no_purchases')} <a href="productes.html" className="accent hover:underline">{text('start_shopping')}</a></p>
                  ) : purchases.map((item, index) => (
                    <div key={`${item.id || item.n || 'purchase'}-${index}`} className="flex items-center gap-3 py-3 border-b border-[#222] last:border-b-0">
                      <img src={assetUrl(item.img)} alt="" className="w-12 h-12 rounded object-cover" loading="lazy" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.n}</p>
                        <p className="text-xs text-gray-400">${item.price} × {item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-card border border-[#222] rounded-3xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">{text('donations_made')}</h3>
                  {donations.length === 0 ? (
                    <p className="text-gray-400 text-sm">{text('no_donations')} <a href="donate.html" className="accent hover:underline">{text('make_donation')}</a></p>
                  ) : donations.map((donation, index) => {
                    const displayName = donation.productName || (donation.type ? `${donation.type} ${text('clothing_suffix')}` : text('donation'));
                    const displayCharity = donation.charityName || donation.charity || text('general');
                    const itemCount = donation.items || donation.quantity || '1';
                    const displayDesc = donation.productDesc ? `${donation.productDesc.substring(0, 60)}...` : '';
                    const productImg = donation.productImg || DONATION_FALLBACK_IMAGE;
                    return (
                      <div key={`${donation.id || donation.timestamp || 'donation'}-${index}`} className="bg-card border border-[#222] rounded-xl p-4 mb-4 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <img src={assetUrl(productImg)} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold mb-1 truncate">{displayName}</h3>
                            {displayDesc && <p className="text-xs text-gray-400 mb-2 line-clamp-2">{displayDesc}</p>}
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray-400">
                                {donation.recipientName && <p className="mb-1">{text('recipient')}: {donation.recipientName}</p>}
                                {donation.recipientPhone && <p className="mb-1">{text('recipient_phone')}: <span dir="ltr">{donation.recipientPhone}</span></p>}
                                {donation.recipientAddress && <p className="mb-1">{text('recipient_address')}: {donation.recipientAddress}</p>}
                                <p className="mb-1">
                                  {itemCount} {locale === 'en' ? `${text('items_suffix')} ` : ''}{text('donated_items')}
                                </p>
                                <p className="mb-1">{donation.date}</p>
                                <p className="accent font-medium">{displayCharity}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {donation.message && <span className="text-xs text-gray-500 italic">{text('message_included')}</span>}
                                <span className={`order-status status-${donation.status || 'submitted'}`}>{text(donation.status || 'submitted')}</span>
                              </div>
                            </div>
                            {donation.message && <p className="text-xs text-gray-500 mt-2 italic border-t border-[#222] pt-2">"{donation.message}"</p>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {authOpen && (
        <div className="modal-overlay active" onClick={() => setAuthOpen(false)}>
          <div className="modal-panel max-w-md" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold accent">{text('auth_title')}</h2>
              <button type="button" onClick={() => setAuthOpen(false)} className="hover:text-[rgb(51, 153, 255)] transition" aria-label={text('close')}>×</button>
            </div>

            <div className="space-y-6">
              {authMode === 'signIn' ? (
                <div>
                  <h3 className="text-lg font-semibold mb-4">{text('sign_in')}</h3>
                  <form onSubmit={handleSignIn} className="space-y-3">
                    <input type="email" className="form-input w-full" placeholder={text('email')} value={signInValues.email || ''} onChange={(event) => setSignInValues({ ...signInValues, email: event.target.value })} required />
                    <input type="password" className="form-input w-full" placeholder={text('password')} value={signInValues.password || ''} onChange={(event) => setSignInValues({ ...signInValues, password: event.target.value })} required />
                    <p className="error-text text-sm">{signInError}</p>
                    <button type="submit" className="gold-btn w-full py-2 text-sm uppercase tracking-wider">{text('sign_in')}</button>
                  </form>
                  <p className="text-center text-sm text-gray-400 mt-4">
                    {text('no_account')} <button type="button" onClick={switchAuthMode} className="accent hover:underline">{text('register_here')}</button>
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold mb-4">{text('register')}</h3>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">{text('user_type')}</label>
                        <div className="flex gap-3">
                          {['individual', 'donor', 'charity'].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => selectRegisterType(type)}
                              className="register-user-type-btn flex-1 py-2.5 px-3 rounded-lg border text-gray-300 hover:border-[rgb(51, 153, 255)] hover:text-[rgb(51, 153, 255)] transition font-medium text-sm"
                              style={registerType === type
                                ? { backgroundColor: 'rgb(51, 153, 255)', borderColor: 'rgb(51, 153, 255)', color: 'white' }
                                : { backgroundColor: 'transparent', borderColor: '#333', color: '#9ca3af' }}
                            >
                              {text(`type_${type}`)}
                            </button>
                          ))}
                        </div>
                        <p className="text-sm text-gray-400 mt-3 transition-all duration-300">{text(`desc_${registerType}`)}</p>
                      </div>

                      <div className="space-y-4">
                        {selectedFields.map(([labelKey, id, type]) => (
                          <div key={id} className="field transition-all duration-300">
                            <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{text(labelKey)}</label>
                            <input
                              id={id}
                              className="form-input w-full"
                              type={type}
                              placeholder={text(labelKey)}
                              value={registerValues[id] || ''}
                              onChange={(event) => setRegisterValues({ ...registerValues, [id]: event.target.value })}
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="error-text text-sm">{registerError}</p>
                    <button type="submit" className="gold-btn w-full py-2 text-sm uppercase tracking-wider">{text('register')}</button>
                  </form>
                  <p className="text-center text-sm text-gray-400 mt-4">
                    {text('has_account')} <button type="button" onClick={switchAuthMode} className="accent hover:underline">{text('signin_here')}</button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {notice && (
        notice.onConfirm ? (
          <div className="sweet-alert-overlay" onClick={() => setNotice(null)}>
            <div className="sweet-alert-dialog" role="alertdialog" aria-modal="true" aria-labelledby="logoutAlertTitle" aria-describedby="logoutAlertMessage" onClick={(event) => event.stopPropagation()}>
              <div className="sweet-alert-icon"><TriangleAlert size={38} strokeWidth={1.8} /></div>
              <h2 id="logoutAlertTitle">{notice.title}</h2>
              <p id="logoutAlertMessage">{notice.message}</p>
              <div className="sweet-alert-actions">
                <button type="button" className="sweet-alert-cancel" onClick={() => setNotice(null)}>{text('cancel')}</button>
                <button type="button" className="sweet-alert-confirm" onClick={notice.onConfirm}>{notice.confirmLabel}</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-overlay active" onClick={() => setNotice(null)}>
            <div className="modal-panel max-w-md" onClick={(event) => event.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold accent">{notice.title}</h2>
                <button type="button" onClick={() => setNotice(null)} className="hover:text-[rgb(51, 153, 255)] transition" aria-label={text('close')}>×</button>
              </div>
              <p className="text-gray-300 mb-6">{notice.message}</p>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setNotice(null)} className="gold-btn py-2 px-6 text-sm">{notice.confirmLabel}</button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
