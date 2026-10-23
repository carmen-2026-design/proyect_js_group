import { createCharacterArticle } from "../ui/renderer.js";

//Colección de objetos de la clase Character
class Catalog{
    
    constructor(){
        this.characters = new Map();
    }

    addCharacter(character){
        //utilizamos el nombre como identificador del personaje
        this.characters.set(character.name, character);
    }

    paintCatalog(containerElement){
        containerElement.innerHTML = "";

        const htmlCatalog = document.createElement("section");

        this.characters.forEach((character) => {
            const cardElement = createCharacterArticle(character);
        htmlCatalog.appendChild(cardElement); 
        });
        containerElement.appendChild(htmlCatalog);  
    }

    //Devuelve un nuevo catálogo con los resultados de la búsqueda
    filterCatalogByName(text){
        let filteredCatalog = new Catalog();

        this.characters.forEach((character, name) => {
            if (name.toLowerCase().includes(text.toLowerCase())) {
                filteredCatalog.addCharacter(character);
            }
        }); 

        return filteredCatalog;
    }
};

export default Catalog; 
