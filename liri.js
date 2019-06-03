
//
require("dotenv").config();
//
var keys = require("./keys");
//
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
// variable for the command
var instruction = process.argv[2];
//variable for search
var search = process.argv.splice(3).join(" ");
//
function liriConditions(instruction, search){
    switch(instruction){
        case "spotify-this-song":
            spotify(search);
            break
            case "movie-this":
                omdbMovies(search);
                break
                case "concert-this":
                    concert(search);
                    break
                    case "do-what-it-says":
                        doWhatSay(search);
    }
}
