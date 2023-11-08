#include "Relay.h"

Relay::Relay(int pump1Pin, int pump2Pin, int pump3Pin, int pump4Pin)
{
    this->m_pumpControlPins[0] = pump1Pin;
    this->m_pumpControlPins[1] = pump2Pin;
    this->m_pumpControlPins[2] = pump3Pin;
    this->m_pumpControlPins[3] = pump4Pin;

    // Set all pins modes to ouput, write pins high (pumps off)
    for (int pumpPin : this->m_pumpControlPins)
    {
        pinMode(pumpPin, OUTPUT);
        digitalWrite(pumpPin, HIGH);
    }
}

bool Relay::activatePump(int pin, int ms)
{
    for (int pumpPin : this->m_pumpControlPins)
    {

        if (pumpPin == pin)
        {
            Serial.print("Pump on Digital Pin ");
            Serial.print(pumpPin);
            Serial.print(", activated for ");
            Serial.print(ms);
            Serial.println(" mseconds.");

            digitalWrite(pumpPin, LOW);
            delay(ms);
            digitalWrite(pumpPin, HIGH);

            return true;
        }
    }
    Serial.print("ERROR - No pump connected to pin: ");
    Serial.println(pin);
    return false;
}
