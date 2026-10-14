import { useEffect, useState } from 'react';
import {
  ChevronUp,
  Facebook,
  Bell,
  Instagram,
  Menu,
  Moon,
  ShoppingBag,
  Sun,
  Twitter,
  UserRound,
  X,
} from 'lucide-react';

const routes = [
  { href: 'index.html', key: 'home', en: 'Home', ar: 'الرئيسية' },
  { href: 'productes.html', key: 'products', en: 'Products', ar: 'المنتجات' },
  { href: 'donate.html', key: 'donate', en: 'Donate', ar: 'تبرع', role: 'donor' },
  { href: 'ourcharities.html', key: 'charities', en: 'Our Charities', ar: 'جمعياتنا', role: 'charity' },
  { href: 'about.html', key: 'about', en: 'About', ar: 'حول' },
  { href: 'contact.html', key: 'contact', en: 'Contact', ar: 'اتصل' },
];

export function Header({ page, user, lang, darkMode, cartCount, notificationCount = 0, onToggleLang, onToggleTheme, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = routes.filter((route) => !route.role || user?.userType === route.role);

  return (
    <nav className="sticky top-0 z-50 bg-card nav-shadow" style={{ borderBottom: '1px solid #222' }}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="index.html" className="font-display text-2xl font-bold tracking-widest" id="nav-brand">
          <span className="accent">Cloth</span>Bridge
        </a>
        <div className="desktop-nav flex items-center gap-8 text-sm tracking-wider uppercase" style={{ fontWeight: 500 }}>
          {navItems.map((item) => (
            <a key={item.key} href={item.href} aria-current={page === item.key ? 'page' : undefined} className={`nav-link hover:text-[rgb(51, 153, 255)] transition ${page === item.key ? 'is-active accent' : ''}`}>
              {lang === 'ar' ? item.ar : item.en}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button type="button" onClick={onToggleLang} className="text-xs border border-[#333] rounded-lg px-3 py-1.5 hover:border-[rgb(51, 153, 255)] transition" id="langBtn">
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
          <button type="button" onClick={onToggleTheme} className="hover:text-[rgb(51, 153, 255)] transition text-gray-300" title="Toggle theme" aria-label="Toggle theme">
            {darkMode ? <Moon className="nav-icon" size={18} strokeWidth={2} /> : <Sun className="nav-icon" size={18} strokeWidth={2} />}
          </button>
          <button type="button" className="relative hover:text-[rgb(51, 153, 255)] transition text-gray-300" onClick={onOpenCart} title="Shopping cart" aria-label="Shopping cart">
            <ShoppingBag className="nav-icon" size={18} strokeWidth={2} />
            <span className="cart-counter" id="cartCount" style={{ display: cartCount ? 'flex' : 'none' }}>{cartCount}</span>
          </button>
          <a href="profile.html#notifications" className="relative hover:text-[rgb(51, 153, 255)] transition text-gray-300" title={lang === 'ar' ? 'الإشعارات' : 'Notifications'} aria-label={lang === 'ar' ? `الإشعارات ${notificationCount}` : `Notifications ${notificationCount}`}>
            <Bell className="nav-icon" size={18} strokeWidth={2} />
            {notificationCount > 0 && <span className="cart-counter">{notificationCount > 9 ? '9+' : notificationCount}</span>}
          </a>
          <a href="profile.html" className="hover:text-[rgb(51, 153, 255)] transition text-gray-300" title={user?.name ? `Logged in as ${user.name}` : 'Sign in'} aria-label="Profile">
            <UserRound className="nav-icon" size={18} strokeWidth={2} />
          </a>
          <button type="button" className="mob-toggle items-center hover:text-[rgb(51, 153, 255)] transition text-gray-300" onClick={() => setMenuOpen((open) => !open)} title={lang === 'ar' ? 'القائمة' : 'Menu'} aria-label={lang === 'ar' ? 'القائمة' : 'Menu'} aria-expanded={menuOpen} aria-controls="mobileMenu">
            {menuOpen ? <X className="nav-icon" size={20} strokeWidth={2} /> : <Menu className="nav-icon" size={20} strokeWidth={2} />}
          </button>
        </div>
      </div>
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`} id="mobileMenu">
        <div className="flex flex-col gap-4 text-sm uppercase tracking-wider">
          {navItems.map((item) => (
            <a key={item.key} href={item.href} aria-current={page === item.key ? 'page' : undefined} className={`nav-link hover:text-[rgb(51, 153, 255)] transition ${page === item.key ? 'is-active accent' : ''}`}>
              {lang === 'ar' ? item.ar : item.en}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function Footer({ lang }) {
  const text = lang === 'ar'
    ? {
      desc: 'أزياء فاخرة مصممة لمن يطلبون التميز في كل تفصيل.',
      shop: 'تسوق',
      men: 'مجموعة الرجال',
      women: 'مجموعة النساء',
      new: 'جديد',
      support: 'الدعم',
      faq: 'الأسئلة',
      shipping: 'الشحن',
      returns: 'الإرجاع',
      follow: 'تابعنا',
      copy: 'جسر ملابس. جميع الحقوق محفوظة.',
      brand: 'جسر ملابس',
    }
    : {
      desc: 'Luxury fashion crafted for those who demand excellence in every detail.',
      shop: 'Shop',
      men: "Men's Collection",
      women: "Women's Collection",
      new: 'New Arrivals',
      support: 'Support',
      faq: 'FAQ',
      shipping: 'Shipping',
      returns: 'Returns',
      follow: 'Follow Us',
      copy: 'Clothes Bridge. All rights reserved.',
      brand: 'Clothes Bridge',
    };
  const year = new Date().getFullYear();
  return (
    <footer className="bg-card py-12 px-4" style={{ borderTop: '1px solid #222' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="font-display text-xl font-bold tracking-widest mb-3" id="footer-brand">
              <span className="accent">{text.brand.split(' ')[0]}</span> {text.brand.split(' ').slice(1).join(' ')}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">{text.desc}</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest accent mb-4 font-semibold">{text.shop}</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-300">
              <a href="productes.html" className="hover:text-white transition">{text.men}</a>
              <a href="productes.html" className="hover:text-white transition">{text.women}</a>
              <a href="productes.html" className="hover:text-white transition">{text.new}</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest accent mb-4 font-semibold">{text.support}</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-300">
              <a href="#" className="hover:text-white transition">{text.faq}</a>
              <a href="#" className="hover:text-white transition">{text.shipping}</a>
              <a href="#" className="hover:text-white transition">{text.returns}</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest accent mb-4 font-semibold">{text.follow}</h4>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[rgb(51, 153, 255)] hover:text-black transition"><Instagram size={16} /></a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[rgb(51, 153, 255)] hover:text-black transition"><Twitter size={16} /></a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[rgb(51, 153, 255)] hover:text-black transition"><Facebook size={16} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#222] pt-6 text-center text-xs text-gray-600" id="footerCopy">
          © <span id="year">{year}</span> <span id="footerCopyText">{text.copy}</span>
        </div>
      </div>
    </footer>
  );
}

export function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = window.setTimeout(onDismiss, 3000);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss]);
  return <div className={`toast ${message ? 'show' : ''}`} id="toast">{message}</div>;
}

export function ScrollToTop({ containerRef }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const container = containerRef.current;
    const onScroll = () => setVisible(Math.max(container?.scrollTop || 0, window.scrollY, document.documentElement.scrollTop) > 300);
    container?.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      container?.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScroll);
    };
  }, [containerRef]);
  return (
    <button type="button" className={`scroll-to-top ${visible ? 'show' : ''}`} title="Scroll to top" aria-label="Scroll to top" onClick={() => {
      const container = containerRef.current;
      container?.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    }}>
      <ChevronUp size={22} />
    </button>
  );
}
