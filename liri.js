//Set enviroment variables
require("dotenv").config();

// Keys
var request = require("request");
var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// User input
var command = process.argv[2];
var search = process.argv[3];

//run
exploit(command, search);

//User commands
function exploit(command, search){
    switch(command){
    case "concert-this":
        concertThis(search);
        break;
    case "spotify-this-song":
        spotifyThis(search);
        break;
    case "movie-this":
        movieThis(search);
        break;
    case "do-what-it-says":
        showThis(search);
        break;
    default:
        console.log("Not an option.");
    };
};


//Music search
function spotifyThis(search) {
    if (search === undefined) {
        search = "The Sign"; 
    }
    spotify.search(
        {
            type: "track",
            query: search
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("**********SONG*********");
                fs.appendFileSync("log.txt", "**********SONG*********\n");
                console.log(i);
                fs.appendFileSync("log.txt", i +"\n");
                console.log("Song name: " + songs[i].name);
                fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                console.log("Artist(s): " + songs[i].artists[0].name);
                fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                console.log("*****************************");  
                fs.appendFileSync("log.txt", "*****************************\n");
             }
        }
    );
};

//Concert Search

function concertThis(search){
   
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
    .then(function (response) {
         
        for(var i= 0; i < response.data.length; i++){
           
            console.log("**********EVENT*********");  
            fs.appendFileSync("log.txt", "**********EVENT*********\n");
            console.log("Name of the Venue: " + response.data[i].venue.name);
            fs.appendFileSync("log.txt", "Name of the Venue: " + response.data[i].venue.name +"\n");
            console.log("Venue Location: " +  response.data[i].venue.city);
            fs.appendFileSync("log.txt", "Venue Location: " +  response.data[i].venue.city +"\n");
            console.log("Date of the Event: " +  response.data[i].datetime);
            fs.appendFileSync("log.txt", "Date of the Event: " + response.data[i].datetime +"\n");
            console.log("*****************************");
            fs.appendFileSync("log.txt", "*****************************"+"\n");
        }
    })
    .catch(function (err) {
        console.log(err);
    })
};

//Movie search


function movieThis(search){
    if (search === undefined){
        search = "Mr. Nobody"
        console.log("************");
        fs.appendFileSync("log.txt", "-----------------------\n");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" +"\n");
        console.log("It's on Netflix!");
        fs.appendFileSync("log.txt", "It's on Netflix!\n");
    }

    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy")
    .then (function (response){
        // for(var i= 0; i < response.data.length; i++){
            console.log("**********MOVIE*********");  
            fs.appendFileSync("log.txt", "**********MOVIE*********\n");
            console.log("Title: " + response.data.Title);
            fs.appendFileSync("log.txt", "Title: " + response.data.Title + "\n");
            console.log("Release Year: " + response.data.Year);
            fs.appendFileSync("log.txt", "Release Year: " + response.data.Year + "\n");
            console.log("IMDB Rating: " + response.data.imdbRating);
            fs.appendFileSync("log.txt", "IMDB Rating: " + response.data.imdbRating + "\n");
            console.log("Rotten Tomatoes Rating: " + rottenTomatoesRating(response.data));
            fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + rottenTomatoesRating(response.data) + "\n");
            console.log("Country of Production: " + response.data.Country);
            fs.appendFileSync("log.txt", "Country of Production: " + response.data.Country + "\n");
            console.log("Language: " + response.data.Language);
            fs.appendFileSync("log.txt", "Language: " + response.data.Language + "\n");
            console.log("Plot: " + response.data.Plot);
            fs.appendFileSync("log.txt", "Plot: " + response.data.Plot + "\n");
            console.log("Actors: " + response.data.Actors);
            fs.appendFileSync("log.txt", "Actors: " + response.data.Actors + "\n");
            console.log("*****************************");  
            fs.appendFileSync("log.txt", "*****************************\n");
        // }

    })
    .catch(function (err) {
        console.log(err);
    })

}
function rottenTomatoes (data) {
    return data.Ratings.find(function (item) {
       return item.Source === "Rotten Tomatoes";
    });
  }

  function rottenTomatoesRating(data) {
    return rottenTomatoes(data).Value;
  }


function showThis(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
        var dataArr = data.split(',');
        exploit(dataArr[0], dataArr[1]);
	});
}



//Go back and edit the search criteria
//Go back and make date of event formatted 