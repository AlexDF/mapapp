var SearchView = Backbone.View.extend({

  initialize: function() {
    this.goButtonHref = '<script>function fetchIt() { document.location.href = "/#/find/" + $("#school_name").val();}</script>';
  },

  render: function() {
    $('#content').css({'background-color': '#FFF'});
    var markup = '<div>' + 
        '<br><label id="search_label" for="school_name">Search</label>&nbsp;<img id="glass_img" src="../../img/glass.jpg">' + '<br>' +
        '<input type="text" id="school_name" placeholder="Enter a School Name">' +
        '<a id="goButton" onclick="fetchIt()"><div>Go</div></a>' + 
        '</div>';
    this.$el.html(this.goButtonHref + markup);
    return this;
  }

});
