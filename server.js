var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var pub = __dirname + '/public';
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(pub));

var port=process.env.PORT | 3000;

if (!module.parent) {
    app.listen(port);
    console.log("Express server listening on port %d", port);
}
