function createCharacterArticle({name, imageUrl}) {
    
    const article = document.createElement('article');
    article.classList.add('character','card-character');
    article.dataset.productId = name;

    const characterName = document.createElement('h2');
    characterName.textContent = name;
    characterName.classList.add('character_name');

    const characterImage= document.createElement('img');
    characterImage.setAttribute("src", imageUrl);
    characterImage.setAttribute("alt", `image of ${name}`);

    const favBtn = document.createElement('button');
    favBtn.textContent = "Me gusta";

    favBtn.addEventListener("click", () => {alert(`Te gusta ${name}`)});

    article.append(characterImage, characterName, favBtn);
    return article;



}

export {
    createCharacterArticle
};
