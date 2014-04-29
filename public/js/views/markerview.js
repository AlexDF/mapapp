var MarkerView = Backbone.View.extend({
  
  initialize: function() {
    this.infoWindow = new google.maps.InfoWindow();
  },
 
  render: function(rating) {
    this.marker = new google.maps.Marker({
      map: this.model.get('map'),
      position: this.model.get('position'),
      name: this.model.get('name')
    });

    var infoWindow = this.infoWindow;   
    google.maps.event.addListener(this.marker, 'click', function() {               
      infoWindow.setContent('<b class="infoWindowText" id="infoWindowTitle">' + this.name + '</b>' + '<br>' + 
        '<span class="infoWindowText">Rating: ' + rating + '/10</span>');
      infoWindow.open(this.map, this);
    });
    
  }

});
