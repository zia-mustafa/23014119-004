document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const form = document.querySelector("form");
  
    // 1. Validate name input
    function validateName() {
      if (nameInput.value.trim().length < 3) {
        alert("Name must be at least 3 characters long.");
        return false;
      }
      return true;
    }
  
    // 2. Validate email input
    function validateEmail() {
      const email = emailInput.value.trim();
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
      }
      return true;
    }
  
    // 3. Validate message input
    function validateMessage() {
      if (messageInput.value.trim().length < 10) {
        alert("Message must be at least 10 characters.");
        return false;
      }
      return true;
    }
  
    // 4. Highlight input on focus
    function highlightInput(e) {
      e.target.classList.add("ring-2", "ring-orange-500");
    }
  
    // 5. Remove highlight on blur
    function removeHighlight(e) {
      e.target.classList.remove("ring-2", "ring-orange-500");
    }
  
    // 6. Show alert on successful validation
    function showSuccess() {
      alert("Message sent successfully!");
    }
  
    // 7. Handle form submission
    function handleSubmit(e) {
      if (!validateName() || !validateEmail() || !validateMessage()) {
        e.preventDefault();
      } else {
        showSuccess();
      }
    }
  
    // 8. Clear form after submission
    function clearForm() {
      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
    }
  
    // 9. Auto-fill for demo (optional)
    function autofillDemo() {
      nameInput.value = "Jane Doe";
      emailInput.value = "jane@example.com";
      messageInput.value = "I have a question about your rental services.";
    }
  
    // 10. Trigger autofill on double click on form
    form.addEventListener("submit", handleSubmit);
    form.addEventListener("dblclick", autofillDemo);
    [nameInput, emailInput, messageInput].forEach((input) => {
      input.addEventListener("focus", highlightInput);
      input.addEventListener("blur", removeHighlight);
    });
  });
  