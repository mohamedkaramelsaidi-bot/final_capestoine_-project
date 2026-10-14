import { assetUrl } from '../assets.js';

const catalog = [
  { n: "Women's Blazer", c: 'women', img: 'images/womens-blazer.webp', desc: 'Tailored navy blazer with sculpted shoulders and modern cut', an: 'بليزر نسائي', ad: 'بليزر أزرق داكن بقصة مدروسة وأكتاف مميزة', colors: ['Navy', 'Black', 'Charcoal'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
  { n: "Men's Italia Polo Shirt", c: 'men', img: 'images/italia-polo.webp', desc: 'Classic Italia polo shirt with sporty green collar', an: 'قميص بولو إيطاليا للرجال', ad: 'قميص بولو كاجوال بألوان إيطالية مع ياقة رياضية', colors: ['White', 'Green', 'Black'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { n: "Men's Suit", c: 'men', img: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=500&fit=crop', desc: 'Tailored charcoal suit for the modern gentleman', an: 'بدلة رجالية', ad: 'بدلة رمادية أنيقة تناسب الرجل العصري', colors: ['Charcoal', 'Gray', 'Black'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { n: "Women's Dress", c: 'women', img: 'images/womens-evening-dress.jpg', desc: 'Elegant ivory silk evening dress with flowing skirt', an: 'فستان سهرة نسائي', ad: 'فستان سهرة حريري أنيق بلون عاجي مع تنورة منسدلة', colors: ['Ivory', 'Champagne', 'White'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { n: "Women's Wool Coat", c: 'women', img: 'images/womens-wool-coat.jpg', desc: 'Chic wool coat with a flared hem and button details', an: 'معطف صوف نسائي', ad: 'معطف صوفي أنيق بتفاصيل أزرار وقصة مروحة', colors: ['Beige', 'Cream', 'Gray'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { n: "Men's Jacket", c: 'men', img: 'images/mens-leather-jacket.png', desc: 'Italian leather jacket in classic noir', an: 'سترة جلد رجالية', ad: 'سترة جلدية إيطالية بتصميم كلاسيكي أنيق', colors: ['Black', 'Brown', 'Cognac'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { n: "Men's Turtleneck", c: 'men', img: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=500&fit=crop', desc: 'Pure cashmere turtleneck in soft cream', an: 'كنزة تورتل نيك رجالية', ad: 'كنزة كشمير ناعمة بلون عاجي دافئ', colors: ['Cream', 'Gray', 'Navy'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { n: "Women's Blouse", c: 'women', img: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=500&fit=crop', desc: 'Sophisticated rose gold silk blouse', an: 'بلوزة نسائية', ad: 'بلوزة حريرية بلون وردي ذهبي أنيقة', colors: ['Rose Gold', 'Blush', 'Champagne'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { n: "Women's Cocktail Dress", c: 'women', img: 'images/womens-cocktail-dress.jpg', desc: 'Stunning sapphire cocktail dress for special nights', an: 'فستان كوكتيل نسائي', ad: 'فستان كوكتيل أزرق لامع للمناسبات الخاصة', colors: ['Sapphire', 'Navy', 'Purple'], sizes: ['XS', 'S', 'M', 'L'] },
  { n: "Men's Chinos", c: 'men', img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop', desc: 'Premium graphite chinos for everyday elegance', an: 'بنطلون شينو رجالي', ad: 'بنطلون شينو رمادي فاخر للأناقة اليومية', colors: ['Graphite', 'Khaki', 'Black'], sizes: ['28', '30', '32', '34', '36', '38'] },
  { n: "Women's Skirt", c: 'women', img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=500&fit=crop', desc: 'Flowing pearl maxi skirt with silk blend', an: 'تنورة ماكسي نسائية', ad: 'تنورة ماكسي حريرية بتدرج لؤلؤي ناعم', colors: ['Pearl', 'Ivory', 'Silver'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { n: "Men's Shirt", c: 'men', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop', desc: 'Crisp onyx dress shirt with perfect fit', an: 'قميص رجالي', ad: 'قميص رسمي أنيق بلون الأونيكس بقصة مثالية', colors: ['Onyx', 'White', 'Gray'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { n: "Women's Tie-Front Top", c: 'women', img: 'images/womens-tie-top.jpg', desc: 'Elegant red tie-front top with billowy sleeves', an: 'بلوزة بتفاصيل رباط نسائية', ad: 'بلوزة حمراء أنيقة برابط أمامي وأكمام واسعة', colors: ['Red', 'Burgundy', 'Wine'], sizes: ['XS', 'S', 'M', 'L'] },
  { n: "Men's Loafers", c: 'men', img: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=500&fit=crop', desc: 'Handcrafted burgundy suede loafers', an: 'حذاء لوفر رجالي', ad: 'حذاء سويدي خمري أنيق مصنوع يدويًا', colors: ['Burgundy', 'Brown', 'Black'], sizes: ['6', '7', '8', '9', '10', '11', '12'] },
  { n: "Women's Cardigan", c: 'women', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=500&fit=crop', desc: 'Elegant platinum knit cardigan', an: 'كارديجان نسائي', ad: 'كارديجان محبوك بلون البلاتين بتصميم ناعم', colors: ['Platinum', 'Gray', 'Black'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { n: "Men's Watch Cuff", c: 'men', img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=500&fit=crop', desc: 'Titanium watch cuff with timeless design', an: 'إسوارة ساعة رجالية', ad: 'إسوارة ساعة من التيتانيوم بتصميم خالد', colors: ['Titanium', 'Silver', 'Gold'], sizes: ['One Size'] },
  { n: "Women's Suit Set", c: 'women', img: 'images/womens-suit-set.jpg', desc: 'Structured blazer and pleated skirt set in charcoal grey', an: 'طقم بدلة نسائي', ad: 'طقم بليزر وتنورة مطوية أنيق بلون الفحم', colors: ['Gray', 'Charcoal'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { n: "Men's Double-Breasted Blazer", c: 'men', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=500&fit=crop', desc: 'Classic navy double-breasted blazer', an: 'بليزر مزدوج الأزرار رجالي', ad: 'بليزر بحري كلاسيكي بتصميم مزدوج الأزرار', colors: ['Navy', 'Black', 'Charcoal'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { n: "Women's Organza Blouse", c: 'women', img: 'images/womens-organza-blouse.webp', desc: 'Delicate lilac organza blouse with ruffle details', an: 'بلوزة أورغانزا نسائية', ad: 'بلوزة أورغانزا ناعمة بلون اللافندر بتفاصيل كشكش', colors: ['Lilac', 'Purple', 'Mauve'], sizes: ['XS', 'S', 'M', 'L'] },
  { n: "Men's Hoodie", c: 'men', img: 'images/mens-hoodie.jpg', desc: 'Cozy blue hoodie with a soft fleece interior', an: 'هودي رجالي', ad: 'هودي أزرق مريح مع بطانة صوف ناعمة', colors: ['Blue', 'Navy', 'Slate'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { n: "Women's Clutch", c: 'women', img: 'https://images.unsplash.com/photo-1559563458-527698bf5295?w=400&h=500&fit=crop', desc: 'Glamorous gold sequin clutch', an: 'كلاتش نسائي', ad: 'كلاتش ذهبي متلألئ بترتر للمناسبات', colors: ['Gold', 'Silver', 'Rose Gold'], sizes: ['One Size'] },
  { n: "Men's Trousers", c: 'men', img: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400&h=500&fit=crop', desc: 'Tailored ebony formal trousers', an: 'بنطلون رسمي رجالي', ad: 'بنطلون رسمي أسود بقصة مضبوطة', colors: ['Black', 'Charcoal', 'Gray'], sizes: ['28', '30', '32', '34', '36', '38'] },
  { n: "Women's Knit Sweater", c: 'women', img: 'images/womens-knit-sweater.jpg', desc: 'Soft grey knit sweater with relaxed fit', an: 'كنزة صوف نسائية', ad: 'كنزة محبوكة ناعمة بلون رمادي مع قصة مريحة', colors: ['Gray', 'Ivory'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { n: "Men's Casual Polo Shirt", c: 'men', img: 'images/mens-casual-polo.avif', desc: 'Comfortable casual polo shirt with subtle sporty design', an: 'قميص بولو كاجوال رجالي', ad: 'قميص بولو مريح بتصميم رياضي خفيف', colors: ['White', 'Green', 'Charcoal'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { n: "Men's T-Shirt", c: 'men', img: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=500&fit=crop', desc: 'Soft cotton T-shirt for everyday wear', an: 'تيشيرت رجالي', ad: 'تيشيرت قطني ناعم للاستخدام اليومي', colors: ['Coral', 'Peach', 'Orange'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
];

const catalogPrices = [
  1299, 499, 1899, 1199, 1499, 1699, 599, 549, 999, 699,
  799, 499, 399, 899, 649, 599, 1599, 699, 449, 549,
  899, 899, 399, 499, 299,
];
const catalogStock = [5, 12, 3, 6, 0, 2, 8, 9, 4, 10, 7, 11, 6, 4, 5, 3, 2, 8, 5, 13, 4, 0, 9, 7, 15];

if (catalog.length !== catalogPrices.length || catalog.length !== catalogStock.length) {
  throw new Error('Every catalog product must have a price and stock quantity.');
}

export const products = catalog.map((product, id) => ({
  ...product,
  id,
  img: assetUrl(product.img),
  price: catalogPrices[id],
  stock: catalogStock[id],
  selectedColor: product.colors[0],
  selectedSize: product.sizes[0],
}));

export function formatPrice(amount, lang = 'en') {
  const value = Math.round(Number(amount) || 0);
  const label = lang === 'ar' ? 'ج.م' : 'EGP';
  return `${label} ${value.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')}`;
}
