var AppRouter = Backbone.Router.extend({
  routes: {
    "": "getMyLocation",
    "search": "searchPage",
    //"test": "getrecord",
    "find": "getrecord",
    "resultOnMap": "markResult"
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

  getrecord: function() {
    var resultView = this.resultView;
    var resultModel = this.resultModel;
    $.get("/findschool",function(data,status){
      resultModel.set('schoolName', data.schoolName);
      resultModel.set('city', data.city);
      resultModel.set('state', data.state);
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
            
            for (var i = 0; i < results.length; i++) {
              markerModel.set('map', mapView.map);
              markerModel.set('position', results[i].geometry.location);
              markerModel.set('name', results[i].name);
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
  }

});

var app = new AppRouter();

$(function() {
  Backbone.history.start();
});
