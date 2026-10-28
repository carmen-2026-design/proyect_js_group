function  getFavoritesFromLocalStorage(){
    //Si no exite el localStorage, devuelve null
    const favoritesString = localStorage.getItem("favorites" || "[]");
    const favorites = JSON.parse(favoritesString);
    return favorites;
}

function saveFavoritesToLocalStofare(favorites){
    const favoritesString =JSON.stringify(favorites);
    localStorage.setItem("favorites", favoritesString);
}

function clearFavorites(favorites){
    localStorage.setItem("favorites", "[]");
}

function addToFavorites(element){
    const favorites = getFavoritesFromLocalStorage();
    const oldFavorite = favorites.find(f=>f.name === element.name);
    if (!oldFavorite){
        favorites.push(element);
        saveFavoritesToLocalStofare(favorites);
    }
}

function removeFavorite(element){
    const favorites = getFavoritesFromLocalStorage();
    const oldFavoriteIndex = favorites.findIndex(f=>f.name === element.name);
    if (oldFavoriteIndex !== -1){
        favorites.splice(oldFavoriteIndex,1);
        saveFavoritesToLocalStofare(favorites);
    }
}

//Añadir o quitar del localStorage 
function toggleFavorites(element){
    let result = false;
    const favorites = getFavoritesFromLocalStorage();
    const oldFavoriteIndex = favorites.findIndex(f=>f.name === element.name);
    if (oldFavoriteIndex === -1){
        favorites.push(element);
        result = true;
    }else{
        favorites.splice(oldFavoriteIndex,1);
    }
    saveFavoritesToLocalStofare(favorites);
    return result;
}

function isInFavorites(element){
    const favorites = getFavoritesFromLocalStorage();
    const oldFavorite = favorites.find(f=>f.name === element.name);
    if (oldFavorite){
        return true;
    }else{
        return false;
    }
}

export {
    getFavoritesFromLocalStorage,
    saveFavoritesToLocalStofare,
    clearFavorites,
    addToFavorites,
    removeFavorite,
    toggleFavorites,
    isInFavorites
}

