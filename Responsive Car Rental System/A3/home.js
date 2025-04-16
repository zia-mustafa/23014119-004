// 1. Highlight nav link on hover
function highlightNavLinks() {
    document.querySelectorAll("nav a").forEach(link => {
      link.addEventListener("mouseover", () => link.classList.add("font-semibold"));
      link.addEventListener("mouseout", () => link.classList.remove("font-semibold"));
    });
  }
  
  // 2. Toggle dark mode
  function toggleDarkMode() {
    document.body.classList.toggle("bg-gray-900");
    document.body.classList.toggle("text-white");
  }
  
  // 3. Animate hero on load
  function animateHero() {
    const hero = document.querySelector(".hero");
    hero.classList.add("transition", "duration-700", "opacity-0");
    setTimeout(() => hero.classList.remove("opacity-0"), 100);
  }
  
  // 4. Validate booking form
  function validateBookingForm() {
    const inputs = document.querySelectorAll(".booking input");
    let isValid = true;
    inputs.forEach(input => {
      if (!input.value) {
        input.classList.add("border-red-500");
        isValid = false;
      } else {
        input.classList.remove("border-red-500");
      }
    });
    if (isValid) alert("Booking submitted!");
  }
  
  // 5. Add click event to submit button
  function handleSubmit() {
    document.querySelector(".submit-btn").addEventListener("click", validateBookingForm);
  }
  
  // 6. Animate store badges on hover
  function animateStoreButtons() {
    document.querySelectorAll(".hero a img").forEach(img => {
      img.addEventListener("mouseover", () => img.classList.add("scale-110", "transition"));
      img.addEventListener("mouseout", () => img.classList.remove("scale-110"));
    });
  }
  
  // 7. Show alert on logo click
  function logoClickAlert() {
    document.querySelector(".logo img").addEventListener("click", () => {
      alert("Welcome to CarRental!");
    });
  }
  
  // 8. Responsive font resize
  function responsiveFont() {
    if (window.innerWidth < 640) {
      document.querySelector("h1").classList.remove("text-4xl");
      document.querySelector("h1").classList.add("text-2xl");
    }
  }
  
  // 9. Toggle visibility of booking section
  function toggleBookingSection() {
    document.querySelector(".submit-btn").addEventListener("dblclick", () => {
      document.querySelector(".booking").classList.toggle("hidden");
    });
  }
  
  // 10. Initialize all functions on load
  function initHomePage() {
    highlightNavLinks();
    handleSubmit();
    animateHero();
    animateStoreButtons();
    logoClickAlert();
    responsiveFont();
    toggleBookingSection();
  }
  document.addEventListener("DOMContentLoaded", initHomePage);
  