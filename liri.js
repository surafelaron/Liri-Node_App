
//
require("dotenv").config();
//
var keys = require("./keys");
//
var Spotify= require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
// variable for the command
var instruction = process.argv[2];
//variable for search
 var userSearch = process.argv.splice(3).join(" ");
//
function liriConditions(instruction, userSearch){
    switch(instruction){
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
function spotifySong (songName){
    if(!songName){
        songName = "all of you"
    };
    spotify.search({type: "track" , query: songName},function(err, data){
        if(err){
            return console.log("Error: " + err);
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
        var randomSong = "\n=====spotify search====== " + "\nartist: " + data.tracks.items[0].album.artists[0].name  + "\nsong name: " + data.tracks.items[0].name  + "\npreview link: " + data.tracks.items[0].href + "\nAlbum: " + data.tracks.items[0].album.name + "\r\n";
        fs.appendFile("log.txt", randomSong, function(err){
            if(err){
                console.log(err);
            }
        })
    })
}
liriConditions(instruction, userSearch);