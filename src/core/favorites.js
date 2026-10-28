
import Catalog from "./Catalog.js";
import Character from "./character.js";
import { getFavoritesFromLocalStorage } from "./localStorage.js";



// 1. Creamos un catálogo exclusivo para favoritos
const favoritesCatalog = new Catalog();

favoritesCatalog.filterCatalogByFavorites();

// // 2. Obtenemos los favoritos guardados
// const savedFavorites = getFavoritesFromLocalStorage();

// // 3. Si hay favoritos, los reconstruimos y los añadimos al catálogo
// if (savedFavorites) {
//     savedFavorites.forEach(favData => {
//         const character = Character.fromJson(favData);
//         character.favorite = true; // Nos aseguramos de que estén marcados
//         favoritesCatalog.addCharacter(character);
//     });
// }

// // 4. Los pintamos en el HTML de favoritos
// favoritesCatalog.paintCatalog(); 
 


/* 
 function loadFavorites(){
        
        let favoriteCatalog = new Catalog();

        favoriteCatalog.filterCatalogByFavorites();            
    };
    
    loadFavorites();  */