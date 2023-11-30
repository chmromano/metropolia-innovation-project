
#include "src/BLEController.h"
#include "src/FlashController.h"
#include "src/PlantController.h"
#include "src/WebSocketController.h"
#include "src/WiFiController.h"

#include "src/actuators/relay/Relay.h"
#include "src/sensors/distance_sensor/DistanceSensor.h"
#include "src/sensors/moisture_sensor/MoistureSensor.h"
#include "src/sensors/temperature_sensor/TemperatureSensor.h"

// char *serverAddress = "192.168.0.101";
char *serverAddress = "ws://plantuino.mrornito.net";
int port = 3000;
WiFiClient wifi;

/* Declaration and instantiation of common objects */
WiFiController wifiController;
FlashController flashController;
// BLEController bleController;
WebSocketController webSocketController = WebSocketController(wifi, serverAddress, port);
PlantController plantController;

/* Declaration and instantiation of sensors and actuators */
DistanceSensor distSensor(0);    // digital D0
TemperatureSensor tempSensor(6); // analog A6
MoistureSensor moistSensor2(2);  // analog A2-5
MoistureSensor moistSensor3(3);  // analog A2-5
MoistureSensor moistSensor4(4);  // analog A2-5
MoistureSensor moistSensor5(5);  // analog A2-5
// Relay pumpController(1, 2, 3, 4);  // digital D1-4

void setup()
{
    Serial.begin(9600);

    // Only needed to get debugging working immediately. No need in "prod".
    while (!Serial)
    {
        ;
    }

    if (!flashController.readCredentialsFromFlash())
    {
        // Read was not successful, data needs to be acquired via BLE
        Serial.println("Acquire data via BLE");

        // bleController declaration can probably be at the top of the program
        BLEController bleController;
        bleController.advertiseServiceAndPair("Plantuino");

        // Store received credentials inside flashController
        // to write to Flash and for later access.
        flashController.setTOKEN(bleController.getReceivedToken());
        flashController.setSSID(bleController.getReceivedWiFiSSID());
        flashController.setPASSWORD(bleController.getReceivedWiFiPassword());
        flashController.writeCredentialsToFlash();

        Serial.println("Credentials retrieved and written to flash successfully.");
    }

    // Connect to WiFi

    if (wifiController.connectToNetwork(flashController.getSSID(), flashController.getPASSWORD()))
    {
        Serial.println("Connected to WiFi network.");
    }
}

void loop()
{
    Serial.println("-------------------------");
    Serial.println("Starting program.");
    delay(2000);

    char *token = flashController.getTOKEN();
    char *ws = "ws://";

    String path = String(serverAddress) + String("?token=") + String(token);
    Serial.println(path);
    webSocketController.openConnectionWithToken(path.c_str());

    plantController.setThreshold(1, 35);
    plantController.setThreshold(2, 45);
    plantController.setThreshold(3, 55);

    while (webSocketController.isConnected())
    {
        Serial.println("WebSocket isConnected.");
        delay(1000);

        /*
         * plantController has a private member m_plants[4]. Each item in the list
         * is a PlantInfo struct, which has:
         *
         * bool watering = false
         * int wateringThreshold
         * int currentMoisture
         * int plantIndex
         *
         * Every 'x' minutes, read the moisture levels of the plants.
         * Store read moistures into an array of four integers.
         * Pass these values to the waterWhenNeeded function.
         */

        static unsigned long lastActionTime = 0;
        unsigned long currentTime = millis();

        // 1 minute = 60,000 milliseconds
        if (currentTime - lastActionTime > 10000)
        {
            Serial.println(
                "Time is up. Reading moistures, watering when needed, and sending DeviceMeasurement over WebSocket.");
            // int plantMoisture1 = moistSensor2.getMoisture();
            // int plantMoisture2 = moistSensor3.getMoisture();
            // int plantMoisture3 = moistSensor4.getMoisture();
            // int plantMoisture4 = moistSensor5.getMoisture();
            int plantMoisture1 = random(10, 91);
            int plantMoisture2 = random(10, 91);
            int plantMoisture3 = random(10, 91);
            int plantMoisture4 = random(10, 91);
            int plantMoistures[4] = {plantMoisture1, plantMoisture2, plantMoisture3, plantMoisture4};

            plantController.printArray();
            plantController.waterWhenNeeded(plantMoistures);

            // Send temperature measurement and tank level
            // webSocketController.sendDeviceMeasurement(tempSensor.getTemperature(), distSensor.getDistance());
            // Some way of translating the distance measurement into a need of watering needs to be implemented.
            // e.g. if distance > x --> tank level is low
            webSocketController.sendDeviceMeasurement(23.3, 15);
        }

        // Check if a message has been received
        int messageSize = webSocketController.parseMessage();
        if (messageSize > 0)
        {
            String receivedMessage = webSocketController.readString();
            Serial.print("Received message: ");
            Serial.println(receivedMessage);

            if (receivedMessage.indexOf("set_watering_t") != -1)
            {
                // Received message starts with 'set_watering_t'
                Serial.println("Received set_watering_t");
                int valueIndex = receivedMessage.indexOf("val=") + 4;
                int indexIndex = receivedMessage.indexOf("index=") + 6;
                int wateringThreshold =
                    (receivedMessage.substring(valueIndex, receivedMessage.indexOf("index=") - 1)).toInt();
                int plantIndex = (receivedMessage.substring(indexIndex)).toInt();

                plantController.setThreshold(plantIndex, wateringThreshold);
            }
            else if (receivedMessage.indexOf("activate_pump") != -1)
            {
                // Received message starts with 'activate_pump'
                Serial.println("Received activate_pump");
                int indexIndex = receivedMessage.indexOf("index=") + 6;
                int plantIndex = receivedMessage.substring(indexIndex).toInt();

                plantController.activatePump(plantIndex);
            }
            else
            {
                Serial.println("Received message not recognized.");
            }
        }
    }

    /*
      pumpController.activatePump(1, 2000);
      pumpController.activatePump(2, 2000);
      pumpController.activatePump(3, 2000);
      pumpController.activatePump(4, 2000);
      */

    /*
      // Temperature readings incorrect, needs fix. Tested with every component connected.
      if (tempSensor.readTemperature())
      {
          int temperature = tempSensor.getTemperature();
          Serial.print("Temperature: ");
          Serial.println(temperature);

      }
      */

    /*
      // Moisture sensors require calibration. Now giving 120%ish to 147%ish for dry and wet.
      if (distSensor.readDistance()) {
        long distance = distSensor.getDistance();
        Serial.print("Distance: ");
        Serial.println(distance);
      }
      delay(2000);

      if (moistSensor2.readMoisture())
      {
          int moisture = moistSensor2.getMoisture();
          Serial.print("Moisture %: ");
          Serial.println(moisture);
      }
      delay(2000);

      if (moistSensor3.readMoisture())
      {
          int moisture = moistSensor3.getMoisture();
          Serial.print("Moisture %: ");
          Serial.println(moisture);
      }
      delay(2000);

      if (moistSensor4.readMoisture())
      {
          int moisture = moistSensor4.getMoisture();
          Serial.print("Moisture %: ");
          Serial.println(moisture);
      }
      delay(2000);

      if (moistSensor5.readMoisture())
      {
          int moisture = moistSensor5.getMoisture();
          Serial.print("Moisture %: ");
          Serial.println(moisture);
      }
      delay(2000);
      */

    Serial.println("Resetting in 3 seconds.");
    Serial.println("-------------------------");
    delay(3000);
}
