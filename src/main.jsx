import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  Camera,
  Music2,
  Send,
  ShoppingBag,
  Sparkles,
  Store,
} from "lucide-react";
import "./styles.css";

const menuItems = [
  ["Majda Gold", "Saffron, date, ceremonial matcha", "42 SAR"],
  ["Majda Date Matcha", "House date syrup, milk, smooth matcha", "32 SAR"],
  ["Saffron Silk", "Saffron milk layered with green tea", "35 SAR"],
  ["Rose Majlis", "Rose milk, iced matcha, soft floral finish", "33 SAR"],
  ["Matcha Tasting Flight", "Pure, milk, and Saudi signature pours", "39 SAR"],
];

const roadmap = [
  ["01", "Validate", "Creator tastings, supplier quotes, and Riyadh pop-ups."],
  ["02", "Launch", "Delivery-led micro-cafe, live whisking, and first retail tins."],
  ["03", "Scale", "Permanent Riyadh shop, catering, Jeddah pop-up pipeline."],
];

const socialCards = [
  "First sip test with matcha beginners",
  "Saudi morning matcha routine",
  "Majlis tray with mini iced pours",
  "Creator tasting table in Riyadh",
];

const assetPath = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

function App() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      root.classList.add("motion-ready");
      document.querySelectorAll("[data-animate]").forEach((node) => node.classList.add("in-view"));
      return;
    }

    root.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.18 },
    );

    document.querySelectorAll("[data-animate]").forEach((node) => observer.observe(node));

    let raf = 0;
    const handleScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        root.style.setProperty("--scroll-shift", `${Math.min(y * 0.045, 42)}px`);
        root.style.setProperty("--scroll-fade", String(Math.max(0, 1 - y / 720)));
        raf = 0;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main>
      <Hero />
      <Menu />
      <Brand />
      <Plan />
      <Social />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="site-header" aria-label="Main navigation">
      <a className="brand-lockup" href="#top" aria-label="MajdaMatcha home">
        MajdaMatcha
      </a>
      <nav>
        <a href="#menu">Menu</a>
        <a href="#brand">Brand</a>
        <a href="#plan">Plan</a>
        <a href="#social">Social</a>
      </nav>
      <a className="reserve-link" href="#plan">
        Reserve the first pour
        <ArrowUpRight size={17} strokeWidth={1.7} />
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <Header />
      <div className="hero-copy" aria-label="MajdaMatcha launch hero">
        <h1>
          <span>Majda</span>
          <span>Matcha</span>
        </h1>
        <p>Saudi-born matcha ritual, built for cafe mornings, majlis trays, and premium everyday gifting.</p>
      </div>
      <div className="hero-product-wrap" aria-hidden="true">
        <img src={assetPath("majdmatcha-hero-product.png")} alt="" className="hero-product" />
      </div>
      <div className="floating-note note-one">Whisked to order</div>
      <div className="floating-note note-two">Date, saffron, rose</div>
    </section>
  );
}

function SectionTitle({ title, children }) {
  return (
    <div className="section-title" data-animate>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function Menu() {
  return (
    <section className="menu-section" id="menu">
      <SectionTitle title="Menu">Modern matcha. Saudi flavors. Served with intention.</SectionTitle>
      <div className="drink-lineup" aria-label="Signature drinks">
        {menuItems.slice(0, 4).map(([name, desc, price], index) => (
          <article className="drink-card" key={name} data-animate style={{ "--stagger": index }}>
            <div className="drink-glass" />
            <h3>{name}</h3>
            <p>{desc}</p>
            <span>{price}</span>
          </article>
        ))}
      </div>
      <div className="menu-table" data-animate>
        {menuItems.map(([name, desc, price], index) => (
          <div className="menu-row" key={name} style={{ "--stagger": index }}>
            <strong>{name}</strong>
            <span>{desc}</span>
            <b>{price}</b>
          </div>
        ))}
      </div>
    </section>
  );
}

function Brand() {
  return (
    <section className="brand-section" id="brand">
      <div>
        <SectionTitle title="Brand">
          Japanese matcha craft carried through Saudi hospitality, composed for guests who notice texture,
          presentation, and the ritual of being welcomed properly.
        </SectionTitle>
        <div className="brand-grid">
          <div>
            <Sparkles size={22} />
            <h3>Positioning</h3>
            <p>Premium but approachable, feminine without fragility, local without heritage costume.</p>
          </div>
          <div>
            <ShoppingBag size={22} />
            <h3>Giftability</h3>
            <p>Embossed tins, matcha dates, Ramadan trays, bridal favors, and corporate ritual boxes.</p>
          </div>
          <div>
            <Store size={22} />
            <h3>Store Feel</h3>
            <p>A calm matcha atelier with visible whisking, warm stone, porcelain, and boutique retail.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Plan() {
  return (
    <section className="plan-section" id="plan">
      <SectionTitle title="Plan">
        Riyadh-first pilot, premium casual pricing, strong beverage margins, and a roadmap from pop-up to
        permanent Saudi flagship.
      </SectionTitle>
      <div className="metric-strip" data-animate>
        <div>
          <strong>65-75%</strong>
          <span>target beverage gross margin</span>
        </div>
        <div>
          <strong>35-48 SAR</strong>
          <span>walk-in average order target</span>
        </div>
        <div>
          <strong>12 months</strong>
          <span>validation to scale roadmap</span>
        </div>
      </div>
      <div className="roadmap">
        {roadmap.map(([num, title, body], index) => (
          <article key={num} data-animate style={{ "--stagger": index }}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Social() {
  return (
    <section className="social-section" id="social">
      <div className="social-intro">
        <SectionTitle title="Social">Moments from the matcha ritual, built for Instagram, TikTok, Snapchat, and launch events.</SectionTitle>
        <div className="social-icons">
          <Camera />
          <Music2 />
          <Send />
        </div>
      </div>
      <div className="social-rail">
        {socialCards.map((card, index) => (
          <article key={card} className={`social-card social-card-${index + 1}`} data-animate style={{ "--stagger": index }}>
            <span>0{index + 1}</span>
            <h3>{card}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-mark">MM</div>
      <div>
        <h3>MajdaMatcha</h3>
        <p>A complete Saudi launch system: brand, business plan, menu, website, and social campaign.</p>
      </div>
      <a className="reserve-link footer-cta" href="mailto:hello@majdamatcha.sa">
        hello@majdamatcha.sa
        <ArrowUpRight size={17} strokeWidth={1.7} />
      </a>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
