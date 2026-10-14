import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Header, Footer, ScrollToTop, Toast } from './components/SiteLayout.jsx';
import { CartModal, createDonationRecord, DonationModal, ProductModal } from './components/Commerce.jsx';
import HelpChat from './components/HelpChat.jsx';
import { Auth } from './services/auth.js';
import { addCartItem, getCartItemId } from './services/cart.js';
import { assetUrl } from './assets.js';
import { products } from './data/products.js';
import { readStoredList, readStoredMap, writeStoredList, writeStoredMap } from './services/commerceStore.js';
import About from './pages/About.jsx';
import CharityDetail from './pages/CharityDetail.jsx';
import Charities from './pages/Charities.jsx';
import Contact from './pages/Contact.jsx';
import Donate from './pages/Donate.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Profile from './pages/Profile.jsx';

function readStoredCart() {
  try {
    const stored = JSON.parse(localStorage.getItem('aurum_cart') || '[]');
    return Array.isArray(stored)
      ? stored.map((item) => ({
        ...item,
        img: assetUrl(item.img),
        cartId: getCartItemId(item),
      }))
      : [];
  } catch (error) {
    console.error('Unable to load the saved cart.', error);
    return [];
  }
}

function readUser() {
  return Auth.getCurrentUser();
}

function getPage() {
  const pathname = window.location.pathname;
  const filename = pathname.split('/').pop()?.replace(/\.html$/, '') || 'index';
  const pageByFilename = {
    index: 'home',
    productes: 'products',
    profile: 'profile',
    donate: 'donate',
    about: 'about',
    contact: 'contact',
    ourcharities: 'charities',
    misrelkheir: 'charity-detail',
    orman: 'charity-detail',
    resala: 'charity-detail',
  };
  return pageByFilename[filename] || 'home';
}

const toastMessages = {
  added_to_cart: ['Item added to cart', 'تمت إضافة المنتج إلى السلة'],
  contact_success: ['✅ Thank you! Your message has been sent.', '✅ شكرًا لك! تم إرسال رسالتك.'],
};

export default function App() {
  const page = getPage();
  const appRef = useRef(null);
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('site_lang') === 'ar' ? 'ar' : 'en';
    } catch (error) {
      console.error('Unable to read the selected language.', error);
      return 'en';
    }
  });
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('aurum_theme') !== 'light';
    } catch (error) {
      console.error('Unable to read the selected theme.', error);
      return true;
    }
  });
  const [user, setUser] = useState(readUser);
  const [cart, setCart] = useState(readStoredCart);
  const [orders, setOrders] = useState(() => readStoredList('aurum_orders'));
  const [donationRecords, setDonationRecords] = useState(() => readStoredList('aurum_donations'));
  const [customProducts, setCustomProducts] = useState(() => readStoredList('aurum_custom_products'));
  const [notifications, setNotifications] = useState(() => readStoredList('aurum_notifications'));
  const [stockOverrides, setStockOverrides] = useState(() => readStoredMap('aurum_stock_overrides'));
  const [priceOverrides, setPriceOverrides] = useState(() => readStoredMap('aurum_price_overrides'));
  const [reviewsByProduct, setReviewsByProduct] = useState(() => readStoredMap('aurum_reviews'));
  const [toast, setToast] = useState('');
  const [product, setProduct] = useState(null);
  const [donationProduct, setDonationProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(() => new URLSearchParams(window.location.search).get('openCart') === '1');
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + (Number(item.qty) || 1), 0), [cart]);
  const catalogProducts = useMemo(() => [...products, ...customProducts].map((product) => ({
    ...product,
    price: Number(priceOverrides[product.id] ?? product.price),
    stock: Number(stockOverrides[product.id] ?? product.stock),
  })), [customProducts, priceOverrides, stockOverrides]);
  const reviewableProductIds = useMemo(() => new Set(orders
    .filter((order) => order.userId === user?.id && order.status === 'delivered')
    .flatMap((order) => order.items.map((item) => item.productId))
    .filter((productId) => !(reviewsByProduct[productId] || []).some((review) => review.userId === user?.id))), [orders, reviewsByProduct, user]);

  const dismissToast = useCallback(() => setToast(''), []);
  const showToast = useCallback((message) => {
    const translated = toastMessages[message];
    setToast(translated ? translated[lang === 'ar' ? 1 : 0] : message);
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('site_lang', lang);
    } catch (error) {
      console.error('Unable to save the selected language.', error);
    }
  }, [lang]);

  useEffect(() => {
    const titles = {
      home: 'Home',
      products: 'Products',
      profile: 'Profile',
      donate: 'Donate',
      about: 'About',
      contact: 'Contact',
      charities: 'Our Charities',
      'charity-detail': 'Charity',
    };
    const charityTitles = {
      misrelkheir: 'Misr El Kheir Foundation',
      orman: 'Orman Association',
      resala: 'Resala Charity',
    };
    const filename = window.location.pathname.split('/').pop()?.replace(/\.html$/, '');
    document.title = `${charityTitles[filename] || titles[page] || 'Home'} | Clothes Bridge`;
  }, [page]);

  useEffect(() => {
    const background = darkMode ? '#0b0d10' : '#f5f7fb';
    const surface = darkMode ? '#141920' : '#ffffff';
    const foreground = darkMode ? '#f4f7fb' : '#1f2937';
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
    document.documentElement.style.setProperty('--bg', background);
    document.documentElement.style.setProperty('--card', surface);
    document.documentElement.style.setProperty('--text', foreground);
    document.body.style.background = background;
    document.body.style.color = foreground;
    try {
      localStorage.setItem('aurum_theme', darkMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Unable to save the selected theme.', error);
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('aurum_cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Unable to save the cart.', error);
      showToast(lang === 'ar' ? 'تعذر حفظ عربة التسوق.' : 'Unable to save your cart.');
    }
  }, [cart, lang, showToast]);

  useEffect(() => {
    const role = user?.userType;
    const forbidden = !user && page !== 'profile'
      || page === 'donate' && role !== 'donor'
      || page === 'charities' && role !== 'charity';
    if (forbidden) {
      if (!user) {
        try {
          localStorage.setItem('redirectAfterLogin', page);
        } catch (error) {
          console.error('Unable to save the page to return to after signing in.', error);
        }
      }
      window.location.replace(!user ? 'profile.html?action=login' : 'index.html');
    }
  }, [page, user]);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === 'aurum_auth') setUser(readUser());
      if (event.key === 'aurum_cart') setCart(readStoredCart());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addToCart = useCallback((item) => {
    setCart((current) => addCartItem(current, item));
    setProduct(null);
    showToast('added_to_cart');
  }, [showToast]);

  const pushNotification = useCallback((notification) => {
    const nextNotifications = [notification, ...readStoredList('aurum_notifications')];
    if (!writeStoredList('aurum_notifications', nextNotifications)) return false;
    setNotifications(nextNotifications);
    return true;
  }, []);

  const openDonation = useCallback((selectedProduct) => {
    setProduct(null);
    setDonationProduct(selectedProduct);
  }, []);

  const submitProductDonation = useCallback((donation) => {
    const record = createDonationRecord(donation, user, lang);
    try {
      const storedDonations = JSON.parse(localStorage.getItem('aurum_donations') || '[]');
      const donations = Array.isArray(storedDonations) ? storedDonations : [];
      localStorage.setItem('aurum_donations', JSON.stringify([...donations, record]));
      setDonationRecords([...donations, record]);
    } catch (error) {
      console.error('Unable to save the product donation.', error);
      showToast(lang === 'ar' ? 'تعذر حفظ التبرع.' : 'Unable to save the donation.');
      return;
    }
    if (user) {
      Auth.updateUserStats(user.id, { itemsDonated: (user.itemsDonated || 0) + donation.quantity });
      setUser(Auth.getCurrentUser());
    }
    setCart((current) => [...current, record.cartItem]);
    setDonationProduct(null);
    if (user?.id) {
      pushNotification({ id: Date.now(), userId: user.id, type: 'donation', donationId: record.id, message: 'Your donation request was received.', messageAr: 'تم استلام طلب تبرعك.', read: false, timestamp: Date.now() });
    }
    showToast(lang === 'ar' ? 'تمت إضافة التبرع إلى السلة' : 'Item added to cart');
  }, [lang, pushNotification, showToast, user]);

  const removeFromCart = useCallback((itemToRemove) => {
    setCart((current) => current.filter((item) => item !== itemToRemove));
  }, []);
  const clearCart = useCallback(() => setCart([]), []);

  const completeOrder = useCallback((order) => {
    const nextStock = { ...stockOverrides };
    for (const item of order.items) {
      const product = catalogProducts.find((entry) => String(entry.id) === String(item.productId ?? item.originalProductId));
      if (!product) continue;
      const currentStock = Number(nextStock[product.id] ?? product.stock);
      const quantity = Number(item.qty) || 1;
      if (currentStock < quantity) {
        showToast(lang === 'ar' ? 'الكمية المطلوبة غير متاحة.' : 'The requested quantity is unavailable.');
        return false;
      }
      nextStock[product.id] = currentStock - quantity;
    }

    const nextOrders = [...readStoredList('aurum_orders'), { ...order, status: 'processing' }];
    if (!writeStoredMap('aurum_stock_overrides', nextStock) || !writeStoredList('aurum_orders', nextOrders)) {
      showToast(lang === 'ar' ? 'تعذر إتمام الطلب. حاول مرة أخرى.' : 'Unable to complete your order. Please try again.');
      return false;
    }
    setStockOverrides(nextStock);
    setOrders(nextOrders);
    if (user) {
      const quantity = order.items.reduce((sum, item) => sum + (Number(item.qty) || 1), 0);
      Auth.updateUserStats(user.id, { ordersPlaced: (user.ordersPlaced || 0) + quantity });
      setUser(Auth.getCurrentUser());
    }
    pushNotification({ id: Date.now(), userId: user?.id, type: 'order', orderId: order.id, message: 'Your order is being processed.', messageAr: 'طلبك قيد التجهيز.', read: false, timestamp: Date.now() });
    return true;
  }, [catalogProducts, lang, pushNotification, showToast, stockOverrides, user]);

  const updateOrderStatus = useCallback((orderId, status) => {
    const nextOrders = orders.map((order) => order.id === orderId ? { ...order, status, updatedAt: Date.now() } : order);
    if (!writeStoredList('aurum_orders', nextOrders)) return false;
    setOrders(nextOrders);
    const order = nextOrders.find((entry) => entry.id === orderId);
    if (order?.userId) {
      const messages = {
        processing: ['Your order is being processed.', 'طلبك قيد التجهيز.'],
        shipped: ['Your order has shipped.', 'تم شحن طلبك.'],
        delivered: ['Your order was delivered. You can now review its items.', 'تم تسليم طلبك. يمكنك الآن تقييم المنتجات.'],
        cancelled: ['Your order was cancelled.', 'تم إلغاء طلبك.'],
      };
      const [message, messageAr] = messages[status] || messages.processing;
      pushNotification({ id: Date.now(), userId: order.userId, type: 'order', orderId, message, messageAr, read: false, timestamp: Date.now() });
    }
    return true;
  }, [orders, pushNotification]);

  const updateDonationStatus = useCallback((donationId, status) => {
    const nextDonations = donationRecords.map((donation) => String(donation.id) === String(donationId) ? { ...donation, status, updatedAt: Date.now() } : donation);
    if (!writeStoredList('aurum_donations', nextDonations)) return false;
    setDonationRecords(nextDonations);
    if (status !== 'submitted') {
      const donation = nextDonations.find((entry) => entry.id === donationId);
      if (donation?.userId) {
        const messages = {
          reviewed: ['Your donation request is under review.', 'طلب تبرعك قيد المراجعة.'],
          pickup_scheduled: ['A pickup time has been scheduled.', 'تم تحديد موعد استلام التبرع.'],
          completed: ['Your donation has been completed.', 'اكتمل التبرع.'],
          rejected: ['Your donation request could not be completed.', 'تعذر إكمال طلب التبرع.'],
        };
        const [message, messageAr] = messages[status] || messages.reviewed;
        pushNotification({ id: Date.now(), userId: donation.userId, type: 'donation', donationId, message, messageAr, read: false, timestamp: Date.now() });
      }
    }
    return true;
  }, [donationRecords, pushNotification]);

  const refreshDonations = useCallback((donation) => {
    setDonationRecords(readStoredList('aurum_donations'));
    if (user?.id) {
      pushNotification({ id: Date.now(), userId: user.id, type: 'donation', donationId: donation.id, message: 'Your donation request was received.', messageAr: 'تم استلام طلب تبرعك.', read: false, timestamp: Date.now() });
    }
  }, [pushNotification, user]);

  const updateInventory = useCallback((productId, quantity) => {
    const value = Number(quantity);
    if (!Number.isInteger(value) || value < 0) return false;
    const nextStock = { ...stockOverrides, [productId]: value };
    if (!writeStoredMap('aurum_stock_overrides', nextStock)) return false;
    setStockOverrides(nextStock);
    return true;
  }, [stockOverrides]);

  const updateProductPrice = useCallback((productId, price) => {
    const value = Number(price);
    if (!Number.isFinite(value) || value < 0) return false;
    const nextPrices = { ...priceOverrides, [productId]: value };
    if (!writeStoredMap('aurum_price_overrides', nextPrices)) return false;
    setPriceOverrides(nextPrices);
    return true;
  }, [priceOverrides]);

  const addCatalogProduct = useCallback((details) => {
    const name = String(details.name || '').trim();
    const arabicName = String(details.arabicName || '').trim();
    const price = Number(details.price);
    const stock = Number(details.stock);
    const colors = String(details.colors || '').split(',').map((value) => value.trim()).filter(Boolean);
    const sizes = String(details.sizes || '').split(',').map((value) => value.trim()).filter(Boolean);
    if (!name || !arabicName || !Number.isFinite(price) || price < 0 || !Number.isInteger(stock) || stock < 0 || !colors.length || !sizes.length) return false;
    const newProduct = {
      id: `custom-${Date.now()}`,
      n: name,
      an: arabicName,
      c: details.category === 'women' ? 'women' : 'men',
      img: assetUrl(String(details.image || '').trim() || 'images/product-placeholder.svg'),
      desc: String(details.description || name).trim(),
      ad: String(details.arabicDescription || arabicName).trim(),
      colors,
      sizes,
      selectedColor: colors[0],
      selectedSize: sizes[0],
      price,
      stock,
    };
    const nextProducts = [...customProducts, newProduct];
    if (!writeStoredList('aurum_custom_products', nextProducts)) return false;
    setCustomProducts(nextProducts);
    return true;
  }, [customProducts]);

  const submitProductReview = useCallback(({ productId, rating, comment }) => {
    const deliveredOrder = orders.find((order) => order.userId === user?.id
      && order.status === 'delivered'
      && order.items.some((item) => String(item.productId) === String(productId))
      && !readStoredList('aurum_reviews')[productId]?.some((review) => review.orderId === order.id));
    if (!deliveredOrder || !Number.isInteger(rating) || rating < 1 || rating > 5) return false;
    const nextReviews = {
      ...reviewsByProduct,
      [productId]: [...(reviewsByProduct[productId] || []), {
        id: Date.now(), orderId: deliveredOrder.id, userId: user.id, userName: user.name, rating,
        comment: String(comment || '').trim(), timestamp: Date.now(),
      }],
    };
    if (!writeStoredMap('aurum_reviews', nextReviews)) return false;
    setReviewsByProduct(nextReviews);
    return true;
  }, [orders, reviewsByProduct, user]);

  const markNotificationRead = useCallback((notificationId) => {
    const nextNotifications = notifications.map((item) => item.id === notificationId ? { ...item, read: true } : item);
    if (!writeStoredList('aurum_notifications', nextNotifications)) return;
    setNotifications(nextNotifications);
  }, [notifications]);

  const pageProps = {
    lang,
    user,
    currentUser: user,
    onToast: showToast,
    onUserChange: setUser,
    onOpenProduct: setProduct,
    onAddToCart: addToCart,
    onDonate: openDonation,
    stockOverrides,
    catalogProducts,
    orders,
    donationRecords,
    notifications: notifications.filter((item) => item.userId === user?.id),
    reviewsByProduct,
    reviewableProductIds,
    onUpdateOrderStatus: updateOrderStatus,
    onUpdateDonationStatus: updateDonationStatus,
    onDonationCreated: refreshDonations,
    onUpdateInventory: updateInventory,
    onUpdateProductPrice: updateProductPrice,
    onAddCatalogProduct: addCatalogProduct,
    onSubmitProductReview: submitProductReview,
    onMarkNotificationRead: markNotificationRead,
  };
  const pageContent = {
    home: <Home {...pageProps} />,
    products: <Products {...pageProps} />,
    profile: <Profile {...pageProps} />,
    donate: <Donate {...pageProps} />,
    about: <About {...pageProps} />,
    contact: <Contact {...pageProps} />,
    charities: <Charities {...pageProps} />,
    'charity-detail': <CharityDetail {...pageProps} />,
  }[page];

  return (
    <div id="app" ref={appRef} className="min-h-screen w-full site-shell">
      <Header
        page={page === 'charity-detail' ? 'charities' : page}
        user={user}
        lang={lang}
        darkMode={darkMode}
        cartCount={cartCount}
        notificationCount={notifications.filter((item) => item.userId === user?.id && !item.read).length}
        onToggleLang={() => setLang((current) => current === 'en' ? 'ar' : 'en')}
        onToggleTheme={() => setDarkMode((current) => !current)}
        onOpenCart={() => setCartOpen(true)}
      />
      {pageContent}
      <Footer lang={lang} />
      <Toast message={toast} onDismiss={dismissToast} />
      <ScrollToTop containerRef={appRef} />
      <HelpChat lang={lang} />
      <ProductModal product={product} lang={lang} canDonate={user?.userType === 'donor'} canReview={product && reviewableProductIds.has(product.id)} reviews={product ? reviewsByProduct[product.id] || [] : []} onClose={() => setProduct(null)} onAddToCart={addToCart} onDonate={openDonation} onSubmitReview={submitProductReview} />
      <DonationModal product={donationProduct} lang={lang} onClose={() => setDonationProduct(null)} onSubmit={submitProductDonation} />
      <CartModal
        open={cartOpen}
        cart={cart}
        lang={lang}
        user={user}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onClear={clearCart}
        onToast={showToast}
        onUserChange={setUser}
        onOrderPlaced={completeOrder}
      />
    </div>
  );
}
