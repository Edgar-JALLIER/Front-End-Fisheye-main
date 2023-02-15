async function getPhotographers() {
  // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
  try {
    const res = await fetch("../../data/photographers.json");
    if (res.ok) {
      const rawJson = await res.json();
      console.log(rawJson);
      console.log(rawJson.photographers);
      console.log(rawJson.media);
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
    console.log(photographerModel);
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

// fetch("../../data/photographers.json")
//   .then(function (res) {
//     if (res.ok) {
//       return res.json();
//     }
//   })
//   .then(function (data) {
//     return data.photographers;
//     for (let photographers of data) {
//       console.log("test");
//     }
//   })
//   .catch(function (err) {
//     console.log(err);
//     alert("Une erreur est survenue, veuillez revenir plus tard");
//   });
