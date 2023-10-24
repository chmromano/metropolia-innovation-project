#include "MoistureSensor.h"

MoistureSensor::MoistureSensor(int pin)
{
    this->m_analogPin = pin;
}

bool MoistureSensor::readMoisture()
{
    int moistureAnalogicVal = analogRead(this->m_analogPin);
    int percentageMoisture = map(moistureAnalogicVal, WET_THRESHOLD, DRY_THRESHOLD, 100, 0);
    this->m_currentMoisturePerc = percentageMoisture;

    return true;
}

int MoistureSensor::getMoisture()
{
    return this->m_currentMoisturePerc;
}
