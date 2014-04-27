var MapView = Backbone.View.extend({
  
  render: function() {
   
   var mapOptions = {
      zoom: this.model.get('zoom'),
      center: new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude'))
    };
    var mapDiv = document.getElementById('content');
    this.map = new google.maps.Map(mapDiv, mapOptions);
    
  }
  

});
