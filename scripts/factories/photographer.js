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

  function calculLike() {
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
    tarifJournalier.setAttribute("tabindex", "0");

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
    article.setAttribute("tabindex", "0");

    const mainProfilContainer = document.createElement("section");
    mainProfilContainer.setAttribute("class", "main-profil-container");
    mainProfilContainer.setAttribute("tabindex", "0");

    const btnContact = document.createElement("button");
    btnContact.setAttribute("class", "contact_button");
    btnContact.setAttribute("onclick", "displayModal()");
    btnContact.setAttribute("aria-label", "Ouvrir la fiche de contact du photographe");
    btnContact.appendChild(document.createTextNode("Contactez-moi"));

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("class", "card_image");
    img.setAttribute("alt", `${name}`);
    img.setAttribute("tabindex", "0");

    const h1 = document.createElement("h1");
    h1.textContent = `${name}`;
    h1.setAttribute("class", "card_name-spe");
    h1.setAttribute("tabindex", "0");

    const location = document.createElement("p");
    location.textContent = `${city}` + ", " + `${country}`;
    location.setAttribute("class", "card_location-spe");
    location.setAttribute("tabindex", "0");

    const slogan = document.createElement("p");
    slogan.textContent = tagline;
    slogan.setAttribute("class", "card_slogan-spe");
    slogan.setAttribute("tabindex", "0");

    main.appendChild(tarifJournalier);
    divLike.appendChild(likeAmount);
    divLike.appendChild(logoLike);
    tarifJournalier.appendChild(divLike);
    tarifJournalier.appendChild(prix);
    mainProfilContainer.appendChild(article);
    article.after(btnContact);
    btnContact.after(img);
    article.appendChild(h1);
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
    divLike.setAttribute("aria-label", `Aimer la publication nommée ${title}`);
    divLike.setAttribute("aria-pressed", "false");

    const likeAmount = document.createElement("p");
    likeAmount.setAttribute("class", "nombre-de-like");
    likeAmount.textContent = likes;

    const logoLike = document.createElement("i");
    logoLike.setAttribute("class", "fa-solid fa-heart");
    logoLike.setAttribute("aria-label", "like");

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
        bouttonLike.setAttribute("aria-pressed", "true");
        //Ajout de 1 like dans la data
        maPhoto.likes += 1;
        //Affichage des likes totaux
        amountlike.innerHTML = Number(amountlike.textContent) + 1;
        isLike = true;
      } else {
        document.querySelectorAll(`#likeButton-${String(maPhoto.id)} > .nombre-de-like`)[0].textContent = maPhoto.likes - 1;
        bouttonLike.classList.remove("class", "like-active");
        bouttonLike.setAttribute("aria-pressed", "false");
        //Ajout de 1 like dans la data
        maPhoto.likes -= 1;
        //Affichage des likes totaux
        amountlike.innerHTML = Number(amountlike.textContent) - 1;
        isLike = false;
      }
    });
  }

  return { name, picture, getUserCardDOM, getPhotographerPage, getMediaSection, calculLike, addEventListenerOfPicture, addLike };
}

function openLightbox(e, idPicture, maListe) {
  let idActuel = maListe.map((element) => element.id).indexOf(idPicture);
  const srcImage = maListe[idActuel].image;
  const srcVideo = maListe[idActuel].video;
  const description = maListe[idActuel].title;
  videoLightbox.setAttribute("id", idPicture);

  if (srcImage === undefined) {
    videoLightbox.style.display = "flex";
    videoLightbox.setAttribute("src", `assets/images/media/${srcVideo}`);
    videoLightbox.setAttribute("class", "lightbox_image-container");
    videoLightbox.setAttribute("alt", `${description}`);
  } else {
    videoLightbox.style.display = "none";
    ImageLightbox.setAttribute("src", `assets/images/media/${srcImage}`);
    ImageLightbox.setAttribute("alt", `${description}`);
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
    const srcImage = maListe[idActuel].image;
    const srcVideo = maListe[idActuel].video;
    const description = maListe[idActuel].title;
    if (srcImage === undefined) {
      videoLightbox.style.display = "flex";
      videoLightbox.setAttribute("src", `assets/images/media/${srcVideo}`);
      videoLightbox.setAttribute("class", "lightbox_image-container");
      ImageLightbox.removeAttribute("src");
      ImageLightbox.removeAttribute("alt");
    } else {
      ImageLightbox.setAttribute("src", `assets/images/media/${srcImage}`);
      ImageLightbox.setAttribute("alt", `${description}`);
      videoLightbox.removeAttribute("alt");
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
    const srcImage = maListe[idActuel].image;
    const srcVideo = maListe[idActuel].video;
    const description = maListe[idActuel].title;
    if (srcImage === undefined) {
      videoLightbox.style.display = "flex";
      videoLightbox.setAttribute("src", `assets/images/media/${srcVideo}`);
      videoLightbox.setAttribute("class", "lightbox_image-container");
      ImageLightbox.removeAttribute("src");
      ImageLightbox.removeAttribute("alt");
    } else {
      ImageLightbox.setAttribute("src", `assets/images/media/${srcImage}`);
      ImageLightbox.setAttribute("alt", `${description}`);
      videoLightbox.removeAttribute("alt");
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
