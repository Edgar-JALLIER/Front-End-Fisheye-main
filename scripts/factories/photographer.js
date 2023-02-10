function photographerFactory(data) {
  const { name, portrait, city, country, id, price, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

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
  return { name, picture, getUserCardDOM };
}
