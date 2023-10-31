
#include "DistanceSensor.h"

DistanceSensor::DistanceSensor(int digitalPin) : m_ultraSonic(digitalPin)
{
    this->m_digitalPin = digitalPin;
}

void DistanceSensor::whoAmI()
{
    Serial.print("whoAmI? - Digital pin: ");
    Serial.print(this->m_digitalPin);
    Serial.println();
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
    return this->m_rangeInCm;
}
