#ifndef MoistureSensor_h
#define MoistureSensor_h

#include <Arduino.h>

const int WET_THRESHOLD = 275;
const int DRY_THRESHOLD = 780;

class MoistureSensor
{
  public:
    MoistureSensor(int pin);

    bool readMoisture();
    int getMoisture();

  private:
    int m_analogPin;
    int m_currentMoisturePerc;
};

#endif MoistureSensor_h
