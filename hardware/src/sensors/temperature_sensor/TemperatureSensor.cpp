
#include "TemperatureSensor.h"

TemperatureSensor::TemperatureSensor(int analogPin, int bValue, int res)
{
    this->m_analogPin = analogPin;
    this->m_bValue = bValue;
    this->m_res = res;
}

bool TemperatureSensor::readTemperature()
{
    analogReadResolution(12);
    int a = analogRead(this->m_analogPin);
    analogReadResolution(10);

    if (a)
    {
        const float R0 = this->m_res;
        const float B = this->m_bValue;
        const float R = R0 * (4095.0 / a - 1.0);
        const float inv_T = 1.0 / (1 / 298.15 + 1 / B * log(R / R0));
        float temperature = inv_T - 273.15 - 3;
        // R = this->m_res * R;
        // float temperature = 1.0 / (log(R / this->m_res) / this->m_bValue + 1 / 298.15) - 273.15;

        this->m_currentTemperature = temperature;
        return true;
    }

    // Go here if temperature read failed.
    return false;
}

float TemperatureSensor::getTemperature()
{
    return this->m_currentTemperature;
}
