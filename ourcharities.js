// Our Charities Page JavaScript

// Charity data
const charities = [
    {
        id: 1,
        name: "Hope Foundation",
        nameAr: "مؤسسة الأمل",
        description: "Providing clothing to underprivileged families across the Middle East since 2010.",
        descriptionAr: "تقديم الملابس للعائلات المحتاجة في الشرق الأوسط منذ عام 2010.",
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
        location: "Cairo, Egypt",
        locationAr: "القاهرة، مصر",
        category: "Family Support",
        categoryAr: "دعم العائلات",
        itemsReceived: 45000,
        familiesHelped: 12000
    },
    {
        id: 2,
        name: "Warmth for All",
        nameAr: "الدفء للجميع",
        description: "Focusing on winter clothing for children in cold climates.",
        descriptionAr: "التركيز على ملابس الشتاء للأطفال في المناخات الباردة.",
        image: "https://images.unsplash.com/photo-1434389670869-ba410efa2ee2?w=400",
        location: "Beirut, Lebanon",
        locationAr: "بيروت، لبنان",
        category: "Children",
        categoryAr: "الأطفال",
        itemsReceived: 28000,
        familiesHelped: 8000
    },
    {
        id: 3,
        name: "Clothes for Education",
        nameAr: "ملابس للتعليم",
        description: "Providing school uniforms and clothing to ensure children can attend school.",
        descriptionAr: "تقديم زي المدرسة والملابس لضمان قدرة الأطفال على الذهاب إلى المدرسة.",
        image: "https://images.unsplash.com/photo-1489987707023-afc7e434f922?w=400",
        location: "Amman, Jordan",
        locationAr: "عمّان، الأردن",
        category: "Education",
        categoryAr: "التعليم",
        itemsReceived: 35000,
        familiesHelped: 15000
    },
    {
        id: 4,
        name: "Refugee Aid Network",
        nameAr: "شبكة مساعدة اللاجئين",
        description: "Supporting refugees with essential clothing and household items.",
        descriptionAr: "دعم اللاجئين بالملابس الأساسية ومستلزمات المنزل.",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
        location: "Multiple Locations",
        locationAr: "مواقع متعددة",
        category: "Refugee Support",
        categoryAr: "دعم اللاجئين",
        itemsReceived: 62000,
        familiesHelped: 18000
    },
    {
        id: 5,
        name: "Elderly Care Initiative",
        nameAr: "مبادرة رعاية كبار السن",
        description: "Providing warm clothing and blankets to elderly in need.",
        descriptionAr: "تقديم الملابس الدافئة والبطانيات للمحتاجين من كبار السن.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
        location: "Riyadh, Saudi Arabia",
        locationAr: "الرياض، المملكة العربية السعودية",
        category: "Elderly Care",
        categoryAr: "رعاية كبار السن",
        itemsReceived: 18000,
        familiesHelped: 5000
    },
    {
        id: 6,
        name: "Women's Empowerment",
        nameAr: "تمكين المرأة",
        description: "Providing professional attire to help women enter the workforce.",
        descriptionAr: "تقديم ملابس مهنية لمساعدة النساء على دخول سوق العمل.",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
        location: "Dubai, UAE",
        locationAr: "دبي، الإمارات العربية المتحدة",
        category: "Women Empowerment",
        categoryAr: "تمكين المرأة",
        itemsReceived: 22000,
        familiesHelped: 7000
    }
];

// Translations
const ourCharitiesTranslations = {
    en: {
        hero_title: "Our Charity Partners",
        hero_subtitle: "Making a difference together, one garment at a time",
        hero_desc: "We partner with trusted organizations to ensure your donations reach those who need them most.",
        impact_title: "Our Collective Impact",
        stat_donations: "Total Donations",
        stat_families: "Families Helped",
        stat_partners: "Partner Charities",
        stat_countries: "Countries",
        charities_title: "Meet Our Partners",
        charities_desc: "These organizations work tirelessly to help those in need. Your donations make their work possible.",
        how_title: "How It Works",
        step1_title: "Donate Clothes",
        step1_desc: "List your unwanted clothing items on our platform with photos and details.",
        step2_title: "We Connect",
        step2_desc: "We match your donations with verified charities that need them.",
        step3_title: "Make Impact",
        step3_desc: "Your clothes reach those in need, making a real difference in their lives.",
        cta_title: "Ready to Make a Difference?",
        cta_desc: "Join our community of donors and help those in need.",
        cta_button: "Start Donating",
        view_details: "View Details",
        donate_now: "Donate Now",
        items_received: "items received",
        families_helped: "families helped"
    },
    ar: {
        hero_title: "شركاؤنا من المؤسسات الخيرية",
        hero_subtitle: "نحدث فرقًا معًا، قطعة ملابس واحدة في كل مرة",
        hero_desc: "نتعاون مع منظمات موثوقة لضمان وصول تبرعاتك إلى من يحتاجها أكثر.",
        impact_title: "تأثيرنا الجماعي",
        stat_donations: "إجمالي التبرعات",
        stat_families: "العائلات المساعدة",
        stat_partners: "المؤسسات الشريكة",
        stat_countries: "الدول",
        charities_title: "تعرف على شركائنا",
        charities_desc: "تعمل هذه المنظمات بلا كلل لمساعدة المحتاجين. تبرعاتك تجعل عملها ممكنًا.",
        how_title: "كيف يعمل",
        step1_title: "تبرع بالملابس",
        step1_desc: "أضف ملابسك غير المرغوب فيها على منصتنا مع الصور والتفاصيل.",
        step2_title: "نحن نربط",
        step2_desc: "نطابق تبرعاتك مع المؤسسات الخيرية الموثقة التي تحتاجها.",
        step3_title: "حدث الأثر",
        step3_desc: "ملابسك تصل إلى المحتاجين، مما يحدث فرقًا حقيقيًا في حياتهم.",
        cta_title: "هل أنت مستعد لإحداث فرق؟",
        cta_desc: "انضم إلى مجتمع المتبرعين لدينا وساعد المحتاجين.",
        cta_button: "ابدأ التبرع",
        view_details: "عرض التفاصيل",
        donate_now: "تبرع الآن",
        items_received: "قطعة مستلمة",
        families_helped: "عائلة ساعدة"
    }
};

// Get current language
function getCurrentLang() {
    return localStorage.getItem('site_lang') || 'en';
}

// Get translation
function t(key) {
    const lang = getCurrentLang();
    return ourCharitiesTranslations[lang]?.[key] || ourCharitiesTranslations['en'][key] || key;
}

// Render charities
function renderCharities() {
    const grid = document.getElementById('charities-grid');
    if (!grid) return;

    const lang = getCurrentLang();
    grid.innerHTML = charities.map(charity => `
        <div class="charity-card bg-white rounded-xl shadow-lg overflow-hidden">
            <img src="${charity.image}" alt="${charity.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <span class="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mb-3">
                    ${lang === 'ar' ? charity.categoryAr : charity.category}
                </span>
                <h3 class="text-xl font-bold mb-2">${lang === 'ar' ? charity.nameAr : charity.name}</h3>
                <p class="text-gray-600 mb-4">${lang === 'ar' ? charity.descriptionAr : charity.description}</p>
                <div class="flex items-center text-sm text-gray-500 mb-4">
                    <i data-lucide="map-pin" class="w-4 h-4 mr-1"></i>
                    ${lang === 'ar' ? charity.locationAr : charity.location}
                </div>
                <div class="flex justify-between items-center pt-4 border-t">
                    <div class="text-sm">
                        <span class="font-semibold text-blue-600">${charity.itemsReceived.toLocaleString()}</span>
                        <span class="text-gray-500"> ${t('items_received')}</span>
                    </div>
                    <button onclick="donateToCharity(${charity.id})" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        ${t('donate_now')}
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Update impact stats
function updateImpactStats() {
    const totalDonations = charities.reduce((sum, c) => sum + c.itemsReceived, 0);
    const totalFamilies = charities.reduce((sum, c) => sum + c.familiesHelped, 0);

    const donationsEl = document.querySelector('[data-stat="donations"]');
    const familiesEl = document.querySelector('[data-stat="families"]');

    if (donationsEl) donationsEl.textContent = totalDonations.toLocaleString();
    if (familiesEl) familiesEl.textContent = totalFamilies.toLocaleString();
}

// View charity details
function viewCharityDetails(charityId) {
    const charity = charities.find(c => c.id === charityId);
    if (!charity) return;

    const lang = getCurrentLang();
    const isDark = document.body.classList.contains('dark-mode');
    Swal.fire({
        title: lang === 'ar' ? charity.nameAr : charity.name,
        text: lang === 'ar' ? charity.descriptionAr : charity.description,
        icon: 'info',
        confirmButtonColor: 'rgb(51, 153, 255)',
        background: isDark ? '#1a1a1a' : '#ffffff',
        color: isDark ? '#ffffff' : '#111111'
    });
}

// Donate to specific charity
function donateToCharity(charityId) {
    const charity = charities.find(c => c.id === charityId);
    if (!charity) return;

    // Store selected charity and redirect to donate page
    localStorage.setItem('selected_charity', JSON.stringify(charity));
    window.location.href = 'donate.html';
}

// Apply translations
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = t(key);
        if (translation) {
            el.textContent = translation;
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    renderCharities();
    updateImpactStats();
    applyTranslations();

    // Re-apply translations when language changes
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            setTimeout(() => {
                applyTranslations();
                renderCharities();
            }, 100);
        });
    }
});

// Export for global use
window.donateToCharity = donateToCharity;
window.viewCharityDetails = viewCharityDetails;