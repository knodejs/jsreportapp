var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var pub = __dirname + '/public';
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(pub));

app.set('port', (process.env.PORT || 3000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});


//if (!module.parent) {
    //app.listen(app.get('port'));
    //console.log("Express server listening on port %d", app.get('port'));
//}
