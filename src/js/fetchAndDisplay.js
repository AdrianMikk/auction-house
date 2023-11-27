
// export function displayPosts(data) {

//     const auctionCard = document.querySelector(".card")
//     auctionCard.innerHTML = "";

//     data.forEach(({ id, title, body, media, author }) => {

//         const postCard = document.createElement("div");

//         postCard.classList.add("col-12", "col-md-6", "col-lg-4", "mb-4");
//         const imageUrl = media ? media : "https://via.placeholder.com/300";
//         postCard.id = id;

//         const cardDiv = createNewElement("div", { class: "card" })

//         const image = createNewElement("img", { src: imageUrl, alt: title, class: "card-img-top" });

//         const cardBodyDiv = createNewElement("div", { class: "card-body" });

//         const titleElement = createNewElement("h5", { class: "card-title", textContent: title });

//         const bodyElement = createNewElement("p", { class: "card-text", textContent: body });

//         const viewButton = createNewElement("button", {
//             class: "btn btn-primary view-post",
//             "data-post-id": id,
//             textContent: "View Post",
//         });

//         const editButton = createNewElement("button", {
//             class: "btn btn-primary edit-post",
//             "data-post-id": id,
//             textContent: "Edit Post",
//         });

//         const deleteButton = createNewElement("button", {
//             class: "btn btn-danger delete-post",
//             "data-post-id": id,
//             textContent: "Delete Post",
//         });

//         cardBodyDiv.appendChild(titleElement);
//         cardBodyDiv.appendChild(bodyElement);
//         cardBodyDiv.appendChild(viewButton);
//         if (author.name === loggedInName) {
//             cardBodyDiv.appendChild(editButton);
//             cardBodyDiv.appendChild(deleteButton);
//         }
//         cardDiv.appendChild(image);
//         cardDiv.appendChild(cardBodyDiv);

//         postCard.appendChild(cardDiv);
//     });

//     addViewPostListeners();
//     addEditPostListeners();
//     addDeletePostListeners();
// }