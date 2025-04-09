---
title: "How to Contribute to the Manic.agency Blog"
date: "2025-04-09" # Using today's date, change if needed
excerpt: "Learn how to contribute your own strange ideas and strong vibes to our open-source blog via Pull Request."
author: "Manic Agency" # Or your name/handle
category: "documentation" # Use a distinct category if needed, or omit if not a blog post
tags: ["contribution", "guide", "meta", "writing", "open source"]
# image: "/path/to/optional/image.png" # Optional: Add an image if you have one
---

# ✨ Manic.agency Blog

> "We publish strange ideas with strong vibes."

This repo powers the [Manic.agency](https://manic.agency) blog — a living, open-source publication.  
No headless CMS. Just Markdown, imagination, and contributions from people across dimensions.

We write about code, culture, AI, marketing, indie software, product design, the future, and the fragments between.

---

## 📝 How to Contribute

> ⚡️ Yes, you can open a PR with your own `.md` file.  
We accept article proposals, drafts, outlines, or headlines via **pull request**.

To submit your own post:
1. Fork this repo
2. Add your post in `posts/[category]/your-title.md` (Make sure to choose or create a category folder!)
3. Open a pull request

We'll take care of the rest.

---

### 🧠 Markdown File Format

Each post should start with frontmatter like this:

```yaml
---
title: "Your Article Title"
date: "2025-04-08"
excerpt: "A short summary of your piece."
author: "Your Name"
tags: ["ai", "ethics", "design"]
category: "technology" # e.g., thinkpieces, tutorials, design, etc.
image: "/assets/blog/your-image.png" # Optional but recommended
---

Then write your content in pure Markdown. We support:

- Headings (##)
- Code blocks
- Images
- Quotes
- Links
- Bold, italic, etc.

## 🔮 Optional Metadata

| Field | Type | Description | Required? |
|-------|------|-------------|-----------|
| title | string | Main title for the post | ✅ Yes |
| date | date | Format: YYYY-MM-DD | ✅ Yes |
| excerpt | string | Short summary shown on the blog index | ✅ Yes |
| category | string | High-level section (folder name) | ✅ Yes |
| author | string | Optional – pulled from git commit author if not set | No |
| tags | array | Tags like ["vibes", "llms", "future"] | No |
| image | string | Optional thumbnail image path | No |
| authorBio | string | Optional short bio for the author box | No |

## ✍️ Guidelines

- Don't worry about polish — we care more about vibe, originality, and insight
- Posts can be short or long. Even just an outline with a good title is fine
- Markdown only. No HTML unless you're doing something very cursed
- Your article doesn't need to be perfect — just interesting

## 📂 Folder Structure (Example)

```
/src/posts
  ├── thinkpieces/
  │   ├── logomaker-vibe-coding.md
  │   └── ai-sociopaths.md
  ├── tutorials/
  │   └── your-tutorial.md
  └── marketing/
      └── future-of-marketing.md
```

Once merged, your post will be live on manic.agency/blog — no deploys, no nonsense.

## 🔧 FEATURE ENHANCEMENTS (system-wide)

| Feature | Status | Description |
|---------|--------|-------------|
| ✅ Frontmatter | Implemented | Title, date, excerpt, author, category |
| ✅ Automatic author | Active | Pulled from Git commit if omitted |
| ✅ Tags | Implemented | tags: field, rendered on post page |
| ✅ Category | Implemented | category: field (matches folder), used for routing |
| ✅ Basic Blog Index | Implemented | Lists all posts |
| ✅ Category Index/Pages | Implemented | /category, /category/[name] |
| ✅ Tag Index/Pages | Implemented | /tags, /tags/[name] |
| ✅ Syntax Highlighting | Implemented | For code blocks |
| ✅ TOC / Reading Progress | Implemented | Client-side |
| 🆕 Preview images | To-do | Add image: field for post thumbnail (used on index + social previews) |
| 🆕 Ascii headers | To-do | Dynamic CLI-style headers or dividers for ✨mood✨ |
| 🆕 Fancy borders | To-do | Glowing, animated, or dashed borders on cards or quotes |
| 🆕 Category/Tag filter | To-do | Optional: filter posts by category or tag on /blog index |
| 🆕 Related Posts Logic | To-do | Improve related posts algorithm |
| 🆕 Image Component | To-do | Use next/image for optimization (if not static export) |

## ✅ Next steps (system changes)

- ~~Update blog schema parser to handle: tags, category, image~~ (Done)
- ~~Render tags below titles on post page~~ (Done)
- Render category/tag filters on blog index (optional)
- Use preview image in card on blog index (if present)
- Add optional ASCII flair

## 🌈 Upcoming Extras

- Robust Tag filters + search on index
- Fancy post cards with borders, emojis, and preview images
- Ascii/CLI-style headers
- "Manic-speak" glossary
- More guest essays, more chaos

## 💌 Stay strange, stay open

This is an open zine from a semi-chaotic agency operating on vibes, intuition, and late-night code.
We're building strange tools and stranger systems.
You're welcome to publish something that doesn't fit anywhere else.

Pull requests welcome 🕳

*(Note: I added the frontmatter back in but commented it out - decide if you want to add it or not based on the approach below). I also updated the "How to Contribute" and "Folder Structure" slightly based on our current setup.*

**2. Recommended Approach NOW:**

Since the error persists even without `contribute.md`, let's definitely **keep the contribution guide separate** from the blog posts.

* **Recreate the File:** Save the content above, perhaps as `CONTRIBUTING.md` in your project root, or `src/docs/contribute.md`. **Do NOT put it back in `src/posts/tutorials/`**.
* **Ensure `getAllPosts` Skips It:** Make sure `getAllPosts` doesn't try to read from outside `src/posts` or that it still has logic to skip non-blog files if you put it somewhere else accessible. Easiest is keeping it outside `src/posts`.
* **Create Dedicated Page:** Use the code for `src/app/blog/contribute/page.tsx` (or maybe `/contribute/page.tsx`) from the previous response to display this markdown file. Make sure the `README_PATH` constant in that file points to wherever you saved the contribution markdown.

**3. Fixing the Persistent Error for `/blog/logomaker-...`:**

The error isn't the `contribute.md` file itself, but something happening when `BlogPostPage` renders *any* problematic post, including `/blog/logomaker-...`.

You **need** to follow the debugging step from the previous answer:

* **Comment out the "Related Posts" section** within the `return (...)` block of `src/app/blog/[category]/[slug]/page.tsx`.
* **Delete `.next`**.
* **Run `npm run build`**.

This is the most direct way to test if that specific section (and its second call to `getAllPosts`) is triggering the `path.join(..., undefined)` error when rendering the `logomaker-...` page.