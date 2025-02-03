document.getElementById('reportForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('add_item.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadItems();
    })
    .catch(error => console.error('Error:', error));
});

function loadItems() {
    fetch('get_items.php')
        .then(response => response.json())
        .then(data => {
            const itemsList = document.getElementById('itemsList');
            itemsList.innerHTML = '';

            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                itemDiv.innerHTML = `
                    <h3>${item.title} (${item.type})</h3>
                    <p>${item.description}</p>
                    <p><strong>Location:</strong> ${item.location}</p>
                    <p><strong>Contact Info:</strong> ${item.contact_info}</p>
                    <p><small>Reported on: ${new Date(item.date_reported).toLocaleString()}</small></p>
                `;
                itemsList.appendChild(itemDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Load items when the page loads
window.onload = loadItems;