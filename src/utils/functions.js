// =============== Valores dentro de categorias ================== //

function getUniqueValues(characters, property) {
    let uniqueValues = new Set(); // para eviatr vlores repetidos

    characters.forEach(character => {
        let valor = character[property];

        //para sacar los valores de los arrays y meterlos en el set
        if (Array.isArray(valor)) { 
            valor.forEach(elemento => {
                if (elemento) {
                    uniqueValues.add(elemento);
                }
            });

        //en el caso de que no sea array lo que guarda la propiedad
        } else {
            if (valor) {
                uniqueValues.add(valor);
            }
        }
    });

    let result = [...uniqueValues].sort();
    return result
}


// =============== Ordenar alfabeticamente ================== //

function sortCharacters(characters, order) {
    return characters.sort((a, b) => {

        //para poder comparar pasar todo a minúcula
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        let resultSort = 0;
        if (order === "order" && nameA < nameB) {
                resultSort = -1;

            } else if (nameA > nameB) {

                resultSort = 1;
            }

        if (order === "reverse" ) {
            
           resultSort = 1;
        }

        return resultSort
    });
}

export{
    getUniqueValues,
    sortCharacters
}