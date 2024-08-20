document.getElementById('message').textContent = 'Hello, this site is powered by JavaScript!';

function navigateToPage(page) {
    window.location.href = page;
}

function navigateToPage(url) {
    window.location.href = url;
}

// Function to update square color based on response
function updateSquareColour() {
    fetch('/.netlify/functions/getStatus')
        .then(response => response.json())
        .then(data => {
            const square = document.getElementById('colorSquare');
            if (data.status === 'green') {
                square.style.backgroundColor = 'green'; // Change color to green
            } else {
                square.style.backgroundColor = 'red'; // Default color
            }
        })
        .catch(error => console.error('Error:', error));
}

// Call updateSquareColor every second
//setInterval(updateSquareColour, 10000);
