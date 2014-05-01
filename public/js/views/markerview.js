var MarkerView = Backbone.View.extend({
  
  initialize: function() {
    this.infoWindow = new google.maps.InfoWindow();
  },
 
  render: function() {
    this.marker = new google.maps.Marker({
      map: this.model.get('map'),
      position: this.model.get('position'),
      name: this.model.get('name'),
      rating: this.model.get('rating')
    });

    var infoWindow = this.infoWindow;   
    google.maps.event.addListener(this.marker, 'click', function() {               
      infoWindow.setContent('<b class="infoWindowText" id="infoWindowTitle">' + this.name + '</b>' + '<br>' + 
        '<span class="infoWindowText">Rating: ' + this.rating + '/10</span>');
      infoWindow.open(this.map, this);
    });
    
  }

});
