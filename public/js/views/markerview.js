var MarkerView = Backbone.View.extend({
  
  initialize: function() {
    this.infoWindow = new google.maps.InfoWindow();
  },
 
  render: function() {
    this.marker = new google.maps.Marker({
      map: this.model.get('map'),
      position: this.model.get('position'),
      name: this.model.get('name')
    });

    var infoWindow = this.infoWindow;   
    google.maps.event.addListener(this.marker, 'click', function() {               
      infoWindow.setContent(this.name);
      infoWindow.open(this.map, this);
    });
    
  }

});
