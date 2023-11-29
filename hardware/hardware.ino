
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
// WebSocketController webSocketController;
FlashController flashController;
// BLEController bleController;

/* Declaration and instantiation of sensors and actuators */
DistanceSensor distSensor(0);
TemperatureSensor tempSensor(6);
MoistureSensor moistSensor(5);
Relay pumpController(1, 2, 3, 4);

WiFiClient wifi;

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

        // bleController declaration can probably be at the top of the program
        BLEController bleController;
        bleController.advertiseServiceAndPair("Plantuino");

        // Store received credentials inside flashController
        // to write to Flash and for later access.
        flashController.setTOKEN(bleController.getReceivedToken());
        flashController.setSSID(bleController.getReceivedWiFiSSID());
        flashController.setPASSWORD(bleController.getReceivedWiFiPassword());
        flashController.writeCredentialsToFlash();
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

    /*
    char serverAddress[] = "192.168.22.47";
    int port = 3000;

    WebSocketController webSocketController = WebSocketController(wifi, serverAddress, port);
    webSocketController.openConnectionWithToken("ws://192.168.22.47?token=this_is_a_token");

    while (webSocketController.isConnected())
    {

      // Check if a message has been received
      int messageSize = webSocketController.parseMessage();
      if (messageSize > 0)
      {
        String receivedMessage = webSocketController.readString();
        if (receivedMessage.indexOf("set_watering_t") != -1)
        {
          // Received message starts with 'set_watering_t'
          int valueIndex = receivedMessage.indexOf("val=") + 4;
          int indexIndex = receivedMessage.indexOf("index=") + 6;
          int wateringThreshold = (receivedMessage.substring(valueIndex, receivedMessage.indexOf("index=") -
    1)).toInt(); int plantIndex = (receivedMessage.substring(indexIndex)).toInt();


        }
        else if (receivedMessage.indexOf("activate_pump") != -1)
        {
          // Received message starts with 'activate_pump'
          int indexIndex = receivedMessage.indexOf("index=") + 6;
          int plantIndex = receivedMessage.substring(indexIndex).toInt();
        }
        else
        {
          Serial.println("Received message not recognized.");
        }
      }
    }
    */

    pumpController.activatePump(1, 2000);
    pumpController.activatePump(2, 2000);
    pumpController.activatePump(3, 2000);
    pumpController.activatePump(4, 2000);

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
