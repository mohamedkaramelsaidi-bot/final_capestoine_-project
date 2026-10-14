const profiles = {
  misrelkheir: {
    name: "Misr El Kheir Foundation",
    tagline: "Human Development is our main goal.",
    about: "About Misr El Kheir",
    description:
      "Misr El Kheir Foundation (MEK) is a non-profit development institution established in 2007 with the objective of developing the Egyptian individual in a comprehensive manner.",
    services: [
      "Social Solidarity & Clothing",
      "Health and Medical Care",
      "Education",
      "Scientific Research",
    ],
    phone: "16140",
    email: "info@mekeg.org",
    image: "https://www.google.com/s2/favicons?domain=mekeg.org&sz=256",
    alt: "Misr El Kheir",
    heroClass: "bg-green-600",
    backLinkClass: "text-green-600 hover:text-green-800",
  },
  orman: {
    name: "Orman Association",
    tagline: "Developing communities and caring for orphans.",
    about: "About Orman",
    description:
      "Al-Orman Charity Association is an Egyptian non-governmental organization established in 1993, aiming to serve all categories of people in need without any religious or political discrimination.",
    services: [
      "Orphan care and marriage preparations",
      "Clothes distribution",
      "Medical convoys and heart surgeries",
      "Micro-projects for poor families",
    ],
    phone: "19014",
    email: "info@dar-alorman.com",
    image: "https://www.google.com/s2/favicons?domain=dar-alorman.com&sz=256",
    alt: "Orman Association",
    heroClass: "bg-purple-600",
    backLinkClass: "text-purple-600 hover:text-purple-800",
  },
  resala: {
    name: "Resala Charity",
    tagline: "Spreading hope and helping those in need.",
    about: "About Resala",
    description:
      "Resala Charity Organization is one of the largest volunteering organizations in Egypt. It relies on youth volunteers to provide help for millions of people in need across the country.",
    services: [
      "Clothing distribution",
      "Orphan care",
      "Medical assistance",
      "Blood donation campaigns",
    ],
    phone: "19450",
    email: "contact@resala.org",
    image: "https://www.google.com/s2/favicons?domain=resala.org&sz=256",
    alt: "Resala Charity",
    heroClass: "bg-blue-600",
    backLinkClass: "text-blue-600 hover:text-blue-800",
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

export default function CharityDetail({ lang = "en", onToast }) {
  const pathname =
    typeof window === "undefined" ? "" : window.location.pathname;
  const pageName = pathname.split("/").pop().replace(/\.html$/, "");
  const profile = profiles[pageName];

  if (!profile) return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className={`hero-section py-20 ${profile.heroClass} text-white`}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{profile.name}</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">{profile.tagline}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
              <img
                src={profile.image}
                alt={profile.alt}
                className="object-contain p-8 w-48 h-48 md:w-64 md:h-64"
              />
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">{profile.about}</h2>
              <p className="text-gray-600 mb-6">{profile.description}</p>

              <h3 className="text-xl font-bold mb-2">Services</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
                {profile.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>

              <h3 className="text-xl font-bold mb-2">Contact Info</h3>
              <div className="text-gray-600 space-y-2">
                <p className="flex items-center">
                  <Icon name="phone" className="w-4 h-4 mr-2" /> {profile.phone}
                </p>
                <p className="flex items-center">
                  <Icon name="mail" className="w-4 h-4 mr-2" /> {profile.email}
                </p>
                <p className="flex items-center">
                  <Icon name="map-pin" className="w-4 h-4 mr-2" /> Cairo, Egypt
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="ourcharities.html"
              className={`inline-block ${profile.backLinkClass} font-semibold`}
            >
              &larr; Back to Charities
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
