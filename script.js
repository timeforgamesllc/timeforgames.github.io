const query = "pokemon"; // You can change this or make it dynamic later
const API_URL = `https://timeforgames-server.onrender.com/listings?q=${query}`;

async function loadListings() {
  const listingsDiv = document.getElementById("listings");
  listingsDiv.innerHTML = "<p>Loading listings...</p>";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    listingsDiv.innerHTML = ""; // clear loading

    if (!data.itemSummaries || data.itemSummaries.length === 0) {
      listingsDiv.innerHTML = "<p>No listings found.</p>";
      return;
    }

    data.itemSummaries.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <a href="${item.itemWebUrl}" target="_blank">
          <img src="${item.image?.imageUrl || ''}" alt="${item.title}" />
          <h2>${item.title}</h2>
          <p>💲${item.price?.value || 'N/A'} ${item.price?.currency || ''}</p>
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
