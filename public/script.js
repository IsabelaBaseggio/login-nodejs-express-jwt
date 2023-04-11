const messageAlert = document.querySelector(".message-alert");
const closeMessage = document.querySelector("#close-message");

if (closeMessage) {
  closeMessage.addEventListener("click", () => {
    messageAlert.style.display = "none";
  });

  setTimeout(() => {
    messageAlert.style.display = "none";
  }, 5000);
}


// toggle menu < 992px

function toggleMenu() {

  var menuToggle = document.querySelector(".toggle");
  var navigation = document.querySelector(".navigation")
  menuToggle.classList.toggle("active");
  navigation.classList.toggle("active");
}