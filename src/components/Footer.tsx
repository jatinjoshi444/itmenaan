import { useState, useEffect } from "react";
import { Link } from "react-router";
import { MountainMark, Newsletter } from "../ui";

export default function Footer() {
  const [footerData, setFooterData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/globals/footer')
      .then((res) => res.json())
      .then((data) => {
        if (data) setFooterData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const brandName = footerData?.brandName || "itmenaan";
  const brandSub = footerData?.brandSub || "estate · kumaon";
  const memberLabel = footerData?.memberLabel || "A member of";

  let memberLogoSrc = "/images/rare-ocmb.png";
  if (footerData?.memberLogo && typeof footerData.memberLogo === 'object' && footerData.memberLogo.url) {
    memberLogoSrc = footerData.memberLogo.url;
  } else if (footerData?.memberLogo && typeof footerData.memberLogo === 'string') {
    memberLogoSrc = footerData.memberLogo;
  }

  const quoteEyebrow = footerData?.quoteEyebrow || "The mountains have always known.";
  const quoteMain = footerData?.quoteMain || "That life need not be hurried to be full. That silence need not be empty.";
  const quoteSub = footerData?.quoteSub || "That happiness is sometimes nothing more than a beautiful place, good company and the pleasure of wanting nothing else.";
  const quoteSign = footerData?.quoteSign || "Itmenaan. You have arrived.";

  const exploreTitle = footerData?.exploreTitle || "Explore";
  const exploreLinks = footerData?.exploreLinks?.length > 0 ? footerData.exploreLinks : [
    { label: 'The Estate', url: '/the-lodge' },
    { label: 'Stay', url: '/stay' },
    { label: 'The Kumaon Kitchen', url: '/the-kumaon-kitchen' },
    { label: 'Experiences', url: '/experiences' },
    { label: 'Our World', url: '/our-world' },
    { label: 'Journeys & Offers', url: '/journeys' },
    { label: 'Journal', url: '/journal' }
  ];

  const stayTitle = footerData?.stayTitle || "Stay";
  const stayLinks = footerData?.stayLinks?.length > 0 ? footerData.stayLinks : [
    { label: 'Deodar Cottages', url: '/stay/deodar-cottages' },
    { label: 'Pine Cottages', url: '/stay/pine-cottages' },
    { label: 'Oak Rooms', url: '/stay/oak-rooms' },
    { label: 'Kafal Room', url: '/stay/kafal-room' },
    { label: 'A Place for Every Season', url: '/our-world/seasons' }
  ];

  const reservationsTitle = footerData?.reservationsTitle || "Reservations";
  const reservationsLinks = footerData?.reservationsLinks?.length > 0 ? footerData.reservationsLinks : [
    { label: '+91 78400 77773', url: 'tel:+917840077773' },
    { label: 'info@itmenaanlodges.com', url: 'mailto:info@itmenaanlodges.com' },
    { label: 'Contact & Arrival', url: '/contact' },
    { label: 'Check Availability', url: '/book' }
  ];

  const newsletterTitle = footerData?.newsletterTitle || "Letters from Itmenaan";
  const newsletterDesc = footerData?.newsletterDesc || "Occasionally, we send stories, seasonal observations and invitations from Itmenaan.";

  const address = footerData?.address || "Almora District, Uttarakhand, India";
  const copyright = footerData?.copyright || "© 2026 Itmenaan Estate";

  const legalLinks = footerData?.legalLinks?.length > 0 ? footerData.legalLinks : [
    { label: 'Privacy', url: '/contact' },
    { label: 'Terms', url: '/contact' }
  ];

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <MountainMark />
          <Link className="wordmark footer-wordmark" to="/">
            <span>{brandName}</span>
            <small>{brandSub}</small>
          </Link>
          <div className="member-of">
            <p className="eyebrow light">{memberLabel}</p>
            <div className="member-logo">
              <img src={memberLogoSrc} alt="RARE x Original Collection by Marriott Bonvoy" />
            </div>
          </div>
        </div>
        <div className="footer-closing">
          <p className="eyebrow light">{quoteEyebrow}</p>
          <p className="footer-quote">{quoteMain}</p>
          <p className="footer-sub">{quoteSub}</p>
          <p className="footer-sign">{quoteSign}</p>
        </div>
      </div>

      <div className="footer-grid">
        <div>
          <h4>{exploreTitle}</h4>
          {exploreLinks.map((l: any) => (
            <Link key={l.url || l.label} to={l.url}>
              {l.label}
            </Link>
          ))}
        </div>
        <div>
          <h4>{stayTitle}</h4>
          {stayLinks.map((l: any) => (
            <Link key={l.url || l.label} to={l.url}>
              {l.label}
            </Link>
          ))}
        </div>
        <div>
          <h4>{reservationsTitle}</h4>
          {reservationsLinks.map((l: any) => {
            const isExternal = l.url?.startsWith('http') || l.url?.startsWith('tel:') || l.url?.startsWith('mailto:');
            return isExternal ? (
              <a key={l.url || l.label} href={l.url}>{l.label}</a>
            ) : (
              <Link key={l.url || l.label} to={l.url}>{l.label}</Link>
            );
          })}
        </div>
        <div className="footer-news">
          <h4>{newsletterTitle}</h4>
          <p>{newsletterDesc}</p>
          <Newsletter dark />
        </div>
      </div>

      <div className="footer-bottom">
        <span>{address}</span>
        <span>{copyright}</span>
        <span className="footer-legal">
          {legalLinks.map((leg: any, index: number) => (
            <Link key={leg.label || index} to={leg.url}>
              {leg.label}
            </Link>
          ))}
        </span>
      </div>
    </footer>
  );
}