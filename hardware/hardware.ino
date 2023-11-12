
#include "src/WebSocketController.h"
#include "src/WiFiController.h"
#include "src/actuators/relay/Relay.h"
#include "src/sensors/distance_sensor/DistanceSensor.h"
#include "src/sensors/moisture_sensor/MoistureSensor.h"
#include "src/sensors/temperature_sensor/TemperatureSensor.h"
#include "src/FlashController.h"

WiFiController wifiController;
WebSocketController webSocketController;
FlashController flashController;

DistanceSensor distSensor(0);
TemperatureSensor tempSensor(6);
MoistureSensor moistSensor(5);
Relay pumpController(1, 2, 3, 4);

void setup()
{
    Serial.begin(9600);

    // Only needed to get debugging working immediately. No need in "prod".
    while (!Serial)
    {
        ;
    }

    if (flashController.readFromFlash()) {
      Serial.println("Data read successful!");
      delay(3000);
      // Read was successful, meaning that the data existed in Flash
      
      Serial.println("Read from flash: ");
      Serial.println("Token: " + flashController.getTOKEN());
      Serial.println("WiFi SSID: " + flashController.getSSID());
      Serial.println("WiFi Password: " + flashController.getPASSWORD());

    } else {
      Serial.println("Data could not be read from flash. Writing new data to flash.");
      delay(3000);
      
      // Read was not successful, data needs to be acquired via BLE
      //
      // 1. Send Unique ID to Mobile App via BLE
      // 2. Recieve token from Mobile App via BLE
      // 3. Recieve WiFi SSID and password from Mobile App via BLE
      // 
      // NOTE! Token max length 64 char, WiFi SSID and password max length 32 char.

      String myToken = "ABCD-EFGH-IJKL-1234-5678-9010";
      String wifiSSID = "MyWiFiSSID";
      String wifiPASSWORD = "MyWiFiPassword!123";

      // Save the acquired values as members of flashController object for future use
      flashController.setTOKEN(myToken);
      flashController.setSSID(wifiSSID);
      flashController.setPASSWORD(wifiPASSWORD);

      // What is being written
      Serial.println("Writing to flash: ");
      Serial.println("Token: " + flashController.getTOKEN());
      Serial.println("WiFi SSID: " + flashController.getSSID());
      Serial.println("WiFi Password: " + flashController.getPASSWORD());

      // Write the values to Flash
      flashController.writeToFlash();
      delay(1000);
      Serial.println("Data has been written.");
    }
    
    // Connect to WiFi
    /*
    if (wifiController.connectToNetwork())
    {
        Serial.println("Connected to WiFi network.");
    }
    */

    // 12 bit ADC
    /*
    analogReadResolution(12);
    */
}

void loop()
{
    Serial.println("-------------------------");
    Serial.println("Starting program.");
    delay(2000);

    /*
    pumpController.activatePump(1, 2000);
    pumpController.activatePump(2, 2000);
    pumpController.activatePump(3, 2000);
    pumpController.activatePump(4, 2000);
    */

    /*
    if (tempSensor.readTemperature())
    {
        int temperature = tempSensor.getTemperature();
        Serial.print("Temperature: ");
        Serial.println(temperature);

    }
    */

    /*
    if (distSensor.readDistance()) {
      long distance = distSensor.getDistance();
      Serial.print("Distance: ");
      Serial.println(distance);
    }
    */

    /*
    if (moistSensor.readMoisture())
    {
        int moisture = moistSensor.getMoisture();
        Serial.print("Moisture %: ");
        Serial.println(moisture);
    }
    */

    Serial.println("Resetting in 3 seconds.");
    Serial.println("-------------------------");
    delay(3000);
}
