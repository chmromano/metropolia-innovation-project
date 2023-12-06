#ifndef PlantController_h
#define PlantController_h

typedef struct
{
    bool watering;
    int wateringThreshold;
    int currentMoisture;
    int plantIndex;
} PlantInfo;

#include "actuators/relay/Relay.h"
#include <Arduino.h>

class PlantController
{
  public:
    PlantController();

    // void enableWatering(int index);
    // void disableWatering(int index);
    void setThreshold(int index, int threshold);

    void waterWhenNeeded(int moistures[4]);
    void activatePump(int index);

    void printArray();

    PlantInfo m_plants[4];

  private:
    void initArray();
    Relay m_pumpController;
};

#endif
