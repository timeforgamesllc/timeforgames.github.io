const API_URL = "https://timeforgames-server.onrender.com/listings?q=pokemon";

async function loadListings() {
  const listingsDiv = document.getElementById("listings");
  const loadingDiv = document.getElementById("loading");

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    loadingDiv.style.display = "none";

    if (!data.itemSummaries) {
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
    loadingDiv.innerText = "Error loading listings.";
    console.error(err);
  }
}

loadListings();
