import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import type { Link as L } from "../content";
import { img } from "../images";
import type { ImgKey } from "../images";
import { Arrow, Cta, MountainMark, Reveal } from "../ui";

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export function Prose({ p, className = "" }: { p: string[]; className?: string }) {
  return (
    <div className={`prose ${className}`}>
      {p.map((t) => (
        <p key={t} className={t.length <= 62 ? "pull" : ""}>
          {t}
        </p>
      ))}
    </div>
  );
}



function SubNavContent() {
  const location = useLocation();
  const pathname = location?.pathname || "";
  const [subPages, setSubPages] = useState<{ label: string; to: string }[]>([]);

  useEffect(() => {
    if (!pathname) return;
    const controller = new AbortController();

    const loadSubNav = async () => {
      try {
        if (pathname === "/experiences" || pathname.startsWith("/experiences/")) {
          const response = await fetch(
            "/api/experiences?limit=100&depth=1&sort=sortOrder",
            { signal: controller.signal }
          );

          if (!response.ok) throw new Error("Experience navigation failed");
          const data = await response.json();

          const experienceLinks = (data.docs || [])
            .filter((doc: any) => doc.showInSubNav === true)
            .sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0))
            .map((doc: any) => {
              const targetPath = doc.path || `/experiences/${doc.slug}`;
              return {
                label: doc.title,
                to: targetPath.startsWith("/") ? targetPath : `/${targetPath}`,
              };
            });

          setSubPages([
            { label: "Overview", to: "/experiences" },
            ...experienceLinks,
          ]);
          return;
        }

        if (pathname === "/our-world" || pathname.startsWith("/our-world/")) {
          const response = await fetch(
            "/api/our-world-sub-pages?limit=100",
            { signal: controller.signal }
          );

          const data = await response.json();
          const subs = (data.docs || [])
            .filter((doc: any) => doc.showInSubNav !== false)
            .map((doc: any) => {
              const targetPath = doc.path || `/our-world/${doc.slug}`;
              return {
                label: doc.title,
                to: targetPath.startsWith("/") ? targetPath : `/${targetPath}`,
              };
            });

          setSubPages([
            { label: "Overview", to: "/our-world" },
            ...subs,
          ]);
          return;
        }

        if (pathname === "/the-lodge" || pathname.startsWith("/the-lodge/")) {
          const response = await fetch(
            "/api/lodge-sub-pages?limit=100",
            { signal: controller.signal }
          );

          const data = await response.json();
          const subs = (data.docs || [])
            .filter((doc: any) => doc.showInSubNav !== false)
            .map((doc: any) => {
              const targetPath = doc.path || `/the-lodge/${doc.slug}`;
              return {
                label: doc.title,
                to: targetPath.startsWith("/") ? targetPath : `/${targetPath}`,
              };
            });

          setSubPages([
            { label: "The Philosophy", to: "/the-lodge" },
            ...subs,
          ]);
          return;
        }

        if (pathname === "/stay" || pathname.startsWith("/stay/")) {
          const response = await fetch(
            "/api/stays?limit=100",
            { signal: controller.signal }
          );

          const data = await response.json();
          const subs = (data.docs || [])
            .filter((doc: any) => doc.showInSubNav !== false)
            .map((doc: any) => {
              const targetPath = doc.path || `/stay/${doc.slug}`;
              return {
                label: doc.title,
                to: targetPath.startsWith("/") ? targetPath : `/${targetPath}`,
              };
            });

          setSubPages([
            { label: "Overview", to: "/stay" },
            ...subs,
          ]);
          return;
        }

        setSubPages([]);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    };

    loadSubNav();

    return () => controller.abort();
  }, [pathname]);

  if (subPages.length === 0) return null;

  return (
    <nav className="subnav" aria-label="Section">
      {subPages.map((page) => (
        <Link
          key={page.to}
          to={page.to}
          className={pathname === page.to ? "active" : ""}
        >
          {page.label}
        </Link>
      ))}
    </nav>
  );
}

export function SubNav() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <SubNavContent />;
}

export type RowItem = {
  h: string;
  sub?: string;
  meta?: string;
  img: ImgKey | string;
  p: string[];
  cta: L;
};

export function Rows({ items, numbered = true }: { items: RowItem[]; numbered?: boolean }) {
  return (
    <section className="rows">
      {items.map((it, i) => (
        <Reveal key={it.h} className={`row ${i % 2 ? "flip" : ""}`}>
          <div className="row-img">
            <img src={typeof it.img === 'string' && it.img.startsWith('http') ? it.img : img[it.img as ImgKey] || it.img} alt={it.h} loading="lazy" />
          </div>
          <div className="row-copy">
            {numbered && <span className="row-num">0{i + 1}</span>}
            {it.meta && <p className="eyebrow">{it.meta}</p>}
            <h2>{it.h}</h2>
            {it.sub && <h3>{it.sub}</h3>}
            <Prose p={it.p} />
            <Cta to={it.cta[1]}>{it.cta[0]}</Cta>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

export function Duo({ a, b }: { a: ImgKey | string; b?: ImgKey | string }) {
  return (
    <Reveal className={`duo ${b ? "" : "single"}`}>
      <img src={typeof a === 'string' && a.startsWith('http') ? a : img[a as ImgKey] || a} alt="" loading="lazy" />
      {b && <img src={typeof b === 'string' && b.startsWith('http') ? b : img[b as ImgKey] || b} alt="" loading="lazy" />}
    </Reveal>
  );
}

export function CtaBand({
  h,
  p,
  actions,
  eyebrow,
}: {
  h: string;
  p?: string;
  actions: L[];
  eyebrow?: string;
}) {
  const safeActions = Array.isArray(actions) ? actions : [];
  return (
    <section className="cta-band">
      <MountainMark className="light-mark" />
      {eyebrow && <p className="eyebrow light">{eyebrow}</p>}
      <h2>{h}</h2>
      {p && <p>{p}</p>}
      <div className="cta-buttons">
        {safeActions.map(([label, to], i) => (
          <Cta key={label || i} to={to} className={i === 0 ? "primary-button light" : "ghost-button"}>
            {label}
          </Cta>
        ))}
      </div>
    </section>
  );
}

export function StickyCta({ link }: { link: L }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 520);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className={`sticky-cta ${show ? "show" : ""}`}>
      <Cta to={link[1]} className="primary-button" arrow>
        {link[0]}
      </Cta>
    </div>
  );
}