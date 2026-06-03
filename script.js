/* ============================================
   DIGITAL SKETCHBOOK — JavaScript
   ============================================ */

// ──────────────────────────────────────────────
// ARTWORK DATA
// ──────────────────────────────────────────────
// To add your own artwork, set the "image" field to the
// path of your image file (relative or absolute).
//
// Example:
//   { location: "Paris", date: "March 2024", image: "artwork/paris.jpg" }
//
// If "image" is null, a beautiful placeholder is shown.
// You can also use "leftImage" and "rightImage" for
// separate images on each page of the book spread.
// ──────────────────────────────────────────────

const artworks = [
  {
    location: "Paris, France",
    date: "March 2024",
    image: null,              // Replace with your artwork path
    placeholderGradient: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 50%, #e8eaf6 100%)"
  },
  {
    location: "Venice, Italy",
    date: "April 2024",
    image: null,
    placeholderGradient: "linear-gradient(135deg, #e0f2f1 0%, #e8eaf6 50%, #fce4ec 100%)"
  },
  {
    location: "Kyoto, Japan",
    date: "May 2024",
    image: null,
    placeholderGradient: "linear-gradient(135deg, #fff3e0 0%, #fce4ec 50%, #f3e5f5 100%)"
  },
  {
    location: "Santorini, Greece",
    date: "June 2024",
    image: null,
    placeholderGradient: "linear-gradient(135deg, #e3f2fd 0%, #e8eaf6 50%, #e0f2f1 100%)"
  },
  {
    location: "Marrakech, Morocco",
    date: "July 2024",
    image: null,
    placeholderGradient: "linear-gradient(135deg, #fff8e1 0%, #ffe0b2 50%, #ffccbc 100%)"
  }
];

// ──────────────────────────────────────────────
// STATE
// ──────────────────────────────────────────────
let currentIndex = 0;
let isTransitioning = false;
let touchStartX = 0;
let touchStartY = 0;
let isDragging = false;
let wheelAccumulator = 0; // Tracks trackpad swipe distance to prevent multi-slide skipping

// ──────────────────────────────────────────────
// DOM REFERENCES
// ──────────────────────────────────────────────
const viewport = document.getElementById('carousel-viewport');
const locationEl = document.getElementById('page-location');
const dateEl = document.getElementById('page-date');
const dotsContainer = document.getElementById('dots-container');
const navLeft = document.getElementById('nav-left');
const navRight = document.getElementById('nav-right');

// ──────────────────────────────────────────────
// BUILD CAROUSEL
// ──────────────────────────────────────────────
function createBookElement(artwork, index) {
  const item = document.createElement('div');
  item.className = 'carousel-item';
  item.dataset.index = index;

  const artworkContent = artwork.image
    ? `<div class="artwork-spread">
         <img src="${artwork.image}" alt="${artwork.location} artwork" loading="lazy" />
       </div>`
    : `<div class="artwork-spread">
         <div class="artwork-placeholder" style="background: ${artwork.placeholderGradient}">
           <div class="placeholder-icon">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
               <path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
           </div>
           <span class="placeholder-text">Add Artwork</span>
         </div>
       </div>`;

  item.innerHTML = `
    <div class="book-card">
      <div class="book">
        <div class="ribbon">
          <div class="ribbon-body"></div>
        </div>
        <div class="book-pages">
          ${artworkContent}
        </div>
        <div class="book-spine"></div>
        <div class="book-fold"></div>
      </div>
    </div>
  `;

  return item;
}

function buildCarousel() {
  viewport.innerHTML = '';
  artworks.forEach((artwork, i) => {
    const el = createBookElement(artwork, i);
    viewport.appendChild(el);
  });
  buildDots();
  updateCarousel(false);
}

// ──────────────────────────────────────────────
// DOTS
// ──────────────────────────────────────────────
function buildDots() {
  dotsContainer.innerHTML = '';
  artworks.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === currentIndex ? ' active' : ' inactive');
    dot.setAttribute('aria-label', `Go to page ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.className = 'dot ' + (i === currentIndex ? 'active' : 'inactive');
  });
}

// ──────────────────────────────────────────────
// UPDATE CAROUSEL POSITIONS
// ──────────────────────────────────────────────
function updateCarousel(animate = true) {
  const items = viewport.querySelectorAll('.carousel-item');

  items.forEach((item, i) => {
    const offset = i - currentIndex;

    // Remove all position classes
    item.classList.remove('center', 'left', 'right', 'hidden-left', 'hidden-right');

    if (!animate) {
      item.style.transition = 'none';
    }

    if (offset === 0) {
      item.classList.add('center');
    } else if (offset === -1) {
      item.classList.add('left');
    } else if (offset === 1) {
      item.classList.add('right');
    } else if (offset < -1) {
      item.classList.add('hidden-left');
    } else {
      item.classList.add('hidden-right');
    }

    if (!animate) {
      // Force reflow then restore transitions
      item.offsetHeight; // eslint-disable-line
      requestAnimationFrame(() => {
        item.style.transition = '';
      });
    }
  });

  // Update text
  updatePageInfo(animate);
  updateDots();
  updateNavArrows();
}

// ──────────────────────────────────────────────
// PAGE INFO TEXT TRANSITION
// ──────────────────────────────────────────────
function updatePageInfo(animate = true) {
  const artwork = artworks[currentIndex];

  if (!animate) {
    locationEl.textContent = artwork.location;
    dateEl.textContent = artwork.date;
    return;
  }

  // Fade out
  locationEl.classList.add('transitioning');
  dateEl.classList.add('transitioning');

  setTimeout(() => {
    locationEl.textContent = artwork.location;
    dateEl.textContent = artwork.date;
    locationEl.classList.remove('transitioning');
    dateEl.classList.remove('transitioning');
  }, 300);
}

// ──────────────────────────────────────────────
// NAV ARROWS
// ──────────────────────────────────────────────
function updateNavArrows() {
  navLeft.classList.toggle('hidden', currentIndex === 0);
  navRight.classList.toggle('hidden', currentIndex === artworks.length - 1);
}

// ──────────────────────────────────────────────
// NAVIGATION
// ──────────────────────────────────────────────
function goTo(index) {
  if (isTransitioning || index === currentIndex) return;
  if (index < 0 || index >= artworks.length) return;

  isTransitioning = true;
  currentIndex = index;
  updateCarousel(true);

  setTimeout(() => {
    isTransitioning = false;
  }, 700);
}

function goNext() {
  goTo(currentIndex + 1);
}

function goPrev() {
  goTo(currentIndex - 1);
}

// ──────────────────────────────────────────────
// EVENT LISTENERS
// ──────────────────────────────────────────────

// Arrow buttons
navLeft.addEventListener('click', goPrev);
navRight.addEventListener('click', goNext);

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'Left') goPrev();
  if (e.key === 'ArrowRight' || e.key === 'Right') goNext();
});

// Touch / Swipe (Mobile)
viewport.addEventListener('touchstart', (e) => {
  if (isTransitioning) return;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  isDragging = true;
}, { passive: true });

viewport.addEventListener('touchend', (e) => {
  if (!isDragging) return;
  isDragging = false;

  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;
  const diffX = touchStartX - touchEndX;
  const diffY = touchStartY - touchEndY;

  if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) goNext();
    else goPrev();
  }
}, { passive: true });

// Mouse drag (for desktop testing)
let mouseStartX = 0;
let isMouseDragging = false;

viewport.addEventListener('mousedown', (e) => {
  if (isTransitioning) return;
  mouseStartX = e.clientX;
  isMouseDragging = true;
  e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
  if (!isMouseDragging) return;
});

document.addEventListener('mouseup', (e) => {
  if (!isMouseDragging) return;
  isMouseDragging = false;

  const diffX = mouseStartX - e.clientX;
  if (Math.abs(diffX) > 60) {
    if (diffX > 0) goNext();
    else goPrev();
  }
});

// Trackpad / Mouse Wheel Two-Finger Horizontal Swipe
viewport.addEventListener('wheel', (e) => {
  if (isTransitioning) return;

  // Check if horizontal movement is greater than vertical movement
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault(); // Prevents normal browser horizontal back/forward navigation behaviors

    wheelAccumulator += e.deltaX;

    // Trigger next/prev when accumulated gesture power passes 60 pixels
    if (wheelAccumulator > 60) {
      goNext();
      wheelAccumulator = 0;
    } else if (wheelAccumulator < -60) {
      goPrev();
      wheelAccumulator = 0;
    }
  }
}, { passive: false });

// Reset the wheel accumulator when mouse leaves or stops dragging
viewport.addEventListener('mouseleave', () => { wheelAccumulator = 0; });
document.addEventListener('mouseup', () => { wheelAccumulator = 0; });

// Click on side items to navigate
viewport.addEventListener('click', (e) => {
  const item = e.target.closest('.carousel-item');
  if (!item) return;
  const idx = parseInt(item.dataset.index, 10);
  if (idx !== currentIndex) goTo(idx);
});

// ──────────────────────────────────────────────
// INITIALIZE
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildCarousel();
});