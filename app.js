const http = require('http');
const url = require('url');
const database = require('./db');
const qs = require('querystring');
const express = require('express');
const routes = require('./api-routes');
// const parser = require('body-parser');
const PORT = 3000;

const app = express();

// Import Body parser
const bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable

// create node server and handle pages requests
var server = http.createServer(function(req, res){
    var page = url.parse(req.url).pathname;
    var params = qs.parse(url.parse(req.url).query);
    console.log('request for ' + page);
    res.writeHead(200, {'Content-type': 'text/html'});
    if(page == '/') {
        res.write('Welcome to Node Js!!');
    } else if(page == '/aboutus') {
        res.write('about us page');
        if('q' in params) {
            res.write(' query string value' + params['q']);
        }
    } else if(page == '/contactus') {
        res.write('contact us page');
    }
    res.end();
});

app.get('/', function(req, res){
    res.send('...');
});

// app.use(app.router);
// routes.initialize(app);
app.use('/api', routes);

app.listen(PORT, function(){
    console.log('server running at port: ' + PORT);
});

