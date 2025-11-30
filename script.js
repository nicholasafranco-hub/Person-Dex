const form = document.getElementById('person-form');
const cardsContainer = document.getElementById('cards-container');
const clearAllBtn = document.getElementById('clear-all');

// Detail overlay elements
const detailOverlay = document.getElementById('detail-overlay');
const detailName = document.getElementById('detail-name');
const detailPhysical = document.getElementById('detail-physical');
const detailPersonality = document.getElementById('detail-personality');
const closeDetail = document.getElementById('close-detail');

// Load people from localStorage or start empty
let people = JSON.parse(localStorage.getItem('personDex')) || [];

// Render saved people on page load
people.forEach(person => addPersonCard(person));

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const photo = document.getElementById('photo').value;
    const physical = document.getElementById('physical').value;
    const personality = document.getElementById('personality').value;

    const person = { name, photo, physical, personality };
    people.push(person);

    // Save to localStorage
    localStorage.setItem('personDex', JSON.stringify(people));

    addPersonCard(person);

    form.reset();
});

// Create a clickable person card
function addPersonCard(person) {
    const card = document.createElement('div');
    card.classList.add('person-card');
    card.textContent = person.name;

    // Click to open detail overlay
    card.addEventListener('click', () => {
        detailName.textContent = person.name;
        detailPhysical.textContent = person.physical;
        detailPersonality.textContent = person.personality;
        detailOverlay.style.backgroundImage = `url(${person.photo})`;
        detailOverlay.classList.remove('hidden'); // Show overlay
    });

    cardsContainer.appendChild(card);
}

// Close overlay
closeDetail.addEventListener('click', () => {
    detailOverlay.classList.add('hidden'); // Hide overlay
});

// Clear all saved people
clearAllBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all people?")) {
        people = [];
        localStorage.removeItem('personDex');
        cardsContainer.innerHTML = '';
    }
});
