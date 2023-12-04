import { search } from "./components/search.mjs";
import { displayFilteredPosts } from "./components/filter.mjs";
import { createNewElement } from "./components/filter.mjs";
import { filterPost } from "./components/filter.mjs";
// import { addEditPostListeners } from "./components/editPost.js";
import { addViewPostListeners } from "./components/viewPost.js";

const fullPostURL = "https://api.noroff.dev/api/v1/auction/listings";
const postFeedContainer = document.getElementById("postFeed");
const searchInput = document.getElementById("search");

// Modal
const postModal = document.getElementById("postModal");

searchInput.addEventListener("input", search);

const API_BASE_URL = "https://api.noroff.dev/api/v1/auction/";
const listing_endpoint = "listings";

export async function fetchAllAuctions() {
    const allAuctionsUrl = `${API_BASE_URL}${listing_endpoint}`;

    try {
        const fetchAllAuctionsOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(allAuctionsUrl, fetchAllAuctionsOptions);

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

async function init() {
    const allAuctions = await fetchAllAuctions();

    allAuctions.forEach((auction) => {
        createPostCard(auction);
    });

    searchInput.addEventListener("input", () => {
        const searchResult = search(allAuctions);

        clearPostFeed();

        if (!searchResult || searchResult.length === 0) {
            console.log("handle error...");
            return;
        }

        searchResult.forEach((post) => {
            createPostCard(post);
        });
    });
}

function createPostCard(post) {
    if (!postFeedContainer) {
        console.error("postFeedContainer not found in the document.");
        return;
    }

    const viewModalButton = document.createElement("button");
    viewModalButton.classList.add("btn", "btn-primary", "m-auto", "view-post");
    viewModalButton.textContent = "View Post";
    viewModalButton.setAttribute("data-bs-toggle", "modal");
    viewModalButton.setAttribute("data-bs-target", "#postModal");
    viewModalButton.setAttribute("data-post-id", post.id);

    viewModalButton.addEventListener("click", () => {
        const modalTitle = document.getElementById("modalTitle");
        const modalBody = document.getElementById("modalBody");
        const modalImage = document.getElementById("modalImage");
        const postIdElement = document.getElementById("postId");

        modalTitle.textContent = post.title;
        modalBody.textContent = post.description;
        modalImage.src = post.media;
        postIdElement.textContent = "Post ID: " + post.id;

        postModal.style.display = "block";
    });

    const card = document.createElement("div");
    card.classList.add("card");

    const titleElement = document.createElement("h2");
    titleElement.textContent = post.title || "No Title";

    const bodyElement = document.createElement("p");
    bodyElement.textContent = post.description || "No content";

    card.classList.add("col-12", "col-md-6", "col-lg-4", "mb-4");
    const imageUrl = post.media || "https://via.placeholder.com/300";
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = post.title || "Image Alt Text";
    image.classList.add("card-img-top");

    card.appendChild(image);
    card.appendChild(titleElement);
    card.appendChild(viewModalButton);
    card.appendChild(bodyElement);

    postFeedContainer.appendChild(card);
}

function clearPostFeed() {
    while (postFeedContainer.firstChild) {
        postFeedContainer.removeChild(postFeedContainer.firstChild);
    }
}

createNewElement();
// displayFilteredPosts();
addViewPostListeners();
// addEditPostListeners();
// addDeletePostListeners();
filterPost();
init();






