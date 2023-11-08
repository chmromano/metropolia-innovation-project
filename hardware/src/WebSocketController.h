#ifndef WebSocketController_h
#define WebSocketController_h

#include <Arduino.h>
#include <ArduinoHttpClient.h>
#include <WiFiNINA.h>

class WebSocketController
{
  public:
    WebSocketController(char *serverAddress = "echo.websocket.events", int port = 80);
    void sendMessage(char *msg);
    void whoAmI();

  private:
    char *m_webSocketServerAddress;
    int m_webSocketPort;
};

#endif WebSocketController_h
