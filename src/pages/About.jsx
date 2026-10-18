import { Eye, Gift, Heart, Layers, MapPin, ShoppingBag, Star, Target, Users } from 'lucide-react';

const beliefs = [
  ['Our Journey', "Clothes Bridge was founded with a simple yet powerful vision: to create a bridge between those who have clothes to share and those who need them most. We believe fashion should be accessible, sustainable, and a force for good in our communities.", 'رحلتنا', 'تأسس جسر الملابس برؤية بسيطة وقوية: إنشاء جسر بين من لديهم ملابس لمشاركتها ومن هم في أمس الحاجة إليها. نؤمن بأن الأزياء يجب أن تكون متاحة ومستدامة وقوة للخير في مجتمعاتنا.'],
  ['What We Believe In', "We believe every piece of clothing has the power to make a difference. Whether you're donating gently worn garments or shopping for quality pieces, you're contributing to a cycle of giving that strengthens our communities and promotes sustainable fashion.", 'ما نؤمن به', 'نؤمن بأن كل قطعة ملابس قادرة على إحداث فرق. سواء كنت تتبرع بملابس مستعملة بحالة جيدة أو تتسوق لشراء قطع عالية الجودة، فأنت تساهم في دورة عطاء تعزز مجتمعاتنا وتشجع الأزياء المستدامة.'],
];
const principles = [
  [Target, 'Mission', 'To build bridges between generosity and need by providing a seamless platform where quality clothing finds new life, supporting both sustainable fashion and community welfare.', 'مهمتنا', 'بناء جسور بين العطاء والاحتياج من خلال منصة سهلة تمنح الملابس عالية الجودة حياة جديدة، وتدعم الأزياء المستدامة ورفاه المجتمع.'],
  [Eye, 'Vision', 'To create a world where no one goes without essential clothing, and where every donation and purchase contributes to a more compassionate and sustainable fashion ecosystem.', 'رؤيتنا', 'أن نصنع عالمًا لا يفتقر فيه أحد إلى الملابس الأساسية، ويسهم فيه كل تبرع وشراء في منظومة أزياء أكثر رحمة واستدامة.'],
  [Star, 'Values', 'Compassion, sustainability, accessibility, and community are at our core. We believe in the power of fashion to connect people and create positive change.', 'قيمنا', 'الرحمة والاستدامة وإمكانية الوصول وروح المجتمع هي أساس عملنا. نؤمن بقدرة الأزياء على ربط الناس وصنع تغيير إيجابي.'],
];

export default function About({ lang }) {
  const ar = lang === 'ar';
  const services = [
    [ShoppingBag, 'Buy Clothes', 'Shop for quality clothing at affordable prices', 'تسوق ملابس عالية الجودة بأسعار مناسبة'],
    [Gift, 'Donate Clothes', 'Help those in need by donating your gently used clothing', 'ساعد المحتاجين بالتبرع بملابسك المستعملة بحالة جيدة'],
    [Heart, 'Buy and Donate', 'Purchase clothes and donate them to others', 'اشترِ الملابس وتبرع بها للآخرين'],
  ];
  return (
    <>
      <section className="relative py-16 px-4 text-center">
        <p className="uppercase text-xs tracking-[6px] accent mb-3 font-semibold">{ar ? 'جسر الملابس' : 'Clothes Bridge'}</p>
        <h1 className="font-display text-5xl md:text-6xl font-light mb-4">{ar ? 'حول جسر الملابس' : 'About Clothes Bridge'}</h1>
        <p className="text-gray-300 max-w-lg mx-auto text-sm">{ar ? 'قصتنا ورؤيتنا' : 'Our story and vision'}</p>
      </section>
      <main className="max-w-7xl mx-auto px-4 pb-20 space-y-12">
        <section className="grid gap-8 md:grid-cols-2 items-center">
          {beliefs.map(([title, description, titleAr, descriptionAr], index) => (
            <div key={title} className="bg-card border border-[#222] w-full rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition">
              <div className="w-16 h-16 bg-gradient-to-br from-[rgb(51, 153, 255)] to-[rgb(0, 102, 204)] rounded-full flex items-center justify-center mx-auto mb-4">
                {index === 0 ? <MapPin size={32} /> : <Heart size={32} />}
              </div>
              <h2 className="text-xl font-semibold mb-3">{ar ? titleAr : title}</h2>
              <p className="text-gray-300 text-sm leading-relaxed">{ar ? descriptionAr : description}</p>
            </div>
          ))}
        </section>
        <section className="grid gap-8 md:grid-cols-3">
          {principles.map(([Icon, title, description, titleAr, descriptionAr]) => (
            <article key={title} className="bg-card border border-[#222] w-full rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition">
              <div className="w-16 h-16 bg-gradient-to-br from-[rgb(51, 153, 255)] to-[rgb(0, 102, 204)] rounded-full flex items-center justify-center mx-auto mb-4"><Icon size={32} /></div>
              <h3 className="font-display text-lg font-semibold mb-2">{ar ? titleAr : title}</h3>
              <p className="text-gray-300 text-sm">{ar ? descriptionAr : description}</p>
            </article>
          ))}
        </section>
        <section className="fade-up bg-card w-full rounded-2xl p-8 mt-12">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            {[[Users, '133+', 'Clients', 'العملاء'], [Gift, '22K', 'Donations', 'التبرعات'], [Layers, '86+', 'Projects', 'المشروعات']].map(([Icon, value, label, labelAr]) => (
              <div key={label}>
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-[rgb(51, 153, 255)] to-[rgb(0, 102, 204)] flex items-center justify-center"><Icon size={24} /></div>
                <div className="text-4xl font-bold accent mb-2">{value}</div>
                <div className="text-gray-300 text-sm">{ar ? labelAr : label}</div>
              </div>
            ))}
          </div>
        </section>
        <section className="fade-up space-y-8">
          <h2 className="text-center text-3xl font-display font-light">{ar ? 'خدماتنا' : 'Our Services'}</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {services.map(([Icon, title, description, descriptionAr]) => (
              <div key={title} className="bg-card border border-[#222] w-full rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(51,153,255,0.3)]">
                <div className="w-16 h-16 bg-gradient-to-br from-[rgb(51, 153, 255)] to-[rgb(0, 102, 204)] rounded-full flex items-center justify-center mx-auto mb-4"><Icon size={32} /></div>
                <h3 className="text-xl font-semibold mb-3">{ar ? ({ 'Buy Clothes': 'شراء الملابس', 'Donate Clothes': 'التبرع بالملابس', 'Buy and Donate': 'شراء وتبرع' })[title] : title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{ar ? descriptionAr : description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
