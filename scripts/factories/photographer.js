function photographerFactory(data) {
  const { name, portrait, city, country, id, price, tagline, image, title, likes, video } = data;

  const picture = `assets/photographers/${portrait}`;
  const photomedia = `assets/images/media/${image}`;
  const videomedia = `assets/images/media/${video}`;

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
    likeAmount.textContent = likes;

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
    divLike.appendChild(logoLike);
    divLike.appendChild(likeAmount);
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
      link.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.setAttribute("src", photomedia);
      img.setAttribute("class", "media_image");
      img.setAttribute("alt", "");
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

    return imageContainer;
  }
  return { name, picture, getUserCardDOM, getPhotographerPage, getMediaSection };
}

const bouttonEnvoyer = document.querySelector(".envoyer_button");

bouttonEnvoyer.addEventListener("click", function (e) {
  const prenom = document.querySelector("#prenom");
  const nom = document.querySelector("#nom");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");
  e.preventDefault();
  if (prenom.validity.valid === true && nom.validity.valid === true && email.validity.valid === true) {
    console.log("Prénom =", prenom.value);
    console.log("Nom =", nom.value);
    console.log("Email =", email.value);
    console.log("Message =", message.value);
  } else {
    console.log("erreur de saisie du formulaire");
  }
});
