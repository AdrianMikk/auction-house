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
    console.log(result);
}

const API_AUCTION_LOGIN_PATH = "/auction/auth/login";
const API_AUCTION_LOGIN_URL = `${API_BASE_URL}${API_AUCTION_LOGIN_PATH}`;

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



