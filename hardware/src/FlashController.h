#ifndef FlashController_h
#define FlashController_h

#include <Arduino.h>
#include <FlashStorage.h>

class FlashController {
public:
    FlashController();
    
    bool writeToFlash();
    bool readFromFlash();
    bool clearFlash();
    
    void setSSID(String ssid);
    String getSSID();

    void setPASSWORD(String password);
    String getPASSWORD();

    void setTOKEN(String token);
    String getTOKEN();
    
private:
    char m_wifiSSID[32];
    char m_wifiPASSWORD[32];
    char m_TOKEN[64];
};

#endif
