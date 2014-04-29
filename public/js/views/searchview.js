var SearchView = Backbone.View.extend({

  initialize: function() {
    this.goButtonHref = '<script>function fetchIt() { document.location.href = "/#/find/" + $("#school_name").val();}</script>';
  },

  render: function() {
    var markup = '<div>' + 
        '<img src="../../img/glass.jpg"><label for="school_name">Search</label>' + '<br>' +
        '<input type="text" id="school_name" placeholder="Enter a School Name">' +
        '<a id="goButton" onclick="fetchIt()"><div>Go</div></a>' + 
        '</div>';
    this.$el.html(this.goButtonHref + markup);
    return this;
  }

});
