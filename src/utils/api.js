import { FetchError } from "./errors.js";
const API_URL = "https://api.disneyapi.dev/character";
const API_URL_NEXTPAGE = "http://api.disneyapi.dev/character?page=2&pageSize=50";

async function fetchData(url){
    try{
        const response = await fetch(url)
        if (!response.ok){
            
            throw new FetchError(response);
        }
        
        const result = await response.json();
        return{
            error: null,
            data: result
        }
    }catch{
        console.error(error);
        return {
            error: error,
            data: null
        }
    }

}

function getCatalog(){
    let url = API_URL;
    return fetchData(url);
}

// const result = await getCatalog();
// console.log(result);

export {
    getCatalog
}



