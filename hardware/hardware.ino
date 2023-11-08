
#include "src/WebSocketController.h"
#include "src/WiFiController.h"
#include "src/actuators/relay/Relay.h"
#include "src/sensors/distance_sensor/DistanceSensor.h"
#include "src/sensors/moisture_sensor/MoistureSensor.h"
#include "src/sensors/temperature_sensor/TemperatureSensor.h"
// #include <ArduinoHttpClient.h>

WiFiController wifiController;
WebSocketController webSocketController;
DistanceSensor distSensor(0);
TemperatureSensor tempSensor(6);
MoistureSensor moistSensor(5);
Relay pumpController(1, 2, 3, 4);

char serverAddress[] = "echo.websocket.events"; // address for server to echo back WebSocket messages
int port = 80;
int messageCount = 0;

WiFiClient wifi;
WebSocketClient client = WebSocketClient(wifi, serverAddress, port);

void setup()
{
    Serial.begin(9600);

    // Only needed to get debugging working immediately. No need in "prod".
    while (!Serial)
    {
        ;
    }

    // Connect to WiFi
    if (wifiController.connectToNetwork())
    {
        Serial.println("Connected to WiFi network.");
    }

    // 12 bit ADC
    analogReadResolution(12);
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
