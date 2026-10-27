import Character from "./Character.js";
// import data from "../data/characters.json" with {type: "json"};
import Catalog from "./Catalog.js";
import { createCharacterArticle } from "../ui/renderer.js";
import { getCatalog } from "../utils/api.js";

const PAGES_NUMBER_API = 1; //PAGE_SIZE_API = 500;

const CARDS_PER_PAGE = 9;

async function LoadCatalog() {
    let catalogAll = new Catalog();
    catalogAll = await getCatalogAll();

    //Botones anterior/siguiente de la página de personajes
    const previousButton = document.getElementById("previous-button");
    previousButton.addEventListener("click", () => catalogAll.previousPage());

    const nextButton = document.getElementById("next-button");
    nextButton.addEventListener("click", () => catalogAll.nextPage());

    //Boton favoritos
    const btnFavorites = document.getElementById("filter-favorites-btn");
    btnFavorites.addEventListener("click", () => catalogAll.filterCatalogByFavorites());

    //Boton eliminar filtros
    const btnEliminarFiltros = document.getElementById("quitar-filtros");
    btnEliminarFiltros.addEventListener("click", () => catalogAll.removeFilters() );

    //Carga la primera página de personajes
    catalogAll.initializePages(CARDS_PER_PAGE, true);

    let catalogToShow = new Catalog();
    catalogToShow = catalogAll.getCharactersPage();
    catalogToShow.paintCatalog();

    //Label con el número de página
    const lblNumPage = document.getElementById("num-page");
    lblNumPage.innerText = catalogAll.getTextPage();
      

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

async function getCatalogAll(){

    const catalogAll = new Catalog();
       
    for (let page = 1; page <= PAGES_NUMBER_API; page++)
    {
        const { data: dataCatalog, error } = await getCatalog(page);
    
        if (error) {
            alert("Ha ocurrido un error");
        }

        const characters = dataCatalog.data.map(c => Character.fromJson(c));

        //Carga el catálogo con los personajes del JSON
        // const characters = data.characters.map(c => Character.fromJson(c));
        
        for (let i = 0; i < characters.length; i++) {
            catalogAll.addCharacter(characters[i]);
        }
    }

    return catalogAll;
}


LoadCatalog();

