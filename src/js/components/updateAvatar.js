const userId = "123";
const token = "123";

const API_BASE_URL = "https://api.noroff.dev/";
const API_USER_PATH = "user/";
const API_USER_CREDIT_PATH = "credit";

fetch(`${API_BASE_URL}user/${userId}/credit`)

    .then(response => response.json())
    .then(data => {
        // Assuming the API response includes a "credit" property
        const userCredit = data.credit;

        // Display the user's credit on the webpage
        userCreditDisplay.innerHTML = `<p>Your total credit: $${userCredit}</p>`;
    })
    .catch(error => {
        console.error('Error fetching user credit:', error);
        userCreditDisplay.innerHTML = '<p>Error fetching user credit. Please try again later.</p>';
    });

button.addEventListener("click", () => {
    const avatarButton = document.getElementById("avatarBtn");
    const button = document.getElementById("button");


});