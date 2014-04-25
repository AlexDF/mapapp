var express = require('express');

var app = express().use(express.static('public'));


app.get('/hello', function(req, res) {
  res.send("hello");
});

app.listen(3000, function() {
  console.log("Listening at port: 3000");
});
