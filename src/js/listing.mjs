import { search } from "./components/search.mjs";
import { filterPost } from "./components/filter.mjs";
import { addViewPostListeners } from "./components/viewPost.js";
import { addDeletePostListeners } from "./components/deletepost.js";
import { logOutUser } from "./API/login.mjs";
import { removeNavLogOut } from "./index.js";
removeNavLogOut();
logOutUser();

const base_url = "https://api.noroff.dev/api/v1/auction/profiles";
const fullPostURL = "https://api.noroff.dev/api/v1/auction/listings";
const bidUrl = fullPostURL + "adrian_mikkelsen/bids";
const postFeedContainer = document.getElementById("postFeed");
const searchInput = document.getElementById("search");

const API_BASE_URL = "https://api.noroff.dev/api/v1/auction/";
const listing_endpoint = "listings";

const bidBtn = document.getElementById("bidBtn");

searchInput.addEventListener("input", search);

/**
 * Fetches all auctions from the server.
 *
 * @async
 * @function
 * @returns {Promise<Object>} A promise that resolves to the JSON representation of all auctions.
 * @throws {Error} If the server responds with an error or if there's a network issue.
 */
export async function fetchAllAuctions() {
    const allAuctionsUrl = `${API_BASE_URL}${listing_endpoint}?sort=created&_bids=true`;

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

/**
 * Initializes the application by fetching all auctions, sorting them by creation date,
 * and rendering the post feed. Also, sets up event listeners for the search functionality.
 *
 * @async
 * @function
 * @throws {Error} If there's an error during the initialization process.
 */
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

/**
 * Clears all child elements from the post feed container.
 *
 * @function
 * @returns {void}
 */
function clearPostFeed() {
    while (postFeedContainer.firstChild) {
        postFeedContainer.removeChild(postFeedContainer.firstChild);
    }
}

init();

/**
 * Creates and renders a post card based on the provided post data.
 *
 * @function
 * @param {Object} post - The post data to be used for creating the card.
 * @param {string} post.id - The unique identifier for the post.
 * @param {string} post.title - The title of the post.
 * @param {string} post.description - The description/content of the post.
 * @param {string[]} post.tags - An array of tags associated with the post.
 * @param {string} post.endsAt - The deadline/ending time for the post.
 * @param {string} post.media - The URL of the post's media (image).
 * @param {Object[]} post.bids - An array of bids associated with the post.
 *
 * @returns {void}
 */
function createPostCard(post) {
    console.log(post);
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
    const bidsArray = post.bids;
    const viewModalButton = createButton("View More", "modalTitle", "modalBody", "modalImage", "viewPost", post, listingsId, bidsArray);
    viewModalButton.classList.add("rounded", "mb-3");

    card.appendChild(tagContainer);
    card.appendChild(endsAtContainer);
    card.appendChild(buttonsContainer);

    buttonsContainer.appendChild(viewModalButton);
}

/**
 * Fetches and returns the bids associated with a specific post.
 *
 * @async
 * @function
 * @param {string} postId - The unique identifier of the post for which bids are to be viewed.
 * @returns {Promise<Object>} A promise that resolves to the JSON representation of the bids for the specified post.
 * @throws {Error} If there's an error during the fetch operation or if the server responds with an error.
 */
async function viewBids(postId) {
    const response = await fetch(`${fullPostURL}/${postId}?_bids=true`)
    const data = await response.json();
    return data;
}

/**
 * Displays the bid information in the specified container based on the provided data.
 *
 * @function
 * @param {Object} data - The data containing bid information to be displayed.
 * @param {Object[]} data.bids - An array of bids associated with the post.
 *
 * @returns {void}
 */
function displayBids(data) {
    const bidData = data.bids;
    console.log(bidData);
    const currentBid = document.getElementById("bidContainer");
    if (bidData.length === 0) {
        const noBids = document.createElement("p");
        noBids.textContent = "No bids yet";
        currentBid.appendChild(noBids);
    }
    bidData.forEach((bid) => {
        const bidder = document.createElement("p");
        currentBid.appendChild(bidder);
        const bidCount = document.createElement("p");
        bidCount.textContent = `${bid.bidderName} Bids: ${bid.amount}`;
        currentBid.appendChild(bidCount);
    });
}




/**
 * Posts a bid for a specific post using the provided data.
 *
 * @async
 * @function
 * @param {string} postId - The unique identifier of the post for which the bid is being submitted.
 * @param {Object} data - The data containing bid information to be posted.
 * @param {string} data.bidderName - The name of the bidder submitting the bid.
 * @param {number} data.amount - The amount of the bid.
 * @throws {Error} If there's an error during the post operation or if the server responds with an error.
 */
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

/**
 * Adds an event listener to a bid button for placing a bid on a specific post.
 *
 * @function
 * @param {string} postId - The unique identifier of the post for which a bid is being placed.
 * @returns {void}
 */
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


/**
 * Creates a button element with specified text and sets up event listeners for displaying post details and bids.
 *
 * @function
 * @param {string} text - The text content of the button.
 * @param {string} modalTitleId - The HTML element ID for the modal title.
 * @param {string} modalBodyId - The HTML element ID for the modal body.
 * @param {string} modalImageId - The HTML element ID for the modal image.
 * @param {string} postIdId - The HTML element ID for the post ID.
 * @param {Object} post - The post data associated with the button.
 * @param {string} postId - The unique identifier of the post.
 * @param {Object[]} bids - An array of bids associated with the post.
 * @returns {HTMLButtonElement} The created button element.
 */
function createButton(text, modalTitleId, modalBodyId, modalImageId, postIdId, post, postId, bids) {
    const button = document.createElement("button");
    button.classList.add("button", "btn-primary", "m-auto", "view-post", "mb-3", "fs-5");
    button.textContent = text;
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#postModal");

    button.addEventListener("click", async () => {
        const modalTitle = document.getElementById(modalTitleId);
        const modalBody = document.getElementById(modalBodyId);
        const modalImage = document.getElementById(modalImageId);
        const postIdElement = document.getElementById(postIdId);

        modalTitle.textContent = post.title;
        modalBody.textContent = post.description;
        modalImage.src = post.media;

        const currentBid = document.getElementById("bidContainer");
        currentBid.innerHTML = "";


        console.log(bidBtn)
        bidBtn.id = postId;
        bidNow(postId);
        const data = await viewBids(postId);
        console.log(data);
        displayBids(data);
    });

    return button;
}


addDeletePostListeners();
addViewPostListeners();
filterPost();



