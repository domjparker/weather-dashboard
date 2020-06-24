








var cities = [];
var APIKey = "b3ae49b29f941384eecc5d3824ca3826";

// When the search button is clicked...
$("#searchButton").on("click", function(event) {
    event.preventDefault();
    // grab text from search input
    var cityName = $("#searchInput").val().trim();
    // city name is added to cities array
    cities.push(cityName);
    // clear the search field once input is pushed to the cities array
    $("#searchInput").val(""); 

    //need to render city buttons and query the weather api for data on current city searched for
    
    
    // call renderCityButtons to update cities array
    renderCityButtons();
    displayOneDayWeather(cityName);
    // // API Key
    // var APIKey = "b3ae49b29f941384eecc5d3824ca3826";
    // // URL needed to query the database
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + APIKey;
    // // AJAX Call
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(queryURL);
    //     console.log(response);
    // })

})

function renderCityButtons() {
    $("#cityButtons").empty(); //deletes city buttons prior to adding new buttons. necessary????
    // loop through the array of cities
    for (var i = 0; i < cities.length; i++) {
      // generate button for each city in the array
        var cityButton = $("<button>"); 
        // add a class
        cityButton.addClass("city btn btn-outline-secondary btn-sm btn-block");
        // add data-attribute with a value of the city at index i
        cityButton.attr("data-name", cities[i]);
        // give the button's text a value of the city at index i
        cityButton.text(cities[i]);
        // add button to html
        $("#cityButtons").append(cityButton);
    }
}

function displayOneDayWeather(city) {
    var oneDayQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey
    $.ajax({
        url: oneDayQueryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#oneDayCity").text(response.name)
        var tempKtoC = (response.main.temp - 273.15) * 1.8 +32;
        $("#oneDayTemperature").text(tempKtoC.toFixed(1))
        $("#oneDayHumidity").text(response.main.humidity);
        $("#oneDayWindSpeed").text(response.wind.speed)
        $(".oneDayIcon").attr("src", "http://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png")
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var uvIndexQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
        $.ajax({
            url: uvIndexQueryURL,
            method: "GET"
        }).then(function(uvResponse) {
            $("#oneDayUVIndex").text(uvResponse.value);
            console.log(uvResponse)
        })
    })

    
    
}



