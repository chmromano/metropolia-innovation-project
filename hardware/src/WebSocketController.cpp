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

// Unnecessary?
void WebSocketController::sendMsg(const char *msg)
{
    this->m_client.beginMessage(TYPE_TEXT);
    this->m_client.print(msg);
    this->m_client.endMessage();
}

void WebSocketController::sendDeviceMeasurement(float temp, int tanklvl)
{
    char msg[128];
    sprintf(msg, "{\"data\":\"device\",\"temperature\":%.1f,\"tankLevel\":%d}", temp, tanklvl);

    this->m_client.beginMessage(TYPE_TEXT);
    this->m_client.print(msg);
    this->m_client.endMessage();
}

void WebSocketController::sendPlantInfo(float moisture, int index)
{
    char msg[128];
    sprintf(msg, "{\"data\":\"plant\",\"soilMoisture\":%.1f,\"plantIndex\":%d}", moisture, index);
    // sprintf(msg, "plant;%.1f;%d", moisture, index);

    this->m_client.beginMessage(TYPE_TEXT);
    this->m_client.print(msg);
    this->m_client.endMessage();
}

int WebSocketController::parseMessage()
{
    int size = this->m_client.parseMessage();
    return size;
}

String WebSocketController::readString()
{
    return this->m_client.readString();
}
