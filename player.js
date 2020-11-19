//vektor med låtarna
let songs = [];

var timebarFill = document.getElementById("progressbar"); //variabel som visar grafiskt hur långt gången låten är
var currentTime = document.getElementById("currenttime"); //variabel som tar reda på vart nuvarande tid ska ligga
var songLength = document.getElementById("songlength"); //variabel som tar reda på vart låtens längd ska ligga
var repeat = false; //boolean för att reda på om en låt ska repeteras
var shuffle = false; //boolean för att shuffla nästa låt

var song = new Audio(); //ljudobjektet skapas
var currentSong = 0; //variabel som fungerar som ett index i vektorerna

//spelar låt vid laddning
window.onload = loadSongs();

//klick-event
$("#play").on("click", playOrPause);
$("#previous").on("click", previous);
$("#next").on("click", next);
$("#repeat").on("click", repeatSong);
$("#shuffle").on("click", shuffleMode);
$(".song").click(function() {
  currentSong = this.id;
  playSong();
});

async function loadSongs() {
  let songsData = await $.getJSON('songs.json');

  for (let song of songsData) {
    console.log(song);
    songs.push(song);
  }
  playSong();
}

//funktion för att spela låt med tillhörande info
function playSong() {
  song.src = songs[currentSong].SongLink;
  $("#album").attr("src", songs[currentSong].AlbumLink);
  document.getElementById("artist").innerHTML = songs[currentSong].Artist;
  document.getElementById("songTitle").innerHTML = songs[currentSong].SongTitle;
  song.play();
  $(".song").removeClass("active");
  $(".song")
    .eq(currentSong)
    .addClass("active");
}

//funktion för att visa play/paus-knapp
function playOrPause() {
  if (song.paused) {
    song.play();
    $("#play i").attr("class", "fas fa-pause-circle");
  } else {
    song.pause();
    $("#play i").attr("class", "fas fa-play-circle");
  }
}

//fyller progressbar under tiden låten spelas
song.addEventListener("timeupdate", function() {
  var progress = song.currentTime / song.duration;
  timebarFill.style.width = progress * 100 + "%";
  convertTime(Math.round(song.currentTime));

  //kollar om repeat-knappen är intryckt
  if (song.ended) {
    if (repeat == true) {
      song.currentTime = 0;
      song.play();
    } else {
      if (shuffle == true) {
        currentSong = Math.floor(Math.random() * 7);
        playSong();
      } else {
        next();
      }
    }
  }
});

//funktion som konverterar den nuvarande tiden i minuter och sekunder
function convertTime(seconds) {
  var min = Math.floor(seconds / 60);
  var sec = seconds % 60;
  sec = sec < 10 ? "0" + sec : sec; //lägger till en 0 om sekunderna är under 10
  currentTime.textContent = min + ":" + sec;
  showLength(Math.round(song.duration));
}

//funktion som visar låtens längd i minuter och sekunder
function showLength(seconds) {
  var min = Math.floor(seconds / 60);
  var sec = seconds % 60;
  sec = sec < 10 ? "0" + sec : sec;
  songLength.textContent = min + ":" + sec;
}

//funktion för nästa låt
function next() {
  if (shuffle == true) {
    currentSong = Math.floor(Math.random() * 7);
    playSong();
    $("#play i").attr("class", "fas fa-pause-circle");
  } else {
    currentSong++;
    if (currentSong > 6) {
      currentSong = 0;
    }
    playSong();
    $("#play i").attr("class", "fas fa-pause-circle");
  }
}

//funktion för föregående låt
function previous() {
  if (song.currentTime < 2) {
    currentSong--;
    if (currentSong < 0) {
      currentSong = 0;
    }
    playSong();
    $("#play i").attr("class", "fas fa-pause-circle");
  } else {
    song.currentTime = 0;
  }
}

//funktion för att repetera en låt
function repeatSong() {
  if (repeat == false) {
    repeat = true;
    $(this).css("color", "white");
  } else {
    repeat = false;
    $(this).css("color", "silver");
  }
}

//funktion för att shuffla nästa låt
function shuffleMode() {
  if (shuffle == false) {
    shuffle = true;
    $(this).css("color", "white");
  } else {
    shuffle = false;
    $(this).css("color", "silver");
  }
}
