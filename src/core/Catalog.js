import Character from "./Character.js";

//Colección de objetos de la clase Character
class Catalog{
    
    constructor(){
        this.characters = new Map();
    }

    addCharacter(character){
        //utilizamos el nombre como identificador del personaje
        this.characters.set(character.name, character);
    }

    paintCatalog(){
        const htmlCatalog = "";

        this.characters.forEach(characters => {
            htmlCatalog += Character.paintCharacter();
        })
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

