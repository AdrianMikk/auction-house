import { fetchAllAuctions } from "../listing.mjs";
import { apiFetch } from "../API/apiFetch.mjs";

const API_BASE_URL = "https://api.noroff.dev/api/v1/";
const fullPostURL = "https://api.noroff.dev/api/v1/auction/listings";
const accessToken = localStorage.getItem("accessToken");

export function handleCreatePost() {

    const newListingName = document.getElementById("itemName");
    const newListingBodyDesc = document.getElementById("itemDescription");
    const newListingTags = document.getElementById("itemTags");
    const newListingImage = document.getElementById("newPostImageInput");
    const newEndsAtDate = document.getElementById("endsAt");

    const title = newListingName.value;
    const body = newListingBodyDesc.value;
    const tags = newListingTags.value;
    const media = newListingImage.value;
    const endsAt = newEndsAtDate.value;

    const newPostData = {
        title,
        body,
        tags,
        media,
        endsAt,
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newPostData),
    };

    // createNewPost(options);
    console.log(newPostData);
}

async function postListing(url, data) {
    try {
        const postData = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await apiFetch(url, postData);
        const json = await response.json();

        if (!response.ok) {
            console.log("Added new listing");
        } else {
            throw new Error(json.error);
        }

        return json;
    } catch (error) {
        console.error(error); {
            console.log(error.name + " " + error.message);
        }
    }
    postListing(url, handleCreatePost);
}

const createListingButton = document.getElementById("createListingBtn");

createListingButton.addEventListener("click", function () {
    handleCreatePost();
});

// const listingDeadlineFormat = listingDeadline.toLocaleDateString(
//     "no-NO",
//     {
//         day: "2-digit",
//         month: "2-digit",
//         year: "2-digit",
//         hour: "2-digit",
//         minute: "2-digit",
//     }
// );
