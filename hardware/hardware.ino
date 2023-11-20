
#include "src/BLEController.h"
#include "src/FlashController.h"
#include "src/WebSocketController.h"
#include "src/WiFiController.h"

#include "src/actuators/relay/Relay.h"
#include "src/sensors/distance_sensor/DistanceSensor.h"
#include "src/sensors/moisture_sensor/MoistureSensor.h"
#include "src/sensors/temperature_sensor/TemperatureSensor.h"

/* Declaration and instantiation of common objects */
WiFiController wifiController;
WebSocketController webSocketController;
FlashController flashController;
// BLEController bleController;

/* Declaration and instantiation of sensors and actuators */
DistanceSensor distSensor(0);
TemperatureSensor tempSensor(6);
MoistureSensor moistSensor(5);
Relay pumpController(1, 2, 3, 4);

BLEService deviceSetupService("EB2269B7-F5E0-4A5E-B480-765CCB24649D");
BLEStringCharacteristic supportedPlantsCharacteristic("B12AB6EA-1785-4F08-B194-0B0AA343605C", BLERead, 48);
BLEStringCharacteristic uniqueIdCharacteristic("9DEC44C4-C21F-4D8F-9CC9-26E21C6F136B", BLERead, 48);
BLEStringCharacteristic tokenCharacteristic("49A5280A-FF31-42D2-A56A-EF1940EB5C7D", BLERead | BLEWrite, 96);
BLEStringCharacteristic ssidCharacteristic("54CF0E15-424B-4DB3-8B8D-AC2F2A4E4E13", BLERead | BLEWrite, 96);
BLEStringCharacteristic passwordCharacteristic("F1DB5367-EBFD-447C-A85C-2135AFD18A27", BLERead | BLEWrite, 96);

void setup()
{
    Serial.begin(9600);

    // Only needed to get debugging working immediately. No need in "prod".
    while (!Serial)
    {
        ;
    }

    if (flashController.readFromFlash())
    {
        Serial.println("Data read successful!");
        // Read was successful, meaning that the data existed in Flash

        Serial.println("Read from flash: ");
        Serial.println("Token: " + flashController.getTOKEN());
        Serial.println("WiFi SSID: " + flashController.getSSID());
        Serial.println("WiFi Password: " + flashController.getPASSWORD());
    }
    else
    {
        Serial.println("No data available in Flash.");

        // Read was not successful, data needs to be acquired via BLE

        // bleController declaration can probably be at the top of the program
        BLEController bleController;

        bleController.advertiseServiceAndPair("Plantuino");
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
