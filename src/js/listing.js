// import { apiFetch } from "./API/apiFetch.mjs";
// import { createNewElement } from "./utils/createNewElement.mjs";
// import { createNewPost } from "./components/createPost.mjs";
// import { addEditPostListeners } from "./components/editposts.js";
// import { addDeletePostListeners } from "./components/deletepost.js";
// import { search } from "./components/search.mjs";
// import { displayPosts } from "./fetchAndDisplay.js";

const fullPostURL = "https://api.noroff.dev/api/v1/auction/listings";
const postFeedContainer = document.getElementById("postFeed");
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", search);

const API_BASE_URL = "https://api.noroff.dev/api/v1/auction/";
const listing_endpoint = "listings";

async function fetchAllAuctions(url) {
    try {
        const fetchAllAuctionsOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, fetchAllAuctionsOptions);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

function search(event) {
}

async function init() {
    try {
        const allAuctions = `${API_BASE_URL}${listing_endpoint}`;
        const json = await fetchAllAuctions(allAuctions);

        console.log("All Auctions:", json);

        json.forEach((post) => {
            createPostCard(post);
        });
    } catch (error) {
        console.error("Error fetching all auctions:", error.message);
    }
}

function createPostCard(post) {

    if (!postFeedContainer) {
        console.error("postFeedContainer not found in the document.");
        return;
    }

    const card = document.createElement("div");
    card.classList.add("card");

    const titleElement = document.createElement("h2");
    titleElement.textContent = post.title || "No Title";

    const bodyElement = document.createElement("p");
    bodyElement.textContent = post.body || "No content";

    card.appendChild(titleElement);
    card.appendChild(bodyElement);

    postFeedContainer.appendChild(card);
}

const examplePost = {
    title: "Sample Title",
    body: "This is the content of the post.",
};

createPostCard(examplePost);

init();



