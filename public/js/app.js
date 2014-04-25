var AppRouter = Backbone.Router.extend({
  routes: {
    "": "nearbySchools",
    "map": "showMap",
    "search": "searchPage"
  },

  initialize: function() {
    this.mapView = new MapView();
    this.geocoder = new google.maps.Geocoder();
  },

  showMap: function() {
    
    this.mapView.render();
  },

  nearbySchools: function() {
    
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        //var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        $('#content').html(position.coords.latitude);
        
      });
    } else {
      // Browser doesn't support Geolocation
    }
  }, // end nearbySchools

  searchPage: function() {
    var searchView = new SearchView();
    $('#content').html(searchView.render().el);
  }

});

var app = new AppRouter();

$(function() {
  Backbone.history.start();
});
