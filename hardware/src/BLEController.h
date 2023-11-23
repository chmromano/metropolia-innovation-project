#ifndef BLEController_h
#define BLEController_h

#include <Arduino.h>
#include <ArduinoBLE.h>
#include <ArduinoUniqueID.h>

class BLEController
{
  public:
    BLEController();

    void advertiseServiceAndPair(const char *bleName);

    String getUniqueID();
    String getReceivedToken();
    String getReceivedWiFiSSID();
    String getReceivedWiFiPassword();

  private:
    String m_uniqueID;
    String m_receivedToken;
    String m_receivedWiFiSSID;
    String m_receivedWiFiPassword;

    void generateUniqueID();
};

#endif
