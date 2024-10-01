// Attach an event listener to the input field to detect the "Enter" key press
document.getElementById('password-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
});

// Function to check the password and redirect if correct
async function checkPassword() {
    const userPassword = document.getElementById('password-input').value;
    if (userPassword) {
        // Hash the entered password
        const hashedPassword = await hashPassword(userPassword);

        checkWebsite(hashedPassword + ".html")
    }
}

// Function to hash the password using SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function checkWebsite(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' }); // Send a HEAD request
        if (response.ok) {
            // If the response is OK, redirect to the website
            window.location.href = url;
        } else {
            // If the response is not OK, raise an error
            throw new Error(`Website not found: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        // Handle any errors (e.g., network issues, CORS, etc.)
        console.error('Error:', error.message);
        alert('Error: The website does not exist or cannot be reached.');
    }
}