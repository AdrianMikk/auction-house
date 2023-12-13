import { apiFetch } from "../API/apiFetch.mjs";
import { fetchAllAuctions } from "../listing.mjs";

const API_BASE_URL = "https://api.noroff.dev/api/v1/";
const fullPostURL = "https://api.noroff.dev/api/v1/auction/listings";
const accessToken = localStorage.getItem("accessToken");

/**
 * Add click event listeners to "Delete Post" buttons.
 * When a button is clicked, prompt the user for confirmation and delete the post if confirmed.
 */
export function addDeletePostListeners() {
    const deletePostButtons = document.querySelectorAll(".delete-post");
    deletePostButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const postId = e.target.getAttribute("data-post-id");
            if (confirm("Are you sure you want to delete this post?")) {
                deletePost(postId);
            }
        });
    });
}

/**
 * Delete a post with the provided post ID.
 * @param {number} postId - The ID of the post to delete.
 */
async function deletePost(postId) {
    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    try {
        const response = await apiFetch(`${fullPostURL}/${postId}`, options);

        if (response) {
            alert("Post deleted successfully!");
            fetchAllAuctions();
        }
    } catch (error) {
        console.error(error);
        alert("Error deleting the post.");
    }
}
