
#include "src/BLEController.h"
#include "src/FlashController.h"
#include "src/PlantController.h"
#include "src/WebSocketController.h"
#include "src/WiFiController.h"

#include "src/actuators/relay/Relay.h"
#include "src/sensors/distance_sensor/DistanceSensor.h"
#include "src/sensors/moisture_sensor/MoistureSensor.h"
#include "src/sensors/temperature_sensor/TemperatureSensor.h"

char *serverAddress = "192.168.0.101";
// char *serverAddress = "192.168.0.138"; // WebSocket connection works if this is IP address. Does NOT work with
//  plantuino.mrornito.net. Does NOT work with https://plantuino.mrornito.net
int port = 3000;
WiFiClient wifi;

/* Declaration and instantiation of common objects */
WiFiController wifiController;
FlashController flashController;
// BLEController bleController;
WebSocketController webSocketController = WebSocketController(wifi, serverAddress, port);
PlantController plantController;

/* Declaration and instantiation of sensors and actuators */
DistanceSensor distSensor(0);     // digital D0
TemperatureSensor tempSensor(A5); // analog A5

// MoistureSensor moistSensor1(A1);  // analog A1-4
MoistureSensor moistSensor2(A2); // analog A1-4
MoistureSensor moistSensor3(A3); // analog A1-4
MoistureSensor moistSensor4(A4); // analog A1-4

Relay pumpController(1, 2, 3, 4); // digital D1-4

void setup()
{
    Serial.begin(9600);

    // Only needed to get debugging working immediately. No need in "prod".

    while (!Serial)
    {
        ;
    }

    /*
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
      else
      {
        Serial.println("WiFi credentials acquired from Flash.");
      }

      // Connect to WiFi

      if (wifiController.connectToNetwork(flashController.getSSID(), flashController.getPASSWORD()))
      {
          Serial.println("Connected to WiFi network.");
      }
      */
}

void loop()
{
    Serial.println("-------------------------");
    Serial.println("Starting program.");
    delay(2000);

    char *token = flashController.getTOKEN();
    char *ws = "ws://";

    String path = String(ws) + String("plantuino.mrornito.net") + String("?token=") + String(token);
    Serial.println(path);
    webSocketController.openConnectionWithToken(path.c_str());

    while (webSocketController.isConnected())
    {
        Serial.println("WebSocket isConnected.");
        delay(1000);

        static unsigned long lastActionTime = 0;
        unsigned long currentTime = millis();

        // 1 minute = 60,000 milliseconds
        if (currentTime - lastActionTime > 10000)
        {
            Serial.println(
                "Time is up. Reading moistures, watering when needed, and sending DeviceMeasurement over WebSocket.");
            int plantMoisture1 = 100; // moistSensor2.getMoisture();
            int plantMoisture2 = moistSensor2.getMoisture();
            int plantMoisture3 = moistSensor3.getMoisture();
            int plantMoisture4 = moistSensor4.getMoisture();
            // int plantMoisture1 = random(10, 91);

            int plantMoistures[4] = {plantMoisture1, plantMoisture2, plantMoisture3, plantMoisture4};
            plantController.waterWhenNeeded(plantMoistures);

            // Get temperature
            float temperature;
            if (tempSensor.readTemperature())
            {
                temperature = tempSensor.getTemperature();
            }

            // Get tank level
            int distance;
            if (distSensor.readDistance())
            {
                distance = distSensor.getDistance();
            }

            // Send measurements
            // Some way of translating the distance measurement into a need of watering needs to be implemented.
            // e.g. if distance > x --> tank level is low
            webSocketController.sendDeviceMeasurement(temperature, distance);
            delay(1000);

            // Send moisture levels
            webSocketController.sendPlantInfo(plantMoisture1, 1);
            webSocketController.sendPlantInfo(plantMoisture2, 2);
            webSocketController.sendPlantInfo(plantMoisture3, 3);
            webSocketController.sendPlantInfo(plantMoisture4, 4);

            lastActionTime = currentTime;
        }

        // Check if a message has been received
        int messageSize = webSocketController.parseMessage();
        if (messageSize > 0)
        {
            String receivedMessage = webSocketController.readString();

            // Received message starts with 'set_watering_t'
            if (receivedMessage.indexOf("set_watering_t") != -1)
            {
                Serial.println("Received set_watering_t");
                int valueIndex = receivedMessage.indexOf("val=") + 4;
                int indexIndex = receivedMessage.indexOf("index=") + 6;
                int wateringThreshold =
                    (receivedMessage.substring(valueIndex, receivedMessage.indexOf("index=") - 1)).toInt();
                int plantIndex = (receivedMessage.substring(indexIndex)).toInt();

                plantController.setThreshold(plantIndex, wateringThreshold);
            }

            // Received message starts with 'activate_pump'
            else if (receivedMessage.indexOf("activate_pump") != -1)
            {
                int indexIndex = receivedMessage.indexOf("index=") + 6;
                int plantIndex = receivedMessage.substring(indexIndex).toInt();

                plantController.activatePump(plantIndex);
            }

            // Message not recognized.
            else
            {
                Serial.println("Received message not recognized.");
            }
        }
    }

    /*
    if (tempSensor.readTemperature()) {
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
    delay(2000);
    */

    /* //rip sensor 1
    if (moistSensor1.readMoisture()) {
      int moisture = moistSensor1.getMoisture();
      Serial.print("Moisture (1) %: ");
      Serial.println(moisture);
    }
    delay(2000);

    if (moistSensor2.readMoisture()) {
      int moisture = moistSensor2.getMoisture();
      Serial.print("Moisture (2) %: ");
      Serial.println(moisture);
    }
    delay(2000);

    if (moistSensor3.readMoisture()) {
      int moisture = moistSensor3.getMoisture();
      Serial.print("Moisture (3) %: ");
      Serial.println(moisture);
    }
    delay(2000);

    if (moistSensor4.readMoisture()) {
      int moisture = moistSensor4.getMoisture();
      Serial.print("Moisture (4) %: ");
      Serial.println(moisture);
    }
    delay(2000);
    */

    /*
    pumpController.activatePump(1, 2000);
    pumpController.activatePump(2, 2000);
    pumpController.activatePump(3, 2000);
    pumpController.activatePump(4, 2000);
    */

    Serial.println("Resetting in 3 seconds.");
    Serial.println("-------------------------");
    delay(3000);
}
