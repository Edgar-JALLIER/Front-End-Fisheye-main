async function getPhotographers() {
  // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

  const repoName = window.location.pathname.startsWith("/Projet-6-FishEye")
    ? "/Projet-6-FishEye"
    : "";

  const urlGitHubPage = `${repoName}/data/photographers.json`;
  try {
    const res = await fetch(urlGitHubPage);
    if (res.ok) {
      const rawJson = await res.json();
      return rawJson.photographers;
    } else {
      throw res.statusText;
    }
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
