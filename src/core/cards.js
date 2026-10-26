import Character from "./Character.js";
import data from "../data/characters.json" with {type: "json"};
import Catalog from "./Catalog.js";

import { createCharacterArticle } from "../ui/renderer.js";
import { getCatalog } from  "../utils/api.js";

const CARDS_PER_PAGE = 3;


//Carga el catálogo con los personajes de la API
// const {dataCatalog,error} = await getCatalog();
// let result = dataCatalog;
// console.log(result);

// if (error){
//     alert ("ha ocurrido un error");

// }
// return{
//     total: result.total,
//     items: result.data;
// }

async function LoadCatalog(){
    
    const {data : dataCatalog,error} = await getCatalog();

    if (error){
        alert ("Ha ocurrido un error");
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
    previousButton.addEventListener("click",()=>catalogAll.previousPage());

    const nextButton = document.getElementById("next-button");
    nextButton.addEventListener("click",()=>catalogAll.nextPage());

    //Carga la primera página de personajes
    catalogAll.initializePages(CARDS_PER_PAGE,true);

    let catalogToShow = new Catalog();
    catalogToShow = catalogAll.getCharactersPage();
    catalogToShow.paintCatalog();

}

LoadCatalog();

