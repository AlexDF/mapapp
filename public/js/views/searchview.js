var SearchView = Backbone.View.extend({

  render: function() {
    var markup = '<div>' + 
      '<form method="get" action="/findschool">' +
        '<img src="../../img/glass.jpg"><label for="school_name">Search</label>' + '<br>' +
        '<input type="text" name="school_name" placeholder="Enter a School Name">' +
        '<input type="submit" value="Search">' + '</form>' + 
      '</div>';
    this.$el.html(markup);
    return this;
  }

});
