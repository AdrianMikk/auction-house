import { apiFetch } from "../API/apiFetch.mjs";

const API_BASE_URL = "https://api.noroff.dev/api/v1/";
const fullPostURL = "https://api.noroff.dev/api/v1/auction/listings";
const accessToken = localStorage.getItem("accessToken");

export function handleCreatePost() {
    if (!accessToken) {
        alert("Please log in to create a listing.");
        return;
    }

    const newListingName = document.getElementById("itemName");
    const newListingBodyDesc = document.getElementById("itemDescription");
    const newListingTags = document.getElementById("itemTags");
    const newListingImage = document.getElementById("newPostImageInput");
    const newEndsAtDate = document.getElementById("endsAt");

    const title = newListingName.value;
    const description = newListingBodyDesc.value;
    const tags = newListingTags.value;
    const media = newListingImage.value;
    const endsAt = newEndsAtDate.value;

    const newPostData = {
        title: title,
        description: description,
        tags: [tags],
        media: [media],
        endsAt: endsAt
    };

    postListing(fullPostURL, newPostData);
}

export async function postListing(url, data) {
    try {
        const response = await apiFetch(url, "post", data);
        console.log(response);
        if (response.ok) {
            console.log("Added new listing");
            // Optionally, you can redirect the user after successfully creating a listing
            // window.location.href = "listings.html";
        }
    } catch (error) {
        console.log(error.name + " " + error.message);
    }
}

const createListingButton = document.getElementById("createListingBtn");

createListingButton.addEventListener("click", function () {
    handleCreatePost();
});

