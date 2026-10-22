// "_id": 112,
// "films": [
//   "Hercules (film)"
// ],
// "shortFilms": [],
// "tvShows": [
//   "Hercules (TV series)"
// ],
// "videoGames": [
//   "Kingdom Hearts III"
// ],
// "parkAttractions": [],
// "allies": [],
// "enemies": [],
// "name": "Achilles",
// "imageUrl": "https://static.wikia.nocookie.net/disney/images/6/67/HATS_Achilles.png",
// "url": "https://api.disneyapi.dev/characters/112"



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

    paintCharacter(){
        const html = "<section> </section>";
        return html;
    }

}

export default Character; 