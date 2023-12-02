import { search } from "./components/search.mjs";
import { displayFilteredPosts } from "./components/filter.mjs";
import { createNewElement } from "./components/filter.mjs";
import { filterPost } from "./components/filter.mjs";


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

    const card = document.createElement("div");
    card.classList.add("card");

    const titleElement = document.createElement("h2");
    titleElement.textContent = post.title || "No Title";

    const bodyElement = document.createElement("p");
    bodyElement.textContent = post.body || "No content";

    card.classList.add("col-12", "col-md-6", "col-lg-4", "mb-4");
    const imageUrl = post.media || "https://via.placeholder.com/300";
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = post.title || "Image Alt Text";
    image.classList.add("card-img-top");

    card.appendChild(image);
    card.appendChild(titleElement);
    card.appendChild(bodyElement);

    postFeedContainer.appendChild(card);
}

function clearPostFeed() {
    while (postFeedContainer.firstChild) {
        postFeedContainer.removeChild(postFeedContainer.firstChild);
    }
}

/**
 * Add click event listeners to "View Post" buttons.
 * When a button is clicked, display the post content or handle accordingly.
 */
function addViewPostListeners(data) {
    const viewPostButtons = document.querySelectorAll(".view-post");
    viewPostButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const postId = e.target.getAttribute("data-post-id");
            const post = data.find((post) => post.id === parseInt(postId));
            if (post) {
                const modalTitle = document.getElementById("modalTitle");
                const modalBody = document.getElementById("modalBody");
                const modalImage = document.getElementById("modalImage");
                const postIdElement = document.getElementById("postId");
                postIdElement.textContent = "Post ID: " + postId;
                modalTitle.textContent = post.title;
                modalBody.textContent = post.body;
                modalImage.src = post.media;
                const postModal = document.getElementById("postModal");
                postModal.style.display = "block";
            } else {
                alert("Post not found.");
            }
        });
    });
}

const closeModalButton = document.getElementById("closeModalButton");
closeModalButton.addEventListener("click", () => {
    const postModal = document.getElementById("postModal");
    postModal.style.display = "none";
});


createNewElement();
// displayFilteredPosts();
addViewPostListeners();
filterPost();
init();






