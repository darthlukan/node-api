
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

// API CRUD
app.get('/stuff', routes.findAll);
app.get('/stuff/:id', routes.findById);

app.post('/stuff', routes.addStuff);
app.put('/stuff/:id', routes.updateStuff);
app.delete('/stuff/:id', routes.deleteStuff);

// Engage
http.createServer(app).listen(app.get('port'), app.get('ipaddr'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
