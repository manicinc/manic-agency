---
title: "README"
date: "2025-04-08"
excerpt: "This is a the README on how to add a post."
author: "Victor E."
---

---


This project uses Markdown files located in the `@/blogs/` folder to generate blog posts automatically. Here's how you can create your own!

---

## 📂 Folder Structure

Your blog posts should be saved in the `blogs` directory at the root level or under `src/app/blogs/` if you're using a modular setup.

```
/blogs
  ├── my-first-post.md
  ├── another-insightful-post.md
```

---

## 📄 Markdown File Naming

- Use **kebab-case** for the filename (e.g., `my-first-post.md`)
- This will become the blog's slug in the URL:  
  `/blog/my-first-post`

---

## ✍️ Markdown File Format

Each Markdown file must begin with a **frontmatter block** (YAML format) to define metadata about the post.

### Example: `my-first-post.md`

```markdown
---
title: "My First Post"
date: "2025-04-08"
excerpt: "This is a short description or summary of the post."
author: "Victor E."
---

## Welcome to My Blog

This is the content of the blog post written in Markdown.

- It's clean
- It's simple
- It's easy to write!

You can use **bold**, *italic*, [links](https://example.com), images, code blocks, and more!
```

---

## 🧠 Metadata Explained

| Field    | Required | Description |
|----------|----------|-------------|
| `title`  | ✅       | The title of your blog post |
| `date`   | ✅       | The publication date (in `YYYY-MM-DD` format) |
| `excerpt`| ✅       | A short summary displayed on the blog listing page |
| `author` | ❌       | Name of the author (optional) |

---

## ✅ Tips

- Always make sure the frontmatter is enclosed in triple-dashed lines `---`
- Avoid using special characters in the file name (stick to `a-z`, `-`, and numbers)
- Use semantic headers (`##`, `###`) to organize your post content

---

## 📦 Example Folder

```
blogs/
  ├── my-first-post.md
  └── tech-trends-2025.md
```

---

Once your Markdown file is saved in the `blogs` folder, it will automatically appear on the blog page (`/blog`) with the title, excerpt, and link to read more.

Happy writing! ✨

---