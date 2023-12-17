import { apiFetch } from "../API/apiFetch.mjs";

const API_BASE_URL = "https://api.noroff.dev/api/v1/";
const fullPostURL = "https://api.noroff.dev/api/v1/auction/listings";
const accessToken = localStorage.getItem("accessToken");

/**
 * Handles the creation of a new post listing, checking user authentication and collecting form data.
 *
 * @function
 * @returns {void}
 */
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

    if (!newListingName.value || !newListingBodyDesc.value || !newListingTags.value || !newEndsAtDate.value) {
        alert("Please fill in all the required fields.");
        return;
    }

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

/**
 * Posts a new listing to the specified URL using the provided data.
 *
 * @async
 * @function
 * @param {string} url - The URL where the listing will be posted.
 * @param {Object} data - The data representing the new listing.
 * @throws {Error} If there's an error during the listing creation or if the server responds with an error.
 * @returns {void}
 */
export async function postListing(url, data) {
    const result = await apiFetch(url, "post", data);
    const { id } = result;
    if (result.id) {
        window.location.replace("/listings.html");
    }
}

const createListingButton = document.getElementById("createListingBtn");

createListingButton.addEventListener("click", function () {
    handleCreatePost();
});




