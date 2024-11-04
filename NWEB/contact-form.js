document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Show sending status
      formStatus.textContent = "Sending message...";
      formStatus.className = "form-status sending";

      // Get form data
      const formData = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
      };

      try {
        // You would replace this URL with your actual backend endpoint
        const response = await fetch("https://your-backend-api.com/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Show success message
          formStatus.textContent =
            "Message sent successfully! We'll get back to you soon.";
          formStatus.className = "form-status success";

          // Clear form
          form.reset();

          // Hide success message after 5 seconds
          setTimeout(() => {
            formStatus.style.display = "none";
          }, 5000);
        } else {
          throw new Error("Failed to send message");
        }
      } catch (error) {
        // Show error message
        formStatus.textContent =
          "Failed to send message. Please try again later.";
        formStatus.className = "form-status error";

        // Log error for debugging
        console.error("Error:", error);
      }
    });
  }

  // Basic form validation
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("invalid", function (e) {
      e.preventDefault();
      this.classList.add("error");
    });

    input.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        this.classList.remove("error");
      }
    });
  });
});
