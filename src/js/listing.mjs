import { search } from "./components/search.mjs";
// import { createNewElement } from "./components/filter.mjs";
import { filterPost } from "./components/filter.mjs";
import { addViewPostListeners } from "./components/viewPost.js";
import { addDeletePostListeners } from "./components/deletepost.js";

const base_url = "https://api.noroff.dev/api/v1/auction/profiles";
const fullPostURL = "https://api.noroff.dev/api/v1/auction/listings";
const bidUrl = fullPostURL + "adrian_mikkelsen/bids";
const postFeedContainer = document.getElementById("postFeed");
const searchInput = document.getElementById("search");

const API_BASE_URL = "https://api.noroff.dev/api/v1/auction/";
const listing_endpoint = "listings";

const bidBtn = document.getElementById("bidBtn");

searchInput.addEventListener("input", search);

export async function fetchAllAuctions() {
    const allAuctionsUrl = `${API_BASE_URL}${listing_endpoint}?sort=created`;

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

function clearPostFeed() {
    while (postFeedContainer.firstChild) {
        postFeedContainer.removeChild(postFeedContainer.firstChild);
    }
}

init();

function createPostCard(post, newId) {
    if (!postFeedContainer) {
        console.error("postFeedContainer not found in the document.");
        return;
    }

    // Tags 
    const tags = post.tags;
    const tagContainer = document.createElement("div");
    tagContainer.classList.add("tag-container", "mb-3");
    tagContainer.textContent = "Tags: " + (tags ? tags.join(", ") : "No tags");

    // Deadline / endsAt 
    const endsAt = post.endsAt;
    const endsAtContainer = document.createElement("div");
    endsAtContainer.classList.add("endsAt-container", "mb-3");
    endsAtContainer.textContent = "Deadline: " + (endsAt ? new Date(endsAt).toLocaleString() : "No deadline");

    const card = document.createElement("div");
    card.classList.add("card", "mb-4", "col-12", "col-md-6", "col-lg-4");

    // ID
    const idElement = document.createElement("p");
    idElement.textContent = "Post ID: " + post.id;
    card.classList.add("mb-3");

    // Image
    const imageUrl = post.media || "https://via.placeholder.com/300";
    const image = document.createElement("img");
    image.alt = post.title || "Image Alt Text";
    image.classList.add("card-img-top", "mb-3");
    image.id = "postImageId";
    image.src = imageUrl;
    image.onerror = function () {
        image.src = "/images/noImage.png";
    }
    card.appendChild(image);


    // Title
    const titleElement = document.createElement("h2");
    titleElement.textContent = post.title || "No Title";
    titleElement.classList.add("mb-2");
    card.appendChild(titleElement);

    // Description
    const bodyElement = document.createElement("p");
    bodyElement.textContent = post.description || "No content";
    bodyElement.classList.add("mb-3");
    card.appendChild(bodyElement);


    postFeedContainer.appendChild(card);
    card.appendChild(endsAtContainer);
    card.appendChild(tagContainer);

    // Buttons container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("d-flex", "flex-column", "rounded", "p-2", "align-items-end");
    buttonsContainer.id = "bidNowBtn";


    // Delete 

    // const deleteButton = createNewElement("button", {
    //     class: "btn btn-danger delete-post",
    //     "data-post-id": id,
    //     textContent: "Delete Post",
    // });

    // if (author.name === loggedInName) {
    //     cardBodyDiv.appendChild(deleteButton);
    // }

    // Buttons
    const listingsId = post.id;
    const viewModalButton = createButton("View More", "modalTitle", "modalBody", "modalImage", "viewPost", post, listingsId);
    viewModalButton.classList.add("rounded", "mb-3");

    card.appendChild(tagContainer);
    card.appendChild(endsAtContainer);
    card.appendChild(buttonsContainer);

    buttonsContainer.appendChild(viewModalButton);
}


// View Bids
async function fetchBidsForPost(postId) {
    const bidUrl = `${fullPostURL}/${postId}/bids`;

    try {
        const response = await fetch(bidUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error fetching bids:", error);
        throw error;
    }
}


async function postBid(postId, data) {
    const token = localStorage.getItem("accessToken");
    await fetch(`${fullPostURL}/${postId}/bids`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function bidNow(postId) {
    const bidBtn = document.getElementById(postId);
    bidBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const isLoggedIn = localStorage.getItem("accessToken");

        if (!isLoggedIn) {
            alert("Please log in to place a bid.");
            // window.location.href = "/login";
            return;
        }

        const bidInput = document.getElementById("yourBid");
        const amount = bidInput.value.trim();

        if (!amount) {
            alert("Please enter a bid amount.");
            return;
        }

        const parsedAmount = parseInt(amount);
        if (isNaN(parsedAmount)) {
            alert("Please enter a valid bid amount.");
            return;
        }

        const data = {
            amount: parsedAmount,
        };

        console.log(data);

        const response = postBid(postId, data);

        alert("Bid added successfully");
        window.location.reload();

        console.log(response);
    });
}



function createButton(text, modalTitleId, modalBodyId, modalImageId, postIdId, post, postId) {
    const button = document.createElement("button");
    button.classList.add("button", "btn-primary", "m-auto", "view-post", "mb-3", "fs-5");
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

        console.log(bidBtn)
        bidBtn.id = postId;
        bidNow(postId);
    });

    return button;
}


addDeletePostListeners();
addViewPostListeners();
filterPost();



