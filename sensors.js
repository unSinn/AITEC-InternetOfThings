var os = require('os');

/**
 * Sensor class
 */
function Sensor(description, unit, onRefresh, onSetValue) {
    this.description = description;
    this.unit = unit;
    this.value = undefined;
    this.refresh = onRefresh; // polling the current value
    this.setValue = onSetValue; // returns false on error
}

/**
 * Implement sensors
 */
var lamp = new Sensor('A shiny lamp', 'On/Off', function() {
    // can we sense if the lamp is on?
}, function(value) {
    if (this.value === undefined) {
	// turn lamp off
	this.value = 'off';
    }

    if (value == 'toggle') {
	this.value = toggle(this.value);
    } else {
	this.value = value;
    }

    console.log('Turned Lamp ' + this.value);
    return true;
});

var cpu = new Sensor('CPU monitor', '%', function() {
    this.value = os.loadavg();
}, function(value) {
    return false;
});

/**
 * Export the list of sensors
 */
exports.list = function() {
    return {
	lamp : lamp,
	cpu : cpu
    }
};

/**
 * Helper Methods
 */
function toggle(value) {
    if (value == 'on') {
	value = 'off';
    } else {
	value = 'on';
    }
    return value;
}