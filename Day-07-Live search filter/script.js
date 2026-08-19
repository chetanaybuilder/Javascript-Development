// Get the search elements from the page
const searchInput = document.getElementById('searchInput');
const btn = document.getElementById('btn');
const listContainer = document.getElementById('listcontainer');

// Sample list used for live filtering
const items = [
    "Apple",
    "Banana",
    "Orange",
    "Grapes",
    "Mango"
];

// Filter and display matching results
btn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    listContainer.innerHTML = '';

    const filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm));

    filteredItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listContainer.appendChild(li);
    });
});