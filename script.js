const API_URL = "https://timeforgames-server.onrender.com/listings";

async function loadListings() {
  const listingsDiv = document.getElementById("listings");
  listingsDiv.innerHTML = "<p>Loading listings...</p>";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    listingsDiv.innerHTML = ""; // Clear loading

    if (!data.itemSummaries || data.itemSummaries.length === 0) {
      listingsDiv.innerHTML = "<p>No listings found.</p>";
      return;
    }

    data.itemSummaries.forEach(item => {
      // Extract first image URL from the description HTML
      const imgMatch = item.description.match(/<img.*?src="(.*?)"/);
      const imageUrl = imgMatch ? imgMatch[1] : "https://via.placeholder.com/300x200.png?text=No+Image";

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <a href="${item.link}" target="_blank">
          <img src="${imageUrl}" alt="${item.title}" />
          <h2>${item.title}</h2>
        </a>
      `;
      listingsDiv.appendChild(card);
    });
  } catch (err) {
    listingsDiv.innerHTML = "<p>Error loading listings.</p>";
    console.error(err);
  }
}

loadListings();
