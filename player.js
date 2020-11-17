//vektor med låtarna
var songs = [
  "https://ia802800.us.archive.org/20/items/cd_indestructible_disturbed/disc1/01.%20Disturbed%20-%20Indestructible_sample.mp3",
  "https://ia800109.us.archive.org/11/items/cd_vulgar-display-of-power_pantera_2/disc1/03.%20Pantera%20-%20Walk_sample.mp3",
  "https://ia902900.us.archive.org/14/items/cd_asylum_disturbed/disc1/02.%20Disturbed%20-%20Asylum_sample.mp3",
  "https://ia802804.us.archive.org/12/items/cd_tonight-the-stars-revolt_powerman-5000/disc1/03.%20Powerman%205000%20-%20When%20Worlds%20Collide_sample.mp3",
  "https://ia802804.us.archive.org/14/items/cd_the-sickness_disturbed_1/disc1/04.%20Disturbed%20-%20Down%20With%20the%20Sickness_sample.mp3",
  "https://ia800108.us.archive.org/17/items/cd_destroyer_kiss/disc1/03.%20Kiss%20-%20God%20Of%20Thunder_sample.mp3",
  "https://ia801501.us.archive.org/25/items/cd_the-vengeful-one_disturbed/disc1/01.%20Disturbed%20-%20The%20Vengeful%20One_sample.mp3"
];
//vektor med albumbilder
var albums = [
  "images/indestructible.png",
  "images/vulgardisplayofpower.png",
  "images/asylum.jpg",
  "images/tonightthestarsrevolt.jpg",
  "images/thesickness.png",
  "images/destroyer.png",
  "images/immortalized.png"
];
//vektor med artist och låttitel
var songTitle = [
  "<strong>Disturbed</strong><br />Indestructible",
  "<strong>Pantera</strong><br />Walk",
  "<strong>Disturbed</strong><br />Asylum",
  "<strong>Powerman 5000</strong><br />When Worlds Collide",
  "<strong>Disturbed</strong><br />Down With The Sickness",
  "<strong>KISS</strong><br />God Of Thunder",
  "<strong>Disturbed</strong><br />The Vengeful One"
];

var timebarFill = document.getElementById("progressbar"); //variabel som visar grafiskt hur långt gången låten är
var currentTime = document.getElementById("currenttime"); //variabel som tar reda på vart nuvarande tid ska ligga
var songLength = document.getElementById("songlength"); //variabel som tar reda på vart låtens längd ska ligga
var repeat = false; //boolean för att reda på om en låt ska repeteras
var shuffle = false; //boolean för att shuffla nästa låt

var song = new Audio(); //ljudobjektet skapas
var currentSong = 0; //variabel som fungerar som ett index i vektorerna

//spelar låt vid laddning
window.onload = playSong;

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

//funktion för att spela låt med tillhörande info
function playSong() {
  song.src = songs[currentSong];
  $("#album").attr("src", albums[currentSong]);
  document.getElementById("songtitle").innerHTML = songTitle[currentSong];
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
