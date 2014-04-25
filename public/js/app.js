var AppRouter = Backbone.Router.extend({
  routes: {
    "": "nearbySchools"
  }

  initialize: function() {

  },

  nearbySchools: function() {

  }



});

var app = new AppRouter();

$(function() {
  Backbone.history.start();
});
