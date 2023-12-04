/**
 * Create a new HTML element with the specified attributes.
 * @param {string} tagName - The HTML tag name of the element.
 * @param {Object} attributes - An object containing attribute-value pairs for the element.
 * @returns {HTMLElement} - The created HTML element.
 */
export function createNewElement(tagName, attributes) {
    const element = document.createElement(tagName);

    if (attributes) {
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
    }

    return element;
}



/**
 * Filter and display posts based on the search input value.
 */
export function displayFilteredPosts(data) {
    const postFeedContainer = document.getElementById("postFeed");
    postFeedContainer.innerHTML = "";

    data.forEach(({ id, title, body, media, author }) => {

        const postCard = document.createElement("div");
        postCard.classList.add("col-12", "col-md-6", "col-lg-4", "mb-4");
        const imageUrl = media ? media : "https://via.placeholder.com/300";
        postCard.id = id;

        const cardDiv = createNewElement("div", { class: "card" });

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

/**
 * Filters posts by date based on user selection.
 *
 * This function attaches event listeners to two HTML elements, typically used for
 * filtering posts by date: "Newest Posts" and "Oldest Posts" buttons. When a user clicks
 * on one of these buttons, the function either fetches and displays posts or sorts the
 * existing posts by their creation date and displays the filtered results.
 */
// export async function filterPost(data) {
//     console.log("Data:", data);

//     const filterNewPost = document.getElementById("newestPost");
//     const filterOldPost = document.getElementById("oldestPost");

//     filterNewPost.addEventListener("click", (e) => {
//         if (Array.isArray(data)) {
//             const postsAsc = data.sort(
//                 (a, b) => new Date(b.created) - new Date(a.created)
//             );
//             displayFilteredPosts(postsAsc);
//         } else {
//             console.error("Data is not an array.");
//         }
//     });

//     filterOldPost.addEventListener("click", (e) => {
//         if (Array.isArray(data)) {
//             const postsDesc = data.sort(
//                 (a, b) => new Date(a.created) - new Date(b.created)
//             );
//             displayFilteredPosts(postsDesc);
//         } else {
//             console.error("Data is not an array.");
//         }
//     });
// }

export async function filterPost() {
    try {
        const listings = await fetchAllAuctions();
        const filterNewPost = document.getElementById("newestPost");
        const filterOldPost = document.getElementById("oldestPost");

        filterNewPost.addEventListener("click", (e) => {
            const postsAsc = listings.sort(
                (a, b) => new Date(b.created) - new Date(a.created)
            );
            fetchAllAuctions(postsAsc);
        });

        filterOldPost.addEventListener("click", (e) => {
            const postsDesc = listings.sort(
                (a, b) => new Date(a.created) - new Date(b.created)
            );
            fetchAllAuctions(postsDesc);
        });
    } catch (error) {
        console.error("Error fetching or processing posts:", error);
    }
}

// document.addEventListener("DOMContentLoaded", function () {
//     const filterNewPost = document.getElementById("newestPost");
//     const filterOldPost = document.getElementById("oldestPost");
//     const filterDropdown = document.getElementById("filterDropdown");
//     const postContainer = document.getElementById("postContainer");

//     // Sample posts data
//     const posts = [
//         { title: "Post 1", date: "2023-01-01" },
//         { title: "Post 2", date: "2023-02-15" },
//         { title: "Post 3", date: "2023-03-10" },
//         // Add more posts as needed
//     ];

//     // Function to render posts based on the selected filter
//     export function filterPost(filterType) {
//         // Implement your logic to filter and render posts
//         const sortedPosts = posts.slice().sort((a, b) => {
//             if (filterType === "newest") {
//                 return new Date(b.date) - new Date(a.date);
//             } else if (filterType === "oldest") {
//                 return new Date(a.date) - new Date(b.date);
//             }
//         });

//         // Clear existing posts
//         postContainer.innerHTML = "";

//         // Render the sorted posts
//         sortedPosts.forEach(post => {
//             const postElement = document.createElement("div");
//             postElement.classList.add("post");
//             postElement.textContent = `${post.title} - Date: ${post.date}`;
//             postContainer.appendChild(postElement);
//         });
//     }

//     // Event listener for the filter dropdown
//     filterDropdown.addEventListener("change", function () {
//         const selectedFilter = filterDropdown.value;
//         filterPost(selectedFilter);
//     });

//     // Initial render (you may choose "newest" or "oldest" as the default filter)
//     renderPosts("newest");
// });








