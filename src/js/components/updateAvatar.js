const userId = "123";
const token = "123";

const API_BASE_URL = "https://api.noroff.dev/";
const API_USER_PATH = "auction/profiles/<name>/media";
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

avatarButton.addEventListener("click", () => {
    const avatarButton = document.getElementById("avatarBtn");
    fetch(`${API_BASE_URL}${API_USER_PATH}${userId}/avatar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            avatar: avatarButton.value,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update avatar');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful response (e.g., show a success message)
            console.log('Avatar updated successfully', data);
            alert('Avatar updated successfully');
        })
        .catch(error => {
            // Handle errors (e.g., show an error message)
            console.error('Error updating avatar', error);
            alert('Error updating avatar');
        });

});