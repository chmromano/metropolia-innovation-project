#ifndef WebSocketController_h
#define WebSocketController_h

#include <Arduino.h>
#include <ArduinoHttpClient.h>
#include <WiFiNINA.h>

class WebSocketController
{
  public:
    WebSocketController(WiFiClient &wifi, char serverAddress[], int port);

    void openConnectionWithToken(const char *path);
    bool isConnected();
    int parseMessage();
    String readString();

    void sendTempTank(float temp, int tanklvl);

  private:
    WebSocketClient m_client;
    char m_serverAddress[64];
    int m_webSocketPort;
};

#endif WebSocketController_h
