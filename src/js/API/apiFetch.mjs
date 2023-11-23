/**
 * Fetch that gathers data from the API
 * @param {string} url A url that is passed into the API. 
 * @param {object} userData Data that is passed into the API. 
 * @returns An array with results.
 */
export async function apiFetch(url, userData) {
    const response = await fetch(url, userData);
    const result = await response.json();

    return result;
};