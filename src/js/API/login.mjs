import { apiFetch } from "./apiFetch.mjs";

const API_BASE_URL = "https://api.noroff.dev/api/v1";

const profileLink = document.getElementById("navProfile");
console.log(profileLink);
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
        localStorage.setItem("userCredit", result.credits);
        const userCreditElement = getElementById("#userCredit");
        console.log(userCreditElement);

        if (userCreditElement) {
            userCreditElement.textContent = result.credits;
        }

        window.location.href = "/listings.html";
    } else {
        alert("Enter correct email and password");
        throw new Error("Access token not found in the response.");
    }
}


const API_AUCTION_LOGIN_PATH = "/auction/auth/login";
const API_AUCTION_LOGIN_URL = `${API_BASE_URL}${API_AUCTION_LOGIN_PATH}`;

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

    console.log(loginOption);
    const result = await fetch(API_AUCTION_LOGIN_URL, loginOption);
    const data = await result.json();
    console.log(data);
    console.log(result);

    setToken(data);
    // console.log(result);
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


