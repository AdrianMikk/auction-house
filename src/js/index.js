import { loginEvent } from "./API/login.mjs";
import { registerEvent } from "./API/register.mjs";

const userId = localStorage.getItem("name");
const token = localStorage.getItem("accessToken");
console.log("User ID:", userId);
console.log("Access Token:", token);

function formListener() {
    const loginRegisterButton = document.querySelector("#loginRegisterBtn");
    const registerButton = document.querySelector("#registerBtn");

    // console.log("Login Register Button:", loginRegisterButton);
    // console.log("Register Button:", registerButton);

    if (loginRegisterButton) {
        loginRegisterButton.addEventListener("click", loginEvent);
    }

    if (registerButton) {
        registerButton.addEventListener("click", registerEvent);
    }
}

/**
 * Checks if a user is logged.
 * If the user ID and access token are available it redirects to the profile page. 
 *
 * @function checkIfLoggedIn
 *
 * @returns {void} This function does not return a value but may perform a redirect if the user
 * is logged in.
 */
function checkIfLoggedIn() {
    const userId = localStorage.getItem("name")
    const token = localStorage.getItem("accessToken")

    // if (userId && token)
    //     window.location.replace(`/profile.html?=${userId}`);
}

export function removeNavLogOut() {
    const button = document.getElementById("logOut");

    if (window.location.pathname === "/index.html") {
        button.classList.add("d-none");
    }
}

formListener();
removeNavLogOut();
checkIfLoggedIn();

