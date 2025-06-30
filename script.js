document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const formFeedbackDiv = document.getElementById("form-feedback");

  // Individual error message spans
  const usernameError = document.getElementById("username-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  function clearErrors() {
    // Clear all input error states
    usernameInput.classList.remove("error");
    emailInput.classList.remove("error");
    passwordInput.classList.remove("error");

    // Clear all individual error messages
    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    // Hide and clear the general form feedback
    formFeedbackDiv.style.display = "none";
    formFeedbackDiv.textContent = "";
    formFeedbackDiv.classList.remove("success"); // Remove success class
  }

  function validateField(
    inputElement,
    errorElement,
    validationFn,
    errorMessage
  ) {
    const value = inputElement.value.trim();
    if (!validationFn(value)) {
      inputElement.classList.add("error");
      errorElement.textContent = errorMessage;
      return false;
    } else {
      inputElement.classList.remove("error");
      errorElement.textContent = "";
      return true;
    }
  }

  // Validation functions
  const isValidUsername = (username) => username.length >= 3;
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // More robust regex for email
  const isValidPassword = (password) => {
    // Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      hasMinLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  // Add blur event listeners for real-time (on-blur) validation feedback
  usernameInput.addEventListener("blur", () => {
    validateField(
      usernameInput,
      usernameError,
      isValidUsername,
      "Username must be at least 3 characters long."
    );
  });

  emailInput.addEventListener("blur", () => {
    validateField(
      emailInput,
      emailError,
      isValidEmail,
      "Please enter a valid email address (e.g., example@domain.com)."
    );
  });

  passwordInput.addEventListener("blur", () => {
    validateField(
      passwordInput,
      passwordError,
      isValidPassword,
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
    );
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    clearErrors(); // Clear all previous errors before re-validating

    let formIsValid = true;
    const generalMessages = []; // For general feedback if individual messages aren't enough

    // Validate all fields on submit
    if (
      !validateField(
        usernameInput,
        usernameError,
        isValidUsername,
        "Username must be at least 3 characters long."
      )
    ) {
      formIsValid = false;
      // Optionally add to generalMessages if you still want a summary
      // generalMessages.push('Username needs attention.');
    }

    if (
      !validateField(
        emailInput,
        emailError,
        isValidEmail,
        "Please enter a valid email address (e.g., example@domain.com)."
      )
    ) {
      formIsValid = false;
      // generalMessages.push('Email needs attention.');
    }

    if (
      !validateField(
        passwordInput,
        passwordError,
        isValidPassword,
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      )
    ) {
      formIsValid = false;
      // generalMessages.push('Password needs attention.');
    }

    formFeedbackDiv.style.display = "block"; // Always show the feedback div after submission attempt

    if (formIsValid) {
      formFeedbackDiv.textContent = "Registration successful!";
      formFeedbackDiv.classList.add("success");
      formFeedbackDiv.style.color = "#28a745";
      formFeedbackDiv.style.backgroundColor = "#d4edda";
      formFeedbackDiv.style.border = "1px solid #c3e6cb";
      form.reset(); // Optionally clear the form after successful submission
    } else {
      // If there are specific error messages, the general feedback might just indicate "Please fix the errors above."
      // Or, if no individual errors are shown, list them all here.
      // Given we have individual errors, a general summary or prompt is better.
      if (generalMessages.length > 0) {
        formFeedbackDiv.innerHTML =
          "Please correct the following issues:<br>" +
          generalMessages.join("<br>");
      } else {
        formFeedbackDiv.textContent =
          "Please correct the highlighted fields above.";
      }
      // Re-apply default error styles in case a success message was shown previously
      formFeedbackDiv.style.color = "#d8000c";
      formFeedbackDiv.style.backgroundColor = "#ffbaba";
      formFeedbackDiv.style.border = "1px solid #d8000c";
    }
  });
});
