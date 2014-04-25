var AppRouter = Backbone.Router.extend({
  routes: {
    "": "nearbySchools"
  },

  /*initialize: function() {

  },*/

  nearbySchools: function() {
    $('#content').html('backbone');
  }



});

var app = new AppRouter();

$(function() {
  Backbone.history.start();
});
