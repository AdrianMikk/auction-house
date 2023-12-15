const base_url = "https://api.noroff.dev/api/v1/auction/profiles";
const avatar = "/adrian_mikkelsen/media";
const avatarButton = document.getElementById("avatarBtn");

const profile_url = "?_listings=true&_bids=true";
const url = base_url + avatar;
const token = localStorage.getItem("accessToken");
const creditsAmount = localStorage.getItem("userCredit");

document.querySelector("#userCredit").textContent = creditsAmount;

function updateAvatarUI(newAvatar) {
    const avatarImage = document.getElementById("avatarImage");
    if (avatarImage) {
        avatarImage.src = newAvatar;
        localStorage.setItem("chosenAvatar", newAvatar);
    }
}

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
        console.log("Avatar updated successfully:", updatedProfile);
    } catch (error) {
        console.error("Error updating avatar");
        throw error;
    }
}

avatarButton.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!token) {
        console.log("Please log in to update your avatar.");
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
        console.log("Please enter a new avatar URL.");
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

export function fetchProfile() {
    console.log("Fetching profile...");

    const userNameElement = document.getElementById("userName");
    const userCreditElement = document.getElementById("userCredit");
    const userAvatarElement = document.getElementById("avatarImage");

    const userName = localStorage.getItem("name");
    const userCredit = localStorage.getItem("userCredit");
    const userAvatar = localStorage.getItem("chosenAvatar");

    console.log("userName:", userName);
    console.log("userCredit:", userCredit);
    console.log("userAvatar:", userAvatar);

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









