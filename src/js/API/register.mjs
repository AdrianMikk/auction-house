import { apiFetch } from "./apiFetch.mjs";

const API_BASE_URL = "https://api.noroff.dev/api/v1";
const API_SOCIAL_REGISTER_PATH = "/auction/auth/register";
const API_SOCIAL_REGISTER_URL = `${API_BASE_URL}${API_SOCIAL_REGISTER_PATH}`;

/**
 * Handles the registration event when a form is submitted.
 * 
 * @param {Event} event - The event object representing the form submission.
 */
export async function registerEvent(event) {
    event.preventDefault();

    const nameRegisterInput = document.querySelector("#floatingRegisterNameInput");
    const emailRegisterInput = document.querySelector("#floatingRegisterEmailInput");
    const passwordRegisterInput = document.querySelector("#floatingRegisterPasswordInput");

    const registerData = {
        name: nameRegisterInput.value,
        email: emailRegisterInput.value,
        password: passwordRegisterInput.value,
    };

    const emailRegex = /^[^\s@]+@stud\.noroff\.no$/i;
    if (!emailRegex.test(registerData.email)) {
        alert("Invalid email format. Please use a @stud.noroff.no email.");
        return;
    }

    try {
        const response = await apiFetch(API_SOCIAL_REGISTER_URL, "POST", registerData);
        if (response) {
        } else {
            console.error("Registration failed:", response);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
