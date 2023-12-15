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
    const deleteButtons = document.querySelectorAll(".delete-post");

    deleteButtons.forEach(button => {
        button.addEventListener("click", async function (event) {
            event.preventDefault();
            const postId = this.getAttribute("data-post-id");

            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch(`${fullPostURL}/${postId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const postCard = this.closest(".card");
                if (postCard) {
                    postCard.remove();
                } else {
                    console.error("Post card not found for deletion.");
                }

                console.log("Post deleted successfully");
            } catch (error) {
                console.error("Error:", error);
            }
        });
    });
}

/**
 * Delete a post with the provided post ID.
 * @param {number} postId - The ID of the post to delete.
 */
export async function deletePost(postId) {
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


