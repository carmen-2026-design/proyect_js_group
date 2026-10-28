import { createCharacterArticle } from "../ui/renderer.js";
import { getFavoritesFromLocalStorage } from "./localStorage.js";

//Colección de objetos de la clase Character
class Catalog{
    
    constructor(){
        this.characters = new Map();
        this.sectionId = "catalog-section";
    }
        
    addCharacter(character){
        //utilizamos el nombre en minúsculas como identificador del personaje
        this.characters.set((character.name).toLowerCase(), character);
    }

    paintCatalog(){
        const containerElement = document.getElementById(this.sectionId);
        containerElement.innerHTML = "";

        const htmlCatalog = document.createElement("section");

        this.characters.forEach((character) => {
            const cardElement = createCharacterArticle(character);
            htmlCatalog.appendChild(cardElement); 
        });
        containerElement.appendChild(htmlCatalog);  
       
    }  
   
    initializePages(elementsPerPage, infiniteScroll = true){
        this.currentPage = 1;
        this.elementsPerPage = elementsPerPage;
        this.infiniteScroll = infiniteScroll;
        let c = this.characters.size;
        this.totalPages = Math.ceil(this.characters.size / this.elementsPerPage);
    }
    
    getCharactersPage(){
        let catalogToShow = new Catalog();

        const firstElement = (this.currentPage -1) * this.elementsPerPage;
        const lastElement = firstElement + this.elementsPerPage;
        
        //convertir el map en array 
        const arrCharacters = Array.from(this.characters.entries());
        //Coger los elementos del array
        const arrToShow = arrCharacters.slice(firstElement, lastElement);
        //Convertir a map el array resultante
        catalogToShow.characters = new Map(arrToShow);
        return catalogToShow;
    }

    getTextPage()
    {
        let textPage = this.currentPage + " / " + this.totalPages;
        return(textPage);
    }

    nextPage(){
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            
            let catalogToShow = this.getCharactersPage();
            catalogToShow.paintCatalog();
            

            const lblNumPage = document.getElementById("num-page");
            let textPage = this.getTextPage();
            lblNumPage.innerText = textPage;
        }
    }

    previousPage(){
        if(this.currentPage > 1){
            this.currentPage--;

            let catalogToShow = this.getCharactersPage();
            catalogToShow.paintCatalog();

            const lblNumPage = document.getElementById("num-page");
            let textPage = this.getTextPage();
            lblNumPage.innerText = textPage;
    
        }
    }

    //Devuelve un nuevo catálogo con los resultados de la búsqueda
    filterCatalogByName(text){
        let catalogToShow = new Catalog();

        this.characters.forEach((character, name) => {
            if (name.toLowerCase().includes(text.toLowerCase())) {
                catalogToShow.addCharacter(character);
            }
        }); 

        return catalogToShow;
    }


     filterCatalogByFavorites(){
        const charFavorites = getFavoritesFromLocalStorage(); // Array con los objetos guardados
        let favoriteCatalog = new Catalog();

        // Recogemos los nombres de los favoritos para buscarlos rápido
        const favoriteNames = charFavorites.map(f => f.name.toLowerCase());

        this.characters.forEach((character, key) => {
            if (favoriteNames.includes(key)) {
                character.favorite = true;
                favoriteCatalog.addCharacter(character);
            }
        });

        favoriteCatalog.paintCatalog();            
    } 


    //Elimina los filtros
    removeFilters() {
        let catalogToShow = new Catalog();


        this.characters.forEach((character) => {
            
                catalogToShow.addCharacter(character);
            
        });

        catalogToShow.paintCatalog();


    }


};

export default Catalog; 
export {
     filterCatalogByFavorites
}

