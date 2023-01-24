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
