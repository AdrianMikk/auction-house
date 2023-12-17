const base_url = "https://api.noroff.dev/api/v1/auction/profiles";
const avatar = "/adrian_mikkelsen/media";
const avatarButton = document.getElementById("avatarBtn");

const profile_url = "?_listings=true&_bids=true";
const url = base_url + avatar;
const token = localStorage.getItem("accessToken");
const creditsAmount = localStorage.getItem("userCredit");

document.querySelector("#userCredit").textContent = creditsAmount;

/**
 * Updates the user interface (UI) with a new avatar image and stores the choice in local storage.
 *
 * @function
 * @param {string} newAvatar - The URL or path of the new avatar image.
 * @returns {void}
 */
function updateAvatarUI(newAvatar) {
    const avatarImage = document.getElementById("avatarImage");
    if (avatarImage) {
        avatarImage.src = newAvatar;
        localStorage.setItem("chosenAvatar", newAvatar);
    }
}

/**
 * Updates the user's avatar on the server and logs the updated profile information.
 *
 * @async
 * @function
 * @param {string} newAvatar - The URL or path of the new avatar image.
 * @throws {Error} If there's an error during the avatar update or if the server responds with an error.
 * @returns {void}
 */
export async function updateAvatar(newAvatar) {
    const updateUrl = base_url + avatar;
    try {
        const response = await fetch(updateUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                avatar: newAvatar,
            }),
        });

        const updatedProfile = await response.json();
    } catch (error) {
        console.error("Error updating avatar");
        throw error;
    }
}

avatarButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    if (!token) {
        alert("Please log in to update your avatar.");
        return;
    }

    const newAvatar = document.getElementById("avatarInput").value;

    if (newAvatar) {
        try {
            await updateAvatar(newAvatar);
            updateAvatarUI(newAvatar);
        } catch (error) {
            console.error("Failed to update avatar:", error);
        }
    } else {
        alert("Please enter a new avatar URL.");
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const chosenAvatar = localStorage.getItem("chosenAvatar");

    if (chosenAvatar) {
        updateAvatarUI(chosenAvatar);
    }

    if (token) {
        fetchProfile();
    }
});

/**
 * Fetches user profile information from local storage and updates the UI elements accordingly.
 *
 * @function
 * @returns {void}
 */
export function fetchProfile() {

    const userNameElement = document.getElementById("userName");
    const userCreditElement = document.getElementById("userCredit");
    const userAvatarElement = document.getElementById("avatarImage");

    const userName = localStorage.getItem("name");
    const userCredit = localStorage.getItem("userCredit");
    const userAvatar = localStorage.getItem("chosenAvatar");

    if (userNameElement) {
        userNameElement.textContent = userName || "Guest";
    }

    if (userCreditElement) {
        userCreditElement.textContent = userCredit || "0";
    }

    if (userAvatarElement) {
        userAvatarElement.src = userAvatar || "default-avatar.jpg";
    }
}









