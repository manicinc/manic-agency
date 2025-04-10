---
title: "Publishing on Manic.agency: A Contributor's Guide"
date: "2025-04-10"
excerpt: "Learn how to contribute your experimental ideas and digital explorations to our synthetic publishing platform."
author: "Manic Agency"
category: "documentation"
tags: ["contribution", "guide", "markdown", "writing", "open source"]
image: "/assets/blog/contribute-banner.jpg"
---

# ⟨/⟩ Contributing to Manic.agency 

> *"The digital frontier isn't found. It's synthesized."*

The [Manic.agency](https://manic.agency) platform is an experimental publishing space for technical explorations, digital art theories, and synthetic interfaces. No traditional CMS—just Markdown, code, and contributions from like-minded digital explorers across the network.

We cover experimental UI/UX, AI systems, creative coding, synthetic media, speculative technology, and the strange spaces between established disciplines.

## 📡 Contribution Protocol

We accept article contributions via **pull request**. Your content can range from fully-formed articles to experimental concepts, research snippets, or technical demonstrations.

### Submission Process

1. Fork the repository
2. Create your content file in `src/posts/[category]/your-article-slug.md`
3. Add any supporting images to `public/assets/blog/[your-article-slug]/`
4. Open a pull request
5. Engage with any feedback

## 📊 Markdown & Metadata Structure

Each contribution requires structured metadata and content formatting.

### Required Metadata

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

The system supports additional parameters for enhanced presentation:

```yaml
authorBio: "Brief context about your relevant background and work."
featured: true  # Promotes content to featured sections
sortOrder: 3    # Controls display order in featured collections
bgColor: "#0a0b13"  # Custom background color in HEX format
textColor: "#7f5af0"  # Custom text color in HEX format
```

## 🧠 Content Formatting Guide

### Advanced Image Formatting

Our system supports extended image controls through a specialized syntax:

#### Basic Image with Size Control

```markdown
![Image description|size=small](/path/to/image.jpg)
```

Size options include:
- `small` - Compact, roughly 1/4 width (300px max)
- `medium` - Standard, roughly 1/2 width (500px max)
- `large` - Expanded, roughly 3/4 width (800px max)
- `full` - Full-width display

#### Image Alignment

```markdown
![Circuit diagram|size=medium|align=right](/path/to/circuit.jpg)
```

Alignment options:
- `left` - Text wraps around the right side
- `center` - Default centered display
- `right` - Text wraps around the left side

#### Visual Effects

```markdown
![Neural network visualization|effect=glow](/path/to/network.jpg)
```

Effect options:
- `shadow` - Subtle drop shadow
- `border` - Defined border with accent color
- `glow` - Ethereal glow using accent color
- `glitch` - Interactive glitch effect on hover

#### Border Styles

```
![Image description|border=gradient](/path/to/image.jpg)
```

- `simple` - Simple border
- `gradient` - Gradient border using accent colors
- `glow` - Glowing border effect
- `inset` - Inset shadow effect
- `dashed` - Dashed border
- `none` - No border (default)

#### Zoomable by Default

```markdown
![Image description|zoomable=false](/path/to/image.jpg)
```

#### Image with Caption

```markdown
![|caption=Synthetic interface prototype from our 2024 experiments](/path/to/interface.jpg)
```

#### Combined Parameters

```markdown
![Circuit board close-up|size=medium|align=left|effect=glow|caption=Experimental neural processing unit](/path/to/circuit.jpg)
```

### Image Grid Layouts

For multi-image displays:

```markdown
<ImageGrid columns=3>
  ![First image](/path/to/image1.jpg)
  ![Second image](/path/to/image2.jpg)
  ![Third image](/path/to/image3.jpg)
</ImageGrid>
```

### Code Blocks with Syntax Highlighting

```javascript
// Neural pattern generator
function generatePattern(complexity, seed) {
  const base = seed || Math.random();
  return Array(complexity).fill(0).map((_, i) => {
    return {
      weight: base * (i / complexity) * Math.sin(i),
      activation: i % 2 ? 'sigmoid' : 'relu',
      connections: Math.floor(complexity / (i + 1))
    };
  });
}
```

### Custom Callouts

```markdown
:::note
Important implementation details should be noted here.
:::

:::warning
Experimental features may produce unpredictable results.
:::

:::tip
Optimize rendering by pre-processing node connections.
:::

:::alert
Critical security considerations for neural access points.
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

## 🔧 Real-World Examples

### Effective Image Sizing

```markdown
# Neural Pathways in Synthetic Systems

Text introduction to the concept...

![Basic neural structure|size=small|align=right](/assets/neural-basic.jpg)

When examining synthetic neural structures, we observe emergent pathway formation without explicit programming. These pathways demonstrate characteristics similar to biological systems while maintaining their unique synthetic properties.

## Advanced Connections

![Connection topology map|size=large](/assets/connection-topology.jpg)

The topology of advanced connections reveals complex decision matrices that evolve based on input patterns...
```

### Using Image Grid for Comparisons

```markdown
## System Evolution Across Iterations

<ImageGrid columns=3>
  ![Version 1.0](/assets/v1-interface.jpg)
  ![Version 2.0](/assets/v2-interface.jpg)
  ![Version 3.0](/assets/v3-interface.jpg)
</ImageGrid>

The progression of the interface demonstrates our shifting understanding of synthetic-human interaction patterns...
```

### Mathematical Analysis Example

```markdown
## Activation Function Optimization

The normalized activation pattern can be expressed as:

$$
A(x) = \max(0, x) + \alpha \min(0, x)
$$

Where $\alpha$ represents the leakage coefficient, typically set between 0.1 and 0.3 for optimal signal propagation without information loss.
```

## 🧪 Technical Implementation Details

The rendering system supports:

- **Syntax highlighting** for multiple languages
- **Responsive image layouts** with dynamic sizing
- **Mathematical formula rendering** using KaTeX
- **Interactive elements** via client components
- **Custom callouts** for various information types
- **Code execution** for JavaScript examples (sandbox environment)
- **Graph/chart generation** from code or data

## 🔮 Feature Roadmap

| Feature | Status | Description |
|---------|--------|-------------|
| ✅ Advanced image controls | Implemented | Size, alignment, effects, captions |
| ✅ Code syntax highlighting | Implemented | Multiple language support |
| ✅ Image grids | Implemented | Responsive multi-image layouts |
| ✅ Custom callouts | Implemented | Note, warning, tip, alert blocks |
| ✅ Table formatting | Implemented | Responsive data tables |
| ✅ Math formula rendering | In testing | KaTeX integration |
| 🔄 Interactive code blocks | In development | Editable & executable examples |
| 🔄 SVG diagram generation | In development | Code-to-diagram rendering |
| 📝 Data visualization | Planned | Chart generation from markdown tables |
| 📝 Timeline components | Planned | Interactive project/concept timelines |

## 🕳️ Transmission Protocol

This is an experimental platform operating across normal disciplinary boundaries. We're building the tools, systems, and theories we wish existed. Your anomalous contributions are welcome.

Pull requests transmit data across the void. 📡