// import Shop from "./core/Shop.js";
// import Product from "./core/Product.js";
// import data from "./data/products.json" with { type: "json" };
// import { Client } from "./core/User.js";
// import Cart from "./core/Cart.js";

// const shop = new Shop("tienda pruebas");

// const products = data.products.map(p =>Product.fromJson(p));
// const client = new Client(1,"Yisus","Krais","yisus,krais@god.com")
// const cart = new Cart(client)
// products.slice(0,10).forEach(p=>shop.addProduct(p,5));

// cart.add(products[0],5);
// cart.add(products[1],2);
// console.log(cart.getTotalPrice(true));
// console.log(cart.getTotalQuantity());

import Character from "./core/Character.js";
import data from "./data/characters.json" with {type: "json"};
import Catalog from "./core/Catalog.js";

const characters = data.characters.map(c => Character.fromJson(c));

// characters.slice(0,10).forEach(c=>catalog.addCharacter(c,5));

//console.log(characters);

const catalogAll = new Catalog();

for (let i = 0; i < characters.length; i++) {
    catalogAll.addCharacter(characters[i]);
    console.log("--------Catalogo:");
    console.log(characters[i]);
}

console.log("***********Coleccion de catalogos: " + catalogAll.characters.size);
console.log(catalogAll);

//Filtrado del catálogo por texto del nombre
let catalogFilter = new Catalog();
catalogFilter = catalogAll.filterCatalogByName('Captain');
console.log("***********Coleccion filtrada: " + catalogFilter.characters.size);
// console.log(catalogFilter.size);
console.log(catalogFilter);


