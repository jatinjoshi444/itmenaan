import { createBrowserRouter, Link, useParams } from "react-router";
import { useMemo, useState, useEffect } from "react";
import Layout from "./Layout";
import ContentPage from "./pages/ContentPage";
import Home from "./pages/Home";
import { pages } from "./content";

function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">Page not found</p>
      <h1>This path leads nowhere in particular.</h1>
      <p>Perhaps that is exactly what you were looking for.</p>
      <Link to="/" className="primary-button">
        Return to Itmenaan
      </Link>
    </section>
  );
}

function mediaUrl(value: any): string {
  if (typeof value === "string") return value;
  if (value && typeof value.url === "string") return value.url;
  return "";
}

function JournalSinglePage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/journal?where[slug][equals]=${encodeURIComponent(slug || "")}&limit=1&depth=2`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.docs?.[0]) {
          setPost(data.docs[0]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    return () => controller.abort();
  }, [slug]);

  if (loading) return null;
  if (!post) return <NotFound />;

  const heroImg = mediaUrl(post.hero?.image) || mediaUrl(post.image);
  const eyebrow = post.hero?.eyebrow || post.category || "Journal";
  const title = post.hero?.h1 || post.title;

  return (
    <article className="page journal-single">
      <section className="page-hero full">
        <img src={heroImg} alt={title} />
        <div className="hero-shade" />
        <div className="page-hero-copy">
          <p className="eyebrow light">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
      </section>

      <section className="journal-content" style={{ maxWidth: "800px", margin: "60px auto", padding: "0 20px" }}>
        {Array.isArray(post.contentBlocks) && post.contentBlocks.map((block: any, index: number) => {
          if (block.blockType === "headingBlock") {
            return block.level === "h3" ? (
              <h3 key={index} style={{ margin: "32px 0 16px", fontFamily: "serif" }}>{block.heading}</h3>
            ) : (
              <h2 key={index} style={{ margin: "40px 0 20px", fontFamily: "serif" }}>{block.heading}</h2>
            );
          }
          if (block.blockType === "paragraphBlock") {
            return <p key={index} style={{ marginBottom: "20px", lineHeight: "1.8", fontSize: "1.1rem" }}>{block.text}</p>;
          }
          if (block.blockType === "imageBlock") {
            return (
              <figure key={index} style={{ margin: "40px 0" }}>
                <img src={mediaUrl(block.image)} alt={block.caption || ""} style={{ width: "100%", height: "auto" }} />
                {block.caption && <figcaption style={{ marginTop: "8px", fontSize: "14px", opacity: 0.8, textAlign: "center" }}>{block.caption}</figcaption>}
              </figure>
            );
          }
          return null;
        })}
      </section>
    </article>
  );
}

function DynamicExperiencePage() {
  const { slug } = useParams();

  const pageData = useMemo(() => {
    const base = pages.find((page) => page.path === "/experiences");

    if (!base || !slug) return null;

    return {
      ...base,
      path: `/experiences/${slug}`,
      title: "Experience | Itmenaan Estate",
      kind: "standard" as const,
      nav: "Experiences",
      hero: {
        ...base.hero,
        lede: [],
      },
      blocks: [],
      gallery: [],
      links: [],
    };
  }, [slug]);

  if (!pageData) return <NotFound />;

  return <ContentPage data={pageData} />;
}


export function createAppRouter() {
  return createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: Home },
        ...pages.map((page) => ({
          path: page.path.slice(1),
          element: <ContentPage data={page} />,
        })),
        {
          path: "experiences/:slug",
          Component: DynamicExperiencePage,
        },
        {
          path: "journal/:slug",
          Component: JournalSinglePage,
        },
        { path: "*", Component: NotFound },
      ],
    },
  ]);
}
