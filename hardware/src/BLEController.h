#ifndef BLEController_h
#define BLEController_h

#include <Arduino.h>
#include <ArduinoBLE.h>
#include <ArduinoUniqueID.h>

class BLEController
{
  public:
    BLEController();

    void advertiseServiceWithCharacteristics(const char *bleName);
    void pairWithMobileApp();

    String getUniqueID();
    String getReceivedToken();
    String getReceivedWiFiSSID();
    String getReceivedWiFiPassword();

  private:
    String m_uniqueID;
    String m_receivedToken;
    String m_receivedWiFiSSID;
    String m_receivedWiFiPassword;

    BLEService m_deviceSetupService;
    BLECharacteristic m_tokenCharacteristic;
    BLECharacteristic m_uniqueIdCharacteristic;
    BLECharacteristic m_ssidCharacteristic;
    BLECharacteristic m_passwordCharacteristic;

    void generateUniqueID();
};

#endif
