var AppRouter = Backbone.Router.extend({
  routes: {
    "": "getMyLocation",
    //"map": "showMap",
    "search": "searchPage"
  },

  initialize: function() {
    this.mapModel = new MapModel();
    this.mapView = new MapView(
      {
        model: this.mapModel
      }
    );
    this.geocoder = new google.maps.Geocoder();
    this.infoWindow = new google.maps.InfoWindow();
  },

  getMyLocation: function() {
    var mapView = this.mapView;
    var mapModel = this.mapModel;
    var infoWindow = this.infoWindow;

    if(navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(function(position) {
        
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        mapModel.set('latitude', pos.lat());
        mapModel.set('longitude', pos.lng());
        mapView.render();
        

      
        var request = {
          location: pos,
          radius: 3000,
          types: ['school']
        };

        var service = new google.maps.places.PlacesService(mapView.map);
        
        
        service.nearbySearch(request, function(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            var name; 
            for (var i = 0; i < results.length; i++) {
              //var placeLoc = results[i].geometry.location;
              var marker = new google.maps.Marker({
                map: mapView.map,
                position: results[i].geometry.location
              });
              name = i.toString();
              google.maps.event.addListener(marker, 'click', function() {               
		infoWindow.setContent(name);
                infoWindow.open(mapView.map, this);
              });

            }
              
	  }
        });

      });
    } else {
      // Browser doesn't support Geolocation
    }
    
  }, 

  /*showMap: function() {
    this.getMyLocation();
    //this.mapView.render(myLocation);
    //$('#content').html(this.myLocation);
  },*/

  

  searchPage: function() {
    var searchView = new SearchView();
    $('#content').html(searchView.render().el);
  }

});

var app = new AppRouter();

$(function() {
  Backbone.history.start();
});
