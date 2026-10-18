import { useEffect, useRef, useState } from 'react';
import { Bot, Check, MessageCircle, RotateCcw, Send, ShieldCheck, Sparkles, X } from 'lucide-react';

const quickQuestions = {
  en: ['How do I place an order?', 'How do I use the cart?', 'How can I donate clothes?', 'Which charities can I choose?'],
  ar: ['إزاي أطلب منتج؟', 'إزاي أستخدم السلة؟', 'إزاي أتبرع بملابس؟', 'إيه الجمعيات المتاحة؟'],
};

const copy = {
  en: {
    title: 'Clothes Bridge Assistant',
    online: 'Instant website guidance',
    welcomeTitle: 'Welcome to Clothes Bridge',
    welcome: 'Get clear, step-by-step help with shopping, donations, your account, and our charity partners.',
    privacy: 'Private by design: answers run locally on this device.',
    placeholder: 'Write your question...',
    send: 'Send message',
    close: 'Close assistant',
    open: 'Open assistant',
    reset: 'Start a new conversation',
    you: 'You',
    assistant: 'Website guide',
    footer: 'Website guide · Local answers',
    limit: 'Please keep your question under 500 characters.',
    retry: 'Ask another question',
  },
  ar: {
    title: 'مساعد Clothes Bridge',
    online: 'إرشادات فورية لاستخدام الموقع',
    welcomeTitle: 'أهلًا بك في Clothes Bridge',
    welcome: 'هتلاقي إرشادات واضحة خطوة بخطوة للتسوق والتبرع واستخدام الحساب والجمعيات.',
    privacy: 'خصوصيتك أولويتنا: الردود بتتعالج محليًا على جهازك.',
    placeholder: 'اكتب سؤالك...',
    send: 'إرسال الرسالة',
    close: 'إغلاق المساعد',
    open: 'افتح المساعد',
    reset: 'بدء محادثة جديدة',
    you: 'أنت',
    assistant: 'دليل الموقع',
    footer: 'دليل الموقع · ردود محلية',
    limit: 'اكتب سؤالك في أقل من ٥٠٠ حرف.',
    retry: 'اسأل سؤالًا آخر',
  },
};

const suggestions = {
  en: {
    shopping: ['How do I use the cart?', 'Can I choose a size and color?'],
    donation: ['Which charities can I donate to?', 'How do I donate a product?'],
    charities: ['How do I find a nearby branch?', 'Tell me about donations'],
    account: ['How do I create an account?', 'What can a donor do?'],
    checkout: ['How do I open my cart?', 'Is this a real payment?'],
    general: ['How do I shop?', 'How do I donate?', 'How do I contact you?'],
  },
  ar: {
    shopping: ['إزاي أستخدم السلة؟', 'أقدر أختار اللون والمقاس؟'],
    donation: ['إيه الجمعيات المتاحة؟', 'إزاي أتبرع بمنتج؟'],
    charities: ['إزاي ألاقي أقرب فرع؟', 'إزاي أتبرع بملابس؟'],
    account: ['إزاي أعمل حساب؟', 'إيه مميزات حساب المتبرع؟'],
    checkout: ['إزاي أفتح السلة؟', 'هل الدفع حقيقي؟'],
    general: ['إزاي أشتري؟', 'إزاي أتبرع؟', 'إزاي أتواصل معاكم؟'],
  },
};

function normalizeQuestion(value) {
  return value
    .toLocaleLowerCase()
    .normalize('NFKD')
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getReply(question, lang) {
  const ar = lang === 'ar';
  const text = normalizeQuestion(question);
  const reply = (content, href, label, topic = 'general') => ({
    content,
    link: href ? { href, label } : null,
    suggestions: suggestions[ar ? 'ar' : 'en'][topic],
  });

  if (/^(hi|hello|hey|good morning|good evening|مرحبا|اهلا|السلام عليكم|صباح الخير|مساء الخير)$/.test(text)) {
    return reply(
      ar
        ? 'أهلًا بيك! أقدر أشرح لك إزاي تتسوق أو تتبرع أو تعمل حساب، وأساعدك تعرف الجمعيات الموجودة. اختار موضوع من الأسئلة تحت أو اكتب سؤالك.'
        : 'Hi! I can walk you through shopping, donations, account setup, and our partner charities. Choose a topic below or type your question.',
      null, null,
    );
  }

  if (/^(thanks|thank you|thank you very much|appreciate it|شكرا|شكرا ليك|متشكر|تسلم)$/.test(text)) {
    return reply(
      ar ? 'العفو، أنا موجود لو احتجت أي مساعدة تانية.' : 'You’re welcome! I’m here if you need help with anything else.',
      null, null,
    );
  }

  if (/^(help|what can you do|what can i ask|how can you help|مساعده|مساعدة|تقدر تساعدني في ايه|ممكن تساعدني)$/.test(text)) {
    return reply(
      ar
        ? 'أقدر أساعدك في: تصفح المنتجات واختيار المقاس واللون، استخدام السلة وإتمام الطلب، التبرع بالملابس أو بمنتج، إنشاء حساب، والوصول للجمعيات والفروع القريبة. اختار سؤالًا مقترحًا أو اكتب اللي محتاجه.'
        : 'I can help you browse products and choose options, use your cart and place an order, donate clothes or a product, create an account, and find our charities or nearby branches. Choose a suggested question or tell me what you need.',
      null, null, 'general',
    );
  }

  if (/location|nearby|near me|branch|map|موقعي|موقعك|اقرب|قريب|فرع|الخريطه|الخريطة/.test(text)) {
    return reply(
      ar
        ? 'لعرض الفروع القريبة، افتح «جمعياتنا»، واختار الجمعية، ثم وافق على طلب المتصفح لتحديد الموقع. لو رفضت الإذن، غيّره من إعدادات الموقع في المتصفح واضغط «إعادة المحاولة».'
        : 'To see nearby branches, open Our Charities, select a partner, and allow your browser to access your location. If you denied access, change the site permission in your browser settings and select Try Again.',
      'ourcharities.html', ar ? 'فتح صفحة الجمعيات' : 'Open charities', 'charities',
    );
  }

  if (/charit|جمعي|جمعيات|اورمان|رساله|مصر الخير|رسالة/.test(text)) {
    return reply(
      ar
        ? 'شركاؤنا ثلاث جمعيات: رسالة، ومؤسسة مصر الخير، وجمعية الأورمان. افتح «جمعياتنا» واضغط على مربع أي جمعية لعرض نبذتها وخدماتها وبيانات التواصل. وتقدر تسمح للموقع باستخدام موقعك لعرض نتائج فروع قريبة على الخريطة.'
        : 'Our three charity partners are Resala, Misr El Kheir Foundation, and Orman Association. Open Our Charities and select a card to see its overview, services, and contact details. You can also allow location access to see nearby branch results on the map.',
      'ourcharities.html', ar ? 'عرض الجمعيات' : 'View our charities', 'charities',
    );
  }

  if (/donat|تبرع|التبرع|اتبرع|متبرع|ملابس مستعمله/.test(text)) {
    const storeDonation = /product|item|store|منتج|قطعه|قطعة|المتجر/.test(text);
    return reply(
      storeDonation
        ? (ar
          ? 'للتبرع بمنتج من المتجر: سجّل الدخول بحساب متبرع، وافتح المنتجات، ثم اضغط «تبرع» على المنتج. اختار رسالة أو مصر الخير أو الأورمان، وحدد الكمية وأكّد التبرع.'
          : 'To donate a store product, sign in with a Donor account, open Products, and select Donate on the item. Choose Resala, Misr El Kheir, or Orman, set the quantity, and confirm.')
        : (ar
            ? 'للتبرع لشخص تختاره، افتح صفحة «تبرع» واملأ بياناتك ونوع الملابس وعدد القطع، ثم أدخل اسم المستفيد ورقم هاتفه. العنوان اختياري، لكنه يساعد على تنسيق التسليم. بعد إرسال النموذج، تواصل مع المستفيد مباشرةً لتنسيق التسليم. ولو قصدك التبرع بمنتج من المتجر، ادخل بحساب متبرع واختار الجمعية من نافذة التبرع.'
            : 'To donate directly to someone you choose, open the Donate page and enter your details, clothing type, and quantity, then provide the recipient’s name and phone number. The address is optional but can help coordinate the handoff. After submitting, contact the recipient directly to arrange delivery. To donate a store product instead, sign in with a Donor account and choose a charity in the donation dialog.'),
      storeDonation ? 'productes.html' : 'donate.html',
      storeDonation ? (ar ? 'عرض المنتجات' : 'Browse products') : (ar ? 'فتح نموذج التبرع' : 'Open donation form'),
      'donation',
    );
  }

  if (/sign.?in|log.?in|register|account|password|حساب|دخول|تسجيل|سجل|كلمه المرور|كلمة المرور|انشاء حساب|إنشاء حساب/.test(text)) {
    return reply(
      ar
        ? 'اضغط أيقونة الحساب أعلى الصفحة، ثم اختار «تسجيل الدخول» أو «إنشاء حساب». التسجيل متاح كفرد أو متبرع أو جمعية. بعد تسجيل الدخول أو إنشاء الحساب هتنتقل تلقائيًا للصفحة الرئيسية.'
        : 'Select the profile icon at the top of the page, then choose Sign In or Register. You can register as an Individual, Donor, or Charity. After signing in or registering, you’ll be taken to the home page.',
      'profile.html', ar ? 'فتح الحساب' : 'Open profile', 'account',
    );
  }

  if (/order status|track.*order|purchase history|my orders|حاله الطلب|طلباتي|مشترياتي/.test(text)) {
    return reply(
      ar
        ? 'راجع سجل مشترياتك من صفحة الحساب بعد تسجيل الدخول. لو ما ظهرش طلبك، تأكد إنك تستخدم نفس الحساب الذي أتممت به الطلب.'
        : 'Check your purchase history from your Profile after signing in. If an order is missing, make sure you are using the account that placed it.',
      'profile.html', ar ? 'فتح الحساب' : 'Open profile', 'account',
    );
  }

  if (/checkout|payment|pay|visa|card|دفع|فيزا|بطاقه|الدفع/.test(text)) {
    return reply(
      ar
        ? 'بعد إضافة المنتجات، افتح أيقونة السلة واضغط «إتمام الشراء». لن يتم تحصيل أي مبلغ.'
        : 'After adding items, open the cart and choose Proceed to Checkout. No payment will be charged.',
      'productes.html?openCart=1', ar ? 'افتح السلة' : 'Open the cart', 'checkout',
    );
  }

  if (/cart|basket|سله|سلة|عربه|عربة|اضيف للسله|اضافه للسله/.test(text)) {
    return reply(
      ar
        ? 'اضغط «شراء» لإضافة منتج للسلة. تقدر تفتح السلة من أيقونة الشنطة أعلى الصفحة، وتراجع المنتجات أو تحذف منتجًا أو تكمل إلى إتمام الشراء.'
        : 'Select Buy to add a product to your cart. Open the bag icon in the top navigation to review items, remove an item, or continue to checkout.',
      'productes.html', ar ? 'اذهب للمنتجات' : 'Go to products', 'checkout',
    );
  }

  if (/order|place an order|request|اطلب|طلب|اوردر/.test(text)) {
    return reply(
      ar
        ? 'لإتمام الطلب: ١) افتح المنتجات واضغط «شراء» على المنتج. ٢) افتح السلة من أيقونة الشنطة وراجع اختيارك. ٣) اضغط «إتمام الشراء». لن يتم تحصيل أي مبلغ.'
        : 'To place an order: 1) Open Products and select Buy on an item. 2) Open the bag icon and review your cart. 3) Select Proceed to Checkout. No payment will be charged.',
      'productes.html', ar ? 'ابدأ التسوق' : 'Start shopping', 'checkout',
    );
  }

  if (/size|color|colour|details|rating|مقاس|لون|تفاصيل|تقييم/.test(text)) {
    return reply(
      ar
        ? 'اضغط على صورة المنتج لفتح تفاصيله. من النافذة تقدر تشوف الوصف والسعر، وتختار اللون والمقاس قبل إضافته للسلة.'
        : 'Select a product image to open its details. The dialog shows its description and price; choose a color and size before adding it to your cart.',
      'productes.html', ar ? 'تصفح المنتجات' : 'Browse products', 'shopping',
    );
  }

  if (/shop|buy|product|search|filter|sort|اشتري|شراء|منتج|المنتجات|ابحث|بحث|تصفيه|تصفية|ترتيب/.test(text)) {
    return reply(
      ar
        ? 'افتح صفحة المنتجات. استخدم البحث، واختار الفئة (رجالي أو نسائي)، ورتّب المنتجات حسب السعر. اضغط على الصورة لعرض التفاصيل، أو «شراء» لإضافته للسلة.'
        : 'Open Products to browse the catalog. Search by name, filter by Men or Women, and sort by price. Select a product image for details or Buy to add it to your cart.',
      'productes.html', ar ? 'تصفح المنتجات' : 'Browse products', 'shopping',
    );
  }

  if (/contact|message|email|تواصل|اتصل|راسل|رساله|رسالة|ابعت/.test(text)) {
    return reply(
      ar
        ? 'افتح صفحة «اتصل بنا» واملأ الاسم والبريد الإلكتروني والموضوع والرسالة، ثم أرسل النموذج.'
        : 'Open Contact, fill in your name, email, subject, and message, then submit the form.',
      'contact.html', ar ? 'صفحة اتصل بنا' : 'Open Contact', 'general',
    );
  }

  if (/language|arabic|english|translation|الغه|اللغه|عربي|انجليزي|ترجمه|ترجمة/.test(text)) {
    return reply(
      ar
        ? 'غيّر اللغة من زر AR/EN في الشريط العلوي. اختيارك يُحفظ تلقائيًا للمرة القادمة.'
        : 'Use the AR/EN button in the top navigation to switch languages. Your preference is saved for next time.',
      null, null,
    );
  }

  if (/theme|dark|light|لون الموقع|الوضع الليلي|الوضع الفاتح/.test(text)) {
    return reply(
      ar
        ? 'استخدم أيقونة القمر أو الشمس في الشريط العلوي للتبديل بين الوضع الداكن والفاتح. اختيارك يُحفظ تلقائيًا.'
        : 'Use the moon or sun icon in the top navigation to switch between dark and light mode. Your preference is saved automatically.',
      null, null,
    );
  }

  if (/about|story|mission|vision|من نحن|قصه الموقع|قصة الموقع|عن الموقع/.test(text)) {
    return reply(
      ar
        ? 'صفحة «من نحن» تعرض قصة Clothes Bridge ورؤيتها ورسالتها وقيمها والخدمات التي يقدمها الموقع.'
        : 'The About page shares the Clothes Bridge story, mission, vision, values, and services.',
      'about.html', ar ? 'عن Clothes Bridge' : 'About Clothes Bridge', 'general',
    );
  }

  return reply(
    ar
      ? 'أقدر أساعدك خطوة بخطوة في شراء المنتجات، واستخدام السلة، والتبرع، وإنشاء الحساب، ومعرفة الجمعيات أو التواصل معنا. جرّب اختيار سؤال مقترح أو اكتب سؤالك بطريقة تانية.'
      : 'I can guide you through shopping, using the cart, donating, creating an account, finding a charity, or contacting us. Try a suggested question or rephrase what you need.',
    null, null, 'general',
  );
}

function formatTime(timestamp, locale) {
  return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }).format(timestamp);
}

export default function HelpChat({ lang = 'en' }) {
  const isArabic = lang === 'ar';
  const locale = isArabic ? 'ar-EG' : 'en';
  const text = copy[isArabic ? 'ar' : 'en'];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const messagesRef = useRef([]);
  const messageIdRef = useRef(0);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    messagesRef.current = messages;
    if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  function sendMessage(value = input) {
    const question = value.trim();
    if (!question) return;
    if (question.length > 500) {
      setError(text.limit);
      return;
    }

    const timestamp = Date.now();
    const messageId = messageIdRef.current;
    messageIdRef.current += 1;
    const response = getReply(question, lang);
    const nextMessages = [
      ...messagesRef.current,
      { id: `${messageId}-user`, role: 'user', content: question, timestamp },
      { id: `${messageId}-assistant`, role: 'assistant', ...response, timestamp },
    ];
    messagesRef.current = nextMessages;
    setMessages(nextMessages);
    setInput('');
    setError('');
  }

  function startNewConversation() {
    messagesRef.current = [];
    setMessages([]);
    setInput('');
    setError('');
    inputRef.current?.focus();
  }

  const latestAssistantId = [...messages].reverse().find((message) => message.role === 'assistant')?.id;

  return (
    <div className={`help-chat ${isArabic ? 'help-chat-rtl' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {open && (
        <section id="help-chat-panel" className="help-chat-panel" role="dialog" aria-modal="false" aria-labelledby="help-chat-title">
          <header className="help-chat-header">
            <div className="help-chat-heading">
              <span className="help-chat-avatar"><Bot size={21} /></span>
              <div className="help-chat-heading-copy">
                <h2 id="help-chat-title">{text.title}</h2>
                <p><span className="help-chat-online-dot" />{text.online}</p>
              </div>
            </div>
            <div className="help-chat-header-actions">
              <button type="button" className="help-chat-icon-button" onClick={startNewConversation} aria-label={text.reset} title={text.reset}>
                <RotateCcw size={17} />
              </button>
              <button type="button" className="help-chat-icon-button" onClick={() => setOpen(false)} aria-label={text.close}>
                <X size={20} />
              </button>
            </div>
          </header>

          <div className="help-chat-messages" ref={listRef} role="log" aria-live="polite" aria-relevant="additions" aria-label={isArabic ? 'محادثة المساعدة' : 'Help conversation'}>
            {messages.length === 0 && (
              <div className="help-chat-welcome">
                <span className="help-chat-welcome-icon"><Sparkles size={20} /></span>
                <h3>{text.welcomeTitle}</h3>
                <p>{text.welcome}</p>
                <div className="help-chat-quick-questions">
                  {quickQuestions[isArabic ? 'ar' : 'en'].map((question) => (
                    <button type="button" key={question} onClick={() => sendMessage(question)}>{question}</button>
                  ))}
                </div>
                <div className="help-chat-privacy"><ShieldCheck size={15} />{text.privacy}</div>
              </div>
            )}
            {messages.map((message) => (
              <article className={`help-chat-message ${message.role}`} key={message.id}>
                <div className="help-chat-message-meta">
                  {message.role === 'assistant' ? <Bot size={14} /> : <Check size={14} />}
                  <span>{message.role === 'assistant' ? text.assistant : text.you}</span>
                  <time dateTime={new Date(message.timestamp).toISOString()}>{formatTime(message.timestamp, locale)}</time>
                </div>
                <p>{message.content}</p>
                {message.link && <a href={message.link.href}>{message.link.label}</a>}
                {message.id === latestAssistantId && message.suggestions?.length > 0 && (
                  <div className="help-chat-quick-questions help-chat-follow-ups">
                    {message.suggestions.map((suggestion) => (
                      <button type="button" key={suggestion} onClick={() => sendMessage(suggestion)}>{suggestion}</button>
                    ))}
                  </div>
                )}
              </article>
            ))}
            {error && (
              <div className="help-chat-error" role="alert">
                <span>{error}</span>
                <button type="button" onClick={() => { setError(''); inputRef.current?.focus(); }}>{text.retry}</button>
              </div>
            )}
          </div>

          <form className="help-chat-form" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
            <label className="sr-only" htmlFor="help-chat-input">{text.placeholder}</label>
            <input
              ref={inputRef}
              id="help-chat-input"
              type="text"
              maxLength={500}
              value={input}
              onChange={(event) => { setInput(event.target.value); setError(''); }}
              placeholder={text.placeholder}
              autoComplete="off"
            />
            <button type="submit" disabled={!input.trim()} aria-label={text.send} title={text.send}>
              <Send size={18} />
            </button>
            <p className="help-chat-footer"><ShieldCheck size={13} />{text.footer}</p>
          </form>
        </section>
      )}
      <button
        type="button"
        className="help-chat-toggle"
        ref={toggleRef}
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? text.close : text.open}
        aria-expanded={open}
        aria-controls="help-chat-panel"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
