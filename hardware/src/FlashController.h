#ifndef FlashController_h
#define FlashController_h

#include <Arduino.h>
#include <FlashStorage.h>

// For plantlist. Not tested.
#include "PlantController.h"

class FlashController
{
  public:
    FlashController();

    bool writeCredentialsToFlash();
    bool readCredentialsFromFlash();

    // For plantlist. Not tested.
    bool writePlantListToFlash();
    bool readPlantListFromFlash();

    bool clearFlash();

    void setSSID(String ssid);
    char *getSSID();

    void setPASSWORD(String password);
    char *getPASSWORD();

    void setTOKEN(String token);
    char *getTOKEN();

    // For plantlist. Not tested.
    void setPlantList(PlantInfo *plantList);
    PlantInfo *getPlantList();

  private:
    char m_wifiSSID[32];
    char m_wifiPASSWORD[32];
    char m_TOKEN[1024];

    // For plantlist. Not tested.
    PlantInfo *m_plantList;
};

#endif
