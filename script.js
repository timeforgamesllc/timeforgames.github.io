// Path to your JSON file
const API_URL = "./listings.json";

async function loadListings() {
  const listingsDiv = document.getElementById("listings");
  listingsDiv.innerHTML = "<p>Loading listings...</p>";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    listingsDiv.innerHTML = "";

    if (!data.itemSummaries || data.itemSummaries.length === 0) {
      listingsDiv.innerHTML = "<p>No listings found.</p>";
      return;
    }

    // Take the first 6 listings for 2x3 grid
    const listingsToShow = data.itemSummaries.slice(0, 6);

    listingsToShow.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <a href="${item.link}" target="_blank">
          <img src="${item.image}" alt="${item.title}" />
          <h2>${item.title}</h2>
          <p>💲${item.price}</p>
        </a>
      `;
      listingsDiv.appendChild(card);
    });
  } catch (err) {
    listingsDiv.innerHTML = "<p>Error loading listings.</p>";
    console.error(err);
  }
}

// Smooth background color scrolling
const sections = document.querySelectorAll('.section');
const sectionColors = {
  hero: '#000000',
  about: '#1a1a1a',
  ebay: '#2a2a2a',
  socials: '#333333'
};

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + window.innerHeight / 2;

  let currentSectionId = sections[0].id;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.id;
    }
  });

  document.body.style.backgroundColor = sectionColors[currentSectionId];
});

// Load listings on page load
loadListings();
