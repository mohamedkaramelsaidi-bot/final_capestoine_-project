import { useEffect, useState } from "react";

const charities = {
  resala: {
    name: "Resala Charity",
    nameAr: "جمعية رسالة",
    image: "https://www.google.com/s2/favicons?domain=resala.org&sz=256",
    alt: "Resala Logo",
    description:
      "Resala Charity Organization is one of the largest volunteering organizations in Egypt. It relies on youth volunteers to provide help for millions of people in need across the country.",
    descriptionAr:
      "جمعية رسالة للأعمال الخيرية هي واحدة من أكبر المنظمات التطوعية في مصر. تعتمد على الشباب المتطوعين لتقديم المساعدة لملايين المحتاجين في جميع أنحاء البلاد.",
    services: [
      "Clothing distribution",
      "Orphan care",
      "Medical assistance",
      "Blood donation campaigns",
    ],
    servicesAr: [
      "توزيع الملابس",
      "رعاية الأيتام",
      "المساعدة الطبية",
      "حملات التبرع بالدم",
    ],
    contact: [
      { icon: "phone", text: "19450" },
      { icon: "mail", text: "contact@resala.org" },
      { icon: "map-pin", text: "Cairo, Egypt", textAr: "القاهرة، مصر" },
    ],
  },
  misrelkheir: {
    name: "Misr El Kheir Foundation",
    nameAr: "مؤسسة مصر الخير",
    image: "https://www.google.com/s2/favicons?domain=mekeg.org&sz=256",
    alt: "Misr El Kheir Logo",
    description:
      "Misr El Kheir Foundation (MEK) is a non-profit development institution established in 2007 with the objective of developing the Egyptian individual in a comprehensive manner.",
    descriptionAr:
      "مؤسسة مصر الخير هي مؤسسة تنموية غير ربحية تأسست عام 2007 بهدف تنمية الفرد المصري بشكل شامل.",
    services: [
      "Social Solidarity & Clothing",
      "Health and Medical Care",
      "Education",
      "Scientific Research",
    ],
    servicesAr: [
      "التكافل الاجتماعي والملابس",
      "الرعاية الصحية والطبية",
      "التعليم",
      "البحث العلمي",
    ],
    contact: [
      { icon: "phone", text: "16140" },
      { icon: "mail", text: "info@mekeg.org" },
      { icon: "map-pin", text: "Cairo, Egypt", textAr: "القاهرة، مصر" },
    ],
  },
  orman: {
    name: "Orman Association",
    nameAr: "جمعية الأورمان",
    image: "https://www.google.com/s2/favicons?domain=dar-alorman.com&sz=256",
    alt: "Orman Logo",
    description:
      "Al-Orman Charity Association is an Egyptian non-governmental organization established in 1993, aiming to serve all categories of people in need without any religious or political discrimination.",
    descriptionAr:
      "جمعية الأورمان الخيرية هي منظمة مصرية غير حكومية تأسست عام 1993، تهدف إلى خدمة جميع فئات المحتاجين دون أي تمييز ديني أو سياسي.",
    services: [
      "Orphan care & marriage",
      "Clothes distribution",
      "Medical convoys & surgeries",
      "Micro-projects for poor",
    ],
    servicesAr: [
      "رعاية وزواج الأيتام",
      "توزيع الملابس",
      "قوافل طبية وجراحات",
      "مشاريع صغيرة للفقراء",
    ],
    contact: [
      { icon: "phone", text: "19014" },
      { icon: "mail", text: "info@dar-alorman.com" },
      { icon: "map-pin", text: "Cairo, Egypt", textAr: "القاهرة، مصر" },
    ],
  },
};

const iconPaths = {
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.08 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.69A2 2 0 0 1 22 16.92Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

function Icon({ name, className }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  );
}

export default function Charities({ lang = "en" }) {
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const isArabic = lang === "ar";
  const partnerLabel = isArabic ? "شريك خيري" : "Charity Partner";

  const selectCharity = (id) => setSelectedCharity(id);
  const handleCardKeyDown = (event, id) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectCharity(id);
    }
  };

  const selected = selectedCharity ? charities[selectedCharity] : null;
  useEffect(() => {
    if (!selectedCharity || userLocation || locationLoading || locationError) return undefined;
    if (!navigator.geolocation) {
      setLocationError(isArabic
        ? "متصفحك لا يدعم تحديد الموقع. يمكنك السماح بتحديد الموقع أو فتح خرائط Google يدويًا."
        : "Your browser does not support location access. You can enable location or open Google Maps manually.");
      return undefined;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationLoading(false);
      },
      (error) => {
        console.error("Unable to determine the user's location.", error);
        setLocationError(error.code === error.PERMISSION_DENIED
          ? (isArabic ? "لم يتم السماح بالوصول إلى موقعك. فعّل إذن الموقع للمتصفح ثم أعد المحاولة." : "Location access was denied. Allow location access in your browser, then try again.")
          : (isArabic ? "تعذر تحديد موقعك. تحقق من إعدادات الموقع وحاول مرة أخرى." : "Unable to determine your location. Check your location settings and try again."));
        setLocationLoading(false);
      },
      { enableHighAccuracy: false, maximumAge: 300000, timeout: 15000 },
    );
    return undefined;
  }, [isArabic, locationError, locationLoading, selectedCharity, userLocation]);

  const selectedName = selected ? (isArabic ? selected.nameAr : selected.name) : "";
  const mapQuery = selected && userLocation
    ? encodeURIComponent(`${selected.name} near ${userLocation.latitude},${userLocation.longitude}`)
    : "";
  const mapEmbedUrl = mapQuery ? `https://www.google.com/maps?q=${mapQuery}&output=embed` : "";
  const mapLinkUrl = mapQuery ? `https://www.google.com/maps/search/?api=1&query=${mapQuery}` : "";

  return (
    <>
      <section className="relative py-16 px-4 text-center">
        <p className="uppercase text-xs tracking-[6px] accent mb-3 font-semibold">
          {isArabic ? "شركاؤنا" : "Our Partners"}
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-light mb-4" id="heroTagline">
          {isArabic ? (
            "نصنع الفرق معًا"
          ) : (
            <>
              Make a Difference{" "}
              <span className="accent font-semibold">Together</span>
            </>
          )}
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto text-sm">
          {isArabic
            ? "اختر شريكًا خيريًا لعرض رسالته وخدماته."
            : "Select a charity partner to view their mission and services."}
        </p>
      </section>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 mb-12">
          {Object.entries(charities).map(([id, charity]) => (
            <div
              key={id}
              onClick={() => selectCharity(id)}
              onKeyDown={(event) => handleCardKeyDown(event, id)}
              role="button"
              tabIndex={0}
              className="charity-select-card bg-card border border-[#222] rounded-3xl p-6 text-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 border border-gray-800 p-4 logo-container">
                <img
                  src={charity.image}
                  alt={charity.alt}
                  className="max-w-full max-h-full object-contain filter-logo"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">
                {isArabic ? charity.nameAr : charity.name}
              </h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                {partnerLabel}
              </p>
            </div>
          ))}
        </div>

        <div
          id="charityDetailsContainer"
          key={selectedCharity || "empty"}
          className={`${selected ? "" : "hidden "}animate-fade-in`}
        >
          {selected && (
            <div className="bg-card border border-[#222] rounded-3xl p-8 shadow-lg max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="bg-white rounded-2xl p-6 flex items-center justify-center h-64 border border-[#333] shadow-inner logo-detail-wrap">
                  <img
                    id="cDetailImg"
                    src={selected.image}
                    alt="Charity Logo"
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-xs tracking-[3px] accent uppercase mb-2">
                    {partnerLabel}
                  </p>
                  <h3 className="font-display text-3xl font-semibold mb-4" id="cDetailName">
                    {isArabic ? selected.nameAr : selected.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed" id="cDetailDesc">
                    {isArabic ? selected.descriptionAr : selected.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-gray-500 mb-3 block font-semibold">
                        {isArabic ? "الخدمات" : "Services"}
                      </label>
                      <ul
                        id="cDetailServices"
                        className="list-disc list-inside text-sm text-gray-300 space-y-2"
                      >
                        {(isArabic ? selected.servicesAr : selected.services).map(
                          (service) => (
                            <li key={service}>{service}</li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-gray-500 mb-3 block font-semibold">
                        {isArabic ? "معلومات الاتصال" : "Contact Info"}
                      </label>
                      <div id="cDetailContact" className="text-sm text-gray-300 space-y-3">
                        {selected.contact.map((item) => (
                          <p className="flex items-center" key={item.text}>
                            <Icon
                              name={item.icon}
                              className="w-4 h-4 mr-3 text-[rgb(51,153,255)]"
                            />{" "}
                            {isArabic && item.textAr ? item.textAr : item.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <section className="charity-map-section" aria-labelledby="charityMapTitle">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
                  <div>
                    <h4 className="font-display text-xl font-semibold" id="charityMapTitle">
                      {isArabic ? "أقرب مقر لموقعك" : "Nearest branch to your location"}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {userLocation
                        ? (isArabic ? "نتائج خرائط Google مرتبة بالقرب من موقعك الحالي." : "Google Maps results near your current location.")
                        : (isArabic ? "نحتاج إلى إذنك لتحديد موقعك وعرض أقرب مقر." : "Allow location access to find nearby branches.")}
                    </p>
                  </div>
                  {userLocation && (
                    <a
                      className="charity-map-link"
                      href={mapLinkUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {isArabic ? "افتح في خرائط Google" : "Open in Google Maps"}
                    </a>
                  )}
                </div>
                {locationLoading && <p className="text-sm text-gray-400" role="status">{isArabic ? "جارٍ تحديد موقعك..." : "Finding your location..."}</p>}
                {locationError && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3" role="alert">
                    <p className="text-sm text-gray-400">{locationError}</p>
                    <button type="button" className="charity-map-link" onClick={() => setLocationError("")}>
                      {isArabic ? "إعادة المحاولة" : "Try again"}
                    </button>
                    <a
                      className="charity-map-link"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedName} near me`)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {isArabic ? "ابحث في خرائط Google" : "Search Google Maps"}
                    </a>
                  </div>
                )}
                {userLocation && (
                  <iframe
                    className="charity-map-frame"
                    title={isArabic ? `خريطة أقرب فروع ${selected.nameAr}` : `Map of nearby ${selected.name} branches`}
                    src={mapEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                )}
              </section>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
