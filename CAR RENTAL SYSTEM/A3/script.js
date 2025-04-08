'use strict';

// ? NAVBAR TOGGLE

const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const header = document.querySelector("[data-header]");

// Function to toggle the navigation menu
const navToggleFunc = function () {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Function to close the navbar
const closeNavbar = function () {
  navToggleBtn.classList.remove("active");
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

// Function to handle navbar link clicks
const handleNavLinkClick = function () {
  closeNavbar();
}

// Function to add event listeners to navbar links
const addNavLinkListeners = function () {
  navbarLinks.forEach(link => {
    link.addEventListener("click", handleNavLinkClick);
  });
}

// Function to handle scroll event for header
const handleScroll = function () {
  window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");
}

// Function to initialize event listeners
const initEventListeners = function () {
  navToggleBtn.addEventListener("click", navToggleFunc);
  overlay.addEventListener("click", closeNavbar);
  addNavLinkListeners();
  window.addEventListener("scroll", handleScroll);
}

// Function to display a message when the page is loaded
const displayWelcomeMessage = function () {
  console.log("Welcome to Alpha97 Car Rental!");
}

// Function to validate the search form
const validateSearchForm = function () {
  const carModelInput = document.querySelector('input[name="car-model"]');
  const monthlyPayInput = document.querySelector('input[name="monthly-pay"]');
  const yearInput = document.querySelector('input[name="year"]');

  if (!carModelInput.value || !monthlyPayInput.value || !yearInput.value) {
    alert("Please fill in all fields.");
    return false;
  }
  return true;
}

// Function to handle form submission
const handleFormSubmit = function (event) {
  event.preventDefault(); // Prevent default form submission
  if (validateSearchForm()) {
    alert("Searching for cars...");
    // Add your search logic here
  }
}

// Function to initialize the search form
const initSearchForm = function () {
  const searchForm = document.querySelector('.hero-form');
  searchForm.addEventListener('submit', handleFormSubmit);
}

// Initialize all functions
const init = function () {
  initEventListeners();
  initSearchForm();
  displayWelcomeMessage();
}

// Call the init function to set everything up
init();