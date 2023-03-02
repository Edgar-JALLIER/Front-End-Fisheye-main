const main = document.querySelector("#main");
const header = document.querySelector(".header-accueil");
const modal = document.querySelector("#contact_modal");
const body = document.querySelector("#body");
const closeModalBtn = document.querySelector(".close-modal");
const openModalBtn = document.querySelector(".contact_button");
const closeLightboxBtn = document.querySelector(".lightbox_button-close");
const lightbox = document.querySelector(".lightbox_modal");
const btnDropdown = document.querySelector(".trieur_dropdown-button");
const iconDropdown = document.querySelector("#icon-fleche");
const listDropdown = document.querySelector(".trieur_dropdown-menu");

let isOpen = false;
btnDropdown.addEventListener("click", function () {
  if (isOpen === false) {
    iconDropdown.classList.add("trieur_button-icon-moove");
    listDropdown.classList.remove("hide");
    isOpen = true;
  } else {
    iconDropdown.classList.remove("trieur_button-icon-moove");
    listDropdown.classList.add("hide");
    isOpen = false;
  }
});

closeModalBtn.addEventListener("click", function () {
  closeModal();
});

closeLightboxBtn.addEventListener("click", function () {
  closeLighbox();
});

function displayModal() {
  modal.style.display = "block";
  body.style.overflow = "hidden";
  modal.setAttribute("aria-hidden", "false");
  header.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "true");
  closeModalBtn.focus();
}

function closeLighbox() {
  lightbox.style.display = "none";
  body.style.overflow = "";
  lightbox.setAttribute("aria-hidden", "true");
  header.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "false");
  ImageLightbox.removeAttribute("src");
  videoLightbox.removeAttribute("src");
  //videoLightbox.classList.add("hide");
}

function closeModal() {
  modal.style.display = "none";
  body.style.overflow = "";
  modal.setAttribute("aria-hidden", "true");
  header.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "false");
}
const keyCodes = {
  escape: 27,
  enter: 13,
};
closeModalBtn.addEventListener("keydown", function (e) {
  if (e.which === keyCodes.escape) {
    closeModal();
  }
});

closeLightboxBtn.addEventListener("keydown", function (e) {
  if (e.which === keyCodes.escape) {
    closeLighbox();
  }
});
