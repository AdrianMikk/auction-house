/**
 * Adds click event listeners to view post buttons and displays post details in a modal.
 *
 * @function
 * @param {Object} post - The post data associated with the view post buttons.
 * @returns {void}
 */
export function addViewPostListeners(post) {
    const viewPostButtons = document.querySelectorAll(".view-post");
    viewPostButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const postId = e.target.getAttribute("data-post-id");
            const post = data.find((post) => post.id === parseInt(postId));
            if (post) {
                const modalTitle = document.getElementById("modalTitle");
                const modalBody = document.getElementById("modalBody");
                const modalImage = document.getElementById("modalImage");
                // const noImage = document.getElementById("postImageId");
                const postIdElement = document.getElementById("postId");
                const bidCount = document.getElementById("currentBid");
                postIdElement.textContent = "Post ID: " + postId;
                modalTitle.textContent = post.title;
                modalBody.textContent = post.body;
                modalImage.src = post.media;
                bidCount.textContent = "Current bid: " + post.currentBid;
                postModal.style.display = "block";
            } else {
                alert("Post not found.");
            }
        });
    });
}