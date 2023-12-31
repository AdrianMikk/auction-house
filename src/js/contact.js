document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const fullName = document.querySelector("#fullName");
  const subject = document.querySelector("#subject");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");

  /**
 * Validates the form fields and displays error messages for invalid input.
 *
 * @function
 * @param {Event} event - The event object triggered by the form submission.
 * @returns {boolean} Returns `true` if the form is valid; otherwise, returns `false`.
 */
  function validateForm(event) {
    const errorMessages = document.querySelectorAll(".error-message");
    let isValid = true;

    errorMessages?.forEach((message) => {
      message.innerHTML = "";
    });

    if (!checkLength(fullName.value, 4)) {
      isValid = false;
      addErrorMessage("Please enter your full name.", fullName);
    }

    if (!validateEmail(email.value)) {
      isValid = false;
      addErrorMessage("Please enter a valid email address.", email);
    }

    if (!checkLength(message.value, 24)) {
      isValid = false;
      addErrorMessage("Please enter a message (at least 25 characters).", message);
    }

    if (!checkLength(subject.value, 14)) {
      isValid = false;
      addErrorMessage("Please enter a subject (at least 15 characters).", subject);
    }

    if (isValid) {
      alert("Form successfully submitted!");
      return true;
    }
  }

  /**
 * Adds an error message to a field and applies visual indicators for invalid input.
 *
 * @function
 * @param {string} message - The error message to be displayed.
 * @param {HTMLInputElement|HTMLTextAreaElement} field - The form field associated with the error.
 * @returns {void}
 */
  function addErrorMessage(message, field) {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = message;
    field.classList.add("error");
    field.style.borderColor = "red";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
  }

  /**
 * Checks if the length of a value (after trimming) is greater than or equal to a specified length.
 *
 * @function
 * @param {string} value - The value to be checked for length.
 * @param {number} len - The minimum required length.
 * @returns {boolean} Returns `true` if the length is sufficient; otherwise, returns `false`.
 */
  function checkLength(value, len) {
    return value.trim().length >= len;
  }

  /**
 * Validates an email address using a regular expression pattern.
 *
 * @function
 * @param {string} email - The email address to be validated.
 * @returns {boolean} Returns `true` if the email address is valid; otherwise, returns `false`.
 */
  function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
  }

  let btn = document.querySelector("#btn");

  btn.addEventListener("click", function (event) {
    event.preventDefault();
    const confDialog = document.querySelector(".confirmDialog");
    if (validateForm()) {
      confDialog.style.display = "block";
      form.style.display = "none";
    } else {
      event.preventDefault();
    }
  });

  fullName.addEventListener("input", () => {
    if (fullName.classList.contains("error")) {
      if (checkLength(fullName.value, 4)) {
        fullName.classList.remove("error");
        const errorMessage = fullName.nextSibling;
        if (errorMessage && errorMessage.classList.contains("error-message")) {
          fullName.parentNode.removeChild(errorMessage);
        }
        fullName.style.borderColor = "";
      }
    }
  });

  subject.addEventListener("input", () => {
    if (subject.classList.contains("error")) {
      if (checkLength(subject.value, 14)) {
        subject.classList.remove("error");
        const errorMessage = subject.nextSibling;
        if (errorMessage && errorMessage.classList.contains("error-message")) {
          subject.parentNode.removeChild(errorMessage);
        }
        subject.style.borderColor = "";
      }
    }
  });

  email.addEventListener("input", () => {
    if (email.classList.contains("error")) {
      if (validateEmail(email.value)) {
        email.classList.remove("error");
        const errorMessage = email.nextSibling;
        if (errorMessage && errorMessage.classList.contains("error-message")) {
          email.parentNode.removeChild(errorMessage);
        }
        email.style.borderColor = "";
      }
    }
  });

  message.addEventListener("input", () => {
    if (message.classList.contains("error")) {
      if (checkLength(message.value, 24)) {
        message.classList.remove("error");
        const errorMessage = message.nextSibling;
        if (errorMessage && errorMessage.classList.contains("error-message")) {
          message.parentNode.removeChild(errorMessage);
        }
        message.style.borderColor = "";
      }
    }
  });
});
