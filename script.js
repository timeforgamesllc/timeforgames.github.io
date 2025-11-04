// Smooth background color transition
const sections = document.querySelectorAll(".section");
const colors = ["#1a1a1a", "#2a2a2a", "#3a3a3a", "#4a4a4a"];

window.addEventListener("scroll", () => {
  let index = sections.length - 1;
  sections.forEach((section, i) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2) {
      index = i;
    }
  });
  document.body.style.backgroundColor = colors[index];
});

// Load listings from JSON file
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

    // Smaller items
    const gridDiv = document.createElement("div");
    gridDiv.className = "grid";

    data.slice(1,4).forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <a href="${item.url}" target="_blank">
          <img src="${item.image}" alt="${item.title}" />
          <div class="overlay-title">${item.title}</div>
          <div class="price">💲${item.price}</div>
        </a>
      `;
      gridDiv.appendChild(card);
    });

    listingsDiv.appendChild(gridDiv);

  } catch (err) {
    listingsDiv.innerHTML = "<p>Error loading listings.</p>";
    console.error(err);
  }
}

loadListings();
