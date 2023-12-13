
/**
 * Add click event listeners to "View Post" buttons.
 * When a button is clicked, display the post content or handle accordingly.
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
                const postIdElement = document.getElementById("postId");
                const bidCount = document.getElementById("currentBid");
                // const tags = document.getElementById("tags");
                // const postDeadline = document.getElementById("postDeadline");
                // const postModal = document.getElementById("postModal");
                // const postDeadlineFormat = postDeadline.toLocaleDateString(
                //     "no-NO",
                //     {
                //         day: "2-digit",
                //         month: "2-digit",
                //         year: "2-digit",
                //         hour: "2-digit",
                //         minute: "2-digit",
                //     }
                // );
                // tags.textContent = "Tags: " + post.tags;
                // postDeadline.textContent = "Deadline: " + postDeadlineFormat;
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