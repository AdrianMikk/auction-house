import { apiFetch } from '../API/apiFetch.mjs';
import { displayFilteredPosts } from '../posts.js';

const accessToken = localStorage.getItem("accessToken");
const searchInput = document.getElementById("search");
const fullPostURL = "https://api.noroff.dev/api/v1/auction/listings?_author=true";

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
export async function search() {
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const postData = await apiFetch(fullPostURL, options);
    const searchValue = searchInput.value.toLowerCase();
    const filteredData = postData.filter((post) => post.title.toLowerCase().includes(searchValue));
    displayFilteredPosts(filteredData);
}
