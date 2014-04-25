var MapView = Backbone.View.extend({
  
  render: function() {
    var mapOptions = {
      zoom: 8, 
      center: new google.maps.LatLng(40, -76)
    };
    var mapDiv = document.getElementById('content');
    var map = new google.maps.Map(mapDiv, mapOptions);

  }


});
