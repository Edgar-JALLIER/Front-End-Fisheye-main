let likeTotal = 0;

function photographerFactory(data) {
  const { name, portrait, city, country, id, price, tagline, image, title, likes, video } = data;
  const picture = `assets/photographers/${portrait}`;
  const photomedia = `assets/images/media/${image}`;
  const videomedia = `assets/images/media/${video}`;

  if (data && data.likes) {
    likeTotal = likeTotal + data.likes;
  }

  console.log("fonction", likeTotal);

  function getUserCardDOM() {
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.setAttribute("href", `./photographer.html?id=${id}`);
    link.setAttribute("class", "card_link");
    link.setAttribute("title", "Visiter la page de " + `${name}`);

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("class", "card_image");
    img.setAttribute("alt", "Profil de " + `${name}` + " - Aller voir sa page");

    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.setAttribute("class", "card_name");

    const location = document.createElement("p");
    location.textContent = `${city}` + ", " + `${country}`;
    location.setAttribute("class", "card_location");

    const slogan = document.createElement("p");
    slogan.textContent = tagline;
    slogan.setAttribute("class", "card_slogan");

    const prix = document.createElement("p");
    prix.textContent = `${price}` + "€/jour";
    prix.setAttribute("class", "card_prix");

    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(location);
    article.appendChild(slogan);
    article.appendChild(prix);
    return article;
  }

  function getPhotographerPage() {
    const titreContact = document.querySelector(".titre_contact");
    titreContact.innerHTML = "Contactez-moi " + "<br>" + `${name}`;
    const main = document.getElementById("main");

    const tarifJournalier = document.createElement("div");
    tarifJournalier.setAttribute("class", "encart");

    const divLike = document.createElement("div");
    divLike.setAttribute("class", "encart_div-like");

    const likeAmount = document.createElement("p");
    likeAmount.textContent = likeTotal;

    const logoLike = document.createElement("i");
    logoLike.setAttribute("class", "fa-solid fa-heart");

    const prix = document.createElement("p");
    prix.setAttribute("class", "encart_prix");
    prix.textContent = `${price}` + "€ / jour";

    const article = document.createElement("article");

    const mainProfilContainer = document.createElement("section");
    mainProfilContainer.setAttribute("class", "main-profil-container");

    const btnContact = document.createElement("button");
    btnContact.setAttribute("class", "contact_button");
    btnContact.setAttribute("onclick", "displayModal()");
    btnContact.appendChild(document.createTextNode("Contactez-moi"));

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("class", "card_image");
    img.setAttribute("alt", "");

    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.setAttribute("class", "card_name-spe");

    const location = document.createElement("p");
    location.textContent = `${city}` + ", " + `${country}`;
    location.setAttribute("class", "card_location-spe");

    const slogan = document.createElement("p");
    slogan.textContent = tagline;
    slogan.setAttribute("class", "card_slogan-spe");

    main.appendChild(tarifJournalier);
    divLike.appendChild(likeAmount);
    divLike.appendChild(logoLike);
    tarifJournalier.appendChild(divLike);
    tarifJournalier.appendChild(prix);
    mainProfilContainer.appendChild(article);
    article.after(btnContact);
    btnContact.after(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(slogan);
    return mainProfilContainer;
  }

  function getMediaSection() {
    const imageContainer = document.createElement("div");
    imageContainer.setAttribute("class", "media_container");

    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "card_link");
    link.setAttribute("title", `${title}`);

    if (image === undefined) {
      const video = document.createElement("video");
      video.setAttribute("src", videomedia);
      video.setAttribute("class", "media_video");
      video.setAttribute("title", `${title}`);
      link.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.setAttribute("src", photomedia);
      img.setAttribute("class", "media_image");
      img.setAttribute("alt", "");
      img.setAttribute("title", `${title}`);
      link.appendChild(img);
    }

    const textSousImg = document.createElement("div");
    textSousImg.setAttribute("class", "media_text");

    const description = document.createElement("p");
    description.setAttribute("class", "media_text-description");
    description.textContent = title;

    const divLike = document.createElement("button");
    divLike.setAttribute("class", "media_text-like");

    const likeAmount = document.createElement("p");
    likeAmount.textContent = likes;

    const logoLike = document.createElement("i");
    logoLike.setAttribute("class", "fa-solid fa-heart");

    imageContainer.appendChild(link);
    imageContainer.appendChild(textSousImg);
    textSousImg.appendChild(description);
    textSousImg.appendChild(divLike);
    divLike.appendChild(likeAmount);
    divLike.appendChild(logoLike);

    const bouttonLike = document.querySelectorAll(".media_text-like");
    const lightboxModal = document.querySelector(".lightbox_modal");
    const liensPhoto = document.querySelectorAll(".card_link");
    liensPhoto.forEach((lien) => {
      lien.addEventListener("click", function (e) {
        const linkPhoto = e.target;
        openLightbox(linkPhoto);
      });
    });

    return imageContainer;
  }
  return { name, picture, getUserCardDOM, getPhotographerPage, getMediaSection };
}

const bouttonEnvoyer = document.querySelector(".envoyer_button");
const errorNom = document.querySelector(".error_nom");
const errorPrenom = document.querySelector(".error_prenom");
const errorEmail = document.querySelector(".error_email");
const prenom = document.querySelector("#prenom");
const nom = document.querySelector("#nom");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

nom.addEventListener("change", function () {
  if (nom.validity.valid === false) {
    nom.ariaInvalid = true;
    nom.style.border = "3px solid red";
    errorNom.innerHTML = "Veuillez entrer un nom valide";
  } else {
    nom.ariaInvalid = false;
    nom.style.border = "3px solid green";
    errorNom.innerHTML = "";
  }
});

prenom.addEventListener("change", function () {
  if (prenom.validity.valid === false) {
    prenom.ariaInvalid = true;
    prenom.style.border = "3px solid red";
    errorPrenom.innerHTML = "Veuillez entrer un prénom valide";
  } else {
    prenom.ariaInvalid = false;
    prenom.style.border = "3px solid green";
    errorPrenom.innerHTML = "";
  }
});

email.addEventListener("change", function () {
  if (email.validity.valid === false) {
    email.ariaInvalid = true;
    email.style.border = "3px solid red";
    errorEmail.innerHTML = "Veuillez entrer un Email valide";
  } else {
    email.ariaInvalid = false;
    email.style.border = "3px solid green";
    errorEmail.innerHTML = "";
  }
});

bouttonEnvoyer.addEventListener("click", function (e) {
  e.preventDefault();
  if (prenom.validity.valid === true && nom.validity.valid === true && email.validity.valid === true) {
    console.log("Prénom =", prenom.value);
    console.log("Nom =", nom.value);
    console.log("Email =", email.value);
    console.log("Message =", message.value);
  } else {
    alert("Veuillez remplir les champs manquants");
  }
});

const divImageContainer = document.querySelector(".lightbox_image-container");
const ImageLightbox = document.querySelector(".image-carrousel");
const descriptionLightbox = document.querySelector(".lightbox_description");
const videoLightbox = document.querySelector(".hide-video");

function openLightbox(e) {
  const srcImage = e.getAttribute("src");
  const description = e.getAttribute("title");
  const extension = srcImage.split(".").pop();
  if (extension === "mp4") {
    console.log("test vidéo");
    videoLightbox.setAttribute("src", srcImage);
    videoLightbox.setAttribute("class", "lightbox_image-container");
  } else {
    console.log("test photo");
    ImageLightbox.setAttribute("src", `${srcImage}`);
  }
  descriptionLightbox.innerHTML = `${description}`;
  lightbox.style.display = "flex";
  lightbox.style.overflow = "hidden";
  lightbox.setAttribute("aria-hidden", "false");
  header.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "true");
  closeLightboxBtn.focus();
}

console.log(likeTotal);
// for (let i = 0; i > data.length; i++) {
//   console.log("test");
// }
