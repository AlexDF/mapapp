var AppRouter = Backbone.Router.extend({
  routes: {
    "": "getMyLocation",
    "search": "searchPage",
    //"test": "getrecord",
    "find/:school": "getrecord",
    "resultOnMap/:school/:city/:state/:rating": "markResult"
  },

  initialize: function() {
    this.mapModel = new MapModel();
    this.mapView = new MapView(
      {
        model: this.mapModel
      }
    );
    
    this.markerModel = new MarkerModel();
    this.markerView = new MarkerView(
      {
        model: this.markerModel
      }
    );

    this.resultModel = new ResultModel();
    this.resultView = new ResultView(
      {
        model: this.resultModel
      }
    );

    this.geocoder = new google.maps.Geocoder();
  },

  getrecord: function(school) {
    var resultView = this.resultView;
    var resultModel = this.resultModel;
    $.get("/findschool/" + school, function(data,status){
      resultModel.set('schoolName', data.schoolName);
      resultModel.set('city', data.city);
      resultModel.set('state', data.state);
      resultModel.set('rating', data.rating);
      resultView.render();
    });

  },

  getMyLocation: function() {
    var mapView = this.mapView;
    var mapModel = this.mapModel;
    var markerView = this.markerView;
    var markerModel = this.markerModel;

    if(navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(function(position) {
        
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        mapModel.set('latitude', pos.lat());
        mapModel.set('longitude', pos.lng());
        mapView.render();
        

      
        var request = {
          location: pos,
          radius: 2000,
          types: ['school']
        };

        var service = new google.maps.places.PlacesService(mapView.map);
        
        
        service.nearbySearch(request, function(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            var query;
            for (var i = 0; i < results.length; i++) {
              markerModel.set('map', mapView.map);
              markerModel.set('position', results[i].geometry.location);
              markerModel.set('name', results[i].name);
              
             query = $.ajax({
                url: '/findschool/' + results[i].name,
                async: false
                }).done(function(data) {
                  return data;
                });
              if(query.responseJSON !== undefined) {
               markerModel.set('rating', query.responseJSON.rating);
              } else {
                markerModel.set('rating', 'NR');
              }
              markerView.render();
            }

	  }
        });

      });
    } else {
      // Browser doesn't support Geolocation
    }
    
  },

  searchPage: function() {
    var searchView = new SearchView();
    $('#content').html(searchView.render().el);
  },

  markResult: function(school, city, state, rating) {
    //$('#content').html(school + city + state);
    var mapView = this.mapView;
    var mapModel = this.mapModel;
    
    var markerView = this.markerView;
    var markerModel = this.markerModel;

    this.geocoder.geocode( {'address': school + ' ' + city + ' ' + state}, function(results, status) {
      if ( status == google.maps.GeocoderStatus.OK ) {
        mapModel.set('latitude', results[0].geometry.location.lat());
        mapModel.set('longitude', results[0].geometry.location.lng());
        mapView.render();

        markerModel.set('map', mapView.map);
        markerModel.set('position', results[0].geometry.location);
        markerModel.set('name', school);
        markerModel.set('rating', rating);
        markerView.render();
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
 

  }



});

var app = new AppRouter();

$(function() {
  Backbone.history.start();

$('#content').on("swipeleft", function() { 
    //window.location.href='/#/search';
    $.mobile.navigate('/#/search', {transition: "slide"});
  });

   
     

});



