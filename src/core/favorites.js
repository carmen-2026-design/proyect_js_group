import Character from "./Character.js";
import Catalog from "./Catalog.js";
import {  renderFilterForm, renderCharacterSortSelect } from "../ui/renderer.js";
import { getCatalog } from "../utils/api.js";
import {  getUniqueValues, sortCharacters } from "../utils/functions.js";

const PAGES_NUMBER_API = 1; 
const CARDS_PER_PAGE = 9;

async function LoadCatalog() {

    const [catalogAll, characters] = await getCatalogAll();
    
    //Carga la primera página de personajes
    catalogAll.initializePages(CARDS_PER_PAGE, true);
    
    let favoritesCatalog = new Catalog();
    favoritesCatalog = catalogAll.filterCatalogByFavorites();
}

async function getCatalogAll() {

    const catalogAll = new Catalog();
    let allCharacters = [];

    for (let page = 1; page <= PAGES_NUMBER_API; page++) {
        const { data: dataCatalog, error } = await getCatalog(page);

        if (error) {
            alert("Ha ocurrido un error");
        }

        const characters = dataCatalog.data.map(c => Character.fromJson(c));

        //Carga el catálogo con los personajes del JSON
        // const characters = data.characters.map(c => Character.fromJson(c));

        for (let i = 0; i < characters.length; i++) {
            catalogAll.addCharacter(characters[i]);

            allCharacters.push(characters[i]);
        }
    }

    return [catalogAll, allCharacters];
}


LoadCatalog();