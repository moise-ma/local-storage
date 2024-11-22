// Selectors
const cardTitleInput = document.getElementById("card-title");
const cardDescriptionInput = document.getElementById("card-description");
const cardsContainer = document.getElementById("cards-container");

// Load existing cards from local storage on page load
document.addEventListener("DOMContentLoaded", loadCards);

// Add a new card
function addCard() {
    const title = cardTitleInput.value.trim();
    const description = cardDescriptionInput.value.trim();

    if (!title || !description) {
        alert("Both title and description are required!");
        return;
    }

    const card = { id: Date.now(), title, description };

    // Save card to local storage
    saveCardToLocalStorage(card);

    // Add card to the UI
    renderCard(card);

    // Clear inputs
    cardTitleInput.value = "";
    cardDescriptionInput.value = "";
}

// Save a card to local storage in JSON format
function saveCardToLocalStorage(card) {
    const cards = getCardsFromLocalStorage();
    cards.push(card);
    localStorage.setItem("cards", JSON.stringify(cards));
}

// Retrieve all cards from local storage
function getCardsFromLocalStorage() {
    const cards = localStorage.getItem("cards");
    return cards ? JSON.parse(cards) : [];
}

// Load cards from local storage and display them
function loadCards() {
    const cards = getCardsFromLocalStorage();
    cards.forEach(renderCard);
}

// Render a single card on the UI
function renderCard(card) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    cardElement.innerHTML = `
        <h3>${card.title}</h3>
        <p>${card.description}</p>
        <button onclick="deleteCard(${card.id})">Delete</button>
    `;

    cardsContainer.appendChild(cardElement);
}

// Delete a card by ID
function deleteCard(cardId) {
    // Remove from local storage
    let cards = getCardsFromLocalStorage();
    cards = cards.filter(card => card.id !== cardId);
    localStorage.setItem("cards", JSON.stringify(cards));

    // Reload cards in the UI
    loadCardsToUI();
}

// Reload cards in the UI
function loadCardsToUI() {
    cardsContainer.innerHTML = "";
    loadCards();
}