import Character from "./Character.js";
import data from "../data/characters.json" with {type: "json"};
import Catalog from "./Catalog.js";

import { createCharacterArticle } from "../ui/renderer.js";
import { getCatalog } from "../utils/api.js";

const CARDS_PER_PAGE = 9;

async function LoadCatalog() {

    const { data: dataCatalog, error } = await getCatalog();

    if (error) {
        alert("Ha ocurrido un error");
    }

    const characters = dataCatalog.data.map(c => Character.fromJson(c));

    //Carga el catálogo con los personajes del JSON
    // const characters = data.characters.map(c => Character.fromJson(c));

    const catalogAll = new Catalog();

    for (let i = 0; i < characters.length; i++) {
        catalogAll.addCharacter(characters[i]);
    }

    //Botones anterior/siguiente de la página de personajes
    const previousButton = document.getElementById("previous-button");
    previousButton.addEventListener("click", () => catalogAll.previousPage());

    const nextButton = document.getElementById("next-button");
    nextButton.addEventListener("click", () => catalogAll.nextPage());

    //Carga la primera página de personajes
    catalogAll.initializePages(CARDS_PER_PAGE, true);

    let catalogToShow = new Catalog();
    catalogToShow = catalogAll.getCharactersPage();
    catalogToShow.paintCatalog();


    //SCROLL TOP DETECTOR

    const manoArriba = document.getElementById('manoArriba');

    function scrollTop() {
        if (window.scrollY < 500) {
            manoArriba.classList.add('oculto');
        } else {
            manoArriba.classList.remove('oculto');

        }
    }
    window.addEventListener('scroll', scrollTop);
}





LoadCatalog();

