# Kalakriti — Digital Gallery

Kalakriti is an immersive, cinematic digital art gallery designed to showcase paintings, drawings, and digital art in a museum-grade dark exhibition space.

Built with vanilla HTML, CSS, and JavaScript, it features a **"Gallery at Midnight"** design philosophy — using darkness as a frame and warm golden spotlighting to make colorful hand-painted artworks the undisputed star.

---

## ✨ Features

- 🌑 **Dark Exhibition Theme**: Deep obsidian background with ambient gradient shifts and floating particle motes that create an atmospheric, museum-at-night experience.
- 🖼️ **3D Perspective Carousel**: Artworks are displayed with real depth — center artwork in full focus with `rotateY()` perspective transforms, while adjacent works are scaled, blurred, and dimmed.
- ✨ **Ambient Spotlight Glow**: The active artwork frame radiates a warm golden glow, simulating museum spotlighting.
- 🎞️ **Filmstrip Navigator**: A vertical strip of clickable thumbnails on the right side for quick browsing.
- 📊 **Artwork Counter**: Displays current position (e.g., `01 / 10`) above the artwork title.
- 🎨 **Floating Paint Motes**: Canvas-based particle system with ~45 softly drifting particles for ambiance.
- 🔮 **Glassmorphic UI**: All interactive elements (info button, arrows, modal) use frosted glass with backdrop-filter.
- ℹ️ **Artist Statement Modal**: Full-viewport frosted glass overlay with the artist's personal statement.
- 🎛️ **Multi-Modal Navigation**:
  - Clickable filmstrip thumbnails.
  - Navigation arrows & bottom dash-style progress indicators.
  - Keyboard arrow key navigation (`ArrowLeft` / `ArrowRight`).
  - Mobile touch swipe gesture support.
  - **Trackpad Support**: Two-finger horizontal wheel swipe with accumulator threshold.
- 💻 **Fully Responsive**: Adapts from ultra-wide monitors to mobile screens. Filmstrip hides below 1024px for cleaner mobile experience.
- ⚙️ **Modular Design**: Configured via a simple data array for easy artwork management.

---

## 🛠️ Technology Stack

- **Core Structure**: HTML5 (Semantic elements)
- **Styling**: Vanilla CSS3 (Custom properties, perspective transforms, backdrop-filter, keyframes)
- **Interactions**: Vanilla JavaScript (ES6+, Canvas 2D particle system, touch gestures, wheel API)
- **Typography**: Cinzel Decorative (logo), Cinzel (headings), Outfit (body) via Google Fonts

---

## 🚀 Getting Started

Since this is a client-side project, you don't need any complex installation or build processes.

### Running Locally
You can view the project by simply opening the `index.html` file in any modern web browser, or serve it locally using a simple server:

```bash
# Using Node.js npx to serve the directory
npx serve .
```

---

## 🎨 Customizing & Adding Your Artwork

To add your own art, open the `script.js` file and edit the `artworksData` array at the top:

```javascript
const artworksData = [
  {
    id: 1,
    title: "My Artwork Name",
    imageSrc: "artwork/my-artwork-image.jpg" // path to your image
  },
  // ...
];
```

If no image is provided (`imageSrc: null`), Kalakriti will automatically fall back to showing a placeholder card indicating where your artwork goes.
