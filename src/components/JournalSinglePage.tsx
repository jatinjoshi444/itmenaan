import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MountainMark, Reveal } from "../ui";
import { CtaBand, SubNav, usePageTitle } from "../components/shared";
function mediaUrl(value: any): string {
  if (typeof value === "string") return value;
  if (value && typeof value.url === "string") return value.url;
  return "";
}

export default function JournalSinglePage() {
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

  usePageTitle(post?.title || "Journal | Itmenaan");

  if (loading) return null;
  if (!post) return <div className="page" style={{ padding: "100px 20px", textAlign: "center" }}>Post not found</div>;

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

      <SubNav />

      <section className="journal-content" style={{ maxWidth: "800px", margin: "60px auto", padding: "0 20px" }}>
        {Array.isArray(post.contentBlocks) && post.contentBlocks.map((block: any, index: number) => {
          if (block.blockType === "headingBlock") {
            return block.level === "h3" ? (
              <h3 key={index} style={{ margin: "32px 0 16px" }}>{block.heading}</h3>
            ) : (
              <h2 key={index} style={{ margin: "40px 0 20px" }}>{block.heading}</h2>
            );
          }
          if (block.blockType === "paragraphBlock") {
            return <p key={index} style={{ marginBottom: "20px", lineHeight: "1.8" }}>{block.text}</p>;
          }
          if (block.blockType === "imageBlock") {
            return (
              <figure key={index} style={{ margin: "40px 0" }}>
                <img src={mediaUrl(block.image)} alt={block.caption || ""} style={{ width: "100%", height: "auto" }} />
                {block.caption && <figcaption style={{ marginTop: "8px", fontSize: "14px", opacity: 0.8 }}>{block.caption}</figcaption>}
              </figure>
            );
          }
          return null;
        })}
      </section>

      <CtaBand
        h="Perhaps what you are looking for is already here."
        p="A few days in the mountains. A little distance from the familiar."
        actions={[["Book Your Stay", "/book"]]}
      />
    </article>
  );
}