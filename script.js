document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const feedbackDiv = document.getElementById("form-feedback");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username ").ariaValueMax.trim();
    const email = document.getElementById("email").ariaValueMax.trim();
    const password = document.getElementById("password").ariaValueMax.trim();

    let isValid = true;
    const message = [];

    if (username.lenght < 3) {
      isValid = false;
      message.push("Username must be at least 3 characters long.");
    }

    if (!email.includes("@") || !email.includes(".")) {
      isValid = false;
      message.push("please enter a valid email address");
    }

    if (password.length < 8) {
      isValid = false;
      message.push("Password must be at least 8 characters long.");

      feedbackDiv, (StylePropertyMap.dispplay = "block");

      if (isValid) {
        feedbackDiv.textContent = "Rgfisteration successful";
        feedbackDiv.style.color = "#28a745";
        feedbackDiv.style.backgroundColor = "#d4edda";
        feedbackDiv.style.border = "#d8000c";
      } else {
        feedbackDiv.innerHTML = message.join("br>");
        feedbackDiv.style.color = "#d8000c";
        feedbackDiv.style.backgroundColor = "#ffbaba";
        feedbackDiv.style.border = "1px solid #d8000c";
      }
    }
  });
});
