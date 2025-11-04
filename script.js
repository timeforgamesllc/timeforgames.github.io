async function loadListings() {
  const featuredDiv = document.getElementById("featured");
  const listingsDiv = document.getElementById("listings");
  const loadingDiv = document.getElementById("loading");

  try {
    const res = await fetch("listings.json");
    const data = await res.json();

    loadingDiv.style.display = "none";

    if (!data || data.length === 0) {
      listingsDiv.innerHTML = "<p>No listings found.</p>";
      return;
    }

    // Featured item (first)
    const featured = data[0];
    featuredDiv.innerHTML = `
      <a href="${featured.url}" target="_blank">
        <img src="${featured.image}" alt="${featured.title}">
        <h2>${featured.title}</h2>
        <p>💲${featured.price}</p>
      </a>
    `;

    // Next three items
    const smallItems = data.slice(1, 4);
    smallItems.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <a href="${item.url}" target="_blank">
          <img src="${item.image}" alt="${item.title}" />
          <h2>${item.title}</h2>
          <p>💲${item.price}</p>
        </a>
      `;
      listingsDiv.appendChild(card);
    });
  } catch (err) {
    loadingDiv.innerText = "Error loading listings.";
    console.error(err);
  }
}

// Background color scroll effect
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section");
  let scrollPos = window.scrollY + window.innerHeight / 2;

  sections.forEach(sec => {
    if (scrollPos > sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      document.body.setAttribute("data-section", sec.id);
    }
  });
});

loadListings();
