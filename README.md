Spark Core and Cylon.js
-----------------------

Here is a project I worked this weekend using Spark Core and Cylon.js. Cylon.js is a JavaScript robotics framework, it can be used to create solutions which integrates multiple hardware and software platforms. Cylon.js supports multiple platforms like, ARDrone, Pebble Watch, Leap Motion, AT&T M2X, Raspberry PI, etc...

In this project, I use TSL2561 Light sensor and TMP102 Temperature sensor to read light and temperature values. These values are published at specific intervals. The Cylon.js application subscribe these events and publish the data to [AT&T M2X Service](https://m2x.att.com/). AT&T M2X service can be used store and visualize sensor data. Just for fun if the light level is below a particular value, then an audible notification is done using TTS (using Cylon.js Speech platform).

Like Node-RED, Cylon.js and Spark Core can be used to create simple and powerful solution that integrate multiple hardware and platforms.

**Screenshots**
