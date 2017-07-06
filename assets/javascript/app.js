//Use Srict in conjuction with JQuery
(function($) {
  'use strict';
  $(document).ready(function() {
    console.log('working!');
  });
}(jQuery));


//Function to Calculate today's date
var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();
var startDate = d.getFullYear() + '-' +
  (('' + month).length < 2 ? '0' : '') + month + '-' +
  (('' + day).length < 2 ? '0' : '') + day;

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
$(document).ready (function(event) {

  //Assign the zipcode typed to a local variable
  var zipCode = '60601';
  var apikey = 'y2u5f77zh23pt34ukav7utg4';


  $.ajax('https://data.tmsapi.com/v1.1/movies/showings?startDate=' + startDate + '&endDate=' + endDate + '&zip=' + zipCode + '&api_key=' + apikey)
    .done(function(data) {


        for (var i = 1; i < 8; i++) {

          var imageURL = 'https://dlby.tmsimg.com/' + data[i].preferredImage.uri;

          var title = '<h1>' + data[i].title + '</h1>'+'<h5>'+data[i].shortDescription+'</h5>';

//Create the posters
          $("#sampleMovies").append('<a><img src="' + imageURL + '"></a>');
        }

});

});


//Set functionality for on click Select Movies button
$("#selectMovies").on("click", function(event) {

  //Assign the zipcode typed to a local variable
  var zipCode = $("#zipcode").val().trim();
  var apikey = 'y2u5f77zh23pt34ukav7utg4';

  database.ref().push({
    zipcode: zipCode
  });

  $.ajax('https://data.tmsapi.com/v1.1/movies/showings?startDate=' + startDate + '&endDate=' + endDate + '&zip=' + zipCode + '&api_key=' + apikey)
    .done(function(data) {

        //Hide the input box and button
        $('#selectMovies').hide();
        $('#zipcode').hide();
        $('#description').hide();
        $('#sampleMovies').hide();

        for (var i = 1; i < data.length; i++) {

          var imageURL = 'https://dlby.tmsimg.com/' + data[i].preferredImage.uri;

          var title = '<h1>' + data[i].title + '</h1>'+'<h5>'+data[i].shortDescription+'</h5>';
          var showTimes = [];
          var theatre = [];

//Create the posters
          $("#moviePoster").append('<a id="demo0' + i + '" href="#modal-0' + i + '"><img src="' + imageURL + '"></a>');

//Create a list of distinct theatres for each movie
          for (var k = 0; k < data[i].showtimes.length; k++) {
            if (theatre.indexOf(data[i].showtimes[k].theatre.name) === -1) {
              var theatreName = data[i].showtimes[k].theatre.name;
              theatre.push(theatreName);
  //            $("#moviePoster").append('<div id="modal-0' + i + '"><div id="btn-close-modal-' + i + '" class="close-modal-0' + i + '"><img class="closebt" src="./assets/images/closebt.svg" /></div><div class="modal-content"></div>' + theatreName + '</div>');
            }
          }

          for(var j = 0; j < data[i].showtimes.length; j++) {
            for(m = 0; m < theatre.length; m++) {
              if(data[i].showtimes[j].theatre.name === theatre[m]) {
                var show = '<a href="restaurant.html" onclick="javascript:database.ref().push({thetre:\''+data[i].showtimes[j].theatre.name+'\'});">'+moment(data[i].showtimes[j].dateTime).format('LT')+'</a>';
                showTimes.push(show);
              }
            }
          }

          var theatreTimes = $.map(theatre, function(v, i) { return [v, showTimes[i]]; });

          $("#moviePoster").append('<div id="modal-0' + i + '"><div id="btn-close-modal-' + i + '" class="close-modal-0' + i + '"><img class="closebt" src="./assets/images/closebt.svg" /></div><div class="modal-content"></div>'+'<div class="h1 container"'+title+'<div class="h5 well">'+theatreTimes.join("<br>") + '</div></div></div>');

          // for (var j = 0; j < data[i].showtimes.length; j++) {
          //
          // $("#moviePoster").append('<a id="demo0' + i + '" href="#modal-0' + i + '"><img src="' + imageURL + '"></a><div id="modal-0' + i + '"><div id="btn-close-modal-' + i + '" class="close-modal-0' + i + '"><img class="closebt" src="./assets/images/closebt.svg" /></div><div class="modal-content"></div>' + theatreName + '</div>');
          // }

          // for (var j = 0; j < data[i].showtimes.length; j++) {
          //   showTimes.push('<h4>' + data[i].showtimes[j].dateTime + '</h4>');
          //   theatre.push('<h4>' + data[i].showtimes[j].theatre.name + '</h4>');
          // }

//         <div id="modal-0' + i + '"><div id="btn-close-modal-' + i + '" class="close-modal-0' + i + '"><img class="closebt" src="./assets/images/closebt.svg" /></div><div class="modal-content"></div>' + title + theatre + showTimes + '</div>');



          $("#demo0" + i).animatedModal({
            modalTarget: 'modal-0' + i,
            animatedIn: 'lightSpeedIn',
            animatedOut: 'bounceOutDown',
            color: '#E1E1E1'
          });
        }

      }

    );
});

//Function to on.click when user hits enter
$('#zipcode').keypress(function(e) {
  var key = e.which;
  if (key == 13) // the enter key code
  {
    $('input[name = butAssignProd]').click();
    return false;
  }
});
