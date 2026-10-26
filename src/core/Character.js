
class Character{

    constructor(name, imageUrl, films, videoGames){
        this.name = name;
        this.imageUrl = imageUrl;
        this.films = films;   //Arrray
        this.videoGames = videoGames; //Array
        this.favorite= false;
    }

    static fromJson({name, imageUrl, films, videoGames}){
        const character = new Character(name, imageUrl, films, videoGames);
        return character;
    }

// favorites = new Set();

// setFavorites = (name) => {
//     if (this.favorites.has(name)) {
//         this.favorites.delete(name);
//     } else {
//         this.favorites.add(name);
//     }
// };
}




export default Character; 
