import { setToken } from "../API/login.mjs";

const base_url = "https://api.noroff.dev/api/v1/auction/profiles";
const avatar = "/adrian_mikkelsen/media";
const avatarButton = document.getElementById("avatarBtn");

const profile_url = "?_listings=true&_bids=true";
const url = base_url + avatar;
const token = localStorage.getItem("accessToken");
const creditsAmount = localStorage.getItem("userCredit");
document.querySelector("#userCredit").textContent = creditsAmount;
console.log(creditsAmount);

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
    fetchProfile();
});

export function fetchProfile() {
    const userName = document.getElementById("userName");
    const userCredit = document.getElementById("userCredit");
    const userAvatar = document.getElementById("avatarImage");
    const token = localStorage.getItem("accessToken");

}






