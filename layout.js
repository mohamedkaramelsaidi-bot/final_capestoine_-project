class MainNav extends HTMLElement {
    connectedCallback() {
        this.render();
        // Re-render on page load to ensure correct active link
        window.addEventListener('load', () => this.render());
        // Listen for auth changes
        window.addEventListener('storage', () => this.render());
    }

    render() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'home.html';
        
        const isHome = filename === 'index.html' || filename === '' || filename === 'Capstone';
        const isProducts = filename === 'productes.html';
        const isDonate = filename === 'donate.html';
        const isAbout = filename === 'about.html';
        const isContact = filename === 'contact.html';
        const isOurCharities = filename === 'ourcharities.html';
        
        // Check user role for dynamic navigation
        let userRole = null;
        try {
            const auth = localStorage.getItem('aurum_auth');
            if (auth) {
                const user = JSON.parse(auth);
                userRole = user.userType;
            }
        } catch (e) {
            // ignore
        }
        
        // Determine what to show based on role
        // Show Donate link only for 'donor' users
        const showDonate = userRole === 'donor';
        const showOurCharities = userRole === 'charity';
        
        // Build nav links based on role
        let navLinks = `
            <a href="index.html" class="hover:text-[rgb(51, 153, 255)] transition ${isHome ? 'accent' : ''}" data-i18n="nav_home">Home</a> 
            <a href="productes.html${isProducts ? '#products' : ''}" class="hover:text-[rgb(51, 153, 255)] transition ${isProducts ? 'accent' : ''}" data-i18n="nav_products">Products</a>
        `;
        
        if (showDonate) {
            navLinks += `<a href="donate.html" class="hover:text-[rgb(51, 153, 255)] transition ${isDonate ? 'accent' : ''}" data-i18n="nav_donate">Donate</a>`;
        }
        
        if (showOurCharities) {
            navLinks += `<a href="ourcharities.html" class="hover:text-[rgb(51, 153, 255)] transition ${isOurCharities ? 'accent' : ''}" data-i18n="nav_our_charities">Our Charities</a>`;
        }
        
        navLinks += `
            <a href="about.html" class="hover:text-[rgb(51, 153, 255)] transition ${isAbout ? 'accent' : ''}" data-i18n="nav_about">About</a>
            <a href="contact.html" class="hover:text-[rgb(51, 153, 255)] transition ${isContact ? 'accent' : ''}" data-i18n="nav_contact">Contact</a>
        `;
        
        // Build mobile menu links
        let mobileLinks = `
            <a href="index.html" class="hover:text-[rgb(51, 153, 255)] transition ${isHome ? 'accent' : ''}" data-i18n="nav_home">Home</a> 
            <a href="productes.html${isProducts ? '#products' : ''}" class="hover:text-[rgb(51, 153, 255)] transition ${isProducts ? 'accent' : ''}" data-i18n="nav_products">Products</a>
        `;
        
        if (showDonate) {
            mobileLinks += `<a href="donate.html" class="hover:text-[rgb(51, 153, 255)] transition ${isDonate ? 'accent' : ''}" data-i18n="nav_donate">Donate</a>`;
        }
        
        if (showOurCharities) {
            mobileLinks += `<a href="ourcharities.html" class="hover:text-[rgb(51, 153, 255)] transition ${isOurCharities ? 'accent' : ''}" data-i18n="nav_our_charities">Our Charities</a>`;
        }
        
        mobileLinks += `
            <a href="about.html" class="hover:text-[rgb(51, 153, 255)] transition ${isAbout ? 'accent' : ''}" data-i18n="nav_about">About</a> 
            <a href="contact.html" class="hover:text-[rgb(51, 153, 255)] transition ${isContact ? 'accent' : ''}" data-i18n="nav_contact">Contact</a>
        `;

        this.innerHTML = `
           <nav class="sticky top-0 z-50 bg-card nav-shadow" style="border-bottom:1px solid #222">
            <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
             <a href="index.html" class="font-display text-2xl font-bold tracking-widest" id="nav-brand"><span class="accent">Cloth</span>Bridge</a>
             <div class="desktop-nav flex items-center gap-8 text-sm tracking-wider uppercase" style="font-weight:500">
              ${navLinks}
             </div>
        
             <div class="flex items-center gap-4">
              <button onclick="toggleLang()" class="text-xs border border-[#333] rounded-lg px-3 py-1.5 hover:border-[rgb(51, 153, 255)] transition" id="langBtn">EN</button>
               <button onclick="toggleTheme()" class="hover:text-[rgb(51, 153, 255)] transition text-gray-300" title="Toggle theme"><i data-lucide="moon" class="nav-icon" style="width:18px;height:18px;stroke-width:2"></i></button> 
               <button class="relative hover:text-[rgb(51, 153, 255)] transition text-gray-300" onclick="openCart()" title="Shopping cart"><i data-lucide="shopping-bag" class="nav-icon" style="width:18px;height:18px;stroke-width:2"></i><span class="cart-counter" id="cartCount" style="display:none">0</span></button> 
               
               <button class="hover:text-[rgb(51, 153, 255)] transition text-gray-300" onclick="handleProfileClick()" title="Profile"><i data-lucide="user" class="nav-icon" style="width:18px;height:18px;stroke-width:2"></i></button>
                <button class="mob-toggle items-center hover:text-[rgb(51, 153, 255)] transition text-gray-300" onclick="toggleMobileMenu()" title="Menu"><i data-lucide="menu" class="nav-icon" style="width:20px;height:20px;stroke-width:2"></i></button>
             </div>
            </div>
            <div class="mobile-menu" id="mobileMenu">
             <div class="flex flex-col gap-4 text-sm uppercase tracking-wider">
              ${mobileLinks}
             </div>
            </div>
           </nav>
        `;
        // Initialize Lucide icons after rendering
        if (window.lucide) {
            lucide.createIcons();
        }
        // Apply translations after rendering
        this.applyNavTranslations();
    }

    applyNavTranslations() {
        const lang = localStorage.getItem('site_lang') || 'en';
        const translations = {
            en: {
                nav_home: 'Home',
                nav_products: 'Products',
                nav_donate: 'Donate',
                nav_our_charities: 'Our Charities',
                nav_about: 'About',
                nav_contact: 'Contact',
                footer_desc: 'Luxury fashion crafted for those who demand excellence in every detail.',
                ft_shop: 'Shop',
                ft_men: "Men's Collection",
                ft_women: "Women's Collection",
                ft_new: 'New Arrivals',
                ft_support: 'Support',
                ft_faq: 'FAQ',
                ft_shipping: 'Shipping',
                ft_returns: 'Returns',
                ft_follow: 'Follow Us',
                footer_copy: 'Clothes Bridge. All rights reserved.',
                brand_name_html: '<span class="accent">Clothes</span> Bridge'
            },
            ar: {
                nav_home: 'الرئيسية',
                nav_products: 'المنتجات',
                nav_donate: 'تبرع',
                nav_our_charities: 'جمعياتنا',
                nav_about: 'حول',
                nav_contact: 'اتصل',
                footer_desc: 'أزياء فاخرة مصممة لمن يطلبون التميز في كل تفصيل.',
                ft_shop: 'تسوق',
                ft_men: 'مجموعة الرجال',
                ft_women: 'مجموعة النساء',
                ft_new: 'جديد',
                ft_support: 'الدعم',
                ft_faq: 'الأسئلة',
                ft_shipping: 'الشحن',
                ft_returns: 'الإرجاع',
                ft_follow: 'تابعنا',
                footer_copy: 'جسر ملابس. جميع الحقوق محفوظة.',
                brand_name_html: '<span class="accent">جسر</span> ملابس'
            }
        };

        // Apply to nav elements
        this.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Apply brand name
        const navBrand = this.querySelector('#nav-brand');
        if (navBrand && translations[lang] && translations[lang]['brand_name_html']) {
            navBrand.innerHTML = translations[lang]['brand_name_html'];
        }

        // Apply lang button
        const langBtn = this.querySelector('#langBtn');
        if (langBtn) {
            langBtn.textContent = lang === 'ar' ? 'AR' : 'EN';
        }

        // Set direction
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    }
}

class MainFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="bg-card py-12 px-4" style="border-top:1px solid #222">
        <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div>
        <h3 class="font-display text-xl font-bold tracking-widest mb-3" id="footer-brand"><span class="accent">Cloth</span>Bridge</h3>
        <p class="text-gray-500 text-sm leading-relaxed" data-i18n="footer_desc">Luxury fashion crafted for those who demand excellence in every detail.</p>
        </div>
        <div>
        <h4 class="text-xs uppercase tracking-widest accent mb-4 font-semibold" data-i18n="ft_shop">Shop</h4>
        <div class="flex flex-col gap-2 text-sm text-gray-300">
        <a href="productes.html" class="hover:text-white transition" data-i18n="ft_men">Men's Collection</a>
        <a href="productes.html" class="hover:text-white transition" data-i18n="ft_women">Women's Collection</a>
        <a href="productes.html" class="hover:text-white transition" data-i18n="ft_new">New Arrivals</a>
        </div>
        </div>
        <div>
        <h4 class="text-xs uppercase tracking-widest accent mb-4 font-semibold" data-i18n="ft_support">Support</h4>
        <div class="flex flex-col gap-2 text-sm text-gray-300">
        <a href="#" class="hover:text-white transition" data-i18n="ft_faq">FAQ</a>
        <a href="#" class="hover:text-white transition" data-i18n="ft_shipping">Shipping</a>
        <a href="#" class="hover:text-white transition" data-i18n="ft_returns">Returns</a>
        </div>
        </div>
        <div>
        <h4 class="text-xs uppercase tracking-widest accent mb-4 font-semibold" data-i18n="ft_follow">Follow Us</h4>
        <div class="flex gap-3">
        <a href="#" class="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[rgb(51, 153, 255)] hover:text-black transition"><i data-lucide="instagram" style="width:16px;height:16px"></i></a>
        <a href="#" class="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[rgb(51, 153, 255)] hover:text-black transition"><i data-lucide="twitter" style="width:16px;height:16px"></i></a>
        <a href="#" class="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[rgb(51, 153, 255)] hover:text-black transition"><i data-lucide="facebook" style="width:16px;height:16px"></i></a>
        </div>
        </div>
        </div>
        <div class="border-t border-[#222] pt-6 text-center text-xs text-gray-600" id="footerCopy">
        © <span id="year"> </span> <span id="footerCopyText" data-i18n="footer_copy">ClothBridge. All rights reserved.</span>
        </div>
        </div>
        </footer>
        `;
        this.applyFooterTranslations();
    }

    applyFooterTranslations() {
        const lang = localStorage.getItem('site_lang') || 'en';
        const translations = {
            en: {
                footer_desc: 'Luxury fashion crafted for those who demand excellence in every detail.',
                ft_shop: 'Shop',
                ft_men: "Men's Collection",
                ft_women: "Women's Collection",
                ft_new: 'New Arrivals',
                ft_support: 'Support',
                ft_faq: 'FAQ',
                ft_shipping: 'Shipping',
                ft_returns: 'Returns',
                ft_follow: 'Follow Us',
                footer_copy: 'Clothes Bridge. All rights reserved.',
                brand_name_html: '<span class="accent">Clothes</span> Bridge'
            },
            ar: {
                footer_desc: 'أزياء فاخرة مصممة لمن يطلبون التميز في كل تفصيل.',
                ft_shop: 'تسوق',
                ft_men: 'مجموعة الرجال',
                ft_women: 'مجموعة النساء',
                ft_new: 'جديد',
                ft_support: 'الدعم',
                ft_faq: 'الأسئلة',
                ft_shipping: 'الشحن',
                ft_returns: 'الإرجاع',
                ft_follow: 'تابعنا',
                footer_copy: 'جسر ملابس. جميع الحقوق محفوظة.',
                brand_name_html: '<span class="accent">جسر</span> ملابس'
            }
        };

        // Apply to footer elements
        this.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Apply brand name
        const footerBrand = this.querySelector('#footer-brand');
        if (footerBrand && translations[lang] && translations[lang]['brand_name_html']) {
            footerBrand.innerHTML = translations[lang]['brand_name_html'];
        }
    }
}

customElements.define('main-nav', MainNav);
customElements.define('main-footer', MainFooter);

// Initialize footer year on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Dynamic Scroll-To-Top Button injection
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-to-top';
  scrollTopBtn.setAttribute('title', 'Scroll to top');
  scrollTopBtn.innerHTML = '<i data-lucide="chevron-up" style="width:22px;height:22px"></i>';
  document.body.appendChild(scrollTopBtn);

  // Target the scrolling #app container or fallback to global window
  const scrollContainer = document.getElementById('app') || window;

  // Show/Hide button on scroll
  scrollContainer.addEventListener('scroll', () => {
    const scrollTop = scrollContainer.scrollTop !== undefined ? scrollContainer.scrollTop : window.scrollY;
    if (scrollTop > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  // Smooth scroll to top on click
  scrollTopBtn.addEventListener('click', () => {
    if (scrollContainer.scrollTo) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });

  // Initialize Lucide icons on page load
  if (window.lucide) {
    setTimeout(() => lucide.createIcons(), 150);
  }
});

// ===== NAVIGATION & AUTH HELPERS =====
// Handle profile icon click - redirect to profile or auth based on login status
function handleProfileClick() {
  const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
  if (user) {
    window.location.href = 'profile.html';
  } else {
    // Open auth modal if on profile page, otherwise redirect to profile
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === 'profile.html' || currentPage === 'profile') {
      if (typeof openAuthModal === 'function') {
        openAuthModal();
      }
    } else {
      window.location.href = 'profile.html';
    }
  }
}

// Handle logout from navbar
function handleLogout() {
  if (typeof Auth !== 'undefined' && Auth.isLoggedIn()) {
    const isDark = document.body.classList.contains('dark-mode');
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(51, 153, 255)',
      cancelButtonColor: isDark ? '#333333' : '#e5e7eb',
      background: isDark ? '#1a1a1a' : '#ffffff',
      color: isDark ? '#ffffff' : '#111111',
      confirmButtonText: 'Yes, logout'
    }).then((result) => {
      if (result.isConfirmed) {
        Auth.logout();
        showToast('Logged out successfully.');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      }
    });
  }
}

// Show toast notification
function showToast(message) {
  const toastEl = document.getElementById('toast');
  if (!toastEl) {
    const newToast = document.createElement('div');
    newToast.id = 'toast';
    newToast.className = 'toast';
    document.body.appendChild(newToast);
  }
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Generic translation helper for all pages
function t(key) {
  // Try to get from window.translations if available
  if (typeof window.translations !== 'undefined' && window.translations[window.lang || 'en']) {
    return window.translations[window.lang || 'en'][key] || window.translations.en[key] || key;
  }
  return key;
}

// Toggle language globally
function toggleLang() {
  const currentLang = localStorage.getItem('site_lang') || 'en';
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  localStorage.setItem('site_lang', newLang);
  
  // Update document
  document.documentElement.lang = newLang;
  document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  
  // Re-render navbar and footer
  const nav = document.querySelector('main-nav');
  if (nav && nav.render) {
    nav.render();
  }
  const footer = document.querySelector('main-footer');
  if (footer && footer.applyFooterTranslations) {
    footer.applyFooterTranslations();
  }
  
  // Trigger any page-specific translation updates
  if (typeof applyLang === 'function') {
    applyLang();
  }
}

// Toggle theme globally
function toggleTheme() {
  const currentTheme = localStorage.getItem('aurum_theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('aurum_theme', newTheme);
  
  // Apply theme changes
  const isDark = newTheme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  document.body.classList.toggle('light-mode', !isDark);
  
  const bgValue = isDark ? '#0a0a0a' : '#f9f9f9';
  const textValue = isDark ? '#ffffff' : '#111111';
  document.body.style.background = bgValue;
  document.body.style.color = textValue;
}

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

