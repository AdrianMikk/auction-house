import { fetchAllAuctions } from "../listing.mjs";

// Assume you have a form with inputs for bid amount and listing ID
const bidForm = document.getElementById('bidForm');
const bidAmountInput = document.getElementById('bidAmount');
const listingIdInput = document.getElementById('listingId');

bidForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get values from the form
    const bidAmount = bidAmountInput.value;
    const listingId = listingIdInput.value;

    // Validate input (you can add more validation as needed)
    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
        alert('Please enter a valid bid amount.');
        return;
    }

    // Make a POST request to your API endpoint
    fetch('https://api.noroff.dev/api/v1/auction/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // You may need to include an authorization header with the user's token
            // 'Authorization': 'Bearer ' + userToken,
        },
        body: JSON.stringify({
            listingId: listingId,
            bidAmount: bidAmount,
            // Include any other necessary data
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add bid');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful response (e.g., show a success message)
            console.log('Bid added successfully', data);
            alert('Bid added successfully');
        })
        .catch(error => {
            // Handle errors (e.g., show an error message)
            console.error('Error adding bid', error);
            alert('Error adding bid');
        });
});

// Assume you have a section in your HTML to display bids
const bidListContainer = document.getElementById('bidList');

// Function to fetch and display bids for a given listing
function getBidsForListing(listingId) {
    // Make a GET request to your API endpoint
    fetch(`https://api.noroff.dev/api/v1/auction/"${listingId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Include any necessary headers (e.g., authorization)
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch bids');
            }
            return response.json();
        })
        .then(bids => {
            // Display the bids in your HTML
            displayBids(bids);
        })
        .catch(error => {
            console.error('Error fetching bids', error);
            // Handle errors (e.g., show an error message)
            alert('Error fetching bids');
        });
}

// Function to display bids in the HTML
function displayBids(bids) {
    // Clear previous bids
    bidListContainer.innerHTML = '';

    // Iterate through the bids and append them to the HTML
    bids.forEach(bid => {
        const bidItem = document.createElement('li');
        bidItem.textContent = `Bid Amount: ${bid.bidAmount}, Bidder: ${bid.bidderName}`;
        bidListContainer.appendChild(bidItem);
    });
}

// Example usage: Call getBidsForListing with the listingId when needed
// For example, when a user clicks on a listing to view bids
const exampleListingId = '123'; // Replace with the actual listingId
getBidsForListing(exampleListingId);
