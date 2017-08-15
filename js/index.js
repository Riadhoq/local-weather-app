$(document).ready(getLocation);

var latitude;
var longitude;
var jsonData;
var locationId = document.getElementById("location-id");
var temperatureId = document.getElementById("temperature-id");
var ferhenheitId = document.getElementById("ferhenheit-id");
var weatherId = document.getElementById("weather-id");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  $.get(
    "https://fcc-weather-api.glitch.me/api/current?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "",
    function(json, status) {
      jsonData = json;
      locationId.innerHTML = jsonData.name + ", " + jsonData.sys.country;
      temperatureId.innerHTML =
        "Current: " +
        jsonData.main.temp.toPrecision(4) +
        "&#176C<br> Highest: " +
        jsonData.main.temp_max.toPrecision(4) +
        "&#176C<br> Lowest: " +
        jsonData.main.temp_min.toPrecision(4) +
        "&#176C";
      weatherId.innerHTML =
        jsonData.weather[0].main +
        "<br>" +
        jsonData.weather[0].description +
        "<br><img src='" +
        jsonData.weather[0].icon +
        "'>";
    }
  );
}

function convert() {
  temperatureId.innerHTML =
    "Current: " +
    (9 / 5 * jsonData.main.temp + 32).toPrecision(4) +
    "&#176F<br> Highest: " +
    (9 / 5 * jsonData.main.temp_max + 32).toPrecision(4) +
    "&#176F<br> Lowest: " +
    (9 / 5 * jsonData.main.temp_min + 32).toPrecision(4) +
    "&#176F";
  ferhenheitId.innerHTML =
    "<button style = 'border: none; background: none; color: blue' onclick = 'convertCel()' id = 'ferhenheit-id'>&#176C</button>";
}

function convertCel() {
  temperatureId.innerHTML =
    "Current: " +
    jsonData.main.temp.toPrecision(4) +
    "&#176C<br> Highest: " +
    jsonData.main.temp_max.toPrecision(4) +
    "&#176C<br> Lowest: " +
    jsonData.main.temp_min.toPrecision(4) +
    "&#176C";
  ferhenheitId.innerHTML =
    "<button style = 'border: none; background: none; color: blue' onclick = 'convert()' id = 'ferhenheit-id' >&#176F</button>";
}