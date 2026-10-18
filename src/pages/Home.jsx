import {
  ArrowRight,
  Gift,
  Globe,
  HeartHandshake,
  ShieldCheck,
  ShoppingBag,
  Tag,
} from 'lucide-react';
import { assetUrl } from '../assets.js';
import { products } from '../data/products.js';
import { ProductGrid } from '../components/Commerce.jsx';

export default function Home({ lang, user, wishlistIds, onToggleWishlist, onOpenProduct, onAddToCart, onDonate }) {
  const ar = lang === 'ar';
  const features = [
    [HeartHandshake, 'Smart Donation System', 'Easy and organized way to donate clothes to those in need.', 'نظام تبرع ذكي', 'طريقة سهلة ومنظمة للتبرع بالملابس للمحتاجين.'],
    [ShieldCheck, 'Secure & Trusted Platform', 'Safe connection between donors and beneficiaries with verified transactions.', 'منصة آمنة وموثوقة', 'ربط آمن بين المتبرعين والمستفيدين مع معاملات موثقة.'],
    [Tag, 'Affordable Prices', 'Premium fashion at prices suitable for all budgets and occasions.', 'أسعار مناسبة', 'أزياء فاخرة بأسعار تناسب جميع الميزانيات والمناسبات.'],
    [Globe, 'Social Impact', 'Helping people and supporting communities worldwide through fashion.', 'تأثير اجتماعي', 'مساعدة الناس ودعم المجتمعات من خلال الأزياء.'],
  ];
  return (
    <>
      <section
        className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center px-4 overflow-hidden"
        style={{ backgroundImage: `url("${assetUrl('images/home-hero.jpg')}")`, backgroundPosition: 'center', backgroundSize: 'cover' }}
      >
        <div className="absolute inset-0 theme-overlay" />
        <div className="absolute inset-0 theme-gradient-bottom" />
        <div className="relative z-10 text-center max-w-3xl mx-auto hero-copy-enter">
          <p className="uppercase text-xs tracking-[6px] accent mb-3 font-semibold animate-fade-in">{ar ? 'أزياء فاخرة بمعايير جديدة' : 'Luxury Fashion Redefined'}</p>
          <h1 className="font-display text-5xl md:text-7xl font-light mb-4 leading-tight">{ar ? 'شارك الملابس وانشر اللطف في كل موسم' : 'Share Clothes, Spread Kindness Every Season'}</h1>
          <p className="text-gray-300 max-w-lg mx-auto text-sm md:text-base mb-8 leading-relaxed">
            {ar ? 'اكتشف أزياء فاخرة مختارة بأناقة. تسوق القطع الفاخرة أو تبرع بالملابس المستعملة بلطف لإحداث أثر حقيقي.' : 'Discover premium fashion curated for elegance. Shop luxury pieces or donate gently worn clothing to make a meaningful impact.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="productes.html" className="gold-btn py-3 px-8 text-sm uppercase tracking-wider">{ar ? 'تسوق الآن' : 'Shop Now'} <ShoppingBag size={16} className="inline ml-2" /></a>
            {user?.userType !== 'charity' && <a href="donate.html" className="outline-btn py-3 px-8 text-sm uppercase tracking-wider">{ar ? 'تبرع الآن' : 'Donate Now'} <Gift size={16} className="inline ml-2" /></a>}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-8 section-reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(([Icon, enTitle, enDesc, arTitle, arDesc]) => (
              <div key={enTitle} className="feature-card bg-card border border-[#222] rounded-xl p-6 text-center transition">
                <div className="feature-icon w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} />
                </div>
                <h4 className="text-lg font-semibold mb-2">{ar ? arTitle : enTitle}</h4>
                <p className="text-gray-300 text-sm">{ar ? arDesc : enDesc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 section-reveal">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <p className="uppercase text-xs tracking-[6px] accent mb-2 font-semibold">{ar ? 'تشكيلة مختارة' : 'Curated Selection'}</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold">{ar ? 'قطع مميزة' : 'Featured Pieces'}</h2>
            <p className="text-gray-300 text-sm mt-2">{ar ? 'أكثر قطعنا الفاخرة تميزًا لإثراء خزانة ملابسك.' : 'Our most coveted luxury items ready to elevate your wardrobe.'}</p>
          </div>
          <ProductGrid items={products.slice(0, 6)} lang={lang} canDonate={user?.userType === 'donor'} wishlistIds={wishlistIds} onToggleWishlist={onToggleWishlist} onOpenProduct={onOpenProduct} onAddToCart={onAddToCart} onDonate={onDonate} />
          <div className="text-center mt-8">
            <a href="productes.html" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider accent hover:text-white transition">{ar ? 'عرض المجموعة كاملة' : 'View Full Collection'} <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <section className="donation-story-band section-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 donation-story-layout">
          <div className="donation-story-image">
            <img src={assetUrl('images/mens-casual-polo.avif')} alt={ar ? 'معطف بيج معروض ضمن مجموعة الملابس' : 'Beige coat from the clothing collection'} loading="lazy" />
          </div>
          <div className="donation-story-copy">
            <p className="text-xs uppercase tracking-[0.2em] accent font-semibold mb-3">{ar ? 'عطاء يبدأ من خزانة ملابسك' : 'Giving starts in your wardrobe'}</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">{ar ? 'قطعة واحدة ممكن تبدأ حكاية جديدة' : 'One piece can start a new story'}</h2>
            <p className="text-gray-300 leading-relaxed mb-6">{ar ? 'اختار قطعة، وحدد الشريك الخيري المناسب لبدء التبرع.' : 'Choose an item and select a charity partner to get started.'}</p>
            {user?.userType !== 'charity' && <a href="donate.html" className="outline-btn donation-btn inline-flex items-center gap-2 px-6 py-3 text-sm uppercase tracking-wider">{ar ? 'ابدأ التبرع' : 'Start a donation'} <ArrowRight size={16} /></a>}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 section-reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="cta-card shop-cta rounded-xl p-8 md:p-10 flex flex-col justify-center">
              <h3 className="cta-title text-2xl md:text-3xl font-semibold mb-3">{ar ? 'هل أنت مستعد للتسوق؟' : 'Ready to Shop?'}</h3>
              <p className="cta-desc text-sm mb-6">{ar ? 'اكتشف مجموعتنا الحصرية من قطع الأزياء الفاخرة.' : 'Discover our exclusive collection of premium fashion pieces.'}</p>
              <a href="productes.html" className="cta-btn py-3 px-6 text-sm uppercase tracking-wider rounded-lg w-fit">{ar ? 'تصفح المجموعة' : 'Browse Collection'}</a>
            </div>
            <div className="cta-card donate-cta rounded-xl p-8 md:p-10 flex flex-col justify-center">
              <h3 className="cta-title text-2xl md:text-3xl font-semibold mb-3">{ar ? 'اصنع فرقًا' : 'Make a Difference'}</h3>
              <p className="cta-desc text-sm mb-6">{ar ? 'شارك ملابسك المستعملة بلطف وساعد المحتاجين.' : 'Share your gently worn clothes and help those in need.'}</p>
              {user?.userType !== 'charity' && <a href="donate.html" className="cta-btn donation-btn py-3 px-6 text-sm uppercase tracking-wider w-fit">{ar ? 'ابدأ التبرع' : 'Start Donating'}</a>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
