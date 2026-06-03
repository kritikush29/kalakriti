# Kalakriti — Digital Sketchbook

Kalakriti is a beautiful, immersive, and responsive digital sketchbook designed to showcase paintings, drawings, and digital art in an interactive, book-like carousel format. 

Built with vanilla HTML, CSS, and JavaScript, it features a highly polished design with smooth animations, realistic book folding details, and multi-modal navigation suited for both desktop and mobile devices.

---

## ✨ Features

- 📖 **Realistic Book Design**: A custom-styled open sketchbook with a center spine gradient fold effect, page layered shadows, and a classic red ribbon bookmark.
- 🌫️ **Immersive Carousel Layout**: Displays the active sketch in full focus, while adjacent pages are scaled down and blurred to build depth of field.
- 🎨 **Aesthetic Background**: A subtle, drifting pastel gradient background with floating organic light orbs.
- 🎛️ **Multi-Modal Navigation**:
  - Clickable side pages to jump directly to a page.
  - Classic navigation arrows & bottom dot/dash progress indicators.
  - Keyboard arrow key navigation (`ArrowLeft` / `ArrowRight`).
  - Mobile touch swipe gesture support.
  - **Trackpad Support**: Real-time two-finger horizontal wheel swipe tracking with an accumulator threshold to prevent accidental skipping.
- 💻 **Fully Responsive**: Adapts seamlessly to all screen sizes, from ultra-wide monitors to mobile screens.
- 🖼️ **Modular Design**: Configured to display full-width spreads, making it incredibly simple to swap in custom image files.

---

## 🛠️ Technology Stack

- **Core Structure**: HTML5 (Semantic elements)
- **Styling**: Vanilla CSS3 (Custom properties, grid, flexbox, keyframes, backdrop-filter)
- **Interactions**: Vanilla JavaScript (ES6+, touch gestures, wheel API accumulator, event delegation)
- **Fonts**: Playfair Display & Cormorant Garamond via Google Fonts

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

To add your own art, open the `script.js` file and look for the `artworks` array at the top. Replace the `image: null` values with the path to your image files:

```javascript
const artworks = [
  {
    location: "Paris, France",
    date: "March 2024",
    image: "assets/my-paris-watercolor.jpg", // path to your image
  },
  // ...
];
```

If no image is provided (`image: null`), Kalakriti will automatically fall back to showing a beautiful pastel gradient placeholder card indicating where your artwork goes.
