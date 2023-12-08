const API_BASE_URL = "https://api.noroff.dev/api/v1";
const API_SOCIAL_REGISTER_PATH = "/auction/auth/register";
const API_SOCIAL_REGISTER_URL = `${API_BASE_URL}${API_SOCIAL_REGISTER_PATH}`;
const API_AUCTION_LOGIN_PATH = "/auction/auth/login";
const API_AUCTION_LOGIN_URL = `${API_BASE_URL}${API_AUCTION_LOGIN_PATH}`;

/**
 * Fetch that gathers data from the API
 * @param {string} url A url that is passed into the API. 
 * @param {object} userData Data that is passed into the API. 
 * @returns An array with results.
 */
export async function apiFetch(url, method, body = null) {
    try {
        const token = localStorage.getItem("accessToken");

        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}