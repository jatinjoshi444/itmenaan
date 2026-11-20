import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import type { Link as L, Target } from "./content";

export type BookingMode = "book" | "enquire";
export const BookingContext = createContext<(mode: BookingMode) => void>(() => {});
export const useBooking = () => useContext(BookingContext);

export const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="arrow">
    <path d="M5 12h13M14 7l5 5-5 5" />
  </svg>
);

export const MountainMark = ({ className = "" }: { className?: string }) => (
  <svg className={`mountain-mark ${className}`} viewBox="0 0 80 38" aria-hidden="true">
    <path d="M2 34 23 9l9 12L44 4l34 30" />
    <path d="m15 34 17-13 9 8 11-16 15 21" />
  </svg>
);

export function Cta({
  to,
  children,
  className = "text-link",
  arrow = true,
}: {
  to: Target;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  const open = useBooking();
  const inner = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );
  if (to === "book" || to === "enquire") {
    return (
      <button type="button" className={className} onClick={() => open(to)}>
        {inner}
      </button>
    );
  }
  return (
    <Link to={to} className={className}>
      {inner}
    </Link>
  );
}

export function CtaRow({ links, className = "text-link", dark = false }: { links: L[]; className?: string; dark?: boolean }) {
  return (
    <div className={`cta-row ${dark ? "on-dark" : ""}`}>
      {links.map(([label, to]) => (
        <Cta key={label} to={to} className={className}>
          {label}
        </Cta>
      ))}
    </div>
  );
}

export function Reveal({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" | "article" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Comp = Tag as "div";
  return (
    <Comp ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`}>
      {children}
    </Comp>
  );
}

const interests = [
  "A quiet stay",
  "Deodar Cottages",
  "Pine Cottages",
  "Oak Rooms",
  "Kafal Room",
  "Village walks",
  "Forests & birdsong",
  "The sacred landscape",
  "Dining experiences",
  "A longer journey through Kumaon",
];

export function EnquiryForm({
  mode,
  onDone,
  title,
  successMessage,
}: {
  mode: BookingMode;
  onDone?: () => void;
  title?: string;
  successMessage?: string;
}) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      arrival: formData.get("arrival"),
      departure: formData.get("departure"),
      guests: formData.get("guests"),
      interest: formData.get("interest"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
      type: mode, 
    };

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSent(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="thank-you">
        <MountainMark />
        <p className="eyebrow">Thank you</p>
        <h2>Your journey begins here.</h2>
        <p>{successMessage || "Our reservations team will be in touch shortly."}</p>
        <button type="button" className="primary-button" onClick={() => (onDone ? onDone() : setSent(false))}>
          {onDone ? "Return to Itmenaan" : "Send another"}
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {title && <p className="eyebrow">{title}</p>}
      <div className="field-row">
        <label>
          Arrival
          <input type="date" name="arrival" required={mode === "book"} />
        </label>
        <label>
          Departure
          <input type="date" name="departure" required={mode === "book"} />
        </label>
      </div>
      <div className="field-row">
        <label>
          Guests
          <select name="guests" defaultValue="2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5+</option>
          </select>
        </label>
        <label>
          I am interested in
          <select name="interest" defaultValue={interests[0]}>
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="field-row">
        <label>
          Your name
          <input type="text" name="name" required autoComplete="name" />
        </label>
        <label>
          Phone
          <input type="tel" name="phone" autoComplete="tel" />
        </label>
      </div>
      <label>
        Email
        <input type="email" name="email" required placeholder="you@example.com" autoComplete="email" />
      </label>
      {mode === "enquire" && (
        <label>
          Anything you would like us to know
          <textarea name="message" rows={3} />
        </label>
      )}
      <button className="primary-button" type="submit" disabled={loading}>
        {loading ? "Sending..." : mode === "book" ? "Check availability" : "Send enquiry"} <Arrow />
      </button>
    </form>
  );
}


export function Newsletter({ dark = false }: { dark?: boolean }) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();

    try {
      const res = await fetch("/api/newsletter-subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Subscription failed. Please try again.");
      }

      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`newsletter ${dark ? "on-dark" : ""}`}
      onSubmit={handleSubmit}
    >
      <label htmlFor={dark ? "nl-footer" : "nl-main"}>
        {done ? "Thank you. A letter will find you soon." : "Your email address"}
      </label>

      {!done && (
        <div>
          <input
            id={dark ? "nl-footer" : "nl-main"}
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading} aria-label="Subscribe to Letters from Itmenaan">
            {loading ? "..." : <Arrow />}
          </button>
        </div>
      )}

      {error && <p role="alert">{error}</p>}
    </form>
  );
}

