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


    // =============== Favoritos ================ //

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

    article.append(characterImage, characterName, favBtn);
    return article;
}



/* //================= Form Filtros ==================//

function renderFilterForm(){
    const form = document.createElement("form");
    form.name = "filter-form";

    const categoriesData = [
        { label: "Nombre", value: "name" },
        { label: "Películas", value: "films" },
        { label: "Videojuegos", value: "videoGames" }
    ];
    
    // Contenedor y creación de los radio buttons
    const radioGroup = document.createElement("div");
    radioGroup.classList.add("radio-group");

    categoriesData.forEach((cat, index) => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "filter-category";
        radio.value = cat.value; 
       
        if (index === 0) radio.checked = true; // El primer radio marcado por defecto

        label.append(radio, document.createTextNode(` ${cat.label}`));
        radioGroup.append(label);
    });

    // Creación del select  para los valores
    const select = document.createElement("select");
    select.name = "filter-value";

    const button = document.createElement("button");
    button.textContent = "Filtrar";

    form.append(radioGroup, select, button);
  
    return form;
}
 */

// ============= Botone de orden alfabético ============== //

function renderCharacterSortSelect(){
    const sortSelect = document.createElement("select");
    sortSelect.name = "sort-order";
    sortSelect.id = "sort-select";

    const defaultSelect = document.createElement("option");
    defaultSelect.value= "";
    defaultSelect.textContent = "Ordenar";
    defaultSelect.disabled = true;
    defaultSelect.selected = true; 
    

    const orderSort = document.createElement("option");
    orderSort.value = "order";
    orderSort.textContent = "A - Z";

    const reverseSort = document.createElement("option");
    reverseSort.value = "reverse";
    reverseSort.textContent = "Z - A";

    sortSelect.append(defaultSelect, orderSort, reverseSort);
    


    return sortSelect
}

export {
    createCharacterArticle,
    //renderFilterForm,
    renderCharacterSortSelect

};
