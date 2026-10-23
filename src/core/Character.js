
class Character{

    constructor(name, imageUrl, films, videoGames){
        this.name = name;
        this.imageUrl = imageUrl;
        this.films = films;   //Arrray
        this.videoGames = videoGames; //Array
    }

    static fromJson({name, imageUrl, films, videoGames}){
        const character = new Character(name, imageUrl, films, videoGames);
        return character;
    }
}




export default Character; 
