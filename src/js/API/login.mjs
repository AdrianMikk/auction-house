import { apiFetch } from "./apiFetch.mjs";

const API_BASE_URL = "https://api.noroff.dev/api/v1";
const base_url = "https://api.noroff.dev/api/v1/auction/profiles";

const profileLink = document.getElementById("navProfile");
const userName = document.getElementById("userName");
const token = localStorage.getItem("accessToken");

profileLink.addEventListener("click", (event) => {
    if (!token) {
        event.preventDefault();
        alert("You need to be logged in to view your profile.");
    }
});

/**
 * Sets the access token and user information in local storage and redirects to the specified page.
 *
 * @function
 * @param {Object} result - The result object containing the access token and user information.
 * @throws {Error} If the access token is not found in the response.
 * @returns {void}
 */
export function setToken(result) {
    if (result.accessToken) {
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("email", result.email);
        localStorage.setItem("name", result.name);
        localStorage.setItem("userCredit", result.credits);
        localStorage.setItem("chosenAvatar", result.avatar);

        window.location.href = "/listings.html";
    } else {
        alert("Enter correct email and password");
        throw new Error("Access token not found in the response.");
    }
}

const API_AUCTION_LOGIN_PATH = "/auction/auth/login";
const API_AUCTION_LOGIN_URL = `${API_BASE_URL}${API_AUCTION_LOGIN_PATH}`;

/**
 * Handles the login event, preventing the default form submission and sending a login request.
 *
 * @async
 * @function
 * @param {Event} event - The event object representing the form submission.
 * @throws {Error} If there's an error during the login process or if the server responds with an error.
 * @returns {void}
 */
export async function loginEvent(event) {
    event.preventDefault();

    const emailInput = document.querySelector("#floatingInput");
    const passwordInput = document.querySelector("#floatingPassword");
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    const userObject = {
        email: emailValue,
        password: passwordValue,
    };

    const loginOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userObject),
    };

    const result = await fetch(API_AUCTION_LOGIN_URL, loginOption);
    const data = await result.json();

    setToken(data);
}

/**
 * Logs out the user by clearing local storage on button click.
 *
 * @function logOutUser
 */
export function logOutUser() {
    const logOutBtn = document.getElementById("logOut");
    logOutBtn.addEventListener("click", () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            localStorage.clear();
            window.location.href = "/index.html";
        } else {
            logOutBtn.textContent = "Log in";
            window.location.href = "/index.html";
        }
    });
}



