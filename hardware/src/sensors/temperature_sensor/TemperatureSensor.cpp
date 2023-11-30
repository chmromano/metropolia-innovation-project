
#include "TemperatureSensor.h"

TemperatureSensor::TemperatureSensor(int analogPin, int bValue, int res)
{
    this->m_analogPin = analogPin;
    this->m_bValue = bValue;
    this->m_res = res;
}

void TemperatureSensor::whoAmI()
{
    Serial.print("whoAmI? - Analog Pin: ");
    Serial.print(this->m_analogPin);
    Serial.print(", B-value: ");
    Serial.print(this->m_bValue);
    Serial.print(", Resistor value: ");
    Serial.print(this->m_res);
    Serial.println();
}

bool TemperatureSensor::readTemperature()
{
    int a = analogRead(this->m_analogPin);

    if (a)
    {
        float R = 4095.0 / a - 1.0;
        R = this->m_res * R;
        float temperature = 1.0 / (log(R / this->m_res) / this->m_bValue + 1 / 298.15) - 273.15;
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
