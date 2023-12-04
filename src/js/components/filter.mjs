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
export async function filterPost(data) {
    console.log("Data:", data);

    const filterNewPost = document.getElementById("newestPost");
    const filterOldPost = document.getElementById("oldestPost");

    filterNewPost.addEventListener("click", (e) => {
        if (Array.isArray(data)) {
            const postsAsc = data.sort(
                (a, b) => new Date(b.created) - new Date(a.created)
            );
            displayFilteredPosts(postsAsc);
        } else {
            console.error("Data is not an array.");
        }
    });

    filterOldPost.addEventListener("click", (e) => {
        if (Array.isArray(data)) {
            const postsDesc = data.sort(
                (a, b) => new Date(a.created) - new Date(b.created)
            );
            displayFilteredPosts(postsDesc);
        } else {
            console.error("Data is not an array.");
        }
    });
}

// async function filterPost() {
    
//     const filterNewPost = document.getElementById("newestPost");
//     const filterOldPost = document.getElementById("oldestPost");
    
// } 



