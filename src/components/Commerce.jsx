import { useEffect, useMemo, useState } from 'react';
import { Check, ShoppingBag, Trash2, X } from 'lucide-react';
import { assetUrl } from '../assets.js';
import { formatPrice } from '../data/products.js';

const productImageFallback = assetUrl('images/product-placeholder.svg');
const productColors = {
  Black: ['#111318', 'أسود'], Navy: ['#172b4d', 'كحلي'], Charcoal: ['#3d434d', 'فحمي'],
  White: ['#f8fafc', 'أبيض'], Green: ['#25845a', 'أخضر'], Ivory: ['#f2ead9', 'عاجي'],
  Champagne: ['#d8bd8a', 'شامبانيا'], Beige: ['#c6ad88', 'بيج'], Cream: ['#f1e8d5', 'كريمي'],
  Gray: ['#8d96a3', 'رمادي'], Brown: ['#78513b', 'بني'], Cognac: ['#a96b3d', 'كونياك'],
  'Rose Gold': ['#bc827d', 'ذهبي وردي'], Blush: ['#d9a3a2', 'وردي هادئ'], Sapphire: ['#2563a6', 'ياقوتي'],
  Purple: ['#7952a0', 'بنفسجي'], Graphite: ['#4b5563', 'جرافيت'], Khaki: ['#9a8c62', 'كاكي'],
  Pearl: ['#e8e5df', 'لؤلؤي'], Silver: ['#aeb7c2', 'فضي'], Onyx: ['#252833', 'أونيكس'],
  Red: ['#bd3c42', 'أحمر'], Burgundy: ['#722f43', 'نبيذي'], Wine: ['#6f2944', 'خمري'],
  Platinum: ['#aeb4bb', 'بلاتيني'], Titanium: ['#717b85', 'تيتانيوم'], Gold: ['#c29a45', 'ذهبي'],
  Lilac: ['#b59acb', 'ليلكي'], Mauve: ['#a47787', 'موف'], Blue: ['#3478bd', 'أزرق'],
  Slate: ['#687789', 'أردوازي'], Coral: ['#e87568', 'مرجاني'], Peach: ['#e9a889', 'خوخي'],
  Orange: ['#df8141', 'برتقالي'],
};

function showProductImageFallback(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = productImageFallback;
}

export function ProductGrid({ items, lang, canDonate, stockOverrides = {}, reviewsByProduct = {}, onOpenProduct, onAddToCart, onDonate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((product, index) => {
        const stock = Number(stockOverrides[product.id] ?? product.stock);
        const reviews = reviewsByProduct[product.id] || [];
        const averageRating = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
        return <article className="product-card fade-up" key={product.id} style={{ animationDelay: `${(index % 6) * 0.035}s` }}>
          <button type="button" className="img-wrap" onClick={() => onOpenProduct(product)} aria-label={lang === 'ar' ? `عرض تفاصيل ${product.an}` : `View ${product.n} details`}>
            <span className="badge">{product.c === 'men' ? (lang === 'ar' ? 'رجالي' : 'Men') : (lang === 'ar' ? 'نسائي' : 'Women')}</span>
            <img src={product.img} alt="" loading="lazy" onError={showProductImageFallback} />
          </button>
          <div className="p-4">
            <h3 className="font-display text-lg font-semibold mb-1">{lang === 'ar' ? product.an : product.n}</h3>
            <div className="mb-3">
              <span className="accent font-bold text-lg">{formatPrice(product.price, lang)}</span>
              {reviews.length > 0 && <span className="product-review-summary" aria-label={`${averageRating.toFixed(1)} / 5`}><span aria-hidden="true">★</span> {averageRating.toFixed(1)} <span>({reviews.length})</span></span>}
              <span className={`product-stock ${stock > 0 ? 'available' : 'unavailable'}`}>
                {stock > 0 ? (lang === 'ar' ? `متاح: ${stock}` : `${stock} available`) : (lang === 'ar' ? 'نفد المخزون' : 'Out of stock')}
              </span>
            </div>
            <div className="flex gap-2">
              <button type="button" disabled={stock < 1} className="gold-btn flex-1 py-2 text-xs uppercase tracking-wider" onClick={() => onAddToCart({ ...product, stock })}>{lang === 'ar' ? 'شراء' : 'Buy'}</button>
              {canDonate && <button type="button" className="outline-btn donation-btn flex-1 py-2 text-xs uppercase tracking-wider" onClick={() => onDonate(product)}>{lang === 'ar' ? 'تبرع' : 'Donate'}</button>}
            </div>
          </div>
        </article>;
      })}
    </div>
  );
}

const donationCharities = [
  { id: 'resala', en: 'Resala Charity', ar: 'جمعية رسالة' },
  { id: 'misrelkheir', en: 'Misr El Kheir Foundation', ar: 'مؤسسة مصر الخير' },
  { id: 'orman', en: 'Orman Association', ar: 'جمعية الأورمان' },
];

export function ProductModal({ product, lang, canDonate, canReview, reviews = [], onClose, onAddToCart, onDonate, onSubmitReview }) {
  const [color, setColor] = useState(product?.selectedColor || '');
  const [size, setSize] = useState(product?.selectedSize || '');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  useEffect(() => {
    setColor(product?.selectedColor || '');
    setSize(product?.selectedSize || '');
    setReviewRating(5);
    setReviewComment('');
  }, [product]);
  if (!product) return null;
  const localizedName = lang === 'ar' ? product.an : product.n;
  return (
    <div className="modal-overlay active product-details-overlay" id="productModal" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-panel product-details-panel" role="dialog" aria-modal="true" aria-labelledby="productModalTitle">
        <div className="product-details-heading">
          <h2 id="productModalTitle" className="font-display text-2xl font-semibold accent">{lang === 'ar' ? 'تفاصيل المنتج' : 'Product Details'}</h2>
          <button type="button" onClick={onClose} className="hover:text-[rgb(51, 153, 255)] transition" aria-label="Close"><X size={22} /></button>
        </div>
        <div className="product-details-layout">
          <div className="product-details-image-wrap"><img src={product.img} alt={localizedName} className="product-details-image" loading="lazy" onError={showProductImageFallback} /></div>
          <div className="product-details-info">
            <p className="text-xs tracking-[3px] accent uppercase mb-2">{product.c === 'men' ? (lang === 'ar' ? 'رجالي' : 'Men') : (lang === 'ar' ? 'نسائي' : 'Women')}</p>
            <h3 className="font-display text-2xl font-semibold mb-3">{localizedName}</h3>
            <p className="text-gray-400 text-sm mb-4">{lang === 'ar' ? product.ad : product.desc}</p>
            {reviews.length > 0 && <div className="product-reviews-list" aria-label={lang === 'ar' ? 'تقييمات المشترين' : 'Customer reviews'}>
              <h4 className="text-sm font-semibold mb-2">{lang === 'ar' ? 'تقييمات المشترين' : 'Customer reviews'}</h4>
              {reviews.map((review) => <div className="product-review" key={review.id}>
                <div className="flex items-center justify-between gap-3"><span className="text-sm font-medium">{review.userName}</span><span className="text-amber-400" aria-label={`${review.rating} / 5`}>{'★'.repeat(review.rating)}</span></div>
                {review.comment && <p className="text-xs text-gray-400 mt-1">{review.comment}</p>}
                <p className="text-[11px] text-emerald-500 mt-1">{lang === 'ar' ? 'شراء موثّق' : 'Verified purchase'}</p>
              </div>)}
            </div>}
            <div className="mb-6"><p className="text-gray-500 text-xs mb-2">{lang === 'ar' ? 'السعر' : 'Price'}</p><p className="font-display text-3xl accent font-bold">{formatPrice(product.price, lang)}</p></div>
            <div className="mb-5">
              <fieldset className="variant-fieldset">
                <legend className="text-xs uppercase tracking-wider text-gray-400 mb-2">{lang === 'ar' ? 'اختر اللون' : 'Select Color'}</legend>
                <div className="color-options">
                {product.colors.map((option) => {
                  const [swatch, arabicName] = productColors[option] || ['#7b8794', option];
                  return <label key={option} className={`color-choice ${color === option ? 'selected' : ''}`} title={lang === 'ar' ? arabicName : option}>
                    <input className="variant-radio" type="radio" name={`product-color-${product.id}`} value={option} checked={color === option} onChange={() => setColor(option)} />
                    <span className="color-dot" style={{ '--swatch-color': swatch }} />
                    <span>{lang === 'ar' ? arabicName : option}</span>
                  </label>;
                })}
                </div>
              </fieldset>
            </div>
            <div className="mb-6">
              <fieldset className="variant-fieldset">
                <legend className="text-xs uppercase tracking-wider text-gray-400 mb-2">{lang === 'ar' ? 'اختر المقاس' : 'Select Size'}</legend>
                <div className="size-options">
                  {product.sizes.map((option) => <label key={option} className={`size-choice ${size === option ? 'selected' : ''}`}>
                    <input className="variant-radio" type="radio" name={`product-size-${product.id}`} value={option} checked={size === option} onChange={() => setSize(option)} />
                    {option}
                  </label>)}
                </div>
              </fieldset>
            </div>
            <div className="flex gap-3">
              <button type="button" className="gold-btn flex-1 py-3 text-sm uppercase tracking-wider" onClick={() => onAddToCart({ ...product, selectedColor: color, selectedSize: size })}>{lang === 'ar' ? 'أضف إلى السلة' : 'Add to Cart'}</button>
              {canDonate && <button type="button" className="outline-btn flex-1 py-3 text-sm uppercase tracking-wider" onClick={() => onDonate(product)}>{lang === 'ar' ? 'تبرع' : 'Donate'}</button>}
            </div>
            {canReview && <form className="product-review-form" onSubmit={(event) => {
              event.preventDefault();
              if (onSubmitReview({ productId: product.id, rating: reviewRating, comment: reviewComment })) {
                setReviewComment('');
              }
            }}>
              <h4 className="text-sm font-semibold">{lang === 'ar' ? 'قيّم المنتج بعد الاستلام' : 'Review after delivery'}</h4>
              <label className="text-xs text-gray-400" htmlFor="reviewRating">{lang === 'ar' ? 'التقييم' : 'Rating'}</label>
              <select id="reviewRating" value={reviewRating} onChange={(event) => setReviewRating(Number(event.target.value))}>
                {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} / 5</option>)}
              </select>
              <label className="text-xs text-gray-400" htmlFor="reviewComment">{lang === 'ar' ? 'تعليق (اختياري)' : 'Comment (optional)'}</label>
              <textarea id="reviewComment" maxLength={400} value={reviewComment} onChange={(event) => setReviewComment(event.target.value)} rows="2" />
              <button type="submit" className="outline-btn px-4 py-2 text-xs">{lang === 'ar' ? 'إرسال التقييم' : 'Submit review'}</button>
            </form>}
            <p className="text-xs text-gray-500 mt-4 text-center">{lang === 'ar' ? 'راجع تفاصيل القطعة قبل الطلب.' : 'Review item details before ordering.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DonationModal({ product, lang, onClose, onSubmit }) {
  const [qty, setQty] = useState('1');
  const [charity, setCharity] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    if (product) {
      setQty('1');
      setCharity('');
      setMessage('');
      setError('');
    }
  }, [product]);
  if (!product) return null;
  const submit = () => {
    const quantity = Number.parseInt(qty, 10);
    if (!charity) {
      setError(lang === 'ar' ? 'يرجى اختيار جمعية خيرية' : 'Please select a charity');
      return;
    }
    if (!Number.isFinite(quantity) || quantity < 1) {
      setError(lang === 'ar' ? 'يرجى اختيار قطعة واحدة على الأقل' : 'Please select at least 1 item');
      return;
    }
    const selectedCharity = donationCharities.find((item) => item.id === charity);
    onSubmit({ product, quantity, charity, charityName: selectedCharity?.[lang === 'ar' ? 'ar' : 'en'], message });
  };
  return (
    <div className="modal-overlay active" id="donationModal" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-panel max-w-md" role="dialog" aria-modal="true" aria-labelledby="donationModalTitle">
        <div className="flex items-center justify-between mb-6">
          <h2 id="donationModalTitle" className="font-display text-2xl font-semibold accent">{lang === 'ar' ? 'اشترِ وتبرع' : 'Buy & Donate'}</h2>
          <button type="button" onClick={onClose} className="hover:text-[rgb(51, 153, 255)] transition" aria-label="Close"><X size={22} /></button>
        </div>
        <div className="flex items-center gap-4 mb-6 bg-[#252525] p-3 rounded-xl border border-[#333]">
          <img src={product.img} alt={lang === 'ar' ? product.an : product.n} className="w-20 h-20 rounded-lg object-cover bg-black" loading="lazy" onError={showProductImageFallback} />
          <div>
            <h3 className="font-display text-xl font-semibold mb-1 text-white">{lang === 'ar' ? product.an : product.n}</h3>
            <p className="text-xs text-gray-400 mb-1 tracking-[3px] accent uppercase">{product.c === 'men' ? (lang === 'ar' ? 'رجالي' : 'Men') : (lang === 'ar' ? 'نسائي' : 'Women')}</p>
            <div className="flex items-center gap-2"><p className="text-gray-500 text-xs">{lang === 'ar' ? 'السعر:' : 'Price:'}</p><p className="font-bold accent text-lg">{formatPrice(product.price, lang)}</p></div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-gray-400 mb-2 block" htmlFor="donationModalQty">{lang === 'ar' ? 'الكمية' : 'Quantity'}</label>
            <input type="number" id="donationModalQty" min="1" value={qty} onChange={(event) => setQty(event.target.value)} className="w-full bg-[#252525] border border-[#333] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[rgb(51, 153, 255)]" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">{lang === 'ar' ? 'اختر الجمعية' : 'Select Charity'}</p>
            <div className="grid grid-cols-1 gap-2" role="group" aria-label={lang === 'ar' ? 'الجمعيات الخيرية' : 'Charities'}>
              {donationCharities.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  aria-pressed={charity === item.id}
                  onClick={() => { setCharity(item.id); setError(''); }}
                  className={`donation-charity-option ${charity === item.id ? 'selected' : ''}`}
                >
                  <span className="donation-charity-mark" aria-hidden="true">{(lang === 'ar' ? item.ar : item.en).slice(0, 1)}</span>
                  <span>{lang === 'ar' ? item.ar : item.en}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-gray-400 mb-2 block" htmlFor="donationModalMessage">{lang === 'ar' ? 'رسالة (اختياري)' : 'Message (Optional)'}</label>
            <textarea id="donationModalMessage" value={message} onChange={(event) => setMessage(event.target.value)} className="w-full bg-[#252525] border border-[#333] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[rgb(51, 153, 255)]" placeholder="Add a personal message..." rows="2" />
          </div>
          <div className="p-3 rounded-lg bg-[rgba(255,165,0,0.1)] border border-[rgba(255,165,0,0.2)] text-xs text-gray-400 mt-2 leading-relaxed">
            <span className="text-yellow-500">💛</span> <strong>{lang === 'ar' ? 'يشمل المبلغ تكلفة القطعة. نقوم بتوصيلها إلى مستفيد تم التحقق منه.' : 'Your payment covers the item cost. We deliver it to a verified beneficiary.'}</strong>
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="outline-btn flex-1 py-3 text-xs uppercase tracking-wider bg-[#111]">{lang === 'ar' ? 'إلغاء' : 'Cancel'}</button>
            <button type="button" onClick={submit} className="gold-btn flex-1 py-3 text-xs uppercase tracking-wider">{lang === 'ar' ? 'تأكيد التبرع' : 'Confirm Donation'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartModal({ open, cart, lang, user, onClose, onRemove, onClear, onToast, onOrderPlaced }) {
  const [checkout, setCheckout] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fields, setFields] = useState({ name: '', email: '', phone: '', address: '' });
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const t = (en, ar) => lang === 'ar' ? ar : en;
  useEffect(() => {
    if (open) {
      setCheckout(user !== null && new URLSearchParams(window.location.search).get('checkout') === '1');
      setSuccess(false);
      setError('');
      setLoading(false);
    }
  }, [open, user]);
  if (!open) return null;

  const updateField = (name, value) => setFields((previous) => ({ ...previous, [name]: value }));
  const openCheckout = () => {
    if (!user) {
      localStorage.setItem('redirectAfterLogin', 'checkout');
      window.location.href = 'profile.html?action=login';
      return;
    }
    setCheckout(true);
  };
  const processPayment = () => {
    if (!fields.name.trim() || !fields.email.trim() || !fields.phone.trim() || !fields.address.trim()) {
      setError(t('Please fill in all required fields.', 'يرجى ملء جميع الحقول المطلوبة.'));
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(fields.email.trim())) {
      setError(t('Invalid email address.', 'البريد الإلكتروني غير صالح.'));
      return;
    }
    setError('');
    setLoading(true);
    window.setTimeout(() => {
      const order = {
        id: Date.now(),
        userId: user?.id || null,
        userName: user?.name || 'Guest',
        items: cart.map((item) => ({
          productId: item.id,
          name: item.n || item.productName || item.title,
          qty: item.qty || 1,
          price: item.price,
          img: item.img,
          color: item.selectedColor,
          size: item.selectedSize,
        })),
        total,
        status: 'demo',
        date: new Date().toLocaleDateString(),
        timestamp: Date.now(),
      };
      if (!onOrderPlaced(order)) {
        setLoading(false);
        return;
      }
      onClear();
      setLoading(false);
      setSuccess(true);
      onToast(t('Order confirmed. No payment was charged.', 'تم تأكيد الطلب دون تحصيل أي مبلغ.'));
      window.setTimeout(onClose, 3000);
    }, 2000);
  };

  return (
    <div className="modal-overlay active" id="cartModal" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="cartModalTitle">
        <div className="flex items-center justify-between mb-6">
          <h2 id="cartModalTitle" className="font-display text-2xl font-semibold accent">{t('Your Cart', 'سلة التسوق')}</h2>
          <button type="button" onClick={onClose} className="hover:text-[rgb(51, 153, 255)] transition" aria-label="Close"><X size={22} /></button>
        </div>
        {!success && cart.length === 0 && <div className="text-center py-12 text-gray-500" id="cartEmpty"><ShoppingBag size={48} className="mx-auto mb-3 text-[#333]" /><p>{t('Your cart is empty', 'سلة التسوق فارغة')}</p></div>}
        {!success && cart.length > 0 && (
          <>
            <div id="cartItems">
              {cart.map((item, index) => (
                <div className="flex items-center gap-3 py-3 border-b border-[#222]" key={`${item.cartId ?? item.id}-${index}`}>
                  <img src={item.img} alt={lang === 'ar' ? item.an || item.n : item.n} className="w-14 h-14 rounded-lg object-cover" loading="lazy" onError={showProductImageFallback} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{lang === 'ar' ? item.an || item.n : item.n}</p>
                    <p className="text-xs text-gray-300">{item.selectedColor} • {item.selectedSize}</p>
                    <p className="text-xs text-gray-300">{formatPrice(item.price, lang)} × {item.qty}</p>
                  </div>
                  <button type="button" onClick={() => onRemove(item)} className="text-gray-500 hover:text-red-400 transition" aria-label={t('Remove item', 'إزالة المنتج')}><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
            {!checkout && (
              <div id="cartFooter" className="mt-6 border-t border-[#222] pt-6">
                <div className="flex justify-between text-lg font-semibold mb-6"><span>{t('Total', 'الإجمالي')}</span><span className="accent">{formatPrice(total, lang)}</span></div>
                <button type="button" onClick={openCheckout} className="gold-btn w-full py-3 text-sm uppercase tracking-widest">{t('Proceed to Checkout', 'إتمام الشراء')}</button>
              </div>
            )}
            {checkout && (
              <div id="checkoutForm" className="mt-6">
                <h3 className="font-display text-xl accent mb-4">{t('Checkout', 'إتمام الشراء')}</h3>
                <p className="text-xs text-gray-500 mb-4 italic">{t('No payment will be charged.', 'لن يتم تحصيل أي مبلغ.')}</p>
                <div className="space-y-3">
                  {[
                    ['name', 'Full Name', 'John Doe', 'text', 'name'],
                    ['email', 'Email', 'john@email.com', 'email', 'email'],
                    ['phone', 'Phone', '+1 234 567 890', 'tel', 'tel'],
                    ['address', 'Address', '123 Fashion St', 'text', 'street-address'],
                  ].map(([name, label, placeholder, type, autoComplete]) => (
                    <div key={name}>
                      <label htmlFor={`co-${name}`} className="text-xs text-gray-400 mb-1 block">{t(label, label)}</label>
                      <input id={`co-${name}`} type={type} autoComplete={autoComplete} required value={fields[name]} onChange={(event) => updateField(name, event.target.value)} className="w-full bg-[#252525] border border-[#333] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[rgb(51, 153, 255)]" placeholder={placeholder} />
                    </div>
                  ))}
                  {error && <div id="coError" className="text-red-400 text-xs">{error}</div>}
                  <button type="button" disabled={loading} onClick={processPayment} className="gold-btn w-full py-3 text-sm uppercase tracking-widest mt-2" id="payBtn">
                    {loading ? <span className="spinner mx-auto" /> : t('Confirm Order', 'تأكيد الطلب')}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        {success && <div id="successView" className="text-center py-16">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center check-anim" style={{ background: 'linear-gradient(135deg,rgb(51, 153, 255),rgb(0, 102, 204))' }}><Check size={32} color="#111" /></div>
          <h3 className="font-display text-2xl accent mb-2">{t('Order Confirmed', 'تم تأكيد الطلب')}</h3>
          <p className="text-gray-400 text-sm">{t('No payment was charged.', 'لم يتم تحصيل أي مبلغ.')}</p>
        </div>}
      </div>
    </div>
  );
}

export function createDonationRecord({ product, quantity, charity, charityName, message }, user, lang) {
  const timestamp = Date.now();
  return {
    id: timestamp,
    userId: user?.id || null,
    userName: user?.name || 'Anonymous',
    productId: product.id,
    productName: product.n,
    productDesc: product.desc,
    productImg: product.img,
    price: product.price,
    quantity,
    status: 'submitted',
    charity,
    charityName,
    message,
    date: new Date().toLocaleDateString(),
    timestamp,
    cartItem: {
      ...product,
      productId: product.id,
      id: `${product.id}_donation_${timestamp}`,
      cartId: `donation-${timestamp}`,
      qty: quantity,
      selectedColor: lang === 'ar' ? 'تبرع' : 'Donation',
      selectedSize: charityName,
    },
  };
}
