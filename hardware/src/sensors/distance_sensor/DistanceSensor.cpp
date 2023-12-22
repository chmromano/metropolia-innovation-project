
#include "DistanceSensor.h"

DistanceSensor::DistanceSensor(int digitalPin) : m_ultraSonic(digitalPin)
{
    this->m_digitalPin = digitalPin;
}

bool DistanceSensor::readDistance()
{
    long RangeInCentimeters = this->m_ultraSonic.MeasureInCentimeters();

    if (RangeInCentimeters)
    {
        this->m_rangeInCm = RangeInCentimeters;
        return true;
    }

    // Go here if distance read failed.
    return false;
}

long DistanceSensor::getDistance()
{
    int rangeInCm = this->m_rangeInCm;

    // Map the rangeInCm to a percentage between 0 - 100%
    int EMPTY = 25; // Check this value
    int FULL = 8;   // Check this value

    Serial.print("Tank level:");
    Serial.println(rangeInCm);

    long tankPercentage = map(rangeInCm, FULL, EMPTY, 100, 0);
    return tankPercentage;
    // return this->m_rangeInCm;
}
