import { apiFetch } from "../API/apiFetch.mjs";
import { fetchAndDisplayPosts } from "../posts.js";

const fullPostURL = "https://api.noroff.dev/api/v1/social/posts";
const accessToken = localStorage.getItem("accessToken");

/**
 * Add click event listeners to "Edit Post" buttons.
 * When a button is clicked, populate the edit form with the post data.
 */
export function addEditPostListeners() {
    const editPostButtons = document.querySelectorAll(".edit-post");
    editPostButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const postId = e.target.getAttribute("data-post-id");
            openEditForm(postId);
        });
    });
}

/**
 * Opens an edit form for a specific post.
 *
 * This function displays an edit form for a post with the provided postId,
 * allowing users to edit the post's title and body. 
 *
 * @param {number} postId - The unique identifier of the post to be edited.
 */
function openEditForm(postId) {
    const editTitle = document.getElementById("editTitle");
    const editBody = document.getElementById("editBody");
    const editPostButton = document.getElementById("updatePostButton");
    editPostModal.style.display = "block";
    editPostButton.addEventListener("click", (e) => {
        e.preventDefault();
        updatePost(postId, editTitle, editBody);
    });
}

const editCloseModalButton = document.getElementById("editCloseModalButton");
editCloseModalButton.addEventListener("click", () => {
    editPostModal.style.display = "none";
});

/**
 * Update a post with the provided data.
 * @param {number} postId - The ID of the post to update.
 */
async function updatePost(postId, updatedTitle, updatedBody) {
    const title = updatedTitle.value;
    const body = updatedBody.value;

    const updatedPostData = {
        title,
        body,
    };

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedPostData),
    };

    try {
        const response = await apiFetch(`${fullPostURL}/${postId}`, options);

        if (response && response.id) {
            alert("Post updated successfully!");
            fetchAndDisplayPosts();
            editPostModal.style.display = "none";
        } else {
            alert("Failed to update the post.");
        }
    } catch (error) {
        console.error(error);
        alert("Error updating the post.");
    }
}

