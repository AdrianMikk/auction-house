const base_url = "https://api.noroff.dev/api/v1/auction/profiles";
const avatar = "/adrian_mikkelsen/media"
const username = "/adrian_mikkelsen";
const userName = document.getElementById("name");
const avatarButton = document.getElementById("avatarBtn");

const profile_url = "?_listings=true&_bids=true";
// const url = base_url + username + profile_url;
const url = base_url + avatar;
const token = localStorage.getItem("accessToken");

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
    console.log(newAvatar);
    await updateAvatar();
});


