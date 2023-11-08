#include "WebSocketController.h"

WebSocketController::WebSocketController(char *serverAddress, int port)
{
    this->m_webSocketPort = port;
    this->m_webSocketServerAddress = serverAddress;
}

void WebSocketController::sendMessage(char *msg)
{
    WiFiClient wifi;
    WebSocketClient client = WebSocketClient(wifi, "echo.websocket.events", 80);
    int messageCount = 0;

    Serial.println("Starting WebSocket client");
    client.begin();

    while (client.connected())
    {
        int x = client.ping();
        Serial.print("Ping x: ");
        Serial.println(x);

        delay(1000);

        client.beginMessage(TYPE_TEXT);
        client.print("This is a message.");
        client.endMessage();

        int y = client.ping();
        Serial.print("Ping y: ");
        Serial.println(y);

        delay(1000);

        // parseMessage results in breaking away from the loop. the "Ping z: " gets printed, but instead of delay(1000)
        // and restart the loop, we break away.
        int messageSize = client.parseMessage();

        int z = client.ping();
        Serial.print("Ping z: ");
        Serial.println(z);

        delay(1000);
    }
}

void WebSocketController::whoAmI()
{
    Serial.print("Server address: ");
    Serial.println(this->m_webSocketServerAddress);

    Serial.print("Port: ");
    Serial.println(this->m_webSocketPort);
}
