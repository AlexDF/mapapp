var MapView = Backbone.View.extend({
  
  render: function(latitude, longitude) {
   
   var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(latitude, longitude)
    };
    var mapDiv = document.getElementById('content');
    var map = new google.maps.Map(mapDiv, mapOptions);
    //$('#content').html(myLoc);
  }
  

});
