var AppRouter = Backbone.Router.extend({
  routes: {
    "": "nearbySchools",
    "map": "showMap"
  },

  initialize: function() {
    
    var geocoder = new google.maps.Geocoder();
  },

  showMap: function() {
    var mapOptions = {
      zoom: 14, 
      center: new google.maps.LatLng(-60, 150)
    };
    var mapDiv = document.getElementById('content');
    var map = new google.maps.Map(mapDiv, mapOptions);
  },

  nearbySchools: function() {
    //$('#content').html(this.myvar);
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        //var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        $('#content').html(position.coords.latitude);
        
      });
    } else {
      // Browser doesn't support Geolocation
    }
  }



});

var app = new AppRouter();

$(function() {
  Backbone.history.start();
});
