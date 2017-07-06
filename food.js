// SETUP VARIABLES
//====================================================================
// Global Variables
var key = "858f948cc66e31e989a5e17f72be49e3";
// City ID for Chicago is 292
var queryId = "292";
var numberOf = "";
// var for URL
var queryURLBase = "https://developers.zomato.com/api/v2.1/search?entity_id=292&entity_type=city&apikey=" + key;
// Restaurant Counter
var restaurantCounter = 10;

//FUNCTIONS
//====================================================================
function runQuery(numRestaurants, queryURL) {

    // Create AJAX Function
    $.ajax({ url: queryURL, mthod: "GET" })
        .done(function(foodData) {

            // Create loop that will log the name, address, price range, user rating, and url
            for (var i = 0; i < restaurantCounter; i++) {
                console.log(foodData.restaurants[i].restaurant.name);
                console.log(foodData.restaurants[i].restaurant.location.address);
                console.log(foodData.restaurants[i].restaurant.price_range);
                console.log(foodData.restaurants[i].restaurant.user_rating);
                console.log(foodData.restaurants[i].restaurant.url);


                //Render informaiton onto HTML page
               var wellSection = $('<div>');
                wellSection.addClass("well");
                wellSection.attr('id', 'restWell-' + i);
                // Attach HTML and jQ wellSection
                $('#wellSection').append(wellSection);

                // Attach the content to the appropriate well
                $("#restWell-" + i).append("<h3> Name: " +  foodData.restaurants[i].restaurant.name + "</h3>");
                $("#restWell-" + i).append("<h3> Address: " + foodData.restaurants[i].restaurant.location.address + "</h3>");
                $("#restWell-" + i).append("<h3> Price Range(1-5): " + foodData.restaurants[i].restaurant.price_range + "</h3>");
                $("#restWell-" + i).append("<h3> Rating(1-5): " + foodData.restaurants[i].restaurant.user_rating.aggregate_rating + "</h3>");
                $("#restWell-" + i).append("<h3>" + foodData.restaurants[i].restaurant.url + "</h3>");
                $("#restWell-" + i).append("<h3>" + foodData.restaurants[i].restaurant.featured_image + "</h3>");
                // Adding the photo section soon.
                
            }

            // Reference the URL within the Console
            console.log(queryURL);
            console.log(restaurantCounter);
            console.log(foodData);

        });

}

//METHODS/MAIN PROCESSES
//====================================================================
// Create an on click function associated with the search button
$('#searchBtn').on('click', function() {

    // Simple alert test with click. alert("test");

    queryTerm = $('#search').val().trim();
    console.log(queryTerm);


    // Send the AJAX. Call the Assembled URL. Will change via movie thearter locaiton. 
    runQuery(0, "https://developers.zomato.com/api/v2.1/search?entity_id=292&entity_type=city&apikey=858f948cc66e31e989a5e17f72be49e3");

    return false;
});


