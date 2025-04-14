document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const locationInput = document.getElementById("location");
    const pickupDateInput = document.getElementById("pickup-date");
    const returnDateInput = document.getElementById("return-date");
    const carTypeSelect = document.getElementById("car-type");
  
    // 1. Validate all fields
    function validateForm() {
      if (!locationInput.value || !pickupDateInput.value || !returnDateInput.value || !carTypeSelect.value) {
        alert("Please fill in all fields.");
        return false;
      }
      if (new Date(pickupDateInput.value) > new Date(returnDateInput.value)) {
        alert("Return date must be after pick-up date.");
        return false;
      }
      return true;
    }
  
    // 2. Show alert on successful form submission
    function showSuccessMessage() {
      alert("Booking Successful!");
    }
  
    // 3. Handle form submission
    function handleFormSubmit(event) {
      event.preventDefault();
      if (validateForm()) {
        showSuccessMessage();
        form.reset();
      }
    }
  
    // 4. Disable past dates for pick-up and return
    function disablePastDates() {
      const today = new Date().toISOString().split("T")[0];
      pickupDateInput.setAttribute("min", today);
      returnDateInput.setAttribute("min", today);
    }
  
    // 5. Reset form on cancel
    function resetForm() {
      form.reset();
    }
  
    // 6. Display error message for empty fields
    function showErrorMessage(field) {
      if (!field.value) {
        alert(`Please enter a valid ${field.previousElementSibling.textContent}`);
      }
    }
  
    // 7. Highlight invalid fields
    function highlightInvalidField(field) {
      field.style.borderColor = "red";
    }
  
    // 8. Remove highlight from valid fields
    function removeHighlight(field) {
      field.style.borderColor = "#ccc";
    }
  
    // 9. Enable or disable 'Book Now' button based on form completion
    function toggleBookButton() {
      const bookButton = form.querySelector("button[type='submit']");
      bookButton.disabled = !validateForm();
    }
  
    // 10. Handle input change for field validation and button toggle
    function handleInputChange() {
      toggleBookButton();
      removeHighlight(locationInput);
      removeHighlight(pickupDateInput);
      removeHighlight(returnDateInput);
      removeHighlight(carTypeSelect);
    }
  
    form.addEventListener("submit", handleFormSubmit);
    form.addEventListener("input", handleInputChange);
    locationInput.addEventListener("blur", () => showErrorMessage(locationInput));
    pickupDateInput.addEventListener("blur", () => showErrorMessage(pickupDateInput));
    returnDateInput.addEventListener("blur", () => showErrorMessage(returnDateInput));
  
    disablePastDates();
  });
  