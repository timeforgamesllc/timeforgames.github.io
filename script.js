// ===== Smooth background blending between sections =====
const sections = document.querySelectorAll(".section");
const sectionColors = ["#1a1a1a", "#2a2a2a", "#3a3a3a", "#4a4a4a"]; // Colors for each section

function updateBackground() {
  const scrollTop = window.scrollY + window.innerHeight / 2; // center of viewport

  for (let i = 0; i < sections.length; i++) {
    const current = sections[i];
    const next = sections[i + 1];

    const currentTop = current.offsetTop;
    const nextTop = next ? next.offsetTop : currentTop + current.offsetHeight;

    if (scrollTop >= currentTop && scrollTop < nextTop) {
      const percent = (scrollTop - currentTop) / (nextTop - currentTop);
      const startColor = hexToRgb(sectionColors[i]);
      const endColor = next ? hexToRgb(sectionColors[i + 1]) : startColor;

      const blended = startColor.map((c, idx) =>
        Math.round(c + percent * (endColor[idx] - c))
      );

      document.body.style.backgroundColor = `rgb(${blended.join(",")})`;
      break;
    }
  }
}

// Helper: convert hex to [r,g,b]
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  return [
    parseInt(hex.substring(0,2),16),
    parseInt(hex.substring(2,4),16),
    parseInt(hex.substring(4,6),16)
  ];
}

// Update background on scroll and load
window.addEventListener("scroll", updateBackground);
window.addEventListener("load", updateBackground);

// ===== Load listings from local JSON =====
async function loadListings() {
  const listingsDiv = document.getElementById("listings");

  try {
    const res = await fetch("listings.json"); // your local JSON file
    const data = await res.json();

    if (!data || data.length === 0) {
      listingsDiv.innerHTML = "<p>No listings found.</p>";
      return;
    }

    // Featured item
    const featured = data[0];
    const featuredDiv = document.createElement("div");
    featuredDiv.className = "featured-item";
    featuredDiv.innerHTML = `
      <a href="${featured.url}" target="_blank">
        <img src="${featured.image}" alt="${featured.title}" />
        <div class="overlay-title">${featured.title}</div>
        <div class="price">💲${featured.price}</div>
      </a>
    `;
    listingsDiv.appendChild(featuredDiv);

    // Smaller items grid
    const gridDiv = document.createElement("div");
    gridDiv.className = "grid";

    data.slice(1,4).forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <a href="${item.url}" target="_blank">
          <img src="${item.image}" alt="${item.title}" />
          <div class="overlay-title">${item.title}</div>
          <div class="price">💲${i
