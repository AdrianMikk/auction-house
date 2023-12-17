const searchInput = document.getElementById("search");

/**
 * Performs a search operation on a collection of posts.
 *
 * This function fetches a list of posts 
 *
 * @async
 * @function search
 * @throws {Error} If there is an issue with the API request or response.
 *
 * @returns {Promise<void>} A Promise that resolves when the search and display
 * process is completed.
 */
export function search(allAuctions) {
    const searchValue = searchInput.value.toLowerCase();
    return allAuctions.filter((post) => post.title.toLowerCase().includes(searchValue));
}
