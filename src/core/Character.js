
class Character{

    constructor(name, imageUrl, films, videoGames){
        this.name = name;
        this.imageUrl = imageUrl;
        this.films = films;   //Arrray
        this.videoGames = videoGames; //Array
        this.favorite = false;
    }

    static fromJson({name, imageUrl, films, videoGames}){
        const character = new Character(name, imageUrl, films, videoGames);
        return character;
    }

    toggleFavorite() {
        this.favorite = !this.favorite;
        
    }
}




export default Character; 
