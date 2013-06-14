AITEC-InternetOfThings
======================

Node.js Application providing a REST interface for Internet of Things.

Installation
-----

* Install node.js
* Switch into project directory and install dependencies:
   cd https://github.com/unSinn/AITEC-InternetOfThings.git
   npm install -g
* Start the server
   node server.js

Usage
-----
* GET a list of things:
   curl http://localhost:8080/things
* GET a sensor value:
   curl http://localhost:8080/things/cpu
* POST to toggle a lamp: 
   curl -i -X POST -d 'value=On' http://localhost:8080/things/lamp
* There is also a small web interface to play around:
  * Open your browser and browse to <code>http://localhost:8080/</code>

