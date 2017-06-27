//Use Srict in conjuction with JQuery
( function ( $ ) {
    'use strict';
    $( document ).ready( function () {
        console.log( 'working!' );
    });
} ( jQuery ) );

//Function to Calculate today's date
var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var startDate = d.getFullYear() + '-' +
    ((''+month).length<2 ? '0' : '') + month + '-' +
    ((''+day).length<2 ? '0' : '') + day;

//Set Global Variables
var data;
var movies = [];
var endDate = '2017-07-15';
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

//Set functionality for on click Select Movies button
$("#selectMovies").on("click", function(event) {

//Assign the zipcode typed to a local variable
  var zipCode = $("#zipcode").val().trim();

$.ajax('https://data.tmsapi.com/v1.1/movies/showings?startDate='+startDate+'&endDate='+endDate+'&zip='+zipCode+'&api_key=vxy946ekttqwzeneue3rhdeg')
  .done(function(data) {

//Hide the input box and button
    $('#selectMovies').hide();
    $('#zipcode').hide();

    for (var i = 1; i < data.length; i++) {

    var imageURL = 'https://dlby.tmsimg.com/'+data[i].preferredImage.uri;
    var theaterArray = [];

     for (var j = 0; j < data[i].showtimes.length; j++) {
       theaterArray[j] = theaterArray.push(data[i].showtimes[j].ticketURI);
     }
     var theater = theaterArray.join(", ");

    $("#moviePoster").append('<a id="demo0'+i+'" href="#modal-0'+i+'"><img src="'+imageURL+'"></a><div id="modal-0'+i+'"><div id="btn-close-modal-'+i+'" class="close-modal-0'+i+'"><img class="closebt" src="./assets/images/closebt.svg" /></div><div class="modal-content"></div>'+theater+'</div>');

      $("#demo0"+i).animatedModal({
          modalTarget:'modal-0'+i,
          animatedIn:'lightSpeedIn',
          animatedOut:'bounceOutDown',
          color:'#3498db'
      });
    }

  }

);
});
