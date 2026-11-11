"use client";
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router";
import {
  arrival,
  contactDetails,
  journalGroups,
  journeys,
} from "../content";
import type { PageData } from "../content";
import { img } from "../images";
import { Cta, CtaRow, EnquiryForm, MountainMark, Newsletter, Reveal } from "../ui";
import { CtaBand, Duo, Prose, Rows, StickyCta, SubNav, usePageTitle } from "../components/shared";
import type { RowItem } from "../components/shared";

function mediaUrl(value: any): string {
  if (typeof value === "string") return value;
  if (value && typeof value.url === "string") return value.url;
  return "";
}

function paragraphList(value: any): string[] {
  if (!Array.isArray(value)) return typeof value === "string" && value ? [value] : [];
  return value.map((item: any) => typeof item === "string" ? item : item?.text || "").filter(Boolean);
}

function pageLinks(value: any): [string, string][] {
  if (!Array.isArray(value)) return [];
  return value.map((item: any) => Array.isArray(item) ? [item[0], item[1]] : [item?.label || "", item?.url || item?.to || ""]).filter((item: any) => item[0] && item[1]);
}

function ctaData(value: any): any {
  if (!value) return undefined;
  const actions: [string, string][] = value.actions?.length
    ? pageLinks(value.actions)
    : value.buttonLabel && value.buttonUrl
      ? [[value.buttonLabel, value.buttonUrl]]
      : [];
  if (!value.h && !value.p && actions.length === 0) return undefined;
  return { h: value.h || "", p: value.p || "", actions };
}

function Hero({ d }: { d: any }) {
  const hero = d.hero || {};
  const style = { objectPosition: hero.pos ?? "50% 50%" };
  const imgSrc = mediaUrl(hero.image) || mediaUrl(d.image) || (hero.img ? img[hero.img] : "") || img.i27;
  if (hero.mode === "full") {
    return (
      <section className="page-hero full">
        <img src={imgSrc} alt="" style={style} />
        <div className="hero-shade" />
        <div className="page-hero-copy">
          <p className="eyebrow light">{hero.eyebrow}</p>
          <h1>{hero.h1 || hero.title}</h1>
        </div>
      </section>
    );
  }
  return (
    <section className="page-hero split">
      <div className="page-hero-copy">
        <p className="eyebrow light">{hero.eyebrow}</p>
        <h1>{hero.h1 || hero.title}</h1>
      </div>
      <div className="page-hero-img">
        <img src={imgSrc} alt="" style={style} />
      </div>
    </section>
  );
}

function Lede({ p }: { p: string[] }) {
  const [first, ...rest] = p;
  return (
    <section className="lede">
      <Reveal>
        <MountainMark />
        <p className="lede-first">{first}</p>
        <Prose p={rest} />
      </Reveal>
    </section>
  );
}

function Blocks({ d, blockGallery = false }: { d: any; blockGallery?: boolean }) {
  const blocks = d.blocks || [];
  const g = d.gallery ?? [];
  const gallerySlots: Record<number, [string, string?]> = {};
  if (!blockGallery && blocks.length > 1) {
    const slots = blocks.length >= 4 ? [1, blocks.length - 2] : [1];
    slots.forEach((slot, index) => {
      const first = mediaUrl(g[index * 2]?.image) || mediaUrl(g[index * 2]) || g[index * 2];
      const second = mediaUrl(g[index * 2 + 1]?.image) || mediaUrl(g[index * 2 + 1]) || g[index * 2 + 1];
      if (first) gallerySlots[slot] = [first, second || undefined];
    });
  }

  return (
    <section className="blocks">
      {blocks.map((b: any, i: number) => {
        const paragraphs = paragraphList(b.p);
        const blockImages = Array.isArray(b.galleryImages)
          ? b.galleryImages.map((item: any) => mediaUrl(item?.image || item)).filter(Boolean)
          : [];

        return (
          <Fragment key={b.id || b.h || b.title || i}>
            <Reveal className="block">
              <div className="block-head">
                <span>0{i + 1}</span>
                <h2>{b.h || b.title}</h2>
                {(b.sub || b.subtitle) && <h3>{b.sub || b.subtitle}</h3>}
              </div>
              <Prose p={paragraphs} />
            </Reveal>
            {blockImages.length > 0 ? (
              <Duo a={blockImages[0]} b={blockImages[1]} />
            ) : blockGallery && gallerySlots[i] ? (
              <Duo a={gallerySlots[i][0] as never} b={gallerySlots[i][1] as never} />
            ) : null}
          </Fragment>
        );
      })}
    </section>
  );
}

function StayExtras({ data }: { data: any }) {
  const [stays, setStays] = useState<any[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/stays?limit=100&depth=2", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Stay request failed: ${res.status}`);
        return res.json();
      })
      .then((result) => {
        if (Array.isArray(result?.docs)) {
          setStays(result.docs.filter((item: any) => item.showInStayIndex !== false));
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") console.error(error);
      });

    return () => controller.abort();
  }, []);

  const stayRows: RowItem[] = stays.map((stay) => ({
    h: stay.cardTitle || stay.title || "",
    sub: stay.cardSubtitle || "",
    img: mediaUrl(stay.cardImage),
    p: paragraphList(stay.cardDescription),
    cta: [stay.cardCta || "Explore", stay.path || `/stay/${stay.slug}`] as [string, string],
  })).filter((item) => item.h && item.cta[1]);

  const table = data?.tableSection || {};
  const columns = Array.isArray(table.columns) ? table.columns : [];
  const rows = Array.isArray(table.rows) ? table.rows : [];

  return (
    <>
      <section className="stay-list-section">
        <Rows items={stayRows} />
      </section>

      {table.enabled !== false && (table.title || rows.length > 0) && (
        <section className="table-section">
          <Reveal>
            {table.eyebrow && <p className="eyebrow">{table.eyebrow}</p>}
            {table.title && <h2>{table.title}</h2>}
            {columns.length > 0 && rows.length > 0 && (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      {columns.map((column: any, index: number) => (
                        <th key={column.id || column.label || index}>{column.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row: any, rowIndex: number) => (
                      <tr key={row.id || rowIndex}>
                        {(row.values || []).map((cell: any, cellIndex: number) => (
                          <td key={cell.id || cellIndex} data-label={columns[cellIndex]?.label || ""}>
                            {cell.value || ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Reveal>
        </section>
      )}
    </>
  );
}

function ExpExtras() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/experiences?limit=100&depth=2", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Experience request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data?.docs)) {
          setExperiences(
            data.docs
              .filter((item: any) => item.showInExperienceIndex !== false)
              .sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0))
          );
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") console.error(error);
      });

    return () => controller.abort();
  }, []);

  return (
    <section className="exp-grid">
      {experiences.map((c, i) => {
        const card = c.cardContent || {};
        const paragraphs = paragraphList(card.description || c.description);
        const cardImage = mediaUrl(c.image) || mediaUrl(card.image);
        const cardTitle = card.title || c.title;
        const cardSubtitle = card.subtitle || c.subtitle;
        const cardUrl = card.buttonUrl || c.path || `/experiences/${c.slug}`;

        return (
          <Reveal key={c.id || c.slug} className="exp-card" as="article">
            <div className="exp-img">
              <img src={cardImage} alt={cardTitle} loading="lazy" />
            </div>
            <span className="row-num">0{i + 1}</span>
            <h2>{cardTitle}</h2>
            {cardSubtitle && <h3>{cardSubtitle}</h3>}
            <Prose p={paragraphs} />
            <Cta to={cardUrl}>
              {card.buttonLabel || "Explore"}
            </Cta>
          </Reveal>
        );
      })}
    </section>
  );
}

function OurWorldExtras({ data }: { data: any }) {
  const cards = Array.isArray(data?.cards) ? data.cards : [];
  const rowItems: RowItem[] = cards.map((card: any) => ({
    h: card.title || "",
    sub: card.subtitle || "",
    meta: card.meta || "",
    img: mediaUrl(card.image),
    p: paragraphList(card.description),
    cta: [card.ctaLabel || "Explore", card.ctaUrl || "#"] as [string, string],
  })).filter((item: any) => item.h);

  if (rowItems.length === 0) return null;

  return (
    <section className="seasons">
      <Rows items={rowItems} />
    </section>
  );
}

function OurWorldSeasons({ data }: { data: any }) {
  const sections = Array.isArray(data?.sections) ? data.sections : [];
  if (sections.length === 0) return null;

  return (
    <section className="seasons">
      {sections.map((s: any, i: number) => {
        const paragraphs = paragraphList(s.p);
        const imgSrc = mediaUrl(s.image);
        return (
          <Reveal key={s.id || s.title || i} className={`season ${i % 2 ? "flip" : ""}`}>
            <div className="row-img">
              <img src={imgSrc} alt={s.title} loading="lazy" />
            </div>
            <div className="row-copy">
              {s.eyebrow && <p className="eyebrow">{s.eyebrow}</p>}
              <h2>{s.title}</h2>
              <Prose p={paragraphs} />
            </div>
          </Reveal>
        );
      })}
    </section>
  );
}

function JourneyExtras({ data }: { data: any }) {
  const journeysList = Array.isArray(data?.journeys) && data.journeys.length > 0 
    ? data.journeys 
    : journeys;

  return (
    <section className="journeys">
      {journeysList.map((j: any, i: number) => {
        const title = j.title || j.h || "";
        const meta = j.eyebrow || j.meta || "";
        const lead = j.lead || "";
        const paragraphs = paragraphList(j.description || j.p);
        const imgSrc = mediaUrl(j.image) || (j.img ? img[j.img] : "") || img.i27;
        const ctaLabel = j.buttonLabel || j.cta?.[0] || "Enquire";
        const ctaUrl = j.buttonUrl || j.cta?.[1] || "enquire";

        return (
          <Reveal key={j.id || title || i} className="journey-item" as="article">
            <span className="row-num">0{i + 1}</span>
            <div className="journey-head">
              {meta && <p className="eyebrow">{meta}</p>}
              <h2>{title}</h2>
            </div>
            <div className="journey-body">
              {lead && <p className="journey-lead">{lead}</p>}
              <Prose p={paragraphs} />
              <Cta to={ctaUrl}>{ctaLabel}</Cta>
            </div>
            <div className="journey-img">
              <img src={imgSrc} alt={title} loading="lazy" />
            </div>
          </Reveal>
        );
      })}
    </section>
  );
}

function JournalExtras({ data }: { data: any }) {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/journal?limit=100&depth=2", { signal: controller.signal })
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result?.docs) && result.docs.length > 0) {
          setBlogs(result.docs);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, []);

  const groupedBlogs = blogs.reduce((acc: any, blog: any) => {
    const cat = blog.category || "Stories from the Estate";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(blog);
    return acc;
  }, {});

  const lb = data?.letterBand || {};
  const heading = lb.heading || "A letter from the mountains.";
  const p1 = lb.paragraph1 || "Occasionally, we send stories, seasonal observations and invitations from Itmenaan.";
  const p2 = lb.paragraph2 || "No unnecessary noise. Just something worth reading.";

  return (
    <>
      {/* Figma ke jaisa exact wide 3 Column Grid Layout */}
      <section style={{ width: "100%", maxWidth: "1440px", margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "50px", alignItems: "start" }}>
          {Object.entries(groupedBlogs).map(([category, items]: [string, any], groupIdx: number) => (
            <div key={category || groupIdx} style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <h2 style={{ fontSize: "2rem", fontFamily: "serif", fontWeight: 400, borderBottom: "1px solid rgba(0,0,0,0.15)", paddingBottom: "20px", marginBottom: "35px", letterSpacing: "-0.01em" }}>
                {category}
              </h2>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "35px" }}>
                {items.map((b: any, i: number) => (
                  <li key={b.id || b.slug || i}>
                    <Link to={`/journal/${b.slug}`} style={{ textDecoration: "none", color: "inherit", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                      <span style={{ fontSize: "0.9rem", opacity: 0.5, paddingTop: "3px", minWidth: "22px" }}>0{i + 1}</span>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: "1.35rem", marginBottom: "8px", fontWeight: 400, fontFamily: "serif", lineHeight: 1.3 }}>{b.title}</h3>
                        <p style={{ fontSize: "0.95rem", opacity: 0.7, lineHeight: 1.6, margin: 0 }}>{b.summary || ""}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="letter-band" style={{ margin: 0 }}>
        <Reveal>
          <MountainMark />
          <h2>{heading}</h2>
          <p>{p1}</p>
          <p className="pull">{p2}</p>
          <Newsletter />
        </Reveal>
      </section>
    </>
  );
}

function ContactExtras({ data }: { data: any }) {
  const arrivalSec = data?.arrivalSection || {};
  const cards = Array.isArray(arrivalSec.arrivalCards) && arrivalSec.arrivalCards.length > 0
    ? arrivalSec.arrivalCards
    : arrival; // fallback to static content if empty

  return (
    <section className="arrival">
      <Reveal>
        <p className="eyebrow">{arrivalSec.eyebrow || "Arrival"}</p>
        <h2>{arrivalSec.title || "Finding your way to Itmenaan."}</h2>
        <p className="arrival-intro">{arrivalSec.intro || "Itmenaan Estate is located in the Almora district of Uttarakhand, in the Kumaon Himalayas, near Binsar."}</p>
        <div className="arrival-grid">
          {cards.map((a: any, index: number) => {
            const lines = Array.isArray(a.lines) ? a.lines.map((l: any) => l.line || l) : (a.lines || []);
            return (
              <div key={a.title || index}>
                <h3>{a.title || a.h}</h3>
                {lines.map((l: string) => <p key={l} className="arrival-line">{l}</p>)}
                {(a.note || a.p) && <p className="arrival-note">{a.note || a.p}</p>}
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

function ContactAfter({ data }: { data: any }) {
  const resSec = data?.reservationsSection || {};
  const details = {
    name: resSec.estateName || contactDetails.name,
    address: resSec.address || contactDetails.address,
    phone: resSec.phone || contactDetails.phone,
    phoneHref: resSec.phoneHref || contactDetails.phoneHref,
    email: resSec.email || contactDetails.email,
  };

  return (
    <section className="contact-form-section">
      <Reveal className="contact-info">
        <p className="eyebrow">{resSec.eyebrow || "Reservations"}</p>
        <h2>{resSec.title || "We would love to hear from you."}</h2>
        <address>
          <strong>{details.name}</strong>
          <span>{details.address}</span>
          <a href={details.phoneHref}>Reservations: {details.phone}</a>
          <a href={`mailto:${details.email}`}>Email: {details.email}</a>
        </address>
        <CtaRow links={[["Plan Your Stay", "/book"], ["Send an Enquiry", "enquire"]]} />
      </Reveal>
      <Reveal className="contact-form">
        <EnquiryForm mode="enquire" />
      </Reveal>
    </section>
  );
}


function BookAfter() {
  return (
    <section className="contact-form-section book">
      <Reveal className="contact-info">
        <p className="eyebrow">Check availability</p>
        <h2>Choose your dates.</h2>
        <CtaRow links={[["Cottages & Rooms", "/stay"], ["Journeys & Offers", "/journeys"]]} />
      </Reveal>
      <Reveal className="contact-form">
        <EnquiryForm mode="book" />
      </Reveal>
    </section>
  );
}

export default function ContentPage({ data: staticData }: { data: PageData }) {
  const [pageData, setPageData] = useState<any>(staticData);

  useEffect(() => {
    const controller = new AbortController();
    const cleanPath = staticData.path.startsWith("/") ? staticData.path.slice(1) : staticData.path;
    const segments = cleanPath.split("/");
    const targetSlug = segments[segments.length - 1] || "our-world";

    const loadPage = async () => {
      try {
        if (staticData.path === "/stay") {
          const response = await fetch("/api/globals/stays-page?depth=2", { signal: controller.signal });
          if (!response.ok) throw new Error(`Stay page request failed: ${response.status}`);
          const data = await response.json();

          if (data) {
            setPageData({
              ...staticData,
              ...data,
              path: staticData.path,
              title: data.seoTitle || staticData.title,
              kind: staticData.kind,
              hero: {
                ...staticData.hero,
                ...(data.hero || {}),
                img: staticData.hero.img,
                lede: paragraphList(data.hero?.lede).length ? paragraphList(data.hero.lede) : staticData.hero.lede,
              },
              blocks: Array.isArray(data.blocks) && data.blocks.length
                ? data.blocks.map((block: any) => ({ ...block, p: paragraphList(block.p) }))
                : staticData.blocks,
              links: pageLinks(data.links),
              cta: ctaData(data.ctaBand) || staticData.cta,
              sticky: data.stickyCta?.enabled && data.stickyCta?.label && data.stickyCta?.url
                ? [data.stickyCta.label, data.stickyCta.url]
                : staticData.sticky,
            });
          }
          return;
        }

        if (staticData.path.startsWith("/stay/")) {
          const response = await fetch(
            `/api/stays?where[slug][equals]=${encodeURIComponent(targetSlug)}&limit=1&depth=2`,
            { signal: controller.signal }
          );
          if (!response.ok) throw new Error(`Stay detail request failed: ${response.status}`);
          const result = await response.json();
          const doc = result?.docs?.[0];

          if (doc) {
            setPageData({
              ...staticData,
              ...doc,
              path: doc.path || staticData.path,
              title: doc.seoTitle || staticData.title,
              kind: "standard",
              hero: {
                ...staticData.hero,
                ...(doc.hero || {}),
                img: staticData.hero.img,
                lede: paragraphList(doc.hero?.lede).length ? paragraphList(doc.hero.lede) : staticData.hero.lede,
              },
              blocks: Array.isArray(doc.blocks) && doc.blocks.length
                ? doc.blocks.map((block: any) => ({ ...block, p: paragraphList(block.p) }))
                : staticData.blocks,
              links: pageLinks(doc.links),
              cta: ctaData(doc.ctaBand) || staticData.cta,
              sticky: doc.stickyCta?.enabled && doc.stickyCta?.label && doc.stickyCta?.url
                ? [doc.stickyCta.label, doc.stickyCta.url]
                : staticData.sticky,
            });
          }
          return;
        }

        if (staticData.path === "/contact" || staticData.path === "contact") {
          const response = await fetch("/api/globals/contact-page?depth=2", { signal: controller.signal });
          if (!response.ok) throw new Error(`Contact page request failed: ${response.status}`);
          const data = await response.json();

          if (data) {
            setPageData({
              ...staticData,
              ...data,
              path: "/contact",
              kind: "contact",
              title: data.seoTitle || data.title || staticData.title,
              hero: {
                ...staticData.hero,
                ...(data.hero || {}),
                lede: paragraphList(data.hero?.lede).length ? paragraphList(data.hero.lede) : staticData.hero.lede,
              },
            });
          }
          return;
        }

        if (staticData.path === "/journal" || staticData.path === "journal") {
          const response = await fetch("/api/globals/journal-page?depth=2", { signal: controller.signal });
          if (!response.ok) throw new Error(`Journal page request failed: ${response.status}`);
          const data = await response.json();

          if (data) {
            setPageData({
              ...staticData,
              ...data,
              path: "/journal",
              kind: "journal",
              title: data.seoTitle || data.title || staticData.title,
              hero: {
                ...staticData.hero,
                ...(data.hero || {}),
                lede: paragraphList(data.hero?.lede).length ? paragraphList(data.hero.lede) : staticData.hero.lede,
              },
            });
          }
          return;
        }

        if (staticData.path === "/experiences") {
          const response = await fetch("/api/globals/experiences-page?depth=2", { signal: controller.signal });
          if (!response.ok) throw new Error(`Experiences page request failed: ${response.status}`);
          const data = await response.json();

          if (data) {
            setPageData({
              ...staticData,
              ...data,
              path: "/experiences",
              kind: "exp-index",
              title: data.seoTitle || staticData.title,
              hero: {
                ...staticData.hero,
                ...(data.hero || {}),
                lede: paragraphList(data.hero?.lede).length ? paragraphList(data.hero.lede) : staticData.hero.lede,
              },
              blocks: Array.isArray(data.blocks) && data.blocks.length
                ? data.blocks.map((block: any) => ({ ...block, p: paragraphList(block.p) }))
                : staticData.blocks,
              links: pageLinks(data.links),
              cta: ctaData(data.ctaBand) || staticData.cta,
              sticky: data.stickyCta?.enabled && data.stickyCta?.label && data.stickyCta?.url
                ? [data.stickyCta.label, data.stickyCta.url]
                : staticData.sticky,
            });
          }
          return;
        }

        if (staticData.path.startsWith("/experiences/")) {
          const response = await fetch(
            `/api/experiences?where[slug][equals]=${encodeURIComponent(targetSlug)}&limit=1&depth=2`,
            { signal: controller.signal }
          );
          if (!response.ok) throw new Error(`Experience detail request failed: ${response.status}`);
          const result = await response.json();
          const doc = result?.docs?.[0];

          if (doc) {
            setPageData({
              ...staticData,
              ...doc,
              path: doc.path || staticData.path,
              title: doc.seoTitle || staticData.title,
              kind: "standard",
              hero: {
                ...staticData.hero,
                ...(doc.hero || {}),
                image: doc.hero?.image || doc.image || staticData.hero?.image,
                lede: paragraphList(doc.hero?.lede).length ? paragraphList(doc.hero.lede) : staticData.hero.lede,
              },
              blocks: Array.isArray(doc.blocks) && doc.blocks.length
                ? doc.blocks.map((block: any) => ({ ...block, p: paragraphList(block.p) }))
                : staticData.blocks,
              links: pageLinks(doc.links),
              cta: ctaData(doc.ctaBand) || staticData.cta,
              sticky: doc.stickyCta?.enabled && doc.stickyCta?.label && doc.stickyCta?.url
                ? [doc.stickyCta.label, doc.stickyCta.url]
                : staticData.sticky,
            });
          }
          return;
        }

        if (staticData.path === "/our-world" || staticData.path === "our-world") {
          const response = await fetch("/api/globals/our-world-page?depth=2", { signal: controller.signal });
          if (!response.ok) throw new Error(`Our-world page request failed: ${response.status}`);
          const data = await response.json();

          if (data) {
            setPageData({
              ...staticData,
              ...data,
              path: "/our-world",
              title: data.seoTitle || staticData.title,
              hero: {
                ...staticData.hero,
                ...(data.hero || {}),
                lede: paragraphList(data.hero?.lede).length ? paragraphList(data.hero.lede) : staticData.hero.lede,
              },
              blocks: Array.isArray(data.blocks) && data.blocks.length
                ? data.blocks.map((block: any) => ({ ...block, p: paragraphList(block.p) }))
                : staticData.blocks,
              links: pageLinks(data.links),
              cta: ctaData(data.ctaBand) || staticData.cta,
              sticky: data.stickyCta?.enabled && data.stickyCta?.label && data.stickyCta?.url
                ? [data.stickyCta.label, data.stickyCta.url]
                : staticData.sticky,
            });
          }
          return;
        }

        if (staticData.path.startsWith("/our-world/")) {
          const response = await fetch(
            `/api/our-world-sub-pages?where[slug][equals]=${encodeURIComponent(targetSlug)}&limit=1&depth=2`,
            { signal: controller.signal }
          );
          if (!response.ok) throw new Error(`Our-world sub-page request failed: ${response.status}`);
          const result = await response.json();
          const doc = result?.docs?.[0];

          if (doc) {
            setPageData({
              ...staticData,
              ...doc,
              path: doc.path || staticData.path,
              title: doc.seoTitle || doc.title || staticData.title,
              kind: doc.slug === "seasons" ? "our-world-sub" : "standard",
              hero: {
                ...staticData.hero,
                ...(doc.hero || {}),
                image: doc.hero?.image || doc.image || staticData.hero?.image,
                lede: paragraphList(doc.hero?.lede).length ? paragraphList(doc.hero.lede) : staticData.hero.lede,
              },
              blocks: Array.isArray(doc.blocks) && doc.blocks.length
                ? doc.blocks.map((block: any) => ({ ...block, p: paragraphList(block.p) }))
                : staticData.blocks,
              links: pageLinks(doc.links),
              cta: ctaData(doc.ctaBand) || staticData.cta,
              sticky: doc.stickyCta?.enabled && doc.stickyCta?.label && doc.stickyCta?.url
                ? [doc.stickyCta.label, doc.stickyCta.url]
                : staticData.sticky,
            });
          }
          return;
        }

        if (staticData.path === "/journeys" || staticData.path === "journeys") {
          const response = await fetch("/api/globals/journeys-page?depth=2", { signal: controller.signal });
          if (!response.ok) throw new Error(`Journeys page request failed: ${response.status}`);
          const data = await response.json();

          if (data) {
            setPageData({
              ...staticData,
              ...data,
              path: "/journeys",
              kind: "journeys",
              title: data.seoTitle || data.title || staticData.title,
              hero: {
                ...staticData.hero,
                ...(data.hero || {}),
                lede: paragraphList(data.hero?.lede).length ? paragraphList(data.hero.lede) : staticData.hero.lede,
              },
              blocks: Array.isArray(data.blocks) && data.blocks.length
                ? data.blocks.map((block: any) => ({ ...block, p: paragraphList(block.p) }))
                : staticData.blocks,
              links: pageLinks(data.links),
              cta: ctaData(data.ctaBand) || staticData.cta,
              sticky: data.stickyCta?.enabled && data.stickyCta?.label && data.stickyCta?.url
                ? [data.stickyCta.label, data.stickyCta.url]
                : staticData.sticky,
            });
          }
          return;
        }

        if (staticData.path === "/the-lodge" || staticData.path === "the-lodge") {
          const response = await fetch("/api/globals/the-lodge-page", { signal: controller.signal });
          if (!response.ok) throw new Error(`Lodge page request failed: ${response.status}`);
          const data = await response.json();

          if (data) {
            setPageData({
              ...staticData,
              ...data,
              hero: {
                ...staticData.hero,
                ...(data.hero || {}),
                lede: paragraphList(data.hero?.lede).length ? paragraphList(data.hero.lede) : staticData.hero.lede,
              },
              blocks: data.blocks?.length ? data.blocks : staticData.blocks,
              links: pageLinks(data.links),
            });
          }
          return;
        }

        if (staticData.path.startsWith("/the-lodge/")) {
          const response = await fetch(
            `/api/lodge-sub-pages?where[slug][equals]=${encodeURIComponent(targetSlug)}&limit=1`,
            { signal: controller.signal }
          );
          if (!response.ok) throw new Error(`Lodge sub-page request failed: ${response.status}`);
          const result = await response.json();
          const doc = result?.docs?.[0];

          if (doc) {
            setPageData({
              ...staticData,
              ...doc,
              hero: {
                ...staticData.hero,
                ...(doc.hero || {}),
                lede: paragraphList(doc.hero?.lede).length ? paragraphList(doc.hero.lede) : staticData.hero.lede,
              },
              blocks: doc.blocks?.length ? doc.blocks : staticData.blocks,
              links: pageLinks(doc.links),
            });
          }
          return;
        }

        const slug = staticData.path.replace("/", "");
        const globalSlugMap: Record<string, string> = {
          "the-kumaon-kitchen": "kumaon-kitchen-page",
          journeys: "journeys-page",
          journal: "journal-page",
          contact: "contact-page",
          book: "book-page",
        };
        const targetGlobal = globalSlugMap[slug];

        if (targetGlobal) {
          const response = await fetch(`/api/globals/${targetGlobal}`, { signal: controller.signal });
          if (!response.ok) throw new Error(`Page request failed: ${response.status}`);
          const data = await response.json();

          if (data) {
            setPageData({
              ...staticData,
              ...data,
              hero: {
                ...staticData.hero,
                ...(data.hero || {}),
                lede: paragraphList(data.hero?.lede).length ? paragraphList(data.hero.lede) : staticData.hero.lede,
              },
              blocks: data.blocks?.length ? data.blocks : staticData.blocks,
              links: pageLinks(data.links),
            });
          }
        }
      } catch (error: any) {
        if (error.name !== "AbortError") console.error(error);
      }
    };

    loadPage();
    return () => controller.abort();
  }, [staticData]);

  usePageTitle(pageData?.title || "Itmenaan Estate");
  const d = pageData || staticData || {};

  const before = {
    "stay-index": <StayExtras data={d} />,
    "exp-index": <ExpExtras />,
    "our-world-sub": <OurWorldSeasons data={d} />,
    journeys: <JourneyExtras data={d} />,
    journal: <JournalExtras data={d} />, 
    contact: <ContactExtras data={d} />,
    standard: null,
    book: null,
  }[d.kind];
  const after = d.kind === "contact" ? <ContactAfter /> : d.kind === "book" ? <BookAfter /> : null;
  const cta = d.cta ?? {
    h: "Perhaps what you are looking for is already here.",
    p: "A few days in the mountains. A little distance from the familiar. Time to read, wander, reconnect, or simply be.",
    actions: [["Book Your Stay", "book"]] as [string, string][],
  };

  const ledeParagraphs = Array.isArray(d.hero?.lede) 
    ? d.hero.lede.map((item: any) => typeof item === 'string' ? item : item.text || '') 
    : Array.isArray(d.lede) ? d.lede : [];

  const safeLinks = pageLinks(d.links);

  return (
    <article className="page">
      <Hero d={d} />
      <SubNav />
      {ledeParagraphs.length > 0 && <Lede p={ledeParagraphs} />}
      
      {before}
      
      {/* Journal page par extra/faltu blocks render nahi honge */}
      {d.kind !== "journal" && <Blocks d={d} />}
      
      {after}

      {d.kind !== "journal" && safeLinks.length > 0 && (
        <section className="continue">
          <p className="eyebrow">Continue</p>
          <CtaRow links={safeLinks} />
        </section>
      )}

      {d.kind !== "journal"  && d.kind !== "book" && <CtaBand {...cta} />}
      {d.sticky && <StickyCta link={d.sticky} />}
    </article>
  );
}