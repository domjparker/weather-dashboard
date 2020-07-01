// global variables
var cities = [];
var APIKey = "b3ae49b29f941384eecc5d3824ca3826";

// When the search button is clicked...
$("#searchButton").on("click", function(event) {
    event.preventDefault();
    // grab text from search input
    var cityName = $("#searchInput").val().trim();
    // if the cities array already includes that city name, don't render button
    if (cities.includes(cityName)) {
        return
    // if city name is not in the cities array...
    } else {
        // city name is added to cities array
    cities.push(cityName);
    // clear the search field once input is pushed to the cities array
    $("#searchInput").val("");
    // call renderCityButtons to update cities array
    renderCityButtons();
    // display one day weather forecast for the inputted city
    displayOneDayWeather(cityName);
    // display five day weather forecast for the inputted city
    displayFiveDayWeather(cityName);
    }
});

// function to render buttons dynamically for each searched city
function renderCityButtons() {
    $(".cityButtons").empty(); //deletes city buttons prior to adding new buttons.
    // loop through the array of cities
    for (var i = 0; i < cities.length; i++) {
      // generate button for each city in the array
        var cityButton = $("<button>"); 
        // add a class
        cityButton.addClass("cityButton btn btn-outline-secondary btn-block m");
        // add data-attribute with a value of the city at index i
        cityButton.attr("data-name", cities[i]);
        // give the button's text a value of the city at index i
        cityButton.text(cities[i]);
        // add button to html
        $(".cityButtons").append(cityButton);
    }
};

// if one of the city buttons is clicked, show forecasts for that city
$(document).on("click",".cityButton", function() {
    event.preventDefault();
    // take the text from the button clicked
    var cityChoice = $(this).text();
    // pass this city into each of the display forecast functions
    displayOneDayWeather(cityChoice);
    displayFiveDayWeather(cityChoice);
});

// function to display the ONE day weather forecast for city searched or clicked
function displayOneDayWeather(city) {
    // clear all the display areas for the ONE day weather card
    $("#oneDayCity").empty();
    $("#oneDayDate").empty();
    $("#oneDayTemperature").empty();
    $("#oneDayHumidity").empty();
    $("#oneDayWindSpeed").empty();
    $(".oneDayIcon").empty();
    // query weather API
    var oneDayQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    $.ajax({
        url: oneDayQueryURL,
        method: "GET"
    }).then(function(response) {
        // get and display the city name and date
        var unixDayOne = new Date(response.dt * 1000);
        var formattedDate = moment(unixDayOne).format("MM/DD/YYYY");
        $("#oneDayCity").text(response.name + " (" + formattedDate + ")")
        // console.log(formattedDate)
        // display rest of the one day weather data
        $("#oneDayTemperature").text(response.main.temp)
        $("#oneDayHumidity").text(response.main.humidity);
        $("#oneDayWindSpeed").text(response.wind.speed)
        // display weather forecast icon
        $("#oneDayIcon").attr("src", "http://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png")
        // get latitude and longitude from this api query 
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        // pass these into separate query to get UV index
        var uvIndexQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
        $.ajax({
            url: uvIndexQueryURL,
            method: "GET"
        }).then(function(uvResponse) {
            $("#oneDayUVIndex").text(uvResponse.value);
            // console.log(uvResponse)
        })
    })
};

// function to display the FIVE day weather forecast for city searched or clicked
function displayFiveDayWeather(city) {
    // query Weather API
    var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
    }).then(function(response) {
        // start for loop at day number 1
        var dayNum = 1;
        // query gives result of 5 day forecast in 3 hour increments.
        // start at '3', which is 12noon on Day 1. Add 24 hrs (=8*3) each loop to get remaining 4 day forecasts.
        for (let i = 3; i < response.list.length; i+=8 ) {
            // Date on each day
            var unixFiveDay = (response.list[i].dt);
            var unixFiveDayMilliSec = new Date(unixFiveDay * 1000)
            var formattedFiveDay = moment(unixFiveDayMilliSec).format("MM/DD/YYYY");
            $("#date" + dayNum).text(formattedFiveDay);
            // weather forecast icon on each day
            $(".fiveDayIcon" + dayNum).attr("src", "http://openweathermap.org/img/wn/"+response.list[i].weather[0].icon+"@2x.png")
            // temperature and humidity on each day
            $("#temp" + dayNum).text(response.list[i].main.temp);
            $("#humidity" + dayNum).text(response.list[i].main.humidity);
            // move on to the next of the remaining days
            dayNum++
        }
    })
};
