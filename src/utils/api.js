import { FetchError } from "./errors.js";

const API_URL = "https://api.disneyapi.dev/character";  //"http://api.disneyapi.dev/character?page=2&pageSize=50";
const PAGE_SIZE_API = 200;

async function fetchData(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {

            throw new FetchError(response);
        }

        const result = await response.json();
        return {
            error: null,
            data: result
        }
    } catch {
        console.error(error);
        return {
            error: error,
            data: null
        }
    }

}

function getCatalog(page = 1) {
    let url = API_URL;
    const urlClass = new URL(url);

    urlClass.searchParams.append("page", page);
    urlClass.searchParams.append("pageSize", PAGE_SIZE_API);
    url = urlClass.toString();

    return fetchData(url);
}


// const result = await getCatalog();
// console.log(result);

export {
    getCatalog
}



