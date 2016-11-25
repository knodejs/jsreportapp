var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var pub = __dirname + '/public';
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(pub));


if (!module.parent) {
    app.listen(3000);
    console.log("Express server listening on port %d", 3000);
}
