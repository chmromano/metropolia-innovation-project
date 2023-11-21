#ifndef WiFiController_h
#define WiFiController_h

#include <Arduino.h>

// #include "wifi_secrets.h"
#include <ArduinoHttpClient.h>
#include <WiFiNINA.h>

class WiFiController
{
  public:
    WiFiController();
    bool connectToNetwork(char *ssid, char *pass);

  private:
    int m_connectionStatus = WL_IDLE_STATUS;
};

#endif
