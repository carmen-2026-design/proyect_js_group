function createCharacterArticle(character) {
    const {name, imageUrl} = character;
    
    const article = document.createElement('article');
    article.classList.add('character','card-character');
    article.dataset.productId = name;

    const characterName = document.createElement('h2');
    characterName.textContent = name;
    characterName.classList.add('character_name');

    const characterImage= document.createElement('img');
    characterImage.setAttribute("src", imageUrl);
    characterImage.setAttribute("alt", `image of ${name}`);

    const favBtn = document.createElement("button"); 
    favBtn.classList.add("btn-fav");

    const icon = document.createElement('i');
    
        if(character.favorite){
            icon.className = "fa-solid fa-heart";
            favBtn.classList.add("fav-active");

        }else{
            icon.className = "fa-regular fa-heart";

        }
            
    favBtn.appendChild(icon)

    favBtn.addEventListener("click", () => {
        character.toggleFavorite();
      

        if(character.favorite){
            icon.className = "fa-solid fa-heart";
            favBtn.classList.add("fav-active");
        }else{
            icon.className = "fa-regular fa-heart";
            favBtn.classList.remove("fav-active")

            if(!character.favorite && article.closest("#catalog-section").classList.contains("favorite-view")){
                article.remove()

            }
        }
    })



   // favBtn.addEventListener("click", () => {alert(`Te gusta ${name}`)});

    article.append(characterImage, characterName, favBtn);
    return article;

     



}

export {
    createCharacterArticle
};
