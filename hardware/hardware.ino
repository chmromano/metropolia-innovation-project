
#include "src/sensors/temperature_sensor/TemperatureSensor.h"
#include "src/sensors/distance_sensor/DistanceSensor.h"
#include "src/WiFiController.h"


WiFiController wifiController;
TemperatureSensor tempSensor(6);
DistanceSensor distSensor(0);

void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println("-------------------------");
  Serial.println("Starting program.");
  delay(2000);

  /*
  if (wifiController.connectToNetwork()) {
    Serial.println("Connected to WiFi network.");
  }
  */

  /*
  if (tempSensor.readTemperature()) {
    int temperature = tempSensor.getTemperature();
    Serial.print("Temperature: ")
    Serial.println(temperature);
  }
  delay(2000);
  */

  /*
  if (distSensor.readDistance()) {
    long distance = distSensor.getDistance();
    Serial.print("Distance: ");
    Serial.println(distance);
  }
  delay(2000);
  */

  Serial.println("Resetting in 3 seconds.");
  Serial.println("-------------------------");
  delay(3000);
}
