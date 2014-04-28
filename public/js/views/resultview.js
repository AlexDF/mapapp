var ResultView = Backbone.View.extend({
  
  render: function() {
    this.markup = '<a href="/#/resultOnMap"><div class="resultItem">' +
      '<b>' + this.model.get('schoolName') + '</b>' + '<br>' +
      this.model.get('city') + ', ' + this.model.get('state') +  
    '</div></a>';

    $('#content').append(this.markup);
  }


});
