# Kalakriti — Digital Sketchbook

Kalakriti is a beautiful, immersive, and responsive digital sketchbook designed to showcase paintings, drawings, and digital art in an interactive, clean rectangular carousel format.

Built with vanilla HTML, CSS, and JavaScript, it features a highly polished design with smooth animations, elegant glassmorphism, and multi-modal navigation suited for both desktop and mobile devices.

---

## ✨ Features

- 🖼️ **Minimal Gallery Layout**: Artworks are displayed in elegant, modern rectangular containers with minimal borders and subtle shadows, putting the art at the center of attention.
- 🌫️ **Immersive Carousel Effect**: Displays the active artwork in full focus, while adjacent pages are scaled down and blurred to build depth of field.
- 🎨 **Aesthetic Background**: A subtle, drifting pastel gradient background with floating organic light orbs.
- ℹ️ **Glassmorphism Info Modal**: An elegant info modal popup triggered by a minimalist "i" stamp button, presenting the artist's statement and core idea.
- 🎛️ **Multi-Modal Navigation**:
  - Clickable side pages to jump directly to a page.
  - Classic navigation arrows & bottom dot/dash progress indicators.
  - Keyboard arrow key navigation (`ArrowLeft` / `ArrowRight`).
  - Mobile touch swipe gesture support.
  - **Trackpad Support**: Real-time two-finger horizontal wheel swipe tracking with an accumulator threshold to prevent accidental skipping.
- 💻 **Fully Responsive**: Adapts seamlessly to all screen sizes, from ultra-wide monitors to mobile screens.
- ⚙️ **Modular Design**: Configured via a simple data array, making it incredibly simple to add or swap artworks.

---

## 🛠️ Technology Stack

- **Core Structure**: HTML5 (Semantic elements)
- **Styling**: Vanilla CSS3 (Custom properties, grid, flexbox, keyframes, backdrop-filter)
- **Interactions**: Vanilla JavaScript (ES6+, touch gestures, wheel API accumulator, event delegation)
- **Typography**: WindSong (signature logo/titles), Inter (sans-serif), Playfair Display & Cormorant Garamond via Google Fonts

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
