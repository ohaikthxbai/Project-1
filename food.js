// SETUP VARIABLES
//====================================================================
// Global Variables
var key = "858f948cc66e31e989a5e17f72be49e3";
var str;
var firebase;
var snapValue;
var theatreName;
var tLat, tLon;
var tLoc;
var gKey;
var tOne;
// City ID for Chicago is 292
// var for URL
//var queryURLBase = "https://developers.zomato.com/api/v2.1/search?entity_id=292&entity_type=city&apikey=" + key;
var queryURLBase = "https://developers.zomato.com/api/v2.1/search?lat=" + tLat + "&lon=" + tLon + "&apikey=" + key;
//console.log(queryURLBase);
// Restaurant Counter
var restaurantCounter = 15;
// Set firebase conneciton 
var config = {
    apiKey: "AIzaSyAwU4ovw7pk-yAktrPJXl7CV18eFPgiMTI",
    authDomain: "food-date-7e9ed.firebaseapp.com",
    databaseURL: "https://food-date-7e9ed.firebaseio.com",
    projectId: "food-date-7e9ed",
    storageBucket: "food-date-7e9ed.appspot.com",
    messagingSenderId: "777352006484"
};

firebase.initializeApp(config);
var database = firebase.database();
//console.log(database);

var recentPostsRef = database.ref().limitToLast(1);

//display last object from firebase and stringify it
//console.log(recentPostsRef);
database.ref().limitToLast(1).on("child_added", function(snapshot) {
    snapValue = snapshot.val();
    //console.log(snapValue);
    str = JSON.stringify(snapValue["theatre"]).replace(/"/g, "");
    //console.log("This " + str);

    //Google Maps API reference:
    gKey = "AIzaSyBlKlaUsiPTlUdhJDeX7hfw4TR6PHQKnSc";
    theatreName = str.split(' ').join('+');
    console.log(theatreName);
    tOne = "https://maps.googleapis.com/maps/api/geocode/json?address=" + theatreName + "&key=" + gKey;
    console.log(tOne);
    $.ajax({
        url: tOne,
        method: 'GET'
    }).done(function(response) {
        // MARKER A
        // latitude
        tLat = response.results[0].geometry.location.lat;
        console.log(tLat);
        // longitude
        tLon = response.results[0].geometry.location.lng;
        console.log(tLon);
        // creating the location object
        //tLoc = new google.maps.LatLng(tLat, tLon);
        queryURLBase = "https://developers.zomato.com/api/v2.1/search?lat=" + tLat + "&lon=" + tLon + "&apikey=" + key;
        console.log(queryURLBase);

        function runQuery(numRestaurants, queryURL) {

            // Create AJAX Function
            $.ajax({ url: queryURLBase, method: "GET" })
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
                        // Attach the name
                        //$("#restWell-" + i).append("<h1> <a href='overview.html'>" + foodData.restaurants[i].restaurant.name + " </a></h1>");
                        $("#restWell-" + i).append("<h1> <a href='overview.html' onclick='javascript:database.ref().push({restaurant:\""+foodData.restaurants[i].restaurant.name+"\"});' >" + foodData.restaurants[i].restaurant.name + " </a></h1>");
                        // Attach the cuisines type
                        $("#restWell-" + i).append("<h3>" + foodData.restaurants[i].restaurant.cuisines + "</h3>");
                        // Attach the address
                        $("#restWell-" + i).append("<h3>" + foodData.restaurants[i].restaurant.location.address + ", " + foodData.restaurants[i].restaurant.location.locality_verbose + ", IL " + "</h3>");
                        // Attach the cost 4 2
                        $("#restWell-" + i).append("<h3> Average Cost For Two: $" + foodData.restaurants[i].restaurant.average_cost_for_two + "</h3>");
                        // Attach the rating
                        $("#restWell-" + i).append("<h3> Rating(1-5): " + foodData.restaurants[i].restaurant.user_rating.aggregate_rating + "</h3>");
                        // Attach the main zomoato photo of restaurant
                        $("#restWell-" + i).append("<img src='" + foodData.restaurants[i].restaurant.featured_image + "'/>");
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

            queryTerm = $('#searchBtn').val().trim();
            console.log(queryTerm);


            // Send the AJAX. Call the Assembled URL. Will change via movie thearter locaiton. 
            runQuery(0, "https://developers.zomato.com/api/v2.1/search?entity_id=292&entity_type=city&apikey=858f948cc66e31e989a5e17f72be49e3");

            return false;
        });
    });
});