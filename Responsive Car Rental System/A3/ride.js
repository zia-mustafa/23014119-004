// ride.js

function rentNow() {
  window.location.href = "booking.html";
}


// Function 1: Log when page loads
function logPageLoad() {
  console.log("Ride page loaded");
}

// Function 2: Get all "Rent Now" buttons
function getRentButtons() {
  return document.querySelectorAll(".ride-card button");
}

 // Toggle nav menu on mobile
 document.getElementById('menu-toggle').addEventListener('click', function () {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.toggle('hidden');
});

// Function 3: Navigate to booking page
function goToBookingPage() {
  window.location.href = "booking.html";
}

// Function 4: Highlight selected card
function highlightCard(card) {
  clearHighlights();
  card.classList.add("selected");
}

// Function 5: Clear all highlights
function clearHighlights() {
  document.querySelectorAll(".ride-card").forEach(c => {
    c.classList.remove("selected");
  });
}

// Function 6: Add event listeners to cards
function enableCardSelection() {
  document.querySelectorAll(".ride-card").forEach(card => {
    card.addEventListener("click", () => highlightCard(card));
  });
}

// Function 7: Show ride name on button click
function showRideName(e) {
  const rideName = e.target.parentElement.querySelector("h3").innerText;
  alert(`You selected: ${rideName}`);
}

// Function 8: Attach click event to buttons
function attachButtonEvents() {
  getRentButtons().forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault(); // Prevent unwanted form submission
      showRideName(e);
      goToBookingPage();
    });
  });
}

// Function 9: Animate cards on hover
function addHoverEffect() {
  document.querySelectorAll(".ride-card").forEach(card => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "scale(1.02)";
    });
    card.addEventListener("mouseout", () => {
      card.style.transform = "scale(1)";
    });
  });
}

// Function 10: Initialize all features
function initRidePage() {
  enableCardSelection();
  attachButtonEvents();
  addHoverEffect();
}

// Mobile Navbar Toggle
function setupNavbarToggle() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("hidden");
    });
  }
}

// Run everything after DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  logPageLoad();
  setupNavbarToggle();
  initRidePage();
});
