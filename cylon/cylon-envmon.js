var cylon = require('cylon');
var shouldNotify = true;

cylon.robot({
	// Define connections
	connections: [
		// Spark Core
		{
			name: 'spark',
			adaptor: 'spark',
			accessToken: 'e818e848d3fa7bbe84c27bd94e76cbba5dcc36ff',
			deviceId: '55ff6c065075555323331487'
		},
		// Speech
		{ 
			name: 'speech', 
			adaptor: 'speech', 
			voice: 'en-f3', 
			speed: 130 
		},
		// AT&T M2X
		{
			name: 'm2x',
			adaptor: 'm2x',
			apiKey: '7cb85d2b4c5b411b9edc6184a7de4bd1', 
			feedId: 'b6c5659fe37d29d23f5f1e5f2760a42f'
		}
	],
	// Define devices
	devices: [
		// Spark Core
		{ 
			name: 'spark', 
			driver: 'spark' 
		},
		// AT&T M2X
		{ 
			name: 'attm2x', 
			driver: 'm2x' 
		},
		// Speech
		{ 
			name: 'mouth', 
			driver: 'speech' 
		}
	],
	
	work: function(my) {
		// When we receive the event from Spark Core
		my.spark.onEvent('cylon-envdata', function(data) {
			console.log("Raw Data:", data);	
			
			// Parse the data
			var index = data.indexOf("{");
			
			// If we have a valid json data
			if(-1 != index){
				// Pase the JSON data
				var jsonData = JSON.parse(data.substring(index));
				
				console.log("JSON Data:", jsonData);	
				console.log("Env Value:", jsonData.data);
				
				// Parse the Environment Sensor data
				var envData = JSON.parse(jsonData.data);
				
				console.log("Temperature: ", envData.t);
				console.log("Lux: ", envData.l);
				
				// Publish to M2X
				my.m2x.push('light', { value: envData.l });
				my.m2x.push('temperature', { value: envData.t });
				
				// If the light level is low, then notify using speech
				if(envData.l <= 10){
					if(shouldNotify){
						shouldNotify = false;
						
						my.speech.say("It's dark here, turn on the light.");
					}
				}
				else{
					shouldNotify = true;
				}
			}
		});
	}
}).start();