#include "MoistureSensor.h"

MoistureSensor::MoistureSensor(int pin)
{
    this->m_analogPin = pin;
}

bool MoistureSensor::readMoisture()
{
    int moistureAnalogicVal = analogRead(this->m_analogPin);
    int percentageMoisture;

    if (this->m_analogPin == A3)
    {
        percentageMoisture = map(moistureAnalogicVal, 270, 720, 100, 0);
    }
    else
    {
        percentageMoisture = map(moistureAnalogicVal, WET_THRESHOLD, DRY_THRESHOLD, 100, 0);
    }

    this->m_currentMoisturePerc = percentageMoisture;
    return true;
}

int MoistureSensor::getMoisture()
{
    return this->m_currentMoisturePerc;
}
