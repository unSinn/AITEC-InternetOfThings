var os = require('os');

/**
 * Sensor class
 */
function Sensor(description, unit, onRefresh, onSetValue) {
    this.description = description;
    this.unit = unit;
    this.value = 0;
    this.refresh = onRefresh;
    this.setValue = onSetValue; // returns false on error
}

var lamp = new Sensor('A shiny lamp', 'On/Off', function() {
    // can we sense if the lamp is on?
}, function(value) {
    console.log('Turning Lamp' + value);
    this.value = value;
    return true;
});

var cpu = new Sensor('CPU monitor', '%', function() {
    this.value = os.loadavg();
}, function(value) {
    return false;
});

exports.list = function() {
    return {
	lamp : lamp,
	cpu : cpu
    }
};
