import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Arrow } from "../ui";
import type { BookingMode } from "../ui";

export default function Header({ scrolled, openBooking, setMenuOpen, menuOpen }: { scrolled: boolean; openBooking: (m: BookingMode) => void; setMenuOpen: (o: boolean) => void; menuOpen: boolean }) {
  const [headerData, setHeaderData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/globals/header-navigation')
      .then((res) => res.json())
      .then((data) => {
        if (data) setHeaderData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const brandName = headerData?.brandName || "itmenaan";
  const brandSub = headerData?.brandSub || "estate · kumaon";
  const bookText = headerData?.bookButtonText || "Book your stay";

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
        <span className="burger" aria-hidden="true">
          <i />
          <i />
        </span>
        <span className="menu-word">Menu</span>
      </button>
      <Link className="wordmark" to="/" aria-label="Home">
        <span>{brandName}</span>
        <small>{brandSub}</small>
      </Link>
      <button className="book-link" onClick={() => openBooking("book")}>
        <span>{bookText}</span> <Arrow />
      </button>
    </header>
  );
}