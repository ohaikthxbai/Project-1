var data;
var zipCode = 60601;
var startDate = '2017-06-26';
var movies = [];

//https://api.themoviedb.org/3/movie/550?api_key=2dbb3a151688e9f94a9dad27df9a71d8

//https://api.themoviedb.org/3/discover/movie
//?api_key=2dbb3a151688e9f94a9dad27df9a71d8&primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22


function showMovies() {
$.ajax('http://data.tmsapi.com/v1.1/movies/showings?startDate='+startDate+'&zip='+zipCode+'&api_key=vxy946ekttqwzeneue3rhdeg')
  .done(function(data) {

    for (var i = 0; i < data.length; i++) {

      var img = document.createElement("img");
      img.src = 'https://dlby.tmsimg.com/'+data[i].preferredImage.uri;
      img.id = 'demo0'+i;
      $('img').attr('href','#modal-02');

      var src = $('#moviePoster');

      $('#moviePoster').append(img);

      $("#demo0"+i).animatedModal({
          modalTarget:'modal-02',
          animatedIn:'lightSpeedIn',
          animatedOut:'bounceOutDown',
          color:'#3498db'
      });

      }

  });

}

showMovies();








//http://data.tmsapi.com/v1.1/movies/showings?api_key=vxy946ekttqwzeneue3rhdeg&startDate=2017-06-24&zip=60601
//http://data.tmsapi.com/v1.1/movies/showings?api_key=vxy946ekttqwzeneue3rhdeg&startDate=2017-06-24&zip=60601&tmsId=MV000756790000
//http://data.tmsapi.com/v1.1/movies/showings?startDate=2017-06-24&zip=60611&api_key=vxy946ekttqwzeneue3rhdeg
//https://dlby.tmsimg.com/assets/p11714883_v_v5_aa.jpg
