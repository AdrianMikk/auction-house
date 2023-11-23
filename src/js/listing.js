import { apiFetch } from "./API/apiFetch.mjs";
import { createNewElement } from "./utils/createNewElement.mjs";
import { createNewPost } from "./components/createPost.mjs";
import { addEditPostListeners } from "./components/editposts.js";
import { addDeletePostListeners } from "./components/deletepost.js";
import { search } from "./components/search.mjs";


const fullPostURL = "https://api.noroff.dev/api/v1/auction";
const postFeedContainer = document.getElementById("postFeed");
const searchInput = document.getElementById("search");

const newPostTitleInput = document.getElementById("newPostTitle");
const newPostBodyInput = document.getElementById("newPostBody");
const newPostImageInput = document.getElementById("newPostImageInput");

const editPostButton = document.querySelector(".edit-post")
const viewPostButton = document.getElementById("viewPostButton");
const deleteButton = document.getElementById("deleteButton");

searchInput.addEventListener("input", search);

const createPostForm = document.getElementById("createPostForm");
const accessToken = localStorage.getItem("accessToken");
const loggedInEmail = localStorage.getItem("email");
const loggedInName = localStorage.getItem("name");

const editPostForm = document.getElementById("editPostForm");
const editPostTitleInput = document.getElementById("editPostTitle");
const editPostBodyInput = document.getElementById("editPostBody");

// Modal
const postModal = document.getElementById("postModal");
const editPostModal = document.getElementById("editPostModal");

/**
 * Fetches and displays posts if a user is authenticated.
 *
 * If the user is authenticated this function fetches posts
 * from an API and displays them. If not authenticated, it redirects to the homepage.
 *
 * @async
 * @function fetchAndDisplayItems
 *
 * @throws {Error} If there is an issue with the API request or response.
 *
 * @returns {Promise<void>} A Promise that resolves when the posts are fetched and displayed.
 */
export async function fetchAndDisplayItems() {
    if (!accessToken) {
        location.href = "/index.html";
    }
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        let postList = await apiFetch(fullPostURL + `?_author=true`, options);
        displayFilteredPosts(postList);
    } catch (error) {
        alert("Failed to fetch posts.");
    }
}

/**
 * Filter and display posts based on the search input value.
 */
export function displayFilteredPosts(data) {

    postFeedContainer.innerHTML = "";

    data.forEach(({ id, title, body, media, author }) => {

        const postCard = document.createElement("div");
        postCard.classList.add("col-12", "col-md-6", "col-lg-4", "mb-4");
        const imageUrl = media ? media : "https://via.placeholder.com/300";
        postCard.id = id;

        const cardDiv = createNewElement("div", { class: "card" })

        const image = createNewElement("img", { src: imageUrl, alt: title, class: "card-img-top" });

        const cardBodyDiv = createNewElement("div", { class: "card-body" });

        const titleElement = createNewElement("h5", { class: "card-title", textContent: title });

        const bodyElement = createNewElement("p", { class: "card-text", textContent: body });

        const viewButton = createNewElement("button", {
            class: "btn btn-primary view-post",
            "data-post-id": id,
            textContent: "View Post",
        });

        const editButton = createNewElement("button", {
            class: "btn btn-primary edit-post",
            "data-post-id": id,
            textContent: "Edit Post",
        });

        const deleteButton = createNewElement("button", {
            class: "btn btn-danger delete-post",
            "data-post-id": id,
            textContent: "Delete Post",
        });

        cardBodyDiv.appendChild(titleElement);
        cardBodyDiv.appendChild(bodyElement);
        cardBodyDiv.appendChild(viewButton);
        if (author.name === loggedInName) {
            cardBodyDiv.appendChild(editButton);
            cardBodyDiv.appendChild(deleteButton);
        }
        cardDiv.appendChild(image);
        cardDiv.appendChild(cardBodyDiv);

        postCard.appendChild(cardDiv);

        postFeedContainer.appendChild(postCard);
    });

    addViewPostListeners();
    addEditPostListeners();
    addDeletePostListeners();



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
            fetchAndDisplayItems();
        });

        filterOldPost.addEventListener("click", (e) => {
            const postsDesc = data.sort(
                (a, b) => new Date(a.created) - new Date(b.created)
            );
            displayFilteredPosts(postsDesc);
        });
    }

    filterPost();


    /**
     * Add click event listeners to "View Post" buttons.
     * When a button is clicked, display the post content or handle accordingly.
     */
    function addViewPostListeners() {
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


};

createPostForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = newPostTitleInput.value;
    const body = newPostBodyInput.value;
    const media = newPostImageInput.value;

    const newPostData = {
        title,
        body,
        media,
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newPostData),
    };

    createNewPost(options);
})

fetchAndDisplayItems();