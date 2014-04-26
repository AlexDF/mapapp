var AppRouter = Backbone.Router.extend({
  routes: {
    "": "getMyLocation",
    //"map": "showMap",
    "search": "searchPage"
  },

  initialize: function() {
    this.mapView = new MapView();
    this.geocoder = new google.maps.Geocoder();
    
  },

  getMyLocation: function() {
    var mapView = this.mapView;
    
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        mapView.render(position.coords.latitude, position.coords.longitude);
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
