const profile_url = "?_listings=true&_bids=true";
// const url = base_url + username + profile_url;
const url = base_url + avatar;
const token = localStorage.getItem("accessToken");

export async function getProfile() {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        return null;
    }

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const json = await response.json();
        const myProfile = {
            avatar: json.avatar,
            username: json.name,
            email: json.email,
            listings: json._count,
            allListings: json.listings,
            wins: json.wins,
            credit: json.credits,
        };
        console.log(myProfile);
        return myProfile;
    } catch (error) {
        console.error("Error fetching profile");
        throw error;
    }
}

