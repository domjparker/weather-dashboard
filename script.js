

var cities = [];
var APIKey = "b3ae49b29f941384eecc5d3824ca3826";

function init() {
    if (cities = ) {
    $("#weatherForecasts").css("display","none")
} else {
    $("#weatherForecasts").css("display","block")
}}

// When the search button is clicked...
$("#searchButton").on("click", function(event) {
    event.preventDefault();
    $("#weatherForecast").css("display","block")
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
    displayFiveDayWeather(cityName);
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
    $("#oneDayCity").empty();
    $("#oneDayDate").empty();
    $("#oneDayTemperature").empty();
    $("#oneDayHumidity").empty();
    $("#oneDayWindSpeed").empty();
    $(".oneDayIcon").empty();
    var oneDayQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    $.ajax({
        url: oneDayQueryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        var unixDayOne = new Date(response.dt * 1000);
        var formattedDate = moment(unixDayOne).format("MM/DD/YYYY");
        $("#oneDayCity").text(response.name + " (" + formattedDate + ")")
        console.log(formattedDate)
        // $("#oneDayDate").text(formattedDate);
        $("#oneDayTemperature").text(response.main.temp)
        $("#oneDayHumidity").text(response.main.humidity);
        $("#oneDayWindSpeed").text(response.wind.speed)
        $("#oneDayIcon").attr("src", "http://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png")
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var uvIndexQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
        $.ajax({
            url: uvIndexQueryURL,
            method: "GET"
        }).then(function(uvResponse) {
            $("#oneDayUVIndex").text(uvResponse.value);
            // console.log(uvResponse)
        })
    })
}

function displayFiveDayWeather(city) {
    var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        var dayNum = 1;
        for (let i = 3; i < response.list.length; i+=8 ) {
            // var fiveDayDate = 
            // console.log(response.list[i].dt);
            // 
            // console.log(response.list[i].main.temp);
            // console.log(response.list[i].main.humidity);
            // var fiveDayCard = $("<div>");
            // fiveDayCard.attr("class", "fiveDayCard card col-md-2");
            // $("#fiveDayMainDiv").append(fiveDayCard)
            // var fiveDayCardBody = $("<div>")
            // fiveDayCardBody.attr("class", "card-body text-white bg-primary rounded");
            // $(".fiveDayCard" + dayNum).append(fiveDayCardBody);
            // var fiveDayDate = $("<h5>");
            var unixFiveDay = (response.list[i].dt);
            var unixFiveDayMilliSec = new Date(unixFiveDay * 1000)
            var formattedFiveDay = moment(unixFiveDayMilliSec).format("MM/DD/YYYY");
            $("#date" + dayNum).text(formattedFiveDay);
            $(".fiveDayIcon" + dayNum).attr("src", "http://openweathermap.org/img/wn/"+response.list[i].weather[0].icon+"@2x.png")
            $("#temp" + dayNum).text(response.list[i].main.temp);
            $("#humidity" + dayNum).text(response.list[i].main.humidity);
            dayNum++
        }
    })
}


{/* <div class="card col-md-2" >
                            <div class="card-body text-white bg-primary rounded">
                                <h5 id="twoDayDate"></h5>
                                <img src="" class="fiveDayIconOne" alt="">
                                <p id="fiveDayTemp">Temp:</p>
                                <p id="fiveDayHumidity">Humidity:</p>
                            </div>
                        </div>
 */}

// cityName + units + apiKey;
//     $.ajax({
//         url: queryUrl,
//         method: "GET"
//     }).then(function(response){
//         console.log(response)
//         // debugger;
//         var dayCounter = 1;
//         //for loop grabs the data of each day at noon
//         for(let i = 3;i<response.list.length;i+=8){
//             // debugger;
//             // console.log(response.list[i].dt_txt);
//             //Date populated on card
//             var formatedDate = new Date(response.list[i].dt_txt).toLocaleDateString();
//             var cardDate = $("<h4>");
//             cardDate.text(formatedDate);
//             $("#day" + dayCounter).append(cardDate);
//             //icon populated on card
//             var dayIcon = iconGenerator(response.list[i].weather[0].icon);
//             $("#day" + dayCounter).append(dayIcon);
//             //temp populated on card
//             var cardTemp = $("<p>");
//             cardTemp.text("Temp: " + (response.list[i].main.temp) + "℉");
//             $("#day" + dayCounter).append(cardTemp);
//             var cardHumidity = $("<p>");
//             cardHumidity.text("Humidity: " + (response.list[i].main.humidity) + "%");
//             $("#day" + dayCounter).append(cardHumidity);
//             dayCounter++;
//         }
// //     })
// // }

init();