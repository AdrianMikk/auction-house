import { apiFetch } from "./apiFetch.mjs";

const API_BASE_URL = "https://api.noroff.dev/api/v1";

const profileLink = document.getElementById("navProfile");
const userName = document.getElementById("userName");
const token = localStorage.getItem("accessToken");

profileLink.addEventListener("click", (event) => {
    if (!token) {
        event.preventDefault();
        alert("You need to be logged in to view your profile.");
    }
});



function setToken(result) {
    if (result.accessToken) {
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("email", result.email);
        localStorage.setItem("name", result.name);
        window.location.href = "/listings.html"
    } else {
        alert("Enter correct email and password")
        throw new Error("Access token not found in the response.")
    }
};

const API_SOCIAL_LOGIN_PATH = "/auction/auth/login";
const API_SOCIAL_LOGIN_URL = `${API_BASE_URL}${API_SOCIAL_LOGIN_PATH}`;

/**
 * Handles the login event when a form is submitted.
 * 
 * @param {Event} event - The event object representing the form submission.
 */


// ID
export async function loginEvent(event) {
    event.preventDefault();

    const emailInput = document.querySelector("#floatingInput");
    const passwordInput = document.querySelector("#floatingPassword");

    const loginOption = {
        method: "POST",
        body: JSON.stringify({
            "email": emailInput.value,
            "password": passwordInput.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    };


    const result = await apiFetch(API_SOCIAL_LOGIN_URL, loginOption);

    setToken(result);
    console.log(result);
};

/**
 * Logs out the user by clearing local storage on button click.
 *
 * @function logOutUser
 */
function logOutUser() {
    const logOutBtn = document.getElementById("logOut")
    logOutBtn.addEventListener("click", () => {
        localStorage.clear()
    })
}
logOutUser();

