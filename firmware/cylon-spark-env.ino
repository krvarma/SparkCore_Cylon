// This #include statement was automatically added by the Spark IDE.
#include "SFE_TSL2561.h"

SFE_TSL2561 tsl = SFE_TSL2561();

int tmp102Address = 0x48;
unsigned char id;
unsigned int ms;

// Read light value from the TSL2561 sensor
double readLux(){
    unsigned int data1;
    unsigned int data2;
    boolean gain;
    double lux;

    tsl.getData(data1, data2);
    
    boolean good = tsl.getLux(gain,ms,data1,data2,lux);
    
    return lux;
}

// Read temperature fomr TMP102
float getTemperature(){
  Wire.requestFrom(tmp102Address,2); 

  byte MSB = Wire.read();
  byte LSB = Wire.read();

  //it's a 12bit int, using two's compliment for negative
  int TemperatureSum = ((MSB << 8) | LSB) >> 4; 

  float celsius = TemperatureSum*0.0625;
  
  return celsius;
}

// Publish the sensor data
void publish(){
    char szInfo[64];
    
    sprintf(szInfo, "{\"t\":%.02f, \"l\":%.02f}", getTemperature(), readLux());
    
    Serial.println(szInfo);
    Spark.publish("cylon-envdata", szInfo);
}

void setup() {
    // Setup serial and wire
    Serial.begin(9600);
    Wire.begin();
    
    // Setup TSL2561
    tsl.begin();
    tsl.getID(id);
	tsl.setTiming(0, 2, ms);
	tsl.setPowerUp();
}

void loop() {
    // Publish the data
    publish();
    
    // Delay 
    delay(20000);
}