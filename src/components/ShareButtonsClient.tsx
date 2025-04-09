"use client";

import { useEffect, useState } from "react";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [redditCount, setRedditCount] = useState<number | null>(null);
  const [hnCount, setHnCount] = useState<number | null>(null);

  useEffect(() => {
    // Reddit share count
    fetch(`https://www.reddit.com/api/info.json?url=${encodeURIComponent(url)}`)
      .then(res => res.json())
      .then(data => {
        const posts = data?.data?.children || [];
        const total = posts.reduce((acc: number, post: any) => acc + (post.data.score || 0), 0);
        setRedditCount(total);
      });

    // Hacker News share count (via Algolia)
    fetch(`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(url)}&tags=story`)
      .then(res => res.json())
      .then(data => {
        const total = data?.hits?.[0]?.points || 0;
        setHnCount(total);
      });
  }, [url]);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="share-buttons">
      <h3 className="share-heading">Share this post</h3>

      <div className="share-grid">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn twitter"
        >
          🐦 Twitter
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn facebook"
        >
          📘 Facebook
        </a>

        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn linkedin"
        >
          💼 LinkedIn
        </a>

        <a
          href={`https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn reddit"
        >
          👽 Reddit {redditCount !== null ? `(${redditCount})` : ""}
        </a>

        <a
          href={`https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn hackernews"
        >
          🧡 Hacker News {hnCount !== null ? `(${hnCount})` : ""}
        </a>

        <a
          href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
          className="share-btn email"
        >
          ✉️ Email
        </a>

        <button
          className="share-btn copy"
          onClick={() => {
            navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
          }}
        >
          📋 Copy Link
        </button>
      </div>
    </div>
  );
}
