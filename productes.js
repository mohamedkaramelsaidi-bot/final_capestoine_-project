const products = [
  {n:"Women's Blazer",c:"women",img:"images/W54119s6.webp",desc:"Tailored navy blazer with sculpted shoulders and modern cut",an:"بليزر نسائي",ad:"بليزر أزرق داكن بقصة مدروسة وأكتاف مميزة",colors:["Navy","Black","Charcoal"],sizes:["XS","S","M","L","XL","XXL"]},
  {n:"Men's Italia Polo Shirt",c:"men",img:"images/italia-polo.webp",desc:"Classic Italia polo shirt with sporty green collar",an:"قميص بولو إيطاليا للرجال",ad:"قميص بولو كاجوال بألوان إيطالية مع ياقة رياضية",colors:["White","Green","Black"],sizes:["S","M","L","XL","XXL"]},
  {n:"Men's Suit",c:"men",img:"https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=500&fit=crop",desc:"Tailored charcoal suit for the modern gentleman",an:"بدلة رجالية",ad:"بدلة رمادية أنيقة تناسب الرجل العصري",colors:["Charcoal","Gray","Black"],sizes:["S","M","L","XL","XXL"]},
  {n:"Women's Dress",c:"women",img:"images/_7 يونيو 2026 عند الساعة 10_34 ص(2).jpg",desc:"Elegant ivory silk evening dress with flowing skirt",an:"فستان سهرة نسائي",ad:"فستان سهرة حريري أنيق بلون عاجي مع تنورة منسدلة",colors:["Ivory","Champagne","White"],sizes:["XS","S","M","L","XL"]},
  {n:"Women's Wool Coat",c:"women",img:"images/womens-wool-coat.jpg",desc:"Chic wool coat with a flared hem and button details",an:"معطف صوف نسائي",ad:"معطف صوفي أنيق بتفاصيل أزرار وقصة مروحة",colors:["Beige","Cream","Gray"],sizes:["XS","S","M","L","XL"]},
  {n:"Men's Jacket",c:"men",img:"images/_7 يونيو 2026 عند الساعة 10_34 ص(1).png",desc:"Italian leather jacket in classic noir",an:"سترة جلد رجالية",ad:"سترة جلدية إيطالية بتصميم كلاسيكي أنيق",colors:["Black","Brown","Cognac"],sizes:["S","M","L","XL","XXL"]},
  {n:"Men's Turtleneck",c:"men",img:"https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=500&fit=crop",desc:"Pure cashmere turtleneck in soft cream",an:"كنزة تورتل نيك رجالية",ad:"كنزة كشمير ناعمة بلون عاجي دافئ",colors:["Cream","Gray","Navy"],sizes:["XS","S","M","L","XL"]},
  {n:"Women's Blouse",c:"women",img:"https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=500&fit=crop",desc:"Sophisticated rose gold silk blouse",an:"بلوزة نسائية",ad:"بلوزة حريرية بلون وردي ذهبي أنيقة",colors:["Rose Gold","Blush","Champagne"],sizes:["XS","S","M","L","XL"]},
  {n:"Women's Cocktail Dress",c:"women",img:"images/_7 يونيو 2026 عند الساعة 10_34 ص(7).jpg",desc:"Stunning sapphire cocktail dress for special nights",an:"فستان كوكتيل نسائي",ad:"فستان كوكتيل أزرق لامع للمناسبات الخاصة",colors:["Sapphire","Navy","Purple"],sizes:["XS","S","M","L"]},
  {n:"Men's Chinos",c:"men",img:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop",desc:"Premium graphite chinos for everyday elegance",an:"بنطلون شينو رجالي",ad:"بنطلون شينو رمادي فاخر للأناقة اليومية",colors:["Graphite","Khaki","Black"],sizes:["28","30","32","34","36","38"]},
  {n:"Women's Skirt",c:"women",img:"https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=500&fit=crop",desc:"Flowing pearl maxi skirt with silk blend",an:"تنورة ماكسي نسائية",ad:"تنورة ماكسي حريرية بتدرج لؤلؤي ناعم",colors:["Pearl","Ivory","Silver"],sizes:["XS","S","M","L","XL"]},
  {n:"Men's Shirt",c:"men",img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop",desc:"Crisp onyx dress shirt with perfect fit",an:"قميص رجالي",ad:"قميص رسمي أنيق بلون الأونيكس بقصة مثالية",colors:["Onyx","White","Gray"],sizes:["S","M","L","XL","XXL"]},
  {n:"Women's Tie-Front Top",c:"women",img:"images/womens-tie-top.jpg",desc:"Elegant red tie-front top with billowy sleeves",an:"بلوزة بتفاصيل رباط نسائية",ad:"بلوزة حمراء أنيقة برابط أمامي وأكمام واسعة",colors:["Red","Burgundy","Wine"],sizes:["XS","S","M","L"]},
  {n:"Men's Loafers",c:"men",img:"https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=500&fit=crop",desc:"Handcrafted burgundy suede loafers",an:"حذاء لوفر رجالي",ad:"حذاء سويدي خمري أنيق مصنوع يدويًا",colors:["Burgundy","Brown","Black"],sizes:["6","7","8","9","10","11","12"]},
  {n:"Women's Cardigan",c:"women",img:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=500&fit=crop",desc:"Elegant platinum knit cardigan",an:"كارديجان نسائي",ad:"كارديجان محبوك بلون البلاتين بتصميم ناعم",colors:["Platinum","Gray","Black"],sizes:["XS","S","M","L","XL"]},
  {n:"Men's Watch Cuff",c:"men",img:"https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=500&fit=crop",desc:"Titanium watch cuff with timeless design",an:"إسوارة ساعة رجالية",ad:"إسوارة ساعة من التيتانيوم بتصميم خالد",colors:["Titanium","Silver","Gold"],sizes:["One Size"]},
  {n:"Women's Suit Set",c:"women",img:"images/womens-suit-set.jpg",desc:"Structured blazer and pleated skirt set in charcoal grey",an:"طقم بدلة نسائي",ad:"طقم بليزر وتنورة مطوية أنيق بلون الفحم",colors:["Gray","Charcoal"],sizes:["XS","S","M","L","XL"]},
  {n:"Men's Double-Breasted Blazer",c:"men",img:"https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=500&fit=crop",desc:"Classic navy double-breasted blazer",an:"بليزر مزدوج الأزرار رجالي",ad:"بليزر بحري كلاسيكي بتصميم مزدوج الأزرار",colors:["Navy","Black","Charcoal"],sizes:["S","M","L","XL","XXL"]},
  {n:"Women's Organza Blouse",c:"women",img:"images/F77388s6.webp",desc:"Delicate lilac organza blouse with ruffle details",an:"بلوزة أورغانزا نسائية",ad:"بلوزة أورغانزا ناعمة بلون اللافندر بتفاصيل كشكش",colors:["Lilac","Purple","Mauve"],sizes:["XS","S","M","L"]},
  {n:"Men's Hoodie",c:"men",img:"images/mens-hoodie.jpg",desc:"Cozy blue hoodie with a soft fleece interior",an:"هودي رجالي",ad:"هودي أزرق مريح مع بطانة صوف ناعمة",colors:["Blue","Navy","Slate"],sizes:["S","M","L","XL","XXL"]},
  {n:"Women's Clutch",c:"women",img:"https://images.unsplash.com/photo-1559563458-527698bf5295?w=400&h=500&fit=crop",desc:"Glamorous gold sequin clutch",an:"كلاتش نسائي",ad:"كلاتش ذهبي متلألئ بترتر للمناسبات",colors:["Gold","Silver","Rose Gold"],sizes:["One Size"]},
  {n:"Men's Trousers",c:"men",img:"https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400&h=500&fit=crop",desc:"Tailored ebony formal trousers",an:"بنطلون رسمي رجالي",ad:"بنطلون رسمي أسود بقصة مضبوطة",colors:["Black","Charcoal","Gray"],sizes:["28","30","32","34","36","38"]},
  {n:"Women's Knit Sweater",c:"women",img:"images/womens-knit-sweater.jpg",desc:"Soft grey knit sweater with relaxed fit",an:"كنزة صوف نسائية",ad:"كنزة محبوكة ناعمة بلون رمادي مع قصة مريحة",colors:["Gray","Ivory"],sizes:["XS","S","M","L","XL"]},
  {n:"Men's Casual Polo Shirt",c:"men",img:"images/mens-casual-polo.avif",desc:"Comfortable casual polo shirt with subtle sporty design",an:"قميص بولو كاجوال رجالي",ad:"قميص بولو مريح بتصميم رياضي خفيف",colors:["White","Green","Charcoal"],sizes:["S","M","L","XL","XXL"]},
  {n:"Men's tshirt",c:"men",img:"https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=500&fit=crop",desc:"Elegant coral pleated midi dress",an:"فستان ميدي نسائي",ad:"فستان ميدي مطوي أنيق باللون المرجاني",colors:["Coral","Peach","Orange"],sizes:["XS","S","M","L","XL"]}
].map((p,i)=>({...p,id:i,price:Math.floor(Math.random()*971 + 30),rating:(Math.random()*2+3).toFixed(1),selectedColor:p.colors[0],selectedSize:p.sizes[0]}));

const EGP_RATE = 31.5;
function formatPrice(amount) {
  const value = Math.round(Number(amount) || 0);
  const label = lang === 'ar' ? 'ج.م' : 'EGP';
  const formattedNumber = value.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US');
  return `${label} ${formattedNumber}`;
}

// Handle profile icon click - always redirect to profile page
function handleProfileClick() {
  window.location.href = 'profile.html';
}

let cart=[];
let currentDonationProductId=null;
const langStorageKey = 'site_lang';
let lang='en';
let darkMode=false;
let currentProductId=null;

// === i18n ===
const translations={
  en:{
    nav_home:"Home",nav_products:"Products",nav_donate:"Donate",nav_about:"About",nav_contact:"Contact",hero_sub:"New Collection 2025",hero_desc:"Curated luxury fashion for the modern connoisseur",filter_title:"Filter Products",filter_search:"Search",filter_category:"Category",filter_sort:"Sort by Price",cat_all:"All",cat_men:"Men",cat_women:"Women",sort_default:"Default",sort_low:"Low → High",sort_high:"High → Low",showing:"Showing",items:"items",buy:"Buy",donate:"Donate",cart_title:"Your Cart",cart_empty:"Your cart is empty",cart_total:"Total",checkout_btn:"Proceed to Checkout",checkout_title:"Checkout",confirm_pay:"Confirm Payment",no_results:"No products found",filters:"Filters",ft_shop:"Shop",ft_men:"Men's Collection",ft_women:"Women's Collection",ft_new:"New Arrivals",ft_support:"Support",ft_faq:"FAQ",ft_shipping:"Shipping",ft_returns:"Returns",ft_follow:"Follow Us",footer_desc:"Luxury fashion crafted for those who demand excellence in every detail.",modal_color:"Select Color",modal_size:"Select Size",modal_qty:"Quantity",hero_tagline:"Redefine Your Elegance",brand_name_html:'<span class="accent">Clothes</span> Bridge',footer_copy:'Clothes Bridge. All rights reserved.',modal_title:'Product Details',modal_price_label:'Price',add_to_cart:'Add to Cart',modal_footer_note:'Premium quality guaranteed | 30-day returns',filter_search_placeholder:'Search products...',checkout_full_name:'Full Name',checkout_name_placeholder:'John Doe',checkout_email:'Email',checkout_email_placeholder:'john@email.com',checkout_phone:'Phone',checkout_phone_placeholder:'+1 234 567 890',checkout_address:'Address',checkout_address_placeholder:'123 Fashion St',checkout_payment_method:'Payment Method',checkout_payment_cod:'Cash on Delivery',checkout_payment_card:'Credit Card / Visa',checkout_card_number:'Card Number',checkout_card_placeholder:'1234 5678 9012 3456',checkout_expiry:'Expiry',checkout_expiry_placeholder:'MM/YY',checkout_cvv:'CVV',checkout_cvv_placeholder:'123',payment_success_title:'Payment Successful!',payment_success_desc:'Your order has been confirmed.',payment_success_toast:'✅ Payment Successful! Your order has been confirmed.',added_to_cart:'Item added to cart',contact_success:'✅ Thank you! Your message has been sent.',error_fill_required:'Please fill in all required fields.',error_invalid_email:'Invalid email address.',error_invalid_card:'Invalid card number.',profile_title:'My Profile',profile_subtitle:'Manage your account and view your activity',not_logged_in:'You are not logged in.',sign_in:'Sign In',register:'Register',logout:'Logout',browse_shop:'Browse Shop',donate_now:'Donate Now',account_settings:'Account Settings',orders_placed:'Orders Placed',items_donated:'Items Donated',positive_impact:'Positive Impact',recent_purchases:'Recent Purchases',donations_made:'Donations Made',no_purchases:'No purchases yet.',no_donations:'No donations yet.',start_shopping:'Start shopping',make_donation:'Make your first donation',joined:'Joined on',about_title:'About Clothes Bridge',about_subtitle:'Our story and vision',our_journey:'Our Journey',our_journey_desc:'Clothes Bridge was founded with a simple yet powerful vision: to create a bridge between those who have clothes to share and those who need them most. We believe fashion should be accessible, sustainable, and a force for good in our communities.',what_we_believe:'What We Believe In',what_we_believe_desc:'We believe every piece of clothing has the power to make a difference. Whether youre donating gently worn garments or shopping for quality pieces, youre contributing to a cycle of giving that strengthens our communities and promotes sustainable fashion.',mission:'Mission',mission_desc:'To build bridges between generosity and need by providing a seamless platform where quality clothing finds new life, supporting both sustainable fashion and community welfare.',vision:'Vision',vision_desc:'To create a world where no one goes without essential clothing, and where every donation and purchase contributes to a more compassionate and sustainable fashion ecosystem.',values:'Values',values_desc:'Compassion, sustainability, accessibility, and community are at our core. We believe in the power of fashion to connect people and create positive change.',contact_title:'Contact Us',contact_subtitle:'We would love to hear from you',customer_care:'Customer Care',placeholder_name:'Your Name',placeholder_email:'you@example.com',placeholder_message:'Write your message...',message:'Message',send_message:'Send Message',name:'Name',email:'Email',home_hero_tag:'Luxury Fashion Redefined',home_hero_title:'Share Clothes, Spread Kindness Every Season',home_hero_desc:'Discover premium fashion curated for elegance. Shop luxury pieces or donate gently worn clothing to make a meaningful impact.',home_shop_btn:'Shop Now',home_donate_btn:'Donate Now',features_sub:'Curated Selection',features_title:'Featured Pieces',features_desc:'Our most coveted luxury items ready to elevate your wardrobe.',feature_donation:'Smart Donation System',feature_donation_desc:'Easy and organized way to donate clothes to those in need.',feature_security:'Secure & Trusted Platform',feature_security_desc:'Safe connection between donors and beneficiaries with verified transactions.',feature_prices:'Affordable Prices',feature_prices_desc:'Premium fashion at prices suitable for all budgets and occasions.',feature_impact:'Social Impact',feature_impact_desc:'Helping people and supporting communities worldwide through fashion.',featured_view_all:'View Full Collection',cta_shop_title:'Ready to Shop?',cta_shop_desc:'Discover our exclusive collection of premium fashion pieces.',browse_collection_btn:'Browse Collection',cta_donate_title:'Make a Difference',cta_donate_desc:'Share your gently worn clothes and help those in need.',start_donate_btn:'Start Donating',our_services:'Our Services',buy_clothes:'Buy Clothes',buy_clothes_desc:'Shop for quality clothing at affordable prices',donate_clothes:'Donate Clothes',donate_clothes_desc:'Help those in need by donating your gently used clothing',buy_and_donate:'Buy and Donate',buy_and_donate_desc:'Purchase clothes and donate them to others',clients:'Clients',donations:'Donations',projects:'Projects',select_charity:'Select Charity',choose_charity:'Choose a charity partner',charity_children:'Children Care Fund',charity_medical:'Medical Support',charity_education:'Education Foundation',charity_homeless:'Homelessness Fund',optional_message:'Message (Optional)',donation_note:'Your payment covers the item cost. We deliver it to a verified beneficiary.',cancel:'Cancel',confirm_donation:'Confirm Donation',buy_and_donate:'Buy & Donate',auth_title:'Sign In / Register',password:'Password',no_account:"Don't have an account?",register_here:'Register here',create_account:'Create Account',has_account:'Already have an account?',signin_here:'Sign in here',user_type:'User Type',type_individual:'👤 Individual',type_donor:'💝 Donor',type_charity:'🤝 Charity',org_name:'Organization Name',password_min:'Password (min 6 chars)',donor_pref:'Donation Preferences *',select_pref:'Select preference',clothing:'Clothing',accessories:'Accessories',mixed:'Mixed donations',usually_donate:'What items do you usually donate?',optional:'Optional',reg_number:'Registration Number',food:'Food',general:'General',desc_individual:'Register as a private user for shopping and donations.',desc_donor:'Register as a donor and share clothes for those in need.',desc_charity:'Register as a charity organization to coordinate donations.',
    our_partners: "Our Partners",
    make_diff_together: "Make a Difference Together",
    select_charity_partner: "Select a charity partner to view their mission and services.",
    resala_btn: "Resala Charity",
    misr_btn: "Misr El Kheir Foundation",
    orman_btn: "Orman Association",
    charity_partner_label: "Charity Partner",
    services_label: "Services",
    contact_info_label: "Contact Info"
  },
  ar:{
    nav_home:"الرئيسية",nav_products:"المنتجات",nav_donate:"تبرع",nav_about:"حول",nav_contact:"اتصل",hero_sub:"مجموعة جديدة 2025",hero_desc:"أزياء فاخرة منتقاة للذواقة العصري",filter_title:"تصفية المنتجات",filter_search:"بحث",filter_category:"الفئة",filter_sort:"ترتيب حسب السعر",cat_all:"الكل",cat_men:"رجال",cat_women:"نساء",sort_default:"افتراضي",sort_low:"الأقل → الأعلى",sort_high:"الأعلى → الأقل",showing:"عرض",items:"منتج",buy:"شراء",donate:"تبرع",cart_title:"سلة التسوق",cart_empty:"سلة التسوق فارغة",cart_total:"المجموع",checkout_btn:"إتمام الشراء",checkout_title:"الدفع",confirm_pay:"تأكيد الدفع",no_results:"لم يتم العثور على منتجات",filters:"تصفية",ft_shop:"تسوق",ft_men:"مجموعة الرجال",ft_women:"مجموعة النساء",ft_new:"جديد",ft_support:"الدعم",ft_faq:"الأسئلة",ft_shipping:"الشحن",ft_returns:"الإرجاع",ft_follow:"تابعنا",footer_desc:"أزياء فاخرة مصممة لمن يطلبون التميز في كل تفصيل.",modal_color:"اختر اللون",modal_size:"اختر المقاس",modal_qty:"الكمية",hero_tagline:"أعد تعريف أناقتك",brand_name_html:'<span class="accent">جسر</span> ملابس',footer_copy:'جسر ملابس. جميع الحقوق محفوظة.',modal_title:'تفاصيل المنتج',modal_price_label:'السعر',add_to_cart:'أضف إلى السلة',modal_footer_note:'جودة مضمونة | إرجاع خلال 30 يومًا',filter_search_placeholder:'ابحث عن المنتجات...',checkout_full_name:'الاسم الكامل',checkout_name_placeholder:'محمد علي',checkout_email:'البريد الإلكتروني',checkout_email_placeholder:'john@email.com',checkout_phone:'الهاتف',checkout_phone_placeholder:'+1 234 567 890',checkout_address:'العنوان',checkout_address_placeholder:'123 شارع الموضة',checkout_payment_method:'طريقة الدفع',checkout_payment_cod:'الدفع عند الاستلام',checkout_payment_card:'بطاقة ائتمان / فيزا',checkout_card_number:'رقم البطاقة',checkout_card_placeholder:'1234 5678 9012 3456',checkout_expiry:'تاريخ الانتهاء',checkout_expiry_placeholder:'MM/YY',checkout_cvv:'CVV',checkout_cvv_placeholder:'123',payment_success_title:'تم الدفع بنجاح!',payment_success_desc:'تم تأكيد طلبك.',payment_success_toast:'✅ تم الدفع بنجاح! تم تأكيد طلبك.',added_to_cart:'تمت إضافة المنتج إلى السلة',contact_success:'✅ شكرًا لك! تم إرسال رسالتك بنجاح.',error_fill_required:'يرجى ملء جميع الحقول المطلوبة.',error_invalid_email:'البريد الإلكتروني غير صالح.',error_invalid_card:'رقم البطاقة غير صالح.',profile_title:'ملفي الشخصي',profile_subtitle:'ادارة حسابك وعرض نشاطك',not_logged_in:'أنت لم تقم بتسجيل الدخول.',sign_in:'تسجيل الدخول',register:'إنشاء حساب',logout:'تسجيل الخروج',browse_shop:'تصفح المتجر',donate_now:'تبرع الآن',account_settings:'إعدادات الحساب',orders_placed:'الطلبات المُنفذة',items_donated:'العناصر المتبرع بها',positive_impact:'التأثير الإيجابي',recent_purchases:'عمليات الشراء الأخيرة',donations_made:'التبرعات المُقدمة',no_purchases:'لا توجد عمليات شراء حتى الآن.',no_donations:'لم تقدم أي تبرعات حتى الآن.',start_shopping:'ابدأ التسوق',make_donation:'قدم تبرعك الأول',joined:'انضم في',about_title:'حول جسر ملابس',about_subtitle:'قصتنا ورؤيتنا',our_journey:'رحلتنا',our_journey_desc:'تأسس جسر ملابس برؤية بسيطة وقوية: بناء جسر بين من لديهم ملابس للتبرع ومن يحتاجونها أكثر. نؤمن أن الأزياء يجب أن تكون متاحة ومستدامة وقوة للخير في مجتمعاتنا.',what_we_believe:'ما نؤمن به',what_we_believe_desc:'نؤمن أن لكل قطعة ملابس قدرة على إحداث فرق. سواء كنت تتبرع بملابس مستخدمة بعناية أو تتسوق لقطع عالية الجودة، فأنت تساهم في دورة عطاء تقوّي مجتمعاتنا وتعزز الأزياء المستدامة.',mission:'المهمة',mission_desc:'بناء جسور بين الكرم والحاجة من خلال توفير منصة سلسة حيث تولد الملابس عالية الجودة حياة جديدة، داعمة كل من الأزياء المستدامة ورفاهية المجتمع.',vision:'الرؤية',vision_desc:'خلق عالم لا يفتقد فيه أحد الملابس الأساسية، حيث يساهم كل تبرع وشراء في نظام أزياء أكثر تعاطفاً واستدامة.',values:'القيم',values_desc:'الرحمة، الاستدامة، سهولة الوصول، والمجتمع هي جوهر عملنا. نؤمن بقوة الأزياء في ربط الناس وخلق تغير إيجابي.',contact_title:'اتصل بنا',contact_subtitle:'نود أن نسمع منك',customer_care:'خدمة العملاء',placeholder_name:'اسمك',placeholder_email:'example@domain.com',placeholder_message:'اكتب رسالتك...',message:'الرسالة',send_message:'إرسال الرسالة',name:'الاسم',email:'البريد الإلكتروني',home_hero_tag:'أزياء فاخرة معادة الاختراع',home_hero_title:'شارك الملابس انشر اللطف كل موسم',home_hero_desc:'اكتشف الأزياء الفاخرة المنتقاة بعناية. تسوق القطع الفاخرة أو تبرع بالملابس المستخدمة برفق لإحداث تأثير حقيقي.',home_shop_btn:'تسوق الآن',home_donate_btn:'تبرع الآن',features_sub:'اختيار روعة',features_title:'القطع المميزة',features_desc:'أكثر العناصر المرغوبة لدينا جاهزة لرفع مستوى خزانة ملابسك.',feature_donation:'نظام التبرع الذكي',feature_donation_desc:'طريقة سهلة ومنظمة للتبرع بالملابس لمن يحتاجونها.',feature_security:'منصة آمنة وموثوقة',feature_security_desc:'اتصال آمن بين المتبرعين والمستفيدين مع معاملات موثقة.',feature_prices:'أسعار معقولة',feature_prices_desc:'أزياء فاخرة بأسعار مناسبة لجميع الميزانيات والمناسبات.',feature_impact:'التأثير الاجتماعي',feature_impact_desc:'مساعدة الناس ودعم المجتمعات في جميع أنحاء العالم من خلال الأزياء.',featured_view_all:'عرض المجموعة الكاملة',cta_shop_title:'هل أنت مستعد للتسوق؟',cta_shop_desc:'اكتشف مجموعتنا الحصرية من قطع الأزياء الفاخرة.',browse_collection_btn:'تصفح المجموعة',cta_donate_title:'احدث فرقاً',cta_donate_desc:'شارك ملابسك المستخدمة برفق وساعد من يحتاجون.',start_donate_btn:'ابدأ التبرع',our_services:'خدماتنا',buy_clothes:'شراء الملابس',buy_clothes_desc:'تسوق لملابس عالية الجودة بأسعار معقولة',donate_clothes:'تبرع بالملابس',donations:'التبرعات',projects:'المشاريع',select_charity:'اختر مؤسسة',choose_charity:'اختر شريكاً خيرياً',charity_children:'صندوق رعاية الطفولة',charity_medical:'الدعم الطبي',charity_education:'مؤسسة التعليم',charity_homeless:'صندوق المشردين',optional_message:'رسالة (اختياري)',donation_note:'مدفوعاتك تغطي تكلفة القطعة. نحن نقوم بتوصيلها للمستفيدين.',cancel:'إلغاء',confirm_donation:'تأكيد التبرع',buy_and_donate:'شراء وتبرع',auth_title:'تسجيل الدخول / إنشاء حساب',password:'كلمة المرور',no_account:'ليس لديك حساب؟',register_here:'سجل هنا',create_account:'إنشاء حساب جديد',has_account:'لديك حساب بالفعل؟',signin_here:'سجل دخولك هنا',user_type:'نوع المستخدم',type_individual:'👤 أفراد',type_donor:'💝 متبرع',type_charity:'🤝 مؤسسة خيرية',org_name:'اسم المؤسسة',password_min:'كلمة المرور (6 أحرف على الأقل)',donor_pref:'تفضيلات التبرع *',select_pref:'اختر التفضيل',clothing:'ملابس',accessories:'إكسسوارات',mixed:'تبرعات مختلطة',usually_donate:'ما هي العناصر التي تتبرع بها عادة؟',optional:'اختياري',reg_number:'رقم التسجيل',food:'طعام',general:'عام',desc_individual:'سجل كمستخدم خاص للتسوق والتبرعات.',desc_donor:'سجل كمتبرع وشارك الملابس مع المحتاجين.',desc_charity:'سجل كمؤسسة خيرية لتنسيق التبرعات.',
    our_partners: "شركاؤنا",
    make_diff_together: "نصنع الفرق معًا",
    select_charity_partner: "اختر شريكًا خيريًا لعرض رسالته وخدماته.",
    resala_btn: "جمعية رسالة",
    misr_btn: "مؤسسة مصر الخير",
    orman_btn: "جمعية الأورمان",
    charity_partner_label: "شريك خيري",
    services_label: "الخدمات",
    contact_info_label: "معلومات الاتصال"
  }
};

function t(key){return translations[lang]&&translations[lang][key]?translations[lang][key]:translations.en[key]||key}

function saveLang(){
  try{localStorage.setItem(langStorageKey,lang)}catch(e){}
}

function loadLang(){
  try{
    const saved = localStorage.getItem(langStorageKey);
    if(saved==='ar'||saved==='en') lang=saved;
  }catch(e){}
}

function accentizeText(text){
  const words = text.split(' ');
  if(words.length<2) return `<span class="accent font-semibold">${text}</span>`;
  const last = words.pop();
  return `${words.join(' ')} <span class="accent font-semibold">${last}</span>`;
}

function applyLang(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const v=t(el.dataset.i18n);
    if(!v) return;
    if(el.id==='heroTagline'){
      el.innerHTML=accentizeText(v);
    } else if(el.tagName==='OPTION'){
      el.textContent=v;
    } else if(el.tagName==='INPUT'){
      el.placeholder=v;
    } else {
      el.textContent=v;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    el.placeholder=t(el.dataset.i18nPlaceholder);
  });

  const navBrand=document.getElementById('nav-brand');
  const footerBrand=document.getElementById('footer-brand');
  const footerCopyText=document.getElementById('footerCopyText');
  if(navBrand) navBrand.innerHTML=t('brand_name_html');
  if(footerBrand) footerBrand.innerHTML=t('brand_name_html');
  if(footerCopyText) footerCopyText.textContent=t('footer_copy');

  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  document.documentElement.lang=lang==='ar'?'ar':'en';
  const langBtnEl=document.getElementById('langBtn');
  if(langBtnEl) langBtnEl.textContent=lang==='ar'?'AR':'EN';
}

function toggleLang(){
  const app = document.getElementById('app');
  const langBtn = document.getElementById('langBtn');
  
  // Add fade out effect
  app.classList.add('lang-transition-out');
  langBtn.classList.add('switching');
  
  setTimeout(() => {
    lang = lang === 'en' ? 'ar' : 'en';
    saveLang();
    applyLang();
    renderProducts();
    
    // Re-apply translations to nav and footer
    const nav = document.querySelector('main-nav');
    if (nav && nav.applyNavTranslations) nav.applyNavTranslations();
    const footer = document.querySelector('main-footer');
    if (footer && footer.applyFooterTranslations) footer.applyFooterTranslations();
    
    // Remove fade out and add fade in
    app.classList.remove('lang-transition-out');
    app.classList.add('lang-transition-in');
    langBtn.classList.remove('switching');
    
    // Remove fade in animation class after animation completes
    setTimeout(() => {
      app.classList.remove('lang-transition-in');
    }, 300);
  }, 300);
}

function toggleTheme(){
  darkMode = !darkMode;
  document.body.classList.toggle('dark-mode', darkMode);
  document.body.classList.toggle('light-mode', !darkMode);
  
  const bgValue = darkMode ? '#0a0a0a' : '#f9f9f9';
  const cardValue = darkMode ? '#141414' : '#ffffff';
  const textValue = darkMode ? '#ffffff' : '#111111';
  
  document.documentElement.style.setProperty('--bg', bgValue);
  document.documentElement.style.setProperty('--card', cardValue);
  document.documentElement.style.setProperty('--text', textValue);
  document.body.style.background = bgValue;
  document.body.style.color = textValue;
  
  // Update button icon
  const themeBtn = document.querySelector('button[onclick="toggleTheme()"] i');
  if (themeBtn) {
    themeBtn.setAttribute('data-lucide', darkMode ? 'moon' : 'sun');
    lucide.createIcons();
  }
  
  try { localStorage.setItem('aurum_theme', darkMode ? 'dark' : 'light'); } catch(e) {}
}
function applyTheme() {
  document.body.classList.toggle('dark-mode', darkMode);
  document.body.classList.toggle('light-mode', !darkMode);
  
  const bgValue = darkMode ? '#0a0a0a' : '#f9f9f9';
  const cardValue = darkMode ? '#141414' : '#ffffff';
  const textValue = darkMode ? '#ffffff' : '#111111';
  
  document.documentElement.style.setProperty('--bg', bgValue);
  document.documentElement.style.setProperty('--card', cardValue);
  document.documentElement.style.setProperty('--text', textValue);
  document.body.style.background = bgValue;
  document.body.style.color = textValue;
  
  // Update button icon
  const themeBtn = document.querySelector('button[onclick="toggleTheme()"] i');
  if (themeBtn) {
    themeBtn.setAttribute('data-lucide', darkMode ? 'moon' : 'sun');
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

function toggleMobileMenu(){document.getElementById('mobileMenu').classList.toggle('active')}
function openSidebarMobile(){document.getElementById('sidebarWrap').classList.add('active')}
function closeSidebarMobile(){document.getElementById('sidebarWrap').classList.remove('active')}

// === STARS ===
function starsHTML(r){
  let s='';const full=Math.floor(r);const half=r%1>=.5;
  for(let i=0;i<5;i++){s+=i<full?'<span class="star">★</span>':i===full&&half?'<span class="star">★</span>':'<span class="star empty">★</span>'}
  return s;
}

// === OPEN PRODUCT MODAL ===
function openProduct(id){
  currentProductId=id;
  const p=products[id];
  const badge=p.c==='men'?t('cat_men'):t('cat_women');
  const desc=lang==='ar'?p.ad:p.desc;
  document.getElementById('modalBadge').textContent=badge;
  document.getElementById('modalName').textContent=p.n;
  document.getElementById('modalPrice').textContent=formatPrice(p.price);
  document.getElementById('modalDesc').textContent=desc;
  document.getElementById('modalStars').innerHTML=starsHTML(p.rating);
  document.getElementById('modalRating').textContent=p.rating+' (Reviews)';
  document.getElementById('modalImg').src=p.img;
  
  // Populate color dropdown
  const colorSelect=document.getElementById('modalColor');
  colorSelect.innerHTML=p.colors.map(c=>`<option>${c}</option>`).join('');
  colorSelect.value=p.selectedColor;
  
  // Populate size dropdown
  const sizeSelect=document.getElementById('modalSize');
  sizeSelect.innerHTML=p.sizes.map(s=>`<option>${s}</option>`).join('');
  sizeSelect.value=p.selectedSize;
  
  document.getElementById('productModal').classList.add('active');
  const currentUser = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
  const isCharity = currentUser && currentUser.userType === 'charity';
  const donateModalBtns = document.querySelectorAll('#productModal .outline-btn[onclick*="openDonationModal"]');
  donateModalBtns.forEach(btn => {
    btn.style.display = isCharity ? 'none' : '';
  });
  lucide.createIcons();
}

function closeProduct(){document.getElementById('productModal').classList.remove('active')}
function closeProductOutside(e){if(e.target===e.currentTarget)closeProduct()}

// === DONATION MODAL ===

function openDonationModal(id){
  currentDonationProductId=id;
  const p=products[id];
  const badge=p.c==='men'?t('cat_men'):t('cat_women');
  const productName=lang==='ar'?(p.an||p.n):p.n;
  document.getElementById('donationModalBadge').textContent=badge;
  document.getElementById('donationModalName').textContent=productName;
  document.getElementById('donationModalPrice').textContent=formatPrice(p.price);
  document.getElementById('donationModalImg').src=p.img;
  document.getElementById('donationModalQty').value='1';
  document.getElementById('donationModalMessage').value='';
  document.getElementById('donationError').textContent='';
  document.getElementById('donationModal').classList.add('active');
  lucide.createIcons();
}

function closeDonationModal(){document.getElementById('donationModal').classList.remove('active')}
function closeDonationModalOutside(e){if(e.target===e.currentTarget)closeDonationModal()}

function handleDonationSubmit(){
  const qty=parseInt(document.getElementById('donationModalQty').value)||1;
  const charitySelect=document.getElementById('donationModalCharity');
  const charity=charitySelect.value;
  const charityName=charitySelect.options[charitySelect.selectedIndex].text;
  const message=document.getElementById('donationModalMessage').value;
  const errorEl=document.getElementById('donationError');
  if(!charity){errorEl.textContent='Please select a charity';errorEl.classList.remove('hidden');return}
  if(qty<1){errorEl.textContent='Please select at least 1 item';errorEl.classList.remove('hidden');return}
  errorEl.classList.add('hidden');
  
  const p=products[currentDonationProductId];
  const currentUser = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
  
  // Store donation in tracking array
  const donationToStore={
    id:Date.now(),
    userId: currentUser ? currentUser.id : null,
    userName: currentUser ? currentUser.name : 'Anonymous',
    productId:currentDonationProductId,
    productName:p.n,
    productDesc:p.desc,
    productImg:p.img,
    price:p.price,
    quantity:qty,
    charity:charity,
    charityName:charityName,
    message:message,
    date:new Date().toLocaleDateString(),
    timestamp:Date.now()
  };
  
  try{
    const donations=JSON.parse(localStorage.getItem('aurum_donations'))||[];
    donations.push(donationToStore);
    localStorage.setItem('aurum_donations',JSON.stringify(donations));
  }catch(e){}

  // Add to shopping cart for checkout
  const cartItem = {
    ...p,
    qty: qty,
    id: p.id + '_donation_' + Date.now(), // unique id
    selectedColor: lang === 'ar' ? 'تبرع' : 'Donation',
    selectedSize: charityName,
    price: p.price
  };
  cart.push(cartItem);
  updateCartUI();
  saveCart();
  if(document.getElementById('cartItems')) renderCartItems();
  
  // Update user stats if logged in
  if (currentUser && typeof Auth !== 'undefined') {
    const updatedStats = {
      itemsDonated: (currentUser.itemsDonated || 0) + qty
    };
    Auth.updateUserStats(currentUser.id, updatedStats);
  }

  showToast(t('added_to_cart') || 'Item added to cart');
  closeDonationModal();
}

function addToCartFromModal(){
  const p=products[currentProductId];
  const color=document.getElementById('modalColor').value;
  const size=document.getElementById('modalSize').value;
  p.selectedColor=color;
  p.selectedSize=size;
  addToCart(currentProductId);
  closeProduct();
}

// === RENDER PRODUCTS ===
function renderProducts(){
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  const catFilterEl = document.getElementById('catFilter');
  const sortFilterEl = document.getElementById('sortFilter');
  const searchInputEl = document.getElementById('searchInput');
  const cat = catFilterEl ? catFilterEl.value : 'all';
  const sort = sortFilterEl ? sortFilterEl.value : 'default';
  const search = searchInputEl ? searchInputEl.value.toLowerCase() : '';
  let filtered = products.filter(p=>{
    const haystack = `${p.n} ${p.an} ${p.desc} ${p.ad}`.toLowerCase();
    return (cat==='all'||p.c===cat) && haystack.includes(search);
  });
  if(sort==='low')filtered.sort((a,b)=>a.price-b.price);
  else if(sort==='high')filtered.sort((a,b)=>b.price-a.price);

  // If on home page, limit to 6 featured products
  try {
    const page = window.location.pathname.split('/').pop();
    const isHome = page === '' || page === 'index.html';
    if (isHome) {
      filtered = filtered.slice(0, 6);
    }
  } catch (e) {}

  const productCountEl = document.getElementById('productCountDisplay');
  const noResultsEl = document.getElementById('noResults');
  if (productCountEl) productCountEl.textContent = filtered.length;
  if (noResultsEl) noResultsEl.classList.toggle('hidden', filtered.length > 0);

  const currentUser = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
  const isCharity = currentUser && currentUser.userType === 'charity';

  grid.innerHTML = '';
  filtered.forEach((p,i)=>{
    const badge=p.c==='men'?t('cat_men'):t('cat_women');
    const productName = lang==='ar'? (p.an || p.n) : p.n;
    const buyText=t('buy');
    const donateText=t('donate');
    const card=document.createElement('div');
    card.className='product-card fade-up';
    card.style.animationDelay=`${i*0.05}s`;
    card.innerHTML=`
      <div class="img-wrap" onclick="openProduct(${p.id})" style="cursor:pointer"><span class="badge">${badge}</span><img src="${p.img}" alt="${productName}" loading="lazy" onerror="this.style.background='linear-gradient(135deg,#1a1a1a,#2a2a2a)';this.alt='${productName}';this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 500%22><rect fill=%22%231a1a1a%22 width=%22400%22 height=%22500%22/><text x=%22200%22 y=%22250%22 fill=%22%23333%22 text-anchor=%22middle%22 font-size=%2220%22>ClothBridge</text></svg>'"></div>
      <div class="p-4">
        <h3 class="font-display text-lg font-semibold mb-1">${productName}</h3>
        <div class="flex items-center justify-between mb-3">
          <span class="accent font-bold text-lg">${formatPrice(p.price)}</span>
          <span class="text-sm">${starsHTML(p.rating)} <span class="text-gray-500 text-xs">${p.rating}</span></span>
        </div>
        <div class="flex gap-2">
          <button class="gold-btn flex-1 py-2 text-xs uppercase tracking-wider" onclick="addToCart(${p.id})">${buyText}</button>
          ${!isCharity ? `<button class="outline-btn flex-1 py-2 text-xs uppercase tracking-wider" onclick="openDonationModal(${p.id})">${donateText}</button>` : ''}
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

function applyFilters(){renderProducts()}

// === CART ===
function saveCart(){
  try { localStorage.setItem('aurum_cart', JSON.stringify(cart)); } catch(e) {}
}

function addToCart(id){
  const p=products.find(x=>x.id===id);
  const existing=cart.find(x=>x.id===id);
  if(existing) existing.qty++;
  else cart.push({...p,qty:1});
  updateCartUI();
  saveCart();
  showToast('added_to_cart');
}

function removeFromCart(id){
  cart=cart.filter(x=>x.id!==id);
  updateCartUI();
  saveCart();
  renderCartItems();
}

function updateCartUI(){
  const count=cart.reduce((s,x)=>s+x.qty,0);
  const el=document.getElementById('cartCount');
  if(el){
    el.style.display=count>0?'flex':'none';
    el.textContent=count;
  }
}

function loadCart(){
  try {
    const saved = localStorage.getItem('aurum_cart');
    if (saved) {
      cart = JSON.parse(saved).map(item => ({ ...item }));
    }
  } catch (e) {
    cart = [];
  }
  updateCartUI();
}

function renderCartItems(){
  const container=document.getElementById('cartItems');
  const empty=document.getElementById('cartEmpty');
  const footer=document.getElementById('cartFooter');
  if(!cart.length){container.innerHTML='';empty.classList.remove('hidden');footer.classList.add('hidden');return}
  empty.classList.add('hidden');footer.classList.remove('hidden');
  container.innerHTML=cart.map(item=>{
    const title = lang==='ar'? (item.an || item.n) : item.n;
    return `
    <div class="flex items-center gap-3 py-3 border-b border-[#222]">
      <img src="${item.img}" class="w-14 h-14 rounded-lg object-cover" loading="lazy" onerror="this.style.background='#252525'">
      <div class="flex-1">
        <p class="text-sm font-medium">${title}</p>
        <p class="text-xs text-gray-300">${item.selectedColor} • ${item.selectedSize}</p>
        <p class="text-xs text-gray-300">${formatPrice(item.price)} × ${item.qty}</p>
      </div>
      <button onclick="removeFromCart(${item.id})" class="text-gray-500 hover:text-red-400 transition"><i data-lucide="trash-2" style="width:16px;height:16px"></i></button>
    </div>`
  }).join('');
  document.getElementById('cartTotal').textContent=formatPrice(cart.reduce((s,x)=>s+x.price*x.qty,0));
  lucide.createIcons();
}

function openCart(){document.getElementById('cartModal').classList.add('active');renderCartItems();document.getElementById('checkoutForm').classList.add('hidden');document.getElementById('successView').classList.add('hidden');document.getElementById('cartFooter').classList.remove('hidden')}
function closeCart(){document.getElementById('cartModal').classList.remove('active')}
function closeCartOutside(e){if(e.target===e.currentTarget)closeCart()}

function showCheckout(){
  // Check if user is logged in before allowing checkout
  let isLoggedIn = false;
  try {
    const auth = localStorage.getItem('aurum_auth');
    if (auth) isLoggedIn = true;
  } catch(e) {}
  
  if (!isLoggedIn) {
    // Redirect to profile page for login
    localStorage.setItem('redirectAfterLogin', 'checkout');
    window.location.href = 'profile.html';
    return;
  }
  
  // User is logged in, proceed with checkout
  document.getElementById('cartFooter').classList.add('hidden');
  document.getElementById('checkoutForm').classList.remove('hidden');
}
function toggleCardFields(){document.getElementById('cardFields').classList.toggle('hidden',document.getElementById('coPayment').value!=='card')}
function formatCard(el){el.value=el.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim()}
function formatExpiry(el){let v=el.value.replace(/\D/g,'');if(v.length>=2)v=v.slice(0,2)+'/'+v.slice(2);el.value=v}

function processPayment(){
  const err=document.getElementById('coError');
  const name=document.getElementById('coName').value.trim();
  const email=document.getElementById('coEmail').value.trim();
  if(!name||!email){err.textContent=t('error_fill_required');err.classList.remove('hidden');return}
  if(!/\S+@\S+\.\S+/.test(email)){err.textContent=t('error_invalid_email');err.classList.remove('hidden');return}
  if(document.getElementById('coPayment').value==='card'){
    const card=document.getElementById('coCard').value.replace(/\s/g,'');
    if(card.length<16){err.textContent=t('error_invalid_card');err.classList.remove('hidden');return}
  }
  err.classList.add('hidden');
  const btn=document.getElementById('payBtn');
  btn.innerHTML='<div class="spinner mx-auto"></div>';btn.disabled=true;
  setTimeout(()=>{
    document.getElementById('checkoutForm').classList.add('hidden');
    document.getElementById('successView').classList.remove('hidden');
    lucide.createIcons();

    // Save order to localStorage for user dashboard
    try {
      const currentUser = (typeof Auth !== 'undefined') ? Auth.getCurrentUser() : null;
      const orderItems = cart.map(item => ({
        productId: item.id,
        name: item.n || item.productName || item.title,
        qty: item.qty || 1,
        price: item.price,
        img: item.img,
        color: item.selectedColor,
        size: item.selectedSize
      }));
      const order = {
        id: Date.now(),
        userId: currentUser ? currentUser.id : null,
        userName: currentUser ? currentUser.name : 'Guest',
        items: orderItems,
        total: cart.reduce((s,x)=>s+x.price*x.qty,0),
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
      };
      const orders = JSON.parse(localStorage.getItem('aurum_orders')) || [];
      orders.push(order);
      localStorage.setItem('aurum_orders', JSON.stringify(orders));

      // Update user stats (ordersPlaced)
      if (currentUser && typeof Auth !== 'undefined') {
        const qty = cart.reduce((s,x)=>s+(x.qty||1),0);
        Auth.updateUserStats(currentUser.id, { ordersPlaced: (currentUser.ordersPlaced || 0) + qty });
      }
    } catch (e) {}

    // Clear cart and UI
    cart=[];updateCartUI();saveCart();
    showToast('payment_success_toast');
    setTimeout(()=>closeCart(),3000);
  },2000);
}

function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

// === INIT ===
try {
  const savedTheme = localStorage.getItem('aurum_theme');
  if (savedTheme === 'dark') {
    darkMode = true;
  } else if (savedTheme === 'light') {
    darkMode = false;
  } else {
    darkMode = true;
  }
  
  // Apply initial theme
  document.body.classList.toggle('dark-mode', darkMode);
  document.body.classList.toggle('light-mode', !darkMode);
  
  const bgValue = darkMode ? '#0a0a0a' : '#f9f9f9';
  const cardValue = darkMode ? '#141414' : '#ffffff';
  const textValue = darkMode ? '#ffffff' : '#111111';
  
  document.documentElement.style.setProperty('--bg', bgValue);
  document.documentElement.style.setProperty('--card', cardValue);
  document.documentElement.style.setProperty('--text', textValue);
  document.body.style.background = bgValue;
  document.body.style.color = textValue;
  
  // Update button icon
  const themeBtn = document.querySelector('button[onclick="toggleTheme()"] i');
  if (themeBtn) {
    themeBtn.setAttribute('data-lucide', darkMode ? 'moon' : 'sun');
  }
} catch(e) {}

const defaultConfig={
  brand_name:'ClothBridge',
  hero_tagline:'Redefine Your Elegance',
  footer_text:'© 2025 ClothBridge. All rights reserved.',
  background_color:'#111111',
  surface_color:'#1a1a1a',
  text_color:'#ffffff',
  accent_color:'rgb(51, 153, 255)',
  secondary_action_color:'#444444',
  font_family:'Outfit',
  font_size:14
};

function applyConfig(config){
  const bg=config.background_color||defaultConfig.background_color;
  const sf=config.surface_color||defaultConfig.surface_color;
  const tx=config.text_color||defaultConfig.text_color;
  const ac=config.accent_color||defaultConfig.accent_color;
  const sa=config.secondary_action_color||defaultConfig.secondary_action_color;
  const ff=config.font_family||defaultConfig.font_family;
  const fs=config.font_size||defaultConfig.font_size;

  document.documentElement.style.setProperty('--bg',bg);
  document.documentElement.style.setProperty('--card',sf);
  document.documentElement.style.setProperty('--text',tx);
  document.documentElement.style.setProperty('--accent',ac);
  document.documentElement.style.setProperty('--font',ff);
  document.body.style.background=bg;
  document.body.style.color=tx;
  document.body.style.fontFamily=`${ff}, Outfit, sans-serif`;

  document.querySelectorAll('.accent').forEach(el=>el.style.color=ac);
  document.querySelectorAll('.gold-btn').forEach(el=>{el.style.background=`linear-gradient(135deg,${ac},${ac}dd)`});
  document.querySelectorAll('.outline-btn').forEach(el=>{el.style.borderColor=ac;el.style.color=ac});
  document.querySelectorAll('.star:not(.empty)').forEach(el=>el.style.color=ac);
  document.querySelectorAll('.star.empty').forEach(el=>el.style.color=sa);

  const brand=config.brand_name||defaultConfig.brand_name;
  const nb=document.getElementById('nav-brand');
  if(nb)nb.innerHTML=`<span style="color:${ac}">${brand.slice(0,2)}</span>${brand.slice(2)}`;
  const fb=document.getElementById('footer-brand');
  if(fb)fb.innerHTML=`<span style="color:${ac}">${brand.slice(0,2)}</span>${brand.slice(2)}`;

  const ht=document.getElementById('heroTagline');
  const tagline=config.hero_tagline||defaultConfig.hero_tagline;
  if(ht){
    const words=tagline.split(' ');
    const last=words.pop();
    ht.innerHTML=words.join(' ')+' <span style="color:'+ac+';font-weight:600">'+last+'</span>';
  }

  const fc=document.getElementById('footerCopy');
  if(fc)fc.textContent=config.footer_text||defaultConfig.footer_text;
}

if(window.elementSdk){
  window.elementSdk.init({
    defaultConfig,
    onConfigChange:async(config)=>{applyConfig(config)},
    mapToCapabilities:(config)=>({
      recolorables:[
        {get:()=>config.background_color||defaultConfig.background_color,set:v=>{config.background_color=v;window.elementSdk.setConfig({background_color:v})}},
        {get:()=>config.surface_color||defaultConfig.surface_color,set:v=>{config.surface_color=v;window.elementSdk.setConfig({surface_color:v})}},
        {get:()=>config.text_color||defaultConfig.text_color,set:v=>{config.text_color=v;window.elementSdk.setConfig({text_color:v})}},
        {get:()=>config.accent_color||defaultConfig.accent_color,set:v=>{config.accent_color=v;window.elementSdk.setConfig({accent_color:v})}},
        {get:()=>config.secondary_action_color||defaultConfig.secondary_action_color,set:v=>{config.secondary_action_color=v;window.elementSdk.setConfig({secondary_action_color:v})}}
      ],
      borderables:[],
      fontEditable:{get:()=>config.font_family||defaultConfig.font_family,set:v=>{config.font_family=v;window.elementSdk.setConfig({font_family:v})}},
      fontSizeable:{get:()=>config.font_size||defaultConfig.font_size,set:v=>{config.font_size=v;window.elementSdk.setConfig({font_size:v})}}
    }),
    mapToEditPanelValues:(config)=>new Map([
      ['brand_name',config.brand_name||defaultConfig.brand_name],
      ['hero_tagline',config.hero_tagline||defaultConfig.hero_tagline],
      ['footer_text',config.footer_text||defaultConfig.footer_text]
    ])
  });
}

loadLang();
applyLang();
loadTheme();
loadCart();
renderProducts();
lucide.createIcons();

function checkCartOpenParam() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('openCart') === '1') {
      openCart();
    }
  } catch (e) {
    // ignore invalid URL
  }
}

checkCartOpenParam();
 (function(){function c(){var b=a.contentDocument||a.contentWindow.document; if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9e2814bb35d3e1ac',t:'MTc3NDU0ODMwMC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})(); 

document.getElementById("year").textContent = new Date().getFullYear();
