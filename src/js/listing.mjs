// import { apiFetch } from "./API/apiFetch.mjs";
// import { createNewElement } from "./utils/createNewElement.mjs";
// import { createNewPost } from "./components/createPost.mjs";
// import { addEditPostListeners } from "./components/editposts.js";
// import { addDeletePostListeners } from "./components/deletepost.js";
import { search } from "./components/search.mjs";
// import { displayPosts } from "./fetchAndDisplay.js";s

const fullPostURL = "https://api.noroff.dev/api/v1/auction/listings";
const postFeedContainer = document.getElementById("postFeed");
const searchInput = document.getElementById("search");

// Modal
const postModal = document.getElementById("postModal");

searchInput.addEventListener("input", search);

const API_BASE_URL = "https://api.noroff.dev/api/v1/auction/";
const listing_endpoint = "listings";

export async function fetchAllAuctions(url) {
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
                postModal.style.display = "block";
            } else {
                alert("Post not found.");
            }
        });
    });
}

const closeModalButton = document.getElementById("closeModalButton");
closeModalButton.addEventListener("click", () => {
    postModal.style.display = "none";
});

/**
 * Filters posts by date based on user selection.
 *
 * This function attaches event listeners to two HTML elements, typically used for
 * filtering posts by date: "Newest Posts" and "Oldest Posts" buttons. When a user clicks
 * on one of these buttons, the function either fetches and displays posts or sorts the
 * existing posts by their creation date and displays the filtered results.
 */
async function filterPost() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const filterNewPost = document.getElementById("newestPost");
    const filterOldPost = document.getElementById("oldestPost");

    filterNewPost.addEventListener("click", (e) => {
        fetchAndDisplayPosts();
    });

    filterOldPost.addEventListener("click", (e) => {
        const postsDesc = data.sort(
            (a, b) => new Date(a.created) - new Date(b.created)
        );
        displayFilteredPosts(postsDesc);
    });
}

filterPost();

addViewPostListeners();

init();




