//Mettre le code JavaScript lié à la page photographer.html
const urlActuel = window.location.href;
const url = new URL(urlActuel);
const idPhotographer = url.searchParams.get("id");

async function getOnePhotographer() {
  try {
    const resultat = await fetch("../../data/photographers.json");
    if (resultat.ok) {
      const resJson = await resultat.json();
      const allPhotographers = resJson.photographers;
      console.log(allPhotographers);
      const onePhotographer = allPhotographers.find((element) => element.id === Number(idPhotographer));
      return onePhotographer;
    } else {
      throw resultat.statusText;
    }
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}

async function getMedia() {
  try {
    const resultat = await fetch("../../data/photographers.json");
    if (resultat.ok) {
      const resJson = await resultat.json();
      const allMedia = resJson.media;
      const mediaId = allMedia.filter((element) => element.photographerId === Number(idPhotographer));
      return mediaId;
    } else {
      throw resultat.statusText;
    }
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}
function envoiDesdonnéesDuPhotographe(infosPhotographe) {
  const photographersHeader = document.querySelector(".photograph-header");

  const photographerModel = photographerFactory(infosPhotographe);
  const photographerPage = photographerModel.getPhotographerPage();
  photographersHeader.appendChild(photographerPage);
}

async function envoiDesdonnéesDesMedia(medias) {
  const photographersMedia = document.querySelector(".photograph-media");

  medias.forEach((media) => {
    const mediaModel = photographerFactory(media);
    const photographerMedia = mediaModel.getMediaSection();
    photographersMedia.appendChild(photographerMedia);
  });
}

const bouttonLike = document.querySelectorAll(".media_text-like");
function test() {
  //   // await photographerFactory();
  console.log(bouttonLike);
}

async function initialisation() {
  // Récupère les datas des photographes
  const photographe = await getOnePhotographer();
  const media = await getMedia();
  console.log(photographe);
  console.log(media);
  envoiDesdonnéesDuPhotographe(photographe);
  envoiDesdonnéesDesMedia(media);
}

initialisation();
test();
