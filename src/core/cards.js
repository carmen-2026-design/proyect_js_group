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


console.log("***********Coleccion de catalogos: " + catalogAll.characters.size);
console.log(catalogAll);

//Filtrado del catálogo por texto del nombre
let catalogFilter = new Catalog();
catalogFilter = catalogAll.filterCatalogByName('Captain');
console.log("***********Coleccion filtrada: " + catalogFilter.characters.size);
// console.log(catalogFilter.size);
console.log(catalogFilter);

document.addEventListener('DOMContentLoaded',() => {
    const container = document.getElementById("catalog-section");
    if (container){
        catalogAll.paintCatalog(container);
    } else {
        console.warn("No se encontrado el contenedor de la sección");
    }
})




//SCROLL TOP DETECTOR

const manoArriba = document.getElementById('manoArriba');

function scrollTop (){
    if (window.scrollY < 500){
      manoArriba.classList.add('oculto');  
    }else{
           manoArriba.classList.remove('oculto');  
  
    }
}
window.addEventListener('scroll', scrollTop);