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

    // Take the first 6 listings
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

// Load listings on page load
loadListings();
