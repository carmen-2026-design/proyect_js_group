import Character from "./Character.js";
// import data from "../data/characters.json" with {type: "json"};
import Catalog from "./Catalog.js";
import {  renderFilterForm, renderCharacterSortSelect } from "../ui/renderer.js";
import { getCatalog } from "../utils/api.js";
import {  getUniqueValues, sortCharacters } from "../utils/functions.js";

const PAGES_NUMBER_API = 1; //PAGE_SIZE_API = 500;

const CARDS_PER_PAGE = 9;

async function LoadCatalog() {
   

    const [catalogAll, characters] = await getCatalogAll();



    //Botones anterior/siguiente de la página de personajes
    const previousButton = document.getElementById("previous-button");
    previousButton.addEventListener("click", () => catalogAll.previousPage());

    const nextButton = document.getElementById("next-button");
    nextButton.addEventListener("click", () => catalogAll.nextPage());

   /*  //Boton favoritos
    const btnFavorites = document.getElementById("filter-favorites-btn");
    btnFavorites.addEventListener("click", () => catalogAll.filterCatalogByFavorites()); */

    //Boton eliminar filtros
    const btnEliminarFiltros = document.getElementById("quitar-filtros");
    btnEliminarFiltros.addEventListener("click", () => catalogAll.removeFilters());



    // ================================ Logica filtros ==================================== //

    // ------- Filtros por categorias en radio buttons + boton de filtrar ---------- //
    const filtersForm = renderFilterForm();
    document.getElementById("filter-container").append(filtersForm);



    if (filtersForm) {
        const selectElement = filtersForm.querySelector("select[name='filter-value']");
        const radios = filtersForm.querySelectorAll("input[name='filter-category']")


        const updateSelectOpt = (category) => {
            const uniqueValues = getUniqueValues(characters, category);

            selectElement.innerHTML = "";
            selectElement.append(...uniqueValues.map(val => {
                const option = document.createElement("option");
                option.value = val;
                option.textContent = val;
                return option;
            }));
        };

        //radio marcado por defecto al inicializar 
        const initialRadio = filtersForm.querySelector("input[name='filter-category']:checked");
        if (initialRadio) {
            updateSelectOpt(initialRadio.value);
        };


        //cambiar categoria 
        radios.forEach(radio => {
            radio.addEventListener("change", (event) => {
                updateSelectOpt(event.target.value);
            });
        });

        //Boton filtrar
        filtersForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(filtersForm);
            const selectedCategory = formData.get("filter-category");
            const selectedValue = formData.get("filter-value");

            const filteredCharacters = characters.filter(char => {
                const propValue = char[selectedCategory];
                if (Array.isArray(propValue)) {
                    return propValue.includes(selectedValue);
                } else {
                    return propValue === selectedValue;
                }
            });


            //pintar el catalogo de filtrados
            const catalogFiltered = new Catalog();
            filteredCharacters.forEach(char => catalogFiltered.addCharacter(char));

            catalogFiltered.initializePages(CARDS_PER_PAGE, true);
            catalogFiltered.getCharactersPage().paintCatalog();


        });

    };
 
    // ----------- Filtro de ordenación de fichas ------- //
    const orderBtns = renderCharacterSortSelect();
    document.getElementById("sort-btns").append(orderBtns);


    orderBtns.addEventListener("change", (event) => {
        const sortOrder = event.target.value;

        sortCharacters(characters, sortOrder);

        const catalogSorted = new Catalog();
        characters.forEach(char => catalogSorted.addCharacter(char));

        catalogSorted.initializePages(CARDS_PER_PAGE, true);
        catalogSorted.getCharactersPage().paintCatalog();

    });


    //Carga la primera página de personajes
    catalogAll.initializePages(CARDS_PER_PAGE, true);

    let catalogToShow = new Catalog();
    catalogToShow = catalogAll.getCharactersPage();
    catalogToShow.paintCatalog();

    //Label con el número de página
    const lblNumPage = document.getElementById("num-page");
    lblNumPage.innerText = catalogAll.getTextPage();


    //SCROLL TOP DETECTOR

    const manoArriba = document.getElementById('manoArriba');

    function scrollTop() {
        if (window.scrollY < 500) {
            manoArriba.classList.add('oculto');
        } else {
            manoArriba.classList.remove('oculto');

        }
    }
    window.addEventListener('scroll', scrollTop);
}

async function getCatalogAll() {

    const catalogAll = new Catalog();
    let allCharacters = [];

    for (let page = 1; page <= PAGES_NUMBER_API; page++) {
        const { data: dataCatalog, error } = await getCatalog(page);

        if (error) {
            alert("Ha ocurrido un error");
        }

        const characters = dataCatalog.data.map(c => Character.fromJson(c));

        //Carga el catálogo con los personajes del JSON
        // const characters = data.characters.map(c => Character.fromJson(c));

        for (let i = 0; i < characters.length; i++) {
            catalogAll.addCharacter(characters[i]);

            allCharacters.push(characters[i]);
        }
    }

    return [catalogAll, allCharacters];
}


LoadCatalog();

