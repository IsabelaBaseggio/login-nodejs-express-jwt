const messageAlert = document.querySelector(".message-alert");
const closeMessage = document.querySelector("#close-message");
const about = document.querySelector("#about");
const arrow = document.querySelector(".arrow");
const arrowMood = document.querySelector(".arrowMood");
const contacts = document.querySelector(".contacts");


// message alert
if (closeMessage) {
  closeMessage.addEventListener("click", () => {
    messageAlert.style.display = "none";
  });

  setTimeout(() => {
    messageAlert.style.display = "none";
  }, 5000);
}

// toggle contacts author
if (arrow) {
  arrow.addEventListener("click", () => {
    about.classList.toggle("active");
    arrow.classList.toggle("active");
    arrowMood.classList.toggle("active");
    contacts.classList.toggle("active");
  });
}


// toggle menu < 1024px

function toggleMenu() {

  var menuToggle = document.querySelector(".toggle");
  var navigation = document.querySelector(".navigation")
  menuToggle.classList.toggle("active");
  navigation.classList.toggle("active");
}