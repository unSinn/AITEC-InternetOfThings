/*
 * ====== Imports
 */
var fs = require('fs');
var restify = require('restify');
var sensors = require('./sensors.js');

var sensorList = sensors.list();
var server = restify.createServer();

/*
 * ====== Routing
 */
server.post('/things/:name', setValue);
server.get('/things', sendList);
server.get('/things/:name', getSensor);

// Serve HTML from webroot
server.get('/', restify.serveStatic({
    directory : './webroot',
    default: 'index.html'
}));

/*
 * ====== Routes
 */

function getSensor(req, res, next) {
    var sensor = sensorList[req.params.name];
    if (sensor) {
	res.send(sensor);
    }
    return next();
}

function sendList(req, res, next) {
    var list = {};
    for (s in sensorList) {
	list[s] = sensorList[s].name;
    }
    return next();
}

function setValue(req, res, next) {
    console.log(req.params.name + ' will be updated when it is implemented, value would be' + req.params.value);
    var sensor = sensorList[req.params.name];
    var result;
    if (sensor) {
	result = sensor.setValue('On');
    }
    res.send({ok: result, valueIsNow: sensor.value});
    return next();
}

/*
 * ====== Start the Server
 */
server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});

/*
 * Start periodic polling of Sensorvalues
 */

setInterval(function() {
    for (s in sensorList) {
	sensorList[s].refresh();
    }
}, 10000);
