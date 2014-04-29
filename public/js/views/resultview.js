var ResultView = Backbone.View.extend({
  initialize: function() {
    
  },  

  render: function() {
    this.resultHref = '<script>function markIt() { document.location.href = "/#/resultOnMap/' + this.model.get('schoolName') +
      '/' + this.model.get('city') + '/' + this.model.get('state') + '/' + this.model.get('rating') + '";}</script>';  
    this.markup = '<a id="resultItem" onclick="markIt()"><div class="resultItem">' +
      '<b>' + this.model.get('schoolName') + '</b>' + '<br>' +
      this.model.get('city') + ', ' + this.model.get('state') +  
      '</div></a>';

    $('#content').append(this.resultHref + this.markup);
  }


});
