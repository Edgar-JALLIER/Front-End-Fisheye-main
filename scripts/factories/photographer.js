let likeTotal = 0;

const divImageContainer = document.querySelector(".lightbox_image-container");
const ImageLightbox = document.querySelector(".image-carrousel");
const descriptionLightbox = document.querySelector(".lightbox_description");
const videoLightbox = document.querySelector(".hide-video");
const bouttonDroit = document.querySelector(".lightbox_button-droite");
const bouttonGauche = document.querySelector(".lightbox_button-gauche");
const bouttonClose = document.querySelector(".lightbox_button-close");

function photographerFactory(data) {
  const { name, portrait, city, country, id, price, tagline, date, image, title, likes, video } = data;
  const picture = `assets/photographers/${portrait}`;
  const photomedia = `assets/images/media/${image}`;
  const videomedia = `assets/images/media/${video}`;

  function testCalcul() {
    if (data && data.likes) {
      likeTotal = likeTotal + data.likes;
      return likeTotal;
    }
  }

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
    likeAmount.setAttribute("class", "nombre-like");

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
    img.setAttribute("alt", `${name}`);

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
    let imageOuVideo = image ? image : video;
    const imageContainer = document.createElement("div");
    imageContainer.setAttribute("class", "media_container");
    imageContainer.setAttribute("data-post-id", `${id}`);
    imageContainer.setAttribute("data-date-publication", `${date}`);
    imageContainer.setAttribute("data-like", `${likes}`);
    imageContainer.setAttribute("data-titre", `${title}`);

    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", `card_link`);
    link.setAttribute("title", `${title}`);
    link.setAttribute("id", `${id}`);

    if (imageOuVideo.split(".").pop() === "mp4") {
      const video = document.createElement("video");
      video.setAttribute("src", videomedia);
      video.setAttribute("class", "media_video");
      video.setAttribute("title", `${title}`);
      link.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.setAttribute("src", photomedia);
      img.setAttribute("class", "media_image");
      img.setAttribute("alt", `${title}`);
      link.appendChild(img);
    }

    const textSousImg = document.createElement("div");
    textSousImg.setAttribute("class", "media_text");

    const description = document.createElement("p");
    description.setAttribute("class", "media_text-description");
    description.textContent = title;

    const divLike = document.createElement("button");
    divLike.setAttribute("class", "media_text-like");
    divLike.setAttribute("id", `likeButton-${id}`);

    const likeAmount = document.createElement("p");
    likeAmount.setAttribute("class", "nombre-de-like");
    likeAmount.textContent = likes;

    const logoLike = document.createElement("i");
    logoLike.setAttribute("class", "fa-solid fa-heart");

    imageContainer.appendChild(link);
    imageContainer.appendChild(textSousImg);
    textSousImg.appendChild(description);
    textSousImg.appendChild(divLike);
    divLike.appendChild(likeAmount);
    divLike.appendChild(logoLike);

    return imageContainer;
  }

  function addEventListenerOfPicture(maListe) {
    const liensPhoto = document.getElementById(String(id));
    liensPhoto.addEventListener("click", function (e) {
      const linkPhoto = e.target;
      openLightbox(linkPhoto, id, maListe);
    });
  }

  function addLike(maPhoto) {
    //RECUPERER UN BOUTON SELON SON ID (mesPhotos.id)
    const bouttonLike = document.getElementById(`likeButton-${String(maPhoto.id)}`);
    const amountlike = document.querySelector(".nombre-like");
    let isLike = false;
    bouttonLike.addEventListener("click", () => {
      if (isLike === false) {
        //Récupération de tous mes "nombre de like" de chaque photos et leur ajouter +1 dans le DOM
        document.querySelectorAll(`#likeButton-${String(maPhoto.id)} > .nombre-de-like`)[0].textContent = maPhoto.likes + 1;
        bouttonLike.classList.add("class", "like-active");
        //Ajout de 1 like dans la data
        maPhoto.likes += 1;
        //Affichage des likes totaux
        amountlike.innerHTML = Number(amountlike.textContent) + 1;
        isLike = true;
      } else {
        document.querySelectorAll(`#likeButton-${String(maPhoto.id)} > .nombre-de-like`)[0].textContent = maPhoto.likes - 1;
        bouttonLike.classList.remove("class", "like-active");
        //Ajout de 1 like dans la data
        maPhoto.likes -= 1;
        //Affichage des likes totaux
        amountlike.innerHTML = Number(amountlike.textContent) - 1;
        isLike = false;
      }
      getMediaSection();
    });
  }

  return { name, picture, getUserCardDOM, getPhotographerPage, getMediaSection, testCalcul, addEventListenerOfPicture, addLike };
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

function openLightbox(e, idPicture, maListe) {
  let idActuel = maListe.map((element) => element.id).indexOf(idPicture);
  //console.log(idActuel);
  //console.log(maListe[idActuel].image);
  //console.log(maListe[idActuel].title);
  const srcImage = maListe[idActuel].image;
  const srcVideo = maListe[idActuel].video;
  const description = maListe[idActuel].title;
  videoLightbox.setAttribute("id", idPicture);

  if (srcImage === undefined) {
    videoLightbox.style.display = "flex";
    videoLightbox.setAttribute("src", `assets/images/media/${srcVideo}`);
    videoLightbox.setAttribute("class", "lightbox_image-container");
  } else {
    videoLightbox.style.display = "none";
    ImageLightbox.setAttribute("src", `assets/images/media/${srcImage}`);
  }
  descriptionLightbox.innerHTML = `${description}`;

  lightbox.style.display = "flex";
  lightbox.style.overflow = "hidden";
  lightbox.setAttribute("aria-hidden", "false");
  header.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "true");
  closeLightboxBtn.focus();

  function navigationImageSuivante() {
    if (idActuel === maListe.length - 1) {
      idActuel = 0;
    } else {
      idActuel += 1;
    }
    //console.log(idActuel);
    const srcImage = maListe[idActuel].image;
    const srcVideo = maListe[idActuel].video;
    const description = maListe[idActuel].title;
    if (srcImage === undefined) {
      videoLightbox.style.display = "flex";
      videoLightbox.setAttribute("src", `assets/images/media/${srcVideo}`);
      videoLightbox.setAttribute("class", "lightbox_image-container");
      ImageLightbox.removeAttribute("src");
    } else {
      ImageLightbox.setAttribute("src", `assets/images/media/${srcImage}`);
      videoLightbox.style.display = "none";
    }
    descriptionLightbox.innerHTML = `${description}`;

    bouttonClose.addEventListener("click", function suppressionDeEvenement() {
      bouttonDroit.removeEventListener("click", navigationImageSuivante);
      bouttonClose.removeEventListener("click", suppressionDeEvenement);
    });
  }
  function navigationImagePrecedente() {
    if (idActuel === 0) {
      idActuel = maListe.length - 1;
    } else {
      idActuel -= 1;
    }
    //console.log(idActuel);
    const srcImage = maListe[idActuel].image;
    const srcVideo = maListe[idActuel].video;
    const description = maListe[idActuel].title;
    if (srcImage === undefined) {
      videoLightbox.style.display = "flex";
      videoLightbox.setAttribute("src", `assets/images/media/${srcVideo}`);
      videoLightbox.setAttribute("class", "lightbox_image-container");
      ImageLightbox.removeAttribute("src");
    } else {
      ImageLightbox.setAttribute("src", `assets/images/media/${srcImage}`);
      videoLightbox.style.display = "none";
    }
    descriptionLightbox.innerHTML = `${description}`;

    bouttonClose.addEventListener("click", function suppressionDeEvenementPrecedent() {
      bouttonGauche.removeEventListener("click", navigationImagePrecedente);
      bouttonClose.removeEventListener("click", suppressionDeEvenementPrecedent);
    });
  }

  //Appels des différentes fonction au click souris et clavier
  bouttonDroit.addEventListener("click", navigationImageSuivante);
  bouttonGauche.addEventListener("click", navigationImagePrecedente);
  window.addEventListener("keydown", function (e) {
    if (e.which === 39) {
      navigationImageSuivante();
    }
  });
  window.addEventListener("keydown", function (e) {
    if (e.which === 37) {
      navigationImagePrecedente();
    }
  });
}
