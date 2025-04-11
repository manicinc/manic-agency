---
title: "⟨/⟩ Contribute to the Synthetic Publishing Platform"
date: "2025-04-10"
excerpt: "Learn how to contribute your experimental ideas and digital explorations to our synthetic publishing platform."
author: "Manic Agency"
category: "documentation"
tags: ["contribution", "guide", "markdown", "writing", "open source"]
image: "/assets/blog/contribute-banner.jpg"
---

> *"The digital frontier isn't found. It's synthesized."*

## 🌐 About Manic.agency

Manic.agency is an **experimental publishing platform** that transcends traditional content management systems. We are a digital space dedicated to exploring:

- Experimental UI/UX
- AI Systems
- Creative Coding
- Synthetic Media
- Speculative Technology
- Interdisciplinary digital explorations

## 📡 Contribution Protocol

### Submission Process

1. **Fork the Repository**
2. **Create Content File**
   - Location: `src/posts/[category]/your-article-slug.md`
3. **Add Supporting Images**
   - Location: `public/assets/blog/[your-article-slug]/`
4. **Open a Pull Request**
5. **Engage with Feedback**

## 📊 Markdown & Metadata Structure

### Required Metadata

Every contribution must include a comprehensive YAML frontmatter:

```yaml
---
title: "Your Neural Interface Exploration"
date: "2025-04-10"
excerpt: "A concise summary of your digital exploration."
author: "Your Identifier"
category: "experiments"
tags: ["neural-interfaces", "synthetic-media", "speculative-tech"]
image: "/assets/blog/your-article-slug/featured-image.jpg"
---
```

### Extended Metadata Options

```yaml
authorBio: "Brief context about your relevant background and work."
featured: true  # Promotes content to featured sections
sortOrder: 3    # Controls display order in featured collections
bgColor: "#0a0b13"  # Custom background color in HEX format
textColor: "#7f5af0"  # Custom text color in HEX format
```

## 🧠 Advanced Content Formatting

### Image Controls

#### Comprehensive Image Formatting

```markdown
![Circuit board close-up|size=medium|align=left|effect=glow|caption=Experimental neural processing unit](/path/to/circuit.jpg)
```

##### Size Options
- `small`: Compact (300px max)
- `medium`: Standard (500px max)
- `large`: Expanded (800px max)
- `full`: Full-width display

##### Alignment Options
- `left`: Text wraps right
- `center`: Centered display
- `right`: Text wraps left

##### Visual Effects
- `shadow`: Subtle drop shadow
- `border`: Defined border
- `glow`: Ethereal accent glow
- `glitch`: Interactive hover effect

##### Border Styles
- `simple`: Basic border
- `gradient`: Accent gradient border
- `glow`: Glowing border
- `inset`: Inset shadow
- `dashed`: Dashed border
- `none`: No border (default)

#### Additional Image Controls
- Zoomable toggle
- Custom captions

### Image Grid Layouts

```markdown
<ImageGrid columns=3>
  ![First image](/path/to/image1.jpg)
  ![Second image](/path/to/image2.jpg)
  ![Third image](/path/to/image3.jpg)
</ImageGrid>
```

### Code Blocks

Supports syntax highlighting across multiple languages:

```javascript
function generatePattern(complexity, seed) {
  const base = seed || Math.random();
  return Array(complexity).fill(0).map((_, i) => ({
    weight: base * (i / complexity) * Math.sin(i),
    activation: i % 2 ? 'sigmoid' : 'relu',
    connections: Math.floor(complexity / (i + 1))
  }));
}
```

### Custom Callouts

```markdown
:::note
Important implementation details.
:::

:::warning
Experimental features alert.
:::

:::tip
Optimization suggestions.
:::

:::alert
Critical considerations.
:::
```

### Data Tables

```markdown
| Parameter | Range | Default | Impact |
|-----------|-------|---------|--------|
| Latency | 10-100ms | 30ms | Responsiveness |
| Precision | 0.1-0.001 | 0.01 | Detail level |
| Iterations | 1-10 | 3 | Processing depth |
```

### Mathematical Formulas

```markdown
$$
f(x) = \sum_{i=0}^{n} \frac{a_i}{1 + e^{-(x-b_i)/c_i}}
$$
```

## 📁 Content Structure

```
/src/posts
  ├── experiments/
  │   ├── neural-interface-prototype.md
  │   └── synthetic-media-generation.md
  ├── research/
  │   └── emergent-system-behaviors.md
  ├── tutorials/
  │   └── building-with-synthstack.md
  └── theory/
      └── digital-consciousness-parameters.md
```

## 🧪 Technical Rendering Capabilities

Our platform supports:
- Syntax highlighting
- Responsive image layouts
- Dynamic image sizing
- Mathematical formula rendering (KaTeX)
- Interactive client components
- Custom callout blocks
- JavaScript code execution (sandbox)
- Graph/chart generation

## 🔮 Feature Roadmap

| Feature | Status | Description |
|---------|--------|-------------|
| ✅ Advanced image controls | Implemented | Sizing, alignment, effects |
| ✅ Code syntax highlighting | Implemented | Multiple language support |
| ✅ Image grids | Implemented | Responsive layouts |
| ✅ Custom callouts | Implemented | Informative blocks |
| ✅ Table formatting | Implemented | Responsive data tables |
| ✅ Math formula rendering | In testing | KaTeX integration |
| 🔄 Interactive code blocks | In development | Editable examples |
| 🔄 SVG diagram generation | In development | Code-to-diagram rendering |
| 📝 Data visualization | Planned | Chart generation from tables |
| 📝 Timeline components | Planned | Interactive concept timelines |

## 🔬 Real-World Contribution Examples

### Image Sizing Example

```markdown
# Neural Pathways in Synthetic Systems

![Basic neural structure|size=small|align=right](/assets/neural-basic.jpg)

When examining synthetic neural structures, we observe emergent pathway formation...

## Advanced Connections

![Connection topology|size=large](/assets/connection-topology.jpg)

The topology reveals complex decision matrices...
```

### Image Grid Comparison

```markdown
## System Evolution Across Iterations

<ImageGrid columns=3>
  ![Version 1.0](/assets/v1-interface.jpg)
  ![Version 2.0](/assets/v2-interface.jpg)
  ![Version 3.0](/assets/v3-interface.jpg)
</ImageGrid>

The progression demonstrates our evolving understanding...
```

### Mathematical Analysis

```markdown
## Activation Function Optimization

The normalized activation pattern:

$$
A(x) = \max(0, x) + \alpha \min(0, x)
$$

Where $\alpha$ represents the leakage coefficient...
```

## 🕳️ Transmission Protocol

We're an experimental platform operating beyond traditional disciplinary boundaries. We build the tools, systems, and theories we wish existed.

**Your anomalous contributions are welcome.** 📡

*Synthesize the unexpected.*