    
    // Global Variables
    var databaseOne; // movie theatre address/name
    var databaseTwo; // restaurant address/name
    var movieLoc; // theatre coord object
    var restLoc; // restaurant coord object
    var directionService; // API function
    var directionsDisplay; // API function
    var map; // map object
    var movieLat, movieLng; // movie coordinates
    var restLat, restLng; // restaurant coordinates
    var startLat, startLng; // strating coordinates
    var startLoc; // starting coord object
    var databaseThree; // starting address/name
    var str;
    var str2;
    var gotIt;

    var firebase;
    //Set Firebase connection
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
     
    //console.log(recentPostsRef);
    database.ref().limitToLast(2).on("child_added", function(snapshot) {
       
        var objArray = [];
        var snapValue = snapshot.val();
        var newObject = database.ref().limitToLast(2-1).on("child_added", function(snapshot) {
        	var newSnapValue = snapshot.val();
        	//console.log(newSnapValue);
        	gotIt = JSON.stringify(snapValue["restaurant"]).replace(/"/g, "");
        	$('#restaurant').append(gotIt);
        	});
        //console.log(snapValue);
        //console.log(snapValue);
    	var all = JSON.stringify(snapValue).replace(/"/g, "");
    	console.log(all);
        str = JSON.stringify(snapValue["theatre"]).replace(/"/g, "");
        str2 = JSON.stringify(snapValue["time"]).replace(/"/g, "");
        str3 = JSON.stringify(snapValue["movie"]).replace(/"/g, "");
        //str3 = JSON.stringify(snapValue["restaurant"]).replace(/"/g, "");
        //console.log(str);
        //console.log(str2);
        //console.log(str3);
        //.log(typeof str);
        
            // display the map, its points, and route
    function initMap() {
        // API Key
        var key = "AIzaSyBlKlaUsiPTlUdhJDeX7hfw4TR6PHQKnSc";
        //WORKS WITH NAMES TOOOOOOO
        databaseOne = "Ravenswood, IL"; // test; will be dynamic based on data
        // format address to replace spaces with + symbols
        var addressOne = databaseOne.split(' ').join('+');
        var markerOne = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressOne + "&key=" + key;
        //console.log(markerOne);
        databaseTwo = str; // test; will be dynamic based on data
        var addressTwo = databaseTwo.split(' ').join('+');
        var markerTwo = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressTwo + "&key=" + key;
        //console.log(markerTwo);
		//databaseThree = gotIt;
        databaseThree = "Lincoln Park, IL"; // test; will be dynamic based on data
        var addressThree = databaseThree.split(' ').join('+');
        //console.log(addressTest);
        var markerThree = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressThree + "&key=" + key;
        //console.log(markerThree);
        
        $('#theatre').append(str);
        $('#movie-time').append(str2);
        $('#movie-title').append(str3);

        // grabbing the data from the API       
        $.ajax({
            url: markerOne,
            method: 'GET'
        }).done(function(response) {
            // MARKER A
            // latitude
            startLat = response.results[0].geometry.location.lat;
            //console.log(startLat);
            // longitude
            startLng = response.results[0].geometry.location.lng;
            //console.log(startLng);
            // creating the location object
            startLoc = new google.maps.LatLng(startLat, startLng);
            //console.log(startLoc);
            // (nested) grabbing second piece of data from API
            $.ajax({
                url: markerTwo,
                method: 'GET'
            }).done(function(response) {

                // MARKER B
                // latitude
                movieLat = response.results[0].geometry.location.lat;
                //console.log(restLat);
                // longitude
                movieLng = response.results[0].geometry.location.lng;
                //console.log(restLng);
                // location object
                movieLoc = new google.maps.LatLng(movieLat, movieLng);

                $.ajax({
                    url: markerThree,
                    method: 'GET'
                }).done(function(response) {
                    // MARKER C
                    // latitude
                    restLat = response.results[0].geometry.location.lat;
                    //console.log(restLat);
                    // longitude
                    restLng = response.results[0].geometry.location.lng;
                    //console.log(restLng);
                    // location object
                    restLoc = new google.maps.LatLng(restLat, restLng);
                    //console.log(restLoc);

                    // define Google Maps API methods
                    directionsService = new google.maps.DirectionsService();
                    directionsDisplay = new google.maps.DirectionsRenderer();

                    // define zoom and center
                    var mapOptions = {
                            zoom: 10,
                            center: movieLoc
                        }
                        // defining the map
                    map = new google.maps.Map(document.getElementById('map'), mapOptions);
                    directionsDisplay.setMap(map);
                    // defining the start and end points
                    var waypts = [];
                    waypts = [{
                        location: movieLoc,
                        stopover: true
                    }];
                    var start = movieLoc;
                    var end = restLoc;
                    var request = {
                        origin: start,
                        destination: end,
                        //waypoints: waypts,
                        travelMode: 'DRIVING'
                    };
                    // grabbed from Google Maps API documentation
                    directionsService.route(request, function(result, status) {
                        if (status == 'OK') {
                            directionsDisplay.setDirections(result);
                        }
                    });
                })

            })
        })
    }

    initMap();
       
    });



    /*
    // TESTING USER INPUTS USING TEXT FIELDS
    $("#submit-btn").on("click", function(event) {
        event.preventDefault();
        // declare variable, reads and assigns user input as value
        var inputOne = $("#addy-one").val().trim();
        //var inputTwo = $("#addy-dos").val().trim();

        databaseOne = inputOne;
        //databaseTwo = inputTwo;

        //console.log(databaseOne);
        //console.log(databaseTwo);
        initMap();

    });
    */


// display the map, its points, and route
//     function initMap() {
//         // API Key
//         var key = "AIzaSyBlKlaUsiPTlUdhJDeX7hfw4TR6PHQKnSc";
//         //WORKS WITH NAMES TOOOOOOO
//         databaseOne = "Ravenswood, IL"; // test; will be dynamic based on data
//         // format address to replace spaces with + symbols
//         var addressOne = databaseOne.split(' ').join('+');
//         var markerOne = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressOne + "&key=" + key;
//         console.log(markerOne);
//         databaseTwo = "Lakeview, IL"; // test; will be dynamic based on data
//         var addressTwo = databaseTwo.split(' ').join('+');
//         var markerTwo = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressTwo + "&key=" + key;
//         //console.log(markerTwo);
// 
//         databaseThree = "West Loop, IL"; // test; will be dynamic based on data
//         var addressThree = databaseThree.split(' ').join('+');
//         //console.log(addressTest);
//         var markerThree = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressThree + "&key=" + key;
//         //console.log(markerThree);
// 
//         // grabbing the data from the API       
//         $.ajax({
//             url: markerOne,
//             method: 'GET'
//         }).done(function(response) {
//             // MARKER A
//             // latitude
//             startLat = response.results[0].geometry.location.lat;
//             //console.log(startLat);
//             // longitude
//             startLng = response.results[0].geometry.location.lng;
//             //console.log(startLng);
//             // creating the location object
//             startLoc = new google.maps.LatLng(startLat, startLng);
//             //console.log(startLoc);
//             // (nested) grabbing second piece of data from API
//             $.ajax({
//                 url: markerTwo,
//                 method: 'GET'
//             }).done(function(response) {
// 
//                 // MARKER B
//                 // latitude
//                 movieLat = response.results[0].geometry.location.lat;
//                 //console.log(restLat);
//                 // longitude
//                 movieLng = response.results[0].geometry.location.lng;
//                 //console.log(restLng);
//                 // location object
//                 movieLoc = new google.maps.LatLng(movieLat, movieLng);
// 
//                 $.ajax({
//                     url: markerThree,
//                     method: 'GET'
//                 }).done(function(response) {
//                     // MARKER C
//                     // latitude
//                     restLat = response.results[0].geometry.location.lat;
//                     //console.log(restLat);
//                     // longitude
//                     restLng = response.results[0].geometry.location.lng;
//                     //console.log(restLng);
//                     // location object
//                     restLoc = new google.maps.LatLng(restLat, restLng);
//                     //console.log(restLoc);
// 
//                     // define Google Maps API methods
//                     directionsService = new google.maps.DirectionsService();
//                     directionsDisplay = new google.maps.DirectionsRenderer();
// 
//                     // define zoom and center
//                     var mapOptions = {
//                             zoom: 10,
//                             center: movieLoc
//                         }
//                         // defining the map
//                     map = new google.maps.Map(document.getElementById('map'), mapOptions);
//                     directionsDisplay.setMap(map);
//                     // defining the start and end points
//                     var waypts = [];
//                     waypts = [{
//                         location: movieLoc,
//                         stopover: true
//                     }];
//                     var start = movieLoc;
//                     var end = restLoc;
//                     var request = {
//                         origin: start,
//                         destination: end,
//                         //waypoints: waypts,
//                         travelMode: 'DRIVING'
//                     };
//                     // grabbed from Google Maps API documentation
//                     directionsService.route(request, function(result, status) {
//                         if (status == 'OK') {
//                             directionsDisplay.setDirections(result);
//                         }
//                     });
//                 })
// 
//             })
//         })
//     }
// 
//     initMap();
