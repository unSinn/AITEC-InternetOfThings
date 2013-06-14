/*
 * ====== Imports
 */
var fs = require('fs');
var restify = require('restify');
var sensors = require('./sensors.js');

var sensorList = sensors.list();
var server = restify.createServer();

// Parse parameters in GET URL
server.use(restify.queryParser());
// Parse parameters in POST HTML body
server.use(restify.bodyParser());

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
    }else{
	res.send({message: 'Sensor not found.'});
    }
    return next();
}

function sendList(req, res, next) {
    var list = {};
    for (s in sensorList) {
	list[s] = {};
	list[s].name = sensorList[s].name;
	list[s].description = sensorList[s].description;
    }
    res.send(list);
    return next();
}

function setValue(req, res, next) {
    if(req.params.value === undefined){
	restify.InvalidArgumentError('newSensorValue value not set.');
	return next();
    }
    var sensor = sensorList[req.params.name];
    var result;
    if (sensor) {
	result = sensor.setValue(req.params.value);
	res.send({ok: result, valueIsNow: sensor.value});
    }else{
	res.send({ok: false, message: 'Sensor not found.'});
    }
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
