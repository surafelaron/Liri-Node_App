//
require("dotenv").config();
//
var keys = require("./keys");
//
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
// variable for the command
var instruction = process.argv[2];
//variable for search
var userSearch = process.argv.splice([3]).join(" ");
//
function liriConditions(instruction, userSearch) {
    switch (instruction) {
        case "spotify-this-song":
            spotifySong(userSearch);
            break
        case "movie-this":
            omdbMovies(userSearch);
            break
        case "concert-this":
            concert(userSearch);
            break
        case "do-what-it-says":
            doWhatSay(userSearch);
    }
}
// 
function spotifySong(songName) {
    if (!songName) {
        songName = "all of you"
    };
    spotify.search({
        type: "track",
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log(err); 
        }
        console.log("======================================");
        // artstis
        console.log("Name of the artist: " + data.tracks.items[0].album.artists[0].name + "\r\n");
        //song name
        console.log("song name: " + data.tracks.items[0].name);
        // preview link 
        console.log("previw link: " + data.tracks.items[0].href + "\r\n");
        // the album for the song
        console.log("the album name for the song: " + data.tracks.items[0].album.name + "\r\n");
        // append to the text file
        var randomSong = "\n=====spotify search====== " + "\nartist: " + data.tracks.items[0].album.artists[0].name + "\nsong name: " + data.tracks.items[0].name + "\npreview link: " + data.tracks.items[0].href + "\nAlbum: " + data.tracks.items[0].album.name + "\r\n";
        fs.appendFile("log.txt", randomSong, function (err) {
            if (err) {
                console.log(err);
            }
        })
    })
}

function concert(userSearch) {
    //var musician = userSearch;
    var queryURL = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function (response) {
        console.log("====================================");
        console.log("Artist: " + userSearch + "\r\n");
        console.log("Place for the concert: " + response.data[0].venue.name + "\r\n"); 
        console.log("location: " + response.data[0].venue.city + "\r\n");
        console.log("Date: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\r\n");
        // append to log.txt
        var randomConcert = "\n=======concert search======" + "\nName of singer(s): " + userSearch + "\nPlace for the concert: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.city + "\nDate: " + moment(response.data[0].datetime).format("MM-DD-YYYY");
        fs.appendFile("log.txt", randomConcert, function (err) {
            if (err) {
                console.log(err);
            }
        })
    }) 
};

function omdbMovies(movie) {
    //var movie = userSearch;
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.request(movieQueryUrl).then(function (response) {
        console.log("================================");
        console.log("Title: " + response.data.Title + "\r\n");
        console.log("Release Year: " + response.data.Year + "\r\n");
        console.log("IMDB Rating: " + response.data.imdbRating + "\r\n");
        // console.log("Rotten Tomato: " + response.data.Ratings[0].value + "\r\n");
        console.log("Country where produced: " + response.data.Country + "\r\n");
        console.log("Language: " + response.data.Language + "\r\n");
        console.log("Plot: " + response.data.Plot + "\r\n");
        console.log("Actors: " + response.data.Actors + "\r\n");
        var randomMovies = "\n====movie search========" + "\nTitle: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomato: " + response.data.Ratings[1].value + "\nCountry where produced: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors;
        fs.appendFile("log.txt", randomMovies, function (err) {
            if (err) {
                console.log(err);
            }
        })
    })
}

function doWhatSay() {
    fs.readFile("rondom.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        }
            console.log(data);
            var randomText = data.split(",")
//console.log(randomText);
            liriConditions(randomText[0],randomText[1]);
            // console.log(liriConditions(randomText[0], randomText[1]))
        
    });
    
};

liriConditions(instruction, userSearch);