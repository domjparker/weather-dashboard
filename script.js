cities = [];


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



$("#searchButton").on("click", function(event) {
    event.preventDefault();
    // grab text from search input
    var cityName = $("#searchInput").val().trim();
    // city name is added to cities array
    cities.push(cityName);
    $("#searchInput").text("");

    // call renderCityButtons to update cities array
    renderCityButtons();
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


