import { search } from "./components/search.mjs";
// import { displayFilteredPosts } from "./components/filter.mjs";
// import { createNewElement } from "./components/filter.mjs";
import { filterPost } from "./components/filter.mjs";
import { addViewPostListeners } from "./components/viewPost.js";
// import { handleCreatePost } from "./components/createListing.mjs";
// import { createNewPost } from "./components/createListing.mjs";
// import { addEditPostListeners } from "./components/editPost.js";
// import { addDeletePostListeners } from "./components/deletePost.js";


const fullPostURL = "https://api.noroff.dev/api/v1/auction/listings";
const postFeedContainer = document.getElementById("postFeed");
const searchInput = document.getElementById("search");

const API_BASE_URL = "https://api.noroff.dev/api/v1/auction/";
const listing_endpoint = "listings";

// const postFeedContainer = document.getElementById("postFeed");
// const searchInput = document.getElementById("search");

searchInput.addEventListener("input", search);

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
    try {
        const allAuctions = await fetchAllAuctions();

        const sortedPosts = allAuctions.sort((a, b) => new Date(b.created) - new Date(a.created));

        sortedPosts.forEach((auction) => {
            createPostCard(auction);
        });

        searchInput.addEventListener("input", () => {
            const searchResult = search(sortedPosts);

            clearPostFeed();

            if (!searchResult || searchResult.length === 0) {
                console.log("handle error...");
                return;
            }

            searchResult.forEach((post) => {
                createPostCard(post);
            });
        });
    } catch (error) {
        console.error("Error:", error);
    }
}



// function createPostCard(post) {
//     // Create post card elements (similar to your original createPostCard function)
//     // Use post data to populate card elements
//     // Append card to postFeedContainer
// }

// function search(posts) {
//     // Implement search functionality (if needed)
//     // Return filtered posts based on search criteria
// }

function clearPostFeed() {
    while (postFeedContainer.firstChild) {
        postFeedContainer.removeChild(postFeedContainer.firstChild);
    }
}

init();

function createPostCard(post) {
    if (!postFeedContainer) {
        console.error("postFeedContainer not found in the document.");
        return;
    }

    // View Post Button
    const viewModalButton = createButton("View Post", "modalTitle", "modalBody", "modalImage", "postId", post);

    // Bid Now Button
    const bidNowButton = createButton("Bid Now", "bidModalTitle", "bidModalBody", "bidModalImage", "bidPostId", post);

    const card = document.createElement("div");
    card.classList.add("card", "mb-4");

    const titleElement = document.createElement("h2");
    titleElement.textContent = post.title || "No Title";
    titleElement.classList.add("mb-2");

    const bodyElement = document.createElement("p");
    bodyElement.textContent = post.description || "No content";
    bodyElement.classList.add("mb-3");

    card.classList.add("col-12", "col-md-6", "col-lg-4");
    const imageUrl = post.media || "https://via.placeholder.com/300";
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = post.title || "Image Alt Text";
    image.classList.add("card-img-top", "mb-3");

    card.appendChild(image);
    card.appendChild(titleElement);
    card.appendChild(viewModalButton);
    card.appendChild(bidNowButton);
    card.appendChild(bodyElement);

    postFeedContainer.appendChild(card);
}

function createButton(text, modalTitleId, modalBodyId, modalImageId, postIdId, post) {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary", "m-auto", "view-post", "mb-3");
    button.textContent = text;
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#postModal");

    button.addEventListener("click", () => {
        const modalTitle = document.getElementById(modalTitleId);
        const modalBody = document.getElementById(modalBodyId);
        const modalImage = document.getElementById(modalImageId);
        const postIdElement = document.getElementById(postIdId);

        modalTitle.textContent = post.title;
        modalBody.textContent = post.description;
        modalImage.src = post.media;
        postIdElement.textContent = "Post ID: " + post.id;


        postModal.style.display = "block";
    });

    return button;
}


// function clearPostFeed() {
//     while (postFeedContainer.firstChild) {
//         postFeedContainer.removeChild(postFeedContainer.firstChild);
//     }
// }

// createNewElement();
// createNewPost();
// handleCreatePost();
// displayFilteredPosts();
addViewPostListeners();
// addEditPostListeners();
// addDeletePostListeners();
filterPost();





