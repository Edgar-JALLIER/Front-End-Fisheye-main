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
      console.log(onePhotographer);
    } else {
      throw resultat.statusText;
    }
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}
getOnePhotographer();
