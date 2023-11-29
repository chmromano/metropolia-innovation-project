#ifndef FlashController_h
#define FlashController_h

#include <Arduino.h>
#include <FlashStorage.h>

class FlashController
{
  public:
    FlashController();

    bool writeCredentialsToFlash();
    bool readCredentialsFromFlash();

    bool clearFlash();

    void setSSID(String ssid);
    char *getSSID();

    void setPASSWORD(String password);
    char *getPASSWORD();

    void setTOKEN(String token);
    char *getTOKEN();

  private:
    char m_wifiSSID[32];
    char m_wifiPASSWORD[32];
    char m_TOKEN[64];
};

#endif
