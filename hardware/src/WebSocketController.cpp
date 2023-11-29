#include "WebSocketController.h"

WebSocketController::WebSocketController(WiFiClient &wifi, char serverAddress[], int port)
    : m_client(wifi, serverAddress, port)
{
    this->m_webSocketPort = port;
    strcpy(this->m_serverAddress, serverAddress);
}

void WebSocketController::openConnectionWithToken(const char *path)
{
    this->m_client.begin(path);
}

bool WebSocketController::isConnected()
{
    return this->m_client.connected();
}

void WebSocketController::sendTempTank(float temp, int tanklvl)
{
    char jsonData[256];
    sprintf(jsonData, R"(
    {
      "query": "mutation AddDeviceMeasurement($temperature: Float!, $tankLevel: Float!) { addDeviceMeasurement(temperature: $temperature, tankLevel: $tankLevel) { timestamp temperature tankLevel metadata { hardwareId } } }",
      "variables": { "temperature": %f, "tankLevel": %d }
    }
    )",
            temp, tanklvl);

    this->m_client.beginMessage(TYPE_TEXT);
    this->m_client.print(jsonData);
    this->m_client.endMessage();
}

int WebSocketController::parseMessage()
{
    return this->m_client.parseMessage();
}

String WebSocketController::readString()
{
    return this->m_client.readString();
}
