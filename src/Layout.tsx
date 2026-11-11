import { useCallback, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, Link } from "react-router";
import { menuItems } from "./content";
import { img } from "./images";
import { Arrow, BookingContext, EnquiryForm } from "./ui";
import type { BookingMode } from "./ui";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Layout() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<BookingMode | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(0);
  const [headerData, setHeaderData] = useState<any>(null);

  const openBooking = useCallback((m: BookingMode) => {
    setMenuOpen(false);
    setModal(m);
  }, []);

  useEffect(() => {
    fetch('/api/globals/header-navigation')
      .then((res) => res.json())
      .then((data) => {
        if (data) setHeaderData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setModal(null);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || modal ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setModal(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, modal]);

  const rawItems = headerData?.menuItems?.length > 0 ? headerData.menuItems : menuItems;

  const items = rawItems.map((m: any, idx: number) => {
    let imgSrc = img.i9;
    if (m.image && typeof m.image === 'object' && m.image.url) {
      imgSrc = m.image.url;
    } else if (m.image && typeof m.image === 'string') {
      imgSrc = m.image;
    } else if (m.img && img[m.img]) {
      imgSrc = img[m.img];
    } else {
      const fallbackKeys = ['i9', 'i13', 'i6', 'i11', 'i17', 'i22', 'i28'];
      imgSrc = img[fallbackKeys[idx % fallbackKeys.length]] || img.i9;
    }

    return {
      label: m.label,
      to: m.to || m.url || '#',
      n: m.n || `0${idx + 1}`,
      imgSrc: imgSrc,
      subs: (m.subs || []).map((s: any) => Array.isArray(s) ? [s[0], s[1]] : [s.label, s.to])
    };
  });

  const active = items[hover] || items[0];
  const eyebrowText = headerData?.menuEyebrow || "Explore Itmenaan";
  const contactText = headerData?.contactLinkText || "Contact & Arrival";
  const contactUrl = headerData?.contactLinkUrl || "/contact";
  const bookText = headerData?.bookButtonText || "Book your stay";

  return (
    <BookingContext.Provider value={openBooking}>
      <Header scrolled={scrolled} openBooking={openBooking} setMenuOpen={setMenuOpen} menuOpen={menuOpen} />

      <main id="top">
        <Outlet />
      </main>

      <Footer />

      <div className={`menu-overlay ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <div className="menu-visual">
          {items.map((m: any, i: number) => (
            <img key={m.to} src={m.imgSrc} alt="" className={i === hover ? "on" : ""} />
          ))}
          <div className="menu-visual-shade" />
          <p className="menu-caption">{active.label}</p>
        </div>
        <button className="close-button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <span />
          <span />
          <em>Close</em>
        </button>
        <div className="menu-panel">
          <p className="eyebrow">{eyebrowText}</p>
          <nav aria-label="Primary">
            {items.map((m: any, i: number) => (
              <NavLink
                key={m.to}
                to={m.to}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onClick={() => setMenuOpen(false)}
              >
                <small>{m.n}</small>
                <span>{m.label}</span>
                <Arrow />
              </NavLink>
            ))}
          </nav>
          <div className="menu-subs">
            {active.subs.length > 0 && <small>Within {active.label}</small>}
            <div>
              {active.subs.map(([l, t]: [string, string]) => (
                <Link key={t} to={t} onClick={() => setMenuOpen(false)}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
          <div className="menu-meta">
            <Link to={contactUrl} onClick={() => setMenuOpen(false)}>
              {contactText}
            </Link>
            <button onClick={() => openBooking("book")}>{bookText}</button>
          </div>
        </div>
      </div>

      {modal && (
        <div className="booking-modal" role="dialog" aria-modal="true" aria-label={modal === "book" ? "Check availability" : "Send an enquiry"}>
          <button className="modal-backdrop" onClick={() => setModal(null)} aria-label="Close" />
          <div className="booking-card">
            <button className="close-button dark" onClick={() => setModal(null)} aria-label="Close">
              <span />
              <span />
            </button>
            <p className="eyebrow">{modal === "book" ? "Plan your stay" : "Send an enquiry"}</p>
            <h2>
              {modal === "book" ? "When would you like to arrive?" : "Tell us a little about your journey."}
            </h2>
            <EnquiryForm key={modal} mode={modal} onDone={() => setModal(null)} />
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}