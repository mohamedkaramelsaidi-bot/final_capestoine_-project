import { useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { products as defaultProducts } from '../data/products.js';
import { ProductGrid } from '../components/Commerce.jsx';

export default function Products({ lang, user, catalogProducts = defaultProducts, stockOverrides = {}, reviewsByProduct = {}, onOpenProduct, onAddToCart, onDonate }) {
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');
  const [search, setSearch] = useState('');
  const [minimumPrice, setMinimumPrice] = useState('');
  const [maximumPrice, setMaximumPrice] = useState('');
  const [size, setSize] = useState('all');
  const [color, setColor] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const filtered = useMemo(() => {
    const query = search.toLocaleLowerCase();
    const result = catalogProducts.filter((product) => {
      const haystack = `${product.n} ${product.an} ${product.desc} ${product.ad}`.toLocaleLowerCase();
      return (category === 'all' || product.c === category)
        && haystack.includes(query)
        && (!minimumPrice || product.price >= Number(minimumPrice))
        && (!maximumPrice || product.price <= Number(maximumPrice))
        && (size === 'all' || product.sizes.includes(size))
        && (color === 'all' || product.colors.includes(color))
        && (!inStockOnly || Number(stockOverrides[product.id] ?? product.stock) > 0)
        ;
    });
    if (sort === 'low') result.sort((first, second) => first.price - second.price);
    if (sort === 'high') result.sort((first, second) => second.price - first.price);
    return result;
  }, [catalogProducts, category, color, inStockOnly, maximumPrice, minimumPrice, search, size, sort, stockOverrides]);
  const ar = lang === 'ar';
  return (
    <>
      <section className="relative py-16 px-4 text-center section-reveal">
        <p className="uppercase text-xs tracking-[6px] accent mb-3 font-semibold">{ar ? 'مجموعة جديدة' : 'New Collection'} {new Date().getFullYear()}</p>
        <h1 className="font-display text-5xl md:text-6xl font-light mb-4">{ar ? 'أعد تعريف أناقتك' : 'Redefine Your Elegance'}</h1>
        <p className="text-gray-400 max-w-lg mx-auto text-sm">{ar ? 'أزياء فاخرة مختارة لعشاق الأناقة العصرية' : 'Curated luxury fashion for the modern connoisseur'}</p>
      </section>
      <main className="max-w-7xl mx-auto px-4 pb-20" id="products">
        <button type="button" className="outline-btn mb-4 px-4 py-2 text-sm md:hidden" onClick={() => setSidebarOpen(true)} aria-expanded={sidebarOpen} aria-controls="sidebarWrap">
          <SlidersHorizontal size={16} className="inline mr-2" />{ar ? 'تصفية المنتجات' : 'Filter Products'}
        </button>
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <div className={`sidebar-wrap sticky top-0 ${sidebarOpen ? 'active' : ''}`} id="sidebarWrap" onClick={(event) => {
            if (event.target === event.currentTarget) setSidebarOpen(false);
          }}>
            <div className="sidebar-inner">
              <div className="sidebar w-full md:w-64 flex-shrink-0 relative md:sticky top-0">
                <button type="button" className="filter-close absolute top-2 end-2 hover:text-[rgb(51, 153, 255)]" onClick={() => setSidebarOpen(false)} aria-label={ar ? 'إغلاق التصفية' : 'Close filters'}><X size={20} /></button>
                <h3 className="font-display text-lg font-semibold accent mb-5 tracking-wider">{ar ? 'تصفية المنتجات' : 'Filter Products'}</h3>
                <div className="mb-4">
                  <label htmlFor="searchInput" className="text-xs uppercase tracking-wider text-gray-400 mb-2 block">{ar ? 'بحث' : 'Search'}</label>
                  <input type="text" id="searchInput" value={search} placeholder={ar ? 'ابحث عن المنتجات...' : 'Search products...'} onChange={(event) => setSearch(event.target.value)} className="text-sm" />
                </div>
                <div className="mb-4">
                  <label htmlFor="catFilter" className="text-xs uppercase tracking-wider text-gray-400 mb-2 block">{ar ? 'الفئة' : 'Category'}</label>
                  <select id="catFilter" value={category} onChange={(event) => setCategory(event.target.value)}>
                    <option value="all">{ar ? 'الكل' : 'All'}</option><option value="men">{ar ? 'رجالي' : 'Men'}</option><option value="women">{ar ? 'نسائي' : 'Women'}</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="sortFilter" className="text-xs uppercase tracking-wider text-gray-400 mb-2 block">{ar ? 'ترتيب حسب السعر' : 'Sort by Price'}</label>
                  <select id="sortFilter" value={sort} onChange={(event) => setSort(event.target.value)}>
                    <option value="default">{ar ? 'افتراضي' : 'Default'}</option><option value="low">{ar ? 'الأقل ← الأعلى' : 'Low → High'}</option><option value="high">{ar ? 'الأعلى ← الأقل' : 'High → Low'}</option>
                  </select>
                </div>
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="minimumPrice" className="text-xs uppercase tracking-wider text-gray-400 mb-2 block">{ar ? 'من سعر' : 'Min price'}</label>
                    <input id="minimumPrice" type="number" min="0" value={minimumPrice} onChange={(event) => setMinimumPrice(event.target.value)} placeholder="0" />
                  </div>
                  <div>
                    <label htmlFor="maximumPrice" className="text-xs uppercase tracking-wider text-gray-400 mb-2 block">{ar ? 'إلى سعر' : 'Max price'}</label>
                    <input id="maximumPrice" type="number" min="0" value={maximumPrice} onChange={(event) => setMaximumPrice(event.target.value)} placeholder="5000" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="sizeFilter" className="text-xs uppercase tracking-wider text-gray-400 mb-2 block">{ar ? 'المقاس' : 'Size'}</label>
                  <select id="sizeFilter" value={size} onChange={(event) => setSize(event.target.value)}>
                    <option value="all">{ar ? 'كل المقاسات' : 'All sizes'}</option>
                    {[...new Set(catalogProducts.flatMap((product) => product.sizes))].sort().map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="colorFilter" className="text-xs uppercase tracking-wider text-gray-400 mb-2 block">{ar ? 'اللون' : 'Color'}</label>
                  <select id="colorFilter" value={color} onChange={(event) => setColor(event.target.value)}>
                    <option value="all">{ar ? 'كل الألوان' : 'All colors'}</option>
                    {[...new Set(catalogProducts.flatMap((product) => product.colors))].sort().map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
                <label className="filter-check mb-3"><input type="checkbox" checked={inStockOnly} onChange={(event) => setInStockOnly(event.target.checked)} />{ar ? 'المتاح فقط' : 'In stock only'}</label>
                <div className="mt-6 p-4 rounded-xl text-center">
                  <p className="text-xs text-gray-400">{ar ? 'عرض' : 'Showing'}</p>
                  <p className="text-2xl font-bold accent font-display" id="productCountDisplay" aria-live="polite" aria-atomic="true">{filtered.length}</p>
                  <p className="text-xs text-gray-400">{ar ? 'منتج' : 'items'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1" aria-live="polite">
            {filtered.length > 0
              ? <ProductGrid items={filtered} lang={lang} canDonate={user?.userType === 'donor'} stockOverrides={stockOverrides} reviewsByProduct={reviewsByProduct} onOpenProduct={onOpenProduct} onAddToCart={onAddToCart} onDonate={onDonate} />
              : <div className="no-results-panel text-center" role="status">
                <p className="text-gray-400 mb-4">{ar ? 'ملقيناش منتجات مطابقة لبحثك.' : 'No products match your search.'}</p>
                <button type="button" className="outline-btn px-5 py-2 text-sm" onClick={() => { setSearch(''); setCategory('all'); setSort('default'); setMinimumPrice(''); setMaximumPrice(''); setSize('all'); setColor('all'); setInStockOnly(false); }}>{ar ? 'امسح البحث والفلاتر' : 'Clear search and filters'}</button>
              </div>}
          </div>
        </div>
      </main>
    </>
  );
}
