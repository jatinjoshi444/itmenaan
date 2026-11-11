"use client";
import { useState, useEffect } from "react";
// import { Link } from "react-router";
import Link from "next/link";
import { img } from "../images";
import { Cta, MountainMark, Reveal } from "../ui";
import { Prose, usePageTitle } from "../components/shared";

const defaultPanels = [
  {
    h: "Stay",
    to: "/stay",
    img: img.i9,
    p: "Stone and timber, old-world character and quiet comfort. Our intimate collection of cottages and rooms is designed to live in harmony with the landscape.",
    cta: "Discover Your Stay",
  },
  {
    h: "The Kumaon Kitchen",
    to: "/the-kumaon-kitchen",
    img: img.i13,
    p: "The pleasure of good food begins with good ingredients. Seasonal produce, regional traditions and meals prepared with generosity, from the land around us to your table.",
    cta: "Explore the Kitchen",
  },
  {
    h: "Experiences",
    to: "/experiences",
    img: img.i6,
    p: "Walk through forests and villages. Follow birdsong. Discover ancient temples. Or simply surrender to an afternoon with no particular plans.",
    cta: "Discover Experiences",
  },
];

export default function Home() {
  usePageTitle("Itmenaan Estate | Boutique Himalayan Retreat in Kumaon");

  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/globals/homepage')
      .then((res) => res.json())
      .then((data) => {
        if (data) setPageData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const getMediaUrl = (mediaObj: any, fallbackUrl: string) => {
    if (!mediaObj) return fallbackUrl;
    if (typeof mediaObj === 'string') return mediaObj;
    return mediaObj.url || fallbackUrl;
  };

  const getParagraphs = (pField: any, fallback: string[]) => {
    if (!pField) return fallback;
    if (Array.isArray(pField) && pField.length > 0) {
      return pField.map((item: any) => typeof item === 'string' ? item : item.text || '');
    }
    if (typeof pField === 'string') return [pField];
    return fallback;
  };

  const heroEyebrow = pageData?.hero?.eyebrow || "Itmenaan Estate · Kumaon Himalayas";
  const heroH1 = pageData?.hero?.h1 || pageData?.hero?.title || "You have arrived.";
  const heroIntro = pageData?.hero?.subtitle || "There are places you visit. And places where, quite unexpectedly, you find yourself at peace.";
  const heroImg = getMediaUrl(pageData?.hero?.image, img.i27);

  const introEyebrow = pageData?.introSection?.eyebrow || "A quieter kind of luxury";
  const introFirst = pageData?.introSection?.firstParagraph || "High in the Kumaon Himalayas, where forests give way to terraced valleys and distant snow-clad peaks, Itmenaan Estate offers a different understanding of luxury. One measured in quiet mornings, generous hospitality, food with a sense of origin and the simple pleasure of being exactly where you are.";
  const introPull = pageData?.introSection?.pullText || "Here, time seems to have remembered how to slow down.";
  
  const feelingH2 = pageData?.introSection?.feelingTitle || "The pleasure of wanting nothing more.";
  const feelingImg = getMediaUrl(pageData?.introSection?.feelingImage, img.i26);
  const feelingParagraphs = getParagraphs(pageData?.introSection?.feelingParagraphs, [
    "Itmenaan. A beautiful word for a feeling that needs little explanation.",
    "Contentment. Satisfaction. The quiet certainty that, for this moment, nothing else is required.",
    "It is a feeling that arrives naturally here. Perhaps in the first glimpse of the Himalayan range. In a cup of tea offered without hurry. In the sound of birds that accompanies the changing light. Or in the remarkable kindness of people who have always called these mountains home.",
    "Nature is not something to conquer. Silence is not something to fill.",
    "There is nowhere else you need to be.",
  ]);
  const introCtaText = pageData?.introSection?.ctaText || "Explore the Estate";
  const introCtaPath = pageData?.introSection?.ctaPath || "/the-lodge";

  const stayEyebrow = pageData?.staySection?.eyebrow || "Stone, timber & mountain light";
  const stayTitle = pageData?.staySection?.title || "A place to belong, for a little while.";
  
  const rawPanels = pageData?.stayPanels?.length > 0 ? pageData.stayPanels : defaultPanels;
  const panels = rawPanels.map((p: any, i: number) => ({
    h: p.h || defaultPanels[i]?.h,
    to: p.to || defaultPanels[i]?.to,
    img: getMediaUrl(p.image, defaultPanels[i]?.img || img.i9),
    p: p.p || defaultPanels[i]?.p,
    cta: p.cta || defaultPanels[i]?.cta,
  }));

  const slowEyebrow = pageData?.slowSection?.eyebrow || "The art of Itmenaan";
  const slowTitle = pageData?.slowSection?.title || "A slower way of being.";
  const slowImg = getMediaUrl(pageData?.slowSection?.image, img.i28);
  const slowQuote = pageData?.slowSection?.quote || "The mountains have their own rhythm.\nWe are happy to follow it.";
  const slowParagraphs = getParagraphs(pageData?.slowSection?.paragraphs, [
    "Morning arrives gently. The valley emerges from the mist, birds begin their conversations, and somewhere, tea is being prepared.",
    "There is no prescribed way to spend a day at Itmenaan.",
    "You might take a walk along a forest path, linger over breakfast, discover a neighbouring village or spend an entire afternoon reading. Each experience is an invitation, never an obligation."
  ]);
  const slowCtaText = pageData?.slowSection?.ctaText || "The Art of Itmenaan";
  const slowCtaPath = pageData?.slowSection?.ctaPath || "/experiences/art-of-doing-nothing";

  const peopleEyebrow = pageData?.peopleSection?.eyebrow || "The heart of Itmenaan";
  const peopleTitle = pageData?.peopleSection?.title || "The people behind the peace.";
  const peopleImg = getMediaUrl(pageData?.peopleSection?.image, img.i11);
  const peoplePull = pageData?.peopleSection?.pullText || "Buildings make an estate. People make it memorable.";
  const peopleParagraphs = getParagraphs(pageData?.peopleSection?.paragraphs, [
    "Hospitality at Itmenaan is not a carefully rehearsed performance.",
    "It comes naturally to the people who welcome you, prepare your meals, accompany you on walks and share their intimate knowledge of the land. Our hosts come from the surrounding villages. Their warmth and connection to Kumaon give this place its most enduring character."
  ]);
  const peopleCtaText = pageData?.peopleSection?.ctaText || "Meet Our People";
  const peopleCtaPath = pageData?.peopleSection?.ctaPath || "/the-lodge/our-people";

  const kitchenEyebrow = pageData?.kitchenSection?.eyebrow || "The Kumaon Kitchen";
  const kitchenTitle = pageData?.kitchenSection?.title || "A kitchen that belongs to the land.";
  const kitchenImg = getMediaUrl(pageData?.kitchenSection?.image, img.i22);
  const kitchenLead = pageData?.kitchenSection?.lead || "Good food has always been a way of expressing care.";
  const kitchenParagraphs = getParagraphs(pageData?.kitchenSection?.paragraphs, [
    "Our kitchen follows the changing seasons and the ingredients available close to home. Familiar comforts sit alongside regional Kumaoni preparations, each meal made to be enjoyed slowly.",
    "Some meals are best shared around a table. Others deserve an open sky and the mountains for company."
  ]);
  const kitchenCtaText = pageData?.kitchenSection?.ctaText || "The Kumaon Kitchen";
  const kitchenCtaPath = pageData?.kitchenSection?.ctaPath || "/the-kumaon-kitchen";

  const beyondEyebrow = pageData?.beyondSection?.eyebrow || "Our world";
  const beyondTitle = pageData?.beyondSection?.title || "Beyond the familiar Himalayas.";
  const beyondImg = getMediaUrl(pageData?.beyondSection?.image, img.i17);
  const beyondPull = pageData?.beyondSection?.pullText || "Kumaon reveals itself slowly.";
  const beyondParagraphs = getParagraphs(pageData?.beyondSection?.paragraphs, [
    "In the carved stone of an old house. In the bells of a mountain temple. In the rhythm of village life. In forest paths that appear to have been walked for generations.",
    "Itmenaan is both a place to retreat from the world and a gentle introduction to another way of experiencing it."
  ]);
  const beyondCtaText = pageData?.beyondSection?.ctaText || "Discover Kumaon";
  const beyondCtaPath = pageData?.beyondSection?.ctaPath || "/our-world";

  const journeyEyebrow = pageData?.journeySection?.eyebrow || "Begin your journey";
  const journeyTitle = pageData?.journeySection?.title || "Perhaps what you are looking for is already here.";
  const journeyPull = pageData?.journeySection?.pullText || "The pleasure of wanting nothing more.";
  const journeyParagraphs = getParagraphs(pageData?.journeySection?.paragraphs, [
    "A few days in the mountains. A little distance from the familiar. Time to read, wander, reconnect, or simply be.",
    "Whatever brings you to Itmenaan, we hope you leave with something that cannot be packed into a suitcase."
  ]);
  const journeyCtaText = pageData?.journeySection?.ctaText || "Book Your Stay";
  const journeyCtaPath = pageData?.journeySection?.ctaPath || "book";

  return (
    <>
      <section className="hero">
        <img className="hero-img" src={heroImg} alt="Snow-clad Himalayan range above green Kumaon hills" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">{heroEyebrow}</p>
          <h1>{heroH1}</h1>
          <p className="hero-intro">{heroIntro}</p>
        </div>
        <a className="scroll-cue" href="#feeling" onClick={(e) => { e.preventDefault(); document.getElementById("feeling")?.scrollIntoView({ behavior: "smooth" }); }}>
          <span>Discover Itmenaan</span>
          <i />
        </a>
      </section>

      <section className="intro section-pad" id="feeling">
        <Reveal className="intro-copy">
          <MountainMark />
          <p className="eyebrow">{introEyebrow}</p>
          <p className="intro-first">{introFirst}</p>
          <p className="pull">{introPull}</p>
        </Reveal>
        <Reveal className="feeling">
          <div className="feeling-head">
            <span className="row-num">01</span>
            <h2>{feelingH2}</h2>
            <figure className="journey-photo">
              <img src={feelingImg} alt="A guest at Itmenaan, smiling over a mug of tea in the garden" loading="lazy" />
            </figure>
          </div>
          <div>
            <Prose p={feelingParagraphs} />
            <div style={{ marginTop: "2.5rem" }}>
              <Cta to={introCtaPath}>{introCtaText}</Cta>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="home-stay section-pad">
        <Reveal className="section-heading">
          <p className="eyebrow">{stayEyebrow}</p>
          <h2>{stayTitle}</h2>
        </Reveal>
        <div className="panel-grid">
          {panels.map((p: any, i: number) => (
            <Reveal key={p.h} className={`panel p${i}`} as="article">
              <Link href={p.to} className="panel-img" aria-label={p.h}>
                <img src={p.img} alt="" loading="lazy" />
              </Link>
              <div className="panel-copy">
                <h3>{p.h}</h3>
                <p>{p.p}</p>
                <Cta to={p.to}>{p.cta}</Cta>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="slow-section">
        <div className="slow-image">
          <img src={slowImg} alt="Golden sunset over a Kumaon hillside village" loading="lazy" />
        </div>
        <Reveal className="slow-copy">
          <p className="eyebrow">{slowEyebrow}</p>
          <h2>{slowTitle}</h2>
          {slowParagraphs.map((txt: string, idx: number) => (
            <p key={idx}>{txt}</p>
          ))}
          <blockquote>
            {slowQuote.split('\n').map((line: string, idx: number) => (
              <span key={idx}>
                {line}
                {idx < slowQuote.split('\n').length - 1 && <br />}
              </span>
            ))}
          </blockquote>
          <Cta to={slowCtaPath} className="text-link light-link">
            {slowCtaText}
          </Cta>
        </Reveal>
      </section>

      <section className="people">
        <img src={peopleImg} alt="Villagers walking a path between terraced fields in Kumaon" loading="lazy" />
        <div className="people-shade" />
        <Reveal className="people-copy">
          <p className="eyebrow light">{peopleEyebrow}</p>
          <h2>{peopleTitle}</h2>
          {peopleParagraphs.map((txt: string, idx: number) => (
            <p key={idx}>{txt}</p>
          ))}
          <p className="pull">{peoplePull}</p>
          <Cta to={peopleCtaPath} className="text-link light-link">
            {peopleCtaText}
          </Cta>
        </Reveal>
      </section>

      <section className="kitchen section-pad">
        <Reveal className="kitchen-title">
          <span className="row-num">03</span>
          <p className="eyebrow">{kitchenEyebrow}</p>
          <h2>{kitchenTitle}</h2>
        </Reveal>
        <Reveal className="kitchen-image">
          <img src={kitchenImg} alt="Breakfast table above the Kumaon valley" loading="lazy" />
        </Reveal>
        <Reveal className="kitchen-copy">
          <p className="lead">{kitchenLead}</p>
          {kitchenParagraphs.map((txt: string, idx: number) => (
            <p key={idx} className="body-copy">{txt}</p>
          ))}
          <Cta to={kitchenCtaPath}>{kitchenCtaText}</Cta>
        </Reveal>
      </section>

      <section className="beyond">
        <img src={beyondImg} alt="Terraced Kumaon hillside in morning light" loading="lazy" />
        <div className="people-shade" />
        <Reveal className="people-copy">
          <p className="eyebrow light">{beyondEyebrow}</p>
          <h2>{beyondTitle}</h2>
          <p className="pull">{beyondPull}</p>
          {beyondParagraphs.map((txt: string, idx: number) => (
            <p key={idx}>{txt}</p>
          ))}
          <Cta to={beyondCtaPath} className="text-link light-link">
            {beyondCtaText}
          </Cta>
        </Reveal>
      </section>

      <section className="journey section-pad">
        <Reveal className="journey-inner">
          <MountainMark />
          <p className="eyebrow">{journeyEyebrow}</p>
          <h2 style={{ whiteSpace: "pre-line" }}>{journeyTitle}</h2>
          {journeyParagraphs.map((txt: string, idx: number) => (
            <p key={idx}>{txt}</p>
          ))}
          <p className="pull">{journeyPull}</p>
          <Cta to={journeyCtaPath} className="primary-button">
            {journeyCtaText}
          </Cta>
        </Reveal>
      </section>
    </>
  );
}