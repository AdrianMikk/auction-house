/**
 * Add click event listeners to "View Post" buttons.
 * When a button is clicked, display the post content or handle accordingly.
 */
export function addViewPostListeners() {
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

// addViewPostListeners();