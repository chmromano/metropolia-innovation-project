#ifndef WiFiController_h
#define WiFiController_h

#include <Arduino.h>

#include "WiFiNINA.h"
#include "wifi_secrets.h"

class WiFiController
{
  public:
    WiFiController();
    void printSSID();

    bool connectToNetwork();

  private:
    char *m_ssid;
    char *m_pass;
    int m_connectionStatus = WL_IDLE_STATUS;
};

#endif
