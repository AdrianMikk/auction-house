// /**
//  * Add click event listeners to "View Post" buttons.
//  * When a button is clicked, display the post content or handle accordingly.
//  */
// export function addViewPostListeners() {
//     const viewPostButtons = document.querySelectorAll(".view-post");
//     viewPostButtons.forEach((button) => {
//         button.addEventListener("click", (e) => {
//             const postId = e.target.getAttribute("data-post-id");
//             const post = data.find((post) => post.id === parseInt(postId));
//             if (post) {
//                 const modalTitle = document.getElementById("modalTitle");
//                 const modalBody = document.getElementById("modalBody");
//                 const modalImage = document.getElementById("modalImage");
//                 const postIdElement = document.getElementById("postId");
//                 postIdElement.textContent = "Post ID: " + postId;
//                 modalTitle.textContent = post.title;
//                 modalBody.textContent = post.body;
//                 modalImage.src = post.media;
//                 postModal.style.display = "block";
//             } else {
//                 alert("Post not found.");
//             }
//         });
//     });
// }

// const closeModalButton = document.getElementById("closeModalButton");
// closeModalButton.addEventListener("click", () => {
//     postModal.style.display = "none";
// });

// createPostForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const title = newPostTitleInput.value;
//     const body = newPostBodyInput.value;
//     const media = newPostImageInput.value;

//     const newPostData = {
//         title,
//         body,
//         media,
//     };

//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(newPostData),
//     };

//     createNewPost(options);
// })

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
}