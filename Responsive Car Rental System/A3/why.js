document.addEventListener("DOMContentLoaded", function () {
    const bookNowButton = document.querySelector(".inline-block");
    const testimonialElement = document.querySelector(".italic");
    const customerFeedback = [
      `"The best car rental experience I've had! Simple booking, excellent service, and a smooth ride." – Sarah M.`,
      `"Amazing selection of cars and affordable prices! Highly recommend." – John D.`,
      `"Fast and easy booking, my go-to car rental company." – Emily R.`,
    ];
  
    // 1. Change testimonial content on click
    function changeTestimonial() {
      const currentTestimonial = testimonialElement.innerHTML;
      const currentIndex = customerFeedback.indexOf(currentTestimonial);
      const nextIndex = (currentIndex + 1) % customerFeedback.length;
      testimonialElement.innerHTML = customerFeedback[nextIndex];
    }
  
    // 2. Scroll to "Ready to Book" section
    function scrollToBooking() {
      const bookingSection = document.querySelector("section.bg-orange-600");
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  
    // 3. Change "Book Now" button text on hover
    function changeButtonText() {
      bookNowButton.innerText = "Reserve Now";
    }
  
    // 4. Revert "Book Now" button text
    function revertButtonText() {
      bookNowButton.innerText = "Book Now";
    }
  
    // 5. Highlight "Why Choose Us?" section
    function highlightWhyChooseUs() {
      document.querySelector("section.text-center").style.border = "2px solid orange";
    }
  
    // 6. Reset highlight in "Why Choose Us?"
    function resetHighlight() {
      document.querySelector("section.text-center").style.border = "none";
    }
  
    // 7. Show alert on 'Sign Up' button click
    function showSignUpAlert() {
      alert("Sign Up clicked!");
    }
  
    // 8. Show alert on 'Sign In' button click
    function showSignInAlert() {
      alert("Sign In clicked!");
    }
  
    // 9. Show confirmation before navigating to booking
    function confirmBookingRedirect() {
      const confirmation = confirm("Are you sure you want to book now?");
      if (confirmation) window.location.href = "booking.html";
    }
  
    // 10. Change header logo color on scroll
    function changeLogoColorOnScroll() {
      const header = document.querySelector("header");
      window.scrollY > 50 ? header.classList.add("bg-gray-100") : header.classList.remove("bg-gray-100");
    }
  
    // Event listeners
    bookNowButton.addEventListener("click", confirmBookingRedirect);
    bookNowButton.addEventListener("mouseover", changeButtonText);
    bookNowButton.addEventListener("mouseout", revertButtonText);
    document.querySelector("section.bg-orange-50").addEventListener("click", changeTestimonial);
    document.querySelector("section.bg-orange-600").addEventListener("click", scrollToBooking);
    document.querySelector("li button:first-child").addEventListener("click", showSignUpAlert);
    document.querySelector("li button:last-child").addEventListener("click", showSignInAlert);
    window.addEventListener("scroll", changeLogoColorOnScroll);
    document.querySelector("section.text-center").addEventListener("mouseover", highlightWhyChooseUs);
    document.querySelector("section.text-center").addEventListener("mouseout", resetHighlight);
  });
  