import { useState } from "react";
import styles from "./Blogs.module.css";

interface Author {
  name: string;
  avatar: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  author: Author;
  date: string;
  readTime: number;
  featured?: boolean;
}

const CATEGORIES = ["All", "Design", "Development", "Branding", "UX Research", "Strategy"];

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Minimalist Web Design: Less Is Always More",
    excerpt:
      "Discover how stripping away the unnecessary reveals the essential. We explore the principles behind minimalist design and why the most successful brands embrace negative space.",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    author: { name: "Sarah Mitchell", avatar: "https://i.pravatar.cc/80?img=47" },
    date: "May 28, 2025",
    readTime: 6,
    featured: true,
  },
  {
    id: 2,
    title: "Building Scalable Design Systems That Stand the Test of Time",
    excerpt:
      "A design system is only as good as its foundation. Learn how to architect token-driven systems that scale across teams and products without breaking under pressure.",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    author: { name: "James Carter", avatar: "https://i.pravatar.cc/80?img=12" },
    date: "May 22, 2025",
    readTime: 8,
  },
  {
    id: 3,
    title: "React 19 and the Future of Frontend Development",
    excerpt:
      "With concurrent features now stable, React 19 changes how we think about rendering. Here's a practical breakdown of what's new and how to migrate your codebase today.",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    author: { name: "Emily Zhao", avatar: "https://i.pravatar.cc/80?img=23" },
    date: "May 15, 2025",
    readTime: 10,
  },
  {
    id: 4,
    title: "Why Brand Identity Is Your Most Valuable Business Asset",
    excerpt:
      "Logos fade, campaigns end — but a coherent brand identity endures. We unpack the strategic layers of branding that turn customers into advocates.",
    category: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    author: { name: "Marcus Ellis", avatar: "https://i.pravatar.cc/80?img=8" },
    date: "May 10, 2025",
    readTime: 5,
  },
  {
    id: 5,
    title: "User Research Methods Every UX Designer Should Master",
    excerpt:
      "From contextual inquiry to card sorting, the right research method unlocks insights that no amount of guesswork can. Build empathy through systematic observation.",
    category: "UX Research",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80",
    author: { name: "Priya Nair", avatar: "https://i.pravatar.cc/80?img=32" },
    date: "May 5, 2025",
    readTime: 7,
  },
  {
    id: 6,
    title: "Digital Strategy in 2025: Navigating Complexity With Clarity",
    excerpt:
      "As AI reshapes every channel, brands that win are those with a coherent digital strategy. Here's the framework we use with Fortune 500 clients to cut through noise.",
    category: "Strategy",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    author: { name: "Alex Rodriguez", avatar: "https://i.pravatar.cc/80?img=15" },
    date: "Apr 29, 2025",
    readTime: 9,
  },
  {
    id: 7,
    title: "Typography Hierarchy: The Invisible Architecture of Great UI",
    excerpt:
      "Great typography isn't about picking a beautiful font — it's about creating a visual rhythm that guides the reader's eye. Master scale, weight, and spacing.",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=600&q=80",
    author: { name: "Sarah Mitchell", avatar: "https://i.pravatar.cc/80?img=47" },
    date: "Apr 21, 2025",
    readTime: 6,
  },
];

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [email, setEmail] = useState<string>("");

  const featured = BLOG_POSTS.find((p) => p.featured)!;
  const allOthers = BLOG_POSTS.filter((p) => !p.featured);

  const filteredPosts =
    activeCategory === "All"
      ? allOthers
      : allOthers.filter((p) => p.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.heroEyebrow}>Our Journal</span>
        <h1 className={styles.heroTitle}>
          Ideas, Insights &{" "}
          <span className={styles.heroTitleAccent}>Inspiration</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Dive into our collection of articles on design, development, branding,
          and digital strategy — written by the people who live this work every
          day.
        </p>
        <div className={styles.heroMeta}>
          <span>{BLOG_POSTS.length} Articles</span>
          <span className={styles.heroMetaDivider} />
          <span>Updated Weekly</span>
          <span className={styles.heroMetaDivider} />
          <span>Free to Read</span>
        </div>
      </section>

      <div className={styles.filterBar}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {(activeCategory === "All" || activeCategory === featured.category) && (
          <section className={styles.featuredSection}>
            <p className={styles.sectionLabel}>Featured Post</p>
            <article className={styles.featuredCard}>
              <div className={styles.featuredImageWrap}>
                <img
                  className={styles.featuredImage}
                  src={featured.imageUrl}
                  alt={featured.title}
                  loading="eager"
                />
              </div>
              <div className={styles.featuredBody}>
                <span className={styles.categoryBadge}>{featured.category}</span>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                <div className={styles.cardMeta}>
                  <img
                    className={styles.authorAvatar}
                    src={featured.author.avatar}
                    alt={featured.author.name}
                  />
                  <div className={styles.metaText}>
                    <span className={styles.metaAuthor}>{featured.author.name}</span>
                    <span className={styles.metaDate}>
                      {featured.date} · {featured.readTime} min read
                    </span>
                  </div>
                </div>
                <button type="button" className={styles.readMoreLink}>
                  Read Article <ArrowRightIcon />
                </button>
              </div>
            </article>
          </section>
        )}

        <section className={styles.postsSection}>
          {activeCategory !== "All" && (
            <p className={styles.sectionLabel}>{activeCategory}</p>
          )}
          {activeCategory === "All" && (
            <p className={styles.sectionLabel}>Latest Posts</p>
          )}
          <div className={styles.postsGrid}>
            {filteredPosts.map((post) => (
              <article key={post.id} className={styles.blogCard}>
                <div className={styles.cardImageWrap}>
                  <img
                    className={styles.cardImage}
                    src={post.imageUrl}
                    alt={post.title}
                    loading="lazy"
                  />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardCategory}>{post.category}</span>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.cardFooterMeta}>
                    <img
                      className={styles.cardAuthorAvatar}
                      src={post.author.avatar}
                      alt={post.author.name}
                    />
                    <span className={styles.cardAuthorName}>{post.author.name}</span>
                  </div>
                  <div className={styles.cardReadTime}>
                    <ClockIcon />
                    {post.readTime} min
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p style={{ textAlign: "center", color: "#52525b", padding: "48px 0" }}>
              No posts in this category yet.
            </p>
          )}

          <div className={styles.loadMoreWrap}>
            <button className={styles.loadMoreBtn}>Load More Articles</button>
          </div>
        </section>

        <section className={styles.newsletter}>
          <h2 className={styles.newsletterTitle}>Stay in the Loop</h2>
          <p className={styles.newsletterSubtitle}>
            Get our latest articles delivered straight to your inbox. No spam, ever.
          </p>
          <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
            <input
              type="email"
              className={styles.newsletterInput}
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.newsletterBtn}>
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Blogs;
